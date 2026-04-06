import { motion } from "framer-motion";

export default function PromoCards({
  titleBold,
  titleLight,
  scenes,
  setActivePage
}) {
  const [featured, ...rest] = scenes;

  return (
    <section className="apple-home-section">
      <h2 className="section-title apple-section-title">
        {titleBold} <span>{titleLight}</span>
      </h2>

      <div className="apple-featured-wrap">
        {featured && (
          <motion.div
            key={featured.id}
            className="apple-featured-card"
            layoutId={`card-${featured.id}`}
            onClick={() => setActivePage(featured.id)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6 }}
          >
            <div className="apple-featured-image-wrap">
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="apple-featured-image"
                />
              ) : (
                <div className="apple-featured-image placeholder-card">
                  <span>{featured.title}</span>
                </div>
              )}

              <div className="apple-featured-overlay" />
            </div>

            <div className="apple-featured-content">
              <span className="promo-tag">{featured.hero?.tag || "NEW"}</span>
              <h3>{featured.hero?.heading}</h3>
              <p>{featured.hero?.description}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="apple-large-grid">
        {rest.map((scene, index) => {
          

          return (
            <motion.div
              key={scene.id}
              className="apple-large-card"
              layoutId={`card-${scene.id}`}
              onClick={() => setActivePage(scene.id)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              whileHover={{ y: -6 }}
            >
              <div
                className="apple-large-image-wrap"
              >
                {scene.image ? (
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="apple-large-image"
                  />
                ) : (
                  <div className="apple-large-image placeholder-card">
                    <span>{scene.title}</span>
                  </div>
                )}
              </div>

              <div
                className="apple-large-content"
              >
                <span className="promo-tag">{scene.hero?.tag || "NEW"}</span>
                <h3>{scene.hero?.heading}</h3>
                <p>{scene.hero?.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}