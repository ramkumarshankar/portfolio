const circleColours = ["#DA4167", "#404E7C", "#735290"];

class Circle {
  constructor(canvasEl, type = null) {
    this.velocity = {
      x: Math.random() < 0.5 ? Math.random() : Math.random() * -1,
      y: Math.random() < 0.5 ? Math.random() : Math.random() * -1
    };
    this.position = {
      x: Math.random() * canvasEl.width,
      y: Math.random() * canvasEl.height
    };
    if (type === "invisible") {
      this.radius = 0;
    } else {
      this.radius = 10;
      this.color =
        circleColours[Math.floor(Math.random() * circleColours.length)];
    }
  }

  update(canvasEl) {
    // console.log(canvasEl.clientWidth + ' - ' + canvasEl.clientHeight)
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x < 0 || this.position.x > canvasEl.width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > canvasEl.height) {
      this.velocity.y *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

export default class LandingCanvas {
  constructor(canvasEl) {
    this.backgroundColor = "#1B1B1B";
    this.canvasEl = canvasEl;
    this.ctx = this.canvasEl.getContext("2d");
    this.reqAnim = null;
    this.generatePoints();
  }

  generatePoints() {
    this.circles = [];
    this.points = [];
    for (let i = 0; i < 20; i++) {
      this.circles.push(new Circle(this.canvasEl));
    }
    for (let i = 0; i < 10; i++) {
      this.points.push(new Circle(this.canvasEl, "invisible"));
    }
  }

  setup() {
    window.addEventListener("resize", this.resize.bind(this));
    this.canvasEl.addEventListener("onmousemove", evt => {
      //
    });
  }

  update() {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].update(this.canvasEl);
    }
    for (let j = 0; j < this.circles.length; j++) {
      this.circles[j].update(this.canvasEl);
    }
  }

  draw() {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(this.ctx);
    }
    // console.log(this.points[0].position.x)
    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      for (let j = 0; j < this.circles.length; j++) {
        let circle = this.circles[j];
        let distance = this.calculateDistance(point.position, circle.position);
        // console.log(distance)
        if (distance < 400) {
          // console.log('stroke')
          this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          this.ctx.beginPath();
          this.ctx.moveTo(point.position.x, point.position.y);
          this.ctx.lineTo(circle.position.x, circle.position.y);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
    this.update();
    this.reqAnim = requestAnimationFrame(this.draw.bind(this));
  }

  calculateDistance(point1, point2) {
    return Math.hypot(point2.x - point1.x, point2.y - point1.y);
  }

  stop() {
    cancelAnimationFrame(this.reqAnim);
  }

  resize() {
    this.canvasEl.width =
      this.canvasEl.parentElement.clientWidth * window.devicePixelRatio;
    this.canvasEl.height =
      this.canvasEl.parentElement.clientHeight * window.devicePixelRatio;
    this.generatePoints();
  }
}
