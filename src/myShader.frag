precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float u_saturation;
uniform float u_contrast;
uniform float u_luminosity;

uniform float u_zoomX;
uniform float u_zoomY;
uniform float u_zoomW;
uniform float u_zoomH;
uniform float u_invRatio;

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

float bump(float x, float center, float margin) {
    return smoothstep(center-margin/2., center, x) * smoothstep(center + margin/2., center, x);
}

float sdRoundBox( vec2 p, vec2 b, float r )
{
  vec2 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,q.y),0.0) - r;
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

  // Zoom frame
  // float xDist = abs(uv.x - u_zoomX);
  // float yDist = abs(uv.y - u_zoomY);
  // float m = 0.01;
  // float squareSDF = sdRoundBox(uv - vec2(u_zoomX, u_zoomY), vec2((u_zoomW/2. + m), u_zoomH/2. + m), 0.0);
  // float isSquare = smoothstep(0.001, -0.001, squareSDF);
  // float lines = bump(xDist - m, u_zoomW/2., m) + bump(yDist - m, u_zoomH/2., m);
  // float isFrame = lines;//min(lines, isSquare);
  // col = mix(col, vec3(1., 0., 0.), isFrame);

  gl_FragColor = vec4(col, 1.0);
}