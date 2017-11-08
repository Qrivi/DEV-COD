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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Player = __webpack_require__(2);

var _Player2 = _interopRequireDefault(_Player);

var _Keyboard = __webpack_require__(4);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _lib = __webpack_require__(5);

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

var _Enemy = __webpack_require__(6);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _Bullet = __webpack_require__(7);

var _Bullet2 = _interopRequireDefault(_Bullet);

var _CollisionDetector = __webpack_require__(8);

var _CollisionDetector2 = _interopRequireDefault(_CollisionDetector);

var _Explosion = __webpack_require__(11);

var _Explosion2 = _interopRequireDefault(_Explosion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

{
  var canvas = void 0,
      ctx = void 0;
  var catalog = {};
  var keyboard = void 0;
  var player = void 0;
  var enemies = [];
  var playerBullets = [];
  var playerBulletsEnemiesCollisionDetector = void 0;
  var playerEnemiesCollisionDetector = void 0;
  var explosions = [];

  var init = function init() {
    console.log("===== GAME INITIALISED =====");
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    Promise.all([(0, _lib.loadImageInCatalog)('img/bullet.png', 'bullet', catalog), (0, _lib.loadImageInCatalog)('img/player.png', 'player', catalog), (0, _lib.loadImageInCatalog)('img/enemy.png', 'enemy', catalog), (0, _lib.loadImageInCatalog)('img/explosion.png', 'explosion', catalog)]).then(loaded);
  };
  var loaded = function loaded() {
    console.log(catalog);
    player = new _Player2.default(canvas.width / 2, canvas.height - 50, catalog.player);
    console.log(player);
    keyboard = new _Keyboard2.default();
    //
    playerBulletsEnemiesCollisionDetector = new _CollisionDetector2.default();
    playerBulletsEnemiesCollisionDetector.on('collision', handleCollisionBulletEnemy);
    //
    playerEnemiesCollisionDetector = new _CollisionDetector2.default();
    playerEnemiesCollisionDetector.on('collision', handleCollisionEnemyPlayer);
    draw();
  };
  var handleCollisionBulletEnemy = function handleCollisionBulletEnemy(bullet, enemy) {
    if (enemy.killed) {
      return;
    }
    enemy.killed = true;
    playerBullets = playerBullets.filter(function (value) {
      return value !== bullet;
    });
    enemies = enemies.filter(function (value) {
      return value !== enemy;
    });
    //
    var explosion = new _Explosion2.default(enemy.location.x, enemy.location.y, catalog.explosion);
    explosion.applyForce(enemy.velocity.mult(0.5));
    explosions.push(explosion);
  };
  var handleCollisionEnemyPlayer = function handleCollisionEnemyPlayer(enemy, player) {
    if (enemy.killed) {
      return;
    }
    enemy.killed = true;
    player.killed = true;
    enemies = enemies.filter(function (value) {
      return value !== enemy;
    });
    //
    var explosion = new _Explosion2.default(player.location.x, player.location.y, catalog.explosion);
    explosion.applyForce(player.velocity.mult(0.5));
    explosions.push(explosion);
  };
  var draw = function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //
    if (!player.killed) {
      if (keyboard.isDown(_Keyboard2.default.LEFT)) {
        player.applyForce(new _Vector2.default(-0.5, 0));
      }
      if (keyboard.isDown(_Keyboard2.default.RIGHT)) {
        player.applyForce(new _Vector2.default(0.5, 0));
      }
      if (keyboard.isDown(_Keyboard2.default.SPACE)) {
        var bullet = new _Bullet2.default(player.location.x, player.location.y, catalog.bullet);
        playerBullets.push(bullet);
      }
    }
    //
    player.update();

    //
    if (Math.random() < 0.05) {
      console.log("enemy created");
      var enemy = new _Enemy2.default(canvas.width * Math.random(), 0, catalog.enemy);
      enemies.push(enemy);
    }
    enemies.forEach(function (enemy) {
      var dir = new _Vector2.default(0, 0.5);
      if (!player.killed) {
        dir = _Vector2.default.sub(player.location, enemy.location).normalize().mult(0.5);
      }
      enemy.applyForce(dir);
      enemy.update();
    });
    enemies = enemies.filter(function (enemy) {
      return enemy.location.y < canvas.height;
    });
    enemies.forEach(function (enemy) {
      return enemy.draw(ctx);
    });

    playerBullets.forEach(function (bullet) {
      bullet.velocity.y = -5;
      bullet.update();
    });

    playerBullets = playerBullets.filter(function (bullet) {
      return bullet.location.y > 0;
    });
    playerBullets.forEach(function (bullet) {
      return bullet.draw(ctx);
    });

    if (!player.killed) {
      playerBulletsEnemiesCollisionDetector.detectCollisions(playerBullets, enemies);
      playerEnemiesCollisionDetector.detectCollisions(enemies, [player]);
      player.draw(ctx);
    }
    explosions.forEach(function (explosion) {
      explosion.update();
    });
    explosions = explosions.filter(function (explosion) {
      return explosion.loopCounter === 0;
    });
    explosions.forEach(function (explosion) {
      return explosion.draw(ctx);
    });

    window.requestAnimationFrame(draw);
  };

  init();
}

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GameObject2 = __webpack_require__(3);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_GameObject) {
  _inherits(Player, _GameObject);

  function Player(x, y, image) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, image));

    _this.frameRate = 20;
    _this.numFrames = 3;
    return _this;
  }

  return Player;
}(_GameObject3.default);

