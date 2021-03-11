node.js 是基于谷歌 v8 引擎的 js 运行环境也叫宿主
`npx http-server`
可以解析 js 代码(没有浏览器安全级别的限制)
1）文件读写
2）进程管理
3）网络通信

### 三种模块

1. 内置模块:
   （fs,path, http）

```js
const path = require('path');
//__dirname代码运行的物理路径
console.log(path.resolve(__dirname, './'));
```

2. 第三方模块:
   https://www.npmjs.com/  
   name:zouagan  
   pwd:zouguangxia  
   3.自定义模块

1) 读写文件

```js
const fs = require('fs');
fs.writeFile('./log.txt', 'hello', (err, data) => {
  //nodejs中错误优先
  if (err) {
  } else {
    console.log('文件创建成功');
  }
});
```

2. 进程管理

   1. process.js 文件中`console.log(process.argv.slice(2));`
   2. `node process.js arg1 arg2`

3. 网络通信
   1)node 实现跨域请求

```js
http.get('http://www.bilibili.com/video/BV1ca4y1n7u3?p=1', res => {
  let str = '';
  res.on('data', chunk => {
    str += chunk;
  });
  res.on('end', () => {
    console.log(str);
  });
});
```

2)创建 server

```js
const http = require('http');
const server = http.createServer((request, response) => {
  let url = request.url;
  response.write(url);
  response.end();
});
server.listen('8090', 'localhost', () => {
  console.log('localhost:8090');
});
```

### 配置环境变量

ls -la 查看隐藏文件

cat .bash_profile
nvm alias default[版本号] == nvs link [版本号]
全局安装： 可以在任何目录可以读取运行 shell

`npm init -y`
`npm i gulp --dev`
`gulp -v` //失败 command not found: gulp

必须用下方写法

`./node_modules/.bin/gulp -v`

每次去找 node_modules 比较麻烦

```js
"scripts": {
    "dev":"./node_modules/.bin/gulp -v"
    //可以简写 在脚本中回到全局去找 找不到回到当前目录下找
    "dev": "gulp -v"
  },
```

`yarn dev` 打印 gulp 的 version

全局安装包的目录：
MAC: /Users/felix/.nvm/versions/node/nvm 各个版本/bin/  
Windows: C:/Users/用户名/AppData/Roaming/npm/node_modules  
`npm install underscore --save` = `npm install underscore -S`

### 把 gulp 包从生产移动开发分组

````js
"dependencies": {
    "gulp": "^4.0.2"
  }
``
`npm i gulp --dev --save`= `npm i gulp -D` 运行后
```js
"dependencies": {},
  "devDependencies": {
    "gulp": "^4.0.2"
  }
````

### 自己开发一个包并发布

1. `mkdir customPackage`
2. `npm init -y`
3. `npm install lodash -S`
4. 新建 index.js

```js
const _ = require('lodash');
function myChunk(arr) {
  let arr2 = _.chunk(arr, 2);
  return arr2;
}
module.export = myChunk;
```

5.`npm adduser`
如果有问题尝试切换 npm 源 npm config set registry https://registry.npmjs.org
`npm publish`

### npm 脚本

`greeting":"echo hello` 可以运行`npm run greeting`
`"runjs": "node ./scripts/script1.js & node ./scripts/script2.js"` 执行顺序不确定
`"runjs": "node ./scripts/script1.js && node ./scripts/script2.js"` 两个脚本一定会串行执行
`start,test key 可以简写的命令直接npm start, npm test`

### 在 node 脚本中访问 package.json 中的变量

`process.env.npm_package_config_env`
node>process]

### 在 package.json 中的 scripts 中访问 package.json 的配置信息

`"build":"echo $npm_package_config_env"` 然后`npm run build`

### gulp

`npx gulp --help`查看 gulp 命令
默认会访问 gulpfile 文件
可以通过

1. `npx gulp -f gulp.config.js` 更改 gulp 默认文件配置成 gulp.config.js

2. gulp.config.js 中

```js
const { src, dest, series } = require('gulp');
function scripts() {
  return src('./scripts/script.js', { sourcemaps: true }).pipe(
    dest('./scripts/dist'),
  );
}

