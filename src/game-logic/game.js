const Deck = require('./deck')
const Player = require('./player')
const Dealer = require('./dealer')

class Game {
    constructor() {
        this._startingGameState();
    }

    _startingGameState() {
        this.player = new Player();
        this.dealer = new Dealer();
        this.result = null;
        this.deck = new Deck();
        this.deck.shuffle();
    }

    startGame() {
        this._startingGameState();
        this.dealFirstHand();
    }

    dealFirstHand() {
        this.player.takeCard(...this.deck.deal(2))
        this.dealer.takeCard(...this.deck.deal(2))
    }

    hit(player) {

        const playerName = player.name.toLowerCase()

        if (player === this.dealer) {
            while (player.needsToDraw()) {
                player.takeCard(...this.deck.deal(1))
            }
        } else {
            player.takeCard(...this.deck.deal(1))
        }
        if (player.hand.isBust()) {
            this.result = `${playerName}_bust`
        }
    }

    stand(player) {
        if (player === this.player) {
            this.hit(this.dealer)
        }
        this.calculateWinner()
    }

    calculateWinner() {
        const playerScore = this.player.getScore()
        const dealerScore = this.dealer.getScore()
    
        if (playerScore > dealerScore) {
            this.result = "player_wins"
        } else if (playerScore < dealerScore) {
            this.result = "dealer_wins"
        } else {
            this.result = "tie"
        }
    }

}

module.exports = Game