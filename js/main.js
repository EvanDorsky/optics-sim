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
        this.ray_ctx.clear().lineStyle(2, 0xffffff, 1)
        for (var i = this.rays.length - 1; i >= 0; i--) {
            this.rays[i].draw()
            for (var j = this.lenses.length - 1; j >= 0; j--) {
                let lens = this.lenses[j]
                let ints = this.rays[i].intersects(lens)
                lens.ctx.clear()
                lens.draw()
                if (ints) {
                    lens.ctx.beginFill(0x0000ff)
                    lens.ctx.drawCircle(0, 0, 15)
                    lens.ctx.endFill()

                    this.ray_ctx.beginFill(0xff00ff)
                    this.ray_ctx.drawCircle(ints[0].x, ints[0].y, 5)
                    this.ray_ctx.drawCircle(ints[1].x, ints[1].y, 5)
                    this.ray_ctx.endFill()
                }
                else {
                    lens.ctx.beginFill(0xffffff)
                    lens.ctx.drawCircle(0, 0, 15)
                    lens.ctx.endFill()
                }
            }
        }
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

    World.addRay(0,  0, Math.PI/4)
    World.addRay(0,  5, Math.PI/4)
    World.addRay(0, 10, Math.PI/4)
    World.addRay(0, 15, Math.PI/4)
    World.addRay(0, 20, Math.PI/4)
    World.addRay(0, 25, Math.PI/4)
    World.addRay(0, 30, Math.PI/4)
    World.addRay(0, 35, Math.PI/4)
    World.addRay(0, 40, Math.PI/4)
    World.addRay(0, 45, Math.PI/4)
    World.addRay(200, 400, -Math.PI/5)

    World.draw()
})