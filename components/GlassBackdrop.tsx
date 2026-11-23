"use client";
import { useEffect, useRef } from "react";

const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FS = `precision highp float;uniform vec2 r,m;uniform float t,d;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*n(p);p*=2.;a*=.5;}return v;}
void main(){
  vec2 q=(gl_FragCoord.xy-.5*r)/r.y, mm=(m-.5*r)/r.y;
  float w=fbm(q*1.6+t*.05+fbm(q*2.-t*.04)*1.5);
  float g=smoothstep(0.,.9,.9-length(q-mm)*1.2);
  vec3 base=mix(vec3(.95,.96,1.),vec3(.035,.04,.08),d);
  vec3 c1=mix(vec3(.66,.7,1.),vec3(.2,.22,.6),d);
  vec3 c2=mix(vec3(.99,.78,.92),vec3(.45,.15,.5),d);
  vec3 c3=mix(vec3(.65,.94,.97),vec3(.05,.35,.45),d);
  vec3 col=mix(base,c1,smoothstep(.3,.8,w)*.8);
  col=mix(col,c2,smoothstep(.45,.9,fbm(q*2.+4.-t*.06))*.55);
  col=mix(col,c3,g*.45);
  col+=(h(gl_FragCoord.xy+t)-.5)*.02;
  gl_FragColor=vec4(col,1.);
}`;

export default function GlassBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const gl = c.getContext("webgl", { antialias: false, powerPreference: "low-power" });
    if (!gl) return;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const pr = gl.createProgram()!;
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (k: string) => gl.getUniformLocation(pr, k);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = 0.5;
    let mx = 0.5, my = 0.5, sx = 0.5, sy = 0.5, raf = 0, dark = 1;
    let last = 0;
    const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; gl.viewport(0, 0, c.width, c.height); };
    const move = (e: PointerEvent) => { mx = e.clientX / innerWidth; my = 1 - e.clientY / innerHeight; };
    const draw = (ms: number) => {
      if (document.documentElement.dataset.world === "on") { raf = requestAnimationFrame(draw); return; }
      if (!still && ms - last < 33) { raf = requestAnimationFrame(draw); return; }
      last = ms;
      sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
      const target = document.documentElement.classList.contains("dark") ? 1 : 0;
      dark += (target - dark) * 0.08;
      gl.uniform2f(U("r"), c.width, c.height);
      gl.uniform2f(U("m"), sx * c.width, sy * c.height);
      gl.uniform1f(U("t"), ms / 1000);
      gl.uniform1f(U("d"), dark);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still) raf = requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize", resize); addEventListener("pointermove", move);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} aria-hidden className="fixed inset-0 -z-10 h-full w-full" />;
}