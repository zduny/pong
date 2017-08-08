package pl.dzduniak.pong.math

import pl.dzduniak.pong.math.Vector2

data class Rectangle2(val position: Vector2, val dimensions: Vector2) {
    constructor(position: Vector2, width: Double, height: Double) : this(position, Vector2(width, height))
    constructor(x: Double, y: Double, width: Double, height: Double) : this(Vector2(x, y), Vector2(width, height))

    val left: Double
        get() = position.x
    val top: Double
        get() = position.y
    val right: Double
        get() = left + width
    val bottom: Double
        get() = top + height
    val width: Double
        get() = dimensions.x
    val height: Double
        get() = dimensions.y

    fun intersects(r: Rectangle2) =
            (this.left < r.right && this.right > r.left && this.top < r.bottom && this.bottom > r.top)
}