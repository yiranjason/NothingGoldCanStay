#### 一、问题

今天在修改遗留问题的时候遇到一个bug,进入页面点击活动二维码现实的model没有图片，是这样事儿的

![1547545361462](https://github.com/EndeavorNo1/NothingGoldCanStay/blob/master/demo/react-study/reactProblem/p1.png)

首次点击 加载不出图像 。

#### 二、解决办法

因为这个modal我是封装在了一个子组件内，所以我顺着生命周期这条线，打断点看了一下，数据有传入组件，发现在render的时候，<canvas>这个标签根本没渲染出来，所以导致我第一次点击没有图片，再次点击因为已经渲染好了所以会出现图片。

解决办法：在componentDidMount里加一个setTimeout（跟群友leek童鞋讨论的）

#### 三、为啥呢???

https://www.jianshu.com/p/bf824722b496

子组件可能异步

在V16版本中引入Fiber机制。会影响部分生命周期，有新的2个API解决，Fiber是为了解决调用栈过长，中间还进行了复杂的操作，会导致长时间阻塞主线程。

