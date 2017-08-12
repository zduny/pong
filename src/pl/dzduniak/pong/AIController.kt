package pl.dzduniak.pong

import pl.dzduniak.pong.math.clamp
import kotlin.js.Math

class AIController(val game: Pong, val player: Player) : Controller() {
    override val direction: Double
        get() {
            val d = game.ball.position.y - player.position.y
            val m = (Math.abs(d) / game.maxPlayerSpeed * d).clamp(-1.0, 1.0)

            return m * .8;
        }
}
