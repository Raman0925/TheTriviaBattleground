let player1;
let player2;
let currentPlayer;
let playerScores = {};
let selectedCategories = [];
let quizData = [];
let categories;
const categoriesArray = [
  "food_and_drink",
  "arts_and_literature",
  "film_and_tv",
  "general_knowledge",
  "geography",
  "history",
  "music",
  "science",
  "society_and_culture",
  "sport_and_leisure",
];

let questionIndex = 0;

const fetchingQuestions = async (categories) => {
  // Define the URLs for each difficulty level
  const URLEasy = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&difficulty=easy`;
  const URLMedium = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&difficulty=medium`;
  const URLHard = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&difficulty=hard`;

  try {
    // Fetch questions for each difficulty level
    const [easyResponse, mediumResponse, hardResponse] = await Promise.all([
      fetch(URLEasy, { headers: { "Content-Type": "application/json" } }),
      fetch(URLMedium, { headers: { "Content-Type": "application/json" } }),
      fetch(URLHard, { headers: { "Content-Type": "application/json" } }),
    ]);

    if (!easyResponse.ok || !mediumResponse.ok || !hardResponse.ok) {
      throw new Error("One or more API requests failed");
    }

    const easyQuestions = await easyResponse.json();
    const mediumQuestions = await mediumResponse.json();
    const hardQuestions = await hardResponse.json();

    // Map and combine questions with difficulty level
    const quizData = [
      ...easyQuestions.map((question) => ({
        question: question.question,
        correctAnswer: question.correctAnswer,
        incorrectAnswers: question.incorrectAnswers,
        difficulty: "easy",
      })),
      ...mediumQuestions.map((question) => ({
        question: question.question,
        correctAnswer: question.correctAnswer,
        incorrectAnswers: question.incorrectAnswers,
        difficulty: "medium",
      })),
      ...hardQuestions.map((question) => ({
        question: question.question,
        correctAnswer: question.correctAnswer,
        incorrectAnswers: question.incorrectAnswers,
        difficulty: "hard",
      })),
    ];

    return quizData; // Return the combined array of questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return []; // Return an empty array on error
  }
};

const removingCategories = () => {
  const endForm = document.getElementById("endForm");
  endForm.innerHTML = "";

  const modifiedCategories = document.getElementById("modifiedCategories");

  modifiedCategories.innerHTML = "";

  filteredCategories = categoriesArray.filter(
    (category) => !selectedCategories.includes(category)
  );

  filteredCategories.forEach((element) => {
    const option = document.createElement("option");
    option.text = element.toUpperCase().replace(/_/g, " ");
    option.value = element;
    modifiedCategories.appendChild(option);
  });

  const nextCategoryButton = document.createElement("button");
  nextCategoryButton.textContent = "Select Another Category";
  nextCategoryButton.onclick = afterNextCategory;
  endForm.append(nextCategoryButton);
};

const displayFeedback = (message) => {
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.textContent = message;
};

const updateScoreDisplay = () => {
  const scoreContainer = document.getElementById("score");
  scoreContainer.innerHTML = ""; // Clear previous scores

  // Create score elements for both players
  const player1ScoreElement = document.createElement("div");
  player1ScoreElement.textContent = `${
    player1.charAt(0).toUpperCase() + player1.slice(1)
  }: ${playerScores[player1]}`;
  player1ScoreElement.classList.add("score-item"); // Optional styling class

  const player2ScoreElement = document.createElement("div");
  player2ScoreElement.textContent = `${
    player2.charAt(0).toUpperCase() + player2.slice(1)
  }: ${playerScores[player2]}`;
  player2ScoreElement.classList.add("score-item"); // Optional styling class

  // Append score elements to the score container
  scoreContainer.appendChild(player1ScoreElement);
  scoreContainer.appendChild(player2ScoreElement);
};

const checkAnswer = (selectedAnswer, correctAnswer, level, currentPlayer) => {
  const POINTS = { easy: 10, medium: 15, hard: 20 };
  if (selectedAnswer === correctAnswer) {
    playerScores[currentPlayer] += POINTS[level];
    console.log(playerScores);
    displayFeedback(
      `Correct answer!  score is now: ${playerScores[currentPlayer]}`
    );
  } else {
    displayFeedback(`Wrong answer! The correct answer was: ${correctAnswer}`);
  }

  updateScoreDisplay();
  questionIndex++;
  askNextQuestion();
};
const questionRender = (question, currentPlayer) => {
  const battleGround = document.getElementById("battle-ground");
  battleGround.innerHTML = "";
  const playerNameTag = document.createElement("p");
  playerNameTag.classList.add("player-name");
  playerNameTag.textContent = `Player: ${
    currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
  }`;
  battleGround.appendChild(playerNameTag);

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-div");

  const questionpTag = document.createElement("p");
  questionpTag.classList.add("question-text");
  questionpTag.textContent = question.question;

  let answers = [...question.incorrectAnswers, question.correctAnswer];

  answers.sort(() => Math.random() - 0.5);

  const answerButtonhandler = (event) => {
    const selectedButton = event.currentTarget;
    const selectedAnswer = selectedButton.textContent;
    checkAnswer(
      selectedAnswer,
      question.correctAnswer,
      question.difficulty,
      currentPlayer
    );
  };
  questionDiv.appendChild(questionpTag);
  answers.forEach((element) => {
    const answerButton = document.createElement("button");
    answerButton.classList.add("answer-button");
    answerButton.textContent = element;
    answerButton.onclick = answerButtonhandler;
    questionDiv.appendChild(answerButton);
  });
  battleGround.appendChild(questionDiv);
};

const askNextQuestion = () => {
  if (questionIndex < quizData.length) {
    const question = quizData[questionIndex];
    currentPlayer = questionIndex % 2 === 0 ? player1 : player2;
    questionRender(question, currentPlayer);
  } else {
    endGame();
  }
};

const endGame = () => {
  const battleGround = document.getElementById("battle-ground");
  const feedbackDiv = document.getElementById("feedback");
  feedbackDiv.classList.add("feedback-flex");
  battleGround.classList.add("battle-ground-h");
  battleGround.classList.remove("battle-ground");
  removingCategories();

  const endScreen = document.getElementById("endGame");
  endScreen.classList.remove("next-categories-h");
  endScreen.classList.add("next-categories");

  displayFeedback(
    `Game over! Final scores - ${player1}: ${playerScores[player1]}, ${player2}: ${playerScores[player2]}`
  );

  // Task 3 Create a button to allow selecting another category
};

const startGameHandler = (e) => {
  e.preventDefault();

  player1 = document.getElementById("player-1").value;

  player2 = document.getElementById("player-2").value;

  playerScores[player1] = 0;
  playerScores[player2] = 0;
  if (player1.length > 2 && player2.length > 2) {
    const playersRegistration = document.getElementsByClassName(
      "players-registration"
    );
    playersRegistration[0].classList.add("players-form");
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.classList.add("category-container");
    categoryContainer.classList.remove("cat-sel-container");
  } else {
    const span1 = document.getElementById("player1-error");
    const span2 = document.getElementById("player2-error");
    if (player1.length < 2) {
      span1.textContent =
        "Minimum 3 letters in the name and name should be different";
      span1.style.color = "red";
    }
    if (player2.length < 2) {
      span2.textContent =
        "Minimum 3 letters in the name and name should be different";
      span2.style.color = "red";
    }
  }
};

const battlegroundHandler = async (event) => {
  event.preventDefault();
  const categoryContainer = document.getElementById("category-container");

  categories = document.getElementById("categories").value;

  if (categories != "choose-category") {
    const forms = document.getElementById("forms");
    selectedCategories.push(categories);

    forms.style.display = "none";
    const battleGround = document.getElementById("battle-ground");

    battleGround.classList.remove("battle-ground-h");
    battleGround.classList.add("battle-ground");

    quizData = await fetchingQuestions(categories);

    console.log(quizData);

    questionIndex = 0;
    askNextQuestion();
  } else {
    const span = document.createElement("span");
    span.textContent = "";

    span.textContent = "Please choose a category";
    span.style.color = "red";
    categoryContainer.append(span);
  }
};

const afterNextCategory = async (event) => {
  event.preventDefault();
  const endScreen = document.getElementById("endGame");
  endScreen.classList.add("next-categories-h");
  endScreen.classList.remove("next-categories");
  const categoryContainer = document.getElementById("category-container");
  const selectedCategory = document.getElementById("modifiedCategories").value;

  if (selectedCategory && selectedCategory !== "choose-category") {
    selectedCategories.push(selectedCategory);
    const battleGround = document.getElementById("battle-ground");
    console.log(selectedCategories);
    battleGround.classList.remove("battle-ground-h");
    battleGround.classList.add("battle-ground");

    quizData = await fetchingQuestions(selectedCategory);
    questionIndex = 0;
    askNextQuestion();
  } else {
    const span = document.createElement("span");
    span.textContent = "Please choose a valid category";
    span.style.color = "red";
    categoryContainer.append(span);
  }
};
