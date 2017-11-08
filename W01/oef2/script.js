{
  const canvas = document.getElementById(`canvas`);

  const init = () => {
    if (!canvas.getContext)
      return;

    const ctx = canvas.getContext(`2d`);

    //ctx.fillStyle = `rgb( 234,235,239 )`;
    //ctx.fillRect( 0, 0, 600, 600 );

    ctx.fillStyle = `rgb( 52,54,62 )`;
    ctx.strokeStyle = `rgb( 52,54,62 )`;
    ctx.lineWidth = 16;

    ctx.beginPath();
    ctx.arc(300, 100, 50, 1.5 * Math.PI, .5 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(280, 90, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(300, 100, 55, .3 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300, 100, 70, .5 * Math.PI, .3 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(222, 100);
    ctx.lineTo(222, 200);
    ctx.lineTo(300, 200);
    ctx.lineTo(300, 170);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(222, 200);
    ctx.lineTo(255, 200);
    ctx.arc(222, 200, 33, 0, .5 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(222, 200, 48, 0, .5 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(222, 200, 70, 0, .5 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240, 270);
    ctx.lineTo(240, 290);
    ctx.arc(222, 290, 18, 0, .5 * Math.PI);
    ctx.lineTo(222, 270);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(254, 260);
    ctx.lineTo(254, 290);
    ctx.arc(222, 290, 32, 0, .5 * Math.PI);
    ctx.stroke();
  }

  init();
}
