const rowSize = 7;
const colSize = 7;
var currentTile = [1, 0];

function hideNumbers(){
    const numbers = Array.from(document.getElementsByClassName('number'));

    numbers.forEach(element => {
        element.setAttribute('class', 'hidden-number');
    });
}

function clearBoard(){
    const timer = document.getElementById('timer-container');
    while (timer.firstChild) {
        timer.removeChild(timer.lastChild);
    }
    const board = document.getElementById('hack-board');
    while (board.firstChild) {
        board.removeChild(board.lastChild);
    }
    currentTile = [1, 0];
}

function retryClick(retryText){
    return new Promise(function (resolve, reject) {
      retryText.addEventListener('click', function () {
        resolve();
      });
    });
}

async function createIntro(boardType){
    const board = document.getElementById('hack-board');
    const introContainer = document.createElement('div');
    introContainer.setAttribute('class', 'intro-container');
    board.appendChild(introContainer);
    const introText = document.createElement('div');
    introText.setAttribute('class', 'intro-text');

    if(boardType == 1){
        introText.innerText = 'AWAITING SERVER CONNECTION';
        introContainer.appendChild(introText);
    } else if(boardType == 2){
        introText.innerHTML = 'SOLVED<br/>SERVER CONNECTION GRANTED';
        const retryText = document.createElement('a');
        retryText.innerText = 'RETRY';
        const selectionContainer = document.createElement('div');
        selectionContainer.setAttribute('class', 'selection-container');
        introContainer.appendChild(introText);
        introContainer.appendChild(selectionContainer);
        selectionContainer.appendChild(retryText);
        await retryClick(retryText);
    } else if(boardType == 3){
        introText.innerHTML = 'FAILED<br/>SERVER CONNECTION REFUSED';
        const retryText = document.createElement('a');
        retryText.innerText = 'RETRY';
        const selectionContainer = document.createElement('div');
        selectionContainer.setAttribute('class', 'selection-container');
        introContainer.appendChild(introText);
        introContainer.appendChild(selectionContainer);
        selectionContainer.appendChild(retryText);
        await retryClick(retryText);
    } else if(boardType == 4){
        introText.innerHTML = 'TIMED OUT<br/>SERVER CONNECTION REFUSED';
        const retryText = document.createElement('a');
        retryText.innerText = 'RETRY';
        const selectionContainer = document.createElement('div');
        selectionContainer.setAttribute('class', 'selection-container');
        introContainer.appendChild(introText);
        introContainer.appendChild(selectionContainer);
        selectionContainer.appendChild(retryText);
        await retryClick(retryText);
    }
}

function createBoard(grid){
    const board = document.getElementById('hack-board');

    for(let i = 0; i<rowSize; i++){
        for(let j = 0; j<colSize; j++){
            if(i==currentTile[0] & j==currentTile[1]){
                const tile = document.createElement('div');
                tile.setAttribute('class', 'marked-tile-blinking');
                tile.setAttribute('id', `${i}${j}`);
                const number = document.createElement('p');
                number.setAttribute('class', 'number');
                number.innerHTML = grid[i][j];
                tile.appendChild(number);
                board.appendChild(tile);
            } else{
                const tile = document.createElement('div');
                tile.setAttribute('class', 'tile');
                tile.setAttribute('id', `${i}${j}`);
                const number = document.createElement('p');
                number.setAttribute('class', 'number');
                number.innerHTML = grid[i][j];
                tile.appendChild(number);
                board.appendChild(tile);
            }
        }
    }
}