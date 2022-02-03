var el = [];
var tiles = [];
var boardTimeout;
var score = 0;

function removeAllListeners(){
    el.forEach(element => {
        document.getElementById(element.id).removeEventListener('click', tileClick);
    });
}

function arrayEquals(x, y) {
    return x.length === y.length && x.every((val, index) => val === y[index]);
}

const tileClick = async function (){
    //LEFT REMOVES MARKED TILE
    var targetTile = this.id.toString().split('').map(digit => parseInt(digit, 10));
    var currentSkip = parseInt(tiles[currentTile[0]][currentTile[1]].innerText);
    if(document.getElementById(tiles[currentTile[0]][currentTile[1]].id).className == 'tile'){
        if(arrayEquals(targetTile, [currentTile[0], currentTile[1]])){
            this.setAttribute('class', 'marked-tile');
            return;
        }
        else{
            clearInterval(boardTimeout);
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3, true);
            }, 2000));
            return;
        }
    }
    else if(arrayEquals(targetTile, [currentTile[0]+currentSkip, currentTile[1]])){
        var isPathBlocked = false;
        for (var i = currentTile[0]+currentSkip; i>currentTile[0]; i--)
        {
            var tile = document.getElementById(tiles[i][currentTile[1]].id);
            if(tile.className == 'crossed-tile' || tile.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[0]+1; i<currentTile[0]+currentSkip; i++)
            {
                var tile = document.getElementById(tiles[i][currentTile[1]].id);
                tile.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
        } else{
            clearInterval(boardTimeout);
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3, true);
            }, 2000));
        }
    } else if(arrayEquals(targetTile, [currentTile[0]-currentSkip, currentTile[1]])){
        var isPathBlocked = false;
        for (var i = currentTile[0]-currentSkip; i<currentTile[0]; i++)
        {
            var tile = document.getElementById(tiles[i][currentTile[1]].id);
            if(tile.className == 'crossed-tile' || tile.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[0]+1; i>currentTile[0]+currentSkip; i--)
            {
                var tile = document.getElementById(tiles[i][currentTile[1]].id);
                tile.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
        } else{
            clearInterval(boardTimeout);
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3, true);
            }, 2000));
        }
    } else if(arrayEquals(targetTile, [currentTile[0], currentTile[1]+currentSkip])){
        var isPathBlocked = false;
        for (var i = currentTile[1]+currentSkip; i>currentTile[1]; i--)
        {
            var tile = document.getElementById(tiles[currentTile[0]][i].id);
            if(tile.className == 'crossed-tile' || tile.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[1]+1; i<currentTile[1]+currentSkip; i++)
            {
                var tile = document.getElementById(tiles[currentTile[0]][i].id);
                tile.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
        } else {
            clearInterval(boardTimeout);
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3, true);
            }, 2000));
        }
    } else if(arrayEquals(targetTile, [currentTile[0], currentTile[1]-currentSkip])){
        var isPathBlocked = false;
        for (var i = currentTile[1]-currentSkip; i<currentTile[1]; i++)
        {
            var tile = document.getElementById(tiles[currentTile[0]][i].id);
            if(tile.className == 'crossed-tile' || tile.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[1]-1; i>currentTile[1]-currentSkip; i--)
            {
                var tile = document.getElementById(tiles[currentTile[0]][i].id);
                tile.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
        } else{
            clearInterval(boardTimeout);
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3, true);
            }, 2000));
        }
    } else {
        clearInterval(boardTimeout);
        this.setAttribute('class', 'invalid-tile');
        removeAllListeners();
        const timeout = await new Promise(resolve => setTimeout(()=>{
            newBoard(3, true);
        }, 2000));
    }
}

function tileInteraction(){
    const board = document.getElementById('hack-board');
    tiles = [];
    el = Array.from(board.childNodes);

    el.forEach(element => {
        element.addEventListener('click', tileClick, false);
    });
    
    for (let i = 0; i < el.length; i += colSize) {
        var temp = el.slice(i, i + colSize);
        tiles.push(temp);
    }

    var startTile = document.getElementById(tiles[currentTile[0]][currentTile[1]].id);
    startTile.setAttribute('class', 'tile');

    const endTile = document.getElementById(el[el.length - 1].id);
    const mutationConfig = { attributes: true, childList: false, subtree: false };
    
    const mutationCallback = async (mutationsList, observer)=>{
        for(const mutation of mutationsList){
            if(mutation.type == "attributes"){
                if(mutation.target.className === 'marked-tile'){
                    clearInterval(boardTimeout);
                    removeAllListeners();
                    score += 6000-ms;
                    const timeout = await new Promise(resolve => setTimeout(()=>{
                        newBoard(2, false);
                    }, 2000));
                }
            }
        }
    }

    const observer = new MutationObserver(mutationCallback);
    observer.observe(el[el.length-1], mutationConfig);

    const timer = document.createElement('p');
    timer.setAttribute('class', 'timer');
    document.getElementById('timer-container').appendChild(timer);

    var ms = 0;
    boardTimeout = setInterval(async ()=>{
        if(ms === 6000){
            clearInterval(boardTimeout);
            newBoard(4, true);
        }
        timer.innerText = (6 - (ms/1000)).toFixed(1);
        ms+=100;
    }, 100);
}
