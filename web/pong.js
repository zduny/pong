if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Pong'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Pong'.");
}
var Pong = function (_, Kotlin) {
  'use strict';
  var Pair = Kotlin.kotlin.Pair;
  main$ObjectLiteral.prototype = Object.create(GameLoop.prototype);
  main$ObjectLiteral.prototype.constructor = main$ObjectLiteral;
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
  function main$updateSize(closure$canvas, closure$width, closure$height, closure$c) {
    return function () {
      var dpi = window.devicePixelRatio;
      closure$canvas.width = floor(closure$canvas.clientWidth * dpi);
      closure$canvas.height = floor(closure$canvas.clientHeight * dpi);
      var scaleX = closure$canvas.width / closure$width;
      var scaleY = closure$canvas.height / closure$height;
      if (scaleX < scaleY)
        closure$c.setTransform(scaleX, 0.0, 0.0, scaleX, 0.0, floor((closure$canvas.height - closure$height * scaleX) / 2));
      else
        closure$c.setTransform(scaleY, 0.0, 0.0, scaleY, floor((closure$canvas.width - closure$width * scaleY) / 2), 0.0);
    };
  }
  function main$ObjectLiteral(closure$c, closure$canvas, closure$width, closure$height, closure$scoreLeft, closure$scoreRight, closure$paddleOffset, closure$positionLeft, closure$paddleHalfHeight, closure$paddleWidth, closure$paddleHeight, closure$positionRight, closure$ballPosition, closure$ballRadius, closure$maxSpeed, closure$downPressed, closure$upPressed, closure$speedLeft, closure$speedRight, closure$ballDirection, closure$ballSpeed, closure$ballInitialSpeed, closure$leftTurn, closure$speedUpFactor) {
    this.closure$c = closure$c;
    this.closure$canvas = closure$canvas;
    this.closure$width = closure$width;
    this.closure$height = closure$height;
    this.closure$scoreLeft = closure$scoreLeft;
    this.closure$scoreRight = closure$scoreRight;
    this.closure$paddleOffset = closure$paddleOffset;
    this.closure$positionLeft = closure$positionLeft;
    this.closure$paddleHalfHeight = closure$paddleHalfHeight;
    this.closure$paddleWidth = closure$paddleWidth;
    this.closure$paddleHeight = closure$paddleHeight;
    this.closure$positionRight = closure$positionRight;
    this.closure$ballPosition = closure$ballPosition;
    this.closure$ballRadius = closure$ballRadius;
    this.closure$maxSpeed = closure$maxSpeed;
    this.closure$downPressed = closure$downPressed;
    this.closure$upPressed = closure$upPressed;
    this.closure$speedLeft = closure$speedLeft;
    this.closure$speedRight = closure$speedRight;
    this.closure$ballDirection = closure$ballDirection;
    this.closure$ballSpeed = closure$ballSpeed;
    this.closure$ballInitialSpeed = closure$ballInitialSpeed;
    this.closure$leftTurn = closure$leftTurn;
    this.closure$speedUpFactor = closure$speedUpFactor;
    GameLoop.call(this);
  }
  main$ObjectLiteral.prototype.render = function () {
    this.closure$c.save();
    this.closure$c.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    this.closure$c.clearRect(0.0, 0.0, this.closure$canvas.width, this.closure$canvas.height);
    this.closure$c.restore();
    this.closure$c.strokeStyle = 'white';
    this.closure$c.lineWidth = 5.0;
    this.closure$c.setLineDash([]);
    this.closure$c.beginPath();
    this.closure$c.moveTo(0.0, -2.5);
    this.closure$c.lineTo(this.closure$width, -2.5);
    this.closure$c.stroke();
    this.closure$c.beginPath();
    this.closure$c.moveTo(0.0, this.closure$height + 2.5);
    this.closure$c.lineTo(this.closure$width, this.closure$height + 2.5);
    this.closure$c.stroke();
    var middleX = this.closure$width / 2;
    var x = floor(middleX) + 0.5;
    this.closure$c.lineWidth = 4.0;
    this.closure$c.beginPath();
    this.closure$c.setLineDash([5.0, 10.0]);
    this.closure$c.lineDashOffset = 10.0;
    this.closure$c.moveTo(x, 0.0);
    this.closure$c.lineTo(x, this.closure$height);
    this.closure$c.stroke();
    this.closure$c.fillStyle = 'white';
    this.closure$c.font = '90px Square';
    this.closure$c.textAlign = 'right';
    this.closure$c.textBaseline = 'top';
    this.closure$c.fillText(this.closure$scoreLeft.v.toString(), middleX - 40.0, 20.0 - 7.0);
    this.closure$c.textAlign = 'left';
    this.closure$c.fillText(this.closure$scoreRight.v.toString(), middleX + 40.0 - 0.5, 20.0 - 7.0);
    this.closure$c.fillStyle = 'white';
    this.closure$c.beginPath();
    this.closure$c.rect(this.closure$paddleOffset, this.closure$positionLeft.v - this.closure$paddleHalfHeight, this.closure$paddleWidth, this.closure$paddleHeight);
    this.closure$c.fill();
    this.closure$c.beginPath();
    this.closure$c.rect(this.closure$width - this.closure$paddleOffset - this.closure$paddleWidth, this.closure$positionRight.v - this.closure$paddleHalfHeight, this.closure$paddleWidth, this.closure$paddleHeight);
    this.closure$c.fill();
    this.closure$c.beginPath();
    this.closure$c.rect(this.closure$ballPosition.v.x - this.closure$ballRadius, this.closure$ballPosition.v.y - this.closure$ballRadius, this.closure$ballRadius * 2, this.closure$ballRadius * 2);
    this.closure$c.fill();
  };
  main$ObjectLiteral.prototype.sign_0 = function (v) {
    return v > 0 ? 1.0 : v < 0 ? -1.0 : 0.0;
  };
  main$ObjectLiteral.prototype.calculateSpeed_0 = function (currentSpeed, direction, dt, max) {
    if (max === void 0)
      max = this.closure$maxSpeed;
    var speed = currentSpeed;
    var d = 4000.0 * dt;
    if (this.sign_0(direction) !== this.sign_0(speed))
      speed *= 0.9;
    speed += d * direction;
    speed = clamp(speed, -max, max);
    return speed;
  };
  main$ObjectLiteral.prototype.boundPlayers_0 = function (position, speed) {
    if (position - this.closure$paddleHalfHeight < 0)
      return new Pair(this.closure$paddleHalfHeight, 0.0);
    if (position + this.closure$paddleHalfHeight > this.closure$height)
      return new Pair(this.closure$height - this.closure$paddleHalfHeight, 0.0);
    return new Pair(position, speed);
  };
  function main$ObjectLiteral$update$verticalDirection(d) {
    return -d * 0.08;
  }
  main$ObjectLiteral.prototype.update_14dthe$ = function (dt) {
    var directionLeft = 0.0;
    if (this.closure$downPressed.v)
      directionLeft += 1;
    if (this.closure$upPressed.v)
      directionLeft -= 1;
    this.closure$speedLeft.v = this.calculateSpeed_0(this.closure$speedLeft.v, directionLeft, dt);
    this.closure$positionLeft.v += this.closure$speedLeft.v * dt;
    this.closure$speedRight.v = this.calculateSpeed_0(this.closure$speedRight.v, this.sign_0(this.closure$ballPosition.v.y - this.closure$positionRight.v), dt, this.closure$maxSpeed / 2);
    this.closure$positionRight.v += this.closure$speedRight.v * dt;
    var tmp$ = this.boundPlayers_0(this.closure$positionLeft.v, this.closure$speedLeft.v);
    var position1 = tmp$.component1()
    , speed1 = tmp$.component2();
    this.closure$positionLeft.v = position1;
    this.closure$speedLeft.v = speed1;
    var tmp$_0 = this.boundPlayers_0(this.closure$positionRight.v, this.closure$speedRight.v);
    var position2 = tmp$_0.component1()
    , speed2 = tmp$_0.component2();
    this.closure$positionRight.v = position2;
    this.closure$speedRight.v = speed2;
    this.closure$ballPosition.v = this.closure$ballPosition.v.plus_qu6wix$(this.closure$ballDirection.v.times_14dthe$(this.closure$ballSpeed.v).times_14dthe$(dt));
    var offset = 100.0;
    if (this.closure$ballPosition.v.x < -offset) {
      this.closure$scoreRight.v = this.closure$scoreRight.v + 1 | 0;
      this.closure$ballPosition.v = new Vector2(this.closure$width / 2, this.closure$height / 2);
      this.closure$ballDirection.v = Vector2$Companion_getInstance().left;
      this.closure$ballSpeed.v = this.closure$ballInitialSpeed;
    }
    if (this.closure$ballPosition.v.x > this.closure$width + offset) {
      this.closure$scoreLeft.v = this.closure$scoreLeft.v + 1 | 0;
      this.closure$ballPosition.v = new Vector2(this.closure$width / 2, this.closure$height / 2);
      this.closure$ballDirection.v = Vector2$Companion_getInstance().right;
      this.closure$ballSpeed.v = this.closure$ballInitialSpeed;
    }
    var verticalDirection = main$ObjectLiteral$update$verticalDirection;
    if (this.closure$ballPosition.v.x - this.closure$ballRadius < this.closure$paddleOffset + this.closure$paddleWidth && this.closure$ballPosition.v.x + this.closure$ballRadius > this.closure$paddleOffset && this.closure$ballPosition.v.y > this.closure$positionLeft.v - this.closure$paddleHalfHeight - this.closure$ballRadius && this.closure$ballPosition.v.y < this.closure$positionLeft.v + this.closure$paddleHalfHeight + this.closure$ballRadius && this.closure$leftTurn.v) {
      this.closure$ballDirection.v = (new Vector2(1.0, verticalDirection(this.closure$positionLeft.v - this.closure$ballPosition.v.y))).normalized;
      this.closure$ballSpeed.v *= this.closure$speedUpFactor;
      this.closure$leftTurn.v = !this.closure$leftTurn.v;
    }
    if (this.closure$ballPosition.v.x + this.closure$ballRadius > this.closure$width - (this.closure$paddleOffset + this.closure$paddleWidth) && this.closure$ballPosition.v.x - this.closure$ballRadius < this.closure$width - this.closure$paddleOffset && this.closure$ballPosition.v.y > this.closure$positionRight.v - this.closure$paddleHalfHeight - this.closure$ballRadius && this.closure$ballPosition.v.y < this.closure$positionRight.v + this.closure$paddleHalfHeight + this.closure$ballRadius && !this.closure$leftTurn.v) {
      this.closure$ballDirection.v = (new Vector2(-1.0, verticalDirection(this.closure$positionRight.v - this.closure$ballPosition.v.y))).normalized;
      this.closure$ballSpeed.v *= this.closure$speedUpFactor;
      this.closure$leftTurn.v = !this.closure$leftTurn.v;
    }
    if (this.closure$ballPosition.v.y - this.closure$ballRadius < 0) {
      this.closure$ballDirection.v = new Vector2(this.closure$ballDirection.v.x, -this.closure$ballDirection.v.y);
      this.closure$ballPosition.v = new Vector2(this.closure$ballPosition.v.x, -this.closure$ballPosition.v.y + this.closure$ballRadius);
    }
    if (this.closure$ballPosition.v.y + this.closure$ballRadius > this.closure$height) {
      this.closure$ballDirection.v = new Vector2(this.closure$ballDirection.v.x, -this.closure$ballDirection.v.y);
      this.closure$ballPosition.v = new Vector2(this.closure$ballPosition.v.x, this.closure$height - (this.closure$ballPosition.v.y - this.closure$height) - this.closure$ballRadius);
    }
  };
  main$ObjectLiteral.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    interfaces: [GameLoop]
  };
  function main$lambda(closure$updateSize) {
    return function (it) {
      closure$updateSize();
    };
  }
  function main$lambda_0(closure$downPressed, closure$upPressed) {
    return function (it) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
      tmp$_0 = it.key;
      if (Kotlin.equals(tmp$_0, 'ArrowDown'))
        closure$downPressed.v = true;
      else if (Kotlin.equals(tmp$_0, 'ArrowUp'))
        closure$upPressed.v = true;
    };
  }
  function main$lambda_1(closure$downPressed, closure$upPressed) {
    return function (it) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = it, KeyboardEvent) ? tmp$ : Kotlin.throwCCE();
      tmp$_0 = it.key;
      if (Kotlin.equals(tmp$_0, 'ArrowDown'))
        closure$downPressed.v = false;
      else if (Kotlin.equals(tmp$_0, 'ArrowUp'))
        closure$upPressed.v = false;
    };
  }
  function main(args) {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    var c = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : Kotlin.throwCCE();
    var width = 800.0;
    var height = 600.0;
    var paddleOffset = 20.0;
    var paddleHeight = 60.0;
    var paddleHalfHeight = paddleHeight / 2;
    var paddleWidth = 12.0;
    var maxSpeed = 1000.0;
    var scoreLeft = {v: 0};
    var scoreRight = {v: 0};
    var positionLeft = {v: height / 2};
    var positionRight = {v: height / 2};
    var speedLeft = {v: 0.0};
    var speedRight = {v: 0.0};
    var downPressed = {v: false};
    var upPressed = {v: false};
    var ballRadius = 7.5;
    var ballPosition = {v: new Vector2(width / 2, height / 2)};
    var ballDirection = {v: Vector2$Companion_getInstance().left};
    var ballInitialSpeed = 400.0;
    var ballSpeed = {v: ballInitialSpeed};
    var speedUpFactor = 1.05;
    var leftTurn = {v: true};
    var updateSize = main$updateSize(canvas, width, height, c);
    var game = new main$ObjectLiteral(c, canvas, width, height, scoreLeft, scoreRight, paddleOffset, positionLeft, paddleHalfHeight, paddleWidth, paddleHeight, positionRight, ballPosition, ballRadius, maxSpeed, downPressed, upPressed, speedLeft, speedRight, ballDirection, ballSpeed, ballInitialSpeed, leftTurn, speedUpFactor);
    updateSize();
    window.addEventListener('resize', main$lambda(updateSize));
    window.addEventListener('keydown', main$lambda_0(downPressed, upPressed));
    window.addEventListener('keyup', main$lambda_1(downPressed, upPressed));
    game.start();
  }
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
  Vector2.prototype.plus_qu6wix$ = function (v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  };
  Vector2.prototype.unaryMinus = function () {
    return new Vector2(-this.x, -this.y);
  };
  Vector2.prototype.minus_qu6wix$ = function (v) {
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
  package$pong.GameLoop = GameLoop;
  package$pong.main_kand9s$ = main;
  package$pong.toRadians_yrwdxr$ = toRadians;
  package$pong.toDegrees_yrwdxr$ = toDegrees;
  package$pong.clamp_nig4hr$ = clamp;
  package$pong.floor_yrwdxr$ = floor;
  package$pong.round_yrwdxr$ = round;
  package$pong.modulo_dqglrj$ = modulo;
  package$pong.modulo_38ydlf$ = modulo_0;
  package$pong.nextHighestPowerOf2_s8ev3n$ = nextHighestPowerOf2;
  Object.defineProperty(Vector2, 'Companion', {
    get: Vector2$Companion_getInstance
  });
  package$pong.Vector2 = Vector2;
  main([]);
  Kotlin.defineModule('Pong', _);
  return _;
}(typeof Pong === 'undefined' ? {} : Pong, kotlin);
