import Vector from './Vector.js';

export default class GameObject{
  constructor(x,y,image){
    this.location  = new Vector(x,y);
    this.acceleration = new Vector(0,0);
    this.velocity = new Vector(0,0);
    this.image = image;
    this.size = this.image.height;
    this.frameRate = 60;
    this.frameNr = 0;
    this.localFrameNr = 0;
    this.numFrames = 1;
  }
  calculateDistance(otherElement){
    let distance = Vector.sub(otherElement.location , this.location).mag();
    distance = distance - otherElement.size/2 - this.size/2;
    return distance;
  }
  collidesWith(otherElement){
    return (this.calculateDistance(otherElement)<=0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  update(){
    this.frameNr ++;
    this.localFrameNr = Math.floor(this.frameNr/(60 / this.frameRate));
    this.loopCounter  = Math.floor(this.localFrameNr /  this.numFrames);
    this.localFrameNr = this.localFrameNr%this.numFrames;
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.95);
  }
  draw(ctx){
    ctx.save();
    ctx.translate(this.location.x, this.location.y);
    ctx.drawImage(this.image, this.localFrameNr * this.size,0, this.size, this.size, -this.size/2,-this.size/2,this.size,this.size);
    ctx.restore();
  }
}
