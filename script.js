
const rounds = [
    {
      image: "lebronhair.png", 
      options: ["LeBron James", "Justin Bieber", "Charlie Puth"],
      correctAnswer: "LeBron James",
      fullImage: "lebron.png" 
    },
    {
      image: "kanyehair.png", 
      options: ["Ed Sheeran", "Kanye West", "Prince Harry"],
      correctAnswer: "Kanye West",
      fullImage: "kanye.png" 
    },
    {
      image: "kanye2hair.png", 
      options: ["Kanye West", "Emma Watson", "Scarlett Johansson"],
      correctAnswer: "Kanye West",
      fullImage: "kanye2.png" 
    },
    {
      image: "dwaynehair.png", 
      options: ["Shawn Mendes", "Dwayne Johnson", "James Franco"],
      correctAnswer: "Dwayne Johnson",
      fullImage: "dwayne.png" 
    }
  ];
  
  let currentRound = 0;
  let timer;
  
  
  const startButton = document.getElementById("start-button");
  const gameArea = document.getElementById("game-area");
  const celebrityImage = document.getElementById("celebrity-image");
  const choicesContainer = document.getElementById("choices");
  const feedback = document.getElementById("feedback");
  const fullImage = document.getElementById("full-image");
  const timerDisplay = document.getElementById("timer");
  
  
  startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameArea.style.display = "block";
    startNextRound();
  });
  
  
  function startNextRound() {
    if (currentRound >= rounds.length) {
      endGame();
      return;
    }
  
    const round = rounds[currentRound];
    celebrityImage.src = round.image;
    celebrityImage.style.display = "block"; 
    fullImage.style.display = "none"; 
    feedback.textContent = "";
  
    
    choicesContainer.innerHTML = "";
    choicesContainer.style.display = "flex"; 
    choicesContainer.style.flexDirection = "column"; 
    choicesContainer.style.alignItems = "center"; 
  
    round.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.textContent = option;
      button.dataset.index = index;

      
      button.style.padding = "10px 20px";
      button.style.fontSize = "1rem";
      button.style.backgroundColor = "#007bff";
      button.style.color = "white";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.margin = "10px 0"; 
      button.style.transition = "background-color 0.3s ease";

      
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#0056b3";
      });
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#007bff";
      });

      button.addEventListener("click", handleChoice);
      choicesContainer.appendChild(button);
    });
  
    
    let timeLeft = 10;
    timerDisplay.textContent = `Time Left: ${timeLeft}`;
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time Left: ${timeLeft}`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeout();
      }
    }, 1000);
  }
  
  
  function handleChoice(event) {
    clearInterval(timer); 
  
    const selectedOption = event.target.textContent;
    const round = rounds[currentRound];
  
    if (selectedOption === round.correctAnswer) {
      feedback.textContent = "Nice work!";
    } else {
      feedback.textContent = "Try harder.";
    }
  
    
    choicesContainer.style.display = "none";
    timerDisplay.style.display = "none";
  
    
    celebrityImage.style.display = "none"; 
    fullImage.src = round.fullImage;
    fullImage.style.display = "block"; 
  
    currentRound++;
    setTimeout(() => {
      
      choicesContainer.style.display = "flex";
      timerDisplay.style.display = "block";
      startNextRound();
    }, 3000); 
  }
  
  
  function handleTimeout() {
    const round = rounds[currentRound];
    feedback.textContent = "Time's up! The correct answer was " + round.correctAnswer;
  
    
    choicesContainer.style.display = "none";
    timerDisplay.style.display = "none";
  
    
    celebrityImage.style.display = "none"; 
    fullImage.src = round.fullImage;
    fullImage.style.display = "block"; 
    
    currentRound++;
    setTimeout(() => {
      choicesContainer.style.display = "flex";
      timerDisplay.style.display = "block";
      startNextRound();
    }, 3000); 
  }
  
  function endGame() {
    gameArea.style.display = "none";
    feedback.textContent = "Game Over! Thanks for playing.";
    startButton.textContent = "Play Again";
    startButton.style.display = "block";
  
    currentRound = 0;
  }