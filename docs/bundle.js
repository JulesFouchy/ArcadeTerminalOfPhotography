!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){e.exports=t(2)},function(e,n,t){},function(e,n,t){"use strict";function r(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var i=t.pop();if(i&&i.pop)for(o=i.length;o--;)t.push(i[o]);else null!=i&&!0!==i&&!1!==i&&r.push(i)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}}t.r(n);var o=function(e,n,t){console.group("%c action","color: gray; font-weight: lighter;",n.name),console.log("%c prev state","color: #9E9E9E; font-weight: bold;",e),console.log("%c data","color: #03A9F4; font-weight: bold;",n.data),console.log("%c next state","color: #4CAF50; font-weight: bold;",t),console.groupEnd()},i=function(e){return"function"==typeof e};function a(e,n){return function(t,r,o,i){var a=function n(t,r){var o=r?r+".":"";return Object.keys(t||{}).reduce((function(r,i){var a=o+i,u=t[i];return r[i]="function"==typeof u?function(n){return function(t,r){var o=u(n);return o="function"==typeof o?o(t,r):o,e(t,{name:a,data:n},o),o}}:n(u,a),r}),{})}(r);return n(t,a,o,i)}}var u=function(e){return r("div",{class:"neonBox"},e.children)};function c(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return l(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return l(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var s="attribute vec3 aPosition;\r\nattribute vec2 aTexCoord;\r\n\r\nvarying vec2 vTexCoord;\r\n\r\nvoid main() {\r\n  vTexCoord = aTexCoord;\r\n\r\n  vec4 positionVec4 = vec4(aPosition, 1.0);\r\n  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;\r\n\r\n  gl_Position = positionVec4;\r\n}",f="precision mediump float;\r\n\r\n// lets grab texcoords just for fun\r\nvarying vec2 vTexCoord;\r\n\r\n// our texture coming from p5\r\nuniform sampler2D tex0;\r\n\r\nuniform float u_saturation;\r\nuniform float u_contrast;\r\nuniform float u_luminosity;\r\nuniform float u_whiteBalance;\r\nuniform float u_tint;\r\n\r\nfloat contrast(float x, float param) {\r\n\treturn x + sin( x*6.28 - 3.14 )*param;\r\n}\r\n\r\nvec3 contrast(vec3 v, float param) {\r\n\treturn vec3(\r\n\t\tcontrast(v.x, param),\r\n\t\tcontrast(v.y, param),\r\n\t\tcontrast(v.z, param)\r\n\t);\r\n}\r\n\r\nvec3 tint2Color(vec3 col, vec3 tint1, vec3 tint2, float t) {\r\n    vec3 tintColor = t < 0. ?\r\n                    // tint1\r\n                    clamp(mix(vec3(1.), tint1, pow(-t, 1.1)), 0., 1.) :\r\n                    // tint2\r\n                    clamp(mix(vec3(1.), tint2, pow( t, 1.1)), 0., 1.);\r\n    return col / tintColor;\r\n}\r\n\r\nvec3 changeTemperature(vec3 col, float temperature);\r\n\r\nvoid main() {\r\n    vec2 uv = vTexCoord;\r\n    uv.y = 1.0 - uv.y;\r\n    vec3 col = texture2D(tex0, uv).rgb;\r\n\r\n    // Luminosity\r\n    float lum = -u_luminosity + 1.;\r\n    col = pow(col, vec3(lum));\r\n    // Contrast\r\n    float con = u_contrast * 0.1;\r\n    col = contrast(col, con);\r\n    // Saturation\r\n    float gray = 0.299*col.r + 0.587*col.g + 0.114*col.b;\r\n    float sat = u_saturation + 1.;\r\n    col = sat * col + (1.-sat) * vec3(gray);\r\n    // White balance\r\n    //col = changeTemperature(col, -u_whiteBalance);\r\n    //vec3 wbColor = pow(vec3(247./255., 191./255., 22./255.), vec3(u_whiteBalance));\r\n    //vec3 wbColor = pow(vec3(48./255., 141./255., 255./255.), vec3(u_whiteBalance));\r\n    float wb = u_whiteBalance * 0.3;\r\n    col = tint2Color(col, vec3(247./255., 191./255., 22./255.), vec3(48./255., 141./255., 255./255.), wb);\r\n    // Tint\r\n    float tint = u_tint * 0.3;\r\n    col = tint2Color(col, vec3(217./255., 29./255., 242./255.), vec3(29./255., 242./255., 54./255.), tint);\r\n    //\r\n    gl_FragColor = vec4(col, 1.0);\r\n}\r\n\r\n// Credit : https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl\r\nvec3 rgb2hsv(vec3 c) {\r\n    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\r\n    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\r\n    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\r\n\r\n    float d = q.x - min(q.w, q.y);\r\n    float e = 1.0e-10;\r\n    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\r\n}\r\nvec3 hsv2rgb(vec3 c) {\r\n    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\r\n    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\r\n    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\r\n}\r\n\r\n//Algorithm found here : http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/\r\nvec3 temperatureColor(float temperature){\r\n    vec3 col;\r\n    //Red\r\n    if (temperature < 66.)\r\n          col.r = 255.;\r\n    else\r\n        col.r = 329.698727446 * pow(temperature - 60., -0.1332047592);\r\n    //Green\r\n    if (temperature < 66.)\r\n        col.g = 99.4708025861 * log(temperature) - 161.1195681661;\r\n    else\r\n        col.g = 288.1221695283 * pow(temperature - 60., -0.0755148492);\r\n    //Blue\r\n    if (temperature > 66.) {\r\n        col.b = 255.;\r\n    }\r\n    else {\r\n      if (temperature < 19.)\r\n        col.b = 0.;\r\n      else\r\n          col.b = 138.5177312231 * log(temperature - 10.) - 305.0447927307;\r\n    }\r\n    //\r\n    col = clamp(col, 0., 255.);\r\n    col /= 255.;\r\n    return col ;\r\n}\r\n\r\nvec3 changeTemperature(vec3 col, float temperature) {\r\n    float mixFactor = 0.15 * smoothstep(0., 1.5, abs(temperature));\r\n    float value = rgb2hsv(col).z;\r\n    vec3 tempCol = temperatureColor(temperature * 20. + 80.);\r\n    vec3 newCol = sqrt(mix(col*col, tempCol*tempCol, mixFactor));\r\n    vec3 newColHSV = rgb2hsv(newCol);\r\n    newColHSV.z = value;\r\n    return hsv2rgb(newColHSV);\r\n}",g="precision mediump float;\r\n\r\n// lets grab texcoords just for fun\r\nvarying vec2 vTexCoord;\r\n\r\n// our texture coming from p5\r\nuniform sampler2D tex0;\r\nuniform float u_offsetX;\r\nuniform float u_offsetY;\r\n\r\nvoid main() {\r\n  vec2 uv = vTexCoord;\r\n  uv.y = 1.0 - uv.y;\r\n  uv.x -= u_offsetX;\r\n  uv.y -= u_offsetY;\r\n  float r = texture2D(tex0, mod(uv, 1.)).r;\r\n  uv.x += u_offsetX;\r\n  uv.y += u_offsetY;\r\n  float g = texture2D(tex0, mod(uv, 1.)).g;\r\n  uv.x += u_offsetX;\r\n  uv.y += u_offsetY;\r\n  float b = texture2D(tex0, mod(uv, 1.)).b;\r\n\r\n  gl_FragColor = vec4(vec3(r, g, b), 1.0);\r\n}",m=function(e){return r("div",{oncreate:function(){var n=new p5((function(n){var t,r;n.bDragging=!1;var o=new p5.Shader(n._renderer,s,"precision mediump float;\r\n\r\nvarying vec2 vTexCoord;\r\nuniform sampler2D tex0;\r\n\r\nconst float NB_PIXELS = 15.;\r\n\r\nvoid main() {\r\n  vec2 uv = vTexCoord;\r\n  uv.y = 1.0 - uv.y;\r\n  uv = floor(uv * NB_PIXELS) / NB_PIXELS;\r\n  vec3 texCol = texture2D(tex0, uv).rgb;\r\n  vec3 col = texCol;\r\n\r\n  gl_FragColor = vec4(col, 1.0);\r\n}");n.setImg=function(n,r,o){var i=e.zoomOnImgHeightProportion*n.height;t=n.getPG().get(r*n.width-i/2,o*n.height-i/2,i,i)},n.setup=function(){n.createCanvas(200,200,n.WEBGL),r=n.createGraphics(200,200,n.WEBGL),n.noLoop()},n.trySetPixel=function(){var t=n.mouseX/n.width,r=n.mouseY/n.height;return t>0&&t<1&&r>0&&r<1&&(e.setPixel({x:Math.floor(15*t),y:Math.floor(15*r)}),!0)},n.mousePressed=function(){n.trySetPixel()&&(n.bDragging=!0)},n.mouseReleased=function(){n.bDragging=!1},n.mouseDragged=function(){if(n.bDragging){var t={x:n.mouseX/n.width,y:n.mouseY/n.height};e.setPixel({x:Math.min(Math.max(Math.floor(15*t.x),0),14),y:Math.min(Math.max(Math.floor(15*t.y),0),14)})}},n.onEditedImageChanged=function(e,i,a,u,c){n.bDrawingStarted=!0,n.setImg(e,i,a),r.shader(o),o.setUniform("tex0",t),r.rect(0,0,0,0),n.image(r,-n.width/2,-n.height/2,n.width,n.height),n.fill(255,0,0),n.noStroke();n.width,n.height;var l=n.height/15,s=((u+.5)/15-.5)*n.width,f=((c+.5)/15-.5)*n.height;n.rect(s-l/2,f-l/2,l,2),n.rect(s-l/2,f-l/2,2,l),n.rect(s+l/2-2,f-l/2,2,l),n.rect(s-l/2,f+l/2-2,l,2)}}));e.withP5Instance(n)},onupdate:function(){!function e(n,t,r,o,i,a){n._setupDone&&t._setupDone?t.onEditedImageChanged(n,r,o,i,a):setTimeout((function(){return e(n,t,r,o,i,a)}),1e3)}(e.p5editingImg,e.p5zoomOnImg,e.zoomPosX,e.zoomPosY,e.pixX,e.pixY)}})},d=function(e){return r("div",{oncreate:function(){var n=new p5((function(e){var n;e.setCol=function(e,t,r){console.log("pixX, pixY"),console.log(t,r),n=e.get(e.width*(t+.5)/15,e.height*(1-(r+.5)/15))},e.setup=function(){e.createCanvas(100,100),e.noLoop()},e.onEditedImageChanged=function(t,r,o){e.setCol(t,r,o);var i=e.width/3;e.fill(e.red(n),0,0),e.rect(0,0,i,e.height),e.fill(0,e.green(n),0),e.rect(i,0,i,e.height),e.fill(0,0,e.blue(n)),e.rect(2*i,0,i,e.height)}}));e.withP5Instance(n)},onupdate:function(){!function e(n,t,r,o){n.bDrawingStarted?t.onEditedImageChanged(n,r,o):setTimeout((function(){return e(n,t,r,o)}),1e3)}(e.p5zoomOnImg,e.p5zoomOnPixel,e.pixX,e.pixY)}})},v=t.p+"2b014017d79af5e7fa732347d268d0d7.jpg",h=function(e,n,t){return o={name:e,value:n.editParameters[e],onDragStart:function(){return t.startDragging(e)}},u({children:[r("div",{class:"sliderBox"},[r("p",{},o.name),r("p",{class:"draggableValue",onselectstart:function(e){e.preventDefault(),o.onDragStart()}},o.value.toFixed(2))])]});var o},p=function(e,n){return r("div",{id:"editSettings"},[h("luminosity",e,n),h("contrast",e,n),h("saturation",e,n),h("whiteBalance",e,n),h("tint",e,n),h("rgbShift",e,n)])},x=function(e,n){return function(e){return r("div",{},[u({children:[r("h3",{class:"pageTitle"},e.title)]})].concat(c(e.children)))}({title:"Editing Challenge",children:[(t={height:e.imgHeight,src:v,p5editingImg:e.p5editingImg,editParameters:e.editParameters,zoom:{x:e.zoomOnImgX,y:e.zoomOnImgY,sizeProp:e.zoomOnImgHeightProportion},withP5Instance:function(e){n.setEditingImgP5(e),n.setDownloadFunction(e.download)},setZoomOnImgPosition:function(e){return n.setZoomOnImgPosition(e)}},r("div",{oncreate:function(){var e=new p5((function(e){var n,r,o;e.bDragging=!1;var i=new p5.Shader(e._renderer,s,f),a=new p5.Shader(e._renderer,s,f),u=new p5.Shader(e._renderer,s,g),c=new p5.Shader(e._renderer,s,g);e.getPG=function(){return r},e.preload=function(){n=e.loadImage(t.src)},e.setup=function(){var i=n.width/n.height;e.createCanvas(t.height*i,t.height,e.WEBGL),r=e.createGraphics(t.height*i,t.height,e.WEBGL),o=e.createGraphics(n.width,n.height,e.WEBGL),e.onParametersChanged(t.editParameters,t.zoom),e.noLoop()},e.mousePressed=function(){var n={x:e.mouseX/e.width,y:e.mouseY/e.height};n.x>0&&n.x<1&&n.y>0&&n.y<1&&t.setZoomOnImgPosition(n)},e.mouseDragged=function(){var n={x:e.mouseX/e.width,y:e.mouseY/e.height};n.x>0&&n.x<1&&n.y>0&&n.y<1&&t.setZoomOnImgPosition(n)},e.trySetZoomPos=function(){var n={x:e.mouseX/e.width,y:e.mouseY/e.height};return n.x>0&&n.x<1&&n.y>0&&n.y<1&&(t.setZoomOnImgPosition(n),!0)},e.mousePressed=function(){var n={x:e.mouseX/e.width,y:e.mouseY/e.height};n.x>0&&n.x<1&&n.y>0&&n.y<1&&(e.bDragging=!0,t.setZoomOnImgPosition(n))},e.mouseReleased=function(){e.bDragging=!1},e.mouseDragged=function(){if(e.bDragging){var n={x:e.mouseX/e.width,y:e.mouseY/e.height};t.setZoomOnImgPosition(n)}},e.renderOnPg=function(e,t,r,o){e.shader(t),t.setUniform("tex0",n),t.setUniform("u_luminosity",o.luminosity),t.setUniform("u_contrast",o.contrast),t.setUniform("u_saturation",o.saturation),t.setUniform("u_whiteBalance",o.whiteBalance),t.setUniform("u_tint",o.tint),e.rect(0,0,0,0),e.shader(r),r.setUniform("tex0",e),r.setUniform("u_offsetX",Math.cos(0)*o.rgbShift),r.setUniform("u_offsetY",Math.sin(0)*o.rgbShift),e.rect(0,0,0,0)},e.onParametersChanged=function(n,t){e.lastEditParameters=n,e.renderOnPg(r,i,u,n),e.image(r,-e.width/2,-e.height/2,e.width,e.height),e.fill(255,0,0),e.noStroke(),e.width,e.height;var o=e.height*t.sizeProp,a=(t.x-.5)*e.width,c=(t.y-.5)*e.height;e.rect(a-o/2,c-o/2,o,2),e.rect(a-o/2,c-o/2,2,o),e.rect(a+o/2-2,c-o/2,2,o),e.rect(a-o/2,c+o/2-2,o,2)},e.download=function(){e.renderOnPg(o,a,c,e.lastEditParameters),o.save("myImage.jpg")}}));t.withP5Instance(e)},onupdate:function(){t.p5editingImg.onParametersChanged(t.editParameters,t.zoom)}})),m({p5zoomOnImg:e.p5zoomOnImg,p5editingImg:e.p5editingImg,zoomPosX:e.zoomOnImgX,zoomPosY:e.zoomOnImgY,zoomOnImgHeightProportion:e.zoomOnImgHeightProportion,pixX:e.zoomOnPixX,pixY:e.zoomOnPixY,withP5Instance:function(e){return n.setZoomOnImgP5(e)},setPixel:function(e){return n.setPixel(e)}}),d({p5zoomOnPixel:e.p5zoomOnPixel,p5zoomOnImg:e.p5zoomOnImg,pixX:e.zoomOnPixX,pixY:e.zoomOnPixY,withP5Instance:function(e){return n.setZoomOnPixelP5(e)}}),p(e,n),r("button",{onclick:e.downloadFunction},"Download")]});var t};function y(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function b(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?y(Object(t),!0).forEach((function(n){w(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var P={startDragging:function(e){return function(n){return document.getElementsByTagName("BODY")[0].classList.add("dragging"),b({},n,{bDraggingValue:!0,dragTarget:e})}},stopDraggingValue:function(){return function(e){return document.getElementsByTagName("BODY")[0].classList.remove("dragging"),b({},e,{bDraggingValue:!1})}},checkDragging:function(e){return function(n){if(n.bDraggingValue){var t=n.editParameters;return t[n.dragTarget]+=.003*e,b({},n,{editParameters:t})}return n}},setEditingImgP5:function(e){return function(n){return b({},n,{p5editingImg:e})}},setZoomOnImgP5:function(e){return function(n){return b({},n,{p5zoomOnImg:e})}},setZoomOnPixelP5:function(e){return function(n){return b({},n,{p5zoomOnPixel:e})}},setZoomOnImgPosition:function(e){return function(n){var t=n.p5editingImg.width/n.p5editingImg.height,r=n.zoomOnImgHeightProportion/2;return b({},n,{zoomOnImgX:Math.max(Math.min(e.x,1-r/t),r/t),zoomOnImgY:Math.max(Math.min(e.y,1-r),r)})}},setPixel:function(e){return function(n){return b({},n,{zoomOnPixX:e.x,zoomOnPixY:e.y})}},setDownloadFunction:function(e){return function(n){return b({},n,{downloadFunction:e})}}};t(1);!function(e){if(i(e))return a(o,e);var n=i(e.log)?e.log:o;return function(e){return a(n,e)}}({log:function(e,n,t){"checkDragging"!=n.name&&(console.group("%c action","color: gray; font-weight: lighter;",n.name),console.log("%c data","color: #03A9F4; font-weight: bold;",n.data),console.log("%c next state","color: #4CAF50; font-weight: bold;",t),console.groupEnd())}})((function(e,n,t,r){var o,i=[].map,a=r&&r.children[0]||null,u=a&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:i.call(n.childNodes,(function(n){return 3===n.nodeType?n.nodeValue:e(n)}))}}(a),c=[],l=!0,s=v(e),f=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var i=o(e);return"function"==typeof i&&(i=i(p(n,s),r)),i&&i!==(t=p(n,s))&&!i.then&&d(s=h(n,v(t,i),s)),i}}(o,r[o]):e(n.concat(o),t[o]=v(t[o]),r[o]=v(r[o]));return r}([],s,v(n));return d(),f;function g(e){return"function"==typeof e?g(e(s,f)):null!=e?e:""}function m(){o=!o;var e=g(t);for(r&&!o&&(a=function e(n,t,r,o,i){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var a=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName),o=n.attributes;if(o){o.oncreate&&c.push((function(){o.oncreate(r)}));for(var i=0;i<n.children.length;i++)r.appendChild(e(n.children[i]=g(n.children[i]),t));for(var a in o)b(r,a,o[a],null,t)}return r}(o,i);n.insertBefore(a,t),null!=r&&w(n,t,r),t=a}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in v(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var i=l?t.oncreate:t.onupdate;i&&c.push((function(){i(e,n)}))}(t,r.attributes,o.attributes,i=i||"svg"===o.nodeName);for(var u={},s={},f=[],m=r.children,d=o.children,h=0;h<m.length;h++){f[h]=t.childNodes[h],null!=(y=x(m[h]))&&(u[y]=[f[h],m[h]])}h=0;for(var p=0;p<d.length;){var y=x(m[h]),P=x(d[p]=g(d[p]));if(s[y])h++;else if(null==P||P!==x(m[h+1]))if(null==P||l)null==y&&(e(t,f[h],m[h],d[p],i),p++),h++;else{var O=u[P]||[];y===P?(e(t,O[0],O[1],d[p],i),h++):O[0]?e(t,t.insertBefore(O[0],f[h]),O[1],d[p],i):e(t,f[h],null,d[p],i),s[P]=d[p],p++}else null==y&&w(t,f[h],m[h]),h++}for(;h<m.length;)null==x(m[h])&&w(t,f[h],m[h]),h++;for(var h in u)s[h]||w(t,u[h][0],u[h][1])}return t}(r,a,u,u=e)),l=!1;c.length;)c.pop()()}function d(){o||(o=!0,setTimeout(m))}function v(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function h(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?h(e.slice(1),n,t[e[0]]):n,v(t,r)):n}function p(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function x(e){return e?e.key:null}function y(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)if("string"==typeof t)e.style.cssText=t;else for(var i in"string"==typeof r&&(r=e.style.cssText=""),v(r,t)){var a=null==t||null==t[i]?"":t[i];"-"===i[0]?e.style.setProperty(i,a):e.style[i]=a}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,y):e.removeEventListener(n,y)):n in e&&"list"!==n&&"type"!==n&&"draggable"!==n&&"spellcheck"!==n&&"translate"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function w(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}))({imgHeight:400,editParameters:{luminosity:0,contrast:0,saturation:0,whiteBalance:0,tint:0,rgbShift:0},bDraggingValue:!1,p5editingImg:null,p5zoomOnImg:null,p5zoomOnPixel:null,zoomOnImgX:.5,zoomOnImgY:.5,zoomOnImgHeightProportion:.05,zoomOnPixX:7,zoomOnPixY:7},P,(function(e,n){return r("div",{id:"mainView",oncreate:function(){window.onmouseup=function(){return n.stopDraggingValue()},window.onmousemove=function(e){return n.checkDragging(e.movementX)}}},[x(e,n)])}),document.body)}]);
//# sourceMappingURL=bundle.js.map