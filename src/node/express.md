# express 和服务端

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
// parse application/x-www-form-urlencoded(对应insomnia 中选择Form)
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json(对应insomnia 中选择Json)
app.use(bodyParser.json());
//静态资源服务中间件(内置中间件)
app.use(express.static('./public'));
//use可以直接写个中间件不用写路径 接收任何类型的请求和路径
//route中间件中间要写next
// app.use(() => {
//     console.log('0')
// })
app.use('/', router);
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

### 服务端渲染和客户端渲染

### 1.SSR

1. public/index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<link href="./styles/index.css" rel="stylesheet"/>
<script src="./app.js"></script>
<body>
    <div>home html file</div>
    <img src="./WechatLogo.jpeg">
    <a href="./api/lst">获取list</a>
</body>
</html>
```

2. controller/index.js

```js
const list = (req, res) => {
  let data = '<ul>';
  for (let i = 0; i < 10; i++) {
    data += `<li>line ${i}</li>`;
  }
  data += '</ul>';
  res.send(data);
};
exports.list = list;
```

http://localhost:8080/ 页面点击获取 list 链接

### 2.CSR

1. public/index.html

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<link href="./styles/index.css" rel="stylesheet"/>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./scripts/common.js"></script>
<body>
    <div>home html file</div>
    <img src="./WechatLogo.jpeg">
    <div id='list'></div>
</body>
</html>
```

2. controller/index.js

```js
const list = (req, res) => {
  let dataObj = {
    ret: true,
    data: [],
  };
  for (let i = 0; i < 10; i++) {
    dataObj.data.push(`line ${i}`);
  }
  res.send(dataObj);
};
exports.list = list;
```

3. /scripts/common.js

```js
$.ajax({
  url: 'api/list',
  success: result => {
    const { data } = result;
    let html = '<ul>';
    $.each(data, (el, index) => {
      html += `<li>${el}</li>`;
    });
    html += '</ul>';
    $('#list').html(html);
  },
});
```

### 3. 使用模板引擎

http://aui.github.io/art-template/express/
`yarn add art-template express-art-template -S`

1. server.js

```js
const express = require('express');
const app = express();
const path = require('path');
const router = require('./router/router');
const bodyParser = require('body-parser');
//中间件就是函数

//use的定义是有顺序
// parse application/x-www-form-urlencoded(对应insomnia 中选择Form)
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json(对应insomnia 中选择Json)
app.use(bodyParser.json());

//静态资源服务中间件(内置中间件)
app.use(express.static('./public'));
// view engine setup
app.engine('art', require('express-art-template'));
app.set('view options', {
  //注意此处和官网不一样
  debug: process.env.NODE_ENV !== 'production',
  escape: false, //是个坑 防止转译
});
app.set('views', path.join(__dirname, './view'));
app.set('view engine', 'art');
//use可以直接写个中间件不用写路径 接收任何类型的请求和路径
//route中间件中间要写next
// app.use(() => {
//     console.log('0')
// })
app.use('/', router);
app.listen(8080, () => {
  console.log('localhost:8080');
});
```

2. public/index.html

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<link href="./styles/index.css" rel="stylesheet"/>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./scripts/template-web.js"></script>
<script src="./scripts/common.js"></script>
<body>
    <div>home html file</div>
    <img src="./WechatLogo.jpeg">
    <div id='list'></div>
</body>
</html>
```

3. model/list.js

```js
let dataArray = [];
for (let i = 0; i < 10; i++) {
  dataArray.push(`line ${i}`);
}
module.exports = {
  dataArray,
};
```

4. router/router.js

```js
const express = require('express');
//路由中间件
const router = express.Router();
//抽取controller
const { list } = require('../controller/index');
router.get('/api/list', list);
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

5. view/list.art

```js
{
    "ret":true,
    "data":{{data}}
}
```

view/list-tml.art

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<ul>
{{each data}}
<li>{{$value}}</li>
{{/each}}
</ul>
</body>
</html>
```

6. controller/index.js

```js
var template = require('art-template');
const path = require('path');
const fs = require('fs');
const { dataArray } = require('../model/list');

const list = (req, res) => {
  let dataArray = [];
  for (let i = 0; i < 10; i++) {
    dataArray.push(`line ${i}`);
  }
  //清空缓存并硬性重新加载
  //1.后端使用模板生成输出json前端也使用模板渲染
  //res.set('Content-Type','application/json; charset=utf-8')
  //res.render('list', {data:JSON.stringify(listModel)})
  //2.后端渲染成html后输出
  // res.render('list-html', {
  //     data:listModel
  // })
  //3.后端生成静态文件 最快的
  //http://localhost:8080/api/list public 文件夹下生成list.html文件
  // 经典的CMS（企业级内容管理方案)网站发布原型--织梦CMS
  var html = template(path.resolve(__dirname, '../view/list-html.art'), {
    data: dataArray,
  });
  fs.writeFileSync(path.join(__dirname, '../public/list.html'), html);
  res.send('pages has been compiled');
};
exports.list = list;
```

`nodemon server.js`
