import Player from './classes/Player.js';
import Keyboard from './classes/Keyboard.js';
import {loadImageInCatalog} from './functions/lib.js';
import Vector from './classes/Vector.js';
import Enemy from './classes/Enemy.js';
import Bullet from './classes/Bullet.js';
import CollisionDetector from './classes/CollisionDetector.js';
import Explosion from './classes/Explosion.js';

{
  let canvas, ctx;
  let catalog = {};
  let keyboard;
  let player;
  let enemies = [];
  let playerBullets = [];
  let playerBulletsEnemiesCollisionDetector;
  let playerEnemiesCollisionDetector;
  let explosions = [];

  const init = () => {
    console.log("===== GAME INITIALISED =====");
    canvas = document.getElementById(`canvas`);
    ctx = canvas.getContext(`2d`);
    Promise.all([
      loadImageInCatalog(`img/bullet.png`,`bullet`,catalog),
      loadImageInCatalog(`img/player.png`,`player`,catalog),
      loadImageInCatalog(`img/enemy.png`,`enemy`,catalog),
      loadImageInCatalog(`img/explosion.png`,`explosion`,catalog)
    ]).then(loaded);
  };
  const loaded = () => {
    console.log(catalog);
    player = new Player(canvas.width /2, canvas.height -50,catalog.player);
    console.log(player);
    keyboard = new Keyboard();
    //
    playerBulletsEnemiesCollisionDetector = new CollisionDetector();
    playerBulletsEnemiesCollisionDetector.on(`collision`,handleCollisionBulletEnemy);
    //
    playerEnemiesCollisionDetector = new CollisionDetector();
    playerEnemiesCollisionDetector.on(`collision`,handleCollisionEnemyPlayer);
    draw();
  }
  const handleCollisionBulletEnemy = (bullet,enemy) => {
    if(enemy.killed){
      return;
    }
    enemy.killed = true;
    playerBullets = playerBullets.filter(value => value !== bullet);
    enemies = enemies.filter(value => value !== enemy);
    //
    let explosion = new Explosion(enemy.location.x,enemy.location.y,catalog.explosion);
    explosion.applyForce(enemy.velocity.mult(0.5));
    explosions.push(explosion);
  }
  const handleCollisionEnemyPlayer = (enemy,player) => {
    if(enemy.killed){
      return;
    }
    enemy.killed = true;
    player.killed = true;
    enemies = enemies.filter(value => value !== enemy);
    //
    let explosion = new Explosion(player.location.x,player.location.y,catalog.explosion);
    explosion.applyForce(player.velocity.mult(0.5));
    explosions.push(explosion);
  }
  const draw = () => {
    ctx.fillStyle = `black`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //
    if(!player.killed){
      if(keyboard.isDown(Keyboard.LEFT)){
        player.applyForce(new Vector(-0.5,0));
      }
      if(keyboard.isDown(Keyboard.RIGHT)){
        player.applyForce(new Vector(0.5,0));
      }
      if(keyboard.isDown(Keyboard.SPACE)){
        let bullet = new Bullet(player.location.x,player.location.y,catalog.bullet);
        playerBullets.push(bullet);
      }
    }
    //
    player.update();

    //
    if(Math.random() < 0.05){
      console.log("enemy created");
      let enemy = new Enemy(canvas.width * Math.random(),0,catalog.enemy);
      enemies.push(enemy);
    }
    enemies.forEach(enemy => {
      let dir = new Vector(0,0.5);
      if(!player.killed){
        dir = Vector.sub(player.location,enemy.location).normalize().mult(0.5);
      }
      enemy.applyForce(dir);
      enemy.update();
    });
    enemies = enemies.filter(enemy => enemy.location.y <canvas.height);
    enemies.forEach(enemy => enemy.draw(ctx));

    playerBullets.forEach(bullet => {
      bullet.velocity.y = - 5;
      bullet.update();
    });

    playerBullets = playerBullets.filter(bullet => bullet.location.y >0);
    playerBullets.forEach(bullet => bullet.draw(ctx));

    if(!player.killed){
      playerBulletsEnemiesCollisionDetector.detectCollisions(playerBullets,enemies);
      playerEnemiesCollisionDetector.detectCollisions(enemies,[player]);
      player.draw(ctx);
    }
    explosions.forEach(explosion => {
      explosion.update();
    })
    explosions = explosions.filter(explosion => explosion.loopCounter ===0);
    explosions.forEach(explosion => explosion.draw(ctx));


    window.requestAnimationFrame(draw);
  }


  init();

}
