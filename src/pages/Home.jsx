import { useState } from "react";
import {
  FaFileAlt,
  FaBriefcase,
  FaChartLine,
  FaFlask,
  FaRocket,
  FaLayerGroup,
  FaCalendarAlt,
  FaCheckCircle
} from "react-icons/fa";

const scenes = [
  {
    id: "overview",
    title: "Overview",
    icon: FaFileAlt,
    heading: "Merck Overview",
    description:
      "Merck is entering a new phase of growth driven by scientific innovation and pipeline advancement."
  },
  {
    id: "portfolio",
    title: "Portfolio",
    icon: FaBriefcase,
    heading: "Portfolio Transformation",
    description:
      "Merck is transforming its portfolio through strategic launches and pipeline execution."
  },
  {
    id: "growth",
    title: "Growth",
    icon: FaChartLine,
    heading: "Growth Drivers",
    description:
      "Next generation growth drivers are powering future expansion."
  },
  {
    id: "pipeline",
    title: "Pipeline",
    icon: FaFlask,
    heading: "Pipeline Strength",
    description:
      "80+ Phase 3 studies supporting long-term growth."
  }
];

export default function Home() {
  const [activeScene, setActiveScene] = useState(scenes[0]);

  return (
    <div className="app">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">M</div>

          <div className="nav-items">
            {scenes.map((scene) => (
              <span
                key={scene.id}
                className="nav-item"
                onClick={() => setActiveScene(scene)}
              >
                {scene.title}
              </span>
            ))}
          </div>
        </div>

        <div className="nav-right">🔍</div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div>
          <h1>Merck</h1>
          <h2>Innovation that drives the future of healthcare.</h2>
        </div>
      </section>

      {/* ICON ROW */}
      <div className="scene-icons-row">
        {scenes.map((scene) => {
          const Icon = scene.icon;
          return (
            <div
              key={scene.id}
              className="scene-icon-item"
              onClick={() => setActiveScene(scene)}
            >
              <Icon className="scene-icon-img" />
              <div className="scene-label">{scene.title}</div>
            </div>
          );
        })}
      </div>

      {/* DYNAMIC CONTENT (THIS IS THE KEY 🔥) */}
      <div className="detail-hero">
        <p className="detail-kicker">{activeScene.title}</p>
        <h1>{activeScene.heading}</h1>
        <p className="detail-description">
          {activeScene.description}
        </p>
      </div>

      <div className="detail-wide-card">
        <h2>Details</h2>
        <p>
          This section changes dynamically based on the icon you click.
        </p>
      </div>
    </div>
  );
}