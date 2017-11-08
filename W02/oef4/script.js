{
  const slider = document.getElementById(`slider`),
    canvas = document.getElementById(`canvas`),
    ctx = canvas.getContext(`2d`),
    colors = [`#028a9e`, `#04bfbf`, `#efefef`, `#ff530d`, `#ff0000`];

  let rotations = [0,20,40,60,80,100];

  const init = () => {
    if (!canvas.getContext)
      return;

    draw();
  }

  const draw = (e) => {

    ctx.fillStyle = `#0071A7`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < colors.length; i++)
      drawPolygon(canvas.width / 2, canvas.height / 2, canvas.width / 2.2 - canvas.width / 10 * i, slider.value, i);

    requestAnimationFrame(draw);
  };

  const drawPolygon = (x, y, radius, sides, index) => {
    if (sides < 3)
      return;

    if (rotations[index] < 360)
      rotations[index] += 5;
    else
      rotations[index] = 1;

    const a = Math.PI * 2 / sides;
    ctx.beginPath();
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotations[index] * Math.PI / 180);
    ctx.moveTo(radius, 0);
    for (let i = 1; i < sides; i++)
      ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
    ctx.closePath();
    ctx.fillStyle = colors[index];
    ctx.fill();
    ctx.restore();
  };

  init();
}
