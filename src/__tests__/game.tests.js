const Game = require('../game-logic/game');
const Player = require('../game-logic/player');
const Dealer = require('../game-logic/dealer');
const Card = require('../game-logic/card');
const Deck = require('../game-logic/deck');

describe('CLASS - Game', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    describe('PROPERTIES - player, dealer, deck, result', () => {
        it('upon instantiation, player, dealer and deck are initalised with instances of their respective classes', () => {
            expect(game.deck).toBeInstanceOf(Deck);
            expect(game.player).toBeInstanceOf(Player);
            expect(game.dealer).toBeInstanceOf(Dealer);
        });
        it('result is set to \'null\'', () => {
            expect(game.result).toBe(null);
        });
        it('deck is shuffled and contains 52 cards', () => {
            const shuffledDeck = game.deck.deck
            const unshuffledDeck = new Deck()
            expect(unshuffledDeck.deck).not.toEqual(shuffledDeck)
            // Test decks contain same cards
            expect(new Set(shuffledDeck)).toEqual(new Set(unshuffledDeck.deck))
            expect(unshuffledDeck.deck.length).toBe(52)
            expect(shuffledDeck.length).toBe(52)
        });
    });

    describe('METHOD - startGame', () => {
        it('resets the game state and deals the first hand', () => {
            expect(game.player.getHand().length).toBe(0)
            expect(game.player.getHand().length).toBe(0)
            expect(game.deck.deck.length).toBe(52)
            game.result = 'tie'
            game.startGame() 
            expect(game.player.getHand().length).toBe(2)
            expect(game.dealer.getHand().length).toBe(2)
            expect(game.result).toBe(null)
            expect(game.deck.deck.length).toBe(48)
        });
    });

    describe('METHOD - dealFirstHand', () => {
        it('deals two cards to both player and dealer', () => {
            game.dealFirstHand();
            expect(game.player.getHand().length).toBe(2);
            expect(game.dealer.getHand().length).toBe(2)
            expect(game.deck.deck.length).toBe(48)
        });
    });

    describe('METHOD - hit', () => {
        it('adds a card to the player’s hand', () => {
            game.dealFirstHand();
            expect(game.player.getHand().length).toBe(2);
            game.hit(game.player);
            expect(game.player.getHand().length).toBe(3);
        });

        it('sets result to player_bust if player busts', () => {
            const card1 = new Card(10, 'Spades');
            const card2 = new Card(10, 'Hearts');
            const card3 = new Card('Ace', 'Diamonds');
            game.player.takeCard(card1, card2, card3);
            expect(game.result).toBe(null);
            game.hit(game.player);
            expect(game.result).toBe('player_bust');
        });

        it('sets result to dealer_bust if dealer busts', () => {
            const card1 = new Card(10, 'Hearts')
            const card2 = new Card(6, 'Clubs')
            game.dealer.takeCard(card1, card2)
            const card3 = new Card(8, 'Spades')            
            game.deck = {deal: jest.fn().mockReturnValueOnce([card3])};
            game.hit(game.dealer);
            expect(game.deck.deal).toHaveBeenCalledTimes(1)
            expect(game.dealer.getScore()).toBeGreaterThan(21);
            expect(game.dealer.isBust()).toBe(true); 
            expect(game.result).toBe('dealer_bust');
        });

    });

    describe('METHOD - stand', () => {
        it('causes the dealer to draw cards until stopping condition is met', () => {
            game.dealFirstHand();
            expect(game.dealer.getHand().length).toBe(2);
            game.stand(game.player);
            // Test dealer draws cards if hand scores < 17
            if (game.dealer.getScore() < 17) {
                expect(game.dealer.getHand().length).toBeGreaterThan(2);
            }
            expect(game.dealer.getScore()).toBeGreaterThanOrEqual(17);
        });

        it('calculates the winner after dealer finishes drawing', () => {
            game.dealFirstHand();
            game.stand(game.player);
            expect(['player_wins', 'dealer_wins', 'tie']).toContain(game.result)
        });
    });

    describe('METHOD - calculateWinner', () => {
        it('sets result to player_wins if player has a higher score', () => {
            const card1 = new Card(10, 'Spades')
            const card2 = new Card(9, 'Hearts')
            const card3 = new Card(10, 'Clubs')
            const card4 = new Card(8, 'Diamonds')
            game.player.takeCard(card1, card2);
            game.dealer.takeCard(card3, card4);
            game.calculateWinner();
            expect(game.result).toBe('player_wins');
        });

        it('sets result to dealer_wins if dealer has a higher score', () => {
            const card1 = new Card(10, 'Spades')
            const card2 = new Card(8, 'Hearts')
            const card3 = new Card(10, 'Clubs')
            const card4 = new Card(9, 'Diamonds')
            game.player.takeCard(card1, card2);
            game.dealer.takeCard(card3, card4);
            game.calculateWinner();
            expect(game.result).toBe('dealer_wins');
        });

        it('sets result to tie if both have the same score', () => {
            const card1 = new Card(10, 'Spades')
            const card2 = new Card(9, 'Hearts')
            const card3 = new Card(10, 'Clubs')
            const card4 = new Card(9, 'Diamonds')
            game.player.takeCard(card1, card2)
            game.dealer.takeCard(card3, card4)
            game.calculateWinner();
            expect(game.result).toBe('tie');
        });
    });

});
