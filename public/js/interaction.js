var el = [];
var tiles = [];

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

    if(arrayEquals(targetTile, [currentTile[0]+currentSkip, currentTile[1]])){
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
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3);
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
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3);
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
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3);
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
            this.setAttribute('class', 'invalid-tile');
            removeAllListeners();
            const timeout = await new Promise(resolve => setTimeout(()=>{
                newBoard(3);
            }, 2000));
        }
    } else {
        this.setAttribute('class', 'invalid-tile');
        removeAllListeners();
        const timeout = await new Promise(resolve => setTimeout(()=>{
            newBoard(3);
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
    
    const endTile = document.getElementById(el[el.length - 1].id);
    const mutationConfig = { attributes: true, childList: false, subtree: false };
    
    const mutationCallback = (mutationsList, observer)=>{
        for(const mutation of mutationsList){
            if(mutation.type == "attributes"){
                if((mutation.target.id == el[el.length-1].id) && (mutation.target.className === 'marked-tile')){
                    newBoard(2);
                }
            }
        }
    }

    const observer = new MutationObserver(mutationCallback);
    for(const element of el){
        observer.observe(element, mutationConfig);
    }
}
