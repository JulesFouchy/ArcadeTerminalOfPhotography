precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

uniform float u_saturation;
uniform float u_contrast;
uniform float u_luminosity;
uniform float u_whiteBalance;
uniform float u_tint;

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
  vec3 col = texture2D(tex0, uv).rgb;

  // Luminosity
  float lum = -u_luminosity + 1.;
  col = pow(col, vec3(lum));
  // Contrast
  float con = u_contrast * 0.1;
  col = contrast(col, con);
  // Saturation
  float gray = 0.299*col.r + 0.587*col.g + 0.114*col.b;
  float sat = u_saturation + 1.;
  col = sat * col + (1.-sat) * vec3(gray);
  //

  gl_FragColor = vec4(col, 1.0);
}