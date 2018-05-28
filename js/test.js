$(document).ready(() => {
    const app = new PIXI.Application()

    document.body.appendChild(app.view)

    let line_ctx = new PIXI.Graphics()
    line_ctx.lineStyle(4, 0xFFFFFF, 1)
    line_ctx.moveTo(0, 0)
    line_ctx.lineTo(80, 50)
    line_ctx.x = 32
    line_ctx.y = 32

    line_ctx.arc(100, 100, 30, 0, Math.PI);
    app.stage.addChild(line_ctx)

    var circles = [] 
    let circle_ctx = new PIXI.Graphics()
    circle_ctx.beginFill(0x9966FF)
    circle_ctx.drawCircle(0, 0, 32)
    circle_ctx.endFill()
    app.stage.addChild(circle_ctx)
    circle_ctx.x = 500
    circle_ctx.y = 50
})