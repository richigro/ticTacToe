// The current state of the app
let state = {
    isGameOver: false,
    winner: '',
    currentTurn: 'X',
    isTie: false,
    roundWinners: [],
    user1: '',
    user2: ''
}

//Reference to key DOM elements
let appContainer = document.getElementsByClassName('js-app-container')[0];
let resetButton = document.querySelector('#js-reset-btn');
let scoreBoard = document.querySelector('.scoreBoard');
let table = document.querySelector('.table');
let rounds = document.querySelector('.rounds');

//Event listeners 

resetButton.addEventListener('click', () => {
  //clear the board
  let allElements = getAllTableElements();
   allElements.forEach((element) => {
    element.innerText = '';
   });

   // initialize the state object for a new game
   state.isGameOver = false;
   state.winner = '';
   state.currentTurn = 'X';
   state.isTie = false;

   //clear scoreboard
   scoreBoard.innerText = '';
});

table.addEventListener('click', (event) => {
  // console.log('From new stuff', event.target);
  let element = event.target;
    
  //check to see if elemnt is not empty
  if(element.innerText !== '' || state.isGameOver){
    // if already occupied then just retun
    // this will stop from placing on the same spot
    return;
  }

  if(state.currentTurn === 'X'){
    element.innerText = 'X';
    // do row check
    rowCheck(element);
    if(state.isGameOver){
      //end the event listener
      return;
    }
        //do a column check
        columnCheck(element);
        // do a diagonal check
        majorDiagonalCheck(element);
        //chek minor diagonal
        minorDiagonalCheck(element);
        //check to see if its a isTie
        checkForTie(element);
        // next turn
        state.currentTurn = 'O';

    } else {
        element.innerText = 'O';
          // do row check
        rowCheck(element);
        //do a column check
        columnCheck(element);
        //do a diagonal check
        majorDiagonalCheck(element);
        //chek minor diagonal
        minorDiagonalCheck(element);
        //check to see if its a isTie
        checkForTie(element);
        // Next turn 
        state.currentTurn = 'X';
    }
});

const rowCheck = (element) => { 
  let count = 0; 
  let allRowElements = element.parentElement.children;
  for(let i =0; i < allRowElements.length; i++){
    if(allRowElements[i].innerText === element.innerText){
    count++;
    }
  }
  checkForWinner(count, element);
}



const columnCheck = (element) => {
    let currentColumn = Number(element.getAttribute('data-col'));
    // console.log(element.parentElement.nextSibling);
    let count = 0;


    let allRows = element.parentElement.parentElement.children;
    // console.log(allRows);
    let currentChild;
    let innerChild;
    let colNum;
    let columnSiblings = [];
    for(let i = 0; i < allRows.length; i++){
        currentChild =allRows[i].children;
        for(let j =0; j < currentChild.length; j++){
            innerChild = currentChild[j];
            colNum = Number(innerChild.getAttribute('data-col'));
            if(colNum === currentColumn){
            //  console.log(innerChild);
             columnSiblings.push(innerChild);
            }
        }
    }
    columnSiblings.forEach((child) => {
        if(child.innerText === element.innerText){
            count++;
        }
    });

    checkForWinner(count, element); 
}

const majorDiagonalCheck = (element) => {
    let count = 0;
    let allRows = table.children[0].children;
   
    let currentElement;
    for(let i =0; i < allRows.length; i++){
      currentElement = allRows[i].children[i];
    //   console.log(currentElement);
      if(currentElement.innerText === element.innerText){
        //increase count by one
        count++;
      }
    }
    checkForWinner(count, element); 
}


const minorDiagonalCheck = (element) => {
    let count = 0;
    let allRows = table.children[0].children;
    
    let currentElement;
    let j =2;
    for(let i =0; i < allRows.length; i++){
      currentElement = allRows[i].children[j];
    //   console.log(currentElement);
      if(currentElement.innerText === element.innerText){
        //increase count by one
        count++;
      }
      j--;
    }
    checkForWinner(count, element); 
}

const checkForTie = (element) => {
  let count = 0;
  let spacesInTable = 9;
  let allElements = getAllTableElements();
  
  allElements.forEach((element) => {
      if(element.innerText !== ''){
        count++;
      }
  });

  checkForWinner(count, element, spacesInTable);
}


const getAllTableElements = () => {
    let rows = table.children[0].children;
    let currentRow;
    let innerEl;
    let allElements = [];
    for(let i =0; i < rows.length; i++){
        currentRow = rows[i].children;
        for(let j =0; j < currentRow.length; j++){
          innerEl = currentRow[j];
          allElements.push(innerEl);
        }
    }
    return allElements;
}

const checkForWinner = (count, element, countToWin = 3) => {
    element = element.innerText;
    
    if(count === countToWin){
    state.isGameOver = true;
    state.winner = element;
    if(state.isTie){
      //set the state to a tie
      state.isTie = true;
      scoreBoard.innerText = `Its a tie!`;
      state.roundWinners.push('tie');
      rounds.innerText = state.roundWinners;
    } else{
      state.winner = element.innerText;
      scoreBoard.innerText = `${state.winner} won the game!`;
      state.roundWinners.push(element);
      rounds.innerText = state.roundWinners;
    }
  }
};
