"use client";

import CinematicHero from "@/components/sections/CinematicHero";
import SkillsUniverse from "@/components/sections/SkillsUniverse";
import Certifications from "@/components/sections/Certifications";
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

        {/* Scene 3 — Certifications */}
        <Certifications />
      </main>

      {/* Finale — Closing Shot Footer */}
      <CinematicFooter />
    </>
  );
}
