{
  const canvas = document.getElementById(`canvas`),
    ctx = canvas.getContext(`2d`),
    bollen = [];

  let mouse;

  const init = () => {
    if (!canvas.getContext)
      return;

    mouse = new Vector(canvas.width / 2, canvas.height / 2);
    canvas.addEventListener(`mousemove`, handleMouseMove);

    for (var i = 0; i < 5000; i++)
      bollen.push(new Bol(canvas.width * Math.random(), canvas.height * Math.random()));

    draw();
  }

  const handleMouseMove = event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#000`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < bollen.length; i++)
      bollen[i].draw();

    window.requestAnimationFrame(draw);
  }

  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    add(vector) {
      this.x += vector.x;
      this.y += vector.y;
    }
    sub(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      return this;
    }
    mult(amount) {
      this.x *= amount;
      this.y *= amount;
    }
    div(amount) {
      this.x /= amount;
      this.y /= amount;
    }
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
      const m = this.mag();
      if (m !== 0)
        this.div(m);
    }
    limit(max) {
      if (this.mag() > max) {
        this.normalize();
        this.mult(max);
      }
    }
    clone() {
      return new Vector(this.x, this.y);
    }
    static sub(v1, v2) {
      let copy = v1.clone();
return copy.sub(v2);
    }
  }

  class Bol {
    constructor(x, y) {
      this.location = new Vector(x, y);
      this.velocity = new Vector(Math.random() * 10, Math.random() * 10);
      this.acceleration = new Vector(Math.random() * 2, Math.random() * 2);
    }

    draw() {
      this.velocity.limit(15);

      const dir = Vector.sub(mouse, this.location);
      dir.normalize();
      dir.mult(.5);
      this.acceleration = dir;

      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);

      if (this.location.x > canvas.width)
        this.location.x = 0;
      else if (this.location.x < 0)
        this.location.x = canvas.width;
      if (this.location.y > canvas.height)
        this.location.y = 0;
      else if (this.location.y < 0)
        this.location.y = canvas.height;

      ctx.fillStyle = `#fff`;
      ctx.beginPath();
      ctx.arc(this.location.x, this.location.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  init();
}
