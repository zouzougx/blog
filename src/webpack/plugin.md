### plugin

常用的插件：

1. webpack.DefinePlugin--打包阶段定义全局变量
   webpack --env 只能在 webpack 配置文件中使用, 不能给到业务代码
2. webpack.HashedModulesPlugin--保持 module.id 的稳定
   chunkHash 能保正的是改动业务代码第三方包的 hash 不会改动，当模块改了引入的包的数量,模块的 chunkhash 还是会变
3. webpack.NoEmitOnErrorPlugin -屏蔽错误
   webpack 打包遇到错误会终端编译
4. webpack.providerPlugin--提供全局的 plugin
5. copy-webpack-plugin --帮助拷贝内容
   webpack 只会把它处理的资源放到 dist 中
   视频链接: https://www.bilibili.com/video/BV1cv411C74F?p=2&spm_id_from=pageDriver  
   P17-P23

complier 和 compilation
compiler 是 webpack 的主要引擎， 拓展自 tapable 类

```js
const {
  SyncHook, //普通的同步钩子不管有没有出错都往下走
  SyncBailHook, // 如果钩子有返回值退出，则不继续执行后面的钩子， 没有返回值继续执行, 通过有没有返回值来判断当前钩子有没有出错
  SyncWaterfallHook, //瀑布流: 在这个钩子中我可以注册n多钩子，上一个钩子的返回值会给下一个钩子
  SyncLoopHook,
  AsyncParallelHook, //并行执行: 意味着异步代码可以同时工作执行
  AsyncParallelBailHook, // 最终的钩子函数有返回值也会终止
  AsyncSeriesHook, // 所有的异步代码串行执行，一个执行完执行另一个
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require('tapable');
```

### tapable

1.`mkdir plugin`

2. 新建 tapable.test.js

```js
const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require('tapable');
class Lesson {
  constructor() {
    //初始化hook容器
    this.hooks = {
      //同步hook, 任务依次执行
      //go:new SyncHook(['address'])
      go: new SyncBailHook(['address']),
      //异步hook
      //AsyncParallelHook: 异步并行
      //
      //leave: new AsyncParallelHook(['name', 'age'])
      //AsyncSeriesHook: 串行执行
      leave: new AsyncParallelHook(['name', 'age']),
    };
  }
  tap() {
    //往hooks容器中注册事件/添加回调函数,将来钩子被触发相应的回调函数就会
    //class0318 和 class0410 顺序执行
    //call方法触发hook, 会将hook容器中的所有钩子全都触发
    this.hooks.go.tap('class0318', address => {
      console.log('class0318', address);
      return 111;
    });
    this.hooks.go.tap('class0410', address => {
      console.log('class0410', address);
    });
    //异步钩子用tab绑定也可以 意义不大
    // this.hooks.leave.tap('class0510', (name,age) => {
    //     console.log("class0510", name,age)
    // })
    // 定义异步钩子的两种方式tapAsync和tapPromise
    //如果是并行执行 所以一秒后执行class0610, 2秒后执行class0510
    //如果是串行执行 2秒后执行class0510 然后再一秒后执行class0610
    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0510', name, age);
        //异步代码执行完了 接着往下走
        cb();
      }, 2000);
    });
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('class0510', name, age);
          //异步代码执行完了 接着往下走
          resolve();
        }, 1000);
      });
    });
  }
  start() {
    //触发
    this.hooks.go.call('c318');
    //this.hooks.leave.call('zou',18)
    this.hooks.leave.callAsync('zou', 18, () => {
      //所有leave 容器中的钩子都触发完了再触发
      console.log('end~~~');
    });
  }
}
const l = new Lesson();
l.tap();
l.start();
```

3. `yarn add tapable --dev`
4. `node tapable.test.js`

### 手动实现一个插件

### compiler

1. `yarn add webpack webpack-cli --dev`
2. `yarn add tapable --dev`
3. 新建 plugins/Plugin1

```js
// 在webpack 生命周期中做一些事 会保证前面的生命周期执行完，再执行后面的
class Plugin1 {
  apply(compiler) {
    compiler.hooks.emit.tap('Plugin1', compilation => {
      console.log('emit.tap 111');
    });
    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit.tap 111');
        cb();
      }, 2000);
    });
    compiler.hooks.emit.tapPromise('Plugin1', (compilation, resolve) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('emit.tap 111');
          resolve();
        }, 2000);
      });
    });
    compiler.hooks.afterEmit.tap('Plugin1', compilation => {
      console.log('afterEmit.tap 111');
    });
    compiler.hooks.done.tap('Plugin1', compilation => {
      console.log('done.tap 111');
    });
  }
}
module.exports = Plugin1;
```

4. webpack.config.js 中

```js
const Plugin1 = require('./plugins/Plugin1');
module.exports = {
  plugins: [new Plugin1()],
};
```

5. `yarn webpack` 会看到输出

### compilation

. 新建 plugins/Plugin1

```js
class Plugin2 {
  apply(compiler) {
    //thisCompilation 初始化compilation
    compiler.hooks.thisCompilation.tap('Plugin2', compilation => {
      debugger;
      console.log(compilation);
    });
  }
}
module.exports = Plugin2;
```

