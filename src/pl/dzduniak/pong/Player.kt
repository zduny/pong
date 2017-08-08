package pl.dzduniak.pong

import pl.dzduniak.pong.math.Rectangle2
import pl.dzduniak.pong.math.Vector2

class Player(var position: Vector2, var score: Int = 0,
             val paddleHeight: Double = 60.0, val paddleWidth: Double = 11.0) {
    private val halfHeight = paddleHeight / 2
    private val halfWidth = paddleWidth / 2

    val paddleBounds: Rectangle2
        get() = Rectangle2(position + Vector2(-halfWidth, -halfHeight), paddleWidth, paddleHeight)
}
