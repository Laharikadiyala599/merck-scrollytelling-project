import { Link } from "react-router-dom";

export default function Growth() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Growth</p>
        <h1>Growth Drivers</h1>
        <p className="detail-description">
          Merck is building multiple future growth drivers across launches,
          pipeline assets, and long-term commercial opportunities.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">GROWTH</span>
        <h2>Multiple drivers for future expansion</h2>
        <p>
          Add your growth content here.
        </p>
      </div>
    </div>
  );
}