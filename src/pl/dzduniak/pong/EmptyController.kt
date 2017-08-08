package pl.dzduniak.pong

class EmptyController(game: Pong, player: Player) : Controller(game, player) {
    override val direction: Double
        get() = 0.0
}
