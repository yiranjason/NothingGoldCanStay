import(/* webpackChunkName: 'subPageA'*/ "./subPageA").then(function(subPageA) {
    console.log(subPageA);
  });
  
  import(/* webpackChunkName: 'subPageB'*/ "./subPageB").then(function(subPageB) {
    console.log(subPageB);
  });
  
  import(/* webpackChunkName: 'lodash'*/ "lodash").then(function(_) {
    console.log(_.join(["1", "2"]));
  });
  export default "page";
  //import()会自动运行subPageA.js和subPageB.js的代码。

//   require.ensure(
//     ["./subPageA.js", "./subPageB.js"], // js文件或者模块名称
//     function() {
//       var subPageA = require("./subPageA"); // 引入后需要手动执行，控制台才会打印
//       var subPageB = require("./subPageB");
//     },
//     "subPage" // chunkName
//   );
  
//   require.ensure(
//     ["lodash"],
//     function() {
//       var _ = require("lodash");
//       _.join(["1", "2"]);
//     },
//     "vendor"
//   );
  
//   export default "page";