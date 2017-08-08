package pl.dzduniak.pong

import pl.dzduniak.pong.math.Rectangle2
import pl.dzduniak.pong.math.Vector2

class Ball(var position: Vector2, var direction: Vector2 = Vector2.left, val radius: Double = 8.0,
           val initialSpeed: Double = 400.0, val speedUpFactor: Double = 1.05) {
    var speed = initialSpeed
    val bounds: Rectangle2
        get() = Rectangle2(position - Vector2(radius, radius), 2 * radius, 2 * radius)

    fun update(dt: Double) {
        position += direction * speed * dt
    }

    fun speedUp() {
        speed *= speedUpFactor
    }

    fun resetSpeed() {
        speed = initialSpeed
    }
}
