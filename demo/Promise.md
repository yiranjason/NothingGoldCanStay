### 一、什么是Promise?

#### 1.Promise的结构：

```
class Promise{
    constructor(exector){
    	function resolve(){
            
    	}
    	function reject(){
            
    	}
 	    exector(resolve,reject)    
	}
	then(){
        
	}
}

```
#### 2.Promise的三种状态：

pending、fulfilled、rejected(未决定，履行，拒绝)，同一时间只能存在一种状态,且状态一旦改变就不能再变。promise是一个构造函数，promise对象代表一项有两种可能结果（成功或失败）的任务，它还持有多个回调，出现不同结果时分别发出相应回调。

```
1.初始化，状态：pending

2.当调用resolve(成功)，状态：pengding=>fulfilled

3.当调用reject(失败)，状态：pending=>rejected
```
```javascript
const PENDING = "pending";//Promise会一直保持挂起状态，知道被执行或拒绝。
const FULFULLED = "fulfilled";
const REJECTED = "rejected";
class Promise{
    constructor(exector){
    	let self = this;//缓存当前promise对象
    	self.status = PENDING;//初始状态,对promise对象调用state(状态)方法，可以查看其状态是“pending"、"resolved"、还是”rejected“
        self.value = undefined;// fulfilled状态时 返回的信息
        self.reason = undefined;// rejected状态时 拒绝的原因
        self.onResolveCallBacks = [];// 存储resolve(成功)状态对应的onFulfilled函数
        self.onRejectCallBacks = [];// 存储rejected(失败)状态对应的onRejected函数
        let resolve = (value) => {//成功
            if(self.status === PENDING){//如果成功则，状态由pending=>fulfilled
                self.status = FULFULLED;
                self.value = value;
                self.onResolveCallBacks.forEach(cb=>cb(self.value));//执行发布
            }
        }
        let reject = (reason) => {//失败
            if(self.status === PENDING){//如果失败，则状态由pending=>rejected
                self.status = REJECTED;
                self.reason = reason;
                self.onRejectCallBacks.forEach(cb=>cb(self.reason));//执行发布
            }
        }
        
        try{
 		    exector(resolve,reject)    	            
        }catch(e){
            reject(e)
        }
	}
	then(onFulfilled,onRejected){
        let self=this;
        if(self.status === FULFULLED){
            onFulfilled(self.value);//成功值
        }
        if(self.status === REJECTED){
            onFulfilled(self.reason);//拒绝原因
        }
        if(self.status === PENDING){
            self.onResolveCallBacks.push(onFulfilled);//订阅发布
            self.onRejectCallBacks.push(onRejected);//订阅发布
        }
	}
    //promise的决议结果只有两种可能：完成和拒绝，附带一个可选的单个值。如果Promise完成，那么最终的值称为完成值；如果拒绝，那么最终的值称为原因。Promise只能被决议（完成或拒绝）一次。之后再次试图完成或拒绝的动作都会被忽略。
}

new Promise((resolve,reject)=>{
    resolve("挖坑妹")；
    //异步处理
    //处理结束后、调用resolve或reject
}).then((data)=>{
    console.log(data);//"挖坑妹"
},(reason)=>{
    console.log(reason);
})
```

#### 3.promise的优缺点

​	优点：

​		1.Promise 分离了异步数据获取和业务逻辑，有利于代码复用。

​		2.可以采用链式写法

​		3.一旦 Promise 的值确定为fulfilled 或者 rejected 后，不可改变。

​	缺点：

​		代码冗余，语义不清。

### 二、为什么用Promise?

#### 1.解决回调地狱

​	回调地狱：发送多个异步请求时，每个请求之间相互都有关联，会出现第一个请求成功后再做下一个请求的情况。我们这时候往往会用嵌套的方式来解决这种情况，但是这会形成”回调地狱“。如果处理的异步请求越多，那么回调嵌套的就越深。出现的问题：