exports.default = Player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
  function GameObject(x, y, image) {
    _classCallCheck(this, GameObject);

    this.location = new _Vector2.default(x, y);
    this.acceleration = new _Vector2.default(0, 0);
    this.velocity = new _Vector2.default(0, 0);
    this.image = image;
    this.size = this.image.height;
    this.frameRate = 60;
    this.frameNr = 0;
    this.localFrameNr = 0;
    this.numFrames = 1;
  }

  _createClass(GameObject, [{
    key: 'calculateDistance',
    value: function calculateDistance(otherElement) {
      var distance = _Vector2.default.sub(otherElement.location, this.location).mag();
      distance = distance - otherElement.size / 2 - this.size / 2;
      return distance;
    }
  }, {
    key: 'collidesWith',
    value: function collidesWith(otherElement) {
      return this.calculateDistance(otherElement) <= 0;
    }
  }, {
    key: 'applyForce',
    value: function applyForce(force) {
      this.acceleration.add(force);
    }
  }, {
    key: 'update',
    value: function update() {
      this.frameNr++;
      this.localFrameNr = Math.floor(this.frameNr / (60 / this.frameRate));
      this.loopCounter = Math.floor(this.localFrameNr / this.numFrames);
      this.localFrameNr = this.localFrameNr % this.numFrames;
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.mult(0.95);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.save();
      ctx.translate(this.location.x, this.location.y);
      ctx.drawImage(this.image, this.localFrameNr * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }]);

  return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
    var _this = this;

    _classCallCheck(this, Keyboard);

    this.keys = {};
    window.addEventListener("keydown", function (event) {
      return _this.handleKeyDown(event);
    });
    window.addEventListener("keyup", function (event) {
      return _this.handleKeyUp(event);
    });
    Keyboard.LEFT = 37;
    Keyboard.RIGHT = 39;
    Keyboard.SPACE = 32;
  }

  _createClass(Keyboard, [{
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      this.keys[event.keyCode] = true;
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      delete this.keys[event.keyCode];
    }
  }, {
    key: "isDown",
    value: function isDown(keyCode) {
      return this.keys[keyCode];
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 5 */
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

var loadImageInCatalog = exports.loadImageInCatalog = function loadImageInCatalog(url, id, catalog) {
  return new Promise(function (response, reject) {
    //image load
    catalog[id] = new Image();
    catalog[id].addEventListener('load', function (event) {
      return response(catalog[id]);
    });
    catalog[id].addEventListener('error', function (event) {
      return reject(event);
    });
    catalog[id].setAttribute('src', url);
    if (catalog[id].complete) {
      response(catalog[id]);
    };
  });
};
var loadImage = exports.loadImage = function loadImage(url) {
  return new Promise(function (response, reject) {
    //image load
    var image = new Image();
    image.addEventListener('load', function (event) {
      return response(image);
    });
    image.addEventListener('error', function (event) {
      return reject(event);
    });
    image.setAttribute('src', url);
    if (image.complete) {
      response(image);
    };
  });
};
var map = exports.map = function map(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(3);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = function (_GameObject) {
  _inherits(Enemy, _GameObject);

  function Enemy(x, y, image) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, x, y, image));

    _this.frameRate = 20;
    _this.numFrames = 3;
    return _this;
  }

  _createClass(Enemy, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.save();
      ctx.translate(this.location.x, this.location.y);

      var angle = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2;
      ctx.rotate(angle);
      ctx.drawImage(this.image, this.localFrameNr * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }]);

  return Enemy;
}(_GameObject3.default);

exports.default = Enemy;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GameObject2 = __webpack_require__(3);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_GameObject) {
  _inherits(Bullet, _GameObject);

  function Bullet(x, y, image) {
    _classCallCheck(this, Bullet);

    return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, x, y, image));
  }

  return Bullet;
}(_GameObject3.default);

