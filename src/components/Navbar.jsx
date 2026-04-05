export default function Navbar({
  scenes,
  siteConfig,
  hoveredNav,
  setHoveredNav,
  setActivePage,
  activePage,
  onHomeClick,
  onChatOpen,
  onChatClose
}) {
  return (
    <div className="navbar apple-navbar">
      <div className="nav-left">
        <button
          type="button"
          className="logo apple-logo"
          onClick={onHomeClick}
        >
          <img
            src="/logo.png"
            alt={siteConfig.companyName || "Logo"}
            className="logo-img"
          />
        </button>

        <div className="nav-items apple-nav-items">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="nav-item-wrap"
              onMouseEnter={() => setHoveredNav(scene.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span
                className={`nav-item apple-nav-item ${
                  activePage === scene.id ? "active-nav-item" : ""
                }`}
                onClick={() => setActivePage(scene.id)}
              >
                {scene.title}
              </span>

              {hoveredNav === scene.id && (
                <div className="nav-dropdown apple-nav-dropdown">
                  <p className="dropdown-kicker">{scene.title}</p>
                  <h4>{scene.hero?.heading}</h4>
                  <p className="dropdown-text">{scene.hero?.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="nav-right apple-nav-right">
        <img
          src="/right-logo.png"
          alt="chat"
          className="right-logo"
          onClick={onChatOpen}
          onDoubleClick={onChatClose}
        />
      </div>
    </div>
  );
}   