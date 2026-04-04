import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const journeySteps = [
  {
    id: 1,
    number: "01",
    title: "Customer discovers need",
    text: "Awareness begins through content, ads, referrals, or search visibility.",
    x: "10%",
    y: "18%",
    color: "journey-blue",
    icon: "🎯"
  },
  {
    id: 2,
    number: "02",
    title: "Explores options",
    text: "The customer compares products, features, pricing, and value.",
    x: "22%",
    y: "66%",
    color: "journey-orange",
    icon: "💬"
  },
  {
    id: 3,
    number: "03",
    title: "Evaluates experience",
    text: "Trust builds through product information, reviews, and support.",
    x: "46%",
    y: "68%",
    color: "journey-purple",
    icon: "💻"
  },
  {
    id: 4,
    number: "04",
    title: "Sees proof of value",
    text: "Clear performance signals and outcomes increase purchase confidence.",
    x: "45%",
    y: "26%",
    color: "journey-gold",
    icon: "📈"
  },
  {
    id: 5,
    number: "05",
    title: "Gets the key insight",
    text: "The strongest message lands with a memorable idea or benefit.",
    x: "78%",
    y: "16%",
    color: "journey-pink",
    icon: "💡"
  },
  {
    id: 6,
    number: "06",
    title: "Converts",
    text: "The user takes action and completes the intended next step.",
    x: "86%",
    y: "50%",
    color: "journey-green",
    icon: "🪙"
  },
  {
    id: 7,
    number: "07",
    title: "Becomes advocate",
    text: "A strong experience leads to satisfaction, rating, and repeat value.",
    x: "80%",
    y: "78%",
    color: "journey-red",
    icon: "👍"
  }
];

export default function AppendixJourneyInfographic() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(false);
          setActiveIndex(-1);

          setTimeout(() => {
            setHasStarted(true);
          }, 120);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let step = 0;
    const total = journeySteps.length;

    const interval = setInterval(() => {
      setActiveIndex(step);
      step += 1;

      if (step >= total) {
        clearInterval(interval);
      }
    }, 850);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="appendix-journey-section">
      <div className="appendix-journey-shell">
        <div className="appendix-journey-header">
          <p className="appendix-journey-kicker">APPENDIX EXPERIENCE FLOW</p>
          <h2>Customer Journey Map</h2>
          <p>
            A separate animated infographic below the horizontal appendix deck,
            revealing each stage one by one.
          </p>
        </div>

        <div className="appendix-journey-stage">
          <svg
            className="appendix-journey-paths"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
          >
            <path
              className={`journey-path ${activeIndex >= 0 ? "is-active" : ""}`}
              d="M150 170 C150 280, 260 280, 260 400"
            />
            <path
              className={`journey-path ${activeIndex >= 1 ? "is-active" : ""}`}
              d="M320 520 C380 520, 420 520, 500 520"
            />
            <path
              className={`journey-path ${activeIndex >= 2 ? "is-active" : ""}`}
              d="M560 520 C560 400, 560 300, 560 220"
            />
            <path
              className={`journey-path ${activeIndex >= 3 ? "is-active" : ""}`}
              d="M620 180 C760 180, 820 180, 900 180"
            />
            <path
              className={`journey-path ${activeIndex >= 4 ? "is-active" : ""}`}
              d="M930 220 C930 320, 930 360, 930 430"
            />
            <path
              className={`journey-path ${activeIndex >= 5 ? "is-active" : ""}`}
              d="M900 520 C860 520, 840 520, 820 560"
            />
          </svg>

          {journeySteps.map((step, index) => {
            const isActive = index <= activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <motion.div
                key={step.id}
                className={`journey-step ${step.color} ${isActive ? "is-active" : ""} ${isCurrent ? "is-current" : ""}`}
                style={{ left: step.x, top: step.y }}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={
                  isActive
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.28, y: 18, scale: 0.96 }
                }
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="journey-step-icon">{step.icon}</div>

                <div className="journey-step-content">
                  <div className="journey-step-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}