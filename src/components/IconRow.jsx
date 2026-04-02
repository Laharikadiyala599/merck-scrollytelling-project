import { iconRegistry } from "../data/themeConfig";

export default function IconRow({
  scenes,
  iconScrollRef,
  scrollIcons,
  setActivePage
}) {
  return (
    <section className="apple-icon-section cinematic-section">
      <div className="apple-icon-toolbar">
        <button
          className="apple-scroll-btn"
          onClick={() => scrollIcons("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>
        <button
          className="apple-scroll-btn"
          onClick={() => scrollIcons("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      <div className="apple-icon-row" ref={iconScrollRef}>
        {scenes.map((scene) => {
          const Icon = iconRegistry[scene.theme?.icon];

          return (
            <div
              key={scene.id}
              className="apple-icon-item"
              onClick={() => setActivePage(scene.id)}
            >
              <div className={`apple-icon-shell ${scene.theme?.tone || ""}`}>
                {Icon ? <Icon className="apple-scene-icon" /> : null}
              </div>
              <div className="apple-icon-label">{scene.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}