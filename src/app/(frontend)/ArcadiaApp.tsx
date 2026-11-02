'use client'

import { useEffect, useMemo, useState } from 'react'
import MarketsWorkspace from './MarketsWorkspace'

type IconName =
  | 'academy'
  | 'analyst'
  | 'backtest'
  | 'bell'
  | 'bolt'
  | 'broker'
  | 'calendar'
  | 'chevron'
  | 'dashboard'
  | 'history'
  | 'indicator'
  | 'logout'
  | 'markets'
  | 'search'
  | 'settings'
  | 'strategy'
  | 'upload'

function Icon({
  name,
  size = 18,
  strokeWidth = 1.7,
}: {
  name: IconName
  size?: number
  strokeWidth?: number
}) {
  const paths: Record<IconName, React.ReactNode> = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    analyst: (
      <>
        <path d="M4 18 9.5 12.5l3.7 3.7L20 7.5" />
        <path d="M15.5 7.5H20V12" />
        <path d="M4 5v13h16" />
      </>
    ),
    strategy: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.5 6h4a3 3 0 0 1 3 3v6.5M15.5 18H12a3 3 0 0 1-3-3v-3" />
      </>
    ),
    backtest: (
      <>
        <path d="M5 4v16M5 7h11a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H5" />
        <path d="m9 17 3 3-3 3" transform="translate(0 -3)" />
      </>
    ),
    indicator: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        <path d="M3 7.5 8.5 3l6 7 6-5" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </>
    ),
    markets: (
      <>
        <path d="M3 19V5M3 19h18" />
        <path d="m6 15 4-4 3 2 6-7" />
        <path d="M15 6h4v4" />
      </>
    ),
    broker: (
      <>
        <path d="M3 9h18M5 9v10M10 9v10M14 9v10M19 9v10M3 19h18" />
        <path d="m12 3 9 4H3l9-4Z" />
      </>
    ),
    academy: (
      <>
        <path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z" />
        <path d="M6 11.2V16c3.5 2.5 8.5 2.5 12 0v-4.8M21.5 9v6" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4M7 9l5-5 5 5" />
        <path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
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
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

type NavItem = {
  label: string
  icon: IconName
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'AI Analyst', icon: 'analyst' },
  { label: 'Strategy Lookup', icon: 'strategy' },
  { label: 'Backtesting', icon: 'backtest' },
  { label: 'Indicator Builder', icon: 'indicator' },
  { label: 'Trade History', icon: 'history' },
  { label: 'Markets', icon: 'markets' },
  { label: 'Broker Connections', icon: 'broker' },
  { label: 'Academy', icon: 'academy' },
]

const metrics = [
  {
    label: 'Total Portfolio Value',
    value: '$128,490.32',
    change: '+2.84%',
    detail: 'vs. last month',
    positive: true,
  },
  {
    label: 'Total P&L',
    value: '+$18,462.80',
    change: '+$2,184.20',
    detail: 'this month',
    positive: true,
  },
  {
    label: 'Win Rate',
    value: '68.4%',
    change: '+4.2%',
    detail: 'vs. last month',
    positive: true,
  },
  {
    label: 'Total Trades',
    value: '247',
    change: '18',
    detail: 'this month',
    positive: null,
  },
]

const trades = [
  {
    instrument: 'NASDAQ 100',
    ticker: 'NAS100',
    direction: 'Long',
    entry: '19,842.50',
    exit: '19,918.25',
    pnl: '+$1,894.00',
    date: 'May 24, 2025',
    gain: true,
  },
  {
    instrument: 'Gold',
    ticker: 'XAUUSD',
    direction: 'Short',
    entry: '2,336.80',
    exit: '2,328.15',
    pnl: '+$865.00',
    date: 'May 23, 2025',
    gain: true,
  },
  {
    instrument: 'Euro / U.S. Dollar',
    ticker: 'EURUSD',
    direction: 'Long',
    entry: '1.0824',
    exit: '1.0798',
    pnl: '−$390.00',
    date: 'May 22, 2025',
    gain: false,
  },
  {
    instrument: 'S&P 500',
    ticker: 'SPX500',
    direction: 'Long',
    entry: '5,298.40',
    exit: '5,326.70',
    pnl: '+$1,132.00',
    date: 'May 21, 2025',
    gain: true,
  },
]

const quickActions: { title: string; description: string; icon: IconName }[] = [
  {
    title: 'Build an Indicator',
    description: 'Create with AI',
    icon: 'indicator',
  },
  {
    title: 'Backtest a Strategy',
    description: 'Test your edge',
    icon: 'backtest',
  },
  {
    title: 'Analyze a Strategy',
    description: 'Get AI insights',
    icon: 'analyst',
  },
  {
    title: 'Connect a Broker',
    description: 'Link an account',
    icon: 'broker',
  },
]

const chartSets: Record<string, number[]> = {
  '1D': [68, 65, 69, 64, 60, 61, 56, 59, 52, 49, 54, 47, 44, 48, 40, 36, 38, 31, 34, 27, 24],
  '1W': [72, 68, 70, 61, 65, 57, 60, 51, 55, 47, 49, 42, 45, 35, 38, 30, 33, 27, 29, 22, 24],
  '1M': [72, 66, 69, 60, 63, 56, 58, 49, 52, 44, 46, 40, 42, 33, 36, 29, 31, 24, 28, 20, 23],
  '3M': [74, 68, 70, 65, 57, 61, 52, 55, 46, 49, 42, 43, 36, 39, 31, 34, 25, 29, 22, 24, 18],
  '6M': [78, 72, 75, 66, 69, 62, 65, 55, 59, 50, 53, 44, 47, 39, 41, 32, 36, 27, 30, 23, 19],
  '1Y': [81, 78, 71, 74, 65, 68, 61, 64, 54, 58, 48, 52, 43, 46, 36, 40, 30, 33, 25, 28, 17],
}

