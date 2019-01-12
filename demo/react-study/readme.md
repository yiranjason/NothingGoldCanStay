## React-高组件学习路径

2019.1.09-2019.1.12特地起了个打造学习= =，因为想让自己的GitHub绿绿的 = =

对于React高阶组件,个人理解不是组件，而是函数。

### 一、高阶组建是什么？

1.函数可以作为参数被传递：例如两种定时器

```
setTimeout(()=>{
  console.log(1000)
},1000);//这里函数被当作参数传递
```

2.函数也可以作为返回值输出：

```
function foo(x){
	return function (){
                return function(){
                    return x;
                }
            }
}
```

对于高阶组建的基本概念：

1.定义：接受一个组件作为参数并返回一个新的函数

2.高阶组件是一个函数，并不是组件

二、为什么用高阶组件

​	多个组件都需要某个相同的功能，使用高阶组件减少重复实现

三、怎么用高阶组件

​	例子如demo所示

四、高阶组建示例
	react,redux中的connect
	export default connect(mapStateToProps,mapDispatchToProps)(Header)
