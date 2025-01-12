const Card = require('./card')

class Deck {

  constructor() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
    const ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
    this.deck = []

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        this.deck.push(new Card(rank, suit))
      })
    })
  }

  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
    }
}

deal(number = 1) {
  if (number === 0) return [];
  if (number > this.deck.length) {
    throw new Error("Not enough cards available");
  }
  return this.deck.splice(-number);
}
}

module.exports = Deck