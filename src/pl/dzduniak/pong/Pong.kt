package pl.dzduniak.pong

import org.w3c.dom.*
import pl.dzduniak.pong.math.Rectangle2
import pl.dzduniak.pong.math.Vector2
import pl.dzduniak.pong.math.floor
import kotlin.browser.window
import kotlin.js.Math

class Pong(val canvas: HTMLCanvasElement, val width: Double = 800.0, val height: Double = 600.0) : GameLoop() {
    private val c = canvas.getContext("2d") as CanvasRenderingContext2D
    private val middle = Vector2(width, height) / 2.0
    private var leftTurn = true

    var playerOffset = 20.0

    var maxPlayerSpeed = 600.0

    val left = Player(Vector2(playerOffset, height / 2.0))
    val right = Player(Vector2(width - playerOffset, height / 2.0))
    val ball = Ball(Vector2.zero)

    var leftController: Controller = EmptyController()
    var rightController: Controller = EmptyController()

    private fun randomVector() = Vector2(Math.random() - .5, Math.random() - .5)

    private fun Ball.resetPosition() {
        this.position = middle + randomVector()
    }

    private fun contain(player: Player) {
        if (player.paddleBounds.top < 0)
            player.position = Vector2(player.position.x, player.paddleHeight / 2.0)

        if (player.paddleBounds.bottom > height)
            player.position = Vector2(player.position.x, height - player.paddleHeight / 2.0)
    }

    override fun update(dt: Double) {
        // Ball position update and resolving collisions with boundaries
        ball.update(dt)

        if (ball.position.y - ball.radius < 0) {
            ball.direction = Vector2(ball.direction.x, -ball.direction.y)
            ball.position = Vector2(ball.position.x, ball.radius + 1.0)
        }

        if (ball.position.y + ball.radius > height) {
            ball.direction = Vector2(ball.direction.x, -ball.direction.y)
            ball.position = Vector2(ball.position.x, height -ball.radius - 1.0)
        }

        // Players
        left.position += Vector2.up * leftController.direction * maxPlayerSpeed * dt
        right.position += Vector2.up * rightController.direction * maxPlayerSpeed * dt
        contain(left)
        contain(right)

        // Scoring
        val offset = 100.0
        if (ball.position.x < -offset) {
            right.score += 1
            ball.direction = Vector2.left
            ball.resetPosition()
            ball.resetSpeed()
        }

        if (ball.position.x > width + offset) {
            left.score += 1
            ball.direction = Vector2.right
            ball.resetPosition()
            ball.resetSpeed()
        }

        // Resolving ball with paddles collisions
        fun verticalDirection(d: Double) = -d * .05

        if (leftTurn && left.paddleBounds.intersects(ball.bounds)) {
            ball.direction = Vector2(1.0, verticalDirection(left.position.y - ball.position.y)).normalized
            ball.speedUp()
            leftTurn = !leftTurn
        }

        if (!leftTurn && ball.bounds.intersects(right.paddleBounds)) {
            ball.direction = Vector2(-1.0, verticalDirection(right.position.y - ball.position.y)).normalized
            ball.speedUp()
            leftTurn = !leftTurn
        }
    }

    fun Rectangle2.draw() {
        c.beginPath()
        c.rect(this.left, this.top, this.width, this.height)
        c.fill()
    }

    override fun render() {
        // Clearing screen
        c.save();
        c.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
        c.clearRect(0.0, 0.0, canvas.width.toDouble(), canvas.height.toDouble())
        c.restore()

        // Middle line
        val middleX = width / 2
        val x = middleX.floor() + .5
        c.lineWidth = 4.0
        c.beginPath();
        c.setLineDash(arrayOf(5.0, 10.0));
        c.lineDashOffset = 10.0
        c.moveTo(x, 0.0);
        c.lineTo(x, height);
        c.stroke();

        // Top and bottom lines
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

        // Scores
        c.fillStyle = "white"
        c.font = "80px Square"
        c.textAlign = CanvasTextAlign.RIGHT
        c.textBaseline = CanvasTextBaseline.TOP
        c.fillText(left.score.toString(), middleX - 40.0, 20.0 - 7.0)
        c.textAlign = CanvasTextAlign.LEFT
        c.fillText(right.score.toString(), middleX + 40.0 - 0.5, 20.0 - 7.0)

        // Paddles
        c.fillStyle = "white"
        left.paddleBounds.draw()
        right.paddleBounds.draw()

        // Ball
        ball.bounds.draw()
    }

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

    init {
        updateSize()
        ball.resetPosition()
        window.addEventListener("resize", {
            updateSize()
        })
    }
}
