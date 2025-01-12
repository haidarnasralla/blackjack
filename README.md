# Blackjack Game

## Overview

This project is a JavaScript, object-oriented implementation of Blackjack. It is a fully functional game engine with a deck of cards, players, a dealer, and scoring mechanics. The game logic is thoroughly tested using Jest, and it was built using Test-Driven Development (TDD) to ensure clean, maintainable, and reliable code.

## Features

- Deck management with shuffling and card dealing.
- Player and Dealer classes with hand and score management.
- Accurate scoring rules, including dynamic Ace value adjustment.
- Comprehensive game logic with hit and stand functionality.
- Automated testing for all components and acceptance scenarios.

### Key Components

- **`card.js`**: Defines the `Card` class, encapsulating the rank, suit, and value of a card.
- **`deck.js`**: Implements the `Deck` class for managing a standard 52-card deck, including shuffling and dealing cards.
- **`hand.js`**: Handles card collections for players and dealers, calculates scores, and determines if a hand is "bust."
- **`player.js`**: Represents a player, manages their hand, and checks game status (e.g., bust).
- **`dealer.js`**: Extends `Player`, implements logic for dealer-specific actions like drawing until the score reaches 17.
- **`game.js`**: Orchestrates the game flow, including dealing cards, handling player actions, and determining the winner.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/haidarnasralla/blackjack.git
   cd blackjack
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Tests

- Comprehensive tests for each module using Jest.
- Includes acceptance tests based on the brief simulating real gameplay scenarios and validating end-to-end functionality.

To run the automated tests:

```bash
npm test
```
