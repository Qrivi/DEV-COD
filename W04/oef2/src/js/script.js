import Vector from './classes/Vector.js';
import SmokeParticle from './classes/SmokeParticle.js';
import {
  loadImage
} from './functions/lib.js';

const canvas = document.getElementById(`canvas`),
  ctx = canvas.getContext(`2d`),
  mouse = new Vector(0, 0);

let particles = [],
  smokeImg;

const init = () => {
  console.log(`Hello World!`);

  loadImage(`images/smoke.png`)
    .then(img => smokeImg = img)
    .then(() => {
      canvas.addEventListener(`mousemove`, mousemove);
      draw();
    });
};

const mousemove = event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const draw = () => {
  ctx.fillStyle = `black`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(particle => particle.isAlive);
  particles.push(new SmokeParticle(smokeImg, mouse.x, mouse.y));

  let wind = new Vector( (1-mouse.x/canvas.width)/10-.05, -.05);
  particles.forEach(particle => particle.applyForce(wind));
  particles.forEach(particle => particle.update());
  particles.forEach(particle => particle.draw(ctx));

  window.requestAnimationFrame(draw);
}

init();
