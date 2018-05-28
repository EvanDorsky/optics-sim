const World = {
    app: new PIXI.Application(),
    rays: [],
    lenses: [],
    draw: function() {
        for (var i = this.rays.length - 1; i >= 0; i--) {
            this.rays[i].draw()
        }
    },
    addRay: function() {
        let _ray = new Ray()
        this.rays.push(_ray)
        World.app.stage.addChild(_ray.ctx)
    }

}

function drawCircle(x, y, r) {
    let circle = new PIXI.Graphics()
    circle.x = x
    circle.y = y

    circle.beginFill(0xffffff)
    circle.drawCircle(0, 0, r)
    circle.endFill()

    World.app.stage.addChild(circle)
    return circle
}

$(document).ready(() => {
    document.body.appendChild(World.app.view)

    World.addRay()
    World.draw()
})