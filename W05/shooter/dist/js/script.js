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


var _Keyboard = __webpack_require__(5);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Vector = __webpack_require__(1);

var _Vector2 = _interopRequireDefault(_Vector);

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _Enemy = __webpack_require__(7);

var _Enemy2 = _interopRequireDefault(_Enemy);

var _Bullet = __webpack_require__(6);

var _Bullet2 = _interopRequireDefault(_Bullet);

var _lib = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = void 0,
    ctx = void 0;
var catalog = {};

var keyboard = void 0;
var player = void 0;
var enemies = [];
var bullets = [];

{
    var init = function init() {
        console.log('Hello World!');
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        Promise.all([(0, _lib.loadImageToCatalog)('img/bullet.png', 'bullet', catalog), (0, _lib.loadImageToCatalog)('img/player.png', 'player', catalog), (0, _lib.loadImageToCatalog)('img/enemy.png', 'enemy', catalog), (0, _lib.loadImageToCatalog)('img/explosion.png', 'explosion', catalog)]).then(loaded).catch(function () {
            return console.log('Loading images failed');
        });
    };

    var loaded = function loaded() {
        keyboard = new _Keyboard2.default();
        player = new _Player2.default(canvas.width / 2, canvas.height - catalog.player.height, catalog.player);
        player.numFrames = 3;

        draw();
    };

    var draw = function draw() {
        //background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //keyboard
        if (!player.killed) {
            if (keyboard.isDown(_Keyboard2.default.LEFT)) player.applyForce(new _Vector2.default(-0.5, 0));

            if (keyboard.isDown(_Keyboard2.default.RIGHT)) player.applyForce(new _Vector2.default(0.5, 0));

            if (keyboard.isDown(_Keyboard2.default.SPACE)) bullets.push(new _Bullet2.default(player.location.x, player.location.y, catalog.bullet));
        }

        //player
        player.update();
        if (!player.killed) player.draw(ctx);

        //enemy
        if (Math.random() < .04) enemies.push(new _Enemy2.default(canvas.width * Math.random(), 0, catalog.enemy));

        enemies = enemies.filter(function (enemy) {
            return enemy.location.y < canvas.height;
        });
        enemies.forEach(function (enemy) {
            var dir = new _Vector2.default(0, .5);
            if (!player.killed) dir = _Vector2.default.sub(player.location, enemy.location).normalize().mult(0.5);

            enemy.applyForce(dir);
            enemy.update();
            enemy.draw(ctx);
        });

        //bullet
        bullets = bullets.filter(function (bullet) {
            return bullet.location.y > 0;
        });
        bullets.forEach(function (bullet) {
            bullet.velocity.y = -5;
            bullet.update();
            bullet.draw(ctx);
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
var random = exports.random = function random() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    return Math.random() * (max - min) + min;
};

var loadImage = exports.loadImage = function loadImage(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.addEventListener("load", function (event) {
            return resolve(image);
        });
        image.addEventListener("error", function (event) {
            return reject(event);
        });
        image.setAttribute("src", url);
        if (image.complete) resolve(image);
    });
};

var loadImageToCatalog = exports.loadImageToCatalog = function loadImageToCatalog(url, id, catalog) {
    return new Promise(function (resolve, reject) {
        catalog[id] = new Image();
        catalog[id].addEventListener("load", function (event) {
            return resolve(catalog[id]);
        });
        catalog[id].addEventListener("error", function (event) {
            return reject(event);
        });
        catalog[id].setAttribute("src", url);
        if (catalog[id].complete) resolve(catalog[id]);
    });
};

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
        this.velocity = new _Vector2.default(0, 0);
        this.acceleration = new _Vector2.default(0, 0);
        this.image = image;
        this.size = this.image.height;
        this.frameRate = 60;
        this.frameNo = 0;
        this.localFrameNo = 0;
        this.numFrames = 1;
    }

    _createClass(GameObject, [{
        key: 'applyForce',
        value: function applyForce(force) {
            this.acceleration.add(force);
        }
    }, {
        key: 'update',
        value: function update() {
            this.frameNo++;
            this.localFrameNo = Math.floor(this.frameNo / (60 / this.frameRate)) % this.numFrames;

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
            ctx.drawImage(this.image, this.localFrameNo * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
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
        _this.killed = false;
        return _this;
    }

    return Player;
}(_GameObject3.default);

exports.default = Player;

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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

            ctx.rotate(Math.atan2(this.velocity.y, this.velocity.x) - Math.PI / 2);

            ctx.drawImage(this.image, this.localFrameNo * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }]);

    return Enemy;
}(_GameObject3.default);

exports.default = Enemy;

/***/ })
/******/ ]);