const Hand = require("./hand");

class Player {

    constructor(name = 'Player') {
        this.name = name
        this.hand = new Hand()
    }

    takeCard(...cards) {
        cards.forEach(card => {
            this.hand.addCard(card)
        })
    }

    getHand() {
        return this.hand.hand;
    }

    getScore() {
        return this.hand.calculateScore();
    }

    isBust() {
        return this.hand.isBust();
    }

}

module.exports = Player