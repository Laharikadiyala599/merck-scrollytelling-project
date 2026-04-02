export default function Navbar({
  scenes,
  siteConfig,
  hoveredNav,
  setHoveredNav,
  setActivePage
}) {
  return (
    <div className="navbar apple-navbar">
      <div className="nav-left">
        <div className="logo apple-logo" onClick={() => setActivePage("store")}>
          {siteConfig.brandLetter}
        </div>

        <div className="nav-items apple-nav-items">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="nav-item-wrap"
              onMouseEnter={() => setHoveredNav(scene.id)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <span
                className="nav-item apple-nav-item"
                onClick={() => setActivePage(scene.id)}
              >
                {scene.title}
              </span>

              {hoveredNav === scene.id && (
                <div className="nav-dropdown apple-nav-dropdown">
                  <p className="dropdown-kicker">{scene.title}</p>
                  <h4>{scene.hero?.heading}</h4>
                  <p className="dropdown-text">{scene.hero?.description}</p>

                  {scene.subnav?.length > 0 && (
                    <div className="dropdown-links">
                      {scene.subnav.slice(0, 4).map((item, index) => (
                        <span key={index} className="dropdown-link">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="nav-right apple-nav-right">⌕</div>
    </div>
  );
}