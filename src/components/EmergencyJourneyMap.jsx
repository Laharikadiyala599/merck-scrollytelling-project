import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    x: 150,
    y: 270,
    text: "serious road accident",
    image: "https://cdn-icons-png.flaticon.com/512/565/565547.png",
    textLeft: -88,
    textTop: +10,
    textWidth: 120,
    textAlign: "center"
  },
  {
    id: 2,
    x: 190,
    y: 165,
    text: "By-standers call 911 for immediate assistance",
    image: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
    textLeft: -150,
    textTop: -8,
    textWidth: 140,
    textAlign: "center"
  },
  {
    id: 3,
    x: 300,
    y: 140,
    text: "Ambulance arrives to take patient to nearest ER",
    image: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
   textLeft: -42,
    textTop: -90,
    textWidth: 150,
    textAlign: "top"
  },
  {
    id: 4,
    x: 410,
    y: 180,
    text: "Explain the emergency situation to physician on call",
    image: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
    textLeft: -42,
    textTop: -90,
    textWidth: 150,
    textAlign: "top"
  },
  {
    id: 5,
    x: 520,
    y: 275,
    text: "Get the required lab and diagnostic tests done",
    image: "https://cdn-icons-png.flaticon.com/512/2785/2785819.png",
    textLeft: -170,
    textTop: -28,
    textWidth: 150,
    textAlign: "left"
  },
  {
    id: 6,
    x: 630,
    y: 365,
    text: "Get admitted to inpatient, given the severity of accident",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    textLeft: -180,
    textTop: -28,
    textWidth: 150,
    textAlign: "left"
  },
  {
    id: 7,
    x: 760,
    y: 450,
    text: "Get assigned to a Specialist for inpatient treatment",
    image: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
    textLeft: -120,
    textTop: -6,
    textWidth: 140,
    textAlign: "left"
  },
  {
    id: 8,
    x: 900,
    y: 430,
    text: "Undergo inpatient surgery",
    image: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
    textLeft: 12,
    textTop: -4,
    textWidth: 110,
    textAlign: "left"
  },
  {
    id: 9,
    x: 1030,
    y: 345,
    text: "The resident nurse regularly administers medicines and tracks vitals",
    image: "https://cdn-icons-png.flaticon.com/512/2785/2785544.png",
    textLeft: 18,
    textTop: 8,
    textWidth: 170,
    textAlign: "center"
  },
  {
    id: 10,
    x: 1165,
    y: 270,
    text: "The Specialist regularly monitors vitals",
    image: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
    textLeft: -46,
    textTop: +30,
    textWidth: 160,
    textAlign: "center"
  },
  {
    id: 11,
    x: 1305,
    y: 205,
    text: "Get discharged from inpatient care once vitals stabilize",
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966480.png",
    textLeft: -40,
    textTop: +20,
    textWidth: 100,
    textAlign: "center"
  },
  {
    id: 12,
    x: 1450,
    y: 320,
    text: "Start post-surgery treatment",
    image: "https://cdn-icons-png.flaticon.com/512/2966/2966483.png",
    textLeft: -60,
    textTop: +30,
    textWidth: 100,
    textAlign: "center"
  },
  {
    id: 13,
    x: 1570,
    y: 390,
    text: "Find post-acute care facilities",
    image: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
    textLeft: -58,
    textTop: 12,
    textWidth: 120,
    textAlign: "center"
  },
  {
    id: 14,
    x: 1710,
    y: 350,
    text: "Communicate regularly with post-acute caregivers",
    image: "https://cdn-icons-png.flaticon.com/512/3059/3059518.png",
    textLeft: 14,
    textTop: 8,
    textWidth: 150,
    textAlign: "left"
  },
  {
    id: 15,
    x: 1840,
    y: 260,
    text: "Discuss progress with Specialist on a regular basis",
    image: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
    textLeft: 18,
    textTop: -2,
    textWidth: 150,
    textAlign: "left"
  },
  {
    id: 16,
    x: 1930,
    y: 200,
    text: "Receive reminders for follow-up care",
    image: "https://cdn-icons-png.flaticon.com/512/2983/2983788.png",
     textLeft: 16,
    textTop: -6,
    textWidth: 130,
    textAlign: "left"
  },
  {
    id: 17,
    x: 2015,
    y: 125,
    text: "Find focus groups and discuss care regime",
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
    textLeft: -92,
    textTop: -90,
    textWidth: 160,
    textAlign: "left"
  }
];

