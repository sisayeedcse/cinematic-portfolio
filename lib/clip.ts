// Video playback for the packed-alpha clips — typed for TypeScript & Next.js

export interface ClipSource {
  url: string;
  type: string;
}

export interface ClipOptions {
  src: ClipSource[];
  poster?: string;
  w: number;
  h: number;
  track?: [number, number, number, number][] | null;
  loopFade?: number;
}

export class Clip {
  w: number;
  h: number;
  track: [number, number, number, number][] | null;
  loopFade: number;
  ready: boolean;
  needsUpload: boolean;
  private _lastTime: number;
  el: HTMLVideoElement;
  duration: number;

  constructor({ src, poster, w, h, track, loopFade = 0.55 }: ClipOptions) {
    this.w = w;
    this.h = h;
    this.track = track || null;
    this.loopFade = loopFade;
    this.ready = false;
    this.needsUpload = false;
    this._lastTime = -1;

    const v = document.createElement("video");
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.preload = "auto";
    v.disablePictureInPicture = true;
    if (poster) v.poster = poster;

    for (const s of src) {
      const el = document.createElement("source");
      el.src = s.url;
      el.type = s.type;
      v.appendChild(el);
    }
    this.el = v;
    this.duration = 0;

    v.addEventListener("loadedmetadata", () => {
      this.duration = v.duration;
    });
    v.addEventListener("loadeddata", () => {
      this.ready = true;
    });
    v.addEventListener("canplay", () => {
      this.ready = true;
    });
    v.load();
  }

  /** Resolves when there is enough data to start without stalling, with a safety timeout. */
  whenReady(timeoutMs = 1200): Promise<this> {
    if (this.el.readyState >= 2) {
      this.ready = true;
      return Promise.resolve(this);
    }
    return new Promise((res) => {
      let timer: any;
      const done = () => {
        if (timer) clearTimeout(timer);
        cleanup();
        this.ready = this.el.readyState >= 2;
        res(this);
      };
      const cleanup = () => {
        this.el.removeEventListener("canplaythrough", done);
        this.el.removeEventListener("canplay", done);
        this.el.removeEventListener("loadeddata", done);
        this.el.removeEventListener("error", done);
      };
      this.el.addEventListener("canplaythrough", done, { once: true });
      this.el.addEventListener("canplay", done, { once: true });
      this.el.addEventListener("loadeddata", done, { once: true });
      this.el.addEventListener("error", done, { once: true });
      timer = setTimeout(done, timeoutMs);
    });
  }

  async play(): Promise<boolean> {
    try {
      await this.el.play();
      return true;
    } catch {
      return false;
    }
  }

  pause(): void {
    this.el.pause();
  }

  /** True when the decoder has produced a new frame since the last upload. */
  poll(): boolean {
    const t = this.el.currentTime;
    if (t !== this._lastTime && this.el.readyState >= 2) {
      this._lastTime = t;
      return true;
    }
    return false;
  }

  /** Subject box for the current frame, from the baked track. */
  box(): [number, number, number, number] {
    if (!this.track || !this.track.length) return [0.25, 0.05, 0.75, 0.98];
    const d = this.duration || 1;
    const i = Math.min(
      this.track.length - 1,
      Math.max(0, Math.floor((this.el.currentTime / d) * this.track.length))
    );
    return this.track[i];
  }

  /** 0..1 opacity that dips through the loop wrap so the cut is never seen. */
  seamFade(): number {
    const d = this.duration;
    if (!d || !this.loopFade) return 1;
    const t = this.el.currentTime;
    const f = this.loopFade;
    if (t > d - f) return Math.max(0, (d - t) / f);
    if (t < f) return Math.min(1, t / f);
    return 1;
  }
}
