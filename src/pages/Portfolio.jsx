import { Link } from "react-router-dom";

export default function Portfolio() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Portfolio</p>
        <h1>Portfolio Transformation</h1>
        <p className="detail-description">
          Merck is transforming its portfolio through pipeline execution, strategic
          launches, and business development supporting the next wave of growth.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">PORTFOLIO</span>
        <h2>Building the next generation of growth</h2>
        <p>
          Add your portfolio-specific content here.
        </p>
      </div>
    </div>
  );
}