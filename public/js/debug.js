function updateBoard(grid){
    var container = document.getElementById('hack-board');

    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[0].length; j++){
            var tile = document.createElement('div');
            tile.setAttribute('class', 'tile');
            container.appendChild(tile);
            if(grid[i][j] == 0){
                tile.innerText = `${grid[i][j]}`;
                tile.style.backgroundColor = '#4d4d4d';
            }
            else if(grid[i][j] == 9){
                tile.innerText = `${grid[i][j]}`;
                tile.style.backgroundColor = '#cf1111';
            }
            else{
                tile.innerText = `${grid[i][j]}`;
            }
        }
    }
}