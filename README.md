# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Game structure:

COMPONENTS:
NewGame
--Scoreboard to zero
--FetchCards

FetchCards
-- Fetch graphics from API
-- store cards objects in array
----use state for array

DisplayCards
-- RandmizeCards
-- return Divs of Card Objects

Scoreboard
--counter of CardObject[selected]

Highest Score
--check localStorage on NewGame
--if ScoreBoard > current, store in localStorage on game end.

GameOver
--send score to Highest Score
--try again graphic popup (blocks viewer from seeing cards)

GameWin
--congrats graphic popup (blocks viewer from seeing cards)

Function:
randomizeCards()
-- randomize array in state
-- is there a new array random ()?

Card Object
--selected: yes/no
--image: from API
-- return Div
---- div onClick function:
------check selected.
------check GameOver status. (if selected: yes, then GameOver)
------If not game over, Add to Scoreboard object.
------Check if Scoreboard object is max, then run GameWin component
------Else run DisplayCards
