const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const botResult = document.querySelector(".bot_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const playerScoreDisplay = document.querySelector(".p-count");
const botScoreDisplay = document.querySelector(".c-count");
const movesLeftDisplay = document.querySelector(".movesleft");
const resetButton = document.querySelector(".reset-button");


// Define possible images and outcomes
const botImages = ["images/rocknew.png", "images/papernew.png", "images/scissorsnew.png"];
const outcomes = {
  RR: "Draw",
  RP: "BOT",
  RS: "YOU",
  PP: "Draw",
  PR: "YOU",
  PS: "BOT",
  SS: "Draw",
  SR: "BOT",
  SP: "YOU"
};

// Initialize scores and moves
let playerScore = 0;
let botScore = 0;
let maxMoves = 5;
let currentMoves = 0;

// Get the cheering audio element
const cheerAudio = new Audio('cheer1.mp3'); // Make sure the path is correct
const loseAudio = new Audio('lose1.mp3');


// Update scores in the display
function updateScores() {
  playerScoreDisplay.textContent = playerScore;
  botScoreDisplay.textContent = botScore;
  movesLeftDisplay.textContent = `Moves Left: ${maxMoves - currentMoves}`;
}

// Display final result
function displayFinalResult() {
  if (playerScore > botScore) {
    result.textContent = "Game Over! You WIN!";
    cheerAudio.play(); // Play cheering sound if the player wins
      
   
   
  } else if (botScore > playerScore) {
    result.textContent = "Game Over! BOT WINS!";
    loseAudio.play();
  } else {
    result.textContent = "Game Over! It's a DRAW!";
  }
  
  // Show the reset button
  resetButton.style.display = "block";
}

// Reset the game
function resetGame() {
  playerScore = 0;
  botScore = 0;
  currentMoves = 0;
  userResult.src = botResult.src = "images/rockn.png"; // Reset result images
  result.textContent = "Let's Play!";
  resetButton.style.display = "none"; // Hide reset button
  updateScores(); // Update scores display
  
  // Stop the cheering sound when the reset button is clicked
  cheerAudio.pause();
  cheerAudio.currentTime = 0; // Reset the audio to the start
}

// Event handler for image click
function handleOptionClick(event) {
  if (currentMoves >= maxMoves) {
    displayFinalResult();
    return; // Stop the game if max moves reached
  }

  const clickedImage = event.currentTarget;
  const clickedIndex = Array.from(optionImages).indexOf(clickedImage);

  // Reset results and display "Wait..."
  userResult.src = botResult.src = "images/rockn.png";
  result.textContent = "Wait...";

  // Activate clicked image and deactivate others
  optionImages.forEach((image, index) => {
    image.classList.toggle("active", index === clickedIndex);
  });

  gameContainer.classList.add("start");

  setTimeout(() => {
    gameContainer.classList.remove("start");

    // Set user and bot images
    const userImageSrc = clickedImage.querySelector("img").src;
    userResult.src = userImageSrc;

    const randomNumber = Math.floor(Math.random() * botImages.length);
    const botImageSrc = botImages[randomNumber];
    botResult.src = botImageSrc;

    // Determine the result
    const userValue = ["R", "P", "S"][clickedIndex];
    const botValue = ["R", "P", "S"][randomNumber];
    const outcomeKey = userValue + botValue;
    const outcome = outcomes[outcomeKey] || "Unknown";

    // Update scores based on the outcome
    if (outcome === "YOU") {
      playerScore++;
      result.textContent = "You WON!";
    } else if (outcome === "BOT") {
      botScore++;
      result.textContent = "BOT WON!";
    } else {
      result.textContent = "Match Draw";
    }

    // Increment the move counter
    currentMoves++;
    updateScores();

    // Check if max moves reached
    if (currentMoves >= maxMoves) {
      displayFinalResult();
    }
  }, 2500);
}

// Attach event listeners to option images
optionImages.forEach(image => {
  image.addEventListener("click", handleOptionClick);
});

// Attach event listener to reset button
resetButton.addEventListener("click", resetGame);

// Initialize score display
updateScores();