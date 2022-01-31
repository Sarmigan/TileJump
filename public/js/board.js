const rowSize = 7;
const columnSize = 7;

function createBoard(grid){
    const board = document.getElementById('hack-board');

    for(let i = 0; i<rowSize; i++){
        for(let j = 0; j<columnSize; j++){
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