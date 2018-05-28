function Ray() {
    this.ctx = new PIXI.Graphics()

    this.ctx.x = 0
    this.ctx.y = 0

    this.ctx.lineStyle(4, 0xffffff, 1)

    this.m = -1
    this.b = 0
};

Ray.prototype.draw = function() {
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(50, 50)
}
