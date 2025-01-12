## Blackjack Candidate Instructions

Blackjack, otherwise known as Twenty-One, Vingt-et-Un, or Pontoon, is a classic
card game, approximately 250 years old. For your tech assessment, you will write
code that can simulate a hand of blackjack. You may use any programming language
or framework(s) you think appropriate. Alternatively, you may build on the provided
starter code (in Python 3.)

The goal of the game is to get a hand of cards that’s worth as close to 21 points as
possible. If a player’s hand goes over 21 points, they have lost.

The player is initially dealt two cards. They may then choose to ‘hit’ (draw a card) or
‘stand’ (stop drawing cards.) If they ‘hit’, then the new card’s value is added to the
hand total. If this total exceeds 21, the player is ‘bust’, and loses.

Once all players have finished this process, the highest scoring hand wins.

Your solution should model a single deck of 52 cards:
- Number cards are worth their face value (2-10)
- Jacks, queens, and kings are worth 10 each
- Aces are worth either 1 or 11 (player chooses)
- The suit of the card does not matter.

(These are simplified rules- a full description with gameplay variations can be found
at https://en.wikipedia.org/wiki/Blackjack)

Your submission does not need to be a complete, finished game. It is enough simply
to write code that satisfies the scenarios overleaf. The best way to prove your code
works is with unit tests (see starter code for an example).

You may additionally choose to make your submission playable or interactive, or
extend it beyond these basic scenarios. For example, you might…

- Display the player’s cards (text or graphics)
- Invite player input
- Allow for multiple players
- Allow for multiple hands
- Allow for rule variations

This should not be considered a pass / fail assignment. Your goal is to make your
best attempt at the scenarios, and write code that you’re confident discussing at
interview. Good luck!

## Scenarios

**Given** I play a game of blackjack  
**When** I am dealt my opening hand  
**Then** I have two cards

**Given** I have a valid hand of cards  
**When** I choose to ‘hit’  
**Then** I receive another card  
**And** my score is updated

**Given** I have a valid hand of cards  
**When** I choose to ‘stand’  
**Then** I receive no further cards  
**And** my score is evaluated

**Given** my score is updated or evaluated  
**When** it is 21 or less  
**Then** I have a valid hand

**Given** my score is updated  
**When** it is 22 or more  
**Then** I am ‘bust’ and do not have a valid hand

**Given** I have a king and an ace  
**When** my score is evaluated  
**Then** my score is 21

**Given** I have a king, a queen, and an ace  
**When** my score is evaluated  
**Then** my score is 21

**Given** that I have a nine, an ace, and another ace  
**When** my score is evaluated  
**Then** my score is 21