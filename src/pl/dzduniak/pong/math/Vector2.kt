package pl.dzduniak.pong.math

import kotlin.js.Math

data class Vector2(val x: Double = 0.0, val y: Double = 0.0) {
    companion object {
        val zero = Vector2()
        val up = Vector2(.0, 1.0)
        val down = -up
        val right = Vector2(1.0, .0)
        val left = -right
    }

    val lengthSquared: Double
        get() = x * x + y * y
    val length: Double
        get() = Math.sqrt(lengthSquared)
    val normalized: Vector2
        get() = this / length
    val angle: Double
        get() {
            var angle = Math.atan2(this.y, this.x)
            if (angle < 0) angle += 2 * Math.PI
            return angle
        }

    operator fun plus(v: Vector2) = Vector2(x + v.x, y + v.y)
    operator fun unaryMinus() = Vector2(-x, -y)
    operator fun minus(v: Vector2) = Vector2(x - v.x, y - v.y)
    operator fun times(s: Double) = Vector2(x * s, y * s)
    operator fun div(s: Double) = Vector2(x / s, y / s)

    override fun toString(): String {
        return "[ $x, $y ]"
    }
}
