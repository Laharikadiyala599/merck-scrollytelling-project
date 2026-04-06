import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { image } from "framer-motion/client";
import EmergencyJourneyMap from "./EmergencyJourneyMap";

/* =========================
   STEP DATA (WITH ONLINE ICONS)
   ========================= */
const steps = [
  {
    id: 1,
    label: "STEP 1",
    title: "Start of symptoms",
    narration: "The patient begins noticing symptoms or discomfort and visits a primary care physician for evaluation",
    x: 120,
    y: 120,
    image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    color: "#cfe8ff"
  },
  {
    id: 2,
    label: "STEP 2",
    title: "Find a doctor",
    narration: "Based on initial findings, the patient is referred to a specialist for deeper analysis.",

    x: 180,
    y: 500,
    image: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png" ,
    color: "#ffffff"
  },
  {
    id: 3,
    label: "STEP 3",
    title: "Visit specialist",
    narration: "The patient undergoes laboratory tests and diagnostic procedures to identify the condition.",
    x: 420,
    y: 260,
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    color: "#e8bdf3"
  },
  {
    id: 4,
    label: "STEP 4",
    title: "Blood & genetic test",
    narration:  "The diagnosis is confirmed using clinical results, imaging, and test data.",
    x: 550,
    y: 600,
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966483.png",
    color: "#ffffff"
  },
  {
    id: 5,
    label: "STEP 5",
    title: "Diagnosis confirmation",
    narration:"A treatment plan is created, and the patient begins therapy with proper guidance and support.",
    x: 700,
    y: 120,
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png",
    color: "#efc7f8"
  },
  {
    id: 6,
    label: "STEP 6",
    title: "Prescription / treatment",
     
    x: 940,
    y: 260,
    image: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",

    color: "#ffffff"
  }
];

const MAP_WIDTH = 1100;
const MAP_HEIGHT = 750;

/* =========================
   CURVE FUNCTION
   ========================= */
function buildCurve(from, to) {
  const x1 = from.x;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;

  const offset = 120;

  return `M ${x1} ${y1}
          C ${x1 + offset} ${y1},
            ${x2 - offset} ${y2},
            ${x2} ${y2}`;
}

/* =========================
   COMPONENT
   ========================= */
export default function TreatmentJourneyInfographic() {
  const [activeStep, setActiveStep] = useState(1);
  const [unlockedStep, setUnlockedStep] = useState(1);
  const playNarration = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.95;
  speech.pitch = 1;
  speech.lang = "en-US";

  window.speechSynthesis.cancel(); // stop previous audio
  window.speechSynthesis.speak(speech);
};
  const scrollRef = useRef(null);
const stepRefs = useRef({});

  const nextStep = useMemo(
  () => (unlockedStep < steps.length ? unlockedStep : null),
  [unlockedStep]
);
useEffect(() => {
  if (!scrollRef.current) return;
  if (!nextStep) return;

  const el = stepRefs.current[nextStep];
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
}, [nextStep]);
  const handleClick = (step) => {
    if (step.id > unlockedStep) return;

    setActiveStep(step.id);
    // 🔊 PLAY AUDIO
  playNarration(step.narration);

    if (step.id === unlockedStep && unlockedStep < steps.length) {
      setUnlockedStep((prev) => prev + 1);
    }
  };

  return (
  <>
    {/* FIRST MAP */}
    <section className="journey-page">
      <div className="journey-scroll" ref={scrollRef}>
        <div
          className="journey-canvas"
          style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
        >
          {/* ===== TITLE ===== */}
          <div className="journey-header">
            <h2>HEALTHCARE PATIENT</h2>
            <h3>JOURNEY MAPPING</h3>
          </div>

          {/* ===== PATH ===== */}
          <svg
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            className="journey-path"
          >
            {steps.map((step, i) => {
              if (i === 0) return null;

              const prev = steps[i - 1];
              const visible = step.id <= unlockedStep;

              return (
                <motion.path
                  key={step.id}
                  d={buildCurve(prev, step)}
                  fill="none"
                  stroke={visible ? "#b6b1a5" : "#ddd"}
                  strokeWidth="30"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: visible ? 1 : 0.2 }}
                  transition={{ duration: 0.6 }}
                />
              );
            })}
          </svg>

          {/* ===== STEPS ===== */}
          {steps.map((step) => {
            const isUnlocked = step.id <= unlockedStep;
            const isActive = step.id === activeStep;
            const isPrompt = step.id === nextStep;

            return (
             <div key={step.id}>
  <motion.button
    ref={(el) => {
      if (el) stepRefs.current[step.id] = el;
    }}
    className={`journey-image ${isUnlocked ? "" : "locked"}`}
    style={{ left: step.x, top: step.y }}
    onClick={() => handleClick(step)}
                  animate={{
                    y: isPrompt ? [0, -10, 0] : 0
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: isPrompt ? Infinity : 0
                  }}
                >
                  <img src={step.image} alt="" />
                  {isPrompt && <div className="click-hint">Click</div>}
                </motion.button>

                <div
                  className={`journey-card ${isUnlocked ? "show" : "hide"} ${
  isActive ? "active" : ""
}`}
                  style={{
                    left: step.x + 40,
                    top: step.y + 120,
                    background: step.color
                  }}
                >
                  <span>{step.label}</span>
                  <h4>{step.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* 🔥 SECOND MAP */}
    <EmergencyJourneyMap />
  </>
);
}