import { Link } from "react-router-dom";

export default function Closing() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Closing</p>
        <h1>Closing Summary</h1>
        <p className="detail-description">
          Merck’s strategy combines science, execution, and commercial discipline for long-term growth.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">CLOSING</span>
        <h2>Strong foundation for future growth</h2>
        <p>Add your closing content here.</p>
      </div>
    </div>
  );
}