var slider = document.getElementById("rightRange");
var output = document.getElementById("demoRight");
var slid = document.getElementById("leftRange");
var out = document.getElementById("demoLeft");
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

output.innerHTML = slider.value;
var highBound = slider.value;
var lowBound = slid.value;
slider.oninput = function() {
    highBound = this.value;
    output.innerHTML = this.value;
    draw();
}



out.innerHTML = slid.value;
slid.oninput = function() {
    lowBound = this.value;
    out.innerHTML = this.value;
    draw();
}

function draw() {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle='black';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='white';
        ctx.translate(canvas.width/2, canvas.height);
        var len = canvas.height/4.0;
        branch(ctx, len)
    }
  }

function branch(ctx, len){
    ctx.fillRect(0, 0, 1, -len);
    ctx.translate(1, -len);
    if (len>2){
        //var angle = Math.floor((Math.random() * (highBound-lowBound)) + lowBound);
        var angle = highBound;
        ctx.save();
        ctx.rotate(angle*Math.PI/180);
        branch(ctx, len*.67);

        
        ctx.restore();
        angle = lowBound;
        //angle = Math.floor((Math.random() * (highBound-lowBound)) + lowBound);
        ctx.rotate(-angle*Math.PI/180);
        branch(ctx, len*.67);
        
    }
}

