precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float u_saturation;
uniform float u_contrast;
uniform float u_luminosity;

float contrast(float x, float param) {
	return x + sin( x*6.28 - 3.14 )*param;
}

vec3 contrast(vec3 v, float param) {
	return vec3(
		contrast(v.x, param),
		contrast(v.y, param),
		contrast(v.z, param)
	);
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec3 texCol = texture2D(tex0, uv).rgb;
  vec3 col;

  float gray = 0.299*texCol.r + 0.587*texCol.g + 0.114*texCol.b;
  col = u_saturation*texCol + (1.-u_saturation) * vec3(gray);
  col = pow(col, vec3(u_luminosity));
  col = contrast(col, u_contrast);

  gl_FragColor = vec4(col, 1.0);
}