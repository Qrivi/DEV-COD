export const random = (min = 0, max = 1) =>{
  return Math.random()* (max-min) + min;
}

export const loadImageInCatalog = (url,id,catalog) => {
  return new Promise((response,reject) => {
    //image load
    catalog[id] = new Image();
    catalog[id].addEventListener(`load`,event => response(catalog[id]));
    catalog[id].addEventListener(`error`,event => reject(event));
    catalog[id].setAttribute('src',url);
    if(catalog[id].complete){
      response(catalog[id]);
    };
  });
}
export const loadImage = url => {
  return new Promise((response,reject) => {
    //image load
    const image = new Image();
    image.addEventListener(`load`, event => response(image));
    image.addEventListener(`error`,event =>  reject(event));
    image.setAttribute(`src`,url);
    if(image.complete){
      response(image);
    };
  });
}
export const map = (value, istart, istop, ostart, ostop) => {
  return  ostart + (ostop - ostart) * ( (value - istart) / (istop - istart) );
};
