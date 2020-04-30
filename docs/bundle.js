!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){n.exports=t(2)},function(n,e,t){},function(n,e,t){"use strict";function r(n,e){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var i=t.pop();if(i&&i.pop)for(o=i.length;o--;)t.push(i[o]);else null!=i&&!0!==i&&!1!==i&&r.push(i)}return"function"==typeof n?n(e||{},r):{nodeName:n,attributes:e||{},children:r,key:e&&e.key}}t.r(e);var o=function(n,e,t){console.group("%c action","color: gray; font-weight: lighter;",e.name),console.log("%c prev state","color: #9E9E9E; font-weight: bold;",n),console.log("%c data","color: #03A9F4; font-weight: bold;",e.data),console.log("%c next state","color: #4CAF50; font-weight: bold;",t),console.groupEnd()},i=function(n){return"function"==typeof n};function a(n,e){return function(t,r,o,i){var a=function e(t,r){var o=r?r+".":"";return Object.keys(t||{}).reduce((function(r,i){var a=o+i,u=t[i];return r[i]="function"==typeof u?function(e){return function(t,r){var o=u(e);return o="function"==typeof o?o(t,r):o,n(t,{name:a,data:e},o),o}}:e(u,a),r}),{})}(r);return e(t,a,o,i)}}var u=function(n){return r("div",{class:"neonBox"},n.children)};function c(n){return function(n){if(Array.isArray(n))return l(n)}(n)||function(n){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(n))return Array.from(n)}(n)||function(n,e){if(!n)return;if("string"==typeof n)return l(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return l(n,e)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}var f="attribute vec3 aPosition;\r\nattribute vec2 aTexCoord;\r\n\r\nvarying vec2 vTexCoord;\r\n\r\nvoid main() {\r\n  vTexCoord = aTexCoord;\r\n\r\n  vec4 positionVec4 = vec4(aPosition, 1.0);\r\n  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;\r\n\r\n  gl_Position = positionVec4;\r\n}",s=function(n){return r("div",{oncreate:function(){var e=new p5((function(n){var e,t=new p5.Shader(n._renderer,f,"precision mediump float;\r\n\r\nvarying vec2 vTexCoord;\r\nuniform sampler2D tex0;\r\n\r\nconst float NB_PIXELS = 16.;\r\n\r\nvoid main() {\r\n  vec2 uv = vTexCoord;\r\n  uv.y = 1.0 - uv.y;\r\n  uv = floor(uv * NB_PIXELS) / NB_PIXELS;\r\n  vec3 texCol = texture2D(tex0, uv).rgb;\r\n  vec3 col = texCol;\r\n\r\n  gl_FragColor = vec4(col, 1.0);\r\n}");n.setImg=function(n){var t=.05*n.height;e=n.get(n.width/2,n.height/2,t,t)},n.setup=function(){n.createCanvas(200,200,n.WEBGL),n.noLoop()},n.onEditedImageChanged=function(r){n.bDrawingStarted=!0,n.setImg(r),n.shader(t),t.setUniform("tex0",e),n.rect(0,0,0,0)}}));n.withP5Instance(e)},onupdate:function(){!function n(e,t){e._setupDone&&t._setupDone?t.onEditedImageChanged(e):setTimeout((function(){return n(e,t)}),1e3)}(n.p5editingImg,n.p5zoomOnImg)}})},g=function(n){return r("div",{oncreate:function(){var e=new p5((function(n){var e;n.setCol=function(n){e=n.get(n.width/2,n.height/2)},n.setup=function(){n.createCanvas(100,100),n.noLoop()},n.onEditedImageChanged=function(t){n.setCol(t);var r=n.width/3;n.fill(n.red(e),0,0),n.rect(0,0,r,n.height),n.fill(0,n.green(e),0),n.rect(r,0,r,n.height),n.fill(0,0,n.blue(e)),n.rect(2*r,0,r,n.height)}}));n.withP5Instance(e)},onupdate:function(){!function n(e,t){e.bDrawingStarted?t.onEditedImageChanged(e):setTimeout((function(){return n(e,t)}),1e3)}(n.p5zoomOnImg,n.p5zoomOnPixel)}})},d=t.p+"2b014017d79af5e7fa732347d268d0d7.jpg",m=function(n,e,t){return o={name:n,value:e.editParameters[n],onDragStart:function(){return t.startDragging(n)}},u({children:[r("div",{class:"sliderBox"},[r("p",{},o.name),r("p",{class:"draggableValue",onselectstart:function(n){n.preventDefault(),o.onDragStart()}},o.value.toFixed(2))])]});var o},p=function(n,e){return r("div",{id:"editSettings"},[m("contrast",n,e),m("luminosity",n,e),m("saturation",n,e),m("whiteBalance",n,e)])},v=function(n,e){return function(n){return r("div",{},[u({children:[r("h3",{class:"pageTitle"},n.title)]})].concat(c(n.children)))}({title:"Editing Challenge",children:[(t={height:400,src:d,p5editingImg:n.p5editingImg,editParameters:n.editParameters,withP5Instance:function(n){return e.setEditingImgP5(n)}},r("div",{oncreate:function(){var n=new p5((function(n){var e,r=new p5.Shader(n._renderer,f,"precision mediump float;\r\n\r\n// lets grab texcoords just for fun\r\nvarying vec2 vTexCoord;\r\n\r\n// our texture coming from p5\r\nuniform sampler2D tex0;\r\nuniform float u_saturation;\r\nuniform float u_contrast;\r\nuniform float u_luminosity;\r\n\r\nfloat contrast(float x, float param) {\r\n\treturn x + sin( x*6.28 - 3.14 )*param;\r\n}\r\n\r\nvec3 contrast(vec3 v, float param) {\r\n\treturn vec3(\r\n\t\tcontrast(v.x, param),\r\n\t\tcontrast(v.y, param),\r\n\t\tcontrast(v.z, param)\r\n\t);\r\n}\r\n\r\nvoid main() {\r\n  vec2 uv = vTexCoord;\r\n  uv.y = 1.0 - uv.y;\r\n  vec3 texCol = texture2D(tex0, uv).rgb;\r\n  vec3 col;\r\n\r\n  float gray = 0.299*texCol.r + 0.587*texCol.g + 0.114*texCol.b;\r\n  col = u_saturation*texCol + (1.-u_saturation) * vec3(gray);\r\n  col = pow(col, vec3(u_luminosity));\r\n  col = contrast(col, u_contrast);\r\n\r\n  gl_FragColor = vec4(col, 1.0);\r\n}");n.preload=function(){e=n.loadImage(t.src)},n.setup=function(){var r=e.width/e.height;n.createCanvas(t.height*r,t.height,n.WEBGL),n.onParametersChanged(t.editParameters),n.noLoop()},n.onParametersChanged=function(t){n.shader(r),r.setUniform("tex0",e),r.setUniform("u_saturation",t.saturation),r.setUniform("u_contrast",t.contrast),r.setUniform("u_luminosity",t.luminosity),n.rect(0,0,0,0)}}));t.withP5Instance(n)},onupdate:function(){t.p5editingImg.onParametersChanged(t.editParameters)}})),s({p5zoomOnImg:n.p5zoomOnImg,p5editingImg:n.p5editingImg,withP5Instance:function(n){return e.setZoomOnImgP5(n)}}),g({p5zoomOnPixel:n.p5zoomOnPixel,p5zoomOnImg:n.p5zoomOnImg,withP5Instance:function(n){return e.setZoomOnPixelP5(n)}}),p(n,e)]});var t};function h(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function y(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?h(Object(t),!0).forEach((function(e){b(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):h(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function b(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var x={startDragging:function(n){return function(e){return document.getElementsByTagName("BODY")[0].classList.add("dragging"),y({},e,{bDraggingValue:!0,dragTarget:n})}},stopDraggingValue:function(){return function(n){return document.getElementsByTagName("BODY")[0].classList.remove("dragging"),y({},n,{bDraggingValue:!1})}},checkDragging:function(n){return function(e){if(e.bDraggingValue){var t=e.editParameters;return t[e.dragTarget]+=.003*n,y({},e,{editParameters:t})}return e}},setEditingImgP5:function(n){return function(e){return y({},e,{p5editingImg:n})}},setZoomOnImgP5:function(n){return function(e){return y({},e,{p5zoomOnImg:n})}},setZoomOnPixelP5:function(n){return function(e){return y({},e,{p5zoomOnPixel:n})}}};t(1);!function(n){if(i(n))return a(o,n);var e=i(n.log)?n.log:o;return function(n){return a(e,n)}}({log:function(n,e,t){"checkDragging"!=e.name&&(console.group("%c action","color: gray; font-weight: lighter;",e.name),console.log("%c data","color: #03A9F4; font-weight: bold;",e.data),console.log("%c next state","color: #4CAF50; font-weight: bold;",t),console.groupEnd())}})((function(n,e,t,r){var o,i=[].map,a=r&&r.children[0]||null,u=a&&function n(e){return{nodeName:e.nodeName.toLowerCase(),attributes:{},children:i.call(e.childNodes,(function(e){return 3===e.nodeType?e.nodeValue:n(e)}))}}(a),c=[],l=!0,f=p(n),s=function n(e,t,r){for(var o in r)"function"==typeof r[o]?function(n,o){r[n]=function(n){var i=o(n);return"function"==typeof i&&(i=i(h(e,f),r)),i&&i!==(t=h(e,f))&&!i.then&&m(f=v(e,p(t,i),f)),i}}(o,r[o]):n(e.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],f,p(e));return m(),s;function g(n){return"function"==typeof n?g(n(f,s)):null!=n?n:""}function d(){o=!o;var n=g(t);for(r&&!o&&(a=function n(e,t,r,o,i){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var a=function n(e,t){var r="string"==typeof e||"number"==typeof e?document.createTextNode(e):(t=t||"svg"===e.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):document.createElement(e.nodeName),o=e.attributes;if(o){o.oncreate&&c.push((function(){o.oncreate(r)}));for(var i=0;i<e.children.length;i++)r.appendChild(n(e.children[i]=g(e.children[i]),t));for(var a in o)x(r,a,o[a],null,t)}return r}(o,i);e.insertBefore(a,t),null!=r&&P(e,t,r),t=a}else if(null==r.nodeName)t.nodeValue=o;else{!function(n,e,t,r){for(var o in p(e,t))t[o]!==("value"===o||"checked"===o?n[o]:e[o])&&x(n,o,t[o],e[o],r);var i=l?t.oncreate:t.onupdate;i&&c.push((function(){i(n,e)}))}(t,r.attributes,o.attributes,i=i||"svg"===o.nodeName);for(var u={},f={},s=[],d=r.children,m=o.children,v=0;v<d.length;v++){s[v]=t.childNodes[v],null!=(b=y(d[v]))&&(u[b]=[s[v],d[v]])}v=0;for(var h=0;h<m.length;){var b=y(d[v]),w=y(m[h]=g(m[h]));if(f[b])v++;else if(null==w||w!==y(d[v+1]))if(null==w||l)null==b&&(n(t,s[v],d[v],m[h],i),h++),v++;else{var O=u[w]||[];b===w?(n(t,O[0],O[1],m[h],i),v++):O[0]?n(t,t.insertBefore(O[0],s[v]),O[1],m[h],i):n(t,s[v],null,m[h],i),f[w]=m[h],h++}else null==b&&P(t,s[v],d[v]),v++}for(;v<d.length;)null==y(d[v])&&P(t,s[v],d[v]),v++;for(var v in u)f[v]||P(t,u[v][0],u[v][1])}return t}(r,a,u,u=n)),l=!1;c.length;)c.pop()()}function m(){o||(o=!0,setTimeout(d))}function p(n,e){var t={};for(var r in n)t[r]=n[r];for(var r in e)t[r]=e[r];return t}function v(n,e,t){var r={};return n.length?(r[n[0]]=n.length>1?v(n.slice(1),e,t[n[0]]):e,p(t,r)):e}function h(n,e){for(var t=0;t<n.length;)e=e[n[t++]];return e}function y(n){return n?n.key:null}function b(n){return n.currentTarget.events[n.type](n)}function x(n,e,t,r,o){if("key"===e);else if("style"===e)if("string"==typeof t)n.style.cssText=t;else for(var i in"string"==typeof r&&(r=n.style.cssText=""),p(r,t)){var a=null==t||null==t[i]?"":t[i];"-"===i[0]?n.style.setProperty(i,a):n.style[i]=a}else"o"===e[0]&&"n"===e[1]?(e=e.slice(2),n.events?r||(r=n.events[e]):n.events={},n.events[e]=t,t?r||n.addEventListener(e,b):n.removeEventListener(e,b)):e in n&&"list"!==e&&"type"!==e&&"draggable"!==e&&"spellcheck"!==e&&"translate"!==e&&!o?n[e]=null==t?"":t:null!=t&&!1!==t&&n.setAttribute(e,t),null!=t&&!1!==t||n.removeAttribute(e)}function P(n,e,t){function r(){n.removeChild(function n(e,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)n(e.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(e)}return e}(e,t))}var o=t.attributes&&t.attributes.onremove;o?o(e,r):r()}}))({editParameters:{luminosity:.5,contrast:-.2,saturation:.7,whiteBalance:0},bDraggingValue:!1,p5editingImg:null,p5zoomOnImg:null,p5zoomOnPixel:null},x,(function(n,e){return r("div",{id:"mainView",oncreate:function(){window.onmouseup=function(){return e.stopDraggingValue()},window.onmousemove=function(n){return e.checkDragging(n.movementX)}}},[v(n,e)])}),document.body)}]);
//# sourceMappingURL=bundle.js.map