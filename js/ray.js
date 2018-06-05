function Ray(_ctx, origin, theta) {
    this.ctx = _ctx

    this.debug = new PIXI.Text('Debug', {
        fill: '#ffffff',
        fontSize: 20
    })
    this.debug.x = 30
    this.debug.y = -30
    this.debug.pivot.y = 1
    this.debug.scale.y *= -1
    World.app.stage.addChild(this.debug)

    this.maxSegs = 3

    this.origin = origin
    this.theta = theta
}

Ray.prototype.draw = function(lenses) {
    this.debugClear()
    this.drawSegment(this.origin, this.theta, lenses, 0)
}

Ray.prototype.debugClear = function() {
    // this.debug.text = ""
}

Ray.prototype.debugAddLine = function(line) {
    // this.debug.text += line+'\n'
}

Ray.prototype.drawSegment = function(segOrigin, segTheta, lenses, segsDrawn) {
    // this.ctx.beginFill(0xff0000)
    // this.ctx.drawCircle(segOrigin.x, segOrigin.y, 5)
    // this.ctx.endFill()
    segsDrawn++
    this.debugAddLine('==== New segment ====')
    this.debugAddLine('    segsDrawn:'+segsDrawn)

    // this will only work if there's just one lens
    for (var i = lenses.length - 1; i >= 0; i--) {
        let lens = lenses[i]
        let int_ret = this.intersects(segOrigin, segTheta, lens)
        // TODO: give line segment "medium" (material it's in)

        if (int_ret) {
            let int = int_ret[0]
            // this.ctx.beginFill(0xff00ff)
            // this.ctx.drawCircle(int.x, int.y, 5)
            // this.ctx.endFill()

            this.ctx.moveTo(segOrigin.x, segOrigin.y)
            this.ctx.lineTo(int.x, int.y)
            this.debugAddLine('    -> Draw segment ('+(segOrigin.x|0)+', '+(segOrigin.y|0)+') to ('+(int.x|0)+', '+(int.y|0)+')')

            if (segsDrawn < this.maxSegs) {
                this.drawSegment(int, int_ret[1], lenses, segsDrawn)
            }
        } else {
            let endPoint = (new PIXI.Point(1, 0))
                .rotate(segTheta)
                .mult(1000)
                .add(segOrigin)
                
            this.ctx.moveTo(segOrigin.x, segOrigin.y)
            this.ctx.lineTo(endPoint.x, endPoint.y)
            this.debugAddLine('    -> Draw segment ('+(segOrigin.x|0)+', '+(segOrigin.y|0)+') to (inf, inf)')
        }
    }
}

// this checking breaks when the ray is inside the sphere
Ray.prototype.intersects = function(segOrigin, segTheta, lens) {
    let lens_pos = lens.ctx.position.as().add(segOrigin.as().mult(-1))

    let d = lens_pos.rotate(-segTheta).y

    if (Math.abs(d) < lens.r) {
        let chord_half = Math.sqrt(lens.r*lens.r - d*d)

        let xs = [lens_pos.x - chord_half, lens_pos.x + chord_half]
        let ints = [
            (new PIXI.Point(xs[0], 0))
                .rotate(segTheta)
                .add(segOrigin),
            (new PIXI.Point(xs[1], 0))
                .rotate(segTheta)
                .add(segOrigin)
        ]

        let int = null
        let corner_angle = Math.acos(chord_half/lens.r)*Math.sign(d)
        let refraction_angle = (1 - 1/lens.n)*corner_angle

        if (xs[0] > lens.epsilon)
            int = ints[0]
        else if (xs[1] > lens.epsilon)
            int = ints[1]
        else
            return null

        return [int, refraction_angle+segTheta]
    } else {
        return null
    }
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