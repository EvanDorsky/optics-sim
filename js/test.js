// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
$(document).ready(() => {
    const app = new PIXI.Application();

    document.body.appendChild(app.view);

    let line = new PIXI.Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 0);
    line.lineTo(80, 50);
    line.x = 32;
    line.y = 32;
    app.stage.addChild(line);

    let circle = new PIXI.Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 32);
    circle.endFill();
    circle.x = 64;
    circle.y = 130;
    app.stage.addChild(circle);
})