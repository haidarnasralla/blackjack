const Dealer = require('../game-logic/dealer');
const Card = require('../game-logic/card');

describe('CLASS - Dealer', () => {
    let dealer;

    beforeEach(() => {
        dealer = new Dealer();
    });

    describe('PROPERTY - name', () => {
        it('defaults name to "Dealer" upon instantiation', () => {
            expect(dealer.name).toBe('Dealer');
        });
    });

    describe('METHOD - needsToDraw', () => {

        it('returns true when hand is empty', () => {
            const dealerHand = dealer.getHand()
            expect(dealerHand.length).toBe(0);
            expect(dealer.getScore()).toBe(0);
            expect(dealer.needsToDraw()).toBe(true);
        });

        it('returns true when hand score is 16', () => {
            const card1 = new Card(10, 'Clubs');
            const card2 = new Card(6, 'Diamonds');
            dealer.takeCard(card1, card2);
            expect(dealer.getScore()).toBe(16);
            expect(dealer.needsToDraw()).toBe(true);
        });

        it('returns false when the hand score is 17', () => {
            const card1 = new Card(10, 'Hearts');
            const card2 = new Card(7, 'Diamonds');
            dealer.takeCard(card1, card2);
            expect(dealer.getScore()).toBe(17);
            expect(dealer.needsToDraw()).toBe(false);
        });

        it('returns false when the hand score is greater than 17', () => {
            const card1 = new Card(10, 'Hearts');
            const card2 = new Card(8, 'Clubs');
            dealer.takeCard(card1, card2);
            expect(dealer.getScore()).toBe(18);
            expect(dealer.needsToDraw()).toBe(false);
        });

        it('correctly adjusts Ace values and stops drawing at 17', () => {
            // Start with Ace and 4
            const card1 = new Card('Ace', 'Hearts');
            const card2 = new Card(4, 'Diamonds'); 
            dealer.takeCard(card1, card2);
            expect(dealer.getScore()).toBe(15);
            expect(dealer.needsToDraw()).toBe(true);
            // Add a second Ace
            const card3 = new Card('Ace', 'Clubs')
            dealer.takeCard(card3);
            expect(dealer.getScore()).toBe(16);
            expect(dealer.needsToDraw()).toBe(true);
            // Add a third Ace
            const card4 = new Card('Ace', 'Spades')
            dealer.takeCard(card4);
            expect(dealer.getScore()).toBe(17);
            expect(dealer.needsToDraw()).toBe(false);
        });
    });
});