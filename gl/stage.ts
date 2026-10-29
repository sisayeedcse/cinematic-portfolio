// The WebGL hero compositor for Sayeed Ibne Saif — multi-pass rendering

import {
  createGL,
  program,
  unitQuad,
  texture,
  upload,
  bind,
  loadImage,
  ProgramInfo,
} from "./renderer";
import {
  VERT,
  FRAG_BG,
  FRAG_LETTER,
  FRAG_FIGURE,
  FRAG_SHADOW,
  FRAG_POST,
} from "./shaders";
import { WordAtlas } from "./type";
import { LayoutComputed } from "./layout";
import { TimelineState, HeroSample } from "./timeline";
import { Clip } from "../lib/clip";

// Royal crimson accent: #c8382b (matching the glowing stone SAYEED artwork & Ferrari)
export const INK = [0.784, 0.220, 0.169];

export class Stage {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext | null;
  ok: boolean;
  quad: WebGLVertexArrayObject | null = null;
  progs!: {
    bg: ProgramInfo;
    letter: ProgramInfo;
    figure: ProgramInfo;
    shadow: ProgramInfo;
    post: ProgramInfo;
  };
  tex!: {
    glyph: WebGLTexture;
    grunge: WebGLTexture;
    grain: WebGLTexture;
    hero: WebGLTexture;
  };
  maxTexture = 4096;
  res: [number, number] = [1, 1];
  word: WordAtlas | null = null;
  layout: LayoutComputed | null = null;
  parallax = { x: 0, y: 0 };
  wear = 0.42;
  wearGain = 2.0;
  wearScale = 5.4;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = createGL(canvas);
    this.ok = !!this.gl;
    if (!this.ok || !this.gl) return;

