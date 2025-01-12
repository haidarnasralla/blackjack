const Hand = require('../game-logic/hand');
const Card = require('../game-logic/card');

describe('CLASS - Hand', () => {

  let hand, card1, card2, card3, card4, card5, card6, card7
  beforeEach(() => {
    hand = new Hand();
    card1 = new Card(2, 'Hearts');
    card2 = new Card('Jack', 'Hearts');
    card3 = new Card('Ace', 'Hearts');
    card4 = new Card(10, 'Spades')
    card5 = new Card('Ace', 'Spades');
    card6 = new Card('Ace', 'Clubs');
    card7 = new Card(9, 'Clubs');
    card8 = new Card(10, 'Hearts'); 
    card9 = new Card('King', 'Diamonds');
    card10 = new Card(3, 'Hearts')
  });

  describe('PROPERTY - hand', () => {
    it('array empty on instantiation', () => {
      expect(hand.hand.length).toBe(0);
    });
  })

  describe('METHOD - addCard', () => {
    it('pushes a single card to \'hand\' property array when passed new class \'Card\' instance as an argument', () => {
      hand.addCard(card3);
      expect(hand.hand.length).toBe(1);
      expect(hand.hand[0]).toBe(card3);
    });
    it('pushes two cards to hand array when passed new two class \'Card\' instances as arguments', () => {
      hand.addCard(card1);
      hand.addCard(card2);
      expect(hand.hand.length).toBe(2);
      expect(hand.hand[0]).toBe(card1);
      expect(hand.hand[1]).toBe(card2);
    });
  })

  describe('METHOD - calculateScore', () => {

    it('returns 2 when hand contains a single card with rank of 2', () => {
      hand.addCard(card1);
      const score = hand.calculateScore()
      expect(score).toBe(2);
    });
    it('returns 12 when hand contains two cards with ranks of 2 and \'Jack\'', () => {
      hand.addCard(card1);
      hand.addCard(card2);
      const score = hand.calculateScore()
      expect(score).toBe(12);
    });
    it('returns 11 when hand contains a single card with rank of \'Ace\'', () => {
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(11);
    });
    it('returns 13 when hand contains two cards with ranks of 2 and \'Ace\'', () => {
      hand.addCard(card1);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(13);
    });
    it('returns 21 when hand contains two cards with ranks of 10 and \'Ace\'', () => {
      hand.addCard(card4);
      hand.addCard(card3);
      const score = hand.calculateScore()
      expect(score).toBe(21);
    });
    it('returns 12 when hand contains two cards both with ranks of \'Ace\'', () => {
      hand.addCard(card3);
      hand.addCard(card5);
      const score = hand.calculateScore()
      expect(score).toBe(12);
    });
    it('returns 13 when hand contains three cards, all with ranks of \'Ace\'', () => {
      hand.addCard(card3);
      hand.addCard(card5);
      hand.addCard(card6);
      const score = hand.calculateScore()
      expect(score).toBe(13);
    });
    it('returns 21 when hand contains three cards with ranks of \'Ace\', \'Ace\' and 9 ', () => {
      hand.addCard(card5);
      hand.addCard(card6);
      hand.addCard(card7);
      const score = hand.calculateScore()
      expect(score).toBe(21); 
    });
    it('returns 12 when hand contains three cards with ranks of \'Ace\', 10 and \'Ace\' ', () => {
      hand.addCard(card3);
      hand.addCard(card4);
      hand.addCard(card5);
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
      hand.addCard(card4);
      hand.addCard(card8);
      const score = hand.calculateScore()
      expect(score).toBe(20); 
      expect(hand.isBust()).toBe(false);
    });
    it('returns false when hand contains three cards with a total score of 21', () => {
      hand.addCard(card8);
      hand.addCard(card9);
      hand.addCard(card6);
      const score = hand.calculateScore()
      expect(score).toBe(21); 
      expect(hand.isBust()).toBe(false);
    });
    it('returns true when hand contains three cards with a total score of 22', () => {
      hand.addCard(card10);
      hand.addCard(card7);
      hand.addCard(card8);
      const score = hand.calculateScore()
      expect(score).toBe(22); 
      expect(hand.isBust()).toBe(true);
    });
  })
});