"use client";

import CinematicHero from "@/components/sections/CinematicHero";
import Leadership from "@/components/sections/Leadership";
import CinematicFooter from "@/components/sections/CinematicFooter";
import CinematicHeader from "@/components/layout/CinematicHeader";
import SceneDirectorHUD from "@/components/layout/SceneDirectorHUD";
import CascadingDotsCursor from "@/components/ui/CascadingDotsCursor";

export default function Home() {
  return (
    <>
      {/* Cascading Dots Cursor Trail — Crimson→Gold */}
      <CascadingDotsCursor />

      {/* Cinematic Header / Menu */}
      <CinematicHeader />

      {/* Floating Scene Director's HUD & Quick Navigator */}
      <SceneDirectorHUD />

      {/* Scene 01 — Cinematic Hero (Fixed WebGL Canvas Stage) */}
      <CinematicHero />

      {/* Main Flow: Scrolls over the fixed hero stage */}
      <main className="flow">
        {/* Scene 02 — Executive Leadership Journey */}
        <Leadership />

        {/* Scene 03 — Closing Finale */}
        <CinematicFooter />
      </main>
    </>
  );
}
