//cardlist variable holds all cards in a list
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

console.log("Here are shuffled cards: " + shuffle(icons))

const cardsContainer = document.querySelector(".deck");
let openedCards = [];
var matchedCards = [];

//Start the game and Create cards here
function init() { 
    for(var i = 0; i < icons.length; i++) {
    
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);    
        click(card);
    }
    shuffle(icons);
  //stopTimer();
  
}
  
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


let firstClick = true; 
function click(card) {
  //Add Event Listener for each card
    card.addEventListener("click", function() {
    if(firstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            firstClick = false;
        }
      
    const currentCard = this;
    const previousCard = openedCards[0]; 
    
    if(openedCards.length === 1) {      
      card.classList.add("show", "open", "disable");
       openedCards.push(this);
       compare(currentCard, previousCard);     
    } else {
       card.classList.add("show", "open", "disable");
       openedCards.push(this); 
       }   
  });
}



//compare two cards
function compare(currentCard, previousCard) { 
  if(currentCard.innerHTML === previousCard.innerHTML) {
         //add matched cards into an array;
         currentCard.classList.add("match");
         previousCard.classList.add("match");
         matchedCards.push(currentCard, previousCard);
         openedCards = [];
         isOver();     
       }else {
         //1000ms before unmatched cards flip over 
         setTimeout(function() {
           currentCard.classList.remove("open", "show", "disable");
           previousCard.classList.remove("open", "show", "disable");
           openedCards = [];
         }, 500);                  
       }
  addMove();
}

var newGameBtn = document.querySelector(".new-game");
var modal = document.getElementById('myModal');

function newGame() {
  newGameBtn.addEventListener("click", restart);
  newGameBtn.addEventListener("click", function() {
     modal.style.display = "none";
     
  });
 
}

var finalMinute = document.querySelector("#final-minute");
var finalSecond = document.querySelector("#final-second");
var finalMoves = document.querySelector("#final-moves");
var finalRating = document.querySelector("#final-rating");

function isOver() {
    if(matchedCards.length === icons.length) {                       
        //Give one second for the modal to pop up
        setTimeout(function() {  
         // newGame();
          modal.style.display = "block";            
          finalMinute.textContent = minute;
          finalSecond.textContent = second; 
          finalMoves.textContent = moves;
          if(moves >= 25) {
          finalRating.innerHTML = `<i class="fa fa-star">`;
             }else if(15 < moves < 25) {
          finalRating.innerHTML = `<i class="fa fa-star"></i>
                               <i class="fa fa-star"></i>`;   
             }else if(moves < 15){
          finalRating.innerHTML = `<i class="fa fa-star"></i>
                                   <i class="fa fa-star"></i>
                                   <i class="fa fa-star"></i>`;
        	                      	    
          }
          starsContainer.innerHTML = `<i class="fa fa-star"></i>`;
          movesContainer.innerHTML = 0;
          stopTimer();
          newGame();
          
          
        }, 1000);    
      
    }  
}


newGame();

//Add moves functions
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  //set the rating
  rating();
}

//Rating functinality
const starsContainer = document.querySelector(".stars");
function rating() {
  if(moves >= 25) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
  }else if(15 < moves < 25) {
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                               <li><i class="fa fa-star"></i></li>`;   
  }else {
     starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        	                      	<li><i class="fa fa-star"></i></li>
                                  <li><i class="fa fa-star"></i></li>`    
  }
  
 
}
//Restart function
const restartBtn = document.querySelector(".restart");


restartBtn.addEventListener("click", restart);
  
function restart() {    
  startTimer();
  //remove all cards
  cardsContainer.innerHTML = "";
  //invoke init() to restart the game with new cards
  init();
  //reset variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = `<i class="fa fa-star"></i>`;
  stopTimer();     	 
  };
 firstClick = true;


//set up the timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.textContent = minute+"mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//stop the timer when all cards are open
function stopTimer() {
  clearInterval(interval);
  second = 0;
  minute = 0;
  hour = 0;
  timer.textContent = minute+"mins "+second+" secs";
}

firstClick = true;


//Start the game
init();



