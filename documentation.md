# Heading 1
## Heading 2
### Heading 3

This is a **bold** text and this is *italic* text.

- List item 1
- List item 2


[Link to OpenAI](https://www.openai.com)

# Trivia Two Player Game Docs

## UI of Two Player game
The UI of Two player Game must have
- input for Name 
 - player 1
 - player 2
- Button for Starting the Game
- Category Form
 - Category fetch from trivia (dropdown menu)
 - submit button
- Quiz UI 
 - Question (dynamically add)
 - 4 Options
- Ending Screen
 - End Button
 - Input Category


# Logic Game
The Logic of the game should be :
food_and_drink
arts_and_literature
film_and_tv
geography
general_knowledge
history
music
science
society_and_culture
sport_and_leisure
-
Fetching Easy Questions
https://the-trivia-api.com/api/questions?categories=${category}&limit=2&region=IN&difficulty=easy
https://the-trivia-api.com/api/questions?categories=${category}&limit=2&region=IN&difficulty=medium
https://the-trivia-api.com/api/questions?categories=${category}&limit=2&region=IN&difficulty=hard
