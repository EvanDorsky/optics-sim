const World = {
    app: new PIXI.Application(),
    rays: [],
    lenses: [],
    init: function() {
        this.ray_ctx = new PIXI.Graphics()
        World.app.stage.addChild(this.ray_ctx)
    },
    draw: function() {
        for (var i = this.lenses.length - 1; i >= 0; i--) {
            this.lenses[i].draw()
        }
        this.drawRays()
    },
    drawRays: function() {
        for (var i = this.rays.length - 1; i >= 0; i--) {
            this.rays[i].draw()
            for (var j = this.lenses.length - 1; j >= 0; j--) {
                let lens = this.lenses[j]
                if (this.rays[i].intersects(lens)) {
                    lens.ctx.beginFill(0x0000ff)
                    lens.ctx.drawCircle(0, 0, 5)
                    lens.ctx.endFill()
                }
            }
        }
    },
    addRay: function(m, b) {
        let _ray = new Ray(this.ray_ctx, m, b)
        this.rays.push(_ray)
    },
    addLens: function(x, y) {
        let _lens = new Lens(x, y)
        World.app.stage.addChild(_lens.ctx)
        this.lenses.push(_lens)
    }
}

$(document).ready(() => {
    document.body.appendChild(World.app.view)

    World.init()

    World.addRay(1, 0)
    World.addRay(2, 50)
    World.addLens(400, 200)
    World.addLens(300, 400)
    World.addLens(470, 400)

    World.draw()
})