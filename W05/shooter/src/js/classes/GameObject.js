import Vector from './Vector.js';

export default class GameObject {
    constructor( x, y, image ) {
        this.location = new Vector( x, y );
        this.velocity = new Vector( 0, 0 );
        this.acceleration = new Vector( 0, 0 );
        this.image = image;
        this.size = this.image.height;
        this.frameRate = 60;
        this.frameNo = 0;
        this.localFrameNo = 0;
        this.numFrames = 1;
    };

    applyForce( force ) {
        this.acceleration.add( force );
    };

    update() {
        this.frameNo++;
        this.localFrameNo = Math.floor( this.frameNo / ( 60 / this.frameRate ) ) % this.numFrames;

        this.velocity.add( this.acceleration );
        this.location.add( this.velocity );
        this.acceleration.mult( 0 );
        this.velocity.mult( 0.95 );
    };

    draw( ctx ) {
        ctx.save();
        ctx.translate( this.location.x, this.location.y );
        ctx.drawImage( this.image, this.localFrameNo * this.size, 0, this.size, this.size, -this.size / 2, -this.size / 2, this.size, this.size );
        ctx.restore();
    };
}
