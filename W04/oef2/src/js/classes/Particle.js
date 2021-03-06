import Vector from './Vector.js';
import {random} from '../functions/lib.js';

export default class Particle {
  constructor(x, y) {
    this.location = new Vector(x, y);
    this.velocity = new Vector(random(-1, 1), random(-1, 1));
    this.acceleration = new Vector(0, 0);
    this.lifespan = 100;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.lifespan/100})`;
    ctx.fillRect(this.location.x - 1, this.location.y - 1, 2, 2);
  }
  update() {
    this.lifespan--;
    this.velocity.add(this.acceleration);
    this.location.add( this.velocity);
    this .acceleration.mult( 0 );
  }
  applyForce(force)   {
      this.acceleration.add(force);
 }
  get isAlive() {
    return this.lifespan > 0;
  }
}
