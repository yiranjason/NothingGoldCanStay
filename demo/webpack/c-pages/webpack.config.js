const webpack = require("webpack");
const path = require("path");

module.exports = {
  // 多页面应用
  entry: {
    pageA: "./src/pageA.js",
    pageB: "./src/pageB.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
          // enforce: true
        }
      }
    }
  }
};

// splitChunks: {
// chunks: “initial”, // 必须三选一： “initial” | “all”(默认就是all) | “async”
// minSize: 0, // 最小尺寸，默认0
// minChunks: 1, // 最小 chunk ，默认1
// maxAsyncRequests: 1, // 最大异步请求数， 默认1
// maxInitialRequests: 1, // 最大初始化请求书，默认1
// name: () => {}, // 名称，此选项可接收 function
// cacheGroups: { // 这里开始设置缓存的 chunks
// priority: “0”, // 缓存组优先级 false | object |
// vendor: { // key 为entry中定义的 入口名称
// chunks: “initial”, // 必须三选一： “initial” | “all” | “async”(默认就是异步)
// test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
// name: “vendor”, // 要缓存的 分隔出来的 chunk 名称
// minSize: 0,
// minChunks: 1,
// enforce: true,
// maxAsyncRequests: 1, // 最大异步请求数， 默认1
// maxInitialRequests: 1, // 最大初始化请求书，默认1
// reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
// }
// }
// }
// 大概写了下 如果有不对的可以提出或补充