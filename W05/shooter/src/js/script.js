import Keyboard from './classes/Keyboard.js';
import Vector from './classes/Vector.js';
import Player from './classes/Player.js';
import Enemy from './classes/Enemy.js';
import Bullet from './classes/Bullet.js';
import { loadImageToCatalog } from './functions/lib.js';

let canvas, ctx;
let catalog = {};

let keyboard;
let player;
let enemies = [];
let bullets = [];

{
    const init = () => {
        console.log( `Hello World!` );
        canvas = document.getElementById( `canvas` );
        ctx = canvas.getContext( `2d` );

        Promise.all( [
                loadImageToCatalog( `img/bullet.png`, `bullet`, catalog ),
                loadImageToCatalog( `img/player.png`, `player`, catalog ),
                loadImageToCatalog( `img/enemy.png`, `enemy`, catalog ),
                loadImageToCatalog( `img/explosion.png`, `explosion`, catalog )
            ] )
            .then( loaded )
            .catch( () => console.log( `Loading images failed` ) );
    };

    const loaded = () => {
        keyboard = new Keyboard();
        player = new Player( canvas.width / 2, canvas.height - catalog.player.height, catalog.player );
        player.numFrames = 3;

        draw();
    };

    const draw = () => {
        //background
        ctx.fillStyle = `black`;
        ctx.fillRect( 0, 0, canvas.width, canvas.height );

        //keyboard
        if( !player.killed ) {
            if( keyboard.isDown( Keyboard.LEFT ) )
                player.applyForce( new Vector( -0.5, 0 ) );

            if( keyboard.isDown( Keyboard.RIGHT ) )
                player.applyForce( new Vector( 0.5, 0 ) );

            if( keyboard.isDown( Keyboard.SPACE ) )
                bullets.push( new Bullet( player.location.x, player.location.y, catalog.bullet ) );
        }

        //player
        player.update();
        if( !player.killed )
            player.draw( ctx );

        //enemy
        if( Math.random() < .04 )
            enemies.push( new Enemy( canvas.width * Math.random(), 0, catalog.enemy ) );

        enemies = enemies.filter( enemy => enemy.location.y < canvas.height );
        enemies.forEach( enemy => {
            let dir = new Vector( 0, .5 );
            if( !player.killed )
                dir = Vector.sub( player.location, enemy.location )
                .normalize()
                .mult( 0.5 );

            enemy.applyForce( dir );
            enemy.update();
            enemy.draw( ctx );
        } );

        //bullet
        bullets = bullets.filter( bullet => bullet.location.y > 0 );
        bullets.forEach( bullet => {
            bullet.velocity.y = -5;
            bullet.update();
            bullet.draw( ctx )
        } );

        window.requestAnimationFrame( draw );
    };

    init();
}
