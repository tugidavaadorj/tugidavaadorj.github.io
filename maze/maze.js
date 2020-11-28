var cols, rows;
var w = 40; 
var grid = [];
var current;
var stack = [];

function init(){
    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width/w);
    rows = Math.floor(canvas.height/w);
    for (var j = 0 ; j < rows; j++){
        for (var i = 0; i < cols; i++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    current = grid[0];
    current.visited = true;
    draw();
}


function draw() {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //background color
        ctx.fillStyle='white';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.strokeStyle = 'white';
        ctx.fillStyle='yellow';
        current.isCurrent = true;
        var next = current.checkNeighbors();
        if (next){
            next.visited = true;
            next.isCurrent = true;

            //remove walls
            stack.push(current);
            removeWalls(current, next);
            current.isCurrent = false;
            current = next;

            //comment out the setTimeout to see the final product
            setTimeout(() => {  draw(); }, 50);
            //draw();
        }else{

            //backtracking to 
            if (stack.length > 0){
                current.isCurrent = false;
                current = stack.pop();
                draw();
            }
            
        }
        for (var i = 0; i< grid.length; i++){
           grid[i].show(ctx);
        } 
        current.isCurrent = false;
        
    }
}

function removeWalls(a,b){
    var x = a.i - b.i;
    if (x === 1){ //neighbor is to the left of the current cell
        a.walls[3] = false;
        b.walls[1] = false;
    }
    else if (x === -1){ //neighbor is to the right of the current cell
        a.walls[1] = false;
        b.walls[3] = false;
    } 

    var y = a.j - b.j;
    if (y === 1) { //neighbor is to the top of the current cell
        a.walls[0]  = false;
        b.walls[2] = false;
    }else if (y === -1){ //neighbor is to the bottom of the current cell
        a.walls[2] = false;
        b.walls[0] = false;
    }
}


  