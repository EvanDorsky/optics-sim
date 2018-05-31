function Ray(_ctx, origin, m) {
    this.ctx = _ctx

    this.ctx.lineStyle(2, 0xffffff, 1)

    this.origin = origin
    this.theta = Math.atan(m) // <- this has to go

    this.m = m
    this.b = origin.y - m*origin.x
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
    this.ctx.moveTo(this.origin.x, this.origin.y)
    this.ctx.lineTo(500, this.m*500 + this.b)
}

Ray.prototype.intersects = function(lens) {
    let lx = lens.ctx.x
    let ly = lens.ctx.y
    let lr = lens.r

    let xrot = lx*Math.cos(-this.theta) - ly*Math.sin(-this.theta)
    let yrot = ly*Math.cos(-this.theta) + lx*Math.sin(-this.theta)

    this.ctx.drawCircle(xrot, yrot, 5)
    this.ctx.endFill()

    return Math.abs(yrot) < lr
}

Ray.prototype.intersectsAt = function(lens) {
    let h = lens.ctx.x
    let k = lens.ctx.y
    let r = lens.r

    let m = this.m
    let b = this.b

    let A = 1 + m*m
    let B = 2*m*(b-k) - 2*h
    let C = h*h + (b-k)*(b-k) - r*r

    let det = Math.sqrt(B*B - 4*A*C)

    let x1 = (-B + det)/(2*A)
    let x2 = (-B - det)/(2*A)

    this.ctx.beginFill(0xff00ff)
    this.ctx.drawCircle(x1, this.f(x1), 5)
    this.ctx.drawCircle(x2, this.f(x2), 5)
    this.ctx.endFill()

    return [new PIXI.Point(x1, this.f(x1)), new PIXI.Point(x2, this.f(x2))]
}