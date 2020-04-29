precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec3 texCol = texture2D(tex0, uv).rgb;
  vec3 col = texCol;

  gl_FragColor = vec4(col, 1.0);
}