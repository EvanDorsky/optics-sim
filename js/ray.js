function Ray(_ctx, m, b) {
    this.ctx = _ctx

    this.ctx.x = 0
    this.ctx.y = 0

    this.ctx.lineStyle(2, 0xffffff, 1)

    this.m = m
    this.b = b
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

    let dx = lx - xint
    let dy = ly - yint
    return Math.sqrt(dx*dx + dy*dy) < lr
}

Ray.prototype.intersectsAt = function(lens) {
    let h = lens.ctx.x
    let k = lens.ctx.y
    let r = lens.r

    let m = this.m
    let b = this.b

    let A = 1 + m*m
    let B = 2*m*(b-k) - 2*h
    let C = h*h + b*b + 2*b*k + k*k - r*r

    let det = Math.sqrt(B*B - 4*A*C)

    let x1 = (-B + det)/(2*A)
    let x2 = (-B - det)/(2*A)

    this.ctx.beginFill(0xff00ff)
    this.ctx.drawCircle(x1, this.f(x1), 5)
    this.ctx.drawCircle(x2, this.f(x2), 5)
    this.ctx.endFill()

    // return
}