import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import Domains from "./components/Domains";
import { Events } from "./components/Events";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { StatusBar } from "./components/StatusBar";
import { ParticleBackground } from "./components/ParticleBackground";
import LoadingScreen from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { AchievementPopup } from "./components/AchievementPopup";
import { QuestsModal } from "./components/QuestsModal";
import { useSessionProgress } from "./hooks/useSessionProgress";
import { useSectionAchievement } from "./hooks/useSectionAchievement";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isQuestsModalOpen, setIsQuestsModalOpen] = useState(false);
  const { level, levelProgress, latestAchievement, unlockAchievement, points, quests, completeQuest } =
    useSessionProgress();

  // Fire achievements when sections come into view
  useSectionAchievement("domains", "events", unlockAchievement);
  useSectionAchievement("events", "events", unlockAchievement);
  useSectionAchievement("team", "team", unlockAchievement);
  useSectionAchievement("contact", "contact", unlockAchievement);

  return (
    <>
      {/* Loading screen on startup */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* Interactive background */}
          <ParticleBackground />

          {/* Custom cursor (desktop only) */}
          <CustomCursor />

          <Navbar />

          <main id="main-content">
            <Hero />
            <Domains />
            <Events onRegister={() => completeQuest("first_registration")} />
            <Team />
            <Contact />
          </main>

          <Footer />

          {/* Achievement toast popup */}
          <AchievementPopup achievement={latestAchievement} />

          {/* Status bar HUD */}
          <StatusBar
            level={level}
            levelProgress={levelProgress}
            latestAchievement={latestAchievement}
            points={points}
            onOpenQuests={() => setIsQuestsModalOpen(true)}
          />

          {/* Quests Modal */}
          <QuestsModal 
            isOpen={isQuestsModalOpen} 
            onClose={() => setIsQuestsModalOpen(false)} 
            quests={quests} 
          />
        </>
      )}
    </>
  );
}

export default App;
