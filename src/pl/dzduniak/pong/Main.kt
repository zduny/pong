package pl.dzduniak.pong

import org.w3c.dom.*
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.js.Math

fun main(args: Array<String>) {
    val canvas = document.getElementById("canvas") as HTMLCanvasElement
    val c = canvas.getContext("2d") as CanvasRenderingContext2D

    val width = 800.0
    val height = 600.0
    val paddleOffset = 20.0
    val paddleHeight = 60.0
    val paddleHalfHeight = paddleHeight / 2
    val paddleWidth = 12.0
    val maxSpeed = 1000.0

    var scoreLeft = 0
    var scoreRight = 0

    var positionLeft = height / 2
    var positionRight = height / 2
    var speedLeft = 0.0
    var speedRight = 0.0

    var downPressed = false
    var upPressed = false

    val ballRadius = 7.5
    var ballPosition = Vector2(width / 2, height / 2)
    var ballDirection = Vector2.left
    val ballInitialSpeed = 400.0
    var ballSpeed = ballInitialSpeed
    val speedUpFactor = 1.05
    var leftTurn = true

    fun updateSize() {
        val dpi = window.devicePixelRatio

        canvas.width = (canvas.clientWidth * dpi).floor()
        canvas.height = (canvas.clientHeight * dpi).floor()

        val scaleX = canvas.width / width
        val scaleY = canvas.height / height
        if (scaleX < scaleY)
            c.setTransform(scaleX, 0.0, 0.0, scaleX, 0.0, ((canvas.height - height * scaleX) / 2).floor().toDouble())
        else
            c.setTransform(scaleY, 0.0, 0.0, scaleY, ((canvas.width - width * scaleY) / 2).floor().toDouble(), 0.0)
    }

    val game = object : GameLoop() {
        override fun render() {
            c.save();
            c.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
            c.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
            c.restore()

            c.strokeStyle = "white"
            c.lineWidth = 5.0
            c.setLineDash(arrayOf<Double>());
            c.beginPath()
            c.moveTo(0.0, -2.5)
            c.lineTo(width, -2.5)
            c.stroke()

            c.beginPath()
            c.moveTo(0.0, height + 2.5)
            c.lineTo(width, height + 2.5)
            c.stroke()

            val middleX = width / 2
            val x = middleX.floor() + .5
            c.lineWidth = 4.0
            c.beginPath();
            c.setLineDash(arrayOf(5.0, 10.0));
            c.lineDashOffset = 10.0
            c.moveTo(x, 0.0);
            c.lineTo(x, height);
            c.stroke();

            c.fillStyle = "white"
            c.font = "90px Square"
            c.textAlign = CanvasTextAlign.RIGHT
            c.textBaseline = CanvasTextBaseline.TOP
            c.fillText(scoreLeft.toString(), middleX - 40.0, 20.0 - 7.0)
            c.textAlign = CanvasTextAlign.LEFT
            c.fillText(scoreRight.toString(), middleX + 40.0 - 0.5, 20.0 - 7.0)

            c.fillStyle = "white"
            c.beginPath()
            c.rect(paddleOffset, positionLeft - paddleHalfHeight, paddleWidth, paddleHeight)
            c.fill()

            c.beginPath()
            c.rect(width - paddleOffset - paddleWidth, positionRight - paddleHalfHeight, paddleWidth, paddleHeight)
            c.fill()

            c.beginPath()
            c.rect(ballPosition.x - ballRadius, ballPosition.y - ballRadius, ballRadius * 2, ballRadius * 2)
            c.fill()
        }

        private fun sign(v: Double) = if (v > 0) 1.0 else if (v < 0) -1.0 else 0.0

        private fun calculateSpeed(currentSpeed: Double, direction: Double, dt: Double, max: Double = maxSpeed): Double {
            var speed = currentSpeed

            val d = 4000.0 * dt
            if (sign(direction) != sign(speed))
                speed *= .9
            speed += d * direction

            speed = speed.clamp(-max, max)

            return speed
        }

        private fun boundPlayers(position: Double, speed: Double): Pair<Double, Double> {
            if (position - paddleHalfHeight < 0)
                return Pair(paddleHalfHeight, 0.0)

            if (position + paddleHalfHeight > height)
                return Pair(height - paddleHalfHeight, 0.0)

            return Pair(position, speed)
        }

        override fun update(dt: Double) {
            // Players
            var directionLeft = 0.0
            if (downPressed)
                directionLeft += 1
            if (upPressed)
                directionLeft -= 1

            speedLeft = calculateSpeed(speedLeft, directionLeft, dt)
            positionLeft += speedLeft * dt

            speedRight = calculateSpeed(speedRight, sign(ballPosition.y - positionRight), dt, maxSpeed / 2)
            positionRight += speedRight * dt

            val (position1, speed1) = boundPlayers(positionLeft, speedLeft)
            positionLeft = position1
            speedLeft = speed1

            val (position2, speed2) = boundPlayers(positionRight, speedRight)
            positionRight = position2
            speedRight = speed2

            // Ball
            ballPosition += ballDirection * ballSpeed * dt


            // Scoring
            val offset = 100.0
            if (ballPosition.x < -offset) {
                scoreRight += 1
                ballPosition = Vector2(width / 2, height / 2)
                ballDirection = Vector2.left
                ballSpeed = ballInitialSpeed
            }

            if (ballPosition.x > width + offset) {
                scoreLeft += 1
                ballPosition = Vector2(width / 2, height / 2)
                ballDirection = Vector2.right
                ballSpeed = ballInitialSpeed
            }

            // Collisions
            fun verticalDirection(d: Double) = -d * .08

            if ((ballPosition.x - ballRadius < paddleOffset + paddleWidth) &&
                    (ballPosition.x + ballRadius > paddleOffset) &&
                    (ballPosition.y > positionLeft - paddleHalfHeight - ballRadius) &&
                    (ballPosition.y < positionLeft + paddleHalfHeight + ballRadius) && leftTurn) {
                ballDirection = Vector2(1.0, verticalDirection(positionLeft - ballPosition.y)).normalized
                ballSpeed *= speedUpFactor
                leftTurn = !leftTurn
            }

            if ((ballPosition.x + ballRadius > width - (paddleOffset + paddleWidth)) &&
                    (ballPosition.x - ballRadius < width - paddleOffset) &&
                    (ballPosition.y > positionRight - paddleHalfHeight - ballRadius) &&
                    (ballPosition.y < positionRight + paddleHalfHeight + ballRadius) && !leftTurn) {
                ballDirection = Vector2(-1.0, verticalDirection(positionRight - ballPosition.y)).normalized
                ballSpeed *= speedUpFactor
                leftTurn = !leftTurn
            }

            if (ballPosition.y - ballRadius < 0) {
                ballDirection = Vector2(ballDirection.x, -ballDirection.y)
                ballPosition = Vector2(ballPosition.x, -ballPosition.y + ballRadius)
            }

            if (ballPosition.y + ballRadius > height) {
                ballDirection = Vector2(ballDirection.x, -ballDirection.y)
                ballPosition = Vector2(ballPosition.x, height - (ballPosition.y - height) - ballRadius)
            }
        }
    }

    updateSize()
    window.addEventListener("resize", {
        updateSize()
    })

    window.addEventListener("keydown", {
        it as KeyboardEvent

        when (it.key) {
            "ArrowDown" -> downPressed = true
            "ArrowUp" -> upPressed = true
        }
    })

    window.addEventListener("keyup", {
        it as KeyboardEvent

        when (it.key) {
            "ArrowDown" -> downPressed = false
            "ArrowUp" -> upPressed = false
        }
    })

    game.start()
}