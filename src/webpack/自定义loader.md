## 自定义 loader

视频链接: https://www.bilibili.com/video/BV1cv411C74F?p=2&spm_id_from=pageDriver  
p12-p16

### 自定义 loader

1. `mkdir loader`
2. `yarn add webpack webpack-cli --dev` 安装 webpack 包

3. 新建 src/index.js

```js
console.log('dddddddddd');
```

4. 新建 loaders/loader1.js

```js
//content 文件的内容
//map  文件的sourceMap的信息
//meta 文件的一些源信息
module.exports = function(content, map, meta) {
  console.log(content);
  return content;
};
```

5. webpack.config.json

```js
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /.\js$/,
        //loader:path.resolve(__dirname, 'loaders','loader')
        //配置laoder的解析规则后可简写如下
        loader: 'loader',
      },
    ],
  },
  //loader的解析规则
  resolveLoader: {
    modules: [
      'node_modules', //默认去node_modules中找
      path.resolve(__dirname, 'loaders'), //找不到会到loader目录下找
    ],
  },
  mode: 'development',
};
```

6. `yarn webpack`

7. 通过 use 配置多个 loader

```js
{
    test: /.\js$/,
    use: [
        'loader',
        'loader2',
        'loader3'
    ]
}
```

各个 loader.js 中的代码

```js
module.exports = function(content, map, meta) {
  console.log('111');
  return content;
};
module.exports.pitch = function(content, map, meta) {
  console.log('pitch 1');
};
```

8. yarn webpack 可以看到输出  
   pitch 1  
   pitch 2  
   pitch 3  
   333  
   222  
   111

### 同步 loader 和异步 loader

loader 有同步 loader 也有一部 loader, 目前我们写的都是同步 loader, 下面我们看一下同步 loader 的另一种写法

```js
module.exports = function(content, map, meta) {
  console.log('111');
  this.callback(null, content, map, meta); //第一个参数表示有没有错误， 没有错误就传个null
};
```

异步 loader 是我们比较推荐的写法
loader2.js 中

```js
//异步loader
module.exports = function(content, map, meta) {
  console.log('222222');
  const callback = this.async();
  //webpack 会等待callback执行然后进入下一个loader
  setTimeout(() => {
    callback(null, content);
  }, 2000);
};
```

`yarn webpack`
可以看到输出 222 2 秒后输出 111

### 在 loader 中获取的 options

1. `yarn add loader-utils --dev` 安装 loader-utils
2. webpack 配置 loader3 的 options

```js
{
    loader: 'loader3',
    options: {
        name:"loader3"
    }

}
```

3. loader3.js 中

```js
const { getOptions } = require('loader-utils');
module.exports = function(content, map, meta) {
  console.log('333');
  //接收this参数
  const options = getOptions(this);
  console.log(options);
  return content;
};
```

### 验证 loader options 配置是否符合规范

1. 新建 loaders/schema.json

```js
{
    "type": "object",
    "properties":{
       "name":{
        "type":"string",
        "description":"string"
       }
    },
    "additionalProperties":true
}
```

2.loader3.js

```js
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const schema = require('./schema.json');

module.exports = function(content, map, meta) {
  console.log('333');
  const options = getOptions(this);
  console.log(options);
  //校验options是否合法, 第三个参数是为了不合法时提示更友好
  validate(schema, options, {
    name: 'loader3',
  });
  return content;
};
```

### 自定义 babel loader

1. 新建 loaders/babelSchema.json

```js
{
    "type": "object",
    "properties":{
       "presets":{
        "type":"array"
       }
    },
    "additionalProperties":true
}
```

2. 新建 loaders/babelLoader.js

```js
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');

const schema = require('./babelSchema.json');
//babel.transform用来编译代码的异步方法
//util.promisify 将普通的异步方法转换为基于promise的异步方法
const transform = util.promisify(babel.transform);

module.exports = function(content, map, meta) {
  //获取options
  const options = getOptions(this) || {};
  //校验babel的options配置
  validate(schema, options, {
    name: 'Babel Loader',
  });
  // 创建异步
  const callback = this.async();
  //使用babel编译代码
  transform(content, options)
    .then(({ code, map }) => {
      callback(null, code, map, meta);
    })
    .catch(e => callback(e));
  return content;
};
```

3. webpack 配置 loader3 的 options

```js
 {
    test: /.\js$/,
    loader: 'babelLoader.js'
}
```

4. index.js 中加入一些 es6 代码

```js
class Person {
  constructor() {
    this.name = this.name;
  }
  setName(name) {
    this.name = name;
  }
}
console.log(new Person('jack'));
```

5. `yarn webpack`
