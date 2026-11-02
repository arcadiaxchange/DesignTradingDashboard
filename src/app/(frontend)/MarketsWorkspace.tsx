'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type MarketQuote = {
  symbol: string
  name: string
  assetClass: 'Index' | 'Stock' | 'ETF' | 'Crypto' | 'Commodity' | 'FX' | 'Sector'
  price: number
  change: number
  changePercent: number
  currency: string
  exchange: string
  sparkline: number[]
}

type MarketStory = {
  title: string
  source: string
  url: string
  publishedAt: string
}

type EconomicEvent = {
  title: string
  country: string
  date: string
  time: string
  impact: string
  forecast: string
  previous: string
  url: string
}

type MarketPayload = {
  quotes: MarketQuote[]
  gainers: MarketQuote[]
  losers: MarketQuote[]
  news: MarketStory[]
  calendar: EconomicEvent[]
  sentiment: {
    score: number
    label: string
    advancing: number
    declining: number
  }
  updatedAt: string
  sources: {
    quotes: string
    news: string
    calendar: string
  }
}

function MarketGlyph({
  name,
  size = 16,
}: {
  name: 'calendar' | 'chevron' | 'news' | 'refresh' | 'search' | 'trend'
  size?: number
}) {
  const paths = {
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    news: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M6.1 9a7 7 0 0 1 11.5-2L20 9M4 15l2.4 2A7 7 0 0 0 18 15" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    trend: (
      <>
        <path d="M4 18 10 12l4 4 6-9" />
        <path d="M15 7h5v5" />
      </>
    ),
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Sparkline({ quote }: { quote: MarketQuote }) {
  const points = useMemo(() => {
    if (quote.sparkline.length < 2) return ''
    const min = Math.min(...quote.sparkline)
    const max = Math.max(...quote.sparkline)
    const span = max - min || 1
    return quote.sparkline
      .map((value, index) => {
        const x = (index / (quote.sparkline.length - 1)) * 92 + 4
        const y = 34 - ((value - min) / span) * 28
        return `${x},${y}`
      })
      .join(' ')
  }, [quote.sparkline])

  return (
    <svg
      className={quote.changePercent >= 0 ? 'market-sparkline gain' : 'market-sparkline loss'}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline points={points} />
    </svg>
  )
}

function formatPrice(quote: MarketQuote) {
  const digits = quote.assetClass === 'FX' ? 4 : quote.price >= 1000 ? 2 : 2
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(quote.price)
}

function timeAgo(value: string) {
  const timestamp = new Date(value).getTime()
  if (!Number.isFinite(timestamp)) return 'Recently'
  const minutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000))
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function MarketsWorkspace() {
  const [data, setData] = useState<MarketPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [screenerMode, setScreenerMode] = useState<'gainers' | 'losers'>('gainers')
  const [quoteFilter, setQuoteFilter] = useState('')

  const loadMarkets = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true)
    try {
      const response = await fetch('/arcadia-api/markets', { cache: 'no-store' })
      if (!response.ok) throw new Error('Market feed unavailable')
      const nextData = (await response.json()) as MarketPayload
      setData(nextData)
      setError('')
    } catch {
      setError('Live market data is temporarily unavailable. Arcadia will retry automatically.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void loadMarkets()
    const timer = window.setInterval(() => void loadMarkets(), 60_000)
    return () => window.clearInterval(timer)
  }, [loadMarkets])

  const headlineQuotes = useMemo(() => {
    if (!data) return []
    const preferred = ['^GSPC', '^IXIC', '^DJI', 'BTC-USD', 'GC=F', 'CL=F']
    return preferred
      .map((symbol) => data.quotes.find((quote) => quote.symbol === symbol))
      .filter((quote): quote is MarketQuote => Boolean(quote))
  }, [data])

  const filteredQuotes = useMemo(() => {
    if (!data) return []
    const query = quoteFilter.toLowerCase()
    return data.quotes
      .filter((quote) => quote.assetClass !== 'Sector')
      .filter((quote) => `${quote.symbol} ${quote.name}`.toLowerCase().includes(query))
      .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
  }, [data, quoteFilter])

  if (loading) {
    return (
      <div className="markets-workspace markets-loading" aria-label="Loading live markets">
        <div className="markets-loading-head" />
        <div className="markets-loading-tickers">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="markets-loading-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  return (
    <div className="markets-workspace">
      <section className="markets-heading">
        <div>
          <span className="markets-live">
            <i /> LIVE MARKET INTELLIGENCE
          </span>
          <h1>Markets at a glance.</h1>
          <p>Breaking financial news, economic events, screeners, and global risk sentiment.</p>
        </div>
        <div className="markets-heading-actions">
          {data && <span>Updated {timeAgo(data.updatedAt)}</span>}
          <button onClick={() => void loadMarkets(true)} disabled={refreshing}>
            <MarketGlyph name="refresh" size={14} />
            {refreshing ? 'Refreshing' : 'Refresh'}
          </button>
        </div>
      </section>

      {error && (
        <div className="markets-error" role="status">
          <span>{error}</span>
          <button onClick={() => void loadMarkets(true)}>Retry</button>
        </div>
      )}

      {data && (
        <>
          <section className="market-ticker-strip" aria-label="Live market overview">
            {headlineQuotes.map((quote) => (
              <article key={quote.symbol}>
                <div>
                  <span>{quote.name}</span>
                  <small>{quote.symbol}</small>
                </div>
                <strong>{formatPrice(quote)}</strong>
                <span className={quote.changePercent >= 0 ? 'market-gain' : 'market-loss'}>
                  {quote.changePercent >= 0 ? '+' : ''}
                  {quote.changePercent.toFixed(2)}%
                </span>
                <Sparkline quote={quote} />
              </article>
            ))}
          </section>

          <div className="markets-primary-grid">
            <section className="market-panel market-news-panel">
              <div className="market-panel-heading">
                <div>
                  <span className="market-panel-icon">
                    <MarketGlyph name="news" />
                  </span>
                  <div>
                    <h2>Top finance stories</h2>
                    <p>Curated from reputable global outlets</p>
                  </div>
                </div>
                <span className="feed-source">LIVE FEED</span>
              </div>
              {data.news.length ? (
                <div className="market-news-list">
                  {data.news.map((story, index) => (
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noreferrer"
                      key={`${story.url}-${index}`}
                      className={index === 0 ? 'lead-story' : ''}
                    >
                      <span className="news-source-mark">
                        {story.source.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <span>
                          {story.source} · {timeAgo(story.publishedAt)}
                        </span>
                        <h3>{story.title}</h3>
                        {index === 0 && (
                          <p>
                            Open the full report from {story.source} for real-time coverage and
                            analysis.
                          </p>
                        )}
                      </div>
                      <MarketGlyph name="chevron" size={14} />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="market-empty">
                  No reputable-source stories are available right now.
                </div>
              )}
            </section>

            <aside className="market-panel sentiment-panel">
              <div className="market-panel-heading">
                <div>
                  <span className="market-panel-icon">
                    <MarketGlyph name="trend" />
                  </span>
                  <div>
                    <h2>Market sentiment</h2>
                    <p>Breadth across tracked assets</p>
                  </div>
                </div>
              </div>
              <div className="sentiment-gauge">
                <svg viewBox="0 0 180 102" aria-label={`Market sentiment ${data.sentiment.score}`}>
                  <path d="M22 90a68 68 0 0 1 136 0" />
                  <path
                    className="sentiment-progress"
                    d="M22 90a68 68 0 0 1 136 0"
                    pathLength="100"
                    strokeDasharray={`${data.sentiment.score} 100`}
                  />
                </svg>
                <div>
                  <strong>{data.sentiment.score}</strong>
                  <span>{data.sentiment.label}</span>
                </div>
              </div>
              <div className="sentiment-scale">
                <span>Bearish</span>
                <span>Neutral</span>
                <span>Bullish</span>
              </div>
              <div className="breadth-stats">
                <div>
                  <span>Advancing</span>
                  <strong className="market-gain">{data.sentiment.advancing}</strong>
                </div>
                <div>
                  <span>Declining</span>
                  <strong className="market-loss">{data.sentiment.declining}</strong>
                </div>
                <div>
                  <span>Advance / decline</span>
                  <strong>
                    {(data.sentiment.advancing / Math.max(1, data.sentiment.declining)).toFixed(2)}
                  </strong>
                </div>
              </div>
              <p className="sentiment-note">
                Derived from the direction of {data.quotes.length} live cross-asset instruments.
              </p>
            </aside>
          </div>

          <div className="markets-secondary-grid">
            <section className="market-panel calendar-panel">
              <div className="market-panel-heading">
                <div>
                  <span className="market-panel-icon">
                    <MarketGlyph name="calendar" />
                  </span>
                  <div>
                    <h2>Economic calendar</h2>
                    <p>This week’s market-moving events</p>
                  </div>
                </div>
                <span className="calendar-timezone">ET</span>
              </div>
              <div className="economic-events">
                {data.calendar.slice(0, 8).map((event, index) => (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noreferrer"
                    key={`${event.title}-${index}`}
                  >
                    <div>
                      <strong>{event.time}</strong>
                      <span>{event.date}</span>
                    </div>
                    <span className="event-country">{event.country}</span>
                    <div className="event-copy">
                      <strong>{event.title}</strong>
                      <span>
                        Forecast {event.forecast || '—'} · Previous {event.previous || '—'}
                      </span>
                    </div>
                    <span className={`event-impact ${event.impact.toLowerCase()}`}>
                      {event.impact || 'Low'}
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="market-panel screener-panel">
              <div className="market-panel-heading">
                <div>
                  <span className="market-panel-icon">
                    <MarketGlyph name="search" />
                  </span>
                  <div>
                    <h2>Market screener</h2>
                    <p>Largest moves in the tracked universe</p>
                  </div>
                </div>
                <div className="screener-tabs">
                  <button
                    className={screenerMode === 'gainers' ? 'active' : ''}
                    onClick={() => setScreenerMode('gainers')}
                  >
                    Gainers
                  </button>
                  <button
                    className={screenerMode === 'losers' ? 'active' : ''}
                    onClick={() => setScreenerMode('losers')}
                  >
                    Losers
                  </button>
                </div>
              </div>
              <div className="screener-table">
                <div className="screener-table-head">
                  <span>Asset</span>
                  <span>Last</span>
                  <span>Change</span>
                </div>
                {(screenerMode === 'gainers' ? data.gainers : data.losers).map((quote) => (
                  <div key={quote.symbol}>
                    <span className="screener-symbol">
                      <i>{quote.symbol.slice(0, 2).replace('^', '')}</i>
                      <span>
                        <strong>{quote.symbol}</strong>
                        <small>{quote.name}</small>
                      </span>
                    </span>
                    <span>{formatPrice(quote)}</span>
                    <strong className={quote.changePercent >= 0 ? 'market-gain' : 'market-loss'}>
                      {quote.changePercent >= 0 ? '+' : ''}
                      {quote.changePercent.toFixed(2)}%
                    </strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="markets-bottom-grid">
            <section className="market-panel all-markets-panel">
              <div className="market-panel-heading">
                <div>
                  <span className="market-panel-icon">
                    <MarketGlyph name="trend" />
                  </span>
                  <div>
                    <h2>Cross-asset monitor</h2>
                    <p>Indices, equities, crypto, commodities, and FX</p>
                  </div>
                </div>
                <label className="market-filter">
                  <MarketGlyph name="search" size={13} />
                  <input
                    value={quoteFilter}
                    onChange={(event) => setQuoteFilter(event.target.value)}
                    placeholder="Filter symbols"
                  />
                </label>
              </div>
              <div className="all-markets-table">
                <div className="all-markets-head">
                  <span>Instrument</span>
                  <span>Class</span>
                  <span>Price</span>
                  <span>Day</span>
                  <span>Trend</span>
                </div>
                {filteredQuotes.slice(0, 12).map((quote) => (
                  <div key={quote.symbol}>
                    <span>
                      <strong>{quote.symbol}</strong>
                      <small>{quote.name}</small>
                    </span>
                    <span>{quote.assetClass}</span>
                    <span>{formatPrice(quote)}</span>
                    <strong className={quote.changePercent >= 0 ? 'market-gain' : 'market-loss'}>
                      {quote.changePercent >= 0 ? '+' : ''}
                      {quote.changePercent.toFixed(2)}%
                    </strong>
                    <Sparkline quote={quote} />
                  </div>
                ))}
              </div>
            </section>

            <aside className="market-panel sector-panel">
              <div className="market-panel-heading">
                <div>
                  <span className="market-panel-icon">
                    <MarketGlyph name="trend" />
                  </span>
                  <div>
                    <h2>Sector performance</h2>
                    <p>U.S. session heatmap</p>
                  </div>
                </div>
              </div>
              <div className="sector-heatmap">
                {data.quotes
                  .filter((quote) => quote.assetClass === 'Sector')
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .map((quote) => (
                    <div
                      key={quote.symbol}
                      className={quote.changePercent >= 0 ? 'sector-up' : 'sector-down'}
                    >
                      <span>{quote.name}</span>
                      <strong>
                        {quote.changePercent >= 0 ? '+' : ''}
                        {quote.changePercent.toFixed(2)}%
                      </strong>
                      <small>{quote.symbol}</small>
                    </div>
                  ))}
              </div>
            </aside>
          </div>

          <footer className="markets-sources">
            <span>
              Quotes: {data.sources.quotes} · News: {data.sources.news} · Calendar:{' '}
              {data.sources.calendar}
            </span>
            <span>Quotes may be delayed by the upstream exchange or provider.</span>
          </footer>
        </>
      )}
    </div>
  )
}
