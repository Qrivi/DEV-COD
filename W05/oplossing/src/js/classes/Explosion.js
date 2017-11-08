import GameObject from './GameObject.js';

export default class Explosion extends GameObject{
    constructor(x,y,image){
      super(x,y,image);
      this.frameRate = 10;
      this.numFrames = 6;
    }
}
