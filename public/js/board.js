const rowSize = 7;
const colSize = 7;
var currentTile = [1, 0];

async function clearBoard(){
    const board = document.getElementById('hack-board');
    while (board.firstChild) {
        board.removeChild(board.lastChild);
    }
    currentTile = [1, 0];
    console.log('Board cleared');
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