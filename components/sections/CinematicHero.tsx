"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import RoyalNeonLightTrail from "@/components/ui/RoyalNeonLightTrail";

export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let appHandle: { destroy: () => void } | undefined;
    if (canvasRef.current) {
      import("@/gl/main").then(({ createCinematicApp }) => {
        if (canvasRef.current) {
          appHandle = createCinematicApp(canvasRef.current);
        }
      });
    }
    return () => {
      appHandle?.destroy();
    };
  }, []);

  return (
    <>
      <h1 className="sr-only">
        SAYEED IBNE SAIF — Software, Cloud & Infrastructure Engineer. {profile.headline}
      </h1>

      <div className="stage-wrap">
        <canvas ref={canvasRef} id="stage" aria-hidden="true" />

        {/* Royal Cinematic Neon Light Trail Entrance */}
        <RoyalNeonLightTrail />

        <div className="furniture" aria-hidden="true">
          <p className="welcome" id="welcome">
            <b className="text-amber-400">•••</b>
            <span>Building the path to Cloud</span>
            <b className="text-amber-400">•••</b>
          </p>

          <p className="chip" id="chip1">
            <span>• Cloud Engineer •</span>
          </p>
          <p className="chip" id="chip2">
            <span>• IEEE CS Chairperson •</span>
          </p>

          <div className="arrows arrows--l" id="arrowsL" />
          <div className="arrows arrows--r" id="arrowsR" />
          <div className="grid-dots" id="dotsBR" />
        </div>

        <div className="boot" id="boot">
          <div className="boot__bar"><i id="bootFill" /></div>
          <button className="boot__enter" id="bootEnter" hidden>
            <span>Enter Experience</span>
          </button>
        </div>

        <noscript>
          <div className="fallback">
            <p>SAYEED IBNE SAIF</p>
            <small>Please enable JavaScript to view the animated experience.</small>
          </div>
        </noscript>
      </div>

      <div className="hero-spacer" aria-hidden="true" />
    </>
  );
}
