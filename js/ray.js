function Ray(_ctx) {
    this.ctx = _ctx

    this.ctx.x = 0
    this.ctx.y = 0

    this.ctx.lineStyle(4, 0xffffff, 1)

    this.m = 1
    this.b = 0
}

Ray.prototype.f = function(x) {
    let y = this.m * x + this.b
    return y
}

Ray.prototype.f_inv = function(y) {
    let x = (y - this.b) / this.m
    return x
}

Ray.prototype.draw = function() {
    this.ctx.moveTo(0, this.b)
    this.ctx.lineTo(500, this.m*500 + this.b)
}

Ray.prototype.intersects = function(lens) {
    let lx = lens.ctx.x
    let ly = lens.ctx.y
    let lr = lens.r

    let bprime = (1 / this.m)*lx + ly

    let xint = (bprime - this.b) / (this.m + 1/this.m)
    let yint = this.f(xint)

    this.ctx.moveTo(xint, yint)
    this.ctx.lineTo(lx, ly)

    this.ctx.beginFill(0x00ff00)
    this.ctx.drawCircle(xint, yint, 5)
    this.ctx.endFill()

    return false
}