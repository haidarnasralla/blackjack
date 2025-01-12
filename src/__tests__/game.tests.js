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
        beforeEach(() => {
            game.dealFirstHand();
        });
        it('adds a card to the player’s hand', () => {
            expect(game.player.getHand().length).toBe(2);
            game.hit(game.player);
            expect(game.player.getHand().length).toBe(3);
        });
        it('causes the dealer to draw cards until stopping condition is met', () => {
            expect(game.dealer.getHand().length).toBe(2);
            game.hit(game.dealer);
            // Test dealer draws cards if hand scores < 17
            if (game.dealer.getScore() < 17) {
                expect(game.dealer.getHand().length).toBeGreaterThan(2);
            }
            expect(game.dealer.getScore()).toBeGreaterThanOrEqual(17);
        });

    });

    describe('METHOD - stand', () => {
        let hitSpy;

        beforeEach(() => {
            game.dealFirstHand();
            hitSpy = jest.spyOn(game, 'hit');
        });
    
        afterEach(() => {
            hitSpy.mockRestore();
        });
        
        it('calls hit for the dealer when player stands', () => {
            game.stand(game.player);
            expect(hitSpy).toHaveBeenCalledWith(game.dealer);
        });

        it('calculates the winner after dealer finishes drawing', () => {
            game.stand(game.player);
            expect(['player_wins', 'dealer_wins', 'tie']).toContain(game.result)
        });
    });

    describe('METHOD - calculateWinner', () => {

        let card1, card2, card3, card4, card5, card6

        beforeEach(() => {
            card1 = new Card(10, 'Spades');
            card2 = new Card(10, 'Hearts');
            card3 = new Card(10, 'Clubs');
            card4 = new Card(10, 'Diamonds');
            card5 = new Card(5, 'Clubs');
            card6 = new Card(5, 'Hearts');
        });

        it('sets result to \'player_wins\' if player has a higher non-bust score than dealer', () => {
            game.player.takeCard(card1, card2);
            game.dealer.takeCard(card5, card6);
            game.calculateWinner();
            expect(game.result).toBe('player_wins');
        });
    
        it('sets result to \'dealer_wins\' if dealer has a higher non-bust score than player', () => {
            game.player.takeCard(card5, card6);
            game.dealer.takeCard(card1, card2);
            game.calculateWinner();
            expect(game.result).toBe('dealer_wins');
        });
    
        it('sets result to \'tie\' if both have the same score and neither are bust', () => {
            game.player.takeCard(card1, card2);
            game.dealer.takeCard(card3, card4);
            game.calculateWinner();
            expect(game.result).toBe('tie');
        });
    
        it('sets result to \'dealer_wins\' if only the player is bust', () => {
            game.player.takeCard(card1, card2, card3);
            game.dealer.takeCard(card4, card5);
            game.calculateWinner();
            expect(game.result).toBe('dealer_wins');
        });
    
        it('sets result to \'player_wins\' if only the dealer is bust', () => {
            game.player.takeCard(card1, card2);
            game.dealer.takeCard(card3, card4, card5);
            game.calculateWinner();
            expect(game.result).toBe('player_wins');
        });
    
        it('sets result to \'dealer_wins\' if both player and dealer are bust', () => {
            game.player.takeCard(card1, card2, card5);
            game.dealer.takeCard(card3, card4, card6);
            game.calculateWinner();
            expect(game.result).toBe('dealer_wins');
        });
    });

});
