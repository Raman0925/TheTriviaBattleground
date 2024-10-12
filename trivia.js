let categories = document.getElementById("categories").value;

const playerOne = (player1Name) => {
  return player1Name;
};
const playerTwo = (player2Name) => {
  return player2Name;
};

const fetchingEasyQuestions = async (categories) => {
  const URL = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&difficulty=easy`;
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();

  return responseJson;
};

const fetchingMediumQuestions = async (categories) => {
  const URL = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&region=IN&difficulty=medium`;
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();

  return responseJson;
};

const fetchingDifficultQuestions = async (categories) => {
  const URL = `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&region=IN&difficulty=hard`;
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();

  return responseJson;
};
const startGameHandler = (e) => {
  e.preventDefault();
  const player1Name = document.getElementById("player-1");
  const player2Name = document.getElementById("player-2");
  playerOne(player1Name);
  playerTwo(player2Name);
  const playersRegistration = document.getElementsByClassName(
    "players-registration"
  );
  playersRegistration[0].classList.add("players-form");
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.classList.add("category-container");
  categoryContainer.classList.remove("cat-sel-container");

};
