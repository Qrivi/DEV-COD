{
  const canvas = document.getElementById(`canvas`),
    ctx = canvas.getContext(`2d`),
    bollen = [];

  const init = () => {
    if (!canvas.getContext)
      return;

    for (var i = 0; i < 10; i++)
      bollen.push(new Bol(canvas.width * Math.random(), canvas.height * Math.random()));
    draw();
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
  }

  class Bol {
    constructor(x, y) {
      this.location = new Vector(x, y);
      this.velocity = new Vector(2.5, 2.5);
    }

    draw() {
      this.location.add(this.velocity);

      if (this.location.x > canvas.width)
        this.velocity.x = -Math.abs(this.velocity.x);
      if (this.location.x < 0)
        this.velocity.x = Math.abs(this.velocity.x);
      if (this.location.y > canvas.height)
        this.velocity.y = -Math.abs(this.velocity.y);
      if (this.location.y < 0)
        this.velocity.y = Math.abs(this.velocity.y);

      ctx.fillStyle = `#fff`;
      ctx.beginPath();
      ctx.arc(this.location.x, this.location.y, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  init();
}
