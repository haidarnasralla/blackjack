const Card = require('../game-logic/card')

describe('CLASS: Card', () => {

    describe('PROPERTIES - rank, suits', () => {
        it('instantiated with \'Ace\' and \'Hearts\' as arguments, rank and suit properties are \'Ace\' and \'Hearts\'', () => {
            const card = new Card('Ace', 'Hearts')
            expect(card.rank).toBe('Ace')
            expect(card.suit).toBe('Hearts')
        });
    })

    describe('METHOD - getValue', () => {
        it('returns the correct value for cards ranked 2 to 10', () => {
            const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10]
            ranks.forEach(rank => {
                const card = new Card(rank, 'Spades')
                expect(card.getValue()).toBe(rank);
            })
        });
        it('returns 10 for cards ranked \'Jack\', \'Queen\' and \'King\'', () => {
            const ranks = ['Jack', 'Queen', 'King']
            ranks.forEach(rank => {
                const card = new Card(rank, 'Diamonds')
                expect(card.getValue()).toBe(10)
            });
        });
        it('returns 11 for card ranked \'Ace\'', () => {
            const card = new Card('Ace', 'Clubs')
            expect(card.getValue()).toBe(11)
        });
    })
    
    describe('METHOD - toString', () => {
        it('returns string \'King of Hearts\' when passed instance of class Card with \'King\' and \'Heart\' as arguments', () => {
            const card = new Card('King', 'Hearts')
            expect(card.toString()).toBe('King of Hearts')
        });
    })
    
});