# Quiz Game Documentation

## Overview
This document explains the code for a quiz game that allows two players to answer questions from various categories. Players take turns answering questions, and their scores are updated based on their answers. The game supports multiple categories and difficulty levels.


## Plan 
 Plan was to make UI dynamically but Choose to go with some forms made in html. I was adding Elements dynamically while showing questions.
## Key Components

### Variables
- **player1, player2**: Stores the names of the two players.
- **currentPlayer**: Keeps track of which player is currently answering.
- **playerScores**: An object that holds the scores for each player.
- **selectedCategories**: An array to store categories that have been chosen.
- **quizData**: An array to hold the fetched quiz questions.
- **categories**: The category selected by the players.
- **categoriesArray**: An array of available quiz categories.
- **questionIndex**: Keeps track of the current question being asked.

### Functions

#### fetchingQuestions(categories)
- **Purpose**: Fetches quiz questions from the API for the selected categories and different difficulty levels (easy, medium, hard).
- **Returns**: An array of questions formatted with the question text, correct answer, incorrect answers, and difficulty.

#### removingCategories()
- **Purpose**: Updates the list of available categories by removing those already selected.
- **Displays**: A button to allow players to select another category after the game ends.

#### displayFeedback(message)
- **Purpose**: Displays feedback messages (e.g., correct/wrong answers) to players.

#### updateScoreDisplay()
- **Purpose**: Updates the display of player scores on the screen.

#### checkAnswer(selectedAnswer, correctAnswer, level, currentPlayer)
- **Purpose**: Checks if the selected answer is correct, updates the score if it is, and provides feedback. Calls `askNextQuestion()` to proceed.

#### questionRender(question, currentPlayer)
- **Purpose**: Renders the current question and possible answers for the player. Displays the player's name and the question.

#### askNextQuestion()
- **Purpose**: Asks the next question to the current player. If there are no more questions, it ends the game.

#### endGame()
- **Purpose**: Ends the game, displays final scores, and allows players to select another category.

#### startGameHandler(e)
- **Purpose**: Handles the form submission to start the game, validating player names and setting initial scores.

#### battlegroundHandler(event)
- **Purpose**: Handles the selection of a category and fetches the questions based on that category. Updates the display for the battle ground.

#### afterNextCategory(event)
- **Purpose**: Handles the selection of another category after the game ends. Fetches new questions for the selected category.

## Usage

1. **Starting the Game**: Players enter their names in the form. Names must be greater than three characters long.
2. **Choosing Categories**: Players select categories from the dropdown. Only unselected categories will be available.
3. **Answering Questions**: Players take turns answering questions. The game provides feedback for correct or wrong answers and updates scores accordingly.
4. **Ending the Game**: When all questions have been answered, the game displays the final scores and offers a chance to select another category for a new game.

## Error Handling
- The game checks if player names are valid (minimum length).
- If no category is selected, it prompts the player to choose one.
- It also handles API errors during question fetching by returning an empty array.

