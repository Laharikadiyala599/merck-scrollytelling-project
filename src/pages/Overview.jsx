import { Link } from "react-router-dom";
import {
  FaFlask,
  FaChartLine,
  FaRocket,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";

export default function Overview() {
  return (
    <div className="detail-page">
      <div className="navbar apple-navbar">
        <div className="nav-left">
          <Link to="/" className="apple-logo" style={{ textDecoration: "none" }}>
            M
          </Link>
        </div>
        <div className="apple-nav-right">🔍</div>
      </div>

      <div className="seamless-shell overview-premium">
        <div className="overview-hero-card">
          <span className="overview-eyebrow">Overview</span>
          <h1 className="overview-hero-title">
            Merck is building the next wave of growth
          </h1>
          <p className="overview-hero-subtitle">
            Scientific innovation, pipeline advancement, launch momentum, and long-term
            commercial opportunity are shaping a more diversified future.
          </p>

          <div className="overview-highlight-strip">
            <div className="overview-highlight-pill">Pipeline strength</div>
            <div className="overview-highlight-pill">Launch momentum</div>
            <div className="overview-highlight-pill">Business development</div>
            <div className="overview-highlight-pill">Long-term value creation</div>
          </div>
        </div>

        <div className="overview-kpi-grid">
          <div className="overview-kpi-card">
            <div className="overview-kpi-top">
              <div className="overview-kpi-dot"></div>
              <span className="overview-kpi-mini">Pipeline</span>
            </div>
            <div className="overview-kpi-value">~80</div>
            <div className="overview-kpi-label">Phase 3 studies underway</div>
          </div>

          <div className="overview-kpi-card">
            <div className="overview-kpi-top">
              <div className="overview-kpi-dot"></div>
              <span className="overview-kpi-mini">Opportunity</span>
            </div>
            <div className="overview-kpi-value">$70B+</div>
            <div className="overview-kpi-label">Commercial opportunity by the mid-2030s</div>
          </div>

          <div className="overview-kpi-card">
            <div className="overview-kpi-top">
              <div className="overview-kpi-dot"></div>
              <span className="overview-kpi-mini">Launches</span>
            </div>
            <div className="overview-kpi-value">20+</div>
            <div className="overview-kpi-label">Potential growth drivers</div>
          </div>

          <div className="overview-kpi-card">
            <div className="overview-kpi-top">
              <div className="overview-kpi-dot"></div>
              <span className="overview-kpi-mini">Focus</span>
            </div>
            <div className="overview-kpi-value">3</div>
            <div className="overview-kpi-label">Core engines of transformation</div>
          </div>
        </div>

        <div className="infographic-wrap">
          <div className="infographic-header">
            <h3 className="infographic-title">Growth pillars</h3>
            <p className="infographic-subtitle">
              The business is being reshaped through science-led innovation, disciplined
              execution, and expansion across global markets.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-value">
                <FaFlask />
              </div>
              <div className="pillar-label">Science and pipeline innovation</div>
            </div>

            <div className="pillar-card">
              <div className="pillar-value">
                <FaRocket />
              </div>
              <div className="pillar-label">Launch excellence and execution</div>
            </div>

            <div className="pillar-card">
              <div className="pillar-value">
                <FaChartLine />
              </div>
              <div className="pillar-label">Long-term growth and value creation</div>
            </div>

            <div className="pillar-card">
              <div className="pillar-value">
                <FaGlobe />
              </div>
              <div className="pillar-label">Global scale across therapeutic areas</div>
            </div>
          </div>
        </div>

        <div className="cards-row">
          <div className="large-card">
            <span className="promo-tag">Narrative</span>
            <h3>Science-led growth story</h3>
            <p>
              Merck is advancing a broad and deep portfolio designed to create durable
              revenue streams beyond today’s core products.
            </p>
          </div>

          <div className="large-card">
            <span className="promo-tag">Momentum</span>
            <h3>Late-stage pipeline visibility</h3>
            <p>
              Multiple late-stage programs and readouts are expected to shape the next
              phase of growth and portfolio diversification.
            </p>
          </div>

          <div className="large-card">
            <span className="promo-tag">Outlook</span>
            <h3>Built for long-term opportunity</h3>
            <p>
              The company is combining internal R&amp;D, launches, and business development
              to build a stronger long-range commercial outlook.
            </p>
          </div>
        </div>

        <div className="detail-nav-row">
          <button className="secondary-btn" disabled>
            Previous
          </button>
          <Link to="/portfolio" style={{ textDecoration: "none" }}>
            <button className="primary-btn">
              Next Page <FaArrowRight style={{ marginLeft: 8 }} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}