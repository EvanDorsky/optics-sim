function Lens() {
    this.ctx = new PIXI.Graphics()

    this.ctx.x = 210
    this.ctx.y = 150
    this.r = 50

    this.ctx.beginFill(0xffffff)
}

Lens.prototype.draw = function() {
    this.ctx.beginFill(0xffffff)
    this.ctx.drawCircle(0, 0, this.r)
    this.ctx.endFill()

    World.app.stage.addChild(this.ctx)

    let r = this.r

    let xmin = -r
    let xmax =  r
    let ymin = -r
    let ymax =  r

    this.ctx.beginFill(0xff0000)
    this.ctx.drawCircle(xmin, 0, 5)
    this.ctx.drawCircle(xmax, 0, 5)
    this.ctx.drawCircle(0, ymin, 5)
    this.ctx.drawCircle(0, ymax, 5)
    this.ctx.endFill()
}
