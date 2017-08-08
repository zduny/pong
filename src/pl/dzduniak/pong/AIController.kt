package pl.dzduniak.pong

import pl.dzduniak.pong.math.clamp
import pl.dzduniak.pong.math.sign
import kotlin.js.Math

class AIController(game: Pong, player: Player) : Controller(game, player) {
    override val direction: Double
        get() {
            val d = game.ball.position.y - player.position.y
            val m = (Math.abs(d) / game.maxPlayerSpeed * d).clamp(-1.0, 1.0)

            return m;
        }
}
