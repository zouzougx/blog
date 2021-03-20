# express

### 通过项目生成器构建

可以通过 express 提供的项目生成器构建项目 https://www.expressjs.com.cn/starter/generator.html

### 自己搭一个 MVP 模型

custom_express 文件夹

### 1. 自定义中间件

1. `brew install yarn`

2. `yarn init -y` 一路回车
3. `yarn add express -S`
4. `npm view express version`
5. server.js

```js
const express = require('express');
const app = express();
// 把自定义中间件抽取出来
const middleware = [
  (res, req, next) => {
    console.log(0);
    // req.send('hello')
    next();
  },
  (res, req, next) => {
    console.log(1);
    // req.send('hello')
    next();
  },
  (res, req, next) => {
    console.log(3);
    // req.send('hello')
    next();
  },
];
// 路径定义的路径解析是从上到下
//use的回调函数被称为中间件 所有回调函数构成中间栈
//在不调next的第一个，只匹配第一个 比如访问/api，app.use('/api'）的回调是不会执行的
// app.use('/',middleware)
app.use(
  '/',
  (res, req, next) => {
    console.log(0);
    // req.send('hello')
    next();
  },
  (res, req, next) => {
    console.log(1);
    // req.send('hello')
    next();
  },
  (res, req, next) => {
    console.log(3);
    // req.send('hello')
    next();
  },
);
app.use('/api', (res, req) => {
  console.log(1);
  //req.send('world')
});
app.listen(8080, () => {
  console.log('localhost:8080');
});
```

`nodemon server.js` 看 console.log

### 2. 路由中间件

MVC-->MVP(model 和 view 绝不通信)-->RMVP（带上一个请求）  
在 node 中  
R(对应一个路由)MVP（）
https://insomnia.rest/download 安装 insomnia

1. `yarn add body-parser -S`
2. sever.js

```js
const express = require('express');
const app = express();
const router = require('./router/router');
const bodyParser = require('body-parser');
//中间件就是函数

//use的定义是有顺序
app.use('/', router);
// parse application/x-www-form-urlencoded(对应insomnia 中选择Form)
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json(对应insomnia 中选择Json)
app.use(bodyParser.json());
//use可以直接写个中间件不用写路径 接收任何类型的请求和路径
//route中间件中间要写next
// app.use(() => {
//     console.log('0')
// })
app.listen(8080, () => {
  console.log('localhost:8080');
});
```

3. controller/index.js

```js
const list = (req, res) => {
  res.send('hello');
};
exports.list = list;
```

4. router/route.js

```js
const express = require('express');
//路由中间件
const router = express.Router();
//抽取controller
const { list } = require('../controller/index');
router.get('/', list);
//如果增删改都用post会导致后端没有确切语意
//使用不同的方法 后端可以只用一个路由做增删改
//不然前端要通过index/add index/update index/update 传给后端
//1.get 获取数据
//http://localhost:8080/ 页面输出hello
router.get('/', (req, res) => {
  res.send('hello');
});
router.get('/index', (req, res) => {
  //http://localhost:8080/index 页面输出index pages
  //res.send('index pages')
  const { query } = req;
  //http://localhost:8080/index?id=2 页面输出 {"id":"2"}
  res.send(res.json(query));
});
//2.post 添加数据
router.post('/index', (req, res) => {
  const data = req.body;
  res.send(data);
});
//3.put  修改数据-覆盖式修改
router.put('/index', (req, res) => {
  const data = req.body;
  console.log(data);
  res.send('put response');
});
//4.patch 修改数据-增量修改
router.patch('/index', (req, res) => {
  res.send('patch response');
});
//4.delete 修改数据
router.delete('/index', (req, res) => {
  res.send('delete response');
});
// /index不管是什么类型的请求都可以接收
router.all('/index', (req, res) => {
  //要通过req拿到参数判断是哪种类型的请求
  res.send('hello');
});
//console.log(router)
module.exports = router;
```

`nodemon server.js`
