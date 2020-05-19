precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float u_offsetX;
uniform float u_offsetY;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  uv.x -= u_offsetX;
  uv.y -= u_offsetY;
  float r = texture2D(tex0, mod(uv, 1.)).r;
  uv.x += u_offsetX;
  uv.y += u_offsetY;
  float g = texture2D(tex0, mod(uv, 1.)).g;
  uv.x += u_offsetX;
  uv.y += u_offsetY;
  float b = texture2D(tex0, mod(uv, 1.)).b;

  gl_FragColor = vec4(vec3(r, g, b), 1.0);
}