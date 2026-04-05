import { motion } from "framer-motion";

export default function Hero({ siteConfig }) {
  return (
    <section className="apple-hero-compact">
      <motion.div
        className="apple-hero-compact-inner"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <h1 className="merck-heading">{siteConfig.heroTitle}</h1>

        <p className="apple-hero-compact-text">
          {siteConfig.heroDescription}
        </p>
      </motion.div>
    </section>
  );
}