//  let clicked = false;
//  window.addEventListener("click",function(){
//      if(!clicked){
//          import('./css/base.css');
//      }
//  })
import base from "./css/base.css"; // import cssObj from '...'
var flag = false;
setInterval(function() {
  // unuse和use 是 cssObj上的方法
  if (flag) {
    base.unuse();
  } else {
    base.use();
  }
  flag = !flag;
}, 500);