var build = series(scripts); //串行命令执行
exports.default = build;
```

3. package.json 文件配置

```js
 "scripts": {
    "dev":"gulp -f gulp.config.js",
  },
```

4. yarn dev 会移动 script.js 到 script/dis/文件夹下

### 在 gulp 中访问 package.json 中的变量

1. package.json 中

```js
 "scripts": {
    "dev":"NODE_ENV=development gulp -f gulp.config.js",
    "prod":"NODE_ENV=production gulp -f gulp.config.js",
  },
```

2. gulp.config.js

```js
const node_env = process.env.NODE_ENV;
console.log(node_env);
```

注意：但是有的系统上 windows 上有问题， 所以要跨
`npm i cross-env -D`
在 package.json 中 scripts 脚本中加入 cross-env

```js
 "dev": "cross-env NODE_ENV=development gulp -f gulp.config.js",
 "prod": "cross-env NODE_ENV=production gulp -f gulp.config.js",
```

### npx

npm 从 5.2 版本增加了 npx,node 自带 npm 模块，如果不能用手动安装
`npm i -g npx`
npx 想要解决的问题是调用项目内部安装的模块，比如内部安装了 mocha
`npm install -D mocha`
如果调用只能再项目的脚本中和 package 中的 scripts,如果想要在命令行下调用

```
//项目的根目录下执行
node_modules ./bin/mocha/ --version
```

npx 就是解决这个问题 让项目内部安装的模块用起来更方便
`npx mocha --version`
npx 运行原理就是在运行的时候会到 node_modules/.bin 路径和环境变量\$Path 里面检车命令是否存在
`yarn global remove http_server`=`npm uninstall http_server -g`
`npx --no-install http_server` 全局没有本地没有也不安装
`npx --ignore-existing http_server` 不管本地有没有使用线上最新版本

### node 模块

```js
const name = {
  surName: '张',
  sayName() {
    console.log(this.surName);
  },
};
//module.exports = name
//导出一个对像
//exports.name = name
module.exports = { name };
```

### url 和 querystring

1. `npm install log4js -D`,`npm install log4js -D` 安装日志记录插件

```js
var log4js = require('log4js');
const url = require('url');
const querystring = require('querystring');
//url 模块 parse/format/resolve
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});
var logger = log4js.getLogger();
logger.level = 'debug';
const urlString = 'https://www.baidu.com/?id=1&tag=3';
logger.debug(url.parse(urlString));
const urlObj = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: null,
  search: '?id=1&tag=3',
  query: 'id=1&tag=3',
  pathname: '/',
  path: '/?id=1&tag=3',
  href: 'https://www.baidu.com/?id=1&tag=3',
};

