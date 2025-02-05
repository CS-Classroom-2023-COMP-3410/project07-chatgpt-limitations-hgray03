document.addEventListener("DOMContentLoaded", () => {
  const gameGrid = document.getElementById("game-grid");
  const moveCounter = document.getElementById("move-counter");
  const timer = document.getElementById("timer");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  const cards = [
    "🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓",
    "🍒", "🍒", "🍍", "🍍", "🥝", "🥝", "🍉", "🍉"
  ];

  const fruitDanceMap = {
    "🍎": "pivot-dance",
    "🍌": "bounce-dance",
    "🍇": "top-pivot-dance",
    "🍓": "surprise-dance",
    "🍒": "swing-dance",
    "🍍": "jitter-dance",
    "🥝": "spin-dance",
    "🍉": "float-dance"
  };

  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let gameTimer = null;
  let secondsElapsed = 0;
  let gameStarted = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function initializeGame() {
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    secondsElapsed = 0;
    moveCounter.textContent = moves;
    timer.textContent = "0:00"; // Reset timer display
    clearInterval(gameTimer); // Stop any previous timer
    gameGrid.innerHTML = "";
    gameStarted = true;
    restartButton.disabled = false;
    startButton.disabled = true; 

    shuffle(cards).forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        
        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");
        
        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const fruitSpan = document.createElement("span");
        fruitSpan.textContent = card;
        fruitSpan.classList.add(fruitDanceMap[card]);
        cardBack.appendChild(fruitSpan);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        
        cardElement.addEventListener("click", flipCard);
        gameGrid.appendChild(cardElement);
    });

    startTimer(); // Start the timer when the game begins
  }

  function startTimer() {
    clearInterval(gameTimer);
    secondsElapsed = 0;
    gameTimer = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  function flipCard() {
    if (!gameStarted || flippedCards.length === 2) return;
  
    const card = this.querySelector('.card-inner');
  
    if (!this.classList.contains("flip")) {
        this.classList.add("flip");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            moveCounter.textContent = moves;
            checkForMatch();
        }
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;
    const cardBack1 = card1.querySelector(".card-back");
    const cardBack2 = card2.querySelector(".card-back");
    const fruit1 = cardBack1.querySelector("span");
    const fruit2 = cardBack2.querySelector("span");

    if (cardBack1.textContent === cardBack2.textContent) {
        card1.classList.add("match");
        card2.classList.add("match");

        // Maintain the fruit animation on matched cards
        fruit1.style.animation = getComputedStyle(fruit1).animation;
        fruit2.style.animation = getComputedStyle(fruit2).animation;

        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === cards.length / 2) {
            clearInterval(gameTimer);
            setTimeout(() => {
                triggerConfetti();
                alert(`🎉 Congratulations! You completed the game in ${moves} moves and ${timer.textContent}.`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flip");
            card2.classList.remove("flip");
            flippedCards = [];
        }, 1000);
    }
  }

  function triggerConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
  }

  startButton.addEventListener("click", initializeGame);
  restartButton.addEventListener("click", initializeGame);
});

document.addEventListener("DOMContentLoaded", () => {
  // Create and append the fruit border container
  const fruitBorderContainer = document.createElement("div");
  fruitBorderContainer.classList.add("fruit-border");
  document.body.appendChild(fruitBorderContainer);

  const fruitOptions = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍", "🥝", "🍉"];
  const fruitSize = 40;
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  function createFruit(x, y) {
      const fruitItem = document.createElement("div");
      fruitItem.classList.add("fruit-item");
      fruitItem.textContent = fruitOptions[Math.floor(Math.random() * fruitOptions.length)];
      fruitItem.style.position = "absolute";
      fruitItem.style.left = `${x}px`;
      fruitItem.style.top = `${y}px`;

      const animations = ["rotateDance", "bounceDance", "wiggleDance"];
      fruitItem.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} 3s infinite`;

      fruitBorderContainer.appendChild(fruitItem);
  }

  function generateFruitBorder() {
      fruitBorderContainer.innerHTML = "";
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      const borderPadding = fruitSize * 1.5; // 60px

      // Top and bottom rows
      for (let x = borderPadding; x < screenWidth - borderPadding; x += fruitSize) {
          createFruit(x, borderPadding - fruitSize); // Top row (y = 20px)
          createFruit(x, screenHeight - borderPadding); // Bottom row
      }

      // Left and right columns
      for (let y = borderPadding; y < screenHeight - borderPadding; y += fruitSize) {
          createFruit(borderPadding - fruitSize, y); // Left column (x = 20px)
          createFruit(screenWidth - borderPadding, y); // Right column
      }
  }

  generateFruitBorder();
  window.addEventListener("resize", generateFruitBorder);

  // No longer adjusting the game container via JS—its sizing is controlled by CSS.
});