    const gl = this.gl;
    this.quad = unitQuad(gl);
    this.progs = {
      bg: program(gl, VERT, FRAG_BG, "bg"),
      letter: program(gl, VERT, FRAG_LETTER, "letter"),
      figure: program(gl, VERT, FRAG_FIGURE, "figure"),
      shadow: program(gl, VERT, FRAG_SHADOW, "shadow"),
      post: program(gl, VERT, FRAG_POST, "post"),
    };
    this.tex = {
      glyph: texture(gl),
      grunge: texture(gl, { wrap: "repeat" }),
      grain: texture(gl, { wrap: "repeat" }),
      hero: texture(gl),
    };
    this.maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  }

  async loadTextures({ grunge, grain }: { grunge: string; grain: string }) {
    if (!this.gl) return;
    const [a, b, heroImg] = await Promise.all([
      loadImage(grunge),
      loadImage(grain),
      loadImage("/media/hero-packed.jpg").catch(() => null),
    ]);
    upload(this.gl, this.tex.grunge, a);
    upload(this.gl, this.tex.grain, b);
    if (heroImg) upload(this.gl, this.tex.hero, heroImg);
  }

  setWord(word: WordAtlas) {
    if (!this.gl) return;
    this.word = word;
    upload(this.gl, this.tex.glyph, word.canvas);
  }

  resize(layout: LayoutComputed) {
    if (!this.gl) return;
    this.layout = layout;
    const { w, h, dpr } = layout;
    const W = Math.round(w * dpr);
    const H = Math.round(h * dpr);
    if (this.canvas.width !== W || this.canvas.height !== H) {
      this.canvas.width = W;
      this.canvas.height = H;
    }
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.res = [W, H];
    this.gl.viewport(0, 0, W, H);
  }

  private _quad(
    prog: ProgramInfo,
    rect: number[],
    uv: number[] = [0, 0, 1, 1],
    skew: number[] = [0, 0]
  ) {
    const gl = this.gl!;
    gl.uniform4f(prog.u.uRect, rect[0], rect[1], rect[2], rect[3]);
    gl.uniform2f(prog.u.uRes, this.res[0], this.res[1]);
    if (prog.u.uUV) gl.uniform4f(prog.u.uUV, uv[0], uv[1], uv[2], uv[3]);
    if (prog.u.uSkew) gl.uniform2f(prog.u.uSkew, skew[0], skew[1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  letterRect(i: number): [number, number, number, number] {
    const { word, dpr } = this.layout!;
    const W = this.word!;
    const s = (word.w * dpr) / W.ink.w;
    const L = W.letters[i];
    return [
      word.x * dpr + (L.x - W.ink.x) * s,
      word.y * dpr + (L.y - W.ink.y) * s,
      L.w * s,
      L.h * s,
    ];
  }

  render(state: TimelineState, time: number, clips: { hero?: Clip | null }) {
    if (!this.ok || !this.gl || !this.word || !this.layout || !this.quad) return;
    const gl = this.gl;
    const [W, H] = this.res;
    const dpr = this.layout.dpr;
    const aspect = W / H;
    gl.bindVertexArray(this.quad);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const px = this.parallax.x;
    const py = this.parallax.y;

    // 1. Plate / Background
    {
      const p = this.progs.bg;
      gl.useProgram(p.p);
      gl.uniform1i(p.u.uGrain, bind(gl, this.tex.grain, 0));
      gl.uniform1f(p.u.uTime, time);
      gl.uniform1f(p.u.uEmber, state.ember);
      gl.uniform1f(p.u.uAspect, aspect);
      gl.uniform2f(p.u.uEmberAt, this.layout.ember.x, this.layout.ember.y);
      this._quad(p, [0, 0, W, H]);
    }

    const heroSkew = [px * 30 * dpr, py * 18 * dpr];
    const geo = this._heroGeometry(clips.hero, state.hero);

    // 2. Letters (SAYEED)
    {
      const p = this.progs.letter;
      gl.useProgram(p.p);
      gl.uniform1i(p.u.uGlyph, bind(gl, this.tex.glyph, 0));
      gl.uniform1i(p.u.uGrunge, bind(gl, this.tex.grunge, 1));
      gl.uniform3f(p.u.uInk, INK[0], INK[1], INK[2]);
      gl.uniform2f(p.u.uGrungeScale, aspect * this.wearScale, this.wearScale);
      gl.uniform2f(p.u.uGrungeOffset, 0.12, 0.31);
      gl.uniform1f(p.u.uWear, this.wear);
      gl.uniform1f(p.u.uWearGain, this.wearGain);

      for (let i = 0; i < this.word.letters.length; i++) {
        const L = this.word.letters[i];
        const s = state.letters[i];
        if (!s || s.opacity <= 0.001) continue;
        const r = this.letterRect(i);
        const lift = s.dy * r[3];
        gl.uniform1f(p.u.uOpacity, s.opacity);
        gl.uniform1f(p.u.uReveal, s.reveal);
        gl.uniform1f(p.u.uSoften, s.soften * 0.026 * (L.v1 - L.v0));
        gl.uniform1f(p.u.uEdgeLight, s.edge);
        this._quad(
          p,
          r,
          [L.u0, L.v0, L.u1 - L.u0, L.v1 - L.v0],
          [px * 14 * dpr, lift + py * 9 * dpr]
        );
      }
    }

    // 3 + 4. Walking man / figure in front of the typography
    this._heroShadow(geo, state.hero, heroSkew);
    this._heroFigure(clips.hero, geo, state.hero, heroSkew);

    // 5. Post processing pass (grain + flash + vignette)
    {
      const p = this.progs.post;
      gl.useProgram(p.p);
      gl.uniform1i(p.u.uGrain, bind(gl, this.tex.grain, 0));
      gl.uniform1f(p.u.uTime, time);
      gl.uniform1f(p.u.uAmount, state.grain);
      gl.uniform1f(p.u.uAspect, aspect);
      gl.uniform1f(p.u.uFlash, state.flash);
      this._quad(p, [0, 0, W, H]);
    }
    gl.bindVertexArray(null);
  }

  private _heroGeometry(clip: Clip | null | undefined, st: HeroSample) {
    if (st.opacity <= 0.001 || !this.layout) return null;
    const dpr = this.layout.dpr;
    const { hero } = this.layout;
    const box = clip?.box() || [0.25, 0.05, 0.75, 0.98];
    const subH = Math.max(box[3] - box[1], 1e-3);
    const subCX = (box[0] + box[2]) * 0.5;

    const wantH = hero.h * dpr * st.scale;
    const quadH = wantH / subH;
    const quadW = quadH * ((clip?.w || 720) / (clip?.h || 1280));
    return {
      wantH,
      rect: [
        hero.cx * dpr - quadW * subCX,
        hero.feet * dpr + st.dy * wantH - quadH * box[3],
        quadW,
        quadH,
      ],
    };
  }

  private _heroShadow(geo: any, st: HeroSample, skew: number[]) {
    if (!geo || !this.gl || !this.layout) return;
    const gl = this.gl;
    const dpr = this.layout.dpr;
    const { hero } = this.layout;
    const p = this.progs.shadow;
    gl.useProgram(p.p);
    gl.uniform1f(p.u.uOpacity, 0.46 * st.shadow);
    gl.uniform2f(p.u.uFalloff, 0.30, 0.46);
    const sw = geo.wantH * 0.50;
    const sh = geo.wantH * 0.60;
    this._quad(p, [
      hero.cx * dpr - sw / 2 + skew[0] * 0.55,
      hero.feet * dpr - sh,
      sw,
      sh,
    ]);
  }

  private _heroFigure(
    clip: Clip | null | undefined,
    geo: any,
    st: HeroSample,
    skew: number[]
  ) {
    if (!geo || !this.gl || !this.layout) return;
    const gl = this.gl;
    if (clip && clip.poll()) upload(gl, this.tex.hero, clip.el);

    const p = this.progs.figure;
    gl.useProgram(p.p);
    gl.uniform1i(p.u.uClip, bind(gl, this.tex.hero, 0));
    gl.uniform1i(p.u.uGrunge, bind(gl, this.tex.grunge, 1));
    gl.uniform1i(p.u.uMask, bind(gl, this.tex.glyph, 2));
    gl.uniform1f(p.u.uUseMask, 0);
    gl.uniform4f(p.u.uMaskUV, 0, 0, 1, 1);
    const clipW = clip?.w || 720;
    const clipH = clip?.h || 1280;
    const seamFade = clip?.seamFade() ?? 1;
    gl.uniform2f(p.u.uTexel, 0.5 / (clipW * 2), 0.5 / clipH);
    gl.uniform1f(p.u.uOpacity, st.opacity * seamFade);
    gl.uniform1f(p.u.uReveal, st.reveal);
    gl.uniform1f(p.u.uFeetFade, 0.02);
    gl.uniform1f(p.u.uTopFade, 0.012);
    gl.uniform1f(p.u.uExposure, 1.24);
    gl.uniform1f(p.u.uLift, 1.35);
    gl.uniform1f(p.u.uRimRed, 0.32);
    gl.uniform1f(p.u.uContrast, 1.13);
    gl.uniform1f(p.u.uDesat, 0.2);
    gl.uniform1f(p.u.uFloorY, 0.98);
    const { word, h } = this.layout;
    gl.uniform2f(p.u.uBand, word.y / h, (word.y + word.h) / h);
    this._quad(p, geo.rect, [0, 0, 1, 1], skew);
  }
}
