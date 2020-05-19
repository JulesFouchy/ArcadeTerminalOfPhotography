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

vec3 tint2Color(vec3 col, vec3 tint1, vec3 tint2, float t) {
    vec3 tintColor = t < 0. ?
                    // tint1
                    clamp(mix(vec3(1.), tint1, pow(-t, 1.1)), 0., 1.) :
                    // tint2
                    clamp(mix(vec3(1.), tint2, pow( t, 1.1)), 0., 1.);
    return col / tintColor;
}

vec3 changeTemperature(vec3 col, float temperature);

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
    // White balance
    //col = changeTemperature(col, -u_whiteBalance);
    //vec3 wbColor = pow(vec3(247./255., 191./255., 22./255.), vec3(u_whiteBalance));
    //vec3 wbColor = pow(vec3(48./255., 141./255., 255./255.), vec3(u_whiteBalance));
    float wb = u_whiteBalance * 0.3;
    col = tint2Color(col, vec3(247./255., 191./255., 22./255.), vec3(48./255., 141./255., 255./255.), wb);
    // Tint
    float tint = u_tint * 0.3;
    col = tint2Color(col, vec3(217./255., 29./255., 242./255.), vec3(29./255., 242./255., 54./255.), tint);
    //
    gl_FragColor = vec4(col, 1.0);
}

// Credit : https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

//Algorithm found here : http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
vec3 temperatureColor(float temperature){
    vec3 col;
    //Red
    if (temperature < 66.)
          col.r = 255.;
    else
        col.r = 329.698727446 * pow(temperature - 60., -0.1332047592);
    //Green
    if (temperature < 66.)
        col.g = 99.4708025861 * log(temperature) - 161.1195681661;
    else
        col.g = 288.1221695283 * pow(temperature - 60., -0.0755148492);
    //Blue
    if (temperature > 66.) {
        col.b = 255.;
    }
    else {
      if (temperature < 19.)
        col.b = 0.;
      else
          col.b = 138.5177312231 * log(temperature - 10.) - 305.0447927307;
    }
    //
    col = clamp(col, 0., 255.);
    col /= 255.;
    return col ;
}

vec3 changeTemperature(vec3 col, float temperature) {
    float mixFactor = 0.15 * smoothstep(0., 1.5, abs(temperature));
    float value = rgb2hsv(col).z;
    vec3 tempCol = temperatureColor(temperature * 20. + 80.);
    vec3 newCol = sqrt(mix(col*col, tempCol*tempCol, mixFactor));
    vec3 newColHSV = rgb2hsv(newCol);
    newColHSV.z = value;
    return hsv2rgb(newColHSV);
}