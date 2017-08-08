package pl.dzduniak.pong

abstract class Controller(val game: Pong, val player: Player) {
    abstract val direction: Double
}