import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewGame from './components/NewGame'
import ScoreBoard from './components/ScoreBoard'
import { HighScore } from './components/HighScore'
import DisplayCard from './components/DisplayCards'
import GameWin from './components/GameWin'
import GameOver from './components/GameOver'
import Welcome from './components/Welcome'
import Reset from './components/Reset'



function App() {
  // off, on, win, lose
  // let gameStatus = "off";  // only works on first load since components won't see changes when using startGame();
  const [gameStatus, setGameStatus] = useState("off")
  const [gameArray, setGameArray] = useState([{}, {}, {}, {}, {}])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // This is good. Can also use for prefetch api call.
  // useEffect(() => {
  //   score > highScore ? setHighScore(score) : null ;
  // }, [gameStatus, score, highScore]);
  
  function checkLocalHighScore() {
    let localScore = JSON.parse(localStorage.getItem("highscore"))
    console.log(localScore)
    console.log(typeof localScore)
    if(localScore > highScore) {
      setHighScore(localScore)
    }
  }
  checkLocalHighScore();

  function reset() {
    localStorage.clear();
    setHighScore(0)
  }

  function checkWinCondition(tempScore) {
    if(tempScore == 5) {
      console.log("you win")
      setGameStatus("win")
    }
  }

  async function startGame() {
    // reset gameArray
    setGameArray([{}, {}, {}, {}, {}])
    setScore(0)
    // change gameStatus back to "on"
//    setGameStatus("on")
    console.log(gameStatus)
    let randomNumArr = randomNumbers(5);
    // run FetchCards
    let a = await fetchCards(randomNumArr[0])
    let b = await fetchCards(randomNumArr[1])
    let c = await fetchCards(randomNumArr[2])
    let d = await fetchCards(randomNumArr[3])
    let e = await fetchCards(randomNumArr[4])
    let allCards = [a, b, c, d, e]
    let newArr = [...allCards];
    console.log(newArr)
    setGameArray(newArr)
    setGameStatus("on")
  }

  async function fetchCards(id) {
    // https://www.theodinproject.com/lessons/node-path-javascript-async-and-await
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {mode: 'cors'});
    const data = await response.json();
    // let name = data.name;
    // setGraphic(data.sprites.other.dream_world.front_default)
    // console.log(name)
    // console.log(graphic)
    let temp = {"name": data.name, "id": data.id, "picture": data.sprites.other.dream_world.front_default, "clickedOn": "no"  }
    //console.log(temp);
    return temp;
  }

  function randomNumbers(amount) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    const arr = [];
    while(arr.length < amount) {
      let r = Math.floor(Math.random() * 100) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);  // if arr.indexOf(random number) equals -1 aka "not present", push the random number
    }
    return arr;
  }

  
  function shuffle(array) {
    // Fisher-Yates aka Knuth Shuffle
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/

    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function flipSingleCard(e) {
    // used by cardClick(e) -- made for learning only. not in use.
    // https://stackoverflow.com/questions/63046477/how-to-get-an-element-from-event-target-closestname
    let cardDIV = e.target.closest(".gamecard")
    cardDIV.classList.toggle("hide-card"); 
    // https://stackoverflow.com/questions/24596091/javascript-targeting-child-elements-in-a-id
    let cardDIVpicture = cardDIV.getElementsByTagName("IMG");
    cardDIVpicture[0].classList.toggle("hide-picture");
  }

  function flipAllCards() {
    // let cardDIVs = document.getElementsByClassName("gamecard");
    let cardDivs = document.querySelectorAll(".loadSpan")
    let cardImages = document.querySelectorAll(".gamecard > IMG") 

    cardDivs.forEach(div => {
      div.classList.add("loader");
      setTimeout(()=> {
        div.classList.remove("loader")
      }, 1000)
    })

    cardImages.forEach(img => {
      img.classList.add("hide-picture");
      setTimeout(()=> {
        img.classList.remove("hide-picture");
      }, 1000)
    })    
  }

  function cardClick(e) {
    // target is the element that triggered the event (e.g., the user clicked on)
    // currentTarget is the element that the event listener is attached to.
    // gameCondition => score => highScore => flipAllCards => randomizeGameArrayOrder 
    
    // check click status -> score/high score AND gamewin or gameover
    let pokemonID = e.currentTarget.getAttribute('data-identity');
    let pokemonObj = gameArray.find((el) => el.id == pokemonID)

    if(pokemonObj.clickedOn == "no") {
      pokemonObj.clickedOn = "yes";
      let tempScore = score; //works because value is primative (i.e. a copy). 
      tempScore++
      setScore(tempScore)
      if(tempScore > highScore) {
        setHighScore(tempScore)
        localStorage.setItem("highscore", tempScore)
      }
      console.log("tempScore: " + tempScore)
      console.log("score is: " + score) // i think on this render, still uses old state
      // https://react.dev/learn/queueing-a-series-of-state-updates
      checkWinCondition(tempScore) // since in this render 'score' == 5
      flipAllCards();
      let tempArr = [...gameArray]
      shuffle(tempArr)
      setGameArray(tempArr)
    } else if(pokemonObj.clickedOn == "yes") {
      console.log("you lose")
      setGameStatus("lose")
    }
    
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <NewGame onClick={startGame} />
          <ScoreBoard score={score} />
          <HighScore highScore={highScore} />
          <Reset onClick={reset} />
        </div>

        <div>
          <h1 className='title'>Memory Game</h1>
        </div>

      <div className="gameboard">
        <Welcome gameStatus={gameStatus} />
        <DisplayCard gameStatus={gameStatus} gameArray={gameArray} onClick={cardClick} />
        {/* <GameWin gameStatus={gameStatus} />
        <GameOver gameStatus={gameStatus} /> */}
      </div>
      
      </div>
    </>
  )
}

export default App
