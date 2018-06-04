function Lens(x, y) {
    this.ctx = new PIXI.Graphics()

    this.ctx.x = x
    this.ctx.y = y
    this.r = 150

    this.ctx.beginFill(0xffffff)
    this.ctx.alpha = 0.2
}

Lens.prototype.draw = function() {
    this.ctx.beginFill(0xffffff)
    this.ctx.drawCircle(0, 0, this.r)
    this.ctx.endFill()
}
