import Particle from './Particle.js';

export default class SmokeParticle extends Particle {
  constructor(image, x, y) {
    super(x, y);
    this.image = image;
  }
  draw(ctx) {
    ctx.globalAlpha = this.lifespan / 100;
    ctx.drawImage(this.image, this.location.x - this.image.width / 2, this.location.y - this.image.height / 2);
  }
}
