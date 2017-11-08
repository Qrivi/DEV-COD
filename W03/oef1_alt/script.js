{
  const canvas = document.getElementById(`canvas`),
    ctx = canvas.getContext(`2d`),
    image = new Image(),
    imageWidth = 75,
    imageHeight = 35;

  let bol,
    sprite = 0;

  const init = () => {
    if (!canvas.getContext)
      return;

    image.src = 'dvd.png';

    bol = new Bol(canvas.width * Math.random(), canvas.height * Math.random());

    resizeCanvas();
    draw();
  }

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#000`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bol.draw();
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
  }

  class Bol {
    constructor(x, y) {
      this.location = new Vector(x, y);
      this.velocity = new Vector(2, 2);
    }

    recolor() {
      sprite = !sprite-- ? 5 : sprite;
    }

    draw() {
      this.location.add(this.velocity);

      if (this.location.x + imageWidth / 2 > canvas.width) {
        this.velocity.x = -Math.abs(this.velocity.x);
        this.recolor();
      }
      if (this.location.x - imageWidth / 2 < 0) {
        this.velocity.x = Math.abs(this.velocity.x);
        this.recolor();
      }
      if (this.location.y + imageHeight / 2 > canvas.height) {
        this.velocity.y = -Math.abs(this.velocity.y);
        this.recolor();
      }
      if (this.location.y - imageHeight / 2 < 0) {
        this.velocity.y = Math.abs(this.velocity.y);
        this.recolor();
      }

      // ctx.fillStyle = `#fff`;
      // ctx.beginPath();
      // ctx.arc(this.location.x, this.location.y, 10, 0, Math.PI * 2);
      // ctx.fill();

      ctx.drawImage(
        image,
        0,
        sprite * imageHeight,
        imageWidth,
        imageHeight,
        this.location.x - imageWidth / 2,
        this.location.y - imageHeight / 2,
        imageWidth,
        imageHeight
      );
    }
  }

  window.addEventListener('resize', resizeCanvas, false);
  init();
}
