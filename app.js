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
            //do a column check
            columnCheck(this);
            // last step change turn 
            playersTurn = 'O';

        } else {
            this.innerText = 'O';
              // do row check
            rowCheck(this);
            //do a column check
            columnCheck(this);
            // last step change turn 
             playersTurn = 'X';
        }
    });
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
    alert(`${element.innerText} won the game!`);
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
    console.log(columnSiblings);
    columnSiblings.forEach((child) => {
        if(child.innerText === element.innerText){
            count++;
        }
    });

    // check to see if counter equal to 3
    if(count === 3){
        alert(`${element.innerText} won the game!`);
    }
    
}

const diagonalCheck = () => {
    
}


const getAllSiblings = (element) => {
  
}
