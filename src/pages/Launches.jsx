import { Link } from "react-router-dom";

export default function Launches() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Launches</p>
        <h1>Launch Momentum</h1>
        <p className="detail-description">
          Recent and upcoming launches are strengthening Merck’s commercial profile.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">LAUNCHES</span>
        <h2>Commercial momentum continues</h2>
        <p>Add your launches content here.</p>
      </div>
    </div>
  );
}