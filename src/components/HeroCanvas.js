const circleColours = ['#DA4167', '#404E7C', '#735290']

class Circle {
  constructor (canvasEl) {
    this.velocity = {
      x: Math.random() < 0.5 ? Math.random() : Math.random() * -1,
      y: Math.random() < 0.5 ? Math.random() : Math.random() * -1
    }
    this.color = circleColours[Math.floor(Math.random() * circleColours.length)]
    this.position = {
      x: Math.random() * canvasEl.width,
      y: Math.random() * canvasEl.height
    }
    this.radius = 10
  }

  update (canvasEl) {
    // console.log(canvasEl.clientWidth + ' - ' + canvasEl.clientHeight)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.x < 0 || this.position.x > canvasEl.width) {
      this.velocity.x *= -1
    }
    if (this.position.y < 0 || this.position.y > canvasEl.height) {
      this.velocity.y *= -1
    }
  }

  draw (ctx) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}

export default class LandingCanvas {
  constructor (canvasEl) {
    this.backgroundColor = '#1B1B1B'
    this.canvasEl = canvasEl
    this.ctx = this.canvasEl.getContext('2d')
    this.reqAnim = null
    this.circles = []
    for (let i = 0; i < 20; i++) {
      this.circles.push(new Circle(this.canvasEl))
    }
  }

  setup () {
    window.addEventListener('resize', this.resize.bind(this))
    this.canvasEl.addEventListener('onmousemove', evt => {
      console.log(evt.clientX)
      console.log(evt.clientY)
    })
  }

  update () {
    // this.circle.update(this.canvasEl)
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].update(this.canvasEl)
    }
  }

  draw () {
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height)
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(this.ctx)
    }
    this.update()
    this.reqAnim = requestAnimationFrame(this.draw.bind(this))
  }

  stop () {
    cancelAnimationFrame(this.reqAnim)
  }

  resize () {
    this.canvasEl.width = this.canvasEl.parentElement.clientWidth * window.devicePixelRatio
    this.canvasEl.height = this.canvasEl.parentElement.clientHeight * window.devicePixelRatio
    // this.circles = []
    // for (let i = 0; i < 20; i++) {
      // this.circles.push(new Circle(this.canvasEl))
    // }
  }
}
