import { Link } from "react-router-dom";

export default function Timeline() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Timeline</p>
        <h1>Readout Timeline</h1>
        <p className="detail-description">
          Merck is entering a data-rich period with multiple major readouts across 2026 and 2027.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">TIMELINE</span>
        <h2>Key milestones ahead</h2>
        <p>Add your timeline content here.</p>
      </div>
    </div>
  );
}