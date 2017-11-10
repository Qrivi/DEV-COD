export const random = ( min = 0, max = 1 ) => {
    return Math.random() * ( max - min ) + min;
}

export const loadImage = url => {
    return new Promise( ( resolve, reject ) => {
        let image = new Image();
        image.addEventListener( `load`, event => resolve( image ) );
        image.addEventListener( `error`, event => reject( event ) );
        image.setAttribute( `src`, url );
        if( image.complete )
            resolve( image );
    } );
}

export const loadImageToCatalog = ( url, id, catalog ) => {
    return new Promise( ( resolve, reject ) => {
        catalog[ id ] = new Image();
        catalog[ id ].addEventListener( `load`, event => resolve( catalog[ id ] ) );
        catalog[ id ].addEventListener( `error`, event => reject( event ) );
        catalog[ id ].setAttribute( `src`, url );
        if( catalog[ id ].complete )
            resolve( catalog[ id ] );
    } );
}
