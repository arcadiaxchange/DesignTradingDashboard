import 'server-only'

type QuoteConfig = {
  symbol: string
  name: string
  assetClass: 'Index' | 'Stock' | 'ETF' | 'Crypto' | 'Commodity' | 'FX' | 'Sector'
}

const quoteConfigs: QuoteConfig[] = [
  { symbol: '^GSPC', name: 'S&P 500', assetClass: 'Index' },
  { symbol: '^IXIC', name: 'Nasdaq Composite', assetClass: 'Index' },
  { symbol: '^DJI', name: 'Dow Jones', assetClass: 'Index' },
  { symbol: '^RUT', name: 'Russell 2000', assetClass: 'Index' },
  { symbol: 'SPY', name: 'SPDR S&P 500', assetClass: 'ETF' },
  { symbol: 'QQQ', name: 'Invesco QQQ', assetClass: 'ETF' },
  { symbol: 'NVDA', name: 'NVIDIA', assetClass: 'Stock' },
  { symbol: 'AAPL', name: 'Apple', assetClass: 'Stock' },
  { symbol: 'MSFT', name: 'Microsoft', assetClass: 'Stock' },
  { symbol: 'TSLA', name: 'Tesla', assetClass: 'Stock' },
  { symbol: 'BTC-USD', name: 'Bitcoin', assetClass: 'Crypto' },
  { symbol: 'ETH-USD', name: 'Ethereum', assetClass: 'Crypto' },
  { symbol: 'GC=F', name: 'Gold', assetClass: 'Commodity' },
  { symbol: 'CL=F', name: 'Crude Oil', assetClass: 'Commodity' },
  { symbol: 'EURUSD=X', name: 'EUR / USD', assetClass: 'FX' },
  { symbol: 'XLK', name: 'Technology', assetClass: 'Sector' },
  { symbol: 'XLF', name: 'Financials', assetClass: 'Sector' },
  { symbol: 'XLE', name: 'Energy', assetClass: 'Sector' },
  { symbol: 'XLV', name: 'Health Care', assetClass: 'Sector' },
  { symbol: 'XLY', name: 'Consumer Discretionary', assetClass: 'Sector' },
  { symbol: 'XLI', name: 'Industrials', assetClass: 'Sector' },
]

const reputableSources = [
  'Reuters',
  'Bloomberg',
  'CNBC',
  'Financial Times',
  'The Wall Street Journal',
  'MarketWatch',
  'Yahoo Finance',
  "Barron's",
  'BBC',
  'Associated Press',
]

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function tag(block: string, name: string) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'))
  return decodeXml(match?.[1] ?? '')
}

async function getQuote(config: QuoteConfig) {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(config.symbol)}?interval=1d&range=1mo`,
    {
      headers: { 'User-Agent': 'Mozilla/5.0 ArcadiaMarketDashboard/1.0' },
      next: { revalidate: 60 },
    },
  )
  if (!response.ok) throw new Error(`Quote failed: ${config.symbol}`)

  const payload = await response.json()
  const result = payload.chart?.result?.[0]
  if (!result) throw new Error(`Quote missing: ${config.symbol}`)

  const closes = (result.indicators?.quote?.[0]?.close ?? []).filter(
    (value: unknown): value is number => typeof value === 'number',
  )
  const price = Number(result.meta?.regularMarketPrice ?? closes.at(-1))
  const previous = Number(
    result.meta?.chartPreviousClose ?? result.meta?.previousClose ?? closes.at(-2),
  )
  const change = price - previous
  const changePercent = previous ? (change / previous) * 100 : 0

  return {
    ...config,
    price,
    change,
    changePercent,
    currency: result.meta?.currency ?? 'USD',
    exchange: result.meta?.fullExchangeName ?? result.meta?.exchangeName ?? '',
    sparkline: closes.slice(-16),
  }
}

async function getNews() {
  const query = encodeURIComponent(
    '(markets OR stocks OR economy) (Reuters OR Bloomberg OR CNBC OR "Financial Times" OR "Wall Street Journal" OR MarketWatch)',
  )
  const response = await fetch(
    `https://news.google.com/rss/search?q=${query}&hl=en-US&gl=US&ceid=US:en`,
    {
      headers: { 'User-Agent': 'Mozilla/5.0 ArcadiaMarketDashboard/1.0' },
      next: { revalidate: 180 },
    },
  )
  if (!response.ok) throw new Error('News feed failed')
  const xml = await response.text()

  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => {
      const block = match[1]
      const title = tag(block, 'title')
      const source = tag(block, 'source') || title.split(' - ').at(-1) || 'Market News'
      const cleanTitle = title.endsWith(` - ${source}`)
        ? title.slice(0, -(source.length + 3))
        : title
      return {
        title: cleanTitle,
        source,
        url: tag(block, 'link'),
        publishedAt: tag(block, 'pubDate'),
      }
    })
    .filter((story) => reputableSources.some((source) => story.source.includes(source)))
    .slice(0, 10)
}

async function getCalendar() {
  const response = await fetch('https://nfs.faireconomy.media/ff_calendar_thisweek.xml', {
    headers: { 'User-Agent': 'Mozilla/5.0 ArcadiaMarketDashboard/1.0' },
    next: { revalidate: 300 },
  })
  if (!response.ok) throw new Error('Calendar feed failed')
  const xml = await response.text()

  return [...xml.matchAll(/<event>([\s\S]*?)<\/event>/gi)]
    .map((match) => {
      const block = match[1]
      return {
        title: tag(block, 'title'),
        country: tag(block, 'country'),
        date: tag(block, 'date'),
        time: tag(block, 'time'),
        impact: tag(block, 'impact'),
        forecast: tag(block, 'forecast'),
        previous: tag(block, 'previous'),
        url: tag(block, 'url'),
      }
    })
    .filter((event) => event.title && event.time && event.impact !== 'Holiday')
    .slice(0, 14)
}

export async function GET() {
  const [quoteResults, newsResult, calendarResult] = await Promise.all([
    Promise.allSettled(quoteConfigs.map(getQuote)),
    getNews().catch(() => []),
    getCalendar().catch(() => []),
  ])

  const quotes = quoteResults
    .filter(
      (result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof getQuote>>> =>
        result.status === 'fulfilled',
    )
    .map((result) => result.value)

  const gainers = [...quotes]
    .filter((quote) => quote.assetClass !== 'Sector')
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)
  const losers = [...quotes]
    .filter((quote) => quote.assetClass !== 'Sector')
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)
  const positive = quotes.filter((quote) => quote.changePercent > 0).length
  const sentimentScore = quotes.length ? Math.round((positive / quotes.length) * 100) : 50

  return Response.json(
    {
      quotes,
      gainers,
      losers,
      news: newsResult,
      calendar: calendarResult,
      sentiment: {
        score: sentimentScore,
        label: sentimentScore >= 62 ? 'Bullish' : sentimentScore <= 38 ? 'Bearish' : 'Neutral',
        advancing: positive,
        declining: Math.max(0, quotes.length - positive),
      },
      updatedAt: new Date().toISOString(),
      sources: {
        quotes: 'Yahoo Finance',
        news: 'Google News · reputable-source filter',
        calendar: 'Forex Factory',
      },
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=180',
      },
    },
  )
}
