const World = {
    app: new PIXI.Application(),
    rays: [],
    lenses: [],
    init: function() {
        this.ray_ctx = new PIXI.Graphics()
        this.app.stage.addChild(this.ray_ctx)

        this.fps = 60.0

        this.addLens(200, 200)

        setInterval(this.drawRays.bind(this), 1000/this.fps)
        this.app.stage.interactive = true
        this.app.stage.on("mousemove", (e) => {
            this.lenses[0].ctx.x = e.data.global.x
            this.lenses[0].ctx.y = e.data.global.y
            // this.drawRays()
        })
    },
    draw: function() {
        for (var i = this.lenses.length - 1; i >= 0; i--) {
            this.lenses[i].draw()
        }
        this.drawRays()
    },
    drawRays: function() {
        this.ray_ctx.clear()
        for (var i = this.rays.length - 1; i >= 0; i--) {
            this.rays[i].draw()
            for (var j = this.lenses.length - 1; j >= 0; j--) {
                let lens = this.lenses[j]
                if (this.rays[i].intersects(lens)) {
                    lens.ctx.beginFill(0x0000ff)
                    lens.ctx.drawCircle(0, 0, 5)
                    lens.ctx.endFill()
                    this.rays[i].intersectsAt(lens)
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

    World.addRay(2, 10)
    // World.addRay(.8, 0)
    // World.addLens(200, 200)
    // World.addLens(300, 400)
    // World.addLens(200, 500)
    // World.addLens(470, 400)

    World.draw()
})