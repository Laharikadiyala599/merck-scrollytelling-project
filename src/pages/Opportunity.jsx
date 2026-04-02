import { Link } from "react-router-dom";

export default function Opportunity() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Opportunity</p>
        <h1>Commercial Opportunity</h1>
        <p className="detail-description">
          Merck sees visibility to more than 70 billion dollars in commercial opportunity.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">OPPORTUNITY</span>
        <h2>Long-term commercial potential</h2>
        <p>Add your opportunity content here.</p>
      </div>
    </div>
  );
}   