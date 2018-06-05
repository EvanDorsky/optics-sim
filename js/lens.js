function Lens(x, y) {
    this.ctx = new PIXI.Graphics()

    this.ctx.x = x
    this.ctx.y = y
    this.r = 100
    this.n = 1.52

    this.ctx.beginFill(0xffffff)
    this.ctx.alpha = 0.2
    this.epsilon = 0.1
}

Lens.prototype.draw = function() {
    this.ctx.beginFill(0xffffff)
    this.ctx.drawCircle(0, 0, this.r)
    this.ctx.endFill()
}
