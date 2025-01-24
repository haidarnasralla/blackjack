const readline = require('readline');
const Game = require('./src/game-logic/game');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let game;

const displayState = () => {

  const dealerHand = game.dealer.getHand();
  const playerScore = game.player.getScore();

  console.log(`* Your cards: ${game.player.getHand().map(card => card.toString()).join(', ')}`);
  console.log(`* Your score: ${game.player.getScore()}\n`);

  if (playerScore === 21) {
    console.log("=== You have a Blackjack! ===\n");
    console.log("# WARNING: Hitting again will bust your hand! #\n");
}

  console.log(`* Dealer's visible card: ${dealerHand[0].toString()}\n`);
  console.log(`Remaining cards in deck: ${game.deck.deck.length}\n`);

}

const promptAction = () => {
  rl.question('HIT (h), STAND (s) or QUIT (q)? ', (answer) => {
    console.log('\n------\n');
    handleAction(answer);
  });
};

const handleAction = (answer) => {

  const lowerAnswer = answer.toLowerCase();

  if (lowerAnswer === 'q') {
    console.log('Thanks for playing! We hope this was informative, educational and entertaining.\n');
    rl.close();
    return;
  }

  if (lowerAnswer === 'h') {
    console.log('You decided to hit!');
    console.log('\n------\n');
    game.hit(game.player);
    if (game.player.isBust()) {
      console.log('Yikes! YOU\'RE BUST!');
      console.log('\n------\n');
      endGame();
    } else {
      displayState();
      promptAction();
    }
  } else if (lowerAnswer === 's') {
    console.log('You decided to stand!');
    console.log('\n------\n');
    game.stand(game.player);
    endGame();
  } else {
    console.log('Invalid input. Please type "h" to hit, "s" to stand or "q" to quit.');
    console.log('\n------\n');
    promptAction();
  }

}

const endGame = () => {

  console.log('FINAL RESULTS:\n');
  console.log(`* Your cards: ${game.player.getHand().map(card => card.toString()).join(', ')}`);
  console.log(`* Your score: ${game.player.getScore()}\n`);
  console.log(`* Dealer's cards: ${game.dealer.getHand().map(card => card.toString()).join(', ')}`);
  console.log(`* Dealer's score: ${game.dealer.getScore()}\n`);

  if (game.result === 'player_wins') {
    console.log('Congratulations - you win! Radio 4\'s Thought for the Day: \"Success often comes to those who know when to hold back... or when to say, \'Hit me.\'"');
  } else if (game.result === 'dealer_wins') {
    console.log('BBC wins! Coming up next: I\'m Sorry, I Haven\'t a Clue - Blackjack Edition.');
  } else if (game.result === 'tie') {
    console.log("It's a tie!");
  }
  promptRestart() 

}

const promptRestart = () => {
  rl.question('\nPlay again? (y / n)', answer => {
    handleRestart(answer)
  })
};

const handleRestart = (answer) => {

    const lowerAnswer = answer.toLowerCase();

    console.log('\n------\n')
    if (lowerAnswer === 'y') {
      startGame();
    } else if (lowerAnswer === 'n') {
      console.log('Thanks for playing! We hope this was informative, educational and entertaining.\n');
      rl.close();
    } else {
      console.log('\nInvalid input. Please type "y" to play again or "n" to quit.');
      console.log('\n------');
      promptRestart()
    }

}

const welcomeMessage = () => {
  console.log('*** WELCOME TO BIG BUCKS CASINO! ***');
  console.log('*** News at 10 - Bankrupt by 11! ***\n');
  console.log('...let\'s play Blackjack!');
  console.log('\n------\n');
}

const startGame = () => {
  game = new Game();
  game.startGame();
  displayState();
  promptAction();
}

welcomeMessage();
startGame();