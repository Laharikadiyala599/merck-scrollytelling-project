import { Link } from "react-router-dom";

export default function Pipeline() {
  return (
    <div className="detail-page">
      <div className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">M</Link>
        </div>
        <div className="nav-right">🔍</div>
      </div>

      <div className="detail-hero">
        <p className="detail-kicker">Pipeline</p>
        <h1>Late-Stage Pipeline</h1>
        <p className="detail-description">
          Merck has a broad and diversified pipeline with around 80 Phase 3 studies.
        </p>
      </div>

      <div className="detail-wide-card">
        <span className="detail-mini">PIPELINE</span>
        <h2>Strong late-stage development engine</h2>
        <p>Add your pipeline content here.</p>
      </div>
    </div>
  );
}