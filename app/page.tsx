"use client";

import CinematicHero from "@/components/sections/CinematicHero";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Leadership from "@/components/sections/Leadership";
import Projects from "@/components/sections/Projects";
import CinematicFooter from "@/components/sections/CinematicFooter";
import CinematicAura from "@/components/ui/CinematicAura";
import CinematicHeader from "@/components/layout/CinematicHeader";
import SceneDirectorHUD from "@/components/layout/SceneDirectorHUD";
import CascadingDotsCursor from "@/components/ui/CascadingDotsCursor";

export default function Home() {
  return (
    <>
      {/* Interactive Global Cinematic Ambient Light Cursor / Aura */}
      <CinematicAura />

      {/* Cascading Dots Cursor Trail — Crimson→Gold, additive overlay */}
      <CascadingDotsCursor />

      {/* Cinematic Header / Menu */}
      <CinematicHeader />

      {/* Floating Scene Director's HUD & Quick Navigator */}
      <SceneDirectorHUD />

      {/* Scene 1 — Cinematic Hero (Fixed WebGL Canvas Stage) */}
      <CinematicHero />

      {/* Main Flow: Scrolls over the fixed hero stage */}
      <main className="flow">
        {/* Scene 02 — Technical Arsenal & Skills */}
        <Skills />

        {/* Scene 03 — Royal Verified Credentials */}
        <Certifications />

        {/* Scene 04 — Leadership & Creed */}
        <Leadership />

        {/* Scene 05 — High-Performance Systems & Projects */}
        <Projects />

        {/* Scene 06 — Closing Finale */}
        <CinematicFooter />
      </main>
    </>
  );
}
