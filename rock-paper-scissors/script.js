console.log("Hello World");

// Step 2: Randomly return the computer's choice.
function getComputerChoice() {
  const random = Math.random();

  if (random < 1 / 3) {
    return "rock";
  } else if (random < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Step 3: Get the human's choice from a prompt.
function getHumanChoice() {
  const choice = prompt("Enter your choice: rock, paper, or scissors");
  return choice;
}

// Step 6: Play the entire 5-round game.
function playGame() {
  // Step 4: Score variables live inside playGame.
  let humanScore = 0;
  let computerScore = 0;

  // Step 5: Play a single round.
  function playRound(humanChoice, computerChoice) {
    // Make the human's choice case-insensitive.
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
      console.log(`It's a tie! You both chose ${humanChoice}`);
    } else if (
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper")
    ) {
      humanScore++;
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    } else {
      computerScore++;
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    }
  }

  // Play 5 rounds.
  for (let round = 1; round <= 5; round++) {
    console.log(`--- Round ${round} ---`);
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
  }

  // Declare the overall winner.
  console.log(`--- Final Score ---`);
  console.log(`You: ${humanScore} | Computer: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("You won the game! 🎉");
  } else if (humanScore < computerScore) {
    console.log("You lost the game! 😢");
  } else {
    console.log("The game is a tie!");
  }
}

playGame();
