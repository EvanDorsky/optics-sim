function Ray(_ctx, origin, theta) {
    this.ctx = _ctx

    this.ctx.lineStyle(2, 0xffffff, 1)

    this.origin = origin
    this.theta = theta
}

Ray.prototype.draw = function(lenses) {
    this.drawSegment(this.origin, this.theta, lenses)
}

Ray.prototype.drawSegment = function(segOrigin, segTheta, lenses) {
    for (var i = lenses.length - 1; i >= 0; i--) {
        let lens = lenses[i]
        let int = this.intersects(lens)
        if (int) {
            this.ctx.beginFill(0xff00ff)
            this.ctx.drawCircle(int.x, int.y, 5)
            this.ctx.endFill()

            this.ctx.moveTo(this.origin.x, this.origin.y)
            this.ctx.lineTo(int.x, int.y)
        } else {
            let endPoint = (new PIXI.Point(1, 0))
                .rotate(this.theta)
                .mult(1000)
                .add(this.origin)
                
            this.ctx.moveTo(this.origin.x, this.origin.y)
            this.ctx.lineTo(endPoint.x, endPoint.y)
        }
    }
}

Ray.prototype.intersects = function(lens) {
    let lens_pos = lens.ctx.position.as().add(this.origin.as().mult(-1))

    let d = lens_pos.rotate(-this.theta).y

    if (Math.abs(d) < lens.r) {
        let chord_half = Math.sqrt(lens.r*lens.r - d*d)

        let xs = [lens_pos.x - chord_half, lens_pos.x + chord_half]
        let ints = [
            (new PIXI.Point(xs[0], 0))
                .rotate(this.theta)
                .add(this.origin),
            (new PIXI.Point(xs[1], 0))
                .rotate(this.theta)
                .add(this.origin)
        ]

        if (xs[0] >= 0)
            return ints[0]
        else if (xs[1] >= 0)
            return ints[1]
    } else
        return null
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