1.代码逻辑顺序与执行顺序不一致，不利于阅读与维护。

2.异步操作顺序变更时，需要大规模的代码重构。

3.回调函数基本都是匿名函数，bug追踪困难。

```javascript
const request = url => {
    return new Promise((resolve,reject) => {
        $.get(url,params => {
            resolve(params)
        });
    });
};

request(url).then(params1 => {
    return request(params1.url);   
}).then(params2 => {
    return request(params2.url);
}).then(params3 => {
    console.log(params3);
}).catch(err => throw new Error(err));

```

#### 2.解决异步

我们都知道js是单线程执行代码，导致js的很多操作都是异步执行（ajax）的，以下是解决异步的几种方式：

​	1.回调函数(定时器)。

​	2.事件监听。

​	3.发布/订阅。

​	4.Promise对象。(将执行代码和处理结果分开)

​	5.Generator。

​	6.ES7的async/await。

### 三、怎么用Promise?

promise有几种对象方法

#### 1.then方法(异步执行)

当resolve(成功)/reject(失败)的回调函数

```javascript
//onFulfilled 是用来接收promise成功的值
//onRejected 是用来接收promise失败的原因
promise.then(onFulfilled,onRejected)
```

#### 2.resolve(成功)

​	调用onFulfilled

```javascript
const promise = new Promise((resolve,reject)=>{
    resolve('fulfilled');//状态：pending=>fulfilled
})；

promise.then(result =>{//onFulfilled调用
 	console.log(result);//'fulfilled'   
},result =>{//onRejected不调用
    
})


//注：resolve使用
Promise.resolve('hellow world')相当于
//相当于
const promise = new Promise(resolve=>{
    resolve('hellow world');
})
```



#### 3.reject(失败) 

​	调用onRejected

```javascript
const promise = new Promise((resolve,reject)=>{
	reject('rejected');//状态：pending=>rejected    
});

promise.then(result =>{//onFulfilled不调用
 	
},result =>{//onRejected调用
    console.log(result);//'rejected'   
})

//注：reject使用
Promise.reject('err')相当于
//相当于
const promise = new Promise((resolve,reject)=>{
    reject('err');
});
```

#### 4.catch

​	链式写法中可以捕获前面then中发送的异常,这种写法的好处在于先执行promise操作，然后根据返回的结果（成功或失败）来调用onFulfilled（或者onRrejected）函数。

```javascript
promise.then(onFulfilled).catch(onRrejected); 
```

#### 5.all

​	Promise.all接收一个promise对象数组为参数，处理并行异步操作会用到，但是需要全部为resolve才能调用。这种情况是几个任务可以并行执行

```javascript
const promise1= new Promise((resolve,reject)=>{
    resolve('promise1');
});
const promise2= new Promise((resolve,reject)=>{
    resolve('promise2');
});
const promise3= new Promise((resolve,reject)=>{
    resolve('promise3');
});
Promise.all([promise1, promise2, promise3]).then(data => { 
    console.log(data); 
    // ['promise1', 'promise2', 'promise3'] 结果顺序和promise实例数组顺序是一致的
}, err => {
    console.log(err);
});
```

可以从一个promise对象派生出新的promise对象，我们可以要求代表着并行任务的两个promise对象合并成一个promise对象，由后者负责通知前面的那些任务都已完成。也可以要求代表着任务系列中首要任务的Promise对象派生出一个能代表任务系列中末任务的Promise对象，这样后者就能知道这一系列的任务是否均已完成。

#### 6.race

​	Promise.race接收一个promise对象数组为参数，只要有一个promise对象进入Fulfilled或者Rejected状态的话，就会进行后面的处理。这可以解决多个异步任务的容错

```javascript
function racePromise(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(time);
        },time)
    })
}
var startDate = Date.now();
Promise.race([
    racePromise(5),
    racePromise(50),
    racePromise(500),
]).then(function(values){
    console.log(values);5
})
```

