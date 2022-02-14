function createGrid(rowSize, colSize){
    var grid = [];
    
    for(var i=0; i<rowSize; i++){
        var temp = [];
        for(var j=0; j<colSize; j++){
            if(i == 0 && j == 0){
                temp.push(9);
            }
            else{
                temp.push(0);
            }
        }
        grid.push(temp);
    }

    return grid;
}

function fillGrid(endy, endx, grid){
    var temp = grid;

    for (var i = 0; i < temp.length; i++)
    {
        for (var j = 0; j < temp[i].length; j++)
        {
            if(i == endy && j == endx)
            {
                temp[i][j] = 0;
            }
            else if(i == 0 && j == 0){
                temp[i][j] = 0;
            }
            else if (temp[i][j] == 0 || temp[i][j] == 9)
            {
                var skip = Math.floor(Math.random() * 1000)+1;
    
                switch (true) {
                    case skip <= 235: //23.5% for 1
                        skip = 1;
                        break;
                    case skip <= 735: //50% for 2
                        skip = 2;
                        break;
                    case skip <= 885: //15% for 3
                        skip = 3;
                        break;
                    case skip <= 985: //10% for 4
                        skip = 4;
                        break;
                    case skip <= 995: //1% for 5
                        skip = 5;
                        break;
                    case skip <= 1000: //0.5% for 6
                        skip = 6;
                        break;
                }
                
                temp[i][j] = skip;
            }
            else{
                temp[i][j] = Math.abs(temp[i][j]);
            }
        }
    }

    return temp;
}

function inverseGrid(grid){
    var temp = grid;

    for(var i=0; i<temp.length; i++){
        for(var j=0; j<temp[0].length; j++){
            if(temp[i][j] != 0 && temp[i][j] != 9){
                temp[i][j] = -Math.abs(temp[i][j]);
            }
        }
    }

    return temp;
}

