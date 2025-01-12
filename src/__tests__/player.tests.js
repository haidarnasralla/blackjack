const Player = require('../game-logic/player');
const Card = require('../game-logic/card');

describe('CLASS - Player', () => {
    let player;

    beforeEach(() => {
        player = new Player('John Reith');
    });

    describe('PROPERTY - name', () => {
        it('sets the player name upon instantiation', () => {
            expect(player.name).toBe('John Reith');
        });

        it('defaults to "Player" if no name is provided', () => {
            const defaultPlayer = new Player();
            expect(defaultPlayer.name).toBe('Player');
        });
    });

    describe('PROPERTY - hand', () => {
        it('instantiates with an empty hand', () => {
            const hand = player.getHand();
            expect(hand.length).toBe(0);
        });
    });

    describe('METHOD - takeCard', () => {

        let card1, card2;

        beforeEach(() => {
            card1 = new Card('Ace', 'Hearts');
            card2 = new Card('King', 'Diamonds');
        });

        it('adds a single card to the player\'s hand', () => {
            player.takeCard(card1);
            const hand = player.getHand();
            expect(hand.length).toBe(1);
            expect(hand[0]).toBe(card1);
        });

        it('adds multiple cards to the player\'s hand', () => {
            player.takeCard(card1, card2);
            const hand = player.getHand();
            expect(hand.length).toBe(2);
            expect(hand[0]).toBe(card1);
            expect(hand[1]).toBe(card2);
        });
    });

    describe('METHOD - getHand', () => {
        it('returns all cards in the player\'s hand', () => {
            const card1 = new Card('Ace', 'Hearts');
            const card2 = new Card('King', 'Diamonds');
            player.takeCard(card1, card2);
            const hand = player.getHand();
            expect(hand.length).toBe(2);
            expect(hand).toContain(card1);
            expect(hand).toContain(card2);
        });
    });

    describe('METHOD - getScore', () => {
        
        it('returns 21 when player\'s hand contains cards \'10 of Hearts\' and \'Ace of Diamonds\'', () => {
            const card1 = new Card(10, 'Hearts');
            const card2 = new Card('Ace', 'Diamonds');
            player.takeCard(card1, card2);
            expect(player.getScore()).toBe(21);
        });
    });

    describe('METHOD - isBust', () => {

        let card1, card2, card3, card4

        beforeEach(() => {
            card1 = new Card(10, 'Hearts')
            card2 = new Card(10, 'Diamonds');
            card3 = new Card('Ace', 'Clubs');
            card4 = new Card(2, 'Clubs');
        });

        it('returns false when player\'s hand score is 20', () => {
            player.takeCard(card1, card2);
            expect(player.isBust()).toBe(false);
        });

        it('returns false when player\'s hand score is 21', () => {
            player.takeCard(card1, card2, card3);
            expect(player.isBust()).toBe(false);
        });

        it('returns true when player\'s hand score 22', () => {
            player.takeCard(card1, card2, card4);
            expect(player.isBust()).toBe(true);
        });
    });
});