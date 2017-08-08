package pl.dzduniak.pong

import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document

fun main(args: Array<String>) {
    val canvas = document.getElementById("canvas") as HTMLCanvasElement
    val game = Pong(canvas)
    game.leftController = KeyboardController(game, game.left)
    game.rightController = AIController(game, game.right)
    game.start()
}