const MAP_WIDTH = 2100;
const MAP_HEIGHT = 550;

const hotspots = [
  [
    "Search & notify nearest ER",
    "Instant notification to PCP",
    "Remote connection between PCP, ER physician(s) and specialist"
  ],
  [
    "Sharing EHR and EMRs with care givers",
    "Virtual consultation with renowned surgeons for critical surgeries",
    "Remote monitoring and tracking of vitals",
    "On-line search for post-acute care facilities"
  ],
  [
    "Remote interactions with specialist, post-acute care facilities and care givers",
    "Regular reminders for follow-up care",
    "Virtual interactions with focus groups"
  ]
];

function buildPath(points) {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cx = (prev.x + curr.x) / 2;
    d += ` C ${cx} ${prev.y}, ${cx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function EmergencyJourneyMap() {
  const [activeStep, setActiveStep] = useState(1);
  const [unlockedStep, setUnlockedStep] = useState(1);
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

  const scrollBox = scrollRef.current;

  const targetLeft =
    el.offsetLeft - scrollBox.clientWidth / 2 + el.clientWidth / 2;

  scrollBox.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: "smooth"
  });
}, [nextStep]);

  const visiblePoints = steps.filter((s) => s.id <= unlockedStep);

  const handleStepClick = (step) => {
    if (step.id > unlockedStep) return;

    setActiveStep(step.id);

    if (step.id === unlockedStep && unlockedStep < steps.length) {
      setUnlockedStep((prev) => prev + 1);
    }
  };

  return (
    <section className="emergency-map-section">
      <h2 className="emergency-map-title">
        Healthcare - Patient Journey Map for Emergency Care
      </h2>

      <div className="emergency-map-scroll" ref={scrollRef}>
        <div
          className="emergency-map-board"
          style={{ width: `${MAP_WIDTH}px`, height: `${MAP_HEIGHT}px` }}
        >
          <svg
            className="emergency-map-svg"
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          >
            <path
              d={buildPath(steps)}
              className="emergency-map-path-base"
            />
            <motion.path
              d={buildPath(visiblePoints)}
              className="emergency-map-path-active"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </svg>

          {steps.map((step) => {
            const isUnlocked = step.id <= unlockedStep;
            const isActive = step.id === activeStep;
            const isPrompt = step.id === nextStep;

            return (
              
                <div
  key={step.id}
  ref={(el) => {
    if (el) stepRefs.current[step.id] = el;
  }}
                className={`emergency-step ${isUnlocked ? "show" : "hide"} ${isActive ? "active" : ""}`}
                style={{ left: `${step.x}px`, top: `${step.y}px` }}
              >
                <motion.button
                  className="emergency-step-dot"
                  onClick={() => handleStepClick(step)}
                  animate={
                    isPrompt
                      ? { scale: [1, 1.18, 1], opacity: [1, 0.8, 1] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{
                    duration: 1.1,
                    repeat: isPrompt ? Infinity : 0
                  }}
                />

                <motion.button
                  className="emergency-step-icon"
                  onClick={() => handleStepClick(step)}
                  animate={
                    isPrompt ? { y: [0, -6, 0] } : { y: 0 }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: isPrompt ? Infinity : 0
                  }}
                >
                  <img src={step.image} alt="" />
                  {isPrompt && <span className="emergency-click-hint">Click</span>}
                </motion.button>

                <div
  className="emergency-step-text"
  style={{
    left: `${step.textLeft}px`,
    top: `${step.textTop}px`,
    width: `${step.textWidth}px`,
    textAlign: step.textAlign || "center"
  }}
>
  {step.text}
</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="digital-hotspots-wrap">
        <div className="digital-hotspots-head">Digital Hotspots</div>
        <div className="digital-hotspots-grid">
          {hotspots.map((group, idx) => (
            <ul key={idx}>
              {group.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}