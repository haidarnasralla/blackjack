class Hand {
    
    constructor() {
        this.hand = []
    }

    addCard(card) {
        this.hand.push(card)
    }

    calculateScore() {
        let score = 0
        let aces = 0

        this.hand.forEach(card => {
            if (card.rank === 'Ace') aces++
            score += card.getValue()
        })

        while (score > 21 && aces > 0) {
            score -= 10
            aces--
        }

        return score
    }

    isBust() {
        return this.calculateScore() > 21
    }

}

module.exports = Hand