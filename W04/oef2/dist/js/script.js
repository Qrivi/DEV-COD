/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  }, {
    key: "mult",
    value: function mult(n) {
      this.x *= n;
      this.y *= n;
      return this;
    }
  }, {
    key: "div",
    value: function div(n) {
      this.x /= n;
      this.y /= n;
      return this;
    }
  }, {
    key: "mag",
    value: function mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var m = this.mag();
      if (m !== 0) {
        this.div(m);
      }
      return this;
    }
  }, {
    key: "limit",
    value: function limit(max) {
      if (this.mag() > max) {
        this.normalize();
        this.mult(max);
      }
      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
  }], [{
    key: "add",
    value: function add(v1, v2) {
      return v1.clone().add(v2);
    }
  }, {
    key: "sub",
    value: function sub(v1, v2) {
      return v1.clone().sub(v2);
    }
  }, {
    key: "mult",
    value: function mult(v, n) {
      return v.clone().mult(n);
    }
  }, {
    key: "div",
    value: function div(v, n) {
      return v.clone().div(n);
    }
  }]);

  return Vector;
}();

exports.default = Vector;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var random = exports.random = function random() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return Math.random() * (max - min) + min;
};

var loadImage = exports.loadImage = function loadImage(url) {
  return new Promise(function (response, reject) {
    var image = new Image();
    image.addEventListener('load', function (event) {
      return response(image);
    });
    image.addEventListener('error', function (event) {
      return reject(event);
    });
    image.setAttribute('src', url);
    if (image.complete) response(image);
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

var _SmokeParticle = __webpack_require__(3);

var _SmokeParticle2 = _interopRequireDefault(_SmokeParticle);

var _lib = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    mouse = new _Vector2.default(0, 0);

var particles = [],
    smokeImg = void 0;

var init = function init() {
  console.log('Hello World!');

  (0, _lib.loadImage)('images/smoke.png').then(function (img) {
    return smokeImg = img;
  }).then(function () {
    canvas.addEventListener('mousemove', mousemove);
    draw();
  });
};

var mousemove = function mousemove(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

var draw = function draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(function (particle) {
    return particle.isAlive;
  });
  particles.push(new _SmokeParticle2.default(smokeImg, mouse.x, mouse.y));

  var wind = new _Vector2.default((1 - mouse.x / canvas.width) / 10 - .05, -.05);
  particles.forEach(function (particle) {
    return particle.applyForce(wind);
  });
  particles.forEach(function (particle) {
    return particle.update();
  });
  particles.forEach(function (particle) {
    return particle.draw(ctx);
  });

  window.requestAnimationFrame(draw);
};

init();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle2 = __webpack_require__(4);

var _Particle3 = _interopRequireDefault(_Particle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SmokeParticle = function (_Particle) {
  _inherits(SmokeParticle, _Particle);

  function SmokeParticle(image, x, y) {
    _classCallCheck(this, SmokeParticle);

    var _this = _possibleConstructorReturn(this, (SmokeParticle.__proto__ || Object.getPrototypeOf(SmokeParticle)).call(this, x, y));

    _this.image = image;
    return _this;
  }

  _createClass(SmokeParticle, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.globalAlpha = this.lifespan / 100;
      ctx.drawImage(this.image, this.location.x - this.image.width / 2, this.location.y - this.image.height / 2);
    }
  }]);

  return SmokeParticle;
}(_Particle3.default);

exports.default = SmokeParticle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

var _lib = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(x, y) {
    _classCallCheck(this, Particle);

    this.location = new _Vector2.default(x, y);
    this.velocity = new _Vector2.default((0, _lib.random)(-1, 1), (0, _lib.random)(-1, 1));
    this.acceleration = new _Vector2.default(0, 0);
    this.lifespan = 100;
  }

  _createClass(Particle, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = 'rgba(255, 255, 255, ' + this.lifespan / 100 + ')';
      ctx.fillRect(this.location.x - 1, this.location.y - 1, 2, 2);
    }
  }, {
    key: 'update',
    value: function update() {
      this.lifespan--;
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
    }
  }, {
    key: 'applyForce',
    value: function applyForce(force) {
      this.acceleration.add(force);
    }
  }, {
    key: 'isAlive',
    get: function get() {
      return this.lifespan > 0;
    }
  }]);

  return Particle;
}();

exports.default = Particle;

/***/ })
/******/ ]);