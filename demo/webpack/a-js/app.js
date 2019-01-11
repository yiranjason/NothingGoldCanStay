//ES6
import sum from "./vender/sum";
console.log("sum(1,2)=",sum(1,2));
//commonJs
var minus=require('./vender/minus');
console.log("minus(1,2)=",minus(1,2));

//AMD
require(["./vender/multi"],function(multi){
    console.log("multi(1,2)=",multi(1,2));
})