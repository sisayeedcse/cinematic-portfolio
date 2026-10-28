"use client";

import CinematicHero from "@/components/sections/CinematicHero";
import SkillsUniverse from "@/components/sections/SkillsUniverse";
import CloudJourneyTimeline from "@/components/sections/CloudJourneyTimeline";
import ProjectsAmphitheater from "@/components/sections/ProjectsAmphitheater";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Activities from "@/components/sections/Activities";
import CinematicFooter from "@/components/sections/CinematicFooter";
import CinematicAura from "@/components/ui/CinematicAura";
import CinematicHeader from "@/components/layout/CinematicHeader";
import SceneDirectorHUD from "@/components/layout/SceneDirectorHUD";

export default function Home() {
  return (
    <>
      {/* Interactive Global Cinematic Ambient Light Cursor / Aura */}
      <CinematicAura />

      {/* Cinematic Header / Menu (Matching Reference Image) */}
      <CinematicHeader />

      {/* Floating Scene Director's HUD & Quick Navigator */}
      <SceneDirectorHUD />

      {/* Scene 1 — Cinematic Hero (Fixed WebGL Canvas Stage) */}
      <CinematicHero />

      {/* Main Flow: Scrolls over the fixed hero stage */}
      <main className="flow">
        {/* Scene 2 — Skills Universe */}
        <SkillsUniverse />

        {/* Scene 3 — Cloud Journey Timeline (Arc Time Machine) */}
        <CloudJourneyTimeline />

        {/* Scene 4 — Projects Amphitheater */}
        <ProjectsAmphitheater />

        {/* Scene 5 — Experience */}
        <Experience />

        {/* Scene 6 — Certifications */}
        <Certifications />

        {/* Scene 7 — Activities & Honors */}
        <Activities />
      </main>

      {/* Finale — Closing Shot Footer */}
      <CinematicFooter />
    </>
  );
}
