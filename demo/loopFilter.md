

在代码示例中我会用到es6中的语言，如果你还不是很了解，你可以看看阮老师的[es6](http://es6.ruanyifeng.com/#README).(= =我也是一点一点跟着看的。)

##### 1.map

 先说一下最常用的map.利用map方便获得对象数组中的特定属性值们.它返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

```
//将a02品牌的标价全部加100
const clothesArr=[
  {username:"sunan",haveA02:false,basePrice:30},
  {username:"fenshuajiang",haveA02:true,basePrice:10},
  {username:"huixin",haveA02:true,basePrice:20}
]

clothesArr.map(
    item=>item.haveA02?{...item,basePrice:item.basePrice+100}:item
)
```

- map() 不会对空数组进行检测。
- map() 不会改变原始数组。

##### 2.filter

 filter和map相比，它也接受一个函数，并把接受的函数依次作用于每个元素，返回值为true和false,true留下，false扔掉！看看例子~

```
const filterArr = [1,2,3,4,5,6,7,8,9,10];//这里我只想要3的倍数

const newArr = filterArr.filter((x) => x % 3 == 0);

console.log(newArr);//(3) [3, 6, 9]
```

这里需要注意：

- filter() 不会对空数组进行检测。
- filter() 不会改变原始数组,所以你需要赋值到新数组上。

##### 3.forEach

forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。forEach方法中的function回调有三个参数：第一个参数是遍历的数组内容，第二个参数是对应的数组索引，第三个参数是数组本身,数组中有几项，那么传递进去的匿名回调函数就需要执行几次.

```
const forEachArr=[1,2,3,4,5];//计算所有数组的和
var sum=0;
forEachArr.forEach((value,index,array)=>{
    sum+=value;  
    });//苏南的专栏 交流：912594095、公众号：honeyBadger8
console.log(sum);//15
```

这里需要注意：

- forEach() 对于空数组是不会执行回调函数的。

##### 4.for in

以前觉得这个不常用，但现在真的很感谢有这个函数,因为最近项目中解决了很多问题，尤其是对象拿value值的时候，先来说说对数组的时候怎么用。

```
const forInArr=[1,2,3,4,5]
for(let index in forInArr){
    console.log(index,forInArr[index]);
}
//0 1
//1 2
//2 3
//3 4
//4 5
```

用for in不仅可以对数组便利,也可以对enumerable（可枚举）对象操作

```
const forInObj={
  '111':{name:'huixin',size:'m'},
  '222':{name:'sunan',size:'l'},
  '333':{name:'fenshuajiang',size:'s'}
};//这个时候我只想取到value值传给后端，key值不要。
for(let index in forInObj){
    console.log(index,forInObj[index]);
}
//111 {name: "huixin", size: "m"}
//222 {name: "sunan", size: "l"}
//333 {name: "fenshuajiang", size: "s"}
```

在这里插播一个问题：给你一个对象，去掉里面属性值为null、""或者undefined的属性

```
let objs={
  a:false,
  b:null,
  c:undefined,
  d:''
}

const dataType=(obj)=>{
    if (obj===null) return "Null";
    if (obj===undefined) return "Undefined";
    return Object.prototype.toString.call(obj).slice(8,-1);
};

const filtrateValue=(obj)=>{
    var param = {};
    if ( obj === null || obj === undefined || obj === "" ) return param;
    for ( var key in obj ){
        if ( dataType(obj[key]) === "Object" ){
            param[key] = filtrateValue(obj[key]);
        }else if(  obj[key] !== null && obj[key] !== undefined && obj[key] !== ""  ){//苏南的专栏 交流：912594095、公众号：honeyBadger8
            param[key] = obj[key];
        }
    }
    return param;
};
filtrateValue(objs);

//{a: false}
```

##### 5.for of

在es6 中新增了一个 for of 循环，这个还没怎么用过，以后要多用才能记得住，看看例子～

```
const forOfArr='huixin';
for(let value of forOfArr) {  
        console.log(value);  
};
//h
//u
//i
//x
//i
//n
```

for in总是得到对像的key或数组,字符串的下标,而for of和forEach一样,是直接得到值

注意：for of不能对对象用

##### 6.set

Set类似于数组，但是成员的值都是唯一的，没有重复的值,也没有索引。用set.size表示伪数组长度

```
var setArr= [7, 7, 7, 8, 8, 8, 82, 82, 839, 49, 329, 8, 3, 3];//数组去重
var set = new Set(setArr);
var newArr = new Array(...set);
console.log(newArr);//(7) [7, 8, 82, 839, 49, 329, 3]
```

##### 7.some

这个函数，我觉得只是检测数组中是否有某个元素，符合条件，符合返回true。如果没有满足条件的元素，则返回false。感觉有点像|字符。

```
var someArr = [2, 13, 18, 20];//检测是否有人小于18岁
let outcome=someArr.some( (age)=>{ return age<18})
console.log(outcome);//true
```

**注意：** some() 不会对空数组进行检测。

**注意：** some() 不会改变原始数组。

##### 8.every

这个函数，检测数组中是否有某个元素，不符合条件，有一个为false,则返回false。如果都满足条件的元素，则返回true。感觉有点像&字符。

```
var someArr = [2, 13, 18, 20];//检测是否都是未成年
let outcome=someArr.every((age)=>{ return age<18})
console.log(outcome);//false
```

**注意：** every() 不会对空数组进行检测。

**注意：** every() 不会改变原始数组。

##### 9.reduce

 最后一个，reduce，刚接触前端的时候，我也不明白，现在到是知道那么一丢丢了。这个方法有点不同，4个参数。接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

 prev：它是上一次调用回调时返回的结果，每次调用的结果都会给prev

 cur：当前的元素

 index：当前的索引

 arr：循环的数组

```
var reduceArr = [1,2,3,4,5]//求和
 
var str = reduceArr.reduce((prev,cur,index,arr)=>{
    return prev + cur ;//苏南的专栏 交流：912594095、公众号：honeyBadger8
})

console.log(str);//15
```

10.Object.keys(obj)

朋友小机灵又帮我添加了一个，可以遍历对象

```
const forInObj={
  '111':{name:'huixin',size:'m'},
  '222':{name:'sunan',size:'l'},
  '333':{name:'fenshuajiang',size:'s'}
};//苏南的专栏 交流：912594095、公众号：honeyBadger8
Object.keys(forInObj).map(item=>console.log(item,forInObj[item]));

//111 {name: "huixin", size: "m"}
//222 {name: "sunan", size: "l"}
//333 {name: "fenshuajiang", size: "s"}
```

11. ES7 ，引入了跟Object.keys配套的Object.values和Object.entries。

```javascript
let {keys,values,entries} = Object;
const forInObj={
  a:'huixin',
  b:'shuilian',
  c:'yichun'
}; 
for(let key in keys(forInObj)){
    console.log(key);
}
console.log(values(forInObj))//["huixin", "shuilian", "yichun"]
for(let value of values(forInObj)){
    console.log(value);
}
for(let [key,value] of entries(forInObj)){
    console.log([key,value]);
}
//o,1,2
//0,1,2-输入浏览器与预期不符，在项目中编译一下与预期"huixin","shuilian","yichun"也不相符 = =,检查了一下我用的for..in,所以返回的不对，for...of,是对的，for in遍历的是数组的索引(即键名),而for of遍历的是数组元素
//["a","huixin"],["b","shuilian"],["c","yichun"]
```

 这篇文章投了专栏，我后来又结合评论添加了一些。地址：https://segmentfault.com/a/1190000017569850