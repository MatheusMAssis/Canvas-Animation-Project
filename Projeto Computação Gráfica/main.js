var canvasDiv = document.getElementById("canvas");
var canvas    = document.createElement("canvas");
canvas.setAttribute("width", "800");
canvas.setAttribute("height", "500");
canvas.style.background = "#1C0B42";
canvasDiv.appendChild(canvas);

var context = canvas.getContext("2d");

var step_alpha = 40;
var step = 0.05;
var carpetDir = 0.25;
var angle = 0;
var angleDir = 1;

// stars layer creation
var stars = new Array();

// main layer creation
var L0R0 = new Rect(300, 250, 200, 10);
var L0R1 = new Rect(390, 180, 40, 70);
var L0R2 = new Rect(365, 190, 40, 60);
var L0R3 = new Rect(290, 250, 25, 10);
var L0R4 = new Rect(485, 250, 25, 10);

// first layer creation
var L1R0 = new Rect(-600, 480, 600, 100);
var L1R1 = new Rect(0, 450, 400, 140);
var L1R2 = new Rect(400, 460, 600, 100);

// second layer creation
var L2R0 = new Rect(-600, 440, 400, 170);
var L2R1 = new Rect(-200, 400, 500, 190);
var L2R2 = new Rect(300, 430, 300, 160);
var L2R3 = new Rect(600, 410, 400, 170);

// third layer creation
var L3R0 = new Rect(-600, 390, 500, 230);
var L3R1 = new Rect(-100, 370, 500, 250);
var L3R2 = new Rect(400, 380, 600, 220);

// cloud layer creation
var L4R0 = new Rect(115, 80, 170, 40);
var L4R1 = new Rect(150, 60, 100,  70);
var L4R2 = new Rect(560, 70, 170, 40);
var L4R3 = new Rect(595, 50, 100, 70);

// generating stars
for (let i=0; i < 75; i++) {
    xRandom = Math.floor(Math.random() * (800));
    yRandom = Math.floor(Math.random() * (400));
    sizeRandom = Math.floor(Math.random() * (1) + 1.5);
    stars[i] = new Rect(xRandom, yRandom, sizeRandom, sizeRandom);
}


function init() {
    timer=setInterval(animate, 10);
}

function Rect(x, y, w, l) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.l = l;
}

function touchBorder(x, initial, step) {
    if (x > 800) {
        return initial;
    } else {
        return x + step
    }
}

function carpetDirection(y, dir) {
    if (y > 258 || y < 242) {
        return -dir;
    } else {
        return dir;
    }
}

function testAngle(angle) {
    if (angle > 0.08 || angle < -0.08) {
        angleDir *= -1;
    }
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i=0; i < 75; i++) {
        dice = Math.random();
        
        if (dice < 0.995) {
            context.fillStyle = "#ffffff";
        } else {
            context.fillStyle = "#522A83";
        }
        context.fillRect(stars[i].x, stars[i].y, stars[i].w, stars[i].l);
    }
    
    context.fillStyle = "#ffffff";
    context.fillRect(L4R0.x, L4R0.y, L4R0.w, L4R0.l);
    context.fillRect(L4R1.x, L4R1.y, L4R1.w, L4R1.l);
    context.fillRect(L4R2.x, L4R2.y, L4R2.w, L4R2.l);
    context.fillRect(L4R3.x, L4R3.y, L4R3.w, L4R3.l);
    
    context.fillStyle = "#430D31";
    context.fillRect(L3R0.x, L3R0.y, L3R0.w, L3R0.l);
    context.fillRect(L3R1.x, L3R1.y, L3R1.w, L3R1.l);
    context.fillRect(L3R2.x, L3R2.y, L3R2.w, L3R2.l);
    
    context.fillStyle = "#7F1F2B";
    context.fillRect(L2R0.x, L2R0.y, L2R0.w, L2R0.l);
    context.fillRect(L2R1.x, L2R1.y, L2R1.w, L2R1.l);
    context.fillRect(L2R2.x, L2R2.y, L2R2.w, L2R2.l);
    context.fillRect(L2R3.x, L2R3.y, L2R3.w, L2R3.l);
    
    context.fillStyle = "#E14A41";
    context.fillRect(L1R0.x, L1R0.y, L1R0.w, L1R0.l);
    context.fillRect(L1R1.x, L1R1.y, L1R1.w, L1R1.l);
    context.fillRect(L1R2.x, L1R2.y, L1R2.w, L1R2.l);
    
    
    context.save();
    context.translate(L0R0.x * (1/2), L0R0.y * (1/2), L0R0.w, L0R0.l);
    context.rotate(angle);
    context.fillStyle = "#132A91";
    context.fillRect(150, 125, 200, 10);
    context.fillStyle = "#F9CC96";
    context.fillRect(140, 125, 30, 10);
    context.fillRect(335, 125, 30, 10);
    context.fillStyle = "#A1E7EE";
    context.fillRect(215, 65, 40, 60);
    context.fillStyle = "#fefefe";
    context.fillRect(240, 55, 40, 70);
    context.restore();

    testAngle(angle);
    angle += -0.00075 * angleDir;
    
    
    carpetDir = carpetDirection(L0R0.y, carpetDir);
    L0R0.y += carpetDir;
    L0R1.y += carpetDir;
    L0R2.y += carpetDir;
    L0R3.y += carpetDir;
    L0R4.y += carpetDir;
    
    for (let i=0; i < stars.length; i++) {
        stars[i].x = touchBorder(stars[i].x, -stars[i].w, 0.1);
    }

    L1R0.x = touchBorder(L1R0.x, L1R1.x - 590, 10);
    L1R1.x = touchBorder(L1R1.x, L1R2.x - 390, 10);
    L1R2.x = touchBorder(L1R2.x, -590, 10);
    
    L2R0.x = touchBorder(L2R0.x, L2R1.x - 390, 5);
    L2R1.x = touchBorder(L2R1.x, L2R2.x - 490, 5);
    L2R2.x = touchBorder(L2R2.x, L2R3.x - 290, 5);
    L2R3.x = touchBorder(L2R3.x, -590, 5);
    
    L3R0.x = touchBorder(L3R0.x, L3R1.x - 490, 2);
    L3R1.x = touchBorder(L3R1.x, L3R2.x - 490, 2);
    L3R2.x = touchBorder(L3R2.x, -590, 2);
    
    L4R0.x = touchBorder(L4R0.x, -170, 0.5);
    L4R1.x = touchBorder(L4R1.x, -170, 0.5);
    L4R2.x = touchBorder(L4R2.x, -170, 0.5);
    L4R3.x = touchBorder(L4R3.x, -170, 0.5);
    
    step_alpha += step;
    if (step_alpha > 90 || step_alpha < 40) {
        step *= -1;
    }
    
    canvas.style.filter = "brightness(" + step_alpha + "%)";
    
}

init()