import GameObject from './GameObject.js';

export default class Enemy extends GameObject {
    constructor( x, y, image ) {
        super( x, y, image );
        this.frameRate = 20;
        this.numFrames = 3;
    }
    draw( ctx ) {
        ctx.save();
        ctx.translate( this.location.x, this.location.y );

        ctx.rotate( Math.atan2( this.velocity.y, this.velocity.x ) - Math.PI / 2 );

        ctx.drawImage( this.image, this.localFrameNo * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size );
        ctx.restore();
    }
}
