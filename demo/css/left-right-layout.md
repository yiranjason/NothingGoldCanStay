#### 1. 通配符reset的问题

不少回答出现了下面的CSS：

```css
* { padding: 0; margin: 0; }
```

这是一直偷懒的CSS reset写法，我个人是不推荐这种写法的，一来带来比较多的资源开销，而且这些开销完全是没有必要的，有种为了几棵树砍掉整个森林的感觉，在所有的HTML标签中，默认有padding值的屈指可数，完全没有必要使用通配符进行重置；二来，对于有些元素，默认的`margin`属性是有用的，比方说表单元素中的单选框和复选框，其默认margin值可以和后面文字保持合理的间距，如果使用通配符重置，就会挤成一坨，阅读体验并不好。										

​											

####  2. 容器定高的问题

有人在实现的时候，容器写死了高度，实际开发的时候我们不能保证需求会不会变动，比方说增加一个条目的数据。如果我们的容器高度是定死的，那必然增加新条目的时候会出现布局上的bug，会降低容错性和可维护性，因此，避免定高。



#### 3.左右写法的时候

左侧固定宽度，宽度足够安全，右侧自动填满剩余空间。

我们可以放心大胆地把左侧dt标签占据空间设定为`5em`。一定要使用`em`单位，不要使用`px`或者`rem`，这样，无论容器的字号大小是多少，左侧宽度都不会空间不足，非常弹性，容错性很强。

所以，我们加个`5em`大小的左`margin`就可以了。

##### 	1. dt标签绝对定位

```
dt { position: absolute; }
dd {text-align: right; margin-left: 5em; }
```

效果如下截图：

![绝对定位布局效果截图](https://user-gold-cdn.xitu.io/2019/1/13/16847b1089564c44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

##### 	2. Flex布局实现

Flex布局也能实现我们想要的效果，代码如下：

```
dl {
    display: flex;
    flex-wrap: wrap;
}
dt {
    width: 5em;
}
dd {
    width: calc(100% - 5em);
    text-align: right;
}
```

效果如下截图：

![flex布局效果截图](https://user-gold-cdn.xitu.io/2019/1/13/16847b1089564c44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

Flex布局的优点是布局的呈现傻白甜，很好理解。不足就是会存在些许兼容性问题，在一些老旧的Android手机上。 

##### 	3. Grid布局实现

Grid布局实现是容错性最强，语义最佳的方法，其最大的优点是，左侧的标签描述文字，就是5个汉字，6个汉字，布局依然坚挺。

代码如下：

```
dl {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 1em;
}
dd {
    text-align: right;
}复制代码
```

效果如下截图：

![flex布局效果截图](https://user-gold-cdn.xitu.io/2019/1/13/16847b1089564c44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

关于Grid布局，如果不了解，可以参见我之前写的文章：“[写给自己看的display:grid布局教程](https://link.juejin.im?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2018%2F11%2Fdisplay-grid-css-css3%2F)”。

如果没有兼容性方面的限制，则是最佳实现。

(读者表示，这个慧新没用过啊，要学习学习了)

##### 	4. float浮动实现

有人就用了下面的方法实现，对说明对CSS基础知识还是比较了解的。

```
dt {
    width: 5em;
    float: left;    
}
dd {
    text-align: right;
    overflow: hidden;    
}复制代码
```

关键是这里的`overflow:hidden`，文字内容再多也不会浮动环绕，具体原理可以见这篇文章“[CSS深入理解流体特性和BFC特性下多栏自适应布局](https://link.juejin.im?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2015%2F02%2Fcss-deep-understand-flow-bfc-column-two-auto-layout%2F)”。

效果如下截图：

![flex布局效果截图](https://user-gold-cdn.xitu.io/2019/1/13/16847b1089564c44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

此方法兼容性很不错，直到IE7浏览器都支持，IE6不支持，如果要兼容IE6，可以试试加一句`_display:inline-block`。

##### 	 5. 借助原生流体特性实现

这个方法是我最后补充的没有人提到的方法，是最最简单的实现：

```
dd {
    margin: -1.5em 0 0 5em;
    text-align: right;    
}复制代码
```

就结束了。

宽度自适应，字号大小自适应，文字个数自适应。

效果如下截图：

![flex布局效果截图](https://user-gold-cdn.xitu.io/2019/1/13/16847b1089564c44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

此方法兼容性最强，上至IE6浏览器都支持，代码最少，各种优点也都有，也不需要掌握什么flex布局，grid布局，也不需要了解什么BFC之类概念，就一个简简单单的`margin`属性就搞定了，是实际项目开发中的最佳实现。

 

 

 

 

 

 

 

 

 

 

 

 

 

#### 4. 左右浮动的问题

还有的实现是直接左右浮动，没有定宽：

```css
dt{
    float: left;
    clear: left;
}
dd{
    float: right;
    clear: right;
}
```

clear 属性规定元素的哪一侧不允许其他浮动元素。

具体案例：http://www.w3school.com.cn/tiy/t.asp?f=csse_class-clear



#### 5. 有必要考虑极端内容

对于文本内容而言，所能出现的极端场景，包括下面三种：

1. 文字内容很多；

   

2. 连续的一串英文字符；

   首先是连续英文字符。这个简单，我们可以使用`word-break`属性：

   ```css
   word-break: break-all;
   ```

    

3. 没有文字内容。

其次是没有文字内容。这个问题实际上是开发的锅，在内容输出的时候，如果没有数据，应该范围“暂无”，或者“-”这样的缺省信息，但是，多年的经验告诉我，从内容输出和呈现上，一定不要相信后台开发人员，我们自己一定要留一手，否则出现了布局问题，报告单是提到前端这里的。

我们可以这么处理：

```
dd:empty::before {
  content '-';
  color: #999;
}复制代码
```

这样，即使dd标签里面没有输出任何文字，也会有字符占位，这样，布局就非常稳固。

 

 

 

 

本篇总结引用于张鑫旭的-------(https://juejin.im/post/5c3b4fe6e51d45783b4ae47f)

 

 