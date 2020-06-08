
let appContainer = document.getElementsByClassName('js-app-container')[0];

let resetButton = document.querySelector('#js-reset-btn');

resetButton.addEventListener('click', () => {
  //   console.log('Hello');
  //clear the board

});

// let elements = document.querySelectorAll('.element');
let scoreBoard = document.querySelector('.scoreBoard');

let state = {
    isGameOver: false,
    winner: '',
    currentTurn: 'X',
    // check to see if all squares all filled
    tie: false
}

let playersTurn = 'X';


//one event listener test
let table = document.querySelector('.table');

table.addEventListener('click', (event) => {
    // console.log('From new stuff', event.target);
    let element = event.target;
    
    //check to see if elemnt is not empty
    if(element.innerText !== '' || state.isGameOver){
        // if already occupied then just retun
        // this will stop from placing on the same spot
        return;
    }

    if(playersTurn === 'X'){
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
        //check to see if its a tie
        checkForTie();
        // last step change turn 
        playersTurn = 'O';

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
        //check to see if its a tie
        checkForTie();
        // last step change turn 
         playersTurn = 'X';
    }

});

const rowCheck = (element) => { 
  let currentRow =  Number(element.parentElement.getAttribute('data-row'));
  let count = 0; 
  let allRowElements = element.parentElement.children;
  for(let i =0; i < allRowElements.length; i++){
    if(allRowElements[i].innerText === element.innerText){
    count++;
    }
  }
  // check to see if counter equal to 3
  if(count === 3){
    // console.log(`${element.innerText} won the game!`);
    //change the game to over
    state.isGameOver = true;
    scoreBoard.innerText = `${element.innerText} won the game!`;
  }
}



const columnCheck = (element) => {
    let currentColumn = Number(element.getAttribute('data-col'));
    // console.log(element.parentElement.nextSibling);
    let siblings = [element.parentElement];
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
    // console.log(columnSiblings);
    columnSiblings.forEach((child) => {
        if(child.innerText === element.innerText){
            count++;
        }
    });

    // check to see if counter equal to 3
    if(count === 3){
        // alert(`${element.innerText} won the game!`);
        scoreBoard.innerText = `${element.innerText} won the game!`;
    }
    
}

const majorDiagonalCheck = (element) => {
    let count = 0;
    let allRows = element.parentElement.parentElement.children;
    let currentElement;
    for(let i =0; i < allRows.length; i++){
      currentElement = allRows[i].children[i];
    //   console.log(currentElement);
      if(currentElement.innerText === element.innerText){
        //increase count by one
        count++;
      }
    }
 
  if(count === 3){
    // alert(`${element.innerText} won the game!`);
    scoreBoard.innerText = `${element.innerText} won the game!`;
  }
}


const minorDiagonalCheck = (element) => {
    let count = 0;
    let allRows = element.parentElement.parentElement.children;
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
 
  if(count === 3){
    // alert(`${element.innerText} won the game!`);
    scoreBoard.innerText = `${element.innerText} won the game!`;
  }
}


const getAllSiblings = (element) => {
  
}

const checkForTie = () => {
  let count = 0;
  let allElements = getAllTableElements();
  
  allElements.forEach((element) => {
      if(element.innerText !== ''){
        count++;
      }
  });

  if(count === 9 ){
    state.isGameOver = true;
    scoreBoard.innerText = `Its a tie!`;
  }
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
