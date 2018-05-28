$(document).ready(() => {
    const app = new PIXI.Application()
    document.body.appendChild(app.view)

    function drawLine(x, y, dx, dy) {
        let line = new PIXI.Graphics()
        line.x = x
        line.y = y

        line.lineStyle(4, 0xffffff, 1)

        line.moveTo(0, 0)
        line.lineTo(dx, dy)

        app.stage.addChild(line)
        return line
    }

    function drawCircle(x, y, r) {
        let circle = new PIXI.Graphics()
        circle.x = x
        circle.y = y

        circle.beginFill(0xffffff)
        circle.drawCircle(0, 0, r)
        circle.endFill()

        app.stage.addChild(circle)
        return circle
    }

    let line = drawLine(100, 100, 50, 50)
    let circle = drawCircle(50, 50, 50)
})