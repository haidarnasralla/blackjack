const Player = require('./player')

class Dealer extends Player {

    constructor() {
        super('Dealer')
    }

    needsToDraw() {
        return this.hand.calculateScore() < 17
    }

}

module.exports = Dealer