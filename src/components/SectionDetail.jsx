import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  CartesianGrid,
  Cell
} from "recharts";
import { scenes } from "../data/scenes";
import { iconRegistry } from "../data/themeConfig";

function useReplayOnView(threshold = 0.35) {
  const ref = useRef(null);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReplayKey((prev) => prev + 1);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, replayKey };
}

function CountUp({ value, duration = 1200, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setCount(value);
      return;
    }

    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function getToneClass(tone) {
  const toneMap = {
    blue: "theme-overview",
    purple: "theme-portfolio",
    green: "theme-pipeline",
    orange: "theme-launches",
    pink: "theme-opportunity",
    cyan: "theme-research",
    red: "theme-healthcare",
    indigo: "theme-analytics",
    teal: "theme-global"
  };

  return toneMap[tone] || "theme-overview";
}

function KPIGrid({ items = [], onHoverStart, onHoverEnd }) {
  const { ref, replayKey } = useReplayOnView(0.35);

  return (
    <div ref={ref} className="kpi-grid">
      {items.map((item, index) => {
        const text = `${item.label}: ${item.prefix || ""}${item.value}${item.suffix || ""}`;

        return (
          <motion.div
            key={`${replayKey}-${index}`}
            className="kpi-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + index * 0.06 }}
            whileHover={{ y: -2 }}
            onMouseEnter={() => onHoverStart(text)}
            onMouseLeave={onHoverEnd}
          >
            <div className="kpi-value">
              <CountUp
                key={`${replayKey}-count-${index}`}
                value={item.value}
                prefix={item.prefix || ""}
                suffix={item.suffix || ""}
              />
            </div>
            <div className="kpi-label">{item.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

function TimelineBlock({ items = [], onHoverStart, onHoverEnd }) {
  return (
    <div className="timeline-wrap">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="timeline-step"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + index * 0.06 }}
          onMouseEnter={() => onHoverStart(`${item.year}: ${item.title}`)}
          onMouseLeave={onHoverEnd}
        >
          <div className="timeline-dot" />
          <div className="timeline-year">{item.year}</div>
          <div className="timeline-title">{item.title}</div>
        </motion.div>
      ))}
    </div>
  );
}

function PillarsBlock({ items = [], onHoverStart, onHoverEnd }) {
  const { ref, replayKey } = useReplayOnView(0.35);

  return (
    <div ref={ref} className="pillars-grid">
      {items.map((item, index) => (
        <motion.div
          key={`${replayKey}-${index}`}
          className="pillar-card"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.12 + index * 0.08, duration: 0.38 }}
          onMouseEnter={() =>
            onHoverStart(
              `${item.label}: ${item.prefix || ""}${item.value}${item.suffix || ""}`
            )
          }
          onMouseLeave={onHoverEnd}
        >
          <div className="pillar-value">
            <CountUp
              key={`pillar-${replayKey}-${index}`}
              value={item.value}
              prefix={item.prefix || ""}
              suffix={item.suffix || ""}
            />
          </div>
          <div className="pillar-label">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function MomentumBlock({ items = [], onHoverStart, onHoverEnd }) {
  return (
    <div className="launches-strip">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="launch-stat"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + index * 0.05 }}
          onMouseEnter={() => onHoverStart(`${item.label}: ${item.value}`)}
          onMouseLeave={onHoverEnd}
        >
          <div className="launch-label">{item.label}</div>
          <div className="launch-bar">
            <motion.div
              className="launch-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${item.value * 2}%` }}
              transition={{ delay: 0.18 + index * 0.06, duration: 0.45 }}
            />
          </div>
          <div className="launch-value">{item.value}</div>
        </motion.div>
      ))}
    </div>
  );
}

function HighlightBlock({ stat, points = [], onHoverStart, onHoverEnd }) {
  if (!stat) return null;
  const { ref, replayKey } = useReplayOnView(0.35);

  return (
    <div
      ref={ref}
      className="opportunity-box"
      onMouseEnter={() =>
        onHoverStart(
          `${stat.label}: ${stat.prefix || ""}${stat.value}${stat.suffix || ""}`
        )
      }
      onMouseLeave={onHoverEnd}
    >
      <div className="opportunity-big">
        <CountUp
          key={`highlight-${replayKey}`}
          value={stat.value}
          prefix={stat.prefix || ""}
          suffix={stat.suffix || ""}
        />
      </div>

      <div className="opportunity-label">{stat.label}</div>

      <div className="opportunity-points">
        {points.map((point, index) => (
          <div
            key={index}
            className="opportunity-point"
            onMouseEnter={() => onHoverStart(point)}
            onMouseLeave={onHoverEnd}
          >
            {point}
          </div>
        ))}
      </div>
    </div>
  );
}

function GridTextBlock({ items = [], className, onHoverStart, onHoverEnd }) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={className === "research-grid" ? "research-card" : "global-region"}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + index * 0.05 }}
          onMouseEnter={() => onHoverStart(item)}
          onMouseLeave={onHoverEnd}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}

