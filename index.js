var sizes = [128, 96, 64, 40, 32, 24, 20];
var ctxs = [];

for (const size of sizes) {

    let height = size + 20;

    var label = document.createElement('div')
    label.style.paddingLeft = '10px';
    label.style.paddingTop = '10px';
    label.innerText = size+'x'+size

    var ctx = document.createElement('canvas').getContext('2d');
    ctx.canvas.width = 500;
    ctx.canvas.height = height;
    ctx.canvas.style.width = '500px';
    ctx.canvas.style.height = height+'px';
    ctx.width = 500;
    ctx.height = height;

    ctxs.push(ctx);
    document.body.appendChild(label);
    document.body.appendChild(ctx.canvas);
}


var sizeInput = document.getElementById("sizeInput");
var sizeLabel = document.getElementById("sizeLabel");

var cornerInput = document.getElementById("cornerInput");
var cornerLabel = document.getElementById("cornerLabel");

let url = new URL(window.location.href);

sizeInput.value = url.searchParams.get("corner") || 0.25;
cornerInput.value = url.searchParams.get("smoothing") || 0.5;

function updateSize() {
    sizeLabel.innerHTML = "Corner size: " + sizeInput.value;
    drawAll();
}

function updateCorner() {
    cornerLabel.innerHTML = "Smoothing: " + cornerInput.value;
    drawAll();
}

sizeInput.addEventListener('input', updateSize);
cornerInput.addEventListener('input', updateCorner);

const offset = 10

function drawCornerFrame(corner) {
    ctx2.strokeStyle = "#505050";

    ctx2.beginPath();
    ctx2.arc(corner[0].x, corner[0].y, 2, 0, 2 * Math.PI);
    ctx2.fill();

    ctx2.beginPath();
    ctx2.arc(corner[1].x, corner[1].y, 2, 0, 2 * Math.PI);
    ctx2.fill();

    ctx2.beginPath();
    ctx2.arc(corner[2].x, corner[2].y, 2, 0, 2 * Math.PI);
    ctx2.fill();

    ctx2.beginPath();
    ctx2.arc(corner[3].x, corner[3].y, 2, 0, 2 * Math.PI);
    ctx2.fill();

    ctx2.beginPath();
    ctx2.moveTo(corner[0].x, corner[0].y);
    ctx2.lineTo(corner[1].x, corner[1].y);
    ctx2.stroke()

    ctx2.beginPath();
    ctx2.moveTo(corner[2].x, corner[2].y);
    ctx2.lineTo(corner[3].x, corner[3].y);
    ctx2.stroke()
}

function drawAll() {
    
    for (const i in sizes) {
        const rectWidth = sizes[i]
        const cornerSize = parseFloat(sizeInput.value) * rectWidth;
        var corner = parseFloat(cornerInput.value);

        draw(ctxs[i], rectWidth, cornerSize, corner)
    }
}

function draw(ctx, rectWidth, size, corner) {

    var topLeft = [{
        x: offset + 0,
        y: offset + size
    }, {
        x: offset + 0,
        y: offset + size - size * corner
    }, {
        x: offset + size - size * corner,
        y: offset + 0
    }, {
        x: offset + size,
        y: offset + 0
    }];

    var topRight = [{
        x: offset + rectWidth - size,
        y: offset + 0
    }, {
        x: offset + rectWidth - size + size * corner,
        y: offset + 0
    }, {
        x: offset + rectWidth,
        y: offset + size - size * corner
    }, {
        x: offset + rectWidth,
        y: offset + size
    }, ];

    var bottomRight = [{
        x: offset + rectWidth,
        y: offset + rectWidth - size
    }, {
        x: offset + rectWidth,
        y: offset + rectWidth - size + size * corner
    }, {
        x: offset + rectWidth - size + size * corner,
        y: offset + rectWidth
    }, {
        x: offset + rectWidth - size,
        y: offset + rectWidth
    }, ];

    var bottomLeft = [{
        x: offset + size,
        y: offset + rectWidth
    }, {
        x: offset + size - size * corner,
        y: offset + rectWidth
    }, {
        x: offset + 0,
        y: offset + rectWidth - size + size * corner
    }, {
        x: offset + 0,
        y: offset + rectWidth - size
    }, ];


    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.beginPath();


    ctx.moveTo(topLeft[0].x, topLeft[0].y);
    ctx.bezierCurveTo(topLeft[1].x, topLeft[1].y,
        topLeft[2].x, topLeft[2].y,
        topLeft[3].x, topLeft[3].y);

    ctx.lineTo(topRight[0].x, topRight[0].y);
    ctx.bezierCurveTo(topRight[1].x, topRight[1].y,
        topRight[2].x, topRight[2].y,
        topRight[3].x, topRight[3].y);

    ctx.lineTo(bottomRight[0].x, bottomRight[0].y);
    ctx.bezierCurveTo(bottomRight[1].x, bottomRight[1].y,
        bottomRight[2].x, bottomRight[2].y,
        bottomRight[3].x, bottomRight[3].y);

    ctx.lineTo(bottomLeft[0].x, bottomLeft[0].y);
    ctx.bezierCurveTo(bottomLeft[1].x, bottomLeft[1].y,
        bottomLeft[2].x, bottomLeft[2].y,
        bottomLeft[3].x, bottomLeft[3].y);

    ctx.closePath();

    ctx.fill();


    // frame

    // ctx2.strokeStyle = "#000000";

    // ctx2.clearRect(0, 0, ctx2.width, ctx2.height);
    // ctx2.beginPath();


    // ctx2.moveTo(topLeft[0].x, topLeft[0].y);
    // ctx2.bezierCurveTo(topLeft[1].x, topLeft[1].y,
    //     topLeft[2].x, topLeft[2].y,
    //     topLeft[3].x, topLeft[3].y);

    // ctx2.lineTo(topRight[0].x, topRight[0].y);
    // ctx2.bezierCurveTo(topRight[1].x, topRight[1].y,
    //     topRight[2].x, topRight[2].y,
    //     topRight[3].x, topRight[3].y);

    // ctx2.lineTo(bottomRight[0].x, bottomRight[0].y);
    // ctx2.bezierCurveTo(bottomRight[1].x, bottomRight[1].y,
    //     bottomRight[2].x, bottomRight[2].y,
    //     bottomRight[3].x, bottomRight[3].y);

    // ctx2.lineTo(bottomLeft[0].x, bottomLeft[0].y);
    // ctx2.bezierCurveTo(bottomLeft[1].x, bottomLeft[1].y,
    //     bottomLeft[2].x, bottomLeft[2].y,
    //     bottomLeft[3].x, bottomLeft[3].y);

    // ctx2.closePath();
    // ctx2.stroke()

    // drawCornerFrame(topLeft)
    // drawCornerFrame(topRight)
    // drawCornerFrame(bottomRight)
    // drawCornerFrame(bottomLeft)

}

updateSize();
updateCorner();