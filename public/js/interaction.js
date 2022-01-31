var el = [];
var tiles = [];
var colSize = 7;
var currentTile = [1, 0];

function arrayEquals(x, y) {
    return x.length === y.length && x.every((val, index) => val === y[index]);
}

const tileClick = function (){
    var targetTile = this.id.toString().split('').map(digit => parseInt(digit, 10));
    var currentSkip = parseInt(tiles[currentTile[0]][currentTile[1]].innerText);

    if(arrayEquals(targetTile, [currentTile[0]+currentSkip, currentTile[1]])){
        var isPathBlocked = false;
        for (var i = currentTile[0]+currentSkip; i>currentTile[0]; i--)
        {
            var tempEl = document.getElementById(tiles[i][currentTile[1]].id);
            if(tempEl.className == 'crossed-tile' || tempEl.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[0]+currentSkip; i>currentTile[0]; i--)
            {
                var tempEl = document.getElementById(tiles[i][currentTile[1]].id);
                tempEl.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
            console.log('Valid Move');
        } else{
            console.log('Invalid Move');
        }
    } else if(arrayEquals(targetTile, [currentTile[0]-currentSkip, currentTile[1]])){
        var isPathBlocked = false;
        for (var i = currentTile[0]-currentSkip; i<currentTile[0]; i++)
        {
            var tempEl = document.getElementById(tiles[i][currentTile[1]].id);
            if(tempEl.className == 'crossed-tile' || tempEl.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[0]-currentSkip; i<currentTile[0]; i++)
            {
                var tempEl = document.getElementById(tiles[i][currentTile[1]].id);
                tempEl.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
            console.log('Valid Move');
        } else{
            isPathBlocked = true;
        }
    } else if(arrayEquals(targetTile, [currentTile[0], currentTile[1]+currentSkip])){
        var isPathBlocked = false;
        for (var i = currentTile[1]+currentSkip; i>currentTile[1]; i--)
        {
            var tempEl = document.getElementById(tiles[currentTile[0]][i].id);
            if(tempEl.className == 'crossed-tile' || tempEl.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[1]+currentSkip; i>currentTile[1]; i--)
            {
                var tempEl = document.getElementById(tiles[currentTile[0]][i].id);
                tempEl.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
            console.log('Valid Move');
        } else {
            console.log('Invalid Move');
        }
    } else if(arrayEquals(targetTile, [currentTile[0], currentTile[1]-currentSkip])){
        var isPathBlocked = false;
        for (var i = currentTile[1]-currentSkip; i<currentTile[1]; i++)
        {
            var tempEl = document.getElementById(tiles[currentTile[0]][i].id);
            if(tempEl.className == 'crossed-tile' || tempEl.className == 'marked-tile'){
                isPathBlocked = true;
            }
        }
        if(!isPathBlocked){
            for (var i = currentTile[1]-currentSkip; i<currentTile[1]; i++)
            {
                var tempEl = document.getElementById(tiles[currentTile[0]][i].id);
                tempEl.setAttribute('class', 'crossed-tile');
            }
            currentTile = targetTile;
            this.setAttribute('class', 'marked-tile');
            console.log('Valid Move');
        } else{
            console.log('Invalid Move');
        }
    } else {
        console.log('Invalid Move');
    }
}

function tileInteraction(){
    const board = document.getElementById('hack-board');
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

    const observer = new MutationObserver((mutationsList, observer)=>{
        for(const mutation of mutationsList){
            if(mutation.type === "attributes"){
                console.log('solved');
                location.reload();
            }
        }
    });
    observer.observe(endTile, mutationConfig);
}
