const World = {
    app: new PIXI.Application(),
    rays: [],
    lenses: [],
    init: function() {
        this.ray_ctx = new PIXI.Graphics()
        this.app.stage.pivot.y = 1
        this.app.stage.scale.y *= -1
        this.app.stage.addChild(this.ray_ctx)

        this.addLens(200, 200)

        this.app.stage.interactive = true
        this.app.stage.on("mousemove", (e) => {
            this.lenses[0].ctx.x = e.data.global.x
            this.lenses[0].ctx.y = -e.data.global.y
            this.drawRays()
        })
    },
    draw: function() {
        for (var i = this.lenses.length - 1; i >= 0; i--) {
            this.lenses[i].draw()
        }
        this.drawRays()
    },
    drawRays: function() {
        this.ray_ctx.clear().lineStyle(2, 0xffffff, 1)
        for (var i = this.rays.length - 1; i >= 0; i--)
            this.rays[i].draw(this.lenses)
    },
    addRay: function(x, y, theta) {
        let _ray = new Ray(this.ray_ctx, new PIXI.Point(x, y), theta)
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

    // World.addRay(100, 100, 7.5*Math.PI/4)
    World.addRay(100, -500, Math.PI/6)
    // World.addRay(-100, 100, 7.5*Math.PI/4)
    // World.addRay(-100, -100, 7.5*Math.PI/4)

    World.draw()
})