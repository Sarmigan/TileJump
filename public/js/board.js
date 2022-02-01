const rowSize = 7;
const colSize = 7;
var currentTile = [1, 0];

function hideNumbers(){
    const numbers = Array.from(document.getElementsByClassName('number'));

    numbers.forEach(element => {
        element.setAttribute('class', 'hidden-number');
    });
}

async function clearBoard(){
    const board = document.getElementById('hack-board');
    while (board.firstChild) {
        board.removeChild(board.lastChild);
    }
    currentTile = [1, 0];
}

function createIntro(boardType){
    const board = document.getElementById('hack-board');
    const text = document.createElement('p');
    text.setAttribute('class', 'intro-text');

    if(boardType == 1){
        text.innerText = 'AWAITING SERVER CONNECTION';
    } else if(boardType == 2){
        text.innerHTML = 'SOLVED<br/>AWAITING SERVER CONNECTION';
    } else if(boardType == 3){
        text.innerHTML = 'FAILED<br/>AWAITING SERVER CONNECTION';
    } else if(boardType == 4){
        text.innerHTML = 'TIMED OUT<br/>AWAITING SERVER CONNECTION';
    }

    board.appendChild(text);
}

function createBoard(grid){
    const board = document.getElementById('hack-board');

    for(let i = 0; i<rowSize; i++){
        for(let j = 0; j<colSize; j++){
            if(i==1 & j==0){
                const tile = document.createElement('div');
                tile.setAttribute('class', 'marked-tile');
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