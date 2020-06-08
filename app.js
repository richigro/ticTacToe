// console.log('Connected');

let appContainer = document.getElementsByClassName('js-app-container')[0];

let elements = document.querySelectorAll('.element');
let scoreBoard = document.querySelector('.scoreBoard');

let playersTurn = 'X';

elements.forEach((element) => {
    element.addEventListener('click', function(event){
        // check to see if spot is already occupied
        if(this.innerText !== ''){
            // if already occupied then just retun
            return;
        }
        
        
        if(playersTurn === 'X'){
            this.innerText = 'X';
            // do row check
            rowCheck(this);
            // last step change turn 
            playersTurn = 'O';

        } else {
            this.innerText = 'O';
              // do row check
            rowCheck(this);
            // last step change turn 
             playersTurn = 'X';
        }
    });
});


const rowCheck = (element) => { 
  let currentRow =  Number(element.parentElement.getAttribute('data-row'));
  let elementColumn = Number(element.getAttribute('data-col'));
  let count = 1; 
  let allRowElements = element.parentElement.children;
  console.log(allRowElements.forEach);
    if(element.innerText === 'X'){
     // current row equal to zero
     if(currentRow === 0){
      // chekck all colums to see if its x

     }
    } else {
        console.log(elementColumn);
    }

    // check to see if counter equal to 3
    if(count === 3){
        alert(`${element.innerText} won the game!`);
    }
}

const columnCheck = () => {
    
}

const diagonalCheck = () => {
    
}
