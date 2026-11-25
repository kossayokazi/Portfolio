import { AdditiveBlending, BackSide, BufferAttribute, Color, IcosahedronGeometry, ShaderMaterial, Vector3 } from "three";
import { fbm3, smoothstep } from "./noise";

export const PLANET_RADIUS = 1.6;

// A low-poly planet: noise-displaced icosahedron with indigo to violet vertex colours.
export function buildPlanetGeometry(): IcosahedronGeometry {
  const geo = new IcosahedronGeometry(PLANET_RADIUS, 7);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const v = new Vector3();
  const deep = new Color("#1e1b4b");
  const mid = new Color("#4f46e5");
  const high = new Color("#c4b5fd");
  const c = new Color();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const h = fbm3(v.x * 1.8 + 5, v.y * 1.8 + 5, v.z * 1.8 + 5);
    v.multiplyScalar(PLANET_RADIUS + (h - 0.5) * 0.18);
    pos.setXYZ(i, v.x, v.y, v.z);
    c.copy(deep).lerp(mid, smoothstep(0.3, 0.55, h)).lerp(high, smoothstep(0.62, 0.85, h));
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute("color", new BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

// A soft rim of light around the planet (fresnel glow on a slightly larger back-facing sphere).
export function buildAtmosphereMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    transparent: true,
    side: BackSide,
    blending: AdditiveBlending,
    depthWrite: false,
    uniforms: { glow: { value: new Color("#6366f1") } },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 glow;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(clamp(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.0);
        gl_FragColor = vec4(glow, 1.0) * intensity * 1.6;
      }`,
  });
}