function addPath(starty, startx, endy, endx, inputGrid){
    var grid = inputGrid;
    var retries = 0;

    while (true)
    {
        var steps = 0;
        var attempts = 0;
        var rowSize = inputGrid.length;
        var colSize = inputGrid[0].length;

        var curx = startx;
        var cury = starty;

        while(!(curx==endx && cury==endy))
        {
            //CHANGE
            if (steps > 8)
            {
                steps = 0;
                //console.log('[FAILED] Too many steps... Retrying!');
                break;
            }

            //CHANGE
            if (attempts > 100)
            {
                steps = 0;
                attempts = 0;
                //console.log('[FAILED] Too many attempts... Retrying!');
                break;
            }

            var dir = Math.floor(Math.random() * 4)+1;
            var skip = Math.floor(Math.random() * 1000)+1;

            switch (true) {
                case skip <= 235: //23.5% for 1
                    skip = 1;
                    break;
                case skip <= 735: //50% for 2
                    skip = 2;
                    break;
                case skip <= 885: //15% for 3
                    skip = 3;
                    break;
                case skip <= 985: //10% for 4
                    skip = 4;
                    break;
                case skip <= 995: //1% for 5
                    skip = 5;
                    break;
                case skip <= 1000: //0.5% for 6
                    skip = 6;
                    break;
            }

            if (dir == 1)
            {
                //console.log(`[ATTEMPT] Move up by ${skip}...`);

                if(cury-skip < 0)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i=cury; i>cury-skip; i--)
                {
                    if(grid[i][curx] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                if (grid[cury-skip][curx] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    if (grid[cury-skip][curx] < 0){
                        for (var i = cury; i > cury - skip; i--)
                        {
                            grid[i][curx] = 9;
                        }
                        grid[cury][curx] = skip;
                        cury = cury - skip;
                        steps++;
                        
                        return grid;   
                    }
                    attempts++;
                    continue;
                }

                for (var i = cury; i > cury - skip; i--)
                {
                    grid[i][curx] = 9;
                }
                grid[cury][curx] = skip;
                cury = cury - skip;
                steps++;
                //console.log(`[SUCCESS] Moved up by ${skip}!`);
                //console.log();
            }

            if (dir == 2)
            {
                //console.log(`[ATTEMPT] Move down by ${skip}...`);

                if (cury + skip > rowSize - 1)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i = cury; i < cury + skip; i++)
                {
                    if (grid[i][curx] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                if (grid[cury + skip][curx] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    if (grid[cury + skip][curx] < 0){
                        for (var i = cury+1; i < cury + skip; i++)
                        {
                            grid[i][curx] = 9;
                        }
                        grid[cury][curx] = skip;
                        cury = cury + skip;
                        steps++;
                        
                        return grid;
                    }
                    attempts++;
                    continue;
                }

                for (var i = cury+1; i < cury + skip; i++)
                {
                    grid[i][curx] = 9;
                }
                grid[cury][curx] = skip;
                cury = cury + skip;
                steps++;
                //console.log(`[SUCCESS] Moved down by ${skip}!`);
                //console.log();
            }

            if (dir == 3)
            {
                //console.log(`[ATTEMPT] Move left by ${skip}...`);

                if (curx - skip < 0)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i = curx; i > curx - skip; i--)
                {
                    if (grid[cury][i] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                if (grid[cury][curx - skip] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    if (grid[cury][curx - skip] < 0)
                    {
                        for (var i = curx; i > curx - skip; i--)
                        {
                            grid[cury][i] = 9;
                        }
                        grid[cury][curx] = skip;
                        curx = curx - skip;
                        steps++;
                        
                        return grid;
                    }
                    attempts++;
                    continue;
                }

                for (var i = curx; i > curx - skip; i--)
                {
                    grid[cury][i] = 9;
                }
                grid[cury][curx] = skip;
                curx = curx - skip;
                steps++;
                //console.log(`[SUCCESS] Moved left by ${skip}!`);
                //console.log();
            }

            if (dir == 4)
            {
                //console.log(`[ATTEMPT] Move right by ${skip}...`);

                if (curx + skip > colSize - 1)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i = curx; i < curx + skip; i++)
                {
                    if (grid[cury][i] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                if (grid[cury][curx + skip] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    if (grid[cury][curx + skip] < 0){
                        for (var i = curx+1; i < curx + skip; i++)
                        {
                            grid[cury][i] = 9;
                        }
                        grid[cury][curx] = skip;
                        curx = curx + skip;
                        steps++;

                        return grid;
                    }

                    attempts++;
                    continue;
                }

                for (var i = curx+1; i < curx + skip; i++)
                {
                    grid[cury][i] = 9;
                }
                grid[cury][curx] = skip;
                curx = curx + skip;
                steps++;
                //console.log(`[SUCCESS] Moved right by ${skip}!`);
                //console.log();
            }
        }

        if (steps != 0)
        {
            //console.log('[SUCCESS] Finished adding path!');
            break;
        }

        retries++;

        if(retries > 3){
            return null;
        }

        grid = inputGrid;
    }
    return grid;
}

function createPath(starty, startx, endy, endx, rowSize, colSize)
{
    var grid = createGrid(rowSize, colSize);

    while (true)
    {
        var steps = 0;
        var attempts = 0;

        var curx = startx;
        var cury = starty;

        while(!(curx==endx && cury==endy))
        {
            //CHANGE
            if (steps > 8)
            {
                steps = 0;
                //console.log('[FAILED] Too many steps... Retrying!');
                break;
            }

            //CHANGE
            if (attempts > 1000)
            {
                steps = 0;
                attempts = 0;
                //console.log('[FAILED] Too many attempts... Retrying!');
                break;
            }

            var dir = Math.floor(Math.random() * 4)+1;
            var skip = Math.floor(Math.random() * 1000)+1;

            switch (true) {
                case skip <= 235: //23.5% for 1
                    skip = 1;
                    break;
                case skip <= 735: //50% for 2
                    skip = 2;
                    break;
                case skip <= 885: //15% for 3
                    skip = 3;
                    break;
                case skip <= 985: //10% for 4
                    skip = 4;
                    break;
                case skip <= 995: //1% for 5
                    skip = 5;
                    break;
                case skip <= 1000: //0.5% for 6
                    skip = 6;
                    break;
            }

            if (dir == 1)
            {
                //console.log(`[ATTEMPT] Move up by ${skip}...`);

                if(cury-skip < 0)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury-skip][curx] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i=cury; i>cury-skip; i--)
                {
                    if(grid[i][curx] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                for (var i = cury; i > cury - skip; i--)
                {
                    grid[i][curx] = 9;
                }
                grid[cury][curx] = skip;
                cury = cury - skip;
                steps++;
                //console.log(`[SUCCESS] Moved up by ${skip}!`);
                //console.log();
            }

            if (dir == 2)
            {
                //console.log(`[ATTEMPT] Move down by ${skip}...`);

                if (cury + skip > rowSize - 1)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury + skip][curx] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i = cury; i < cury + skip; i++)
                {
                    if (grid[i][curx] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                for (var i = cury+1; i < cury + skip; i++)
                {
                    grid[i][curx] = 9;
                }
                grid[cury][curx] = skip;
                cury = cury + skip;
                steps++;
                //console.log(`[SUCCESS] Moved down by ${skip}!`);
                //console.log();
            }

            if (dir == 3)
            {
                //console.log(`[ATTEMPT] Move left by ${skip}...`);

                if (curx - skip < 0)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury][curx - skip] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i = curx; i > curx - skip; i--)
                {
                    if (grid[cury][i] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                for (var i = curx; i > curx - skip; i--)
                {
                    grid[cury][i] = 9;
                }
                grid[cury][curx] = skip;
                curx = curx - skip;
                steps++;
                //console.log(`[SUCCESS] Moved left by ${skip}!`);
                //console.log();
            }

            if (dir == 4)
            {
                //console.log(`[ATTEMPT] Move right by ${skip}...`);

                if (curx + skip > colSize - 1)
                {
                    //console.log('[FAILED] Out of bounds!');
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury][curx + skip] != 0)
                {
                    //console.log('[FAILED] Already filled!');
                    //console.log();
                    attempts++;
                    continue;
                }

                var isPathBlocked = false;
                for (var i = curx; i < curx + skip; i++)
                {
                    if (grid[cury][i] != 0)
                    {
                        isPathBlocked = true;
                    }
                }

                if (isPathBlocked)
                {
                    //console.log('[FAILED] Path blocked!');
                    //console.log();
                    attempts++;
                    continue;
                }

                for (var i = curx+1; i < curx + skip; i++)
                {
                    grid[cury][i] = 9;
                }
                grid[cury][curx] = skip;
                curx = curx + skip;
                steps++;
                //console.log(`[SUCCESS] Moved right by ${skip}!`);
                //console.log();
            }
        }

        if (steps != 0)
        {
            //console.log('[SUCCESS] Finished initital path!');
            break;
        }
        grid = createGrid(rowSize, colSize);
    }
    return grid;
}

function run(endy, endx, rowSize, colSize, startCount){
    
    var colRange = Array.from({length: colSize-1}, (_, i) => i + 1);
    var rowRange = Array.from({length: rowSize-1}, (_, i) => i + 1);
    var startPos = [];

    for(var i=0; i<startCount; i++){
        if(i%2 != 0){
            var rand = Math.floor(Math.random() * colRange.length);
            startPos.push([0, colRange[rand]]);
            colRange.splice(rand, 1);
        }
        else{
            var rand = Math.floor(Math.random() * rowRange.length);
            startPos.push([rowRange[rand], 0]);
            rowRange.splice(rand, 1);
        }
    }

    while(true){
        var grid = createPath(startPos[0][0], startPos[0][1], endy, endx, rowSize, colSize);
        grid = inverseGrid(grid);
        for(var i=1; i<startCount; i++){
            grid = addPath(startPos[i][0], startPos[i][1], endy, endx, grid);
            if(grid == null){
                break;
            }
        }
        if(grid != null){
            return {grid: fillGrid(endy, endx, grid), startPos: startPos};
        }
    }
}

module.exports = {run};