logger.debug(url.format(urlObj));
//https://www.baidu.com/?id=1&tag=3
logger.debug(url.resolve('https://www.abc.com/a', '../'));
//https://www.abc.com/
logger.debug(url.resolve('https://www.abc.com/a', '/b'));
//https://www.abc.com/b
const urlPara = new URLSearchParams(url.parse(urlString).search);
logger.debug(urlPara.get('id'));
const query = 'id=2&name=tongyi&rom=北京';
const query2 = 'id:2/name:tongyi/from:北京';
const queryEscape = 'id%3D2%26name%3Dtongyi%25%26rom%3D%E5%8C%97%E4%BA%AC';
const queryObj = { id: '2', name: 'tongyi', from: '北京' };
logger.debug(querystring.parse(query));
//[Object: null prototype] { id: '2', name: 'tongyi', rom: '北京' }
logger.debug(querystring.escape(query));
//id%3D2%26name%3Dtongyi%25%26rom%3D%E5%8C%97%E4%BA%AC
logger.debug(querystring.unescape(queryEscape));
//id/2:name/tongyi:from/%E5%8C%97%E4%BA%AC
logger.debug(querystring.stringify(queryObj, ':', '/'));
//iid/2:name/tongyi:from/%E5%8C%97%E4%BA%AC
logger.debug(querystring.parse(query2, '/', ':'));
// [Object: null prototype] { id: '2', name: 'tongyi', from: '北京' }
//中文不转码
const newQuery = querystring.stringify(queryObj, null, null, {
  encodeURIComponent(string) {
    return querystring.unescape(string);
  },
});
logger.debug(newQuery);
//id=2&name=tongyi&from=北京
```

### node 的浏览器端调试

`node --inspect --inspect-brk server.js`

### node 的进程管理工具

--superviosr
-- nodemon
-- forever
-- pm2
`npm i nodemon -g`
`nodemon server.js`//改变 node 代码不需要重启

### http

serve.js 文件中

```js
const http = require('http');
const server = http.createServer((request, response) => {
  // 返回<div>hello</div>字符串
  // response.writeHead(200, {
  //     'content-type':'application/json' //默认是 text/html
  // })
  // response.write('<div>hello</div>')

  //会返回400 bad request
  // response.writeHead(400, {
  //     'content-type':'application/json' //默认是 text/html
  // })
  // response.write('<div>page not found</div>')
  //
  response.writeHead(200, {
    'content-type': 'application/json,charset:utf-8',
  });
  //response.write('{"x":8}')可以直接写在end方法中
  //如果没有repose.
  const url = request.url;
  response.end(`{"x":"${url}"}`);
});
server.listen(8080, () => {
  console.log('localhost:8080');
});
```

### 1. get 请求

前端访问不到，后端可以访问重新封装了一个接口，实现了跨域

```js
const http = require('http');
const https = require('https');
const server = http.createServer((request, response) => {
  https.get(
    'https://www.xiaomiyoupin.com/mtop/mf/resource/data/list',
    result => {
      let data = '';
      result.on('data', chunk => {
        data += chunk;
      });
      result.on('end', () => {
        response.writeHead(200, {
          'content-type': 'application/json,charset:utf-8',
        });
        response.write(data);
        response.end();
      });
    },
  );
});
server.listen(8080, () => {
  console.log('localhost:8080');
});
```

### post

Form Ulr Encoded  
content-type:'x-www-form-urlencoded'  
insomnia 跨平台的 REST API 客户端，组织运行调试 http 请求和 api  
下载链接：https://insomnia.rest/download

```js
const http = require('http');
const querystring = require('querystring');
const server = http.createServer((request, response) => {
  let data = '';
  request.on('data', chunk => {
    data += chunk;
  });
  request.on('end', () => {
    response.writeHead(200, {
      'content-type': 'application/json,charset:utf-8',
    });
    //把urlencoded字符串 变成json字符串
    response.write(JSON.stringify(querystring.parse(data)));
    response.end();
  });
});
server.listen(8080, () => {
  console.log('localhost:8080');
});
```

`nodemon server.js`  
在 insomnia 中发送  
post http://localhost:8080/api/list  
选择 Form URL Encoded 发送 post 请求会看到 response 就是请求的参数

### 服务器提交攻击

1. `mkdir node-express`
2. `npm install -g express-generator`
3. `npm install -g express`
4. `npm i`
5. `npm start`可以打开http://localhost:3000/
6. `npm install log4js -D`
7. 在 routes/index.js 中添加

```js
let log4js = require('log4js');
log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});
let logger = log4js.getLogger();
logger.level = 'debug';
router.post('/data', function(req, res, next) {
  logger.debug(req.body);
  res.send('ok');
});
```

8. scripts 中使用`"start": "nodemon ./bin/www"`
   在 insomnia 中发送  
   post http://localhost:3000/data  
   选择 Form URL Encoded 发送 post 请求会看到 chess.log 中有请求的参数
9. server.js 中

   ```js
   const http = require('http');
   const querystring = require('querystring');
   const postData = querystring.stringify({
     province: '上海',
     city: '上海',
     district: '闵行',
     message: '既选择远方 便只顾风雨兼程',
   });
   const options = {
     protocol: 'http:',
     hostname: 'localhost',
     port: '3000',
     method: 'post',
     path: '/data',
     headers: {
       'content-type': 'application/x-www-form-urlencoded',
       'Content-Length': Buffer.byteLength(postData),
     },
   };
   const server = http.createServer((req, res) => {
     const request = http.request(options, () => {});
     request.write(postData);
     request.end();
     res.end();
   });
   server.listen(8080, () => {
     console.log('localhost:8080');
   });
   ```

   在 insomnia 中发送  
   post http://localhost:8080/api/list  
   选择 Form URL Encoded 发送 post 请求,在 node-express 的 chess.log 中有 postData
