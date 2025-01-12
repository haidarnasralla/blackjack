const Deck = require('../game-logic/deck');

describe('CLASS - Deck', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  describe('PROPERTY - deck', () => {
    it('populates with 52 cards on instantiation', () => {
      expect(deck.deck.length).toBe(52);
    });
    it('does not contain duplicate cards', () => {
      const cardSet = new Set(deck.deck.map(card => `${card.rank}-${card.suit}`));
      expect(cardSet.size).toBe(52);
    });
  })

  describe('METHOD - shuffle', () => {
    it('shuffles the deck', () => {
      const comparisonDeck = new Deck()
      expect(comparisonDeck.deck).toEqual(deck.deck)
      deck.shuffle()
      expect(comparisonDeck.deck).not.toEqual(deck.deck)
      expect(comparisonDeck.deck.length).toBe(52)
      expect(deck.deck.length).toBe(52)
    });
  })

  describe('METHOD - deal', () => {
    it('deals no cards when passed 0 as an argument', () => {
      const dealtCard = deck.deal(0);
      expect(dealtCard.length).toBe(0);
      expect(deck.deck.length).toBe(52); 
    });
    it('deals one card when invoked without an argument', () => {
      const dealtCard = deck.deal();
      expect(dealtCard.length).toBe(1);
      expect(deck.deck.length).toBe(51); 
    });
    it('deals one card when passed 1 as an argument', () => {
      const dealtCards = deck.deal(1);
      expect(dealtCards.length).toBe(1);
      expect(deck.deck.length).toBe(51);
    });
    it('deals five cards when passed 5 as an argument', () => {
      const dealtCards = deck.deal(5);
      expect(dealtCards.length).toBe(5);
      expect(deck.deck.length).toBe(47);
    });
    it('returns an empty array if dealing more cards than available', () => {
      deck.deal(52);
      const dealtCards = deck.deal(1);
      expect(dealtCards).toEqual([]);
    });
  })

});