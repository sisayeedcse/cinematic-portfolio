// WebGL2 helpers: programs, uniforms, textures, unit quad — typed for TypeScript

export interface ProgramInfo {
  p: WebGLProgram;
  u: Record<string, WebGLUniformLocation | null>;
}

export function createGL(
  canvas: HTMLCanvasElement,
  opts: WebGLContextAttributes = {}
): WebGL2RenderingContext | null {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
    ...opts,
  });
  if (!gl) return null;
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  // every shader outputs premultiplied colour
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  return gl;
}

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
  label: string
): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(`${label}: ${gl.getShaderInfoLog(s)}`);
  }
  return s;
}

export function program(
  gl: WebGL2RenderingContext,
  vert: string,
  frag: string,
  label = "program"
): ProgramInfo {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vert, `${label} vert`));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag, `${label} frag`));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(`${label} link: ${gl.getProgramInfoLog(p)}`);
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) {
    const info = gl.getActiveUniform(p, i)!;
    uniforms[info.name] = gl.getUniformLocation(p, info.name);
    if (info.size > 1 && info.name.endsWith("[0]")) {
      const base = info.name.slice(0, -3);
      uniforms[base] = uniforms[info.name];
      for (let k = 1; k < info.size; k++) {
        uniforms[`${base}[${k}]`] = gl.getUniformLocation(p, `${base}[${k}]`);
      }
    }
  }
  return { p, u: uniforms };
}

export function unitQuad(gl: WebGL2RenderingContext): WebGLVertexArrayObject {
  const vao = gl.createVertexArray()!;
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return vao;
}

export function texture(
  gl: WebGL2RenderingContext,
  { wrap = "clamp", filter = "linear" }: { wrap?: string; filter?: string } = {}
): WebGLTexture {
  const t = gl.createTexture()!;
  const W = wrap === "repeat" ? gl.REPEAT : gl.CLAMP_TO_EDGE;
  const F = filter === "nearest" ? gl.NEAREST : gl.LINEAR;
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, W);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, W);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, F);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, F);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0])
  );
  return t;
}

export function upload(
  gl: WebGL2RenderingContext,
  tex: WebGLTexture,
  source: TexImageSource,
  flipY = false
): boolean {
  const anySource = source as any;
  const w = anySource.videoWidth ?? anySource.naturalWidth ?? anySource.width;
  const h = anySource.videoHeight ?? anySource.naturalHeight ?? anySource.height;
  if (!w || !h) return false;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  return true;
}

export function bind(
  gl: WebGL2RenderingContext,
  tex: WebGLTexture,
  unit: number
): number {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  return unit;
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = () => rej(new Error(`image failed: ${src}`));
    i.src = src;
  });
}
