function Ray(_ctx, origin, theta) {
    this.ctx = _ctx

    this.ctx.lineStyle(2, 0xffffff, 1)

    this.origin = origin
    this.theta = theta
}

Ray.prototype.draw = function() {
    this.ctx.moveTo(this.origin.x, this.origin.y)

    let endPoint = (new PIXI.Point(1, 0))
        .rotate(this.theta)
        .mult(1000)
        .add(this.origin)
        
    this.ctx.lineTo(endPoint.x, endPoint.y)
}

var PointRotate = function(theta) {
    let xtemp = this.x
    let costheta = Math.cos(theta)
    let sintheta = Math.sin(theta)

    this.x = this.x*costheta - this.y*sintheta
    this.y = this.y*costheta + xtemp*sintheta

    return this
}
PIXI.Point.prototype.rotate = PointRotate
PIXI.ObservablePoint.prototype.rotate = PointRotate

var PointAdd = function(p) {
    this.x += p.x
    this.y += p.y

    return this
}
PIXI.Point.prototype.add = PointAdd
PIXI.ObservablePoint.prototype.add = PointAdd

var PointMult = function(g) {
    this.x *= g
    this.y *= g

    return this
}
PIXI.Point.prototype.mult = PointMult
PIXI.ObservablePoint.prototype.mult = PointMult

// composition is fun??? (I think this is pretty nifty)
var PointAs = function() {
    let copy = new PIXI.Point()
    copy.copy(this)

    return copy
}
PIXI.Point.prototype.as = PointAs
PIXI.ObservablePoint.prototype.as = PointAs

Ray.prototype.intersects = function(lens) {
    let lens_pos = lens.ctx.position.as().add(this.origin.as().mult(-1))

    let d = lens_pos.rotate(-this.theta).y

    if (Math.abs(d) < lens.r) {
        let chord_half = Math.sqrt(lens.r*lens.r - d*d)

        return [
            (new PIXI.Point(lens_pos.x + chord_half, 0))
                .rotate(this.theta)
                .add(this.origin),
            (new PIXI.Point(lens_pos.x - chord_half, 0))
                .rotate(this.theta)
                .add(this.origin)
        ]
    }
}