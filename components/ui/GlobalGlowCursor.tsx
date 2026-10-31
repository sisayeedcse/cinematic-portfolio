"use client";

import { useEffect, useState } from "react";
import GlowCursor from "./GlowCursor";

export default function GlobalGlowCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <GlowCursor
      color="#c8382b"
      secondaryColor="#d4af37"
      intensity={1.3}
      trailWidth={3.2}
      linger={1.3}
      glow={1.2}
      hotspot={0.75}
      followSpeed={0.65}
      clickBurst={true}
      quality="high"
      theme="dark"
      blendMode="screen"
      className="glow-cursor--global"
    />
  );
}
