class Card {
    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
    }

    getValue() {
        if (typeof this.rank === 'number') return this.rank
        if (['Jack', 'Queen', 'King'].includes(this.rank)) return 10
        if (this.rank === 'Ace') return 11
    }

    toString() {
        return `${this.rank} of ${this.suit}`
    }
}

module.exports = Card