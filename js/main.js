const World = {
    app: new PIXI.Application(),
    rays: [],
    lenses: [],
    init: function() {
        this.ray_ctx = new PIXI.Graphics()
        World.app.stage.addChild(this.ray_ctx)
    },
    draw: function() {
        for (var i = this.rays.length - 1; i >= 0; i--) {
            this.rays[i].draw()
        }
        for (var i = this.lenses.length - 1; i >= 0; i--) {
            this.lenses[i].draw()
        }
    },
    addRay: function() {
        let _ray = new Ray(this.ray_ctx)
        this.rays.push(_ray)
    },
    addLens: function() {
        let _lens = new Lens()
        World.app.stage.addChild(_lens.ctx)
        this.lenses.push(_lens)
    }
}

$(document).ready(() => {
    document.body.appendChild(World.app.view)

    World.init()
    World.addRay()

    World.addLens()

    World.draw()
})