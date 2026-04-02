export default function Hero({ siteConfig }) {
  return (
    <section className="hero apple-hero-premium">
      <div className="apple-hero-left">
        <div className="apple-hero-kicker">{siteConfig.companyName}</div>
        <h1>{siteConfig.heroTitle}</h1>
      </div>

      <div className="apple-hero-right">
        <h2>{siteConfig.heroSubtitle}</h2>

        <div className="hero-links apple-hero-links">
          {siteConfig.heroLinks.map((link, index) => (
            <p key={index}>{link}</p>
          ))}
        </div>
      </div>
    </section>
  );
}