function PanelsBlock({ items = [], onHoverStart, onHoverEnd }) {
  return (
    <div className="analytics-panels">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="analytics-panel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 + index * 0.05 }}
          onMouseEnter={() => onHoverStart(`${item.title}: ${item.text}`)}
          onMouseLeave={onHoverEnd}
        >
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

function InfographicRenderer({ scene, onHoverStart, onHoverEnd }) {
  const infographic = scene?.infographic;
  if (!infographic) return null;

  const Icon = iconRegistry[scene?.theme?.icon];
  const toneClass = getToneClass(scene?.theme?.tone);

  const titleMap = {
    "overview-kpi": "Overview Snapshot",
    "portfolio-pillars": "Portfolio Mix",
    "pipeline-timeline": "Pipeline Timeline",
    "launches-momentum": "Launch Momentum",
    "opportunity-highlight": "Commercial Opportunity",
    "research-grid": "Research Focus Areas",
    "healthcare-impact": "Healthcare Impact",
    "analytics-panels": "Analytics Signals",
    "global-footprint": "Global Footprint"
  };

  const subtitleMap = {
    "overview-kpi": "Key metrics shaping the next phase of growth.",
    "portfolio-pillars": "A quick view of major therapeutic mix areas.",
    "pipeline-timeline": "Milestones expected across the late-stage pipeline.",
    "launches-momentum": "A visual read on rollout and commercial progress.",
    "opportunity-highlight": "Long-term value creation and expansion potential.",
    "research-grid": "Core areas driving scientific discovery and innovation.",
    "healthcare-impact": "Patient reach and treatment impact at a glance.",
    "analytics-panels": "Data signals supporting strategic decision-making.",
    "global-footprint": "Regional presence supporting worldwide reach."
  };

  return (
    <motion.div
      className={`infographic-wrap infographic-mck ${toneClass}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="infographic-header infographic-header-mck">
        <div className="infographic-heading-group">
          <div className="infographic-badge-row">
            <span className="infographic-icon-shell">
              {Icon ? <Icon size={18} /> : null}
            </span>
            <span className="infographic-eyebrow">
              {scene?.pageTitle || scene?.title || "Section"}
            </span>
          </div>

          <h3 className="infographic-title">
            {titleMap[infographic.type] || "Section Highlights"}
          </h3>
          <p className="infographic-subtitle">
            {subtitleMap[infographic.type] || "Highlights for this section."}
          </p>
        </div>
      </div>

      {infographic.type === "overview-kpi" && (
        <KPIGrid
          items={infographic.kpis}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "portfolio-pillars" && (
        <PillarsBlock
          items={infographic.pillars}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "pipeline-timeline" && (
        <TimelineBlock
          items={infographic.milestones}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "launches-momentum" && (
        <MomentumBlock
          items={infographic.launchStats}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "opportunity-highlight" && (
        <HighlightBlock
          stat={infographic.heroStat}
          points={infographic.points}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "research-grid" && (
        <GridTextBlock
          items={infographic.items}
          className="research-grid"
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "healthcare-impact" && (
        <KPIGrid
          items={infographic.metrics}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "analytics-panels" && (
        <PanelsBlock
          items={infographic.panels}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}

      {infographic.type === "global-footprint" && (
        <GridTextBlock
          items={infographic.regions}
          className="global-grid"
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      )}
    </motion.div>
  );
}

function MilestoneBoard({ visual, onHoverStart, onHoverEnd }) {
  return (
    <div
      className="chart-card premium-chart-card mck-chart-card chart-in-view"
      onMouseEnter={() => onHoverStart(visual.subtitle || visual.title)}
      onMouseLeave={onHoverEnd}
    >
      <div className="chart-header-row mck-chart-header-row">
        <div className="mck-chart-heading">
          <div className="chart-kicker mck-chart-kicker">SECTION VISUAL</div>
          <h3 className="chart-title premium-chart-title mck-chart-title">
            {visual.title}
          </h3>
          <p className="chart-subtitle mck-chart-subtitle">{visual.subtitle}</p>
        </div>

        <div className="chart-stat-badge mck-chart-stat-badge">
          <span className="chart-stat-label mck-chart-stat-label">KEY SIGNAL</span>
          <strong>{visual.badge}</strong>
        </div>
      </div>

      <div className="pipeline-board">
        {visual.groups.map((group, groupIndex) => (
          <div
            key={group.year}
            className={`pipeline-board-card pipeline-delay-${groupIndex + 1}`}
            onMouseEnter={() => onHoverStart(`${group.year}: ${group.items.join(", ")}`)}
            onMouseLeave={onHoverEnd}
          >
            <div className="pipeline-board-year">{group.year}</div>
            <div className="pipeline-board-count">{group.items.length}</div>
            <div className="pipeline-board-label">Major readouts</div>

            <div className="pipeline-board-list">
              {group.items.map((item, index) => (
                <div key={index} className="pipeline-board-item">
                  <span className="pipeline-board-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartBlock({ visual, onHoverStart, onHoverEnd }) {
  const [visibleItems, setVisibleItems] = useState(0);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !visual?.data) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        } else {
          setHasEnteredView(false);
          setVisibleItems(0);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, [visual]);

  useEffect(() => {
    if (!hasEnteredView || !visual?.data) return;

    setVisibleItems(0);

    const timings =
      visual.revealTimings || visual.data.map((_, index) => 250 + index * 300);

    const timers = timings.map((delay, index) =>
      setTimeout(() => {
        setVisibleItems(index + 1);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [hasEnteredView, visual]);

  const PIE_COLORS = ["#0f172a", "#2563eb", "#7c3aed", "#0f8f86", "#ea580c", "#d946ef"];

  const visibleChartData = visual.data.map((item, index) => ({
    ...item,
    animatedValue: index < visibleItems ? item.value : 0
  }));

  const renderValueLabel = ({ x, y, width, value, index }) => {
    if (index >= visibleItems || value === 0) return null;

    return (
      <text
        x={x + width / 2}
        y={y - 10}
        textAnchor="middle"
        className="mck-chart-bar-label"
      >
        {value}
      </text>
    );
  };

  return (
    <div
      ref={chartRef}
      className={`chart-card premium-chart-card mck-chart-card ${
        hasEnteredView ? "chart-in-view" : ""
      }`}
      onMouseEnter={() => onHoverStart(visual.subtitle || visual.title)}
      onMouseLeave={onHoverEnd}
    >
      <div className="chart-header-row mck-chart-header-row">
        <div className="mck-chart-heading">
          <div className="chart-kicker mck-chart-kicker">SECTION VISUAL</div>
          <h3 className="chart-title premium-chart-title mck-chart-title">
            {visual.title}
          </h3>
          <p className="chart-subtitle mck-chart-subtitle">{visual.subtitle}</p>
        </div>

        <div className="chart-stat-badge mck-chart-stat-badge">
          <span className="chart-stat-label mck-chart-stat-label">KEY SIGNAL</span>
          <strong>{visual.badge}</strong>
        </div>
      </div>

      <div className="chart-wrap premium-chart-wrap mck-chart-wrap">
        <ResponsiveContainer width="100%" height={360}>
          {visual.chartType === "bar" ? (
            <BarChart
              data={visibleChartData}
              margin={{ top: 26, right: 10, left: 0, bottom: 0 }}
              barCategoryGap="22%"
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="rgba(15, 23, 42, 0.14)"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#475569" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#64748b" }}
              />
              <Tooltip />
              <Bar
                dataKey="animatedValue"
                radius={[10, 10, 0, 0]}
                fill={visual.color}
                animationDuration={850}
                animationEasing="ease-out"
                label={renderValueLabel}
              />
            </BarChart>
          ) : visual.chartType === "line" ? (
            <LineChart data={visibleChartData}>
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="rgba(15, 23, 42, 0.14)"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#475569" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#64748b" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="animatedValue"
                strokeWidth={3}
                stroke={visual.color}
                dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 6 }}
                animationDuration={900}
              />
            </LineChart>
          ) : visual.chartType === "pie" ? (
            <PieChart>
              <Tooltip />
              <Pie
                data={visibleChartData.filter((_, index) => index < visibleItems)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={118}
                paddingAngle={2}
                label
                animationDuration={700}
              >
                {visibleChartData
                  .filter((_, index) => index < visibleItems)
                  .map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
              </Pie>
            </PieChart>
          ) : (
            <AreaChart data={visibleChartData}>
              <defs>
                <linearGradient id="templateAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={visual.color} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={visual.color} stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="rgba(15, 23, 42, 0.14)"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#475569" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 13, fill: "#64748b" }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="animatedValue"
                strokeWidth={3}
                stroke={visual.color}
                fill="url(#templateAreaFill)"
                animationDuration={850}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function VisualRenderer({ visual, onHoverStart, onHoverEnd }) {
  if (!visual) return null;

  if (visual.type === "milestoneBoard") {
    return (
      <MilestoneBoard
        visual={visual}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      />
    );
  }

  return (
    <ChartBlock
      visual={visual}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    />
  );
}

function SceneCards({ cards = [], onHoverStart, onHoverEnd }) {
  if (!cards.length) return null;

  return (
    <div className="apple-large-grid detail-card-grid">
      {cards.map((card, index) => (
        <motion.div
          key={`${card.title}-${index}`}
          className="apple-large-card detail-info-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 + index * 0.08 }}
          whileHover={{ y: -4 }}
          onMouseEnter={() => onHoverStart(`${card.title}: ${card.text}`)}
          onMouseLeave={onHoverEnd}
        >
          <div className="apple-large-content">
            <span className="promo-tag">{card.tag}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* =========================
   APPENDIX BLOCKS
   ========================= */

function AppendixStrengthAnalysis() {
  const leftItems = [
    {
      title: "Product Value",
      text: "Strong benefits encourage customer preference and repeat choice."
    },
    {
      title: "Customer Trust",
      text: "Good reputation creates confidence and long-term loyalty."
    },
    {
      title: "Efficient Supply",
      text: "Reliable logistics ensure delivery speed and availability."
    }
  ];

  const rightItems = [
    {
      title: "Innovation Speed",
      text: "Fast ideas help maintain market competitiveness."
    },
    {
      title: "Market Reach",
      text: "Wide channels increase visibility and customer access."
    },
    {
      title: "Quality Service",
      text: "Responsive support boosts overall satisfaction levels."
    }
  ];

  return (
    <section className="appendix-block">
      <div className="appendix-block-head">
        <span className="appendix-kicker">APPENDIX 01</span>
        <h3>Strength Analysis</h3>
        <p>Animated left-right capability map inspired by the reference slide style.</p>
      </div>

      <div className="appendix-strength-layout">
        <div className="appendix-strength-col">
          {leftItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="appendix-strength-card left"
              initial={{ opacity: 0, x: -60, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: index * 0.14
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div
                className="appendix-strength-dot left-dot"
                initial={{ scale: 0.82, opacity: 0.45 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.28, delay: index * 0.08 }}
              />
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="appendix-strength-center"
          initial={{ opacity: 0, scale: 0.84, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 110, damping: 14 }}
        >
          <h3>Strength Analysis</h3>
          <p>Main strengths that support performance, positioning, and growth.</p>
        </motion.div>

        <div className="appendix-strength-col">
          {rightItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="appendix-strength-card right"
              initial={{ opacity: 0, x: 60, scale: 0.94 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: index * 0.14
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div
                className="appendix-strength-dot right-dot"
                initial={{ scale: 0.82, opacity: 0.45 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.28, delay: index * 0.08 }}
              />
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppendixTeamStrategy() {
  const steps = [
    {
      no: "01",
      title: "Initial Formation",
      text: "Teams establish communication patterns and begin building working relationships."
    },
    {
      no: "02",
      title: "Active Collaboration",
      text: "Members coordinate work with clearer process ownership and accountability."
    },
    {
      no: "03",
      title: "High Performance",
      text: "Teams achieve seamless integration with optimized workflows and strong outcomes."
    }
  ];

  return (
    <section className="appendix-block">
      <div className="appendix-block-head">
        <span className="appendix-kicker">APPENDIX 02</span>
        <h3>Team Collaboration Strategy</h3>
        <p>Stepped progression layout with replay-on-view animation.</p>
      </div>

      <div className="appendix-steps-wrap">
        {steps.map((step, index) => (
          <motion.div
            key={step.no}
            className={`appendix-step-card step-${index + 1}`}
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
              delay: index * 0.18
            }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="appendix-step-badge">{step.no}</div>
            <div className="appendix-step-content">
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AppendixRiskTools() {
  const tools = [
    {
      title: "SWOT Review",
      text: "Analyze strengths, weaknesses, opportunities, and threats."
    },
    {
      title: "Scenario Test",
      text: "Simulate conditions to explore outcomes and risk behavior."
    },
    {
      title: "Checklist Use",
      text: "Ensure important risks are not missed during evaluation."
    },
    {
      title: "Root Cause",
      text: "Identify underlying sources of issues and threats."
    }
  ];

  return (
    <section className="appendix-block">
      <div className="appendix-block-head">
        <span className="appendix-kicker">APPENDIX 03</span>
        <h3>Risk Analysis Tools</h3>
        <p>Replay-on-view target infographic that settles when visible.</p>
      </div>

      <div className="appendix-risk-layout">
        <div className="appendix-risk-list">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              className="appendix-risk-item"
              initial={{ opacity: 0, x: -40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 16,
                delay: index * 0.12
              }}
              whileHover={{ x: 6, scale: 1.02 }}
            >
              <motion.div
                className={`appendix-risk-icon risk-icon-${index + 1}`}
                initial={{ scale: 0.82, opacity: 0.5 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.28, delay: index * 0.08 }}
              />
              <div>
                <h4>{tool.title}</h4>
                <p>{tool.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="appendix-target-wrap"
          initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="appendix-target-ring ring-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          />
          <motion.div
            className="appendix-target-ring ring-2"
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          />
          <motion.div
            className="appendix-target-ring ring-3"
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.42, delay: 0.18 }}
          />
          <motion.div
            className="appendix-target-core"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.3, delay: 0.24 }}
          />
          <motion.div
            className="appendix-target-arrow"
            initial={{ opacity: 0, x: 18, rotate: -52 }}
            whileInView={{ opacity: 1, x: 0, rotate: -46 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function AppendixTimeline() {
  const items = [
    "Foundation Setup",
    "Team Development",
    "Coordination Maturity",
    "Outcome Optimization",
    "Scale Expansion"
  ];

  return (
    <section className="appendix-block">
      <div className="appendix-block-head">
        <span className="appendix-kicker">APPENDIX 04</span>
        <h3>Team Development Timeline</h3>
        <p>Milestone line animation that replays on view and then settles.</p>
      </div>

      <div className="appendix-timeline-line">
        {items.map((item, index) => (
          <motion.div
            key={item}
            className="appendix-timeline-node"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ delay: index * 0.12, duration: 0.45 }}
            whileHover={{ y: -6 }}
          >
            <motion.div
              className="appendix-timeline-dot"
              initial={{ y: 8, scale: 0.82, opacity: 0.5 }}
              whileInView={{ y: 0, scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{
                duration: 0.28,
                delay: index * 0.08
              }}
            />
            <h4>{item}</h4>
            <p>Supporting milestone detail for this stage.</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AppendixPositioningFlow() {
  const items = [
    {
      no: "01",
      title: "Market Review",
      text: "Assess demand patterns, competitor positioning, and external forces shaping the opportunity."
    },
    {
      no: "02",
      title: "Segment Fit",
      text: "Define the audience groups where the offering has strongest strategic and commercial alignment."
    },
    {
      no: "03",
      title: "Core Message",
      text: "Shape a clear value story that explains differentiation, benefits, and relevance."
    },
    {
      no: "04",
      title: "Customer Access",
      text: "Build the right channels, partnerships, and pathways to reach priority users effectively."
    },
    {
      no: "05",
      title: "Advantage",
      text: "Convert positioning into durable market strength through execution, consistency, and trust."
    }
  ];

  return (
    <section className="appendix-block">
      <div className="appendix-block-head">
        <span className="appendix-kicker">APPENDIX 05</span>
        <h3>Market Positioning Flow</h3>
        <p>Arrow-based process animation that replays on view and settles.</p>
      </div>

      <div className="appendix-flow-row">
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            className="appendix-flow-item"
            initial={{ opacity: 0, x: -24, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            whileHover={{ scale: 1.03, y: -8 }}
          >
            <div className="appendix-flow-top">{item.no}</div>
            <div className="appendix-flow-body">
              <div className="appendix-flow-title">{item.title}</div>
              <p className="appendix-flow-text">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AppendixDeckSlide({ slide, pageEnterKey, isActive }) {
  return (
    <motion.div
  key={`${slide.kicker}-${pageEnterKey}`}
  className={`appendix-deck-slide ${isActive ? "deck-slide-active" : "deck-slide-idle"}`}
      initial={{ opacity: 0, x: 56, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -40, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="appendix-block-head">
        <span className="appendix-kicker">{slide.kicker}</span>
        <h3>{slide.title}</h3>
        <p>{slide.subtitle}</p>
      </div>

      {slide.type === "risk-overlap" && (
        <div className="performance-driver-stage">
          <div className="performance-driver-arrows">
            <motion.div
              className="performance-arrow left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            />
            <motion.div
              className="performance-arrow right"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            />
          </div>

          <div className="performance-driver-row">
            {slide.items.map((item, index) => (
              <motion.div
                key={`${item.title}-${pageEnterKey}`}
                className="performance-driver-col"
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.1, duration: 0.45 }}
              >
                <motion.div
                  className="performance-driver-number"
                  style={{ background: item.color }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.18 + index * 0.1, duration: 0.3 }}
                >
                  {item.no}
                </motion.div>

                <div className="performance-driver-line top" />

                <motion.div
                  className="performance-driver-pill"
                  style={{ background: item.color }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.35 }}
                >
                  {item.title}
                </motion.div>

                <motion.div
                  className="performance-driver-node-wrap"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.26 + index * 0.1, duration: 0.35 }}
                >
                  <div
                    className="performance-driver-node-ring"
                    style={{ borderColor: item.color }}
                  >
                    <div className="performance-driver-node-core">{item.icon}</div>
                  </div>
                  <div
                    className="performance-driver-side-tab left"
                    style={{ background: item.color }}
                  />
                  <div
                    className="performance-driver-side-tab right"
                    style={{ background: item.color }}
                  />
                </motion.div>

                <div className="performance-driver-line bottom" />

                <motion.div
                  className="performance-driver-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 + index * 0.1, duration: 0.4 }}
                >
                  {item.text}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {slide.type === "risk-factors-overlap" && (
        <div className="risk-overlap-stage">
          <div className="risk-overlap-left">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
          </div>

          <div className="risk-overlap-right">
            <div className="risk-overlap-top-row">
              {slide.items.map((item, index) => (
                <motion.div
                  key={`${item.title}-${pageEnterKey}`}
                  className="risk-overlap-factor"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.4 }}
                >
                  <div
                    className="risk-overlap-number"
                    style={{ background: item.color, color: item.no === "03" ? "#1c2c68" : "#fff" }}
                  >
                    {item.no}
                  </div>

                  <div className="risk-overlap-card">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>

                  <div
                    className="risk-overlap-arrow"
                    style={{ background: item.color }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="risk-overlap-target-wrap">
              <div className="risk-overlap-ring ring-1" />
              <div className="risk-overlap-ring ring-2" />
              <div className="risk-overlap-ring ring-3" />
              <div className="risk-overlap-ring ring-4" />

              {slide.items.map((item, index) => (
                <motion.div
                  key={`connector-${item.no}-${pageEnterKey}`}
                  className={`risk-overlap-connector connector-${index + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + index * 0.08, duration: 0.3 }}
                >
                  <span className="risk-overlap-dot" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {slide.type === "brand-comparison" && (
        <div className="brand-compare-stage">
          <div className="brand-compare-header">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
          </div>

          <div className="brand-compare-labels">
            <div className="brand-pill left-pill">{slide.leftLabel}</div>
            <div className="brand-pill right-pill">{slide.rightLabel}</div>
          </div>

          <div className="brand-compare-rows">
            {slide.rows.map((row, index) => (
              <motion.div
                key={`${row.leftNo}-${pageEnterKey}`}
                className="brand-compare-row"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.08, duration: 0.38 }}
              >
                <div className="brand-side left-side">
                  <div className="brand-arrow-box left-arrow-box">
                    <p>{row.leftText}</p>
                  </div>
                  <div
                    className="brand-num-box"
                    style={{ background: row.leftColor }}
                  >
                    {row.leftNo}
                  </div>
                </div>

                <div className="brand-side right-side">
                  <div
                    className="brand-num-box"
                    style={{ background: row.rightColor, color: row.rightNo === "01" || row.rightNo === "02" ? "#111" : "#fff" }}
                  >
                    {row.rightNo}
                  </div>
                  <div className="brand-arrow-box right-arrow-box">
                    <p>{row.rightText}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {slide.type === "foundation-keys" && (
        <div className="deck-foundation-layout">
          <div className="deck-foundation-left">
            {slide.items.map((item, index) => (
              <motion.div
                key={`${item.title}-${pageEnterKey}`}
                className="deck-foundation-row"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + index * 0.1, duration: 0.4 }}
              >
                <div className="deck-foundation-index">{item.no}</div>
                <div className="deck-foundation-title">{item.title}</div>
                <div className="deck-foundation-line" />
                <div className="deck-foundation-text">{item.text}</div>
                <div
                  className="deck-foundation-color-tag"
                  style={{ background: item.color }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            key={`foundation-spine-${pageEnterKey}`}
            className="deck-foundation-spine"
            initial={{ opacity: 0, y: 24, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ delay: 0.2, duration: 0.45 }}
          >
            <div className="deck-foundation-head" />
            <div className="deck-foundation-seg seg-1" />
            <div className="deck-foundation-seg seg-2" />
            <div className="deck-foundation-seg seg-3" />
            <div className="deck-foundation-seg seg-4" />
          </motion.div>
        </div>
      )}

      {slide.type === "collaboration-stack" && (
        <div className="deck-dimensions-layout">
          <div className="deck-dimensions-tower">
            {slide.items.map((item, index) => (
              <motion.div
                key={`${item.title}-${pageEnterKey}`}
                className={`deck-dimensions-layer dim-layer-${index + 1}`}
                style={{ background: item.color }}
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.1, duration: 0.42 }}
                whileHover={{ x: 8 }}
              >
                <span className="deck-dim-no">{item.no}</span>
                <span className="deck-dim-title">{item.title}</span>
              </motion.div>
            ))}
          </div>

          <div className="deck-dimensions-notes">
            <motion.div
              className="deck-dim-note"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
            >
              Team foundation
            </motion.div>
            <motion.div
              className="deck-dim-note"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42, duration: 0.35 }}
            >
              Process integration
            </motion.div>
            <motion.div
              className="deck-dim-note"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.52, duration: 0.35 }}
            >
              Capability scaling
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function AppendixHorizontalDeck() {
  const deckRef = useRef(null);
  const wheelLockRef = useRef(false);
const wheelAccumRef = useRef(0);
  const [pageEnterKey, setPageEnterKey] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setPageEnterKey((prev) => prev + 1);

    if (deckRef.current) {
      deckRef.current.scrollTo({
        left: 0,
        behavior: "auto"
      });
    }
  }, []);

  const slides = [
    {
      kicker: "APPENDIX 06",
      title: "Performance Drivers",
      subtitle: "Factors influencing competitor success in the marketplace",
      type: "risk-overlap",
      items: [
        {
          no: "04",
          title: "Innovation Speed",
          text: "Ability to release new ideas faster influences market competitiveness greatly.",
          color: "#f6a300",
          icon: "🚀"
        },
        {
          no: "03",
          title: "Brand Awareness",
          text: "Recognition and visibility create stronger trust and wider market presence.",
          color: "#f45b82",
          icon: "📣"
        },
        {
          no: "02",
          title: "Service Level",
          text: "Customer support and response speed impact brand image and retention.",
          color: "#ad69db",
          icon: "📞"
        },
        {
          no: "01",
          title: "Product Quality",
          text: "Durability, usability, and overall satisfaction drive consumer loyalty and preference.",
          color: "#7377e6",
          icon: "📊"
        }
      ]
    },
    {
      kicker: "APPENDIX 07",
      title: "Risk Factors Overlap",
      subtitle: "Four key areas often interact and combine effects.",
      type: "risk-factors-overlap",
      items: [
        {
          no: "01",
          title: "People Factors",
          text: "Human error, behavior, and capability challenges",
          color: "#162b6f"
        },
        {
          no: "02",
          title: "Process Factors",
          text: "Inefficiencies, delays, or breakdowns in workflow",
          color: "#446aa6"
        },
        {
          no: "03",
          title: "Technology Factors",
          text: "Hardware or software failures affecting performance",
          color: "#b7c2d6"
        },
        {
          no: "04",
          title: "External Factors",
          text: "Market changes, natural events, or external influences",
          color: "#f08a4b"
        }
      ]
    },
    {
      kicker: "APPENDIX 08",
      title: "Brand Comparison",
      subtitle: "Side-by-side evaluation of two competitor approaches.",
      type: "brand-comparison",
      leftLabel: "Brand A",
      rightLabel: "Brand B",
      rows: [
        {
          leftText: "Affordable pricing increases accessibility for wider customer group",
          leftNo: "01",
          leftColor: "#6f73e8",
          rightNo: "01",
          rightColor: "#f7a600",
          rightText: "Premium pricing positions product as exclusive within market"
        },
        {
          leftText: "Strong service guarantees better customer satisfaction and retention",
          leftNo: "02",
          leftColor: "#ad69db",
          rightNo: "02",
          rightColor: "#f45b82",
          rightText: "Innovative features attract tech-savvy and trend-driven customers"
        },
        {
          leftText: "Limited product range restricts competitive potential in certain markets",
          leftNo: "03",
          leftColor: "#f45b82",
          rightNo: "03",
          rightColor: "#ad69db",
          rightText: "Moderate service level risks losing customers to faster rivals"
        },
        {
          leftText: "Local presence ensures familiarity and trust with target customers",
          leftNo: "04",
          leftColor: "#f7a600",
          rightNo: "04",
          rightColor: "#6f73e8",
          rightText: "Global reach expands recognition and influence across multiple regions"
        }
      ]
    },
    {
      kicker: "APPENDIX 09",
      title: "Collaboration Foundation Keys",
      subtitle: "Essential elements that build successful team collaboration.",
      type: "foundation-keys",
      items: [
        {
          no: "01",
          title: "Communication Hub",
          text: "Clear channels enable transparent information sharing.",
          color: "#14c96c"
        },
        {
          no: "02",
          title: "Trust Building",
          text: "Mutual respect creates safety for open dialogue.",
          color: "#74e0a6"
        },
        {
          no: "03",
          title: "Shared Vision",
          text: "Common objectives align individual efforts.",
          color: "#79c7c9"
        },
        {
          no: "04",
          title: "Role Clarity",
          text: "Defined responsibilities prevent overlap.",
          color: "#6474f6"
        }
      ]
    },
    {
      kicker: "APPENDIX 10",
      title: "Collaboration Dimensions",
      subtitle: "Layered capability building across team maturity.",
      type: "collaboration-stack",
      items: [
        { no: "01", title: "Basic Coordination", color: "#21c26a" },
        { no: "02", title: "Structured Workflow", color: "#50d487" },
        { no: "03", title: "Integrated Systems", color: "#6fd5d5" },
        { no: "04", title: "Advanced Optimization", color: "#49aef0" },
        { no: "05", title: "Adaptive Scaling", color: "#6474f6" }
      ]
    }
  ];

  const scrollToSlide = (index) => {
    const rail = deckRef.current;
    if (!rail) return;

    const slideEls = Array.from(rail.querySelectorAll(".appendix-side-slide"));
    if (!slideEls.length) return;

    const clampedIndex = Math.max(0, Math.min(index, slideEls.length - 1));
    const targetSlide = slideEls[clampedIndex];
    if (!targetSlide) return;

    setActiveSlide(clampedIndex);

    rail.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: "smooth"
    });
  };

  const scrollDeck = (direction) => {
    if (direction === "left") {
      scrollToSlide(activeSlide - 1);
    } else {
      scrollToSlide(activeSlide + 1);
    }
  };

  useEffect(() => {
    const rail = deckRef.current;
    if (!rail) return;

    let raf = null;

    const updateActiveSlide = () => {
      const slideEls = Array.from(rail.querySelectorAll(".appendix-side-slide"));
      if (!slideEls.length) return;

      const railCenter = rail.scrollLeft + rail.clientWidth * 0.45;

      let closestIndex = 0;
      let closestDistance = Infinity;

      slideEls.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
        const distance = Math.abs(slideCenter - railCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveSlide(closestIndex);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveSlide);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSlide);
    updateActiveSlide();

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSlide);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

const handleWheel = (e) => {
  const rail = deckRef.current;
  if (!rail) return;

  const absX = Math.abs(e.deltaX);
  const absY = Math.abs(e.deltaY);

  if (absX < 2 && absY < 2) return;

  e.preventDefault();
  e.stopPropagation();

  if (wheelLockRef.current) return;

  const delta = absX > absY ? e.deltaX : e.deltaY;
  wheelAccumRef.current += delta;

  if (Math.abs(wheelAccumRef.current) < 40) return;

  wheelLockRef.current = true;

  if (wheelAccumRef.current > 0) {
    scrollToSlide(activeSlide + 1);
  } else {
    scrollToSlide(activeSlide - 1);
  }

  wheelAccumRef.current = 0;

  setTimeout(() => {
    wheelLockRef.current = false;
  }, 420);
};

  return (
    <section className="appendix-block appendix-deck-shell">
      <div className="appendix-deck-head">
        <div>
          <span className="appendix-kicker">REFERENCE SLIDE DECK</span>
          <h3>Horizontal Appendix Slides</h3>
          <p>Swipe on touchpad or use arrows to move through the remaining infographic slides.</p>
        </div>

        <div className="appendix-deck-controls">
          <button className="appendix-arrow-btn" onClick={() => scrollDeck("left")}>
            ←
          </button>
          <button className="appendix-arrow-btn" onClick={() => scrollDeck("right")}>
            →
          </button>
        </div>
      </div>

      <div ref={deckRef} className="appendix-side-scroll" onWheel={handleWheel}>
        {slides.map((slide, index) => (
          <div
            className={`appendix-side-slide ${activeSlide === index ? "is-active" : "is-inactive"}`}
            key={`${slide.kicker}-${pageEnterKey}-${index}`}
          >
            <AppendixDeckSlide
              slide={slide}
              pageEnterKey={`${pageEnterKey}-${activeSlide === index ? "active" : "idle"}-${index}`}
              isActive={activeSlide === index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
function AppendixExperience() {
  return (
    <div className="appendix-experience">
      <AppendixStrengthAnalysis />
      <AppendixTeamStrategy />
      <AppendixRiskTools />
      <AppendixTimeline />
      <AppendixPositioningFlow />
      <AppendixHorizontalDeck />
    </div>
  );
}

export default function SectionDetail({
  activeScene,
  setActivePage,
  setHoverSpeechText
}) {
  const [hoverText, setHoverText] = useState("");

  const sceneIndex = useMemo(
    () => scenes.findIndex((scene) => scene.id === activeScene?.id),
    [activeScene]
  );

  const prevScene = sceneIndex > 0 ? scenes[sceneIndex - 1] : null;
  const nextScene = sceneIndex < scenes.length - 1 ? scenes[sceneIndex + 1] : null;

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchTargetRef = useRef(null);
  const wheelLockRef = useRef(false);
  const wheelGestureRef = useRef({
    deltaX: 0,
    deltaY: 0,
    resetTimer: null,
    lastDirection: 0
  });

  const goNext = () => {
    if (nextScene) setActivePage(nextScene.id);
  };

  const goPrev = () => {
    if (prevScene) {
      setActivePage(prevScene.id);
    } else {
      setActivePage("store");
    }
  };

  const isInsideAppendixRail = (target) => {
    return target instanceof HTMLElement && !!target.closest(".appendix-side-scroll");
  };

  const canScrollAppendixRail = (target, direction) => {
    const rail =
      target instanceof HTMLElement
        ? target.closest(".appendix-side-scroll")
        : null;

    if (!rail) return false;

    if (direction === "right") {
      return rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4;
    }

    return rail.scrollLeft > 4;
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].clientX;
    touchStartYRef.current = e.changedTouches[0].clientY;
    touchTargetRef.current = e.target;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - touchStartXRef.current;
    const deltaY = endY - touchStartYRef.current;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < 72) return;
    if (absX < absY * 1.15) return;

    const startedInAppendixRail = isInsideAppendixRail(touchTargetRef.current);

    if (startedInAppendixRail) {
      if (deltaX < 0 && canScrollAppendixRail(touchTargetRef.current, "right")) return;
      if (deltaX > 0 && canScrollAppendixRail(touchTargetRef.current, "left")) return;
    }

    if (wheelLockRef.current) return;

    wheelLockRef.current = true;

    if (deltaX < 0) {
      goNext();
    } else {
      goPrev();
    }

    setTimeout(() => {
      wheelLockRef.current = false;
    }, 820);
  };

  const handleWheel = (e) => {
    const target = e.target;

    if (isInsideAppendixRail(target)) return;

    const direction = e.deltaX === 0 ? 0 : Math.sign(e.deltaX);

    if (
      wheelGestureRef.current.lastDirection !== 0 &&
      direction !== 0 &&
      direction !== wheelGestureRef.current.lastDirection
    ) {
      wheelGestureRef.current.deltaX = 0;
      wheelGestureRef.current.deltaY = 0;
    }

    if (direction !== 0) {
      wheelGestureRef.current.lastDirection = direction;
    }

    wheelGestureRef.current.deltaX += e.deltaX;
    wheelGestureRef.current.deltaY += e.deltaY;

    if (wheelGestureRef.current.resetTimer) {
      clearTimeout(wheelGestureRef.current.resetTimer);
    }

    wheelGestureRef.current.resetTimer = setTimeout(() => {
      wheelGestureRef.current.deltaX = 0;
      wheelGestureRef.current.deltaY = 0;
      wheelGestureRef.current.lastDirection = 0;
    }, 170);

    const absX = Math.abs(wheelGestureRef.current.deltaX);
    const absY = Math.abs(wheelGestureRef.current.deltaY);
    const horizontalIntent = absX > 130 && absX > absY + 55;

    if (!horizontalIntent) return;
    if (wheelLockRef.current) return;

    e.preventDefault();
    wheelLockRef.current = true;

    if (wheelGestureRef.current.deltaX > 0) {
      goNext();
    } else {
      goPrev();
    }

    setTimeout(() => {
      wheelLockRef.current = false;
    }, 850);

    wheelGestureRef.current.deltaX = 0;
    wheelGestureRef.current.deltaY = 0;
    wheelGestureRef.current.lastDirection = 0;
  };

  const handleHoverStart = (text) => {
    setHoverText(text);
    setHoverSpeechText(text);
  };

  const handleHoverEnd = () => {
    setHoverText("");
    setHoverSpeechText("");
  };

  if (!activeScene) return null;

  if (activeScene.id === "appendix") {
    return (
      <div className="detail-page">
        <motion.div
          className="detail-shell seamless-shell swipe-shell appendix-shell"
          data-page={activeScene.id}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <section className="detail-hero morph-hero">
                <div className="detail-hero-left">
                  <motion.span className="promo-tag detail-top-tag">
                    {activeScene.hero?.tag || "REFERENCE"}
                  </motion.span>

                  <motion.h1>{activeScene.hero?.heading}</motion.h1>

                  <motion.p className="detail-morph-desc">
                    {activeScene.hero?.description}
                  </motion.p>
                </div>

                <div className="detail-hero-right">
                  <p>Appendix Reference ↗</p>
                  <p>Supporting Visuals ↗</p>
                </div>
              </section>

              <AppendixExperience />
            </motion.div>
          </AnimatePresence>

          <div className="detail-nav-row">
            <button
              className="secondary-btn"
              onClick={() => (prevScene ? setActivePage(prevScene.id) : setActivePage("store"))}
            >
              {prevScene ? `← ${prevScene.title}` : "← Home"}
            </button>

            <button className="primary-btn" onClick={() => setActivePage("store")}>
              Back to Home
            </button>

            <button
              className="secondary-btn"
              onClick={() => nextScene && setActivePage(nextScene.id)}
              disabled={!nextScene}
            >
              {nextScene ? `${nextScene.title} →` : "End"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <motion.div
        className="detail-shell seamless-shell swipe-shell"
        data-page={activeScene.id}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <section className="detail-hero morph-hero">
              <div className="detail-hero-left">
                <motion.span className="promo-tag detail-top-tag">
                  {activeScene.hero?.tag || "NEW"}
                </motion.span>

                <motion.h1>{activeScene.hero?.heading}</motion.h1>

                <motion.p className="detail-morph-desc">
                  {activeScene.hero?.description}
                </motion.p>
              </div>

              <div className="detail-hero-right">
                <p>Connect with a Specialist ↗</p>
                <p>Explore the experience ↗</p>
              </div>
            </section>

            {hoverText && (
              <div className="hover-explainer">
                <strong>Explanation:</strong> {hoverText}
              </div>
            )}

            {activeScene.subnav?.length > 0 && (
              <motion.div
                className="subnav"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
              >
                {activeScene.subnav.map((item, index) => (
                  <span
                    key={index}
                    className="subnav-item"
                    onMouseEnter={() => handleHoverStart(item)}
                    onMouseLeave={handleHoverEnd}
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            )}

            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {activeScene.sectionTitle?.bold || `${activeScene.title}.`}{" "}
              <span>{activeScene.sectionTitle?.light || "Take your pick."}</span>
            </motion.h2>

            <InfographicRenderer
              scene={activeScene}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
            >
              <VisualRenderer
                visual={activeScene.visual}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <SceneCards
                cards={activeScene.cards}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="detail-nav-row">
          <button className="secondary-btn" onClick={goPrev}>
            {prevScene ? `← ${prevScene.title}` : "← Home"}
          </button>

          <button className="primary-btn" onClick={() => setActivePage("store")}>
            Back to Home
          </button>

          <button className="secondary-btn" onClick={goNext} disabled={!nextScene}>
            {nextScene ? `${nextScene.title} →` : "End"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}