exports.default = Bullet;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = __webpack_require__(9);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollisionDetector = function (_EventEmitter) {
  _inherits(CollisionDetector, _EventEmitter);

  function CollisionDetector() {
    _classCallCheck(this, CollisionDetector);

    return _possibleConstructorReturn(this, (CollisionDetector.__proto__ || Object.getPrototypeOf(CollisionDetector)).call(this, {}));
  }

  _createClass(CollisionDetector, [{
    key: 'detectCollisions',
    value: function detectCollisions(elements1, elements2) {
      var _this2 = this;

      elements1.forEach(function (element1) {
        elements2.forEach(function (element2) {
          //kijk of het element1 botst met element2
          if (element1.collidesWith(element2)) {
            //indien wel ==> event uitsturen met emit methode
            _this2.emit('collision', element1, element2);
          }
        });
      });
    }
  }]);

  return CollisionDetector;
}(_eventemitter2.default);

exports.default = CollisionDetector;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function (undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' + 'leak detected. ' + count + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.';

    if (this.verboseMemoryLeak) {
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if (typeof process !== 'undefined' && process.emitWarning) {
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace) {
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners = [],
        leaf,
        len,
        branch,
        xTree,
        xxTree,
        isolatedBranch,
        endReached,
        typeLength = type.length,
        currentType = type[i],
        nextType = type[i + 1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if (currentType === '*' || currentType === '**' || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 1));
          }
        }
        return listeners;
      } else if (currentType === '**') {
        endReached = i + 1 === typeLength || i + 2 === typeLength && nextType === '*';
        if (endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if (branch === '*' || branch === '**') {
              if (tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if (branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i + 2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i + 1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i + 1);
    }

    xxTree = tree['**'];
    if (xxTree) {
      if (i < typeLength) {
        if (xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for (branch in xxTree) {
          if (branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if (branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i + 2);
            } else if (branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i + 1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i + 1);
            }
          }
        }
      } else if (xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if (xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for (var i = 0, len = type.length; i + 1 < len; i++) {
      if (type[i] === '**' && type[i + 1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        } else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (!tree._listeners.warned && this._maxListeners > 0 && tree._listeners.length > this._maxListeners) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function (n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function (event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function (event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function (event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function (event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  };

  EventEmitter.prototype.prependMany = function (event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  };

  EventEmitter.prototype._many = function (event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function () {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args, l, i, j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) {
          args[j] = arguments[j];
        }
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            handler[i].call(this, type);
            break;
          case 2:
            handler[i].call(this, type, arguments[1]);
            break;
          case 3:
            handler[i].call(this, type, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
          case 1:
            handler.call(this);
            break;
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          default:
            args = new Array(al - 1);
            for (j = 1; j < al; j++) {
              args[j - 1] = arguments[j];
            }handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) {
          args[j - 1] = arguments[j];
        }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            handler[i].call(this);
            break;
          case 2:
            handler[i].call(this, arguments[1]);
            break;
          case 3:
            handler[i].call(this, arguments[1], arguments[2]);
            break;
          default:
            handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function () {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) {
        return Promise.resolve([false]);
      }
    }

    var promises = [];

    var al = arguments.length;
    var args, l, i, j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) {
          args[j] = arguments[j];
        }
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(this._all[i].call(this, type));
            break;
          case 2:
            promises.push(this._all[i].call(this, type, arguments[1]));
            break;
          case 3:
            promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
            break;
          default:
            promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
        case 1:
          promises.push(handler.call(this));
          break;
        case 2:
          promises.push(handler.call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler.call(this, arguments[1], arguments[2]));
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) {
            args[j - 1] = arguments[j];
          }promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) {
          args[j - 1] = arguments[j];
        }
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
          case 1:
            promises.push(handler[i].call(this));
            break;
          case 2:
            promises.push(handler[i].call(this, arguments[1]));
            break;
          case 3:
            promises.push(handler[i].call(this, arguments[1], arguments[2]));
            break;
          default:
            promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function (type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function (type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function (fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function (fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function (fn, prepend) {
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if (prepend) {
      this._all.unshift(fn);
    } else {
      this._all.push(fn);
    }

    return this;
  };

  EventEmitter.prototype._on = function (type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    } else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if (prepend) {
        this._events[type].unshift(listener);
      } else {
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (!this._events[type].warned && this._maxListeners > 0 && this._events[type].length > this._maxListeners) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  };

  EventEmitter.prototype.off = function (type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,
        leafs = [];

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    } else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({ _listeners: handlers });
    }

    for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener || handlers[i].listener && handlers[i].listener === listener || handlers[i]._origin && handlers[i]._origin === listener) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if (this.wildcard) {
          leaf._listeners.splice(position, 1);
        } else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if (this.wildcard) {
            delete leaf._listeners;
          } else {
            delete this._events[type];
          }
        }

        this.emit("removeListener", type, listener);

        return this;
      } else if (handlers === listener || handlers.listener && handlers.listener === listener || handlers._origin && handlers._origin === listener) {
        if (this.wildcard) {
          delete leaf._listeners;
        } else {
          delete this._events[type];
        }

        this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if (obj instanceof Function || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== "object" || obj === null) continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function (fn) {
    var i = 0,
        l = 0,
        fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for (i = 0, l = fns.length; i < l; i++) {
        if (fn === fns[i]) {
          fns.splice(i, 1);
          this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      for (i = 0, l = fns.length; i < l; i++) {
        this.emit("removeListenerAny", fns[i]);
      }this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function (type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf = 0; iLeaf < leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    } else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function (type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function () {
    return Object.keys(this._events);
  };

  EventEmitter.prototype.listenerCount = function (type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function () {

    if (this._all) {
      return this._all;
    } else {
      return [];
    }
  };

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return EventEmitter;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // CommonJS
    module.exports = EventEmitter;
  } else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GameObject2 = __webpack_require__(3);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explosion = function (_GameObject) {
  _inherits(Explosion, _GameObject);

  function Explosion(x, y, image) {
    _classCallCheck(this, Explosion);

    var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, x, y, image));

    _this.frameRate = 10;
    _this.numFrames = 6;
    return _this;
  }

  return Explosion;
}(_GameObject3.default);

exports.default = Explosion;

/***/ })
/******/ ]);