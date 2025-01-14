const readline = require('readline');
const Game = require('./src/game-logic/game');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let game;

function displayState() {
  console.log(`* Your cards: ${game.player.getHand().map(card => card.toString()).join(', ')}`);
  console.log(`* Your score: ${game.player.getScore()}\n`);
  const dealerHand = game.dealer.getHand();
  console.log(`* Dealer's visible card: ${dealerHand[0].toString()}\n`);
}

function askPlayerAction() {
  rl.question('HIT (h), STAND (s) or QUIT (q)? ', answer => {
    console.log('\n------\n');
    if (answer.toLowerCase() === 'q') {
      console.log('Thanks for playing!\n');
      rl.close();
      return;
    }
    if (answer.toLowerCase() === 'h') {
      console.log('You decided to HIT!');
      console.log('\n------\n');
      game.hit(game.player);
      if (game.player.isBust()) {
        console.log('Yikes! YOU\'RE BUST!');
        console.log('\n------\n');
        endGame();
      } else {
        displayState();
        askPlayerAction();
      }
    } else if (answer.toLowerCase() === 's') {
      console.log('You decided to STAND!');
      console.log('\n------\n');
      game.stand(game.player);
      endGame();
    } else {
      console.log('Invalid input. Please type "h" to hit, "s" to stand or "q" to quit.');
      console.log('\n------\n');
      askPlayerAction();
    }
  });
}

function endGame() {
  console.log('FINAL RESULTS:\n');
  console.log(`* Your cards: ${game.player.getHand().map(card => card.toString()).join(', ')}`);
  console.log(`* Your score: ${game.player.getScore()}\n`);
  console.log(`* Dealer's cards: ${game.dealer.getHand().map(card => card.toString()).join(', ')}`);
  console.log(`* Dealer's score: ${game.dealer.getScore()}\n`);

  if (game.result === 'player_wins') {
    console.log('Congratulations! You win!');
  } else if (game.result === 'dealer_wins') {
    console.log('Dealer wins - too bad!');
  } else if (game.result === 'tie') {
    console.log("It's a tie!");
  }

  rl.question('\nPlay again? (y / n)', answer => {
    if (answer.toLowerCase() === 'y') {
      game = new Game();
      console.log('\n------\n')
      startGame();
    } else {
      console.log('\nThanks for playing!\n');
      rl.close();
    }
  })
    
}

function startGame() {
  game = new Game();
  console.log('*** WELCOME TO BIG BUCKS CASINO! ***\n');
  console.log('*** Let\'s play Blackjack! ***');
  console.log('\n------\n');
  game.startGame();
  displayState();
  askPlayerAction();
}

startGame();