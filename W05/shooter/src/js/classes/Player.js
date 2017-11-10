import GameObject from './GameObject.js';

export default class Player extends GameObject {
    constructor( x, y, image ) {
        super( x, y, image );
        this.frameRate = 20;
        this.numFrames = 3;
        this.killed = false;
    }
}
