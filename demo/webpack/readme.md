# 2019.1.3

#### 一、Webpack4

学习路径：https://juejin.im/post/5c25b76ef265da614b120ed0

1.定义：打包工具。

2.功能：代码加密，多平台兼容。

3.打包：

- [x] 3-1.打包 JS
- [x] 3-2.编译ES6
- `babel-loader`: 负责es6语法转化
- `babel-preset-env`: 包含es6、7等版本的语法转化规则
- `babel-polyfill`: es6内置方法和函数转化垫片
- `babel-plugin-transform-runtime`: 避免polyfill污染全局变量
- [x] 3-3.多页面打包
- [x] 3-4.单页面应用
- [x] 3-5.css打包

1.`css`放在`style`标签里可以减少网络请求次数，提高响应时间。需要注意的是，*在老式 IE 浏览器中，对style标签的数量是有要求的*。

2.`style-loader`为 css 对象提供了`use()`和`unuse()`两种方法，借助这两种方法，可以方便快捷地加载和卸载 css 样式。

3.对于`css`的`transform`，简单来说：**在加载 css 样式前，可以更改 css**。这样，方便开发者根据业务需要，对 css 进行相关处理。