const Hand = require('../game-logic/hand');
const Card = require('../game-logic/card');

describe('CLASS - Hand', () => {

  let hand;
  beforeEach(() => {
    hand = new Hand();
  });

  describe('PROPERTY - hand', () => {
    it('array empty on instantiation', () => {
      expect(hand.hand.length).toBe(0);
    });
  })

  describe('METHOD - addCard', () => {
    it('pushes a single card to \'hand\' property array when passed new class \'Card\' instance as an argument', () => {
      const card = new Card('Ace', 'Spades');
      hand.addCard(card);
      expect(hand.hand.length).toBe(1);
      expect(hand.hand[0]).toBe(card);
    });
    it('pushes two cards to hand array when passed new two class \'Card\' instances as arguments', () => {
      const card1 = new Card('Ace', 'Spades');
      const card2 = new Card('King', 'Hearts');
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.hand.length).toBe(2);
      expect(hand.hand[0]).toBe(card1);
      expect(hand.hand[1]).toBe(card2);
    });
  })

  describe('METHOD - calculateScore', () => {
    it('returns 2 when hand contains a single card with rank of 2', () => {
      const card = new Card(2, 'Hearts');
      hand.addCard(card);
      const score = hand.calculateScore()
      expect(score).toBe(2);
    });
    it('returns 12 when hand contains two cards with ranks of 2 and \'Jack\'', () => {
      const card1 = new Card(2, 'Hearts');
      const card2 = new Card('Jack', 'Hearts');
      hand.addCard(card1);
      hand.addCard(card2);
      const score = hand.calculateScore()
      expect(score).toBe(12);
    });
    it('returns 11 when hand contains a single card with rank of \'Ace\'', () => {
      const card = new Card('Ace', 'Hearts');
      hand.addCard(card);
      const score = hand.calculateScore()
      expect(score).toBe(11);
    });
    it('returns 13 when hand contains two cards with ranks of 2 and \'Ace\'', () => {
      const card1 = new Card(2, 'Hearts');
      const card2 = new Card('Ace', 'Hearts');
      hand.addCard(card1);
      hand.addCard(card2);
      const score = hand.calculateScore()
      expect(score).toBe(13);
    });
    it('returns 21 when hand contains two cards with ranks of 10 and \'Ace\'', () => {
      const card1 = new Card('Ace', 'Hearts');
      const card2 = new Card(10, 'Spades');
      hand.addCard(card1);
      hand.addCard(card2);
      const score = hand.calculateScore()
      expect(score).toBe(21);
    });
    it('returns 12 when hand contains two cards both with ranks of \'Ace\'', () => {
      const card1 = new Card('Ace', 'Hearts');
      const card2 = new Card('Ace', 'Spades');
      hand.addCard(card1);
      hand.addCard(card2);
      const score = hand.calculateScore()
      expect(score).toBe(12);
    });
    it('returns 13 when hand contains three cards, all with ranks of \'Ace\'', () => {
      const card1 = new Card('Ace', 'Hearts');
      const card2 = new Card('Ace', 'Spades');
      const card3 = new Card('Ace', 'Clubs');
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(13);
    });
    it('returns 21 when hand contains three cards with ranks of \'Ace\', \'Ace\' and 9 ', () => {
      const card1 = new Card('Ace', 'Hearts');
      const card2 = new Card('Ace', 'Diamonds');
      const card3 = new Card(9, 'Clubs');
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(21); 
    });
    it('returns 12 when hand contains three cards with ranks of \'Ace\', 10 and \'Ace\' ', () => {
      const card1 = new Card('Ace', 'Hearts');
      const card2 = new Card(10, 'Diamonds');
      const card3 = new Card('Ace', 'Clubs');
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(12); 
    });
  })

  describe('METHOD - isBust', () => {
    it('returns false when hand empty', () => {
      const score = hand.calculateScore()
      expect(hand.hand.length).toBe(0)
      expect(score).toBe(0); 
      expect(hand.isBust()).toBe(false);
    });
    it('returns false when hand contains two cards with a total score of 20', () => {
      const card1 = new Card(10, 'Hearts');
      const card2 = new Card(10, 'Diamonds');
      hand.addCard(card1);
      hand.addCard(card2);
      const score = hand.calculateScore()
      expect(score).toBe(20); 
      expect(hand.isBust()).toBe(false);
    });
    it('returns false when hand contains three cards with a total score of 21', () => {
      const card1 = new Card(10, 'Hearts');
      const card2 = new Card('King', 'Diamonds');
      const card3 = new Card('Ace', 'Clubs');
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(21); 
      expect(hand.isBust()).toBe(false);
    });
    it('returns true when hand contains three cards with a total score of 22', () => {
      const card1 = new Card(3, 'Hearts');
      const card2 = new Card(9, 'Diamonds');
      const card3 = new Card(10, 'Clubs');
      hand.addCard(card1);
      hand.addCard(card2);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(22); 
      expect(hand.isBust()).toBe(true);
    });
  })
});