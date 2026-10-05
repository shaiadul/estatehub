"use client"

export function FinancialsSection() {
  const matrixCards = [
    {
      label: "Annual Property Tax",
      labelClassName: "font-caption text-xs text-on-surface-variant font-medium",
      cardClassName:
        "bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20",
      value: "$123,125",
      valueClassName: "font-headline-sm text-xl font-bold text-on-surface font-mono",
      sub: "$10,260 / month",
      subClassName: "text-[11px] text-on-surface-variant block mt-0.5",
      foot: "Locked against re-assessment",
      footClassName: "text-[10px] text-outline mt-2",
    },
    {
      label: "Annual Operating Costs",
      labelClassName: "font-caption text-xs text-on-surface-variant font-medium",
      cardClassName:
        "bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20",
      value: "$48,500",
      valueClassName: "font-headline-sm text-xl font-bold text-on-surface font-mono",
      sub: "Comprehensive Guard/Facility",
      subClassName: "text-[11px] text-on-surface-variant block mt-0.5",
      foot: "Solar Microgrid reduces 65%",
      footClassName: "text-[10px] text-on-tertiary-container font-bold mt-2",
    },
    {
      label: "Est. 5-Yr Exit Value",
      labelClassName: "font-caption text-xs text-on-surface-variant font-medium",
      cardClassName:
        "bg-surface-container-low p-4 rounded-xl flex flex-col justify-between border border-outline-variant/20",
      value: "$13,050,000",
      valueClassName:
        "font-headline-sm text-xl font-bold text-on-secondary-container font-mono",
      sub: "@ 5.8% Bel Air CAGR",
      subClassName: "text-[11px] text-on-surface-variant block mt-0.5",
      foot: "+$3.2M Capital Gain",
      footClassName: "text-[10px] text-on-tertiary-container font-bold mt-2",
    },
    {
      label: "Syndicate Net ROI",
      labelClassName: "font-caption text-xs text-muted-foreground font-medium",
      cardClassName: "bg-primary text-on-primary p-4 rounded-xl flex flex-col justify-between shadow-xs",
      value: "+32.48%",
      valueClassName: "font-headline-sm text-xl font-extrabold text-secondary font-mono",
      sub: "Unlevered Net 5-Yr IRR",
      subClassName: "text-[11px] text-muted-foreground block mt-0.5",
      foot: "Model Version 4.1",
      footClassName: "text-[10px] text-muted-foreground font-mono mt-2",
    },
  ]
  const legendItems = [
    { dotClassName: "w-2.5 h-2.5 rounded bg-primary", label: "Holding Cost" },
    { dotClassName: "w-2.5 h-2.5 rounded bg-secondary", label: "Asset Equity" },
  ]
  const compRows = [
    {
      address: "10432 Bellagio Rd, Bel Air",
      date: "Aug 2024",
      price: "$11,400,000",
      sqft: "11,800",
      perSqft: "$966/sf",
      diff: "+21.6% Higher",
    },
    {
      address: "10820 Chalon Rd, Bel Air",
      date: "Jun 2024",
      price: "$12,750,000",
      sqft: "13,100",
      perSqft: "$973/sf",
      diff: "+22.5% Higher",
    },
    {
      address: "850 Stone Canyon Rd, Bel Air",
      date: "Oct 2024",
      price: "$9,200,000",
      sqft: "9,600",
      perSqft: "$958/sf",
      diff: "+20.6% Higher",
    },
  ]
  const subjectRow = {
    address: "The Glass Promontory (Subject)",
    date: "Current Active",
    price: "$9,850,000",
    sqft: "12,400",
    perSqft: "$794/sf",
    diff: "Target Arbitrage",
  }
  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-7 flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-surface-container">
        <div>
          <span className="font-caption text-xs uppercase tracking-wider text-on-secondary-container font-bold">
            Institutional Underwriting
          </span>
          <h2 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
            5-Year Holding &amp; Carry Cost Pro-Forma
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-xl text-xs">
          <span className="text-on-surface-variant">Tax Basis:</span>
          <span className="font-bold text-on-surface">CA Prop 13 (1.25%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {matrixCards.map((card) => (
          <div key={card.label} className={card.cardClassName}>
            <span className={card.labelClassName}>{card.label}</span>
            <div className="mt-2">
              <span className={card.valueClassName}>{card.value}</span>
              <span className={card.subClassName}>{card.sub}</span>
            </div>
            <span className={card.footClassName}>{card.foot}</span>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-on-surface">5-Year Equity Accrual &amp; Capital Projection ($M)</span>
          <div className="flex items-center gap-3 text-on-surface-variant">
            {legendItems.map((item) => (
              <span key={item.label} className="flex items-center gap-1.5">
                <span className={item.dotClassName} /> {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full h-32 sm:h-36">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 700 140">
            <defs>
              <linearGradient id="equityGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line stroke="var(--outline-variant)" strokeDasharray="4 4" strokeOpacity="0.25" x1="0" x2="700" y1="30" y2="30" />
            <line stroke="var(--outline-variant)" strokeDasharray="4 4" strokeOpacity="0.25" x1="0" x2="700" y1="70" y2="70" />
            <line stroke="var(--outline-variant)" strokeDasharray="4 4" strokeOpacity="0.25" x1="0" x2="700" y1="110" y2="110" />
            <polygon fill="url(#equityGrad)" points="50,110 180,95 320,80 480,58 650,25 650,130 50,130" />
            <polyline
              points="50,110 180,95 320,80 480,58 650,25"
              stroke="var(--secondary)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <rect fill="var(--primary)" height="18" rx="2" width="16" x="42" y="112" />
            <rect fill="var(--primary)" height="20" rx="2" width="16" x="172" y="110" />
            <rect fill="var(--primary)" height="22" rx="2" width="16" x="312" y="108" />
            <rect fill="var(--primary)" height="25" rx="2" width="16" x="472" y="105" />
            <rect fill="var(--primary)" height="28" rx="2" width="16" x="642" y="102" />
            <text fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" x="50" y="138">Year 1 ($9.85M)</text>
            <text fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" x="180" y="138">Year 2 ($10.42M)</text>
            <text fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" x="320" y="138">Year 3 ($11.10M)</text>
            <text fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" x="480" y="138">Year 4 ($12.01M)</text>
            <text fill="var(--muted-foreground)" fontSize="10" textAnchor="middle" x="650" y="138">Year 5 ($13.05M)</text>
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
          Unredacted Closed Comps Benchmark (Bel Air Submarket)
        </span>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-xs">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3 rounded-l-lg">Property Address</th>
                <th className="py-2.5 px-3">Closed Date</th>
                <th className="py-2.5 px-3">Sale Price</th>
                <th className="py-2.5 px-3">Sq Ft</th>
                <th className="py-2.5 px-3">$/Sq Ft</th>
                <th className="py-2.5 px-3 rounded-r-lg">Diff vs Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {compRows.map((row) => (
                <tr key={row.address} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3 font-bold text-on-surface">{row.address}</td>
                  <td className="py-2.5 px-3 text-on-surface-variant">{row.date}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold">{row.price}</td>
                  <td className="py-2.5 px-3 text-on-surface-variant">{row.sqft}</td>
                  <td className="py-2.5 px-3 font-mono">{row.perSqft}</td>
                  <td className="py-2.5 px-3 text-on-tertiary-container font-bold">{row.diff}</td>
                </tr>
              ))}
              <tr className="bg-secondary/10 font-bold">
                <td className="py-2.5 px-3 text-on-secondary-container">{subjectRow.address}</td>
                <td className="py-2.5 px-3 text-on-secondary-container">{subjectRow.date}</td>
                <td className="py-2.5 px-3 font-mono text-on-secondary-container">{subjectRow.price}</td>
                <td className="py-2.5 px-3 text-on-secondary-container">{subjectRow.sqft}</td>
                <td className="py-2.5 px-3 font-mono text-on-secondary-container">{subjectRow.perSqft}</td>
                <td className="py-2.5 px-3 text-on-tertiary-container font-bold">{subjectRow.diff}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}