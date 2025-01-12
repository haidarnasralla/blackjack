const Game = require('../game-logic/game');
const Card = require('../game-logic/card');

describe('ACCEPTANCE TESTS - Blackjack Scenarios', () => {

    let game, player, dealer

    beforeEach(() => {
        game = new Game()
        player = game.player
        dealer = game.dealer
    })

    describe('1. Given I play a game of blackjack, when I am dealt my opening hand, then I have two cards', () => {
        it('deals two cards to the player at the start of the game', () => {
            expect(player.getHand().length).toBe(0)
            game.dealFirstHand()
            expect(player.getHand().length).toBe(2)
        });
        it('deals two cards to the dealer at the start of the game', () => {
            expect(dealer.getHand().length).toBe(0)
            game.dealFirstHand()
            expect(dealer.getHand().length).toBe(2)
        });
    });

    describe('2. Given I have a valid hand of cards, when I choose to "hit", then I receive another card and my score is updated', () => {
        let card1, card2
    
        beforeEach(() => {
            card1 = new Card(10, 'Spades');
            card2 = new Card(6, 'Hearts');
            card3 = new Card(5, 'Clubs');
            // Mock deck to prevent test issues with dynamic Ace values
            game.deck = { deal: jest.fn().mockReturnValueOnce([card3]) };
        });
    
        it('updates the player\'s hand and score after hitting', () => {
            const hand = player.getHand()
            player.takeCard(card1, card2);
            expect(hand.length).toBe(2)
            expect(player.getScore()).toBe(16)
            game.hit(player)
            expect(game.deck.deal).toHaveBeenCalledTimes(1)
            expect(hand.length).toBe(3)
            expect(player.getScore()).toBe(21)
        });
    
        it('updates the dealers\'s hand and score after hitting', () => {
            const hand = dealer.getHand()
            dealer.takeCard(card1, card2);
            expect(hand.length).toBe(2)
            expect(dealer.getScore()).toBe(16)
            // dealerHand = 16, dealer.needsToDraw will evalute as false after any rank card is dealt
            game.hit(dealer)
            expect(game.deck.deal).toHaveBeenCalledTimes(1)
            expect(hand.length).toBe(3)
            expect(dealer.getScore()).toBe(21)
        });
    });
    

    describe('3. Given I have a valid hand of cards, when I choose to "stand", then I receive no further cards and my score is evaluated', () => {
        let card1, card2, calculateWinnerSpy
    
        beforeEach(() => {
            card1 = new Card(10, 'Spades')
            card2 = new Card(10, 'Hearts')
            calculateWinnerSpy = jest.spyOn(game, 'calculateWinner');
        });

        afterEach(() => {
            calculateWinnerSpy.mockRestore();
        });
    
        it('keeps the player\'s hand unchanged and evaluates their score after standing', () => {
            player.takeCard(card1, card2);
            game.stand(player);
            expect(player.getHand().length).toBe(2)
            expect(player.getScore()).toBe(20)
            expect(calculateWinnerSpy).toHaveBeenCalled();
        });
    
        it('keeps the dealer\'s hand unchanged and evaluates their score after standing', () => {
            dealer.takeCard(card1, card2);
            game.stand(dealer);
            expect(dealer.getHand().length).toBe(2)
            expect(dealer.getScore()).toBe(20)
            expect(calculateWinnerSpy).toHaveBeenCalled();
        });
    });

    describe('4. Given my score is updated or evaluated, when it is 21 or less, then I have a valid hand', () => {
        let card1, card2
    
        beforeEach(() => {
            card1 = new Card(10, 'Spades')
            card2 = new Card(10, 'Hearts')
        });
    
        it('marks the player\'s hand as valid when their score is 20', () => {
            player.takeCard(card1, card2);
            expect(player.getScore()).toBe(20);
            expect(player.isBust()).toBe(false);
        });
    
        it('marks the dealer\'s hand as valid when their score is 20', () => {
            dealer.takeCard(card1, card2);
            expect(dealer.getScore()).toBe(20);
            expect(dealer.isBust()).toBe(false);
        });
    });

    
    describe('5. Given my score is updated, when it is 22 or more, then I am "bust" and do not have a valid hand', () => {
        let card1, card2, card3
    
        beforeEach(() => {
            card1 = new Card(10, 'Spades')
            card2 = new Card(10, 'Hearts')
            card3 = new Card(10, 'Clubs')
        });
    
        it('marks the player\'s hand as bust when their score is 30', () => {
            player.takeCard(card1, card2, card3);
            expect(player.getScore()).toBe(30);
            expect(player.isBust()).toBe(true);
        });
    
        it('marks the dealer\'s hand as bust when their score is 30', () => {
            dealer.takeCard(card1, card2, card3);
            expect(dealer.getScore()).toBe(30);
            expect(dealer.isBust()).toBe(true);
        });
    });

    describe('6. Given I have a king and an ace, when my score is evaluated, then my score is 21', () => {
        let card1, card2
    
        beforeEach(() => {
            card1 = new Card('King', 'Spades')
            card2 = new Card('Ace', 'Hearts')
        });
    
        it('calculates the player\'s score as 21 when holding a king and an ace', () => {
            player.takeCard(card1, card2);
            expect(player.getScore()).toBe(21);
        });
    
        it('calculates the dealer\'s score as 21 when holding a king and an ace', () => {
            dealer.takeCard(card1, card2);
            expect(dealer.getScore()).toBe(21);
        });
    });

    describe('7. Given I have a king, a queen, and an ace, when my score is evaluated, then my score is 21', () => {
        let card1, card2, card3
    
        beforeEach(() => {
            card1 = new Card('King', 'Spades')
            card2 = new Card('Queen', 'Hearts')
            card3 = new Card('Ace', 'Clubs')
        });
    
        it('calculates the player\'s score as 21 when holding a king, a queen, and an ace', () => {
            player.takeCard(card1, card2, card3);
            expect(player.getScore()).toBe(21);
        });
    
        it('calculates the dealer\'s score as 21 when holding a king, a queen, and an ace', () => {
            dealer.takeCard(card1, card2, card3);
            expect(dealer.getScore()).toBe(21);
        });
    });

    describe('8. Given I have a nine, an ace, and another ace, when my score is evaluated, then my score is 21', () => {
        let card1, card2, card3
    
        beforeEach(() => {
            card1 = new Card(9, 'Spades')
            card2 = new Card('Ace', 'Hearts')
            card3 = new Card('Ace', 'Clubs')
        });
    
        it('calculates the player\'s score as 21 when holding a nine, an ace, and another ace', () => {
            player.takeCard(card1, card2, card3);
            expect(player.getScore()).toBe(21);
        });
    
        it('calculates the dealer\'s score as 21 when holding a nine, an ace, and another ace', () => {
            dealer.takeCard(card1, card2, card3);
            expect(dealer.getScore()).toBe(21);
        });
    });
});