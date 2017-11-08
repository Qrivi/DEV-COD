import EventEmitter2 from '../vendors/eventemitter2.js';

export default class CollisionDetector extends EventEmitter2{
  constructor(){
    super({});
  }
  detectCollisions(elements1,elements2){
    elements1.forEach( element1 => {
      elements2.forEach(element2 => {
        //kijk of het element1 botst met element2
        if(element1.collidesWith(element2)){
          //indien wel ==> event uitsturen met emit methode
          this.emit(`collision`,element1,element2);
        }
      })
    })
  }
}
