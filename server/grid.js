function createGrid(rowSize, colSize){
    //UPDATE PATHING!! TOP LEFT BOTTOM RIGHT
    var grid = [];
    
    for(var i=0; i<rowSize; i++){
        var temp = [];
        for(var j=0; j<colSize; j++){
            if(i==0 && j==0){
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

function showGrid(grid){
    for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
            process.stdout.write(`${grid[i][j]} `);;
        }
        console.log();
    }
}

function fillGrid(grid){
    var temp = grid;

    for (var i = 0; i < temp.length; i++)
    {
        for (var j = 0; j < temp[i].length; j++)
        {
            if(i == 0 && j == 0)
            {
                temp[i][j] = 0;
            }
            else if(i == temp.length-1 && j == temp[i].length-1)
            {
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
        }
    }

    return temp;
}

function createPath(starty, startx, endy, endx, rowSize, colSize)
{
    var grid = createGrid(7, 7);

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
                console.log("[FAILED] Too many steps... Retrying!");
                break;
            }

            //CHANGE
            if (attempts > 1000)
            {
                steps = 0;
                attempts = 0;
                console.log("[FAILED] Too many attempts... Retrying!");
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
                //console.log($"[ATTEMPT] Move up by {skip}...");

                if(cury-skip < 0)
                {
                    //console.log("[FAILED] Out of bounds!");
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury-skip][curx] != 0)
                {
                    //console.log("[FAILED] Already filled!");
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
                    //console.log("[FAILED] Path blocked!");
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
                //console.log($"[SUCCESS] Moved up by {skip}!");
                //console.log();
            }

            if (dir == 2)
            {
                //console.log($"[ATTEMPT] Move down by {skip}...");

                if (cury + skip > rowSize - 1)
                {
                    //console.log("[FAILED] Out of bounds!");
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury + skip][curx] != 0)
                {
                    //console.log("[FAILED] Already filled!");
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
                    //console.log("[FAILED] Path blocked!");
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
                //console.log($"[SUCCESS] Moved down by {skip}!");
                //console.log();
            }

            if (dir == 3)
            {
                //console.log($"[ATTEMPT] Move left by {skip}...");

                if (curx - skip < 0)
                {
                    //console.log("[FAILED] Out of bounds!");
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury][curx - skip] != 0)
                {
                    //console.log("[FAILED] Already filled!");
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
                    //console.log("[FAILED] Path blocked!");
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
                //console.log($"[SUCCESS] Moved left by {skip}!");
                //console.log();
            }

            if (dir == 4)
            {
                //console.log($"[ATTEMPT] Move right by {skip}...");

                if (curx + skip > colSize - 1)
                {
                    //console.log("[FAILED] Out of bounds!");
                    //console.log();
                    attempts++;
                    continue;
                }
                if (grid[cury][curx + skip] != 0)
                {
                    //console.log("[FAILED] Already filled!");
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
                    //console.log("[FAILED] Path blocked!");
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
                //console.log($"[SUCCESS] Moved right by {skip}!");
                //console.log();
            }
        }

        if (steps != 0)
        {
            console.log("[SUCCESS] Finished pathing!");
            break;
        }
        grid = createGrid(7, 7);
    }
    grid = fillGrid(grid);
    return grid;
}

module.exports = {createPath};