3. `为了方便清晰的看到compilation对象`  
   node 以调试模式运行 webpack.js,并在首行停住  
   `"start": "node --inspect-brk ./node_modules/webpack/bin/webpack.js"`
   `npm start`
   打开浏览器 F12， 点击 node 的绿色图标  
   添加 Watch

### 往要输出的资源中添加一个 txt 文件

1. 新建 plugins/b.txt,c.txt

2. Plugin2.js

```js
const fs = require('fs');
const util = require('util');
const path = require('path');
const webpack = require('webpack');
const { RawSource } = webpack.sources;
//将fs异步方法变成基于promise风格的异步代码
const readFile = util.promisify(fs.readFile);

class Plugin2 {
  apply(compiler) {
    //thisCompilation 初始化compilation
    compiler.hooks.thisCompilation.tap('Plugin2', compilation => {
      // debugger
      // console.log(compilation)
      //添加资源文件
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async cb => {
        // debugger
        // console.log(compilation)
        const content = 'hello plugin2';
        //往要输出的资源中添加一个a.txt文件
        compilation.assets['a.txt'] = {
          //文件大小
          size() {
            return content.length;
          },
          //文件内容
          source() {
            return content;
          },
        };
        //往要输出的资源中添加一个b.txt文件
        const bData = await readFile(path.resolve(__dirname, 'b.txt'));
        compilation.assets['b.txt'] = new RawSource(bData);
        //往要输出的资源中添加一个c.txt文件
        const cData = await readFile(path.resolve(__dirname, 'c.txt'));
        debugger;
        compilation.emitAsset('c.txt', new RawSource(cData));
        cb();
      });
    });
  }
}
module.exports = Plugin2;
```

3. webpack.config.js

```js
const Plugin2 = require('./plugins/Plugin2');
module.exports = {
  plugins: [new Plugin2()],
};
```

4. `yarn webpack`

### 实现一个 CopyPlugin

打包时将一个文件夹下的文件拷贝到输出目录

1. 新建 public/index.html, public/reset.css
2. `yarn add globby schema-utils --dev`
3. webpack.config.js

```js
const CopyWebPackPlugin = require('./plugins/CopyWebPackPlugin');
module.exports = {
  plugins: [
    new CopyWebPackPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html'], //任意目录下的index.html都会被忽略
    }),
  ],
};
```

4. 新建 plugins/copyPluginSchema.json 文件

```js
 {
    "type": "object",
    "properties":{
       "from":{
        "type":"string"
       },
       "to":{
        "type":"string"
       },
       "ignore":{
        "type":"array"
       }
    },
    "additionalProperties":false
}
```

5. 新建 plugins/CopyWebPackPlugin.js 文件

```js
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const webpack = require('webpack');
const { RawSource } = webpack.sources;
//globby 匹配文件列表 并且根据自己的规则忽略一些文件
const globby = require('globby');
const { validate } = require('schema-utils');
const schema = require('./copyPluginSchema.json');
const { Compilation } = require('webpack');
const readFile = promisify(fs.readFile);

class CopyWebPackPlugin {
  constructor(options = {}) {
    //验证option 是否符合规范
    validate(schema, options, {
      name: 'CopyWebPackPlugin',
    });
    this.options = options;
  }
  //插件内部会调用apply方法
  apply(compiler) {
    //初始化compilation
    compiler.hooks.thisCompilation.tap('CopyWebPackPlugin', compilation => {
      //添加资源的hook
      compilation.hooks.additionalAssets.tapAsync(
        'CopyWebPackPlugin',
        async cb => {
          //将from中的资源复制到to中去，输出出去
          const { from, to = '.', ignore } = this.options;
          //context就是webpack配置
          const context = compiler.options.context; // process.cwd 运行指令的目录
          //将输入路径变成绝对路径
          const absoluteFrom = path.isAbsolute(from)
            ? from
            : path.resolve(context, from);
          //1. 过滤掉ignore的文件
          //globby(要处理的文件夹, options)
          const paths = await globby(absoluteFrom, { ignore });
          //2. 读取paths中的资源
          //map 方法遇到async 函数并不会等
          // paths.map( async (path) => {
          //     const bData = await readFile(path)
          // })
          //改写成 Promise.allasync函数的返回值一定是个promise 对象
          const files = await Promise.all(
            paths.map(async absolutePath => {
              //读取文件
              const data = await readFile(absolutePath);
              //basename得到最后的文件名称
              const relativePath = path.basename(absolutePath);
              //和to属性组合一下
              //没有to --> reset.css,
              //有to(to的值是aa)--> aa/reset.css
              //to是“.”啥也不会做
              const filename = path.join(to, relativePath);
              return {
                //文件数据
                data,
                //文件名称
                filename,
              };
            }),
          );
          //3. 生成webpack 格式的文件
          const assets = files.map(file => {
            const source = new RawSource(file.data);
            return {
              source,
              filename: file.filename,
            };
          });
          //4. 添加到compilation
          assets.forEach(asset => {
            compilation.emitAsset(asset.filename, asset.source);
          });
          cb();
        },
      );
    });
  }
}
module.exports = CopyWebPackPlugin;
```

6. `yarn webpack`
