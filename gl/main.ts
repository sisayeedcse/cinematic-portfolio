// Boot, orchestration, and animation loop for the cinematic hero WebGL stage

import { Stage } from "./stage";
import { Clip } from "../lib/clip";
import { computeLayout, LayoutComputed } from "./layout";
import { buildWord, fontsReady, WordAtlas } from "./type";
import { sampleTimeline, letterOrder, CUES, T } from "./timeline";
import { damp, clamp } from "../lib/ease";

const MEDIA = "/media/";
const MIN_BLACK = 600;

export interface AppState {
  stage: Stage | null;
  clips: { hero?: Clip };
  layout: LayoutComputed | null;
  word: WordAtlas | null;
  order: number[];
  t0: number;
  fired: Set<string>;
  pointer: { x: number; y: number; tx: number; ty: number };
  running: boolean;
  heroOnScreen: boolean;
}

export function createCinematicApp(canvas: HTMLCanvasElement) {
  const root = document.documentElement;
  const bootEl = document.getElementById("boot");
  const bootFill = document.getElementById("bootFill");
  const bootEnter = document.getElementById("bootEnter");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const app: AppState = {
    stage: new Stage(canvas),
    clips: {},
    layout: null,
    word: null,
    order: [],
    t0: 0,
    fired: new Set(),
    pointer: { x: 0, y: 0, tx: 0, ty: 0 },
    running: false,
    heroOnScreen: true,
  };

  if (!app.stage || !app.stage.ok) {
    degrade("WebGL 2.0 unavailable");
    return;
  }

  async function init() {
    let manifest: any;
    try {
      manifest = await fetch(`${MEDIA}manifest.json`).then((r) => r.json());
    } catch {
      manifest = {
        clips: {
          hero: {
            mp4: "hero.mp4",
            webm: "hero.webm",
            poster: "hero.jpg",
            w: 1280,
            h: 720,
            track: null,
          },
        },
      };
    }

    const steps = 4;
    let done = 0;
    const tick = () => {
      if (bootFill) bootFill.style.width = `${(++done / steps) * 100}%`;
    };

    const startedAt = performance.now();

    await Promise.all([
      fontsReady().then(tick),
      app.stage!.loadTextures({
        grunge: "/tex/grunge.png",
        grain: "/tex/grain.png",
      }).then(tick),
    ]);

    const c = manifest.clips?.hero;
    const srcList: { url: string; type: string }[] = [];
    if (c?.webm) srcList.push({ url: MEDIA + c.webm, type: "video/webm" });
    if (c?.mp4) srcList.push({ url: MEDIA + c.mp4, type: "video/mp4" });
    if (!srcList.length) srcList.push({ url: MEDIA + "hero.mp4", type: "video/mp4" });

    app.clips.hero = new Clip({
      src: srcList,
      poster: MEDIA + (c?.poster || "hero.jpg"),
      w: c?.w || 720,
      h: c?.h || 1280,
      track: c?.track || null,
      loopFade: 0.7,
    });

    handleLayout();
    window.addEventListener("resize", debounce(handleLayout, 140));
    window.addEventListener("orientationchange", () => setTimeout(handleLayout, 220));

    try {
      await app.clips.hero.whenReady();
    } catch {
      // proceed anyway
    }
    tick();

    const held = performance.now() - startedAt;
    if (held < MIN_BLACK) await wait(MIN_BLACK - held);

    const playing = await app.clips.hero.play();
    begin();
    if (!playing) {
      const onFirstTap = async () => {
        await app.clips.hero?.play();
        window.removeEventListener("pointerdown", onFirstTap);
        window.removeEventListener("scroll", onFirstTap);
      };
      window.addEventListener("pointerdown", onFirstTap, { once: true });
      window.addEventListener("scroll", onFirstTap, { once: true });
    }
  }

  function begin() {
    if (bootEl) bootEl.classList.add("is-done");
    root.classList.remove("is-booting");
    app.t0 = performance.now();
    app.running = true;
    bindPointer();

    if (reduced) {
      app.t0 = performance.now() - T.settled * 1000;
      for (const [, name] of CUES) root.classList.add(`is-${name}`);
      return;
    }
    requestAnimationFrame(frame);
  }

  function awaitGesture() {
    if (bootEnter) {
      bootEnter.hidden = false;
      bootEnter.addEventListener(
        "click",
        async () => {
          await app.clips.hero?.play();
          begin();
        },
        { once: true }
      );
    }
  }

  function handleLayout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const L = computeLayout(w, h);
    app.layout = L;
    app.stage?.resize(L);

    const capPx = Math.round(L.word.capH * L.dpr);
    if (!app.word || Math.abs((app.word.capPx || 0) - capPx) > 2) {
      const word = buildWord(capPx, app.stage?.maxTexture || 4096);
      word.capPx = capPx;
      app.word = word;
      app.stage?.setWord(word);
      app.order = letterOrder(word.letters);
    }
    applyFurnitureDOM(L);
  }

  function applyFurnitureDOM(L: LayoutComputed) {
    const chip1 = document.getElementById("chip1");
    const chip2 = document.getElementById("chip2");
    const welcome = document.getElementById("welcome");
    const arrowsL = document.getElementById("arrowsL");
    const arrowsR = document.getElementById("arrowsR");
    const dotsBR = document.getElementById("dotsBR");

    if (chip1) {
      chip1.style.left = `${L.chip1.x}px`;
      chip1.style.top = `${L.chip1.y}px`;
    }
    if (chip2) {
      chip2.style.left = `${L.chip2.x}px`;
      chip2.style.top = `${L.chip2.y}px`;
    }
    if (welcome) {
      welcome.style.top = `${L.welcomeY}px`;
    }
    if (arrowsL && arrowsL.childElementCount === 0) {
      for (let i = 0; i < 5; i++) {
        const s = document.createElement("span");
        arrowsL.appendChild(s);
      }
    }
    if (arrowsR && arrowsR.childElementCount === 0) {
      for (let i = 0; i < 5; i++) {
        const s = document.createElement("span");
        arrowsR.appendChild(s);
      }
    }
    if (dotsBR && dotsBR.childElementCount === 0) {
      for (let i = 0; i < 24; i++) {
        const s = document.createElement("span");
        dotsBR.appendChild(s);
      }
    }
  }

  function bindPointer() {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    window.addEventListener(
      "pointermove",
      (e) => {
        app.pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
        app.pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      },
      { passive: true }
    );
    window.addEventListener("pointerleave", () => {
      app.pointer.tx = 0;
      app.pointer.ty = 0;
    });
  }

  let last = 0;
  function frame(now: number) {
    if (!app.running) return;
    const t = (now - app.t0) / 1000;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;

    for (const [at, name] of CUES) {
      if (t >= at && !app.fired.has(name)) {
        app.fired.add(name);
        root.classList.add(`is-${name}`);
      }
    }

    const p = app.pointer;
    p.x = damp(p.x, p.tx, 3.1, dt);
    p.y = damp(p.y, p.ty, 3.1, dt);

    const gate = clamp((t - T.settled + 0.9) / 1.2);
    if (app.stage) {
      app.stage.parallax.x = p.x * gate;
      app.stage.parallax.y = p.y * gate;
    }

    if (app.word) {
      const state = sampleTimeline(t, app.word.letters.length, app.order);
      if (state.settled) {
        const b = Math.sin(t * 0.42) * 0.5 + Math.sin(t * 0.27 + 1.3) * 0.5;
        for (const l of state.letters) l.dy = b * 0.0035;
      }
      app.stage?.render(state, t, app.clips);
    }

    requestAnimationFrame(frame);
  }

  function degrade(reason: string) {
    console.warn("[cinematic] fallback:", reason);
    root.classList.remove("is-booting");
    root.classList.add("is-fallback");
    if (bootEl) bootEl.classList.add("is-done");
    for (const [, name] of CUES) root.classList.add(`is-${name}`);
  }

  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  function debounce(fn: (...args: any[]) => void, ms: number) {
    let id: any;
    return (...a: any[]) => {
      clearTimeout(id);
      id = setTimeout(() => fn(...a), ms);
    };
  }

  // Battery saving when hero is scrolled out of viewport
  const heroWrap = document.querySelector(".stage-wrap") as HTMLElement | null;
  const spacer = document.querySelector(".hero-spacer");
  if (heroWrap && spacer && "IntersectionObserver" in window) {
    new IntersectionObserver(
      ([e]) => {
        const clip = app.clips.hero;
        if (!clip) return;
        app.heroOnScreen = e.isIntersecting;
        if (e.isIntersecting) {
          clip.play();
          heroWrap.style.visibility = "";
        } else {
          clip.pause();
          heroWrap.style.visibility = "hidden";
        }
      },
      { threshold: 0 }
    ).observe(spacer);
  }

  document.addEventListener("visibilitychange", () => {
    const hidden = document.visibilityState === "hidden";
    if (app.clips.hero) {
      if (hidden) app.clips.hero.pause();
      else if (app.heroOnScreen) app.clips.hero.play();
    }
  });

  init();

  return {
    destroy: () => {
      app.running = false;
      app.clips.hero?.pause();
    },
  };
}
