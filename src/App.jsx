import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { scenes } from "./data/scenes";
import { siteConfig } from "./data/siteConfig";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PromoCards from "./components/PromoCards";
import SectionDetail from "./components/SectionDetail";
import "./styles.css";
import ChatBox from "./ChatBox";

function splitNarration(text = "") {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function App() {
  const [activePage, setActivePage] = useState("store");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [hoverSpeechText, setHoverSpeechText] = useState("");

  const activeScene = scenes.find((scene) => scene.id === activePage);

  const narrationSentencesRef = useRef([]);
  const currentSentenceIndexRef = useRef(0);
  const isHoverSpeakingRef = useRef(false);
  const hoverTimeoutRef = useRef(null);
  const narrationSessionRef = useRef(0);

  const toggleVoice = () => {
    setIsVoiceEnabled((prev) => !prev);
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
    if (!isVoiceEnabled) return;
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

    if (!isVoiceEnabled) return;
    if (activePage === "store") return;
    if (!activeScene?.narration) return;

    narrationSentencesRef.current = splitNarration(activeScene.narration);
    speakNextSentence(narrationSessionRef.current);
  };

  const resumeNarration = () => {
    if (!isVoiceEnabled) return;
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
  }, [activePage, activeScene, isVoiceEnabled]);

  useEffect(() => {
    if (!isVoiceEnabled) return;

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
  }, [hoverSpeechText, isVoiceEnabled]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const goHomeAndScrollTop = () => {
    setActivePage("store");

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  };

  return (
    <LayoutGroup>
      <div className="app swipe-shell">
        <Navbar
          scenes={scenes}
          siteConfig={siteConfig}
          hoveredNav={hoveredNav}
          setHoveredNav={setHoveredNav}
          setActivePage={setActivePage}
          activePage={activePage}
          onHomeClick={goHomeAndScrollTop}
          onChatOpen={() => setIsChatOpen(true)}
          onChatClose={() => setIsChatOpen(false)}
          isVoiceEnabled={isVoiceEnabled}
          toggleVoice={toggleVoice}
        />

        <ChatBox
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />

        <div className="voice-toggle-wrap">
          <button className="voice-toggle-btn" onClick={toggleVoice}>
            <img
              src={isVoiceEnabled ? "/voice-on.png" : "/voice-off.png"}
              alt="voice toggle"
              className="voice-icon"
            />
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

              {/*
              <IconRow
                scenes={scenes}
                iconScrollRef={iconScrollRef}
                scrollIcons={scrollIcons}
                setActivePage={setActivePage}
              />
              */}

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