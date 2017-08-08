package pl.dzduniak.pong

import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.window

class KeyboardController(game: Pong, player: Player) : Controller(game, player) {
    private var downPressed = false
    private var upPressed = false

    override val direction: Double
        get() {
            var dir = 0.0
            if (downPressed) dir += 1.0
            if (upPressed) dir -= 1.0

            return dir
        }

    init {
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
    }
}
