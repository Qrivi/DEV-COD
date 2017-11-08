{
  const canvas = document.getElementById( `canvas` );

  const init = () => {
    if( !canvas.getContext )
      return;

    const ctx = canvas.getContext( `2d` );

    ctx.fillStyle = `rgb( 255, 88, 0 )`;
    ctx.fillRect( 0, 0, 200, 200 );

    ctx.fillStyle = `rgb( 8, 190, 190 )`;
    ctx.fillRect( 100, 100, 400, 400 );
  }
  init();
}
