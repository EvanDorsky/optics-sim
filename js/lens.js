function Lens() {
    this.ctx = new PIXI.Graphics()

    this.ctx.x = 0
    this.ctx.y = 0

    this.ctx.beginFill(0xffffff)
}

Lens.prototype.draw = function() {
    this.ctx.beginFill(0xffffff)
    this.ctx.drawCircle(100, 100, 50)
    this.ctx.endFill()

    World.app.stage.addChild(this.ctx)
}
