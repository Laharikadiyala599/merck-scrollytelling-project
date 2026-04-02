import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { scenes } from "./data/scenes";
import { siteConfig } from "./data/siteconfig";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IconRow from "./components/IconRow";
import PromoCards from "./components/PromoCards";
import SectionDetail from "./components/SectionDetail";
import "./styles.css";

function splitNarration(text = "") {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isInteractiveElement(target) {
  if (!(target instanceof HTMLElement)) return false;

  return Boolean(
    target.closest(
      'input, textarea, select, button, a, [role="button"], [contenteditable="true"]'
    )
  );
}

function hasScrollableAncestor(target) {
  if (!(target instanceof HTMLElement)) return false;

  let node = target;

  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const overflowX = style.overflowX;

    const canScrollY =
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight + 4;

    const canScrollX =
      (overflowX === "auto" || overflowX === "scroll") &&
      node.scrollWidth > node.clientWidth + 4;

    if (canScrollY || canScrollX) return true;
    node = node.parentElement;
  }

  return false;
}

export default function App() {
  const [activePage, setActivePage] = useState("store");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [hoverSpeechText, setHoverSpeechText] = useState("");
  const iconScrollRef = useRef(null);

  const activeScene = scenes.find((scene) => scene.id === activePage);

  const narrationSentencesRef = useRef([]);
  const currentSentenceIndexRef = useRef(0);
  const isHoverSpeakingRef = useRef(false);
  const hoverTimeoutRef = useRef(null);
  const narrationSessionRef = useRef(0);

  const wheelLockRef = useRef(false);
  const wheelCooldownRef = useRef(null);
  const gestureAccumulatorRef = useRef(0);

  const pageOrder = useMemo(() => ["store", ...scenes.map((scene) => scene.id)], []);

  const navigateRelative = (direction) => {
    setActivePage((current) => {
      const currentIndex = pageOrder.indexOf(current);
      if (currentIndex === -1) return current;

      const nextIndex =
        direction === "next"
          ? Math.min(currentIndex + 1, pageOrder.length - 1)
          : Math.max(currentIndex - 1, 0);

      return pageOrder[nextIndex];
    });
  };

  const scrollIcons = (direction) => {
    if (!iconScrollRef.current) return;

    iconScrollRef.current.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth"
    });
  };

  const getPreferredVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    return (
      voices.find((voice) => voice.lang?.startsWith("en-US")) ||
      voices.find((voice) => voice.lang?.startsWith("en")) ||
      voices[0]
    );
  };

  const speakNextSentence = (sessionId) => {
    if (!voiceEnabled) return;
    if (activePage === "store") return;
    if (isHoverSpeakingRef.current) return;
    if (sessionId !== narrationSessionRef.current) return;

    const sentences = narrationSentencesRef.current;
    const index = currentSentenceIndexRef.current;

    if (!sentences.length || index >= sentences.length) return;

    const utterance = new SpeechSynthesisUtterance(sentences[index]);
    const preferredVoice = getPreferredVoice();

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      if (sessionId !== narrationSessionRef.current) return;
      if (isHoverSpeakingRef.current) return;

      currentSentenceIndexRef.current += 1;
      speakNextSentence(sessionId);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startNarration = () => {
    window.speechSynthesis.cancel();
    narrationSessionRef.current += 1;
    currentSentenceIndexRef.current = 0;
    isHoverSpeakingRef.current = false;

    if (!voiceEnabled) return;
    if (activePage === "store") return;
    if (!activeScene?.narration) return;

    narrationSentencesRef.current = splitNarration(activeScene.narration);
    speakNextSentence(narrationSessionRef.current);
  };

  const resumeNarration = () => {
    if (!voiceEnabled) return;
    if (activePage === "store") return;
    if (!activeScene?.narration) return;
    if (isHoverSpeakingRef.current) return;

    window.speechSynthesis.cancel();
    speakNextSentence(narrationSessionRef.current);
  };

  useEffect(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    startNarration();

    return () => {
      window.speechSynthesis.cancel();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [activePage, activeScene, voiceEnabled]);

  useEffect(() => {
    if (!voiceEnabled) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (hoverSpeechText) {
      hoverTimeoutRef.current = setTimeout(() => {
        isHoverSpeakingRef.current = true;
        window.speechSynthesis.cancel();

        const hoverUtterance = new SpeechSynthesisUtterance(hoverSpeechText);
        const preferredVoice = getPreferredVoice();

        if (preferredVoice) hoverUtterance.voice = preferredVoice;
        hoverUtterance.rate = 1;
        hoverUtterance.pitch = 1;
        hoverUtterance.volume = 1;

        hoverUtterance.onend = () => {
          isHoverSpeakingRef.current = false;
          resumeNarration();
        };

        window.speechSynthesis.speak(hoverUtterance);
      }, 260);
    } else {
      window.speechSynthesis.cancel();
      isHoverSpeakingRef.current = false;
      resumeNarration();
    }

    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [hoverSpeechText, voiceEnabled]);

  useEffect(() => {
    const unlockWheel = () => {
      wheelLockRef.current = false;
      gestureAccumulatorRef.current = 0;
    };

    const handleWheel = (event) => {
      if (activePage !== "store") return;
      if (isInteractiveElement(event.target)) return;

      const target = event.target;
      const inHorizontalSection =
        target instanceof HTMLElement &&
        target.closest(".appendix-side-scroll, .appendix-flow-row, .apple-icon-row");

      if (inHorizontalSection) return;

      const insideScrollableArea = hasScrollableAncestor(target);
      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);

      const looksLikeTrackpadSwipe =
        absX > 8 || (absY > 8 && event.ctrlKey === false);

      if (!looksLikeTrackpadSwipe) return;

      if (insideScrollableArea) {
        const inIconRow =
          target instanceof HTMLElement &&
          target.closest(".apple-icon-row, .apple-icon-toolbar");

        if (!inIconRow) return;
      }

      if (wheelLockRef.current) return;

      const isMostlyHorizontal = absX > absY * 1.1;
      const movement = isMostlyHorizontal ? event.deltaX : event.deltaY;

      gestureAccumulatorRef.current += movement;

      const THRESHOLD = 110;
      if (Math.abs(gestureAccumulatorRef.current) < THRESHOLD) return;

      wheelLockRef.current = true;

      if (gestureAccumulatorRef.current > 0) {
        navigateRelative("next");
      } else {
        navigateRelative("prev");
      }

      gestureAccumulatorRef.current = 0;

      if (wheelCooldownRef.current) clearTimeout(wheelCooldownRef.current);
      wheelCooldownRef.current = setTimeout(unlockWheel, 650);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelCooldownRef.current) clearTimeout(wheelCooldownRef.current);
    };
  }, [activePage, pageOrder]);

  return (
    <LayoutGroup>
      <div className="app swipe-shell">
        <Navbar
          scenes={scenes}
          siteConfig={siteConfig}
          hoveredNav={hoveredNav}
          setHoveredNav={setHoveredNav}
          setActivePage={setActivePage}
        />

        <div className="voice-toggle-wrap">
          <button
            className="voice-toggle-btn"
            onClick={() => {
              window.speechSynthesis.cancel();
              setVoiceEnabled((prev) => !prev);
            }}
          >
            {voiceEnabled ? "Voice On" : "Voice Off"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activePage === "store" ? (
            <motion.div
              key="store"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Hero siteConfig={siteConfig} />
              <IconRow
                scenes={scenes}
                iconScrollRef={iconScrollRef}
                scrollIcons={scrollIcons}
                setActivePage={setActivePage}
              />
              <PromoCards
                titleBold={siteConfig.storeSectionTitleBold}
                titleLight={siteConfig.storeSectionTitleLight}
                scenes={scenes}
                setActivePage={setActivePage}
              />
            </motion.div>
          ) : (
            <SectionDetail
              key={activeScene?.id}
              activeScene={activeScene}
              scenes={scenes}
              setActivePage={setActivePage}
              setHoverSpeechText={setHoverSpeechText}
            />
          )}
        </AnimatePresence>

        <footer>{siteConfig.footerText}</footer>
      </div>
    </LayoutGroup>
  );
}