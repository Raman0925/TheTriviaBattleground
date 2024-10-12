
let categories = document.getElementById("categories").value;


// Fetching Easy Questions
const playerName = () =>{
  
}
const fetchingEasyQuestions = async (categories) => {
  const URL =  `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&difficulty=easy`
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  
  return responseJson;

};

const fetchingMediumQuestions = async (categories) => {
  const URL =  `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&region=IN&difficulty=medium`
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  
  return responseJson;

};

const fetchingDifficultQuestions = async (categories) => {
  const URL =  `https://the-trivia-api.com/api/questions?categories=${categories}&limit=2&region=IN&difficulty=hard`
  const response = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson = await response.json();
  
  return responseJson;

};

