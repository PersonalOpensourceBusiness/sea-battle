/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Model = __webpack_require__(1);

	var _View = __webpack_require__(4);

	var _Controller = __webpack_require__(7);

	var model = new _Model.Model();
	var view = new _View.View(model);
	var controller = new _Controller.Controller(model, view);

	model.init();
	controller.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Model = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Board = __webpack_require__(2);

	var _Ship = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = exports.Model = function () {
	    function Model() {
	        _classCallCheck(this, Model);
	    }

	    _createClass(Model, [{
	        key: 'init',
	        value: function init() {
	            this.field = this.createBoard();
	        }
	    }, {
	        key: 'createShip',
	        value: function createShip(n) {
	            return new _Ship.Ship(n);
	        }
	    }, {
	        key: 'createBoard',
	        value: function createBoard() {
	            return new _Board.Board();
	        }
	    }]);

	    return Model;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Board = exports.Board = function Board() {
	    _classCallCheck(this, Board);

	    this.matrix = generate();
	};

	var generate = function generate() {
	    var matrix = [];
	    for (var i = 0; i < 10; i++) {
	        matrix[i] = [];
	        for (var j = 0; j < 10; j++) {
	            matrix[i][j] = 0;
	        }
	    }
	    return matrix;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Ship = exports.Ship = function () {
	    function Ship(size) {
	        _classCallCheck(this, Ship);

	        this.size = size;
	        this.body = [];
	    }

	    _createClass(Ship, [{
	        key: "shot",
	        value: function shot() {}
	    }, {
	        key: "destroy",
	        value: function destroy() {}
	    }, {
	        key: "create",
	        value: function create() {
	            for (var i = 0; i < this.size; i++) {
	                this.body.push(this.size);
	            }
	            return this.body;
	        }
	    }]);

	    return Ship;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Board = __webpack_require__(5);

	var _Interface = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = exports.View = function () {
	    function View(model) {
	        _classCallCheck(this, View);

	        this.app = document.querySelector('#app');
	        this.model = model;
	        this.interface = new _Interface.Interface(this.app);
	    }

	    _createClass(View, [{
	        key: 'createBoard',
	        value: function createBoard(className) {
	            return new _Board.Board(this.app, this.model.createBoard().matrix, className);
	        }
	    }, {
	        key: 'createInterface',
	        value: function createInterface() {
	            this.interface.render(this.interface.main());
	        }
	    }, {
	        key: 'renderChoice',
	        value: function renderChoice() {
	            this.interface.render(this.interface.choice());
	        }
	    }, {
	        key: 'renderWait',
	        value: function renderWait(players) {
	            this.interface.render(this.interface.wait(players));
	        }
	    }, {
	        key: 'createShips',
	        value: function createShips() {}
	    }]);

	    return View;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Board = exports.Board = function () {
	    function Board(app, matrix, className) {
	        _classCallCheck(this, Board);

	        this.app = app;
	        this.matrix = matrix;
	        this.board = this.init(this.matrix, className);
	    }

	    _createClass(Board, [{
	        key: 'init',
	        value: function init(matrix, className) {
	            return render(matrix, this.app, className);
	        }
	    }, {
	        key: 'miss',
	        value: function miss(x, y) {
	            console.log('Miss: ', x, y);
	        }
	    }, {
	        key: 'hit',
	        value: function hit(x, y) {
	            console.log('Hit: ', x, y);
	        }
	    }, {
	        key: 'shoot',
	        value: function shoot(x, y) {
	            console.log('Shoot: ', x, y);
	        }
	    }, {
	        key: 'move',
	        value: function move(x, y, board) {
	            var row = board.querySelectorAll('.row');

	            row[y + 1].querySelectorAll('.cell')[x].classList.add('hover');
	            row[y].querySelectorAll('.cell')[x].classList.add('hover');
	            row[y - 1].querySelectorAll('.cell')[x].classList.add('hover');
	        }
	    }, {
	        key: 'remove',
	        value: function remove(x, y, board) {
	            var row = board.querySelectorAll('.row');

	            row[y + 1].querySelectorAll('.cell')[x].classList.remove('hover');
	            row[y].querySelectorAll('.cell')[x].classList.remove('hover');
	            row[y - 1].querySelectorAll('.cell')[x].classList.remove('hover');
	        }
	    }, {
	        key: 'create',
	        value: function create(x, y, board) {
	            var row = board.querySelectorAll('.row');

	            row[y + 1].querySelectorAll('.cell')[x].classList.add('ship');
	            row[y].querySelectorAll('.cell')[x].classList.add('ship');
	            row[y - 1].querySelectorAll('.cell')[x].classList.add('ship');
	        }
	    }]);

	    return Board;
	}();

	var generate = function generate(matrix, className) {
	    var field = document.createElement('div');
	    field.classList.add('field', className);

	    for (var i = 0; i < matrix.length; i++) {
	        var row = document.createElement('div');
	        row.classList.add('row');

	        for (var j = 0; j < matrix[i].length; j++) {
	            var cell = document.createElement('div');
	            cell.classList.add('cell');
	            row.appendChild(cell);
	        }

	        field.appendChild(row);
	    }

	    return field;
	};

	var render = function render(matrix, board, className) {
	    return board.appendChild(generate(matrix, className));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interface = exports.Interface = function () {
	    function Interface(app) {
	        _classCallCheck(this, Interface);

	        this.app = app;
	    }

	    _createClass(Interface, [{
	        key: 'render',
	        value: function render(part) {
	            this.app.innerHTML = part;
	        }
	    }, {
	        key: 'main',
	        value: function main() {
	            return ['<div class="interface">', '<h1>Sea battle</h1>', '<hr>', '<div>', '<button id="create">Create game</button>', '</div>', '</div>'].join('');
	        }
	    }, {
	        key: 'choice',
	        value: function choice() {
	            return ['<div class="interface">', '<h1>Sea battle</h1>', '<hr>', '<div>', 'Сколько игроков?', '<input type="number" max="20" min="2" id="players">', '<button id="init">Init game</button>', '</div>', '</div>'].join('');
	        }
	    }, {
	        key: 'wait',
	        value: function wait(players) {
	            var playersBlock = function playersBlock() {
	                var result = [];
	                for (var i = 0; i < players; i++) {
	                    result.push('<div class="playersBlock">+</div>');
	                }
	                return result.join('');
	            };
	            return ['<div class="interface">', '<h1>Sea battle</h1>', '<hr>', '<div>', 'Подождите, пока все займут свои места', '<div class="playersBlock__container">', playersBlock(), '</div>', '<button id="start">Start game</button>', '</div>', '</div>'].join('');
	        }
	    }, {
	        key: 'finish',
	        value: function finish() {}
	    }]);

	    return Interface;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = exports.Controller = function () {
	    function Controller(model, view) {
	        _classCallCheck(this, Controller);

	        this.model = model;
	        this.view = view;
	        this.players = {};
	        this.player;
	    }

	    _createClass(Controller, [{
	        key: 'init',
	        value: function init() {
	            this.renderInterface();
	        }
	    }, {
	        key: 'eventHandlers',
	        value: function eventHandlers() {
	            var _this = this;

	            Object.keys(this.players).map(function (item) {
	                var board = _this.players[item].board.board;
	                board.addEventListener('mouseover', function (e) {
	                    if (!e.target.classList.contains('cell')) return;
	                    var x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
	                    var y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);

	                    _this.players[item].board.move(x, y, board);
	                });
	                board.addEventListener('mouseout', function (e) {
	                    if (!e.target.classList.contains('cell')) return;

	                    var x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
	                    var y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);

	                    _this.players[item].board.remove(x, y, board);
	                });
	                board.addEventListener('click', function (e) {
	                    if (!e.target.classList.contains('cell')) return;
	                    var x = Array.prototype.indexOf.call(e.target.parentNode.querySelectorAll('.cell'), e.target);
	                    var y = Array.prototype.indexOf.call(board.querySelectorAll('.row'), e.target.parentNode);
	                    if (item === _this.player) {
	                        _this.players[item].board.create(x, y, board);
	                    } else {
	                        _this.players[item].board.shoot(x, y);
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'startNewGame',
	        value: function startNewGame(players) {
	            var _this2 = this;

	            var interField = document.querySelector('.interface');
	            interField.parentNode.removeChild(interField);
	            this.player = 'Player0';
	            players.map(function (item) {
	                _this2.players[item] = {
	                    board: item !== _this2.player ? _this2.view.createBoard('enemy') : _this2.view.createBoard('your'),
	                    ships: 'ships'
	                };
	            });

	            this.eventHandlers();
	        }
	    }, {
	        key: 'renderInterface',
	        value: function renderInterface() {
	            var _this3 = this;

	            this.view.createInterface();

	            document.querySelector('#create').addEventListener('click', function () {
	                _this3.view.renderChoice();

	                document.querySelector('#init').addEventListener('click', function () {
	                    _this3.view.renderWait(document.querySelector('#players').value);

	                    document.querySelector('#start').addEventListener('click', function () {
	                        var arr = [];
	                        for (var i = 0; i < document.querySelectorAll('.playersBlock').length; i++) {
	                            arr[i] = 'Player' + i;
	                        }
	                        _this3.startNewGame(arr);
	                    });
	                });
	            });
	        }
	    }]);

	    return Controller;
	}();

/***/ }
/******/ ]);