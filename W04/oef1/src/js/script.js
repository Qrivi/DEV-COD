import Vector from './classes/Vector.js';
import Particle from './classes/Particle.js';

const canvas = document.getElementById(`canvas`),
  ctx = canvas.getContext(`2d`),
  mouse = new Vector(0, 0);
let particles = [];

const init = () => {
  console.log(`Hello World!`);

  canvas.addEventListener(`mousemove`, mousemove);
  draw();
};

const mousemove = event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

const draw = () => {
  ctx.fillStyle = `black`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //console.log(mouse.x, mouse.y);

  particles = particles.filter(particle => particle.isAlive);
  // particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
  particles.push(new Particle(mouse.x, mouse.y));
  for (let i = 0; i < particles.length; i++)
    particles[i].draw(ctx);

  window.requestAnimationFrame(draw);
}

init();
