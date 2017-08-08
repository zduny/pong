if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Pong'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Pong'.");
}
var Pong = function (_, Kotlin) {
  'use strict';
  AIController.prototype = Object.create(Controller.prototype);
  AIController.prototype.constructor = AIController;
  EmptyController.prototype = Object.create(Controller.prototype);
  EmptyController.prototype.constructor = EmptyController;
  KeyboardController.prototype = Object.create(Controller.prototype);
  KeyboardController.prototype.constructor = KeyboardController;
  Pong.prototype = Object.create(GameLoop.prototype);
  Pong.prototype.constructor = Pong;
  function AIController(game, player) {
    Controller.call(this, game, player);
  }
  Object.defineProperty(AIController.prototype, 'direction', {
    get: function () {
      var d = this.game.ball.position.y - this.player.position.y;
      var m = clamp(Math.abs(d) / this.game.maxPlayerSpeed * d, -1.0, 1.0);
      return m * 0.8;
    }
  });
  AIController.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'AIController',
    interfaces: [Controller]
  };
  function Ball(position, direction, radius, initialSpeed, speedUpFactor) {
    if (direction === void 0)
      direction = Vector2$Companion_getInstance().left;
    if (radius === void 0)
      radius = 8.0;
    if (initialSpeed === void 0)
      initialSpeed = 400.0;
    if (speedUpFactor === void 0)
      speedUpFactor = 1.05;
    this.position = position;
    this.direction = direction;
    this.radius = radius;
    this.initialSpeed = initialSpeed;
    this.speedUpFactor = speedUpFactor;
    this.speed = this.initialSpeed;
  }
  Object.defineProperty(Ball.prototype, 'bounds', {
    get: function () {
      return Rectangle2_init(this.position.minus_hdskun$(new Vector2(this.radius, this.radius)), 2 * this.radius, 2 * this.radius);
    }
  });
  Ball.prototype.update_14dthe$ = function (dt) {
    this.position = this.position.plus_hdskun$(this.direction.times_14dthe$(this.speed).times_14dthe$(dt));
  };
  Ball.prototype.speedUp = function () {
    this.speed *= this.speedUpFactor;
  };
  Ball.prototype.resetSpeed = function () {
    this.speed = this.initialSpeed;
  };
  Ball.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Ball',
    interfaces: []
  };
  function Controller(game, player) {
    this.game = game;
    this.player = player;
  }
  Controller.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Controller',
    interfaces: []
  };
  function EmptyController(game, player) {
    Controller.call(this, game, player);
  }
  Object.defineProperty(EmptyController.prototype, 'direction', {
    get: function () {
      return 0.0;
    }
  });
  EmptyController.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'EmptyController',
    interfaces: [Controller]
  };
  function GameLoop() {
    this.paused_h96hr6$_0 = true;
    this.previousTime_h96hr6$_0 = 0.0;
  }
  Object.defineProperty(GameLoop.prototype, 'paused', {
    get: function () {
      return this.paused_h96hr6$_0;
    },
    set: function (paused) {
      this.paused_h96hr6$_0 = paused;
    }
  });
  function GameLoop$loop$lambda(this$GameLoop) {
    return function (it) {
      this$GameLoop.loop_69mgm8$_0(it);
    };
  }
  GameLoop.prototype.loop_69mgm8$_0 = function (time) {
    if (this.paused)
      return;
    window.requestAnimationFrame(GameLoop$loop$lambda(this));
    var dt = clamp((time - this.previousTime_h96hr6$_0) / 1000, 0.0, 0.5);
    this.update_14dthe$(dt);
    this.render();
    this.previousTime_h96hr6$_0 = time;
  };
  GameLoop.prototype.start = function () {
    this.paused = false;
    this.loop_69mgm8$_0(0.0);
  };
  GameLoop.prototype.stop = function () {
    this.paused = true;
  };
  GameLoop.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'GameLoop',
    interfaces: []
  };
  function KeyboardController(game, player) {
    Controller.call(this, game, player);
    this.downPressed_0 = false;
    this.upPressed_0 = false;
    window.addEventListener('keydown', KeyboardController_init$lambda(this));
    window.addEventListener('keyup', KeyboardController_init$lambda_0(this));
  }
  Object.defineProperty(KeyboardController.prototype, 'direction', {
    get: function () {
      var dir = 0.0;
      if (this.downPressed_0)
        dir += 1.0;
      if (this.upPressed_0)
        dir -= 1.0;
      return dir;
    }
  });
  function KeyboardController_init$lambda(this$KeyboardController) {
    return function (it) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
      tmp$_0 = it.key;
      if (Kotlin.equals(tmp$_0, 'ArrowDown'))
        this$KeyboardController.downPressed_0 = true;
      else if (Kotlin.equals(tmp$_0, 'ArrowUp'))
        this$KeyboardController.upPressed_0 = true;
    };
  }
  function KeyboardController_init$lambda_0(this$KeyboardController) {
    return function (it) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
      tmp$_0 = it.key;
      if (Kotlin.equals(tmp$_0, 'ArrowDown'))
        this$KeyboardController.downPressed_0 = false;
      else if (Kotlin.equals(tmp$_0, 'ArrowUp'))
        this$KeyboardController.upPressed_0 = false;
    };
  }
  KeyboardController.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'KeyboardController',
    interfaces: [Controller]
  };
  function main(args) {
    var tmp$;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    var game = new Pong(canvas);
    game.leftController = new KeyboardController(game, game.left);
    game.rightController = new AIController(game, game.right);
    game.start();
  }
  function Player(position, score, paddleHeight, paddleWidth) {
    if (score === void 0)
      score = 0;
    if (paddleHeight === void 0)
      paddleHeight = 60.0;
    if (paddleWidth === void 0)
      paddleWidth = 11.0;
    this.position = position;
    this.score = score;
    this.paddleHeight = paddleHeight;
    this.paddleWidth = paddleWidth;
    this.halfHeight_0 = this.paddleHeight / 2;
    this.halfWidth_0 = this.paddleWidth / 2;
  }
  Object.defineProperty(Player.prototype, 'paddleBounds', {
    get: function () {
      return Rectangle2_init(this.position.plus_hdskun$(new Vector2(-this.halfWidth_0, -this.halfHeight_0)), this.paddleWidth, this.paddleHeight);
    }
  });
  Player.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function Pong(canvas, width, height) {
    if (width === void 0)
      width = 800.0;
    if (height === void 0)
      height = 600.0;
    GameLoop.call(this);
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    var tmp$;
    this.c_0 = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
    this.middle_0 = (new Vector2(this.width, this.height)).div_14dthe$(2.0);
    this.leftTurn_0 = true;
    this.playerOffset = 20.0;
    this.maxPlayerSpeed = 600.0;
    this.left = new Player(new Vector2(this.playerOffset, this.height / 2.0));
    this.right = new Player(new Vector2(this.width - this.playerOffset, this.height / 2.0));
    this.ball = new Ball(Vector2$Companion_getInstance().zero);
    this.leftController = new EmptyController(this, this.left);
    this.rightController = new EmptyController(this, this.right);
    this.updateSize();
    this.resetPosition_0(this.ball);
    window.addEventListener('resize', Pong_init$lambda(this));
  }
  Pong.prototype.randomVector_0 = function () {
    return new Vector2(Math.random() - 0.5, Math.random() - 0.5);
  };
  Pong.prototype.resetPosition_0 = function ($receiver) {
    this.ball.position = this.middle_0.plus_hdskun$(this.randomVector_0());
  };
  Pong.prototype.contain_0 = function (player) {
    if (player.paddleBounds.top < 0)
      player.position = new Vector2(player.position.x, player.paddleHeight / 2.0);
    if (player.paddleBounds.bottom > this.height)
      player.position = new Vector2(player.position.x, this.height - player.paddleHeight / 2.0);
  };
  function Pong$update$verticalDirection(d) {
    return -d * 0.05;
  }
  Pong.prototype.update_14dthe$ = function (dt) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    this.ball.update_14dthe$(dt);
    if (this.ball.position.y - this.ball.radius < 0) {
      this.ball.direction = new Vector2(this.ball.direction.x, -this.ball.direction.y);
      this.ball.position = new Vector2(this.ball.position.x, this.ball.radius + 1.0);
    }
    if (this.ball.position.y + this.ball.radius > this.height) {
      this.ball.direction = new Vector2(this.ball.direction.x, -this.ball.direction.y);
      this.ball.position = new Vector2(this.ball.position.x, this.height - this.ball.radius - 1.0);
    }
    tmp$ = this.left;
    tmp$.position = tmp$.position.plus_hdskun$(Vector2$Companion_getInstance().up.times_14dthe$(this.leftController.direction).times_14dthe$(this.maxPlayerSpeed).times_14dthe$(dt));
    tmp$_0 = this.right;
    tmp$_0.position = tmp$_0.position.plus_hdskun$(Vector2$Companion_getInstance().up.times_14dthe$(this.rightController.direction).times_14dthe$(this.maxPlayerSpeed).times_14dthe$(dt));
    this.contain_0(this.left);
    this.contain_0(this.right);
    var offset = 100.0;
    if (this.ball.position.x < -offset) {
      tmp$_1 = this.right;
      tmp$_1.score = tmp$_1.score + 1 | 0;
      this.ball.direction = Vector2$Companion_getInstance().left;
      this.resetPosition_0(this.ball);
      this.ball.resetSpeed();
    }
    if (this.ball.position.x > this.width + offset) {
      tmp$_2 = this.left;
      tmp$_2.score = tmp$_2.score + 1 | 0;
      this.ball.direction = Vector2$Companion_getInstance().right;
      this.resetPosition_0(this.ball);
      this.ball.resetSpeed();
    }
    var verticalDirection = Pong$update$verticalDirection;
    if (this.leftTurn_0 && this.left.paddleBounds.intersects_i6z3bx$(this.ball.bounds)) {
      this.ball.direction = (new Vector2(1.0, verticalDirection(this.left.position.y - this.ball.position.y))).normalized;
      this.ball.speedUp();
      this.leftTurn_0 = !this.leftTurn_0;
    }
    if (!this.leftTurn_0 && this.ball.bounds.intersects_i6z3bx$(this.right.paddleBounds)) {
      this.ball.direction = (new Vector2(-1.0, verticalDirection(this.right.position.y - this.ball.position.y))).normalized;
      this.ball.speedUp();
      this.leftTurn_0 = !this.leftTurn_0;
    }
  };
  Pong.prototype.draw_48okks$ = function ($receiver) {
    this.c_0.beginPath();
    this.c_0.rect($receiver.left, $receiver.top, $receiver.width, $receiver.height);
    this.c_0.fill();
  };
  Pong.prototype.render = function () {
    this.c_0.save();
    this.c_0.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    this.c_0.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
    this.c_0.restore();
    var middleX = this.width / 2;
    var x = floor(middleX) + 0.5;
    this.c_0.lineWidth = 4.0;
    this.c_0.beginPath();
    this.c_0.setLineDash([5.0, 10.0]);
    this.c_0.lineDashOffset = 10.0;
    this.c_0.moveTo(x, 0.0);
    this.c_0.lineTo(x, this.height);
    this.c_0.stroke();
    this.c_0.strokeStyle = 'white';
    this.c_0.lineWidth = 5.0;
    this.c_0.setLineDash([]);
    this.c_0.beginPath();
    this.c_0.moveTo(0.0, -2.5);
    this.c_0.lineTo(this.width, -2.5);
    this.c_0.stroke();
    this.c_0.beginPath();
    this.c_0.moveTo(0.0, this.height + 2.5);
    this.c_0.lineTo(this.width, this.height + 2.5);
    this.c_0.stroke();
    this.c_0.fillStyle = 'white';
    this.c_0.font = '80px Square';
    this.c_0.textAlign = 'right';
    this.c_0.textBaseline = 'top';
    this.c_0.fillText(this.left.score.toString(), middleX - 40.0, 20.0 - 7.0);
    this.c_0.textAlign = 'left';
    this.c_0.fillText(this.right.score.toString(), middleX + 40.0 - 0.5, 20.0 - 7.0);
    this.c_0.fillStyle = 'white';
    this.draw_48okks$(this.left.paddleBounds);
    this.draw_48okks$(this.right.paddleBounds);
    this.draw_48okks$(this.ball.bounds);
  };
  Pong.prototype.updateSize = function () {
    var dpi = window.devicePixelRatio;
    this.canvas.width = floor(this.canvas.clientWidth * dpi);
    this.canvas.height = floor(this.canvas.clientHeight * dpi);
    var scaleX = this.canvas.width / this.width;
    var scaleY = this.canvas.height / this.height;
    if (scaleX < scaleY)
      this.c_0.setTransform(scaleX, 0.0, 0.0, scaleX, 0.0, floor((this.canvas.height - this.height * scaleX) / 2));
    else
      this.c_0.setTransform(scaleY, 0.0, 0.0, scaleY, floor((this.canvas.width - this.width * scaleY) / 2), 0.0);
  };
  function Pong_init$lambda(this$Pong) {
    return function (it) {
      this$Pong.updateSize();
    };
  }
  Pong.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Pong',
    interfaces: [GameLoop]
  };
  function toRadians($receiver) {
    return $receiver * Math.PI / 180;
  }
  function toDegrees($receiver) {
    return $receiver * 180 / Math.PI;
  }
  function clamp($receiver, min, max) {
    return Math.max(min, Math.min(max, $receiver));
  }
  function floor($receiver) {
    return Math.floor($receiver);
  }
  function round($receiver) {
    return Math.round($receiver);
  }
  function modulo($receiver, m) {
    return ($receiver % m + m | 0) % m;
  }
  function modulo_0($receiver, m) {
    return ($receiver % m + m) % m;
  }
  function sign($receiver) {
    return $receiver > 0 ? 1.0 : $receiver < 0 ? -1.0 : 0.0;
  }
  function nextHighestPowerOf2($receiver) {
    var v = $receiver;
    v = v - 1 | 0;
    v = v | v >> 1;
    v = v | v >> 2;
    v = v | v >> 4;
    v = v | v >> 8;
    v = v | v >> 16;
    v = v + 1 | 0;
    return v;
  }
  function Rectangle2(position, dimensions) {
    this.position = position;
    this.dimensions = dimensions;
  }
  Object.defineProperty(Rectangle2.prototype, 'left', {
    get: function () {
      return this.position.x;
    }
  });
  Object.defineProperty(Rectangle2.prototype, 'top', {
    get: function () {
      return this.position.y;
    }
  });
  Object.defineProperty(Rectangle2.prototype, 'right', {
    get: function () {
      return this.left + this.width;
    }
  });
  Object.defineProperty(Rectangle2.prototype, 'bottom', {
    get: function () {
      return this.top + this.height;
    }
  });
  Object.defineProperty(Rectangle2.prototype, 'width', {
    get: function () {
      return this.dimensions.x;
    }
  });
  Object.defineProperty(Rectangle2.prototype, 'height', {
    get: function () {
      return this.dimensions.y;
    }
  });
  Rectangle2.prototype.intersects_i6z3bx$ = function (r) {
    return this.left < r.right && this.right > r.left && this.top < r.bottom && this.bottom > r.top;
  };
  Rectangle2.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Rectangle2',
    interfaces: []
  };
  function Rectangle2_init(position, width, height, $this) {
    $this = $this || Object.create(Rectangle2.prototype);
    Rectangle2.call($this, position, new Vector2(width, height));
    return $this;
  }
  function Rectangle2_init_0(x, y, width, height, $this) {
    $this = $this || Object.create(Rectangle2.prototype);
    Rectangle2.call($this, new Vector2(x, y), new Vector2(width, height));
    return $this;
  }
  Rectangle2.prototype.component1 = function () {
    return this.position;
  };
  Rectangle2.prototype.component2 = function () {
    return this.dimensions;
  };
  Rectangle2.prototype.copy_7y3lma$ = function (position, dimensions) {
    return new Rectangle2(position === void 0 ? this.position : position, dimensions === void 0 ? this.dimensions : dimensions);
  };
  Rectangle2.prototype.toString = function () {
    return 'Rectangle2(position=' + Kotlin.toString(this.position) + (', dimensions=' + Kotlin.toString(this.dimensions)) + ')';
  };
  Rectangle2.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.position) | 0;
    result = result * 31 + Kotlin.hashCode(this.dimensions) | 0;
    return result;
  };
  Rectangle2.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.position, other.position) && Kotlin.equals(this.dimensions, other.dimensions)))));
  };
  function Vector2(x, y) {
    Vector2$Companion_getInstance();
    if (x === void 0)
      x = 0.0;
    if (y === void 0)
      y = 0.0;
    this.x = x;
    this.y = y;
  }
  function Vector2$Companion() {
    Vector2$Companion_instance = this;
    this.zero = new Vector2();
    this.up = new Vector2(0.0, 1.0);
    this.down = this.up.unaryMinus();
    this.right = new Vector2(1.0, 0.0);
    this.left = this.right.unaryMinus();
  }
  Vector2$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector2$Companion_instance = null;
  function Vector2$Companion_getInstance() {
    if (Vector2$Companion_instance === null) {
      new Vector2$Companion();
    }
    return Vector2$Companion_instance;
  }
  Object.defineProperty(Vector2.prototype, 'lengthSquared', {
    get: function () {
      return this.x * this.x + this.y * this.y;
    }
  });
  Object.defineProperty(Vector2.prototype, 'length', {
    get: function () {
      return Math.sqrt(this.lengthSquared);
    }
  });
  Object.defineProperty(Vector2.prototype, 'normalized', {
    get: function () {
      return this.div_14dthe$(this.length);
    }
  });
  Object.defineProperty(Vector2.prototype, 'angle', {
    get: function () {
      var angle = Math.atan2(this.y, this.x);
      if (angle < 0)
        angle += 2 * Math.PI;
      return angle;
    }
  });
  Vector2.prototype.plus_hdskun$ = function (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  };
  Vector2.prototype.unaryMinus = function () {
    return new Vector2(-this.x, -this.y);
  };
  Vector2.prototype.minus_hdskun$ = function (v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  };
  Vector2.prototype.times_14dthe$ = function (s) {
    return new Vector2(this.x * s, this.y * s);
  };
  Vector2.prototype.div_14dthe$ = function (s) {
    return new Vector2(this.x / s, this.y / s);
  };
  Vector2.prototype.toString = function () {
    return '[ ' + this.x + ', ' + this.y + ' ]';
  };
  Vector2.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'Vector2',
    interfaces: []
  };
  Vector2.prototype.component1 = function () {
    return this.x;
  };
  Vector2.prototype.component2 = function () {
    return this.y;
  };
  Vector2.prototype.copy_lu1900$ = function (x, y) {
    return new Vector2(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Vector2.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Vector2.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  var package$pl = _.pl || (_.pl = {});
  var package$dzduniak = package$pl.dzduniak || (package$pl.dzduniak = {});
  var package$pong = package$dzduniak.pong || (package$dzduniak.pong = {});
  package$pong.AIController = AIController;
  package$pong.Ball = Ball;
  package$pong.Controller = Controller;
  package$pong.EmptyController = EmptyController;
  package$pong.GameLoop = GameLoop;
  package$pong.KeyboardController = KeyboardController;
  package$pong.main_kand9s$ = main;
  package$pong.Player = Player;
  package$pong.Pong = Pong;
  var package$math = package$pong.math || (package$pong.math = {});
  package$math.toRadians_yrwdxr$ = toRadians;
  package$math.toDegrees_yrwdxr$ = toDegrees;
  package$math.clamp_nig4hr$ = clamp;
  package$math.floor_yrwdxr$ = floor;
  package$math.round_yrwdxr$ = round;
  package$math.modulo_dqglrj$ = modulo;
  package$math.modulo_38ydlf$ = modulo_0;
  package$math.sign_yrwdxr$ = sign;
  package$math.nextHighestPowerOf2_s8ev3n$ = nextHighestPowerOf2;
  package$math.Rectangle2_init_35p5fx$ = Rectangle2_init;
  package$math.Rectangle2_init_6y0v78$ = Rectangle2_init_0;
  package$math.Rectangle2 = Rectangle2;
  Object.defineProperty(Vector2, 'Companion', {
    get: Vector2$Companion_getInstance
  });
  package$math.Vector2 = Vector2;
  main([]);
  Kotlin.defineModule('Pong', _);
  return _;
}(typeof Pong === 'undefined' ? {} : Pong, kotlin);
