const gameContainer = document.getElementById("game");
let firstPick = null;
const body = document.querySelector('body');
const reset = document.querySelector('#reset');
let lastMove;
let score = 0;
const scorebar = document.querySelector('#scorebar');
const highScoreBar = document.querySelector('#highScoreBar');
let highScore = localStorage.getItem('score');
scorebar.innerText = "Your Score: ";

if (highScore == null){
  highScoreBar.innerText = "High Score: 0"
}
else{
highScoreBar.innerText = "High Score: " + highScore;
}

//https://www.tutorialspoint.com/javascript-sleep-function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const start = document.querySelector('#start');
const title = document.querySelector('#title');
start.addEventListener("click",function(e){
    title.classList.add('start');
    
})


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(Date.now() - lastMove < 2000){
    return;
  }
  console.log("you just clicked", event.target);
  if(event.target.classList.contains('clicked')){
    return;
  }
  if(firstPick === null){
      event.target.classList.add('clicked');
      firstPick = event.target;
  }
  else{
    event.target.classList.add('clicked');
    lastMove = Date.now();
    if(event.target.classList[0] === firstPick.classList[0]){
        console.log('MATCH!');
        firstPick = null;
        score+=20;
        scorebar.innerText = "Your Score: " + score;

        if (score === 100){
          sleep(700).then(() => {
            if(alert('Good job, you win!  Press "Ok" to play again!')){}
            else    window.location.reload(); 
        })}

        if (score > highScore || highScore == undefined){
        highScore = score;
        highScoreBar.innerText = "High Score: " + highScore + " You set a new High Score!";
        localStorage.setItem('score',highScore);
        }
      }

    else{
        sleep(2000).then(() => {
        event.target.classList.remove('clicked');
        firstPick.classList.remove('clicked');
        firstPick = null;
        })
    }
  }

}

reset.addEventListener('click', function(e){
  window.location.reload(); 
})







// when the DOM loads
createDivsForColors(shuffledColors);

/* */