function Sidebar({
  activeNav,
  onNavigate,
  collapsed,
  onToggle,
}: {
  activeNav: string
  onNavigate: (label: string) => void
  collapsed: boolean
  onToggle: () => void
}) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand">
        <img src="/arcadia-logo.png" alt="Arcadia+" />
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon name="chevron" size={15} />
        </button>
      </div>

      <nav className="nav-list" aria-label="Main navigation">
        {navItems.slice(0, 6).map((item) => (
          <button
            className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
            key={item.label}
            onClick={() => onNavigate(item.label)}
            title={collapsed ? item.label : undefined}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.label === 'AI Analyst' && <span className="ai-badge">AI</span>}
          </button>
        ))}
        {navItems.slice(6).map((item) => (
          <button
            className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
            key={item.label}
            onClick={() => onNavigate(item.label)}
            title={collapsed ? item.label : undefined}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className={`nav-item ${activeNav === 'Settings' ? 'active' : ''}`}
          onClick={() => onNavigate('Settings')}
          title={collapsed ? 'Settings' : undefined}
        >
          <Icon name="settings" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="plan-card">
          <div className="plan-heading">
            <span className="plan-icon">
              <Icon name="bolt" size={14} />
            </span>
            <span>Arcadia Pro</span>
          </div>
          <p>8,420 AI credits left</p>
          <div className="credit-bar">
            <span />
          </div>
          <button>Manage plan</button>
        </div>
        <button className="user-card" aria-label="Open profile menu">
          <span className="avatar">AM</span>
          <span className="user-copy">
            <strong>Alex Morgan</strong>
            <small>alex@arcadia.trade</small>
          </span>
          <span className="user-menu">•••</span>
        </button>
      </div>
    </aside>
  )
}

function Header({
  activeNav,
  onImportTrades,
  onConnectAccount,
}: {
  activeNav: string
  onImportTrades: () => void
  onConnectAccount: () => void
}) {
  return (
    <header className="topbar">
      <div>
        {activeNav === 'Dashboard' ? (
          <>
            <h1>
              Good morning, Alex <span className="period">.</span>
            </h1>
            <p>Here&apos;s what&apos;s happening with your trading.</p>
          </>
        ) : (
          <>
            <h1>
              {activeNav === 'AI Analyst' ? 'Arcadia Analyst' : activeNav}
              <span className="period">.</span>
            </h1>
            <p>
              {activeNav === 'Strategy Lookup'
                ? 'Convert trading content into structured, testable research.'
                : activeNav === 'Trade History'
                  ? 'Review every execution and the decisions behind it.'
                  : activeNav === 'Backtesting'
                    ? 'Define, validate, and stress-test strategies with Arcadia.'
                    : activeNav === 'Indicator Builder'
                      ? 'Turn indicator ideas into platform-ready code with Arcadia.'
                      : activeNav === 'Markets'
                        ? 'Live financial news, economic events, and cross-asset intelligence.'
                        : 'AI-powered trading intelligence, built around your portfolio.'}
            </p>
          </>
        )}
      </div>
      <div className="header-actions">
        {activeNav === 'Dashboard' && (
          <div className="dashboard-header-buttons">
            <button onClick={onImportTrades}>
              <Icon name="upload" size={14} />
              Import Trades
            </button>
            <button className="connect" onClick={onConnectAccount}>
              <Icon name="broker" size={14} />
              Connect Account
            </button>
          </div>
        )}
        <button className="icon-button notification" aria-label="Notifications">
          <Icon name="bell" size={18} />
          <span />
        </button>
        <button className="header-profile" aria-label="Profile">
          <span className="avatar">AM</span>
          <Icon name="chevron" size={13} />
        </button>
      </div>
    </header>
  )
}

function MetricCards() {
  return (
    <section className="metrics-grid" aria-label="Portfolio summary">
      {metrics.map((metric, index) => (
        <article
          className={`metric-card ${
            metric.positive === true
              ? 'positive-growth'
              : metric.positive === false
                ? 'negative-growth'
                : 'no-change'
          }`}
          key={metric.label}
        >
          <div className="metric-top">
            <span>{metric.label}</span>
            <button aria-label={`More options for ${metric.label}`}>•••</button>
          </div>
          <strong>{metric.value}</strong>
          <div className="metric-meta">
            <span
              className={
                metric.positive === true
                  ? 'positive'
                  : metric.positive === false
                    ? 'negative'
                    : 'neutral'
              }
            >
              {index === 0 && '↗ '}
              {metric.change}
            </span>
            <span>{metric.detail}</span>
          </div>
        </article>
      ))}
    </section>
  )
}

function EquityChart() {
  const [range, setRange] = useState('1M')
  const points = useMemo(
    () =>
      chartSets[range]
        .map((y, index, values) => {
          const x = (index / (values.length - 1)) * 720
          return `${x},${y}`
        })
        .join(' '),
    [range],
  )

  return (
    <section className="panel chart-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow-row">
            <h2>Portfolio equity</h2>
            <span className="live-pill">
              <i /> LIVE
            </span>
          </div>
          <div className="chart-value">
            <strong>$128,490.32</strong>
            <span>+$3,544.18</span>
            <small>+2.84%</small>
          </div>
        </div>
        <div className="chart-controls">
          {Object.keys(chartSets).map((item) => (
            <button
              key={item}
              className={range === item ? 'selected' : ''}
              onClick={() => setRange(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-area">
        <div className="chart-axis-labels">
          <span>$130k</span>
          <span>$125k</span>
          <span>$120k</span>
          <span>$115k</span>
        </div>
        <svg
          viewBox="0 0 720 100"
          preserveAspectRatio="none"
          role="img"
          aria-label={`${range} portfolio equity chart`}
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7457e8" stopOpacity=".16" />
              <stop offset="100%" stopColor="#7457e8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" x2="720" y1="20" y2="20" />
          <line x1="0" x2="720" y1="43" y2="43" />
          <line x1="0" x2="720" y1="66" y2="66" />
          <line x1="0" x2="720" y1="89" y2="89" />
          <polygon points={`0,100 ${points} 720,100`} fill="url(#chartFill)" stroke="none" />
          <polyline points={points} className="equity-line" />
          <circle cx="720" cy={chartSets[range].at(-1)} r="5" className="pulse-circle" />
          <circle cx="720" cy={chartSets[range].at(-1)} r="2.5" className="end-circle" />
        </svg>
        <div className="chart-dates">
          <span>Apr 25</span>
          <span>May 01</span>
          <span>May 07</span>
          <span>May 13</span>
          <span>May 19</span>
          <span>May 25</span>
        </div>
      </div>
    </section>
  )
}

function AnalystPanel({ onViewReport }: { onViewReport: () => void }) {
  return (
    <section className="analyst-panel">
      <div className="analyst-content">
        <h2>
          Your strongest performance this month has been during the{' '}
          <em>New York trading session.</em>
        </h2>
        <p>
          You&apos;ve achieved a 74% win rate between 9:30 AM and 12:00 PM ET, outperforming your
          average by 11%.
        </p>
      </div>
      <div className="insight-stat">
        <div>
          <span>NY Session win rate</span>
          <strong>74%</strong>
        </div>
        <div className="mini-bars" aria-hidden="true">
          {[38, 52, 46, 68, 58, 76, 66, 86, 72, 92].map((height, index) => (
            <span key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
      <button className="report-button" onClick={onViewReport}>
        View AI Report <Icon name="chevron" size={15} />
      </button>
    </section>
  )
}

function QuickActions({ onAction }: { onAction: (title: string) => void }) {
  return (
    <section className="quick-section">
      <div className="section-title">
        <h2>Quick actions</h2>
      </div>
      <div className="quick-grid">
        {quickActions.map((action) => (
          <button key={action.title} className="quick-card" onClick={() => onAction(action.title)}>
            <span className="quick-icon">
              <Icon name={action.icon} size={18} />
            </span>
            <span>
              <strong>{action.title}</strong>
              <small>{action.description}</small>
            </span>
            <Icon name="chevron" size={15} />
          </button>
        ))}
      </div>
    </section>
  )
}

function RecentTrades({ query }: { query: string }) {
  const filteredTrades = trades.filter((trade) =>
    `${trade.instrument} ${trade.ticker} ${trade.direction}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  return (
    <section className="panel trades-panel">
      <div className="trades-heading">
        <div>
          <h2>Recent trades</h2>
          <p>Your latest executed positions</p>
        </div>
        <button>
          View all trades <Icon name="chevron" size={14} />
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Direction</th>
              <th>Entry Price</th>
              <th>Exit Price</th>
              <th>P&amp;L</th>
              <th>Date</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {filteredTrades.map((trade) => (
              <tr key={`${trade.ticker}-${trade.date}`}>
                <td>
                  <span className={`instrument-icon ${trade.ticker.toLowerCase()}`}>
                    {trade.ticker === 'NAS100'
                      ? 'N'
                      : trade.ticker === 'XAUUSD'
                        ? 'Au'
                        : trade.ticker === 'EURUSD'
                          ? '€'
                          : 'S'}
                  </span>
                  <span className="instrument-copy">
                    <strong>{trade.instrument}</strong>
                    <small>{trade.ticker}</small>
                  </span>
                </td>
                <td>
                  <span className={`direction ${trade.direction.toLowerCase()}`}>
                    <i /> {trade.direction}
                  </span>
                </td>
                <td>{trade.entry}</td>
                <td>{trade.exit}</td>
                <td className={trade.gain ? 'pnl-gain' : 'pnl-loss'}>{trade.pnl}</td>
                <td>{trade.date}</td>
                <td>
                  <button className="row-menu" aria-label={`Options for ${trade.instrument}`}>
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTrades.length === 0 && (
          <div className="empty-state">No recent trades match “{query}”.</div>
        )}
      </div>
    </section>
  )
}

const analystPrompts = [
  'Review my last 20 trades',
  'Find my highest-probability setup',
  "Summarize today's market risk",
]

const lookupStages = [
  'Fetching source',
  'Transcribing video',
  'Extracting strategy rules',
  'Building research report',
]

const backtestRows = [
  {
    market: 'SPY',
    trades: 42,
    winRate: '59.5%',
    return: '+8.4%',
    drawdown: '−4.1%',
  },
  {
    market: 'QQQ',
    trades: 47,
    winRate: '61.7%',
    return: '+11.2%',
    drawdown: '−5.3%',
  },
  {
    market: 'BTCUSD',
    trades: 38,
    winRate: '52.6%',
    return: '+9.8%',
    drawdown: '−8.7%',
  },
  {
    market: 'NAS100',
    trades: 45,
    winRate: '57.8%',
    return: '+10.6%',
    drawdown: '−6.2%',
  },
]

const historyTrades = [
  {
    id: 'TR-2481',
    instrument: 'NASDAQ 100',
    ticker: 'NAS100',
    direction: 'Long',
    entry: '19,842.50',
    exit: '19,918.25',
    stopLoss: '19,806.00',
    takeProfit: '19,924.00',
    size: '5 contracts',
    pnl: '+$1,881.50',
    grossPnl: '+$1,894.00',
    fees: '−$12.50',
    returnValue: '+1.51%',
    rMultiple: '+2.08R',
    duration: '1h 18m',
    date: 'May 24, 2025',
    time: '10:04 AM',
    strategy: 'Opening Range Breakout',
    session: 'New York',
    gain: true,
    note: 'Clean opening-range break with VWAP support. Scaled out 50% at 1R and trailed the balance below the five-minute swing.',
  },
  {
    id: 'TR-2476',
    instrument: 'Gold',
    ticker: 'XAUUSD',
    direction: 'Short',
    entry: '2,336.80',
    exit: '2,328.15',
    stopLoss: '2,340.25',
    takeProfit: '2,327.90',
    size: '1.00 lot',
    pnl: '+$852.50',
    grossPnl: '+$865.00',
    fees: '−$12.50',
    returnValue: '+0.69%',
    rMultiple: '+2.51R',
    duration: '2h 06m',
    date: 'May 23, 2025',
    time: '9:42 AM',
    strategy: 'Liquidity Sweep',
    session: 'New York',
    gain: true,
    note: 'Entered after a sweep of the London high and bearish displacement. Exit was taken just ahead of the prior daily low.',
  },
  {
    id: 'TR-2469',
    instrument: 'Euro / U.S. Dollar',
    ticker: 'EURUSD',
    direction: 'Long',
    entry: '1.0824',
    exit: '1.0798',
    stopLoss: '1.0802',
    takeProfit: '1.0868',
    size: '1.50 lots',
    pnl: '−$408.75',
    grossPnl: '−$390.00',
    fees: '−$18.75',
    returnValue: '−0.33%',
    rMultiple: '−1.18R',
    duration: '48m',
    date: 'May 22, 2025',
    time: '8:17 AM',
    strategy: 'London Continuation',
    session: 'London',
    gain: false,
    note: 'Continuation failed after unexpected dollar strength. Stop was respected, but entry occurred before full confirmation.',
  },
  {
    id: 'TR-2462',
    instrument: 'S&P 500',
    ticker: 'SPX500',
    direction: 'Long',
    entry: '5,298.40',
    exit: '5,326.70',
    stopLoss: '5,286.20',
    takeProfit: '5,330.00',
    size: '4 contracts',
    pnl: '+$1,122.00',
    grossPnl: '+$1,132.00',
    fees: '−$10.00',
    returnValue: '+0.90%',
    rMultiple: '+2.32R',
    duration: '3h 12m',
    date: 'May 21, 2025',
    time: '10:11 AM',
    strategy: 'VWAP Reclaim',
    session: 'New York',
    gain: true,
    note: 'Strong reclaim following the morning pullback. Held through lunch as breadth remained supportive.',
  },
  {
    id: 'TR-2454',
    instrument: 'Bitcoin',
    ticker: 'BTCUSD',
    direction: 'Long',
    entry: '66,420.00',
    exit: '68,981.00',
    stopLoss: '65,580.00',
    takeProfit: '69,200.00',
    size: '1.50 BTC',
    pnl: '+$3,842.00',
    grossPnl: '+$3,866.00',
    fees: '−$24.00',
    returnValue: '+3.08%',
    rMultiple: '+3.05R',
    duration: '6h 44m',
    date: 'May 20, 2025',
    time: '7:36 AM',
    strategy: 'Daily Breakout',
    session: 'London / New York',
    gain: true,
    note: 'Best trade this month. Daily consolidation resolved with strong spot volume and positive funding conditions.',
  },
  {
    id: 'TR-2448',
    instrument: 'British Pound / U.S. Dollar',
    ticker: 'GBPUSD',
    direction: 'Short',
    entry: '1.2718',
    exit: '1.2735',
    stopLoss: '1.2734',
    takeProfit: '1.2686',
    size: '1.20 lots',
    pnl: '−$259.40',
    grossPnl: '−$244.80',
    fees: '−$14.60',
    returnValue: '−0.21%',
    rMultiple: '−1.06R',
    duration: '37m',
    date: 'May 17, 2025',
    time: '9:08 AM',
    strategy: 'Session Reversal',
    session: 'London',
    gain: false,
    note: 'The reversal setup formed, but price reclaimed the range quickly. No re-entry was taken.',
  },
  {
    id: 'TR-2439',
    instrument: 'NASDAQ 100',
    ticker: 'NAS100',
    direction: 'Short',
    entry: '19,614.25',
    exit: '19,571.75',
    stopLoss: '19,639.50',
    takeProfit: '19,560.00',
    size: '4 contracts',
    pnl: '+$837.50',
    grossPnl: '+$850.00',
    fees: '−$12.50',
    returnValue: '+0.67%',
    rMultiple: '+1.68R',
    duration: '56m',
    date: 'May 16, 2025',
    time: '11:22 AM',
    strategy: 'Failed Breakout',
    session: 'New York',
    gain: true,
    note: 'Failed breakout above the premarket high. Took profit into the first major liquidity pocket.',
  },
  {
    id: 'TR-2431',
    instrument: 'Crude Oil',
    ticker: 'WTI',
    direction: 'Long',
    entry: '78.42',
    exit: '78.19',
    stopLoss: '78.16',
    takeProfit: '78.94',
    size: '3 contracts',
    pnl: '−$702.00',
    grossPnl: '−$690.00',
    fees: '−$12.00',
    returnValue: '−0.56%',
    rMultiple: '−0.88R',
    duration: '29m',
    date: 'May 15, 2025',
    time: '10:38 AM',
    strategy: 'Inventory Momentum',
    session: 'New York',
    gain: false,
    note: 'Momentum faded immediately after inventory data. Position was closed just before the hard stop.',
  },
]

const performanceMetrics = [
  ['Net Profit / Loss', '+$32,840'],
  ['Total Return (%)', '+32.84%'],
  ['Annualized Return (%)', '+38.12%'],
  ['Win Rate (%)', '61.3%'],
  ['Profit Factor', '1.84'],
  ['Expectancy per Trade', '+$142.17'],
  ['Average Risk-to-Reward Ratio', '1 : 2.18'],
  ['Average Winning Trade', '+$486.20'],
  ['Average Losing Trade', '−$228.40'],
  ['Largest Winning Trade', '+$2,840.00'],
  ['Largest Losing Trade', '−$940.00'],
]

const riskMetrics = [
  ['Maximum Drawdown (%)', '−8.42%'],
  ['Average Drawdown (%)', '−2.16%'],
  ['Maximum Drawdown Duration', '11 days'],
  ['Sharpe Ratio', '1.72'],
  ['Sortino Ratio', '2.38'],
  ['Calmar Ratio', '4.53'],
  ['Recovery Factor', '3.90'],
  ['Risk of Ruin (%)', '1.8%'],
  ['Maximum Consecutive Losses', '5'],
  ['Maximum Consecutive Wins', '9'],
]

const backtestTradeStats = [
  ['Total Trades', '231'],
  ['Winning Trades', '141'],
  ['Losing Trades', '84'],
  ['Breakeven Trades', '6'],
  ['Average Trade Duration', '1h 48m'],
  ['Average Trades per Day', '2.57'],
  ['Long vs. Short Performance', '+19.4% / +13.4%'],
  ['Average Holding Period', '108 min'],
  ['Total Trading Fees / Commissions', '$1,284.60'],
  ['Average Slippage', '0.18 pts'],
]

const strategyAnalysisMetrics = [
  ['Best Performing Trading Session', 'New York · +$18,420'],
  ['Worst Performing Trading Session', 'Asia · −$1,860'],
  ['Best Performing Day of the Week', 'Tuesday · 68.2% wins'],
  ['Worst Performing Day of the Week', 'Friday · 49.1% wins'],
  ['Best Performing Instrument', 'NAS100 · +$12,740'],
  ['Worst Performing Instrument', 'BTCUSD · −$1,240'],
  ['Performance by Timeframe', '5 minute'],
  ['Performance by Market Conditions', 'Trending · +28.6%'],
  ['Performance by Trade Direction', 'Long · 63.8% wins'],
  ['Performance by Volatility Regime', 'Medium · PF 2.04'],
]

const quantitativeMetrics = [
  ['Maximum Favorable Excursion (MFE)', '+1.84R avg'],
  ['Maximum Adverse Excursion (MAE)', '−0.62R avg'],
  ['Standard Deviation of Returns', '1.92%'],
  ['Value at Risk (VaR) · 95%', '−1.74%'],
  ['Conditional Value at Risk (CVaR) · 95%', '−2.41%'],
  ['Ulcer Index', '3.18'],
  ['SQN (System Quality Number)', '2.86 · Excellent'],
  ['Monte Carlo Simulation', '91.4% profitable'],
  ['Walk-Forward Analysis', '+18.2%'],
  ['Out-of-Sample Performance', '+14.6%'],
  ['Strategy Robustness Score', '84 / 100'],
]

const arcadiaInsights = [
  [
    'Overall Strategy Performance Summary',
    'The strategy produced consistent positive expectancy across the test window with controlled downside.',
  ],
  [
    'Strategy Strengths',
    'Clear opening trigger, strong New York performance, and favorable asymmetric exits.',
  ],
  [
    'Strategy Weaknesses',
    'Returns deteriorate in low-volume and range-bound sessions, especially on Fridays.',
  ],
  [
    'Risk Assessment',
    'Moderate risk. Drawdown remains acceptable, but correlated index exposure should be capped.',
  ],
  [
    'Market Condition Compatibility',
    'Best suited to liquid, directional index markets with medium or elevated volatility.',
  ],
  [
    'Strategy Consistency Analysis',
    'Monthly profitability remained positive in 5 of 6 tested months.',
  ],
  [
    'Overfitting Detection',
    'Low-to-moderate risk. Three parameters show sensitivity outside their core range.',
  ],
  [
    'Suggested Strategy Improvements',
    'Add an opening-volume filter and exclude entries within 15 minutes of major news.',
  ],
  [
    'Potential Risk Management Adjustments',
    'Reduce risk from 1.0% to 0.75% when VIX is below 14 or after two consecutive losses.',
  ],
  [
    'Overall Strategy Confidence Assessment',
    '82% confidence · Suitable for forward testing with controlled allocation.',
  ],
]

const backtestHistoryRows = [
  {
    id: 'BT-0231',
    instrument: 'NAS100',
    direction: 'Buy',
    entryDate: 'Apr 24, 2025 · 9:45 AM',
    exitDate: 'Apr 24, 2025 · 11:18 AM',
    entry: '19,842.50',
    exit: '19,918.25',
    stop: '19,806.00',
    target: '19,924.00',
    size: '5 contracts',
    pnl: '+$1,894.00',
    pnlPercent: '+1.89%',
    rr: '2.08R',
    duration: '1h 33m',
    reason: 'Trailing stop',
  },
  {
    id: 'BT-0230',
    instrument: 'SPY',
    direction: 'Buy',
    entryDate: 'Apr 23, 2025 · 9:50 AM',
    exitDate: 'Apr 23, 2025 · 10:41 AM',
    entry: '525.18',
    exit: '527.06',
    stop: '524.32',
    target: '527.22',
    size: '400 shares',
    pnl: '+$752.00',
    pnlPercent: '+0.36%',
    rr: '2.19R',
    duration: '51m',
    reason: 'Profit target',
  },
  {
    id: 'BT-0229',
    instrument: 'QQQ',
    direction: 'Sell',
    entryDate: 'Apr 22, 2025 · 10:05 AM',
    exitDate: 'Apr 22, 2025 · 10:47 AM',
    entry: '446.72',
    exit: '448.08',
    stop: '448.00',
    target: '444.16',
    size: '300 shares',
    pnl: '−$408.00',
    pnlPercent: '−0.30%',
    rr: '−1.06R',
    duration: '42m',
    reason: 'Stop loss',
  },
  {
    id: 'BT-0228',
    instrument: 'NAS100',
    direction: 'Buy',
    entryDate: 'Apr 21, 2025 · 9:42 AM',
    exitDate: 'Apr 21, 2025 · 12:06 PM',
    entry: '19,611.00',
    exit: '19,684.50',
    stop: '19,574.25',
    target: '19,692.00',
    size: '4 contracts',
    pnl: '+$1,470.00',
    pnlPercent: '+1.48%',
    rr: '2.00R',
    duration: '2h 24m',
    reason: 'Session close',
  },
]

function AIAnalystWorkspace({ onComplete }: { onComplete: (message: string) => void }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [isResponding, setIsResponding] = useState(false)
  const [request, setRequest] = useState<{
    id: number
    prompt: string
  } | null>(null)

  useEffect(() => {
    if (!request) return

    const response = `I’ve reviewed your portfolio and recent execution history in the context of your question.

Your clearest edge is still the New York session. Trades opened between 9:30 AM and 12:00 PM ET produced a 74% win rate, with NAS100 and SPX500 accounting for most of the positive expectancy.

The main opportunity is selectivity: your results weaken when you take more than three positions in a session. I’d prioritize your first two qualified setups, cap risk at 0.75% per trade, and avoid re-entry after two consecutive losses.

Would you like me to turn this into a backtestable strategy or review the individual trades behind the finding?`

    let characterIndex = 0
    setResult('')
    setIsResponding(true)

    const timer = window.setInterval(() => {
      characterIndex += 3
      setResult(response.slice(0, characterIndex))

      if (characterIndex >= response.length) {
        window.clearInterval(timer)
        setIsResponding(false)
      }
    }, 16)

    return () => window.clearInterval(timer)
  }, [request])

  function runAnalysis() {
    const question = prompt.trim()
    if (!question) {
      onComplete('Enter a question for the AI Analyst')
      return
    }

    setRequest({ id: Date.now(), prompt: question })
    setPrompt('')
  }

  return (
    <div className="ai-workspace">
      <section className="command-center">
        <div className="command-intro">
          <img src="/arcadia-logo.png" alt="" />
          <h1>AI-Powered Trading Command Center</h1>
          <p>Ask Arcadia to analyze your strategies, trades, and market opportunities.</p>
        </div>

        <div className="command-composer">
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask anything about your trading..."
            aria-label="Ask the AI Analyst"
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') runAnalysis()
            }}
          />
          <div className="composer-footer">
            <div className="prompt-chips">
              {analystPrompts.map((item) => (
                <button key={item} onClick={() => setPrompt(item)}>
                  {item}
                </button>
              ))}
            </div>
            <button
              className="run-command"
              onClick={runAnalysis}
              aria-label="Run analysis"
              title="Run analysis"
            >
              <Icon name="chevron" size={14} />
            </button>
          </div>
        </div>

        {request ? (
          <section className="conversation" aria-live="polite">
            <div className="user-message">
              <div>
                <span>You</span>
                <p>{request.prompt}</p>
              </div>
              <span className="avatar">AM</span>
            </div>
            <div className="assistant-message">
              <span className="assistant-avatar">
                <img src="/arcadia-logo.png" alt="" />
              </span>
              <div className="assistant-response">
                <div className="assistant-name">
                  <strong>Arcadia Analyst</strong>
                  <span className={isResponding ? '' : 'is-hidden'} aria-hidden={!isResponding}>
                    Analyzing
                  </span>
                </div>
                <p>
                  <span className="response-copy">{result || '\u200B'}</span>
                  <i
                    className={`typing-cursor ${isResponding ? '' : 'is-hidden'}`}
                    aria-hidden="true"
                  />
                </p>
                <div
                  className={`response-actions ${!isResponding && result ? '' : 'is-hidden'}`}
                  aria-hidden={isResponding || !result}
                >
                  <button
                    onClick={() => onComplete('Response copied')}
                    tabIndex={!isResponding && result ? 0 : -1}
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => setPrompt('Turn this into a backtestable strategy')}
                    tabIndex={!isResponding && result ? 0 : -1}
                  >
                    Follow up
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="ai-outcome-grid">
            <article className="outcome-card outcome-blue">
              <span className="outcome-icon">
                <Icon name="history" size={17} />
              </span>
              <div>
                <strong>Performance review</strong>
                <p>Find the sessions, setups, and instruments driving your returns.</p>
              </div>
              <small>Portfolio aware</small>
            </article>
            <article className="outcome-card outcome-purple">
              <span className="outcome-icon">
                <Icon name="strategy" size={17} />
              </span>
              <div>
                <strong>Strategy refinement</strong>
                <p>Turn your trading ideas into clear, testable execution rules.</p>
              </div>
              <small>Data backed</small>
            </article>
            <article className="outcome-card outcome-teal">
              <span className="outcome-icon">
                <Icon name="bolt" size={17} />
              </span>
              <div>
                <strong>Market opportunity</strong>
                <p>Surface timely setups aligned with your risk and trading style.</p>
              </div>
              <small>Live context</small>
            </article>
          </div>
        )}

        <p className="command-hint">Press ⌘ + Enter to run your analysis</p>
      </section>
    </div>
  )
}

function StrategyLookupWorkspace({ onComplete }: { onComplete: (message: string) => void }) {
  const [sourceUrl, setSourceUrl] = useState('')
  const [lookupState, setLookupState] = useState<'idle' | 'running' | 'complete'>('idle')
  const [activeStage, setActiveStage] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (lookupState !== 'running') return

    if (activeStage < lookupStages.length - 1) {
      const timer = window.setTimeout(() => setActiveStage((stage) => stage + 1), 650)
      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setLookupState('complete')
      onComplete('Strategy report ready')
    }, 750)
    return () => window.clearTimeout(timer)
  }, [activeStage, lookupState])

  function analyzeSource() {
    const value = sourceUrl.trim()

    if (!/^https?:\/\/.+/i.test(value)) {
      setError('Enter a valid YouTube or strategy source URL.')
      return
    }

    setError('')
    setActiveStage(0)
    setLookupState('running')
  }

  return (
    <div className="lookup-workspace">
      <section className="lookup-hero">
        <div className="lookup-copy">
          <h1>Turn any trading video into a testable strategy.</h1>
          <p>
            Paste a YouTube link or similar source. Arcadia transcribes it, extracts the rules,
            evaluates trader fit, and produces a 90-day backtest preview.
          </p>
        </div>

        <div className="source-card">
          <div className="source-card-heading">
            <div className="source-play">
              <span />
            </div>
            <div>
              <strong>Paste any link below</strong>
              <span>YouTube, Vimeo, Loom, or public video link</span>
            </div>
            <span className="source-secure">PRIVATE</span>
          </div>
          <div className={`source-input ${error ? 'has-error' : ''}`}>
            <Icon name="strategy" size={17} />
            <input
              value={sourceUrl}
              onChange={(event) => {
                setSourceUrl(event.target.value)
                if (error) setError('')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') analyzeSource()
              }}
              placeholder="https://youtube.com/watch?v=..."
              aria-label="Strategy video URL"
            />
            <button onClick={analyzeSource} disabled={lookupState === 'running'}>
              {lookupState === 'running' ? 'Analyzing' : 'Analyze strategy'}
              <Icon name="chevron" size={14} />
            </button>
          </div>
          <div className="source-meta">
            <span>{error || 'Videos up to 3 hours · English transcription'}</span>
            <span>No video data is stored</span>
          </div>

          {lookupState === 'running' && (
            <div className="lookup-progress" role="status">
              <div className="progress-track">
                <span
                  style={{
                    width: `${((activeStage + 1) / lookupStages.length) * 100}%`,
                  }}
                />
              </div>
              <div className="progress-stages">
                {lookupStages.map((stage, index) => (
                  <span
                    key={stage}
                    className={index < activeStage ? 'done' : index === activeStage ? 'active' : ''}
                  >
                    <i>{index < activeStage ? '✓' : index + 1}</i>
                    {stage}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lookup-capabilities">
          <span>
            <Icon name="history" size={14} /> Full transcript
          </span>
          <span>
            <Icon name="strategy" size={14} /> Rule extraction
          </span>
          <span>
            <Icon name="backtest" size={14} /> 90-day preview
          </span>
          <span>
            <Icon name="analyst" size={14} /> Trader Fit
          </span>
        </div>
      </section>

      <section
        className={`strategy-report ${lookupState === 'complete' ? 'report-refreshed' : ''}`}
      >
        <div className="report-heading">
          <div>
            <span>STRATEGY REPORT</span>
            <h2>Opening Range Breakout with VWAP Confirmation</h2>
            <p>Source analyzed 18 minutes ago · 24:18 video · 4,286 transcript words</p>
          </div>
          <div className="report-actions">
            <button onClick={() => onComplete('Transcript opened')}>View transcript</button>
            <button onClick={() => onComplete('Report export prepared')}>Export report</button>
          </div>
        </div>

        <div className="report-score-grid">
          <article className="strategy-score">
            <div className="score-ring">
              <svg viewBox="0 0 42 42" aria-label="Strategy score 82 out of 100">
                <circle cx="21" cy="21" r="16" />
                <circle cx="21" cy="21" r="16" className="score-progress" />
              </svg>
              <strong>82</strong>
            </div>
            <div>
              <span>ARCADIA SCORE</span>
              <strong>Strong strategy</strong>
              <p>Clear rules, controlled risk, and consistent cross-market behavior.</p>
            </div>
          </article>
          <article>
            <span>WIN RATE</span>
            <strong>58.4%</strong>
            <small>Across 172 trades</small>
          </article>
          <article>
            <span>PROFIT FACTOR</span>
            <strong>1.46</strong>
            <small>Healthy expectancy</small>
          </article>
          <article>
            <span>MAX DRAWDOWN</span>
            <strong>−6.8%</strong>
            <small>Within target range</small>
          </article>
        </div>

        <div className="report-main-grid">
          <div className="report-column">
            <article className="report-panel rules-panel">
              <div className="report-panel-title">
                <span className="report-icon">
                  <Icon name="strategy" size={16} />
                </span>
                <div>
                  <h3>Extracted strategy rules</h3>
                  <p>Structured directly from the source transcript</p>
                </div>
                <span className="confidence">94% confidence</span>
              </div>
              <ol className="rules-list">
                <li>
                  <span>01</span>
                  <div>
                    <strong>Define the opening range</strong>
                    <p>
                      Mark the high and low formed during the first 15 minutes after market open.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <strong>Wait for confirmation</strong>
                    <p>
                      Price must close outside the range and remain on the correct side of VWAP.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <strong>Enter on the first retest</strong>
                    <p>Use a limit entry at the broken range boundary after a rejection candle.</p>
                  </div>
                </li>
                <li>
                  <span>04</span>
                  <div>
                    <strong>Manage risk at 1:2 minimum</strong>
                    <p>
                      Stop beyond the retest swing. Take partial profit at 1R and trail the balance.
                    </p>
                  </div>
                </li>
              </ol>
            </article>

            <article className="report-panel backtest-panel">
              <div className="report-panel-title">
                <span className="report-icon">
                  <Icon name="backtest" size={16} />
                </span>
                <div>
                  <h3>90-day backtest preview</h3>
                  <p>Rule-based simulation · Jan 27–Apr 25, 2025</p>
                </div>
                <span className="preview-badge">PREVIEW</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Market</th>
                    <th>Trades</th>
                    <th>Win rate</th>
                    <th>Net return</th>
                    <th>Max DD</th>
                  </tr>
                </thead>
                <tbody>
                  {backtestRows.map((row) => (
                    <tr key={row.market}>
                      <td>{row.market}</td>
                      <td>{row.trades}</td>
                      <td>{row.winRate}</td>
                      <td className="pnl-gain">{row.return}</td>
                      <td className="pnl-loss">{row.drawdown}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="backtest-note">
                Preview uses simplified fills and does not include slippage, fees, or strategy
                discretion described outside the explicit rules.
              </p>
            </article>
          </div>

          <aside className="report-side-column">
            <article className="report-panel trader-fit">
              <div className="fit-heading">
                <span>TRADER FIT</span>
                <strong>76%</strong>
              </div>
              <div className="fit-meter">
                <span />
              </div>
              <h3>Good match for your journal</h3>
              <p>
                Based on 247 trades, this strategy aligns with your strongest session and preferred
                holding time.
              </p>
              <div className="fit-signals">
                <span>
                  <i className="match" /> New York session
                  <b>Strong</b>
                </span>
                <span>
                  <i className="match" /> Index performance
                  <b>Strong</b>
                </span>
                <span>
                  <i className="partial" /> Average risk
                  <b>Moderate</b>
                </span>
              </div>
            </article>

            <article className="report-panel prop-fit">
              <div className="report-panel-title">
                <span className="report-icon">
                  <Icon name="broker" size={16} />
                </span>
                <div>
                  <h3>Prop-firm fit</h3>
                  <p>Evaluation account compatibility</p>
                </div>
              </div>
              <div className="prop-score">
                <strong>8.2</strong>
                <span>/ 10</span>
              </div>
              <ul>
                <li>
                  <span>✓</span> Daily loss limit compatible
                </li>
                <li>
                  <span>✓</span> Low overnight exposure
                </li>
                <li>
                  <span>✓</span> Consistency-rule friendly
                </li>
                <li className="warning">
                  <span>!</span> News-event risk requires a filter
                </li>
              </ul>
            </article>

            <article className="report-panel pros-cons">
              <div>
                <h3>Advantages</h3>
                <p>Clear, repeatable entry model</p>
                <p>Works across liquid markets</p>
                <p>Limited screen time required</p>
              </div>
              <div>
                <h3>Limitations</h3>
                <p>Vulnerable to false breakouts</p>
                <p>Weaker in low-volume sessions</p>
                <p>Execution quality is important</p>
              </div>
            </article>
          </aside>
        </div>
      </section>
    </div>
  )
}

function BacktestMetricSection({
  title,
  subtitle,
  metrics,
}: {
  title: string
  subtitle: string
  metrics: string[][]
}) {
  return (
    <section className="backtest-report-section metric-report-section">
      <div className="backtest-section-title">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span>{metrics.length} metrics</span>
      </div>
      <div className="backtest-metric-list">
        {metrics.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong
              className={
                value.startsWith('+')
                  ? 'positive-value'
                  : value.startsWith('−') || value.startsWith('-')
                    ? 'negative-value'
                    : ''
              }
            >
              {value}
            </strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function BacktestingWorkspace({ onComplete }: { onComplete: (message: string) => void }) {
  const [messages, setMessages] = useState<
    {
      id: number
      role: 'assistant' | 'user'
      content: string
    }[]
  >([
    {
      id: 1,
      role: 'assistant',
      content: 'I’ve received your strategy definition and started structuring the test rules.',
    },
  ])
  const [backtestInput, setBacktestInput] = useState('')
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const [reportVersion, setReportVersion] = useState(0)
  const [reportReady, setReportReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [transitionRequest, setTransitionRequest] = useState<string | null>(null)

  useEffect(() => {
    if (!transitionRequest) return

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now(), role: 'user', content: transitionRequest },
      ])
      setBacktestInput('')
      setStarted(true)
      setPendingMessage(transitionRequest)
      setTransitionRequest(null)
    }, 260)

    return () => window.clearTimeout(timer)
  }, [transitionRequest])

  useEffect(() => {
    if (!pendingMessage) return

    const timer = window.setTimeout(() => {
      const shouldRun = /run|confirm|yes|looks good|start/i.test(pendingMessage)
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          role: 'assistant',
          content: shouldRun
            ? 'Backtest complete. I tested 231 trades across NAS100, SPY, and QQQ. The full report is ready on the right, including robustness, Monte Carlo, walk-forward, and trade-level results.'
            : 'I’ve updated the test definition. Should I keep the $100,000 starting balance, 1% risk per trade, and the current 90-day date range before I run it?',
        },
      ])
      setPendingMessage(null)

      if (shouldRun) {
        setReportReady(true)
        setReportVersion((version) => version + 1)
        onComplete('Backtest report generated')
      }
    }, 900)

    return () => window.clearTimeout(timer)
  }, [pendingMessage])

  function sendBacktestMessage(value = backtestInput) {
    const content = value.trim()
    if (!content || pendingMessage || transitionRequest) return

    if (!started) {
      setTransitionRequest(content)
      return
    }

    setMessages((current) => [...current, { id: Date.now(), role: 'user', content }])
    setBacktestInput('')
    setPendingMessage(content)
  }

  if (!started) {
    return (
      <div className={`backtest-launch ${transitionRequest ? 'is-transitioning' : ''}`}>
        <div className="backtest-launch-glow" />
        <section className="backtest-launch-center">
          <div className="backtest-launch-intro">
            <img src="/arcadia-logo.png" alt="" />
            <h1>What would you like to backtest?</h1>
            <p>
              Describe your strategy in plain English. Arcadia will clarify the rules, confirm your
              test settings, and generate a complete quantitative report.
            </p>
          </div>

          <div className="backtest-launch-composer">
            <textarea
              value={backtestInput}
              onChange={(event) => setBacktestInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  sendBacktestMessage()
                }
              }}
              placeholder="Example: Backtest a 15-minute opening range breakout on NAS100 with VWAP confirmation and a 2R target..."
              aria-label="Describe a strategy to backtest"
              autoFocus
            />
            <div className="backtest-launch-footer">
              <button
                onClick={() => sendBacktestMessage()}
                disabled={!backtestInput.trim() || Boolean(transitionRequest)}
              >
                Start backtest <Icon name="chevron" size={14} />
              </button>
            </div>
          </div>

          <div className="backtest-launch-prompts">
            <span>Try a strategy</span>
            <div>
              <button
                onClick={() =>
                  sendBacktestMessage(
                    'Backtest a 15-minute opening range breakout on NAS100, SPY, and QQQ with VWAP confirmation and a 2R target',
                  )
                }
              >
                Opening range breakout
              </button>
              <button
                onClick={() =>
                  sendBacktestMessage(
                    'Test an RSI mean-reversion strategy on EURUSD using oversold and overbought entries with ATR-based stops',
                  )
                }
              >
                RSI mean reversion
              </button>
              <button
                onClick={() =>
                  sendBacktestMessage(
                    'Backtest a trend-following strategy using the 20 and 50 EMA with a volume confirmation filter',
                  )
                }
              >
                EMA trend strategy
              </button>
            </div>
          </div>

          <div className="backtest-launch-features">
            <div>
              <span className="launch-feature-icon">
                <Icon name="analyst" size={16} />
              </span>
              <strong>Conversational setup</strong>
              <small>Arcadia confirms every test assumption</small>
            </div>
            <div>
              <span className="launch-feature-icon">
                <Icon name="backtest" size={16} />
              </span>
              <strong>Quantitative engine</strong>
              <small>Robustness, Monte Carlo, and walk-forward</small>
            </div>
            <div>
              <span className="launch-feature-icon">
                <Icon name="history" size={16} />
              </span>
              <strong>Complete report</strong>
              <small>Every metric and simulated execution</small>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="backtesting-workspace">
      <section className="backtest-chat">
        <div className="backtest-chat-header">
          <div className="backtest-analyst-mark">
            <img src="/arcadia-logo.png" alt="" />
          </div>
          <div>
            <h2>Arcadia Backtest Analyst</h2>
            <p>
              <i /> Online · Strategy definition
            </p>
          </div>
          <span className="backtest-model">ARC-QUANT 2.4</span>
        </div>

        <div className="test-context">
          <div>
            <span>MARKETS</span>
            <strong>NAS100 · SPY · QQQ</strong>
          </div>
          <div>
            <span>RANGE</span>
            <strong>Jan 01–Apr 25</strong>
          </div>
          <div>
            <span>RISK</span>
            <strong>1.0% / trade</strong>
          </div>
        </div>

        <div className="backtest-messages">
          <div className="chat-date-divider">
            <span>BACKTEST SESSION · TODAY</span>
          </div>
          {messages.map((message) => (
            <div key={message.id} className={`backtest-message ${message.role}`}>
              {message.role === 'assistant' && (
                <span className="backtest-message-avatar">
                  <img src="/arcadia-logo.png" alt="" />
                </span>
              )}
              <div>
                <span>{message.role === 'assistant' ? 'Arcadia Analyst' : 'You'}</span>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {pendingMessage && (
            <div className="backtest-message assistant">
              <span className="backtest-message-avatar">
                <img src="/arcadia-logo.png" alt="" />
              </span>
              <div>
                <span>Arcadia Analyst</span>
                <div className="thinking-dots" aria-label="Arcadia is analyzing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="backtest-suggestions">
          <button
            disabled={Boolean(pendingMessage)}
            onClick={() => sendBacktestMessage('Change risk to 0.75% per trade')}
          >
            Change risk to 0.75%
          </button>
          <button
            disabled={Boolean(pendingMessage)}
            onClick={() => sendBacktestMessage('Add a 20-period volume filter')}
          >
            Add volume filter
          </button>
          <button
            className="primary"
            disabled={Boolean(pendingMessage)}
            onClick={() => sendBacktestMessage('Confirmed. Run the backtest')}
          >
            Confirm &amp; run
          </button>
        </div>

        <div className="backtest-composer">
          <textarea
            value={backtestInput}
            onChange={(event) => setBacktestInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                sendBacktestMessage()
              }
            }}
            placeholder="Describe a strategy or answer Arcadia..."
            aria-label="Backtest message"
          />
          <div>
            <span>Shift + Enter for a new line</span>
            <button
              onClick={() => sendBacktestMessage()}
              disabled={!backtestInput.trim() || Boolean(pendingMessage)}
              aria-label="Send message"
            >
              <Icon name="chevron" size={15} />
            </button>
          </div>
        </div>
      </section>

      <section
        className={`backtest-report-pane ${reportReady ? 'report-ready' : 'report-not-ready'}`}
      >
        <div className="backtest-report-header">
          <div>
            <span>BACKTEST REPORT</span>
            <h2>Opening Range Breakout + VWAP</h2>
            <p>Version 3 · Generated today at 11:42 AM · 90-day simulation</p>
          </div>
          <div>
            <span className={`report-complete ${reportReady ? '' : 'draft'}`}>
              <i /> {reportReady ? 'COMPLETE' : 'AWAITING CONFIRMATION'}
            </span>
            <button
              onClick={() => onComplete('Backtest report export prepared')}
              disabled={!reportReady}
            >
              Export report
            </button>
          </div>
        </div>

        {!reportReady && (
          <div className="backtest-report-pending">
            <div className="pending-report-icon">
              <Icon name="backtest" size={20} />
            </div>
            <h2>Confirm the test definition</h2>
            <p>
              Arcadia is clarifying your assumptions. Confirm the markets, period, capital, and risk
              settings in the conversation to generate the full report.
            </p>
            <div className="pending-definition">
              <div>
                <span>Strategy rules</span>
                <strong>Opening range + VWAP</strong>
                <i className="complete">Captured</i>
              </div>
              <div>
                <span>Markets</span>
                <strong>NAS100 · SPY · QQQ</strong>
                <i className="complete">Captured</i>
              </div>
              <div>
                <span>Risk &amp; capital</span>
                <strong>$100,000 · 1% per trade</strong>
                <i>Confirm</i>
              </div>
              <div>
                <span>Test period</span>
                <strong>Jan 01–Apr 25, 2025</strong>
                <i>Confirm</i>
              </div>
            </div>
            <div className="pending-report-skeleton" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        <div
          className={`backtest-report-content ${reportVersion ? 'report-updated' : ''}`}
          key={reportVersion}
        >
          <section className="backtest-overview">
            <div className="backtest-score">
              <div className="backtest-score-ring">
                <svg viewBox="0 0 42 42" aria-label="Strategy score 84 out of 100">
                  <circle cx="21" cy="21" r="16" />
                  <circle cx="21" cy="21" r="16" className="score-progress" />
                </svg>
                <strong>84</strong>
              </div>
              <div>
                <span>ROBUSTNESS SCORE</span>
                <strong>Production candidate</strong>
                <p>Positive expectancy with stable out-of-sample behavior.</p>
              </div>
            </div>
            <div>
              <span>NET PROFIT</span>
              <strong className="positive-value">+$32,840</strong>
              <small>After $1,284.60 fees</small>
            </div>
            <div>
              <span>TOTAL RETURN</span>
              <strong className="positive-value">+32.84%</strong>
              <small>38.12% annualized</small>
            </div>
            <div>
              <span>MAX DRAWDOWN</span>
              <strong className="negative-value">−8.42%</strong>
              <small>11-day recovery</small>
            </div>
          </section>

          <section className="backtest-report-section equity-report">
            <div className="backtest-section-title">
              <div>
                <h3>Equity curve</h3>
                <p>Portfolio value over time · Starting capital $100,000</p>
              </div>
              <div className="equity-legend">
                <span>
                  <i /> Portfolio
                </span>
                <strong>$132,840</strong>
              </div>
            </div>
            <div className="backtest-equity-chart">
              <div className="backtest-y-axis">
                <span>$135k</span>
                <span>$125k</span>
                <span>$115k</span>
                <span>$100k</span>
              </div>
              <svg viewBox="0 0 720 170" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="backtestEquityFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9a87ef" stopOpacity=".28" />
                    <stop offset="100%" stopColor="#9a87ef" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[22, 66, 110, 154].map((y) => (
                  <line key={y} x1="0" x2="720" y1={y} y2={y} />
                ))}
                <polygon
                  points="0,151 36,145 72,149 108,133 144,138 180,118 216,125 252,105 288,110 324,87 360,94 396,76 432,83 468,61 504,69 540,47 576,55 612,35 648,43 684,24 720,18 720,170 0,170"
                  fill="url(#backtestEquityFill)"
                />
                <polyline points="0,151 36,145 72,149 108,133 144,138 180,118 216,125 252,105 288,110 324,87 360,94 396,76 432,83 468,61 504,69 540,47 576,55 612,35 648,43 684,24 720,18" />
              </svg>
              <div className="backtest-x-axis">
                <span>Jan 01</span>
                <span>Feb 01</span>
                <span>Mar 01</span>
                <span>Apr 01</span>
                <span>Apr 25</span>
              </div>
            </div>
          </section>

          <div className="backtest-two-column">
            <BacktestMetricSection
              title="Performance metrics"
              subtitle="Return and expectancy profile"
              metrics={performanceMetrics}
            />
            <BacktestMetricSection
              title="Risk metrics"
              subtitle="Downside and recovery behavior"
              metrics={riskMetrics}
            />
          </div>

          <BacktestMetricSection
            title="Trade statistics"
            subtitle="Execution frequency, direction, and costs"
            metrics={backtestTradeStats}
          />

          <section className="backtest-report-section portfolio-analytics">
            <div className="backtest-section-title">
              <div>
                <h3>Portfolio analytics</h3>
                <p>Returns, drawdowns, distribution, and capital deployment</p>
              </div>
              <span>9 analytics</span>
            </div>
            <div className="portfolio-chart-grid">
              <article className="monthly-chart">
                <div>
                  <strong>Monthly returns</strong>
                  <span>Average +5.47%</span>
                </div>
                <div className="monthly-bars" aria-label="Monthly return bar chart">
                  {[42, 66, 51, 78, 58, 87].map((height, index) => (
                    <span key={index}>
                      <i style={{ height: `${height}%` }} />
                      <small>{['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][index]}</small>
                    </span>
                  ))}
                </div>
              </article>
              <article className="drawdown-chart">
                <div>
                  <strong>Drawdown chart</strong>
                  <span className="negative-value">Max −8.42%</span>
                </div>
                <svg viewBox="0 0 220 82" preserveAspectRatio="none">
                  <line x1="0" x2="220" y1="10" y2="10" />
                  <polygon points="0,10 20,18 40,35 60,23 80,55 100,68 120,42 140,30 160,61 180,45 200,20 220,14 220,10 0,10" />
                  <polyline points="0,10 20,18 40,35 60,23 80,55 100,68 120,42 140,30 160,61 180,45 200,20 220,14" />
                </svg>
              </article>
              <article className="distribution-chart">
                <div>
                  <strong>Return distribution</strong>
                  <span>Positive skew 0.84</span>
                </div>
                <div className="distribution-bars" aria-label="Return distribution histogram">
                  {[15, 27, 44, 68, 88, 73, 54, 38, 22, 11].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </article>
            </div>
            <div className="portfolio-stat-strip">
              <div>
                <span>Portfolio Value Over Time</span>
                <strong>$100k → $132.8k</strong>
              </div>
              <div>
                <span>Cumulative Returns</span>
                <strong className="positive-value">+32.84%</strong>
              </div>
              <div>
                <span>Rolling Performance</span>
                <strong className="positive-value">+4.2% · 30D</strong>
              </div>
              <div>
                <span>Exposure</span>
                <strong>62.4%</strong>
              </div>
              <div>
                <span>Capital Utilization</span>
                <strong>48.7%</strong>
              </div>
            </div>
          </section>

          <div className="backtest-two-column">
            <BacktestMetricSection
              title="Strategy analysis"
              subtitle="Performance across sessions and conditions"
              metrics={strategyAnalysisMetrics}
            />
            <BacktestMetricSection
              title="Advanced quantitative metrics"
              subtitle="Robustness and tail-risk diagnostics"
              metrics={quantitativeMetrics}
            />
          </div>

          <section className="backtest-report-section arcadia-insight-report">
            <div className="backtest-section-title">
              <div>
                <h3>Arcadia Insight</h3>
                <p>AI-powered strategy assessment and improvements</p>
              </div>
              <span className="insight-confidence">82% confidence</span>
            </div>
            <div className="arcadia-insight-grid">
              {arcadiaInsights.map(([title, copy], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="backtest-report-section backtest-trade-history">
            <div className="backtest-section-title">
              <div>
                <h3>Trade history</h3>
                <p>Complete simulated execution ledger · 231 total trades</p>
              </div>
              <span>Showing latest 4</span>
            </div>
            <div className="backtest-history-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Trade ID</th>
                    <th>Instrument</th>
                    <th>Trade Direction (Buy/Sell)</th>
                    <th>Entry Date &amp; Time</th>
                    <th>Exit Date &amp; Time</th>
                    <th>Entry price</th>
                    <th>Exit price</th>
                    <th>Stop loss</th>
                    <th>Take profit</th>
                    <th>Position size</th>
                    <th>Profit / Loss ($)</th>
                    <th>Profit / Loss (%)</th>
                    <th>Risk-to-Reward Achieved</th>
                    <th>Trade Duration</th>
                    <th>Exit Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {backtestHistoryRows.map((trade) => (
                    <tr key={trade.id}>
                      <td>{trade.id}</td>
                      <td>{trade.instrument}</td>
                      <td>
                        <span className={`backtest-direction ${trade.direction.toLowerCase()}`}>
                          {trade.direction}
                        </span>
                      </td>
                      <td>{trade.entryDate}</td>
                      <td>{trade.exitDate}</td>
                      <td>{trade.entry}</td>
                      <td>{trade.exit}</td>
                      <td>{trade.stop}</td>
                      <td>{trade.target}</td>
                      <td>{trade.size}</td>
                      <td className={trade.pnl.startsWith('+') ? 'pnl-gain' : 'pnl-loss'}>
                        {trade.pnl}
                      </td>
                      <td className={trade.pnlPercent.startsWith('+') ? 'pnl-gain' : 'pnl-loss'}>
                        {trade.pnlPercent}
                      </td>
                      <td>{trade.rr}</td>
                      <td>{trade.duration}</td>
                      <td>{trade.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="backtest-disclaimer">
            Backtest results are hypothetical and based on modeled fills. They do not guarantee
            future performance. Slippage, commissions, and market-impact assumptions are included
            where shown.
          </p>
        </div>
      </section>
    </div>
  )
}

const indicatorCodeTemplates: Record<string, string> = {
  TradingView: `//@version=5
indicator("Arcadia Adaptive Momentum", shorttitle="AAM", overlay=false)

// User inputs
fastLength = input.int(14, "Fast Momentum Length", minval=2)
slowLength = input.int(28, "Slow Signal Length", minval=3)
smoothLength = input.int(5, "Smoothing", minval=1)
upperBand = input.float(65.0, "Upper Threshold")
lowerBand = input.float(35.0, "Lower Threshold")
enableAlerts = input.bool(true, "Enable Signal Alerts")

// Adaptive momentum calculation
priceChange = ta.change(close)
positiveFlow = math.max(priceChange, 0)
negativeFlow = math.abs(math.min(priceChange, 0))
positiveAvg = ta.rma(positiveFlow, fastLength)
negativeAvg = ta.rma(negativeFlow, fastLength)
relativeStrength = negativeAvg == 0 ? 100 : positiveAvg / negativeAvg
rawMomentum = 100 - (100 / (1 + relativeStrength))
momentum = ta.ema(rawMomentum, smoothLength)
signal = ta.ema(momentum, slowLength)

// Signal conditions
bullishCross = ta.crossover(momentum, signal) and momentum < lowerBand
bearishCross = ta.crossunder(momentum, signal) and momentum > upperBand
trendBullish = momentum > signal

// Visual output
momentumColor = trendBullish ? color.rgb(92, 203, 139) : color.rgb(226, 103, 116)
plot(momentum, "Adaptive Momentum", color=momentumColor, linewidth=2)
plot(signal, "Signal", color=color.rgb(164, 145, 244), linewidth=1)
hline(upperBand, "Upper Band", color=color.new(color.red, 55))
hline(50, "Midline", color=color.new(color.gray, 75))
hline(lowerBand, "Lower Band", color=color.new(color.green, 55))
bgcolor(bullishCross ? color.new(color.green, 88) : bearishCross ? color.new(color.red, 88) : na)

plotshape(bullishCross, "Long Signal", shape.triangleup, location.bottom, color.rgb(92, 203, 139), size=size.tiny)
plotshape(bearishCross, "Short Signal", shape.triangledown, location.top, color.rgb(226, 103, 116), size=size.tiny)

// Alerts
alertcondition(enableAlerts and bullishCross, "Arcadia Long Signal", "Bullish momentum reversal on {{ticker}}")
alertcondition(enableAlerts and bearishCross, "Arcadia Short Signal", "Bearish momentum reversal on {{ticker}}")`,
  'MetaTrader 5': `//+------------------------------------------------------------------+
//| Arcadia Adaptive Momentum - MQL5                                  |
//+------------------------------------------------------------------+
#property indicator_separate_window
#property indicator_buffers 2
#property indicator_plots 2

input int FastLength = 14;
input int SlowLength = 28;
input int SmoothLength = 5;
input double UpperBand = 65.0;
input double LowerBand = 35.0;
input bool EnableAlerts = true;

double MomentumBuffer[];
double SignalBuffer[];

int OnInit() {
   SetIndexBuffer(0, MomentumBuffer, INDICATOR_DATA);
   SetIndexBuffer(1, SignalBuffer, INDICATOR_DATA);
   PlotIndexSetString(0, PLOT_LABEL, "Adaptive Momentum");
   PlotIndexSetString(1, PLOT_LABEL, "Signal");
   IndicatorSetString(INDICATOR_SHORTNAME, "Arcadia Adaptive Momentum");
   return(INIT_SUCCEEDED);
}

int OnCalculate(const int rates_total, const int prev_calculated,
                const datetime &time[], const double &open[],
                const double &high[], const double &low[],
                const double &close[], const long &tick_volume[],
                const long &volume[], const int &spread[]) {
   int start = MathMax(prev_calculated - 1, SlowLength);
   for(int i = start; i < rates_total; i++) {
      double gain = MathMax(close[i] - close[i-1], 0);
      double loss = MathMax(close[i-1] - close[i], 0);
      double rs = loss == 0 ? 100 : gain / loss;
      MomentumBuffer[i] = 100 - (100 / (1 + rs));
      SignalBuffer[i] = iMAOnArray(MomentumBuffer, rates_total, SlowLength, 0, MODE_EMA, i);
      if(EnableAlerts && MomentumBuffer[i] > SignalBuffer[i] && MomentumBuffer[i-1] <= SignalBuffer[i-1])
         Alert("Arcadia bullish momentum signal");
   }
   return(rates_total);
}`,
  NinjaTrader: `#region Using declarations
using System;
using System.Windows.Media;
using NinjaTrader.NinjaScript;
using NinjaTrader.NinjaScript.Indicators;
#endregion

namespace NinjaTrader.NinjaScript.Indicators
{
    public class ArcadiaAdaptiveMomentum : Indicator
    {
        private RSI momentum;
        private EMA signal;

        [NinjaScriptProperty]
        public int FastLength { get; set; } = 14;

        [NinjaScriptProperty]
        public int SlowLength { get; set; } = 28;

        protected override void OnStateChange()
        {
            if (State == State.SetDefaults)
            {
                Name = "Arcadia Adaptive Momentum";
                IsOverlay = false;
                AddPlot(Brushes.MediumPurple, "Momentum");
                AddPlot(Brushes.Gray, "Signal");
                AddLine(Brushes.DarkRed, 65, "Upper");
                AddLine(Brushes.DarkGreen, 35, "Lower");
            }
            else if (State == State.DataLoaded)
            {
                momentum = RSI(FastLength, 5);
                signal = EMA(momentum, SlowLength);
            }
        }

        protected override void OnBarUpdate()
        {
            if (CurrentBar < SlowLength) return;
            Values[0][0] = momentum[0];
            Values[1][0] = signal[0];
            PlotBrushes[0][0] = momentum[0] > signal[0] ? Brushes.MediumSeaGreen : Brushes.IndianRed;
        }
    }
}`,
}

const indicatorPlatformDetails: Record<
  string,
  {
    language: string
    file: string
    version: string
  }
> = {
  TradingView: {
    language: 'Pine Script',
    file: 'arcadia_momentum.pine',
    version: 'v5',
  },
  'MetaTrader 5': {
    language: 'MQL5',
    file: 'ArcadiaMomentum.mq5',
    version: 'Build 4150+',
  },
  NinjaTrader: {
    language: 'NinjaScript',
    file: 'ArcadiaAdaptiveMomentum.cs',
    version: 'NT 8',
  },
}

function IndicatorBuilderWorkspace({ onComplete }: { onComplete: (message: string) => void }) {
  const [indicatorInput, setIndicatorInput] = useState('')
  const [started, setStarted] = useState(false)
  const [transitionRequest, setTransitionRequest] = useState<string | null>(null)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const [codeReady, setCodeReady] = useState(false)
  const [platform, setPlatform] = useState('TradingView')
  const [messages, setMessages] = useState<
    {
      id: number
      role: 'assistant' | 'user'
      content: string
    }[]
  >([
    {
      id: 1,
      role: 'assistant',
      content:
        'I’ve captured your indicator concept. I’ll clarify the calculation, visual rules, platform, inputs, and alert conditions before generating production-ready code.',
    },
  ])

  useEffect(() => {
    if (!transitionRequest) return

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now(), role: 'user', content: transitionRequest },
      ])
      setIndicatorInput('')
      setStarted(true)
      setPendingMessage(transitionRequest)
      setTransitionRequest(null)
    }, 260)

    return () => window.clearTimeout(timer)
  }, [transitionRequest])

  useEffect(() => {
    if (!pendingMessage) return

    const timer = window.setTimeout(() => {
      const shouldGenerate = /confirm|generate|looks good|ready|create the code/i.test(
        pendingMessage,
      )
      setMessages((current) => [
        ...current,
        {
          id: Date.now(),
          role: 'assistant',
          content: shouldGenerate
            ? `Your ${platform} indicator is ready. I generated the full ${indicatorPlatformDetails[platform].language} source with configurable inputs, visuals, and alert conditions.`
            : `I’ve structured this as an adaptive momentum oscillator. Should it use ${platform}, appear in a separate pane, include 35/65 thresholds, and trigger long and short alerts on confirmed crosses?`,
        },
      ])
      setPendingMessage(null)

      if (shouldGenerate) {
        setCodeReady(true)
        onComplete('Indicator code generated')
      }
    }, 850)

    return () => window.clearTimeout(timer)
  }, [pendingMessage, platform])

  function sendIndicatorMessage(value = indicatorInput) {
    const content = value.trim()
    if (!content || pendingMessage || transitionRequest) return

    if (!started) {
      setTransitionRequest(content)
      return
    }

    setMessages((current) => [...current, { id: Date.now(), role: 'user', content }])
    setIndicatorInput('')
    setPendingMessage(content)
  }

  async function copyIndicatorCode() {
    try {
      await navigator.clipboard.writeText(indicatorCodeTemplates[platform])
      onComplete('Indicator code copied')
    } catch {
      onComplete('Unable to access clipboard')
    }
  }

  function downloadIndicatorCode() {
    const blob = new Blob([indicatorCodeTemplates[platform]], {
      type: 'text/plain;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = indicatorPlatformDetails[platform].file
    anchor.click()
    URL.revokeObjectURL(url)
    onComplete('Indicator file downloaded')
  }

  if (!started) {
    return (
      <div
        className={`backtest-launch indicator-launch ${
          transitionRequest ? 'is-transitioning' : ''
        }`}
      >
        <div className="backtest-launch-glow" />
        <section className="backtest-launch-center">
          <div className="backtest-launch-intro">
            <img src="/arcadia-logo.png" alt="" />
            <h1>What&nbsp;&nbsp;would you like to build?</h1>
            <p>
              Describe the calculation, signals, visuals, or trading idea in plain English. Arcadia
              will clarify the specification and generate code for your preferred platform.
            </p>
          </div>

          <div className="backtest-launch-composer indicator-launch-composer">
            <textarea
              value={indicatorInput}
              onChange={(event) => setIndicatorInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  sendIndicatorMessage()
                }
              }}
              placeholder="Example: Build a momentum oscillator that changes color with trend direction, marks reversals below 35 and above 65, and sends alerts..."
              aria-label="Describe an indicator to build"
              autoFocus
            />
            <div className="backtest-launch-footer">
              <button
                onClick={() => sendIndicatorMessage()}
                disabled={!indicatorInput.trim() || Boolean(transitionRequest)}
              >
                Build indicator <Icon name="chevron" size={14} />
              </button>
            </div>
          </div>

          <div className="backtest-launch-prompts">
            <span>Try an indicator</span>
            <div>
              <button
                onClick={() =>
                  sendIndicatorMessage(
                    'Build an adaptive momentum oscillator with reversal signals, trend colors, and configurable alerts',
                  )
                }
              >
                Adaptive momentum
              </button>
              <button
                onClick={() =>
                  sendIndicatorMessage(
                    'Create a multi-timeframe trend dashboard using the 20, 50, and 200 EMA',
                  )
                }
              >
                MTF trend dashboard
              </button>
              <button
                onClick={() =>
                  sendIndicatorMessage(
                    'Build a liquidity sweep indicator that marks prior session highs and lows',
                  )
                }
              >
                Liquidity sweeps
              </button>
            </div>
          </div>

          <div className="backtest-launch-features">
            <div>
              <span className="launch-feature-icon">
                <Icon name="analyst" size={16} />
              </span>
              <strong>Describe it naturally</strong>
              <small>Arcadia turns ideas into precise rules</small>
            </div>
            <div>
              <span className="launch-feature-icon">
                <Icon name="indicator" size={16} />
              </span>
              <strong>Visual preview</strong>
              <small>Confirm plots, signals, and thresholds</small>
            </div>
            <div>
              <span className="launch-feature-icon">
                <Icon name="strategy" size={16} />
              </span>
              <strong>Platform-ready code</strong>
              <small>Copy or download the finished source</small>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="backtesting-workspace indicator-workspace">
      <section className="backtest-chat indicator-chat">
        <div className="backtest-chat-header">
          <div className="backtest-analyst-mark">
            <img src="/arcadia-logo.png" alt="" />
          </div>
          <div>
            <h2>Arcadia Indicator Engineer</h2>
            <p>
              <i /> Online · Build specification
            </p>
          </div>
          <span className="backtest-model">ARC-CODE 1.8</span>
        </div>

        <div className="indicator-platforms">
          {Object.keys(indicatorCodeTemplates).map((item) => (
            <button
              key={item}
              className={platform === item ? 'active' : ''}
              disabled={Boolean(pendingMessage)}
              onClick={() => {
                setPlatform(item)
                setCodeReady(false)
                sendIndicatorMessage(`Use ${item} as the target platform`)
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="backtest-messages">
          <div className="chat-date-divider">
            <span>INDICATOR BUILD · TODAY</span>
          </div>
          {messages.map((message) => (
            <div key={message.id} className={`backtest-message ${message.role}`}>
              {message.role === 'assistant' && (
                <span className="backtest-message-avatar">
                  <img src="/arcadia-logo.png" alt="" />
                </span>
              )}
              <div>
                <span>{message.role === 'assistant' ? 'Arcadia Engineer' : 'You'}</span>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {pendingMessage && (
            <div className="backtest-message assistant">
              <span className="backtest-message-avatar">
                <img src="/arcadia-logo.png" alt="" />
              </span>
              <div>
                <span>Arcadia Engineer</span>
                <div className="thinking-dots" aria-label="Arcadia is working">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="backtest-suggestions">
          <button
            disabled={Boolean(pendingMessage)}
            onClick={() => sendIndicatorMessage('Add long and short alert conditions')}
          >
            Add alerts
          </button>
          <button
            disabled={Boolean(pendingMessage)}
            onClick={() => sendIndicatorMessage('Make all lengths and thresholds configurable')}
          >
            Configurable inputs
          </button>
          <button
            className="primary"
            disabled={Boolean(pendingMessage)}
            onClick={() => sendIndicatorMessage('Confirmed. Generate the code')}
          >
            Confirm &amp; generate
          </button>
        </div>

        <div className="backtest-composer">
          <textarea
            value={indicatorInput}
            onChange={(event) => setIndicatorInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                sendIndicatorMessage()
              }
            }}
            placeholder="Answer Arcadia or refine your indicator..."
            aria-label="Indicator builder message"
          />
          <div>
            <span>Shift + Enter for a new line</span>
            <button
              onClick={() => sendIndicatorMessage()}
              disabled={!indicatorInput.trim() || Boolean(pendingMessage)}
              aria-label="Send message"
            >
              <Icon name="chevron" size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className={`indicator-output-pane ${codeReady ? 'code-ready' : 'code-not-ready'}`}>
        <div className="indicator-output-header">
          <div>
            <span>INDICATOR OUTPUT</span>
            <h2>Arcadia Adaptive Momentum</h2>
            <p>
              {indicatorPlatformDetails[platform].language} ·{' '}
              {indicatorPlatformDetails[platform].version}
            </p>
          </div>
          <div>
            <span className={`code-status ${codeReady ? '' : 'draft'}`}>
              <i /> {codeReady ? 'CODE READY' : 'SPECIFICATION DRAFT'}
            </span>
            <button disabled={!codeReady} onClick={downloadIndicatorCode}>
              Download
            </button>
            <button className="copy-code-button" disabled={!codeReady} onClick={copyIndicatorCode}>
              Copy code
            </button>
          </div>
        </div>

        {!codeReady ? (
          <div className="indicator-spec-draft">
            <div className="pending-report-icon">
              <Icon name="indicator" size={20} />
            </div>
            <h2>Confirm the indicator specification</h2>
            <p>
              Review the extracted logic below, choose your target platform, and confirm the build
              in the conversation.
            </p>
            <div className="indicator-spec-list">
              <div>
                <span>Indicator type</span>
                <strong>Adaptive momentum oscillator</strong>
                <i className="complete">Captured</i>
              </div>
              <div>
                <span>Visual output</span>
                <strong>Trend line · Signal line · Reversal markers</strong>
                <i className="complete">Captured</i>
              </div>
              <div>
                <span>Thresholds</span>
                <strong>Upper 65 · Lower 35 · Midline 50</strong>
                <i>Confirm</i>
              </div>
              <div>
                <span>Target platform</span>
                <strong>{platform}</strong>
                <i>Confirm</i>
              </div>
            </div>
            <div className="indicator-draft-preview">
              <svg viewBox="0 0 520 150" preserveAspectRatio="none">
                {[25, 75, 125].map((y) => (
                  <line key={y} x1="0" x2="520" y1={y} y2={y} />
                ))}
                <polyline points="0,105 35,92 70,111 105,76 140,82 175,49 210,62 245,32 280,57 315,71 350,44 385,87 420,73 455,112 490,91 520,100" />
                <polyline
                  className="signal"
                  points="0,99 35,96 70,98 105,88 140,81 175,66 210,61 245,51 280,52 315,58 350,60 385,69 420,75 455,86 490,92 520,95"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="indicator-code-output">
            <div className="indicator-preview-panel">
              <div className="indicator-preview-heading">
                <div>
                  <span>VISUAL PREVIEW</span>
                  <strong>Adaptive Momentum · NAS100 5m</strong>
                </div>
                <span>LIVE PREVIEW</span>
              </div>
              <svg viewBox="0 0 650 155" preserveAspectRatio="none">
                {[28, 77, 126].map((y) => (
                  <line key={y} x1="0" x2="650" y1={y} y2={y} />
                ))}
                <rect x="0" y="0" width="650" height="28" className="upper-zone" />
                <rect x="0" y="126" width="650" height="29" className="lower-zone" />
                <polyline points="0,112 32,96 64,119 96,84 128,91 160,52 192,63 224,31 256,48 288,73 320,58 352,89 384,76 416,112 448,102 480,128 512,97 544,71 576,82 608,49 650,58" />
                <polyline
                  className="signal"
                  points="0,103 32,101 64,104 96,96 128,88 160,74 192,66 224,55 256,52 288,59 320,64 352,72 384,79 416,90 448,98 480,105 512,103 544,93 576,84 608,72 650,64"
                />
                <circle cx="224" cy="31" r="4" className="short-marker" />
                <circle cx="480" cy="128" r="4" className="long-marker" />
              </svg>
            </div>

            <div className="code-editor">
              <div className="code-editor-toolbar">
                <div>
                  <span className="code-file-dot" />
                  <strong>{indicatorPlatformDetails[platform].file}</strong>
                  <span>{indicatorPlatformDetails[platform].language}</span>
                </div>
                <span>{indicatorCodeTemplates[platform].split('\n').length} lines</span>
              </div>
              <div className="code-lines">
                {indicatorCodeTemplates[platform].split('\n').map((line, index) => (
                  <div key={`${index}-${line}`}>
                    <span>{index + 1}</span>
                    <code>{line || ' '}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="indicator-output-footer">
              <div>
                <span>INPUTS</span>
                <strong>6 configurable</strong>
              </div>
              <div>
                <span>PLOTS</span>
                <strong>2 lines · 3 levels</strong>
              </div>
              <div>
                <span>ALERTS</span>
                <strong>Long &amp; short</strong>
              </div>
              <div>
                <span>VALIDATION</span>
                <strong className="positive-value">Passed</strong>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function PositionLevelChart({ trade }: { trade: (typeof historyTrades)[number] }) {
  const moveUp =
    (trade.direction === 'Long' && trade.gain) || (trade.direction === 'Short' && !trade.gain)
  const closes = moveUp
    ? [166, 153, 159, 143, 134, 140, 119, 106, 112, 92, 78, 69]
    : [69, 83, 77, 95, 106, 99, 120, 134, 127, 147, 159, 166]
  const candles = closes.map((close, index) => {
    const open = index === 0 ? close + (moveUp ? 9 : -9) : closes[index - 1] + ((index % 3) - 1) * 3
    return {
      x: 48 + index * 41,
      open,
      close,
      high: Math.min(open, close) - 8 - (index % 2) * 2,
      low: Math.max(open, close) + 9 + ((index + 1) % 2) * 2,
      volume: 10 + ((index * 7) % 22),
    }
  })
  const isLong = trade.direction === 'Long'
  const targetY = isLong ? 38 : 190
  const stopY = isLong ? 190 : 38
  const entryY = 116
  const exitY = trade.gain ? (isLong ? 65 : 166) : isLong ? 166 : 65
  const rewardTop = Math.min(entryY, targetY)
  const rewardHeight = Math.abs(entryY - targetY)
  const riskTop = Math.min(entryY, stopY)
  const riskHeight = Math.abs(entryY - stopY)

  return (
    <div className={`position-chart ${trade.gain ? 'gain' : 'loss'}`}>
      <div className="position-chart-toolbar">
        <div>
          <strong>{trade.ticker}</strong>
          <span>·</span>
          <span className="chart-interval">5m</span>
          <span>·</span>
          <small>
            O {trade.entry} &nbsp; H {trade.takeProfit} &nbsp; L {trade.stopLoss} &nbsp; C{' '}
            {trade.exit}
          </small>
        </div>
        <div>
          <span className="market-status">
            <i /> CLOSED
          </span>
          <span>UTC−4</span>
        </div>
      </div>
      <svg
        viewBox="0 0 600 242"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${trade.direction} ${trade.ticker} position chart with entry at ${trade.entry}, exit at ${trade.exit}, stop loss at ${trade.stopLoss}, and target at ${trade.takeProfit}`}
      >
        <g className="chart-grid">
          {[28, 66, 104, 142, 180, 218].map((y) => (
            <line key={`h-${y}`} x1="0" x2="600" y1={y} y2={y} />
          ))}
          {[55, 137, 219, 301, 383, 465, 547].map((x) => (
            <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="218" />
          ))}
        </g>

        <g className="volume-bars">
          {candles.map((candle) => (
            <rect
              key={`volume-${candle.x}`}
              x={candle.x - 7}
              y={218 - candle.volume}
              width="14"
              height={candle.volume}
              className={candle.close < candle.open ? 'up' : 'down'}
            />
          ))}
        </g>

        <g className="trade-position-tool">
          <rect x="150" y={rewardTop} width="330" height={rewardHeight} className="reward-zone" />
          <rect x="150" y={riskTop} width="330" height={riskHeight} className="risk-zone" />
          <line x1="150" x2="480" y1={entryY} y2={entryY} className="entry-boundary" />
          <text x="160" y={isLong ? entryY - 7 : entryY + 13} className="tool-copy">
            Risk / reward · {trade.rMultiple}
          </text>
        </g>

        <g className="candles">
          {candles.map((candle) => {
            const rising = candle.close < candle.open
            return (
              <g key={candle.x} className={rising ? 'up' : 'down'}>
                <line x1={candle.x} x2={candle.x} y1={candle.high} y2={candle.low} />
                <rect
                  x={candle.x - 5}
                  y={Math.min(candle.open, candle.close)}
                  width="10"
                  height={Math.max(3, Math.abs(candle.open - candle.close))}
                />
              </g>
            )
          })}
        </g>

        <g className="level-line target-line">
          <line x1="18" x2="580" y1={targetY} y2={targetY} />
          <rect x="500" y={targetY - 9} width="80" height="17" rx="3" />
          <text x="540" y={targetY + 3} textAnchor="middle">
            TP {trade.takeProfit}
          </text>
        </g>
        <g className="level-line stop-line">
          <line x1="18" x2="580" y1={stopY} y2={stopY} />
          <rect x="500" y={stopY - 9} width="80" height="17" rx="3" />
          <text x="540" y={stopY + 3} textAnchor="middle">
            SL {trade.stopLoss}
          </text>
        </g>
        <g className="level-line entry-line">
          <line x1="18" x2="580" y1={entryY} y2={entryY} />
          <rect x="18" y={entryY - 9} width="88" height="17" rx="3" />
          <text x="62" y={entryY + 3} textAnchor="middle">
            ENTRY {trade.entry}
          </text>
        </g>
        <g className={`level-line exit-line ${trade.gain ? 'gain' : 'loss'}`}>
          <line x1="270" x2="580" y1={exitY} y2={exitY} />
          <circle cx="474" cy={exitY} r="4" />
          <rect x="500" y={exitY - 9} width="80" height="17" rx="3" />
          <text x="540" y={exitY + 3} textAnchor="middle">
            EXIT {trade.exit}
          </text>
        </g>
        <g className="chart-time-axis">
          <text x="42" y="237">
            09:30
          </text>
          <text x="167" y="237">
            10:00
          </text>
          <text x="292" y="237">
            10:30
          </text>
          <text x="417" y="237">
            11:00
          </text>
          <text x="542" y="237">
            11:30
          </text>
        </g>
      </svg>
      <div className="position-chart-legend">
        <span>
          <i className="entry" /> Entry
        </span>
        <span>
          <i className="target" /> Take profit
        </span>
        <span>
          <i className="stop" /> Stop loss
        </span>
        <span>
          <i className="exit" /> Actual exit
        </span>
      </div>
    </div>
  )
}

function TradeHistoryWorkspace() {
  const [tradeQuery, setTradeQuery] = useState('')
  const [tradeFilter, setTradeFilter] = useState<'all' | 'wins' | 'losses'>('all')
  const [selectedTrade, setSelectedTrade] = useState<(typeof historyTrades)[number] | null>(null)
  const [importOpen, setImportOpen] = useState(false)
  const [importFileName, setImportFileName] = useState('')
  const [isAnalyzingImport, setIsAnalyzingImport] = useState(false)

  const filteredHistory = historyTrades.filter((trade) => {
    const matchesQuery = `${trade.instrument} ${trade.ticker} ${trade.strategy} ${trade.session}`
      .toLowerCase()
      .includes(tradeQuery.toLowerCase())
    const matchesFilter =
      tradeFilter === 'all' ||
      (tradeFilter === 'wins' && trade.gain) ||
      (tradeFilter === 'losses' && !trade.gain)
    return matchesQuery && matchesFilter
  })

  useEffect(() => {
    if (!selectedTrade && !importOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTrade(null)
        setImportOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedTrade, importOpen])

  function openTradeImport() {
    setImportFileName('')
    setIsAnalyzingImport(false)
    setImportOpen(true)
  }

  function handleTradeImage(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setImportFileName(file.name)
    setIsAnalyzingImport(true)
  }

  return (
    <div className="history-workspace">
      <section className="history-intro">
        <div>
          <span>EXECUTION JOURNAL</span>
          <h1>Every position, one complete record.</h1>
          <p>
            Review performance, inspect individual executions, and identify the patterns shaping
            your edge.
          </p>
        </div>
        <div className="history-header-actions">
          <div className="history-period">
            <Icon name="calendar" size={15} />
            <span>
              <small>REPORTING PERIOD</small>
              May 1–May 25, 2025
            </span>
          </div>
          <button className="import-trades-button" onClick={openTradeImport}>
            <Icon name="upload" size={15} />
            Import Trades
          </button>
        </div>
      </section>

      <section className="history-stats" aria-label="Trade history summary">
        <article className="history-stat purple-stat">
          <span className="history-stat-icon">
            <Icon name="history" size={17} />
          </span>
          <div>
            <span>Total trades</span>
            <strong>247</strong>
            <small>18 trades this month</small>
          </div>
        </article>
        <article className="history-stat blue-stat">
          <span className="history-stat-icon">
            <Icon name="indicator" size={17} />
          </span>
          <div>
            <span>Most traded instrument</span>
            <strong>NAS100</strong>
            <small>64 trades · 25.9% of total</small>
          </div>
        </article>
        <article className="history-stat amber-stat">
          <span className="history-stat-icon">
            <Icon name="calendar" size={17} />
          </span>
          <div>
            <span>Average trade duration</span>
            <strong>1h 42m</strong>
            <small>12 min shorter this month</small>
          </div>
        </article>
        <article className="history-stat green-stat">
          <span className="history-stat-icon">
            <Icon name="bolt" size={17} />
          </span>
          <div>
            <span>Best trade overall</span>
            <strong>+$3,842</strong>
            <small>BTCUSD · May 20, 2025</small>
          </div>
        </article>
      </section>

      <section className="history-ledger">
        <div className="ledger-heading">
          <div>
            <h2>All trades</h2>
            <p>Complete execution history across connected accounts</p>
          </div>
          <div className="ledger-tools">
            <label className="ledger-search">
              <Icon name="search" size={15} />
              <input
                value={tradeQuery}
                onChange={(event) => setTradeQuery(event.target.value)}
                placeholder="Search instrument or strategy"
                aria-label="Search trade history"
              />
            </label>
            <div className="trade-filter" aria-label="Filter trades">
              {(['all', 'wins', 'losses'] as const).map((filter) => (
                <button
                  key={filter}
                  className={tradeFilter === filter ? 'active' : ''}
                  onClick={() => setTradeFilter(filter)}
                >
                  {filter === 'all' ? 'All trades' : filter === 'wins' ? 'Winners' : 'Losses'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Trade</th>
                <th>Instrument</th>
                <th>Direction</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Duration</th>
                <th>Strategy</th>
                <th>Net P&amp;L</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((trade) => (
                <tr
                  key={trade.id}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open ${trade.instrument} trade from ${trade.date}`}
                  onClick={() => setSelectedTrade(trade)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelectedTrade(trade)
                    }
                  }}
                >
                  <td>
                    <span className="trade-id">{trade.id}</span>
                    <small>
                      {trade.date} · {trade.time}
                    </small>
                  </td>
                  <td>
                    <span className={`history-symbol ${trade.gain ? 'gain' : 'loss'}`}>
                      {trade.ticker.slice(0, 2)}
                    </span>
                    <span>
                      <strong>{trade.instrument}</strong>
                      <small>{trade.ticker}</small>
                    </span>
                  </td>
                  <td>
                    <span className={`direction ${trade.direction.toLowerCase()}`}>
                      <i /> {trade.direction}
                    </span>
                  </td>
                  <td>{trade.entry}</td>
                  <td>{trade.exit}</td>
                  <td>{trade.duration}</td>
                  <td>
                    <span className="strategy-tag">{trade.strategy}</span>
                  </td>
                  <td className={trade.gain ? 'pnl-gain' : 'pnl-loss'}>{trade.pnl}</td>
                  <td>
                    <Icon name="chevron" size={14} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHistory.length === 0 && (
            <div className="history-empty">
              <Icon name="search" size={20} />
              <strong>No matching trades</strong>
              <span>Try another instrument, strategy, or result filter.</span>
            </div>
          )}
        </div>
        <div className="ledger-footer">
          <span>Showing {filteredHistory.length} of 247 trades</span>
          <span>Select any trade to view its complete execution record</span>
        </div>
      </section>

      {importOpen && (
        <div
          className="trade-modal-backdrop import-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setImportOpen(false)
          }}
        >
          <section
            className="import-trades-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-trades-title"
          >
            <div className="import-modal-header">
              <div>
                <span className="import-modal-icon">
                  <Icon name="upload" size={17} />
                </span>
                <div>
                  <h2 id="import-trades-title">Upload trades</h2>
                  <p>Import a screenshot of your completed position</p>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setImportOpen(false)}
                aria-label="Close trade import"
              >
                ×
              </button>
            </div>

            {isAnalyzingImport ? (
              <div className="import-analysis" role="status">
                <div className="import-analysis-ring">
                  <svg viewBox="0 0 54 54" aria-hidden="true">
                    <circle cx="27" cy="27" r="21" />
                    <circle cx="27" cy="27" r="21" className="analysis-ring-progress" />
                  </svg>
                  <span className="import-analysis-logo">
                    <img src="/arcadia-logo.png" alt="" />
                  </span>
                </div>
                <h3>Analyzing trade</h3>
                <p>Arcadia is reading the position, prices, direction, and result.</p>
                <span className="import-file-name">{importFileName}</span>
                <div className="analysis-steps">
                  <span className="active">Reading image</span>
                  <span>Extracting position</span>
                  <span>Preparing journal entry</span>
                </div>
              </div>
            ) : (
              <div className="import-upload-body">
                <label className="trade-image-drop">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => handleTradeImage(event.target.files?.[0])}
                  />
                  <span className="upload-visual">
                    <Icon name="upload" size={22} />
                  </span>
                  <strong>Upload a trade image</strong>
                  <p>Choose a screenshot from your broker or trading platform.</p>
                  <span className="choose-image-button">Choose image</span>
                  <small>PNG, JPG, or WEBP · Maximum 10 MB</small>
                </label>
                <div className="import-privacy">
                  <Icon name="analyst" size={14} />
                  <span>
                    <strong>Private analysis</strong>
                    Your screenshot is used only to create this trade entry.
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {selectedTrade && (
        <div
          className="trade-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedTrade(null)
          }}
        >
          <section
            className="trade-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trade-dialog-title"
          >
            <div className="trade-modal-header">
              <div className={`modal-symbol ${selectedTrade.gain ? 'gain' : 'loss'}`}>
                {selectedTrade.ticker.slice(0, 2)}
              </div>
              <div>
                <div className="modal-title-row">
                  <h2 id="trade-dialog-title">{selectedTrade.instrument}</h2>
                  <span className={`direction ${selectedTrade.direction.toLowerCase()}`}>
                    <i /> {selectedTrade.direction}
                  </span>
                </div>
                <p>
                  {selectedTrade.ticker} · {selectedTrade.id} · Closed {selectedTrade.date} at{' '}
                  {selectedTrade.time}
                </p>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedTrade(null)}
                aria-label="Close trade details"
              >
                ×
              </button>
            </div>

            <div className="modal-performance">
              <div>
                <span>NET P&amp;L</span>
                <strong className={selectedTrade.gain ? 'pnl-gain' : 'pnl-loss'}>
                  {selectedTrade.pnl}
                </strong>
              </div>
              <div>
                <span>RETURN</span>
                <strong className={selectedTrade.gain ? 'pnl-gain' : 'pnl-loss'}>
                  {selectedTrade.returnValue}
                </strong>
              </div>
              <div>
                <span>R MULTIPLE</span>
                <strong>{selectedTrade.rMultiple}</strong>
              </div>
              <div>
                <span>DURATION</span>
                <strong>{selectedTrade.duration}</strong>
              </div>
            </div>

            <div className="trade-modal-body">
              <div className="modal-main">
                <article className="modal-panel">
                  <div className="modal-panel-title">
                    <h3>Position levels</h3>
                    <span>5-minute execution view</span>
                  </div>
                  <PositionLevelChart trade={selectedTrade} />
                </article>

                <article className="modal-panel">
                  <div className="modal-panel-title">
                    <h3>Execution details</h3>
                    <span>Position metadata</span>
                  </div>
                  <div className="execution-grid">
                    <div>
                      <span>Position size</span>
                      <strong>{selectedTrade.size}</strong>
                    </div>
                    <div>
                      <span>Strategy</span>
                      <strong>{selectedTrade.strategy}</strong>
                    </div>
                    <div>
                      <span>Trading session</span>
                      <strong>{selectedTrade.session}</strong>
                    </div>
                    <div>
                      <span>Account</span>
                      <strong>Arcadia Live · 4821</strong>
                    </div>
                  </div>
                </article>

                <article className="modal-panel trade-note">
                  <div className="modal-panel-title">
                    <h3>Trade notes</h3>
                    <span>Journal entry</span>
                  </div>
                  <p>{selectedTrade.note}</p>
                </article>
              </div>

              <aside className="modal-side">
                <article className="modal-panel pnl-breakdown">
                  <div className="modal-panel-title">
                    <h3>P&amp;L breakdown</h3>
                    <span>Final settlement</span>
                  </div>
                  <div
                    className={`pnl-graphic ${selectedTrade.gain ? 'gain' : 'loss'}`}
                    aria-label={`Gross profit and loss ${selectedTrade.grossPnl}, fees ${selectedTrade.fees}, net profit and loss ${selectedTrade.pnl}`}
                  >
                    <div className="pnl-axis">
                      <span>Gross</span>
                      <span>Fees</span>
                      <span>Net</span>
                    </div>
                    <div className="pnl-columns" aria-hidden="true">
                      <span className="gross-column">
                        <i />
                      </span>
                      <span className="fees-column">
                        <i />
                      </span>
                      <span className="net-column">
                        <i />
                      </span>
                    </div>
                    <div className="pnl-baseline" />
                  </div>
                  <div>
                    <span>
                      Gross P&amp;L <b>{selectedTrade.grossPnl}</b>
                    </span>
                    <span>
                      Commissions &amp; fees <b>{selectedTrade.fees}</b>
                    </span>
                    <span className="net-row">
                      Net P&amp;L
                      <b className={selectedTrade.gain ? 'pnl-gain' : 'pnl-loss'}>
                        {selectedTrade.pnl}
                      </b>
                    </span>
                  </div>
                </article>

                <article className="modal-panel execution-quality">
                  <div className="modal-panel-title">
                    <h3>Execution quality</h3>
                    <span>Arcadia analysis</span>
                  </div>
                  <div className="quality-overview">
                    <div className="quality-ring">
                      <svg viewBox="0 0 42 42" aria-hidden="true">
                        <circle cx="21" cy="21" r="16" />
                        <circle
                          cx="21"
                          cy="21"
                          r="16"
                          className="quality-ring-progress"
                          style={{
                            strokeDasharray: selectedTrade.gain ? '88 101' : '64 101',
                          }}
                        />
                      </svg>
                      <div>
                        <strong>{selectedTrade.gain ? '88' : '64'}</strong>
                        <span>/100</span>
                      </div>
                    </div>
                    <div className="quality-factors">
                      <span>
                        Entry timing <b>{selectedTrade.gain ? '92' : '61'}</b>
                      </span>
                      <span>
                        Risk control <b>{selectedTrade.gain ? '90' : '82'}</b>
                      </span>
                      <span>
                        Exit quality <b>{selectedTrade.gain ? '82' : '49'}</b>
                      </span>
                    </div>
                  </div>
                  <p>
                    {selectedTrade.gain
                      ? 'Entry timing and risk control were aligned with your plan.'
                      : 'Risk was controlled, but confirmation quality was below your average.'}
                  </p>
                </article>
              </aside>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [query] = useState('')
  const [toast, setToast] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [dashboardImportOpen, setDashboardImportOpen] = useState(false)
  const [dashboardImportAnalyzing, setDashboardImportAnalyzing] = useState(false)
  const [dashboardImportFile, setDashboardImportFile] = useState('')
  const [connectAccountOpen, setConnectAccountOpen] = useState(false)

  useEffect(() => {
    if (!dashboardImportOpen && !connectAccountOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDashboardImportOpen(false)
        setConnectAccountOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [dashboardImportOpen, connectAccountOpen])

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  function navigate(label: string) {
    setActiveNav(label)
    if (label !== 'Dashboard' && label !== 'AI Analyst') {
      showToast(`${label} workspace selected`)
    }
  }

  function openDashboardImport() {
    setDashboardImportFile('')
    setDashboardImportAnalyzing(false)
    setDashboardImportOpen(true)
  }

  function handleDashboardTradeImage(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setDashboardImportFile(file.name)
    setDashboardImportAnalyzing(true)
  }

  function chooseConnection(method: string) {
    setConnectAccountOpen(false)
    showToast(`${method} selected`)
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        activeNav={activeNav}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((value) => !value)}
      />
      <main>
        <Header
          activeNav={activeNav}
          onImportTrades={openDashboardImport}
          onConnectAccount={() => setConnectAccountOpen(true)}
        />
        {activeNav === 'AI Analyst' ? (
          <AIAnalystWorkspace onComplete={showToast} />
        ) : activeNav === 'Strategy Lookup' ? (
          <StrategyLookupWorkspace onComplete={showToast} />
        ) : activeNav === 'Trade History' ? (
          <TradeHistoryWorkspace />
        ) : activeNav === 'Backtesting' ? (
          <BacktestingWorkspace onComplete={showToast} />
        ) : activeNav === 'Indicator Builder' ? (
          <IndicatorBuilderWorkspace onComplete={showToast} />
        ) : activeNav === 'Markets' ? (
          <MarketsWorkspace />
        ) : (
          <div className="content">
            <MetricCards />
            <div className="primary-grid">
              <EquityChart />
              <AnalystPanel onViewReport={() => showToast('AI report opened')} />
            </div>
            <QuickActions onAction={(title) => showToast(`${title} opened`)} />
            <RecentTrades query={query} />
            <footer>
              <span>Market data delayed by 15 minutes</span>
              <span>Last synced today at 10:42 AM</span>
            </footer>
          </div>
        )}
      </main>

      {dashboardImportOpen && (
        <div
          className="trade-modal-backdrop import-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDashboardImportOpen(false)
          }}
        >
          <section
            className="import-trades-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-import-title"
          >
            <div className="import-modal-header">
              <div>
                <span className="import-modal-icon">
                  <Icon name="upload" size={17} />
                </span>
                <div>
                  <h2 id="dashboard-import-title">Upload trades</h2>
                  <p>Import a screenshot of your completed position</p>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setDashboardImportOpen(false)}
                aria-label="Close trade import"
              >
                ×
              </button>
            </div>

            {dashboardImportAnalyzing ? (
              <div className="import-analysis" role="status">
                <div className="import-analysis-ring">
                  <svg viewBox="0 0 54 54" aria-hidden="true">
                    <circle cx="27" cy="27" r="21" />
                    <circle cx="27" cy="27" r="21" className="analysis-ring-progress" />
                  </svg>
                  <span className="import-analysis-logo">
                    <img src="/arcadia-logo.png" alt="" />
                  </span>
                </div>
                <h3>Analyzing trade</h3>
                <p>Arcadia is reading the position, prices, direction, and result.</p>
                <span className="import-file-name">{dashboardImportFile}</span>
                <div className="analysis-steps">
                  <span className="active">Reading image</span>
                  <span>Extracting position</span>
                  <span>Preparing journal entry</span>
                </div>
              </div>
            ) : (
              <div className="import-upload-body">
                <label className="trade-image-drop">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => handleDashboardTradeImage(event.target.files?.[0])}
                  />
                  <span className="upload-visual">
                    <Icon name="upload" size={22} />
                  </span>
                  <strong>Upload a trade image</strong>
                  <p>Choose a screenshot from your broker or trading platform.</p>
                  <span className="choose-image-button">Choose image</span>
                  <small>PNG, JPG, or WEBP · Maximum 10 MB</small>
                </label>
                <div className="import-privacy">
                  <Icon name="analyst" size={14} />
                  <span>
                    <strong>Private analysis</strong>
                    Your screenshot is used only to create this trade entry.
                  </span>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {connectAccountOpen && (
        <div
          className="trade-modal-backdrop account-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConnectAccountOpen(false)
          }}
        >
          <section
            className="connect-account-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-account-title"
          >
            <div className="import-modal-header">
              <div>
                <span className="import-modal-icon">
                  <Icon name="broker" size={17} />
                </span>
                <div>
                  <h2 id="connect-account-title">Connect account</h2>
                  <p>Choose how you want to add your trading account</p>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setConnectAccountOpen(false)}
                aria-label="Close account connection"
              >
                ×
              </button>
            </div>
            <div className="connection-options">
              <button onClick={() => chooseConnection('Autosync Account')}>
                <span className="connection-option-icon autosync">
                  <Icon name="bolt" size={19} />
                </span>
                <span>
                  <strong>Autosync Account</strong>
                  <small>
                    Securely connect your broker and keep trades synchronized automatically.
                  </small>
                </span>
                <Icon name="chevron" size={16} />
              </button>
              <button onClick={() => chooseConnection('Manual Connection')}>
                <span className="connection-option-icon">
                  <Icon name="history" size={19} />
                </span>
                <span>
                  <strong>Manual Connection</strong>
                  <small>Enter account details manually and import trades on your schedule.</small>
                </span>
                <Icon name="chevron" size={16} />
              </button>
            </div>
            <p className="connection-security">
              Arcadia uses encrypted, read-only connections and cannot place trades or move funds.
            </p>
          </section>
        </div>
      )}

      <div className={`toast ${toast ? 'show' : ''}`} role="status">
        <span>✓</span> {toast}
      </div>
    </div>
  )
}
