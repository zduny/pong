package pl.dzduniak.pong;

import pl.dzduniak.pong.math.clamp
import kotlin.browser.window

abstract class GameLoop() {
    var paused = true
        private set

    abstract fun update(dt: Double)
    abstract fun render()

    private var previousTime = 0.0
    private fun loop(time: Double) {
        if (paused)
            return

        window.requestAnimationFrame { loop(it) }
        val dt = ((time - previousTime) / 1000).clamp(0.0, .5)
        update(dt)
        render()
        previousTime = time
    }

    fun start() {
        paused = false
        loop(0.0)
    }

    fun stop() {
        paused = true
    }
}