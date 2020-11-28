class Cell{
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; //top, right, bottom, left
        this.visited = false;
        this.isCurrent = false;

        //Can't I just use bottom and left??
    }
    show(ctx){
        var x = this.i*w;
        var y = this.j*w;
        if (this.walls[0]){
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+w, y);
            ctx.stroke();
        }
        if (this.walls[1]){
            ctx.beginPath();
            ctx.moveTo(x+w, y);
            ctx.lineTo(x+w, y+w);
            ctx.stroke();
        }
        if (this.walls[2]){
            ctx.beginPath();
            ctx.moveTo(x+w, y+w);
            ctx.lineTo(x, y+w);
            ctx.stroke();
        }
        if (this.walls[3]){
            ctx.beginPath();
            ctx.moveTo(x, y+w);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        
        if (this.visited){
            ctx.fillStyle='blue';
            ctx.fillRect(x,y,w,w);
        }
        if (this.isCurrent){
            ctx.fillStyle='purple';
            ctx.fillRect(x,y,w,w);
        }
    }
    index(i, j){
        if (i<0|| j<0|| i> cols-1 ||j> rows-1){
            return -1;
        }

        return i+j*cols;
    }
    checkNeighbors(){
        var neighbors = []

        var left = grid[this.index(this.i-1,this.j)];
        var right = grid[this.index(this.i+1,this.j)];
        var up = grid[this.index(this.i,this.j-1)];
        var down = grid[this.index(this.i,this.j+1)];

        if (up && !up.visited){
            neighbors.push(up);
        }
        if (down && !down.visited){
            neighbors.push(down);
        }
        if (right && !right.visited){
            neighbors.push(right);
        }
        if (left && !left.visited){
            neighbors.push(left);
        }
        if (neighbors.length > 0){
            var r = Math.floor(Math.random()*neighbors.length);
            return neighbors[r];
        }
        return undefined;
    }
}