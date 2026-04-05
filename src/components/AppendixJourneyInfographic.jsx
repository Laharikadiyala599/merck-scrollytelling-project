import { useState } from "react";
import { motion } from "framer-motion";

const journeySteps = [
 {
  id: 1,
  number: "01",
  title: "Customer discovers need",
  text: "Awareness begins through content, ads, referrals, or search visibility.",
  x: "8%",
  y: "6%",
  color: "journey-blue",
  icon: "🎯"
},
{
  id: 2,
  number: "02",
  title: "Explores options",
  text: "The customer compares products, features, pricing, and value.",
  x: "20%",
  y: "62%",
  color: "journey-orange",
  icon: "💬"
},
{
  id: 3,
  number: "03",
  title: "Evaluates experience",
  text: "Trust builds through product information, reviews, and support.",
  x: "45%",
  y: "66%",
  color: "journey-purple",
  icon: "💻"
},
{
  id: 4,
  number: "04",
  title: "Sees proof of value",
  text: "Clear performance signals and outcomes increase purchase confidence.",
  x: "50%",
  y: "12%",
  color: "journey-gold",
  icon: "📈"
},
{
  id: 5,
  number: "05",
  title: "Gets the key insight",
  text: "The strongest message lands with a memorable idea or benefit.",
  x: "81%",
  y: "4%",
  color: "journey-pink",
  icon: "💡"
},
{
  id: 6,
  number: "06",
  title: "Converts",
  text: "The user takes action and completes the intended next step.",
  x: "82%",
  y: "40%",
  color: "journey-green",
  icon: "🪙"
},
{
  id: 7,
  number: "07",
  title: "Becomes advocate",
  text: "A strong experience leads to satisfaction, rating, and repeat value.",
  x: "72%",
  y: "78%",
  color: "journey-red",
  icon: "👍"
}
];

export default function AppendixJourneyInfographic() {
  const [openCount, setOpenCount] = useState(1);

  const handleStepClick = (index) => {
    if (index + 1 === openCount && openCount < journeySteps.length) {
      setOpenCount((prev) => prev + 1);
    }
  };

  return (
    <section className="appendix-journey-section">
      <div className="appendix-journey-shell">
        <div className="appendix-journey-header">
          <p className="appendix-journey-kicker">APPENDIX EXPERIENCE FLOW</p>
          <h2>Customer Journey Map</h2>
          <p>Click each numbered step to reveal the next stage.</p>
        </div>

        <div className="appendix-journey-stage redesigned-journey-stage">
         <svg
  className="appendix-journey-paths"
  viewBox="0 0 1200 760"
  preserveAspectRatio="none"
>
  {/* 1 -> 2 */}
  <path
    className={`journey-path ${openCount >= 2 ? "is-active" : ""}`}
    d="M150 120 C130 400, 210 370, 300 520"
  />

  {/* 2 -> 3 */}
  <path
    className={`journey-path ${openCount >= 3 ? "is-active" : ""}`}
    d="M380 530 L590 530"
  />

  {/* 3 -> 4 */}
  <path
    className={`journey-path ${openCount >= 4 ? "is-active" : ""}`}
    d="M620 520 L620 175"
  />

  {/* 4 -> 5 */}
  <path
    className={`journey-path ${openCount >= 5 ? "is-active" : ""}`}
    d="M700 130 L960 130"
  />

  {/* 5 -> 6 */}
  <path
    className={`journey-path ${openCount >= 6 ? "is-active" : ""}`}
    d="M1000 170 L1000 300"
  />

  {/* 6 -> 7 */}
  <path
    className={`journey-path ${openCount >= 7 ? "is-active" : ""}`}
    d="M1000 400 L1000 600"
  />
</svg>

          {journeySteps.map((step, index) => {
            const isVisible = index < openCount;
            const isClickable = index + 1 === openCount && openCount < journeySteps.length;

            return (
              <motion.div
                key={step.id}
                className={`journey-step redesigned-step ${step.color} ${isVisible ? "is-active" : ""} ${isClickable ? "is-clickable" : ""}`}
                style={{ left: step.x, top: step.y }}
                initial={false}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.15, y: 12, scale: 0.98 }
                }
                transition={{ duration: 0.35 }}
              >
                <div className="journey-step-icon">{step.icon}</div>

                <div className="journey-step-content">
                  <button
                    type="button"
                    className="journey-step-number"
                    onClick={() => handleStepClick(index)}
                    disabled={!isClickable}
                  >
                    {step.number}
                  </button>

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