{
  const canvas = document.getElementById(`canvas`),
    ctx = canvas.getContext(`2d`),
    colors = [`#028a9e`, `#04bfbf`, `#efefef`, `#ff530d`, `#ff0000`],
    barWidth = canvas.width / colors.length,
    barHeight = [0, 0, 0, 0, 0],
    currentHeight = [0, 0, 0, 0, 0];

  let autoPlay = false;

  const init = () => {
    if (!canvas.getContext)
      return;

    generateNewValues();
    draw();

    canvas.addEventListener(`click`, togglePlay);
  }

  const togglePlay = () => {
    autoPlay = !autoPlay;
    if (autoPlay)
      generateNewValues();
  }

  const draw = () => {
    ctx.fillStyle = `#003455`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < colors.length; i++) {
      currentHeight[i] += (barHeight[i] - currentHeight[i]) / 2;

      if (autoPlay && Math.round(barHeight[i]) === Math.round(currentHeight[i]))
        generateNewValues();

      ctx.fillStyle = colors[i];
      ctx.fillRect(barWidth * i, canvas.height - currentHeight[i], barWidth, currentHeight[i]);
      // console.log(barWidth * i, canvas.height - currentHeight[i], barWidth, currentHeight[i]);
    }

    requestAnimationFrame(draw);
  }

  const generateNewValues = (forced) => {
    for (let i = 0; i < barHeight.length; i++) {
      barHeight[i] = Math.random() * canvas.height;
    };
  }

  init();
}
