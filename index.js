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
const bpOffset = 200

function drawCornerFrame(ctx, corner) {
    ctx.strokeStyle = "#505050";

    ctx.beginPath();
    ctx.arc(bpOffset + corner[0].x, corner[0].y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bpOffset + corner[1].x, corner[1].y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bpOffset + corner[2].x, corner[2].y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bpOffset + corner[3].x, corner[3].y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(bpOffset + corner[0].x, corner[0].y);
    ctx.lineTo(bpOffset + corner[1].x, corner[1].y);
    ctx.stroke()

    ctx.beginPath();
    ctx.moveTo(bpOffset + corner[2].x, corner[2].y);
    ctx.lineTo(bpOffset + corner[3].x, corner[3].y);
    ctx.stroke()
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

    ctx.strokeStyle = "#000000";

    ctx.clearRect(bpOffset, 0, ctx.width - bpOffset, ctx.height);
    ctx.beginPath();


    ctx.moveTo(bpOffset + topLeft[0].x, topLeft[0].y);
    ctx.bezierCurveTo(
        bpOffset + topLeft[1].x, topLeft[1].y,
        bpOffset + topLeft[2].x, topLeft[2].y,
        bpOffset + topLeft[3].x, topLeft[3].y);

    ctx.lineTo(bpOffset + topRight[0].x, topRight[0].y);
    ctx.bezierCurveTo(
        bpOffset + topRight[1].x, topRight[1].y,
        bpOffset + topRight[2].x, topRight[2].y,
        bpOffset + topRight[3].x, topRight[3].y);

    ctx.lineTo(bpOffset + bottomRight[0].x, bottomRight[0].y);
    ctx.bezierCurveTo(
        bpOffset + bottomRight[1].x, bottomRight[1].y,
        bpOffset + bottomRight[2].x, bottomRight[2].y,
        bpOffset + bottomRight[3].x, bottomRight[3].y);

    ctx.lineTo(bpOffset + bottomLeft[0].x, bottomLeft[0].y);
    ctx.bezierCurveTo(
        bpOffset + bottomLeft[1].x, bottomLeft[1].y,
        bpOffset + bottomLeft[2].x, bottomLeft[2].y,
        bpOffset + bottomLeft[3].x, bottomLeft[3].y);

    ctx.closePath();
    ctx.stroke()

    drawCornerFrame(ctx, topLeft)
    drawCornerFrame(ctx, topRight)
    drawCornerFrame(ctx, bottomRight)
    drawCornerFrame(ctx, bottomLeft)

}

updateSize();
updateCorner();