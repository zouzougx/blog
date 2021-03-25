#webpack

<!-- <code src="../webpack/code/index.tsx"></code> -->

### 介绍

webpack 是 js 应用程序打包工具， 如果要处理其他文件必须使用 loader 或 plugin, 两者的区别简单来说 loader 的功能比较少（将文件转化成 webpack 能够识别的），plugin 能做的东西更多(打包优化,压缩, 定义环境变量)  
官方文档: https://www.webpackjs.com/concepts/#入口-entry-

### 初始化

1. `mkdir webpack_demo` 新建一个 webpack_demo 文件夹

2. `npm init -y` 初始化, ls 命令 查看会生成一个 package.json

3. `yarn add webpack@4.45.0 webpack-cli --dev`  
   遇到的问题: Cannot read property 'tap' of undefined 错误  
   解决方法: webpack 版本不兼容， 可尝试安装最新版  
    `yarn add webpack webpack-cli --dev`
4. package.json 中加上 `"dev": "webpack`",

```js
 "scripts": {
    "dev": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

5. 新建 src/index.js

```js
function add(a, b) {
  return a + b;
}
console.log('start learn webpack');
```

6. `npm run dev` 可以看到 dist 文件夹下生成 main.js,main.js 是个生产的文件

7. 新建 webpack.config.js 文件, 添加基本配置

```js
const { resolve } = require('path'); //path 将所有路径转化为绝对路径

module.exports = {
  //1. 工程资源的入口，单个入口文件的简写如下
  entry: './src/index.js',
  // 2. 输出文件
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'), // __dirname  当前文件夹的绝对路径
  },
  // loader ...
  module: {},
  // 插件
  plugins: [],
  //开发模式
  mode: 'development',
};
```

4. `npm run dev` 可以看到 dist 文件夹下生成 bundle.js, bundle.js 是没有被压缩过的文件，是个开发的文件

### 1. 入口起点 entry

1. 默认入口是 src/index.js
2. entry 属性的单个入口语法，是下面的简写

```js
entry: {
  main: './path/to/my/entry/file.js';
}
```

2. 对象语法

```js
entry: {
		main: "./src/index.tsx",
		anotherEntry: "./src/anotherEntry.tsx",
	},
```

### 2. 输出 output

1.  最低要求是包含输出文件的文件名(filename) 和 目标输出目录(path)的对象
2.  如果有多个入口起点的话要使用占位符来确保每个文件具有唯一的名称

```js
output: {
		////输出文件的文件名
		filename: "[name].js", // 使用占位符确保每个文件具有唯一的名称
		//目标输出路径
		path: __dirname + "/dist", // __dirname是当前文件夹的绝对路径
	},
```

### 3. 模式 mode

告知 webpack 使用相应的内置优化

```js
//webpack使用相应的内置优化模式
mode: "development",
```

1.`development` 会将 process.env.NODE_ENV 的值设置为 development  
2.`production` 会将 process.env.NODE_ENV 的值设置为 production

### 4. loader

将所有类型的文件转换为 webpack 可以处理的有效模块

1. 三种配置 loader 的方式

   1）配置- module.rules 允许你在 webpack 配置中指定多个 loader
   最好的方式:可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题。

   2）内联

   ```js
   import styles from `style-loader!css-loader?modules!./styles.css`

   ```

   3.CLI

   ```js
   webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
   ```

2. loader
   1）一组链式的 loader 将按照相反的顺序执行, 最后一个 loader 返回 webpack 所预期的 js
   2)loader 可以使用 options 对象进行配置。

### 处理 html 文件

1. 输入!， tab 键生成 src/index.html
2. `yarn add html-webpack-plugin --dev` 安装 html-webpack-plugin
3. webpack.config.js 中配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
		//处理html文件
		new HtmlWebpackPlugin({
			filename: "index.html", //在目标文件下的文件名
			template: "src/index.html", //被处理文件的路径
		}),
	],
```

4. `yarn dev` 生成 dist/index.html,并且文件中自动引入 bundle.js, 直接在浏览器中打开 index.html, 控制台将看到输出 'start learn webpack'  
   还没有 devsevice, --open 不能用 `"dev": "webpack --open",`

### 5. 插件 plugins

目的:在于解决 loader 无法解决的其他事
用法：在 webpack.config.js 配置中,向 plugins 属性传入插件实例数组

### 6. manifest

webpack 构建的典型应用程序或站点中，三种主要类型的代码：  
1）你和团队编写的源码  
2）源码依赖的任何第三方 library 和 “vendor” 代码  
3）webpack 的 runtime 和 manifest, 管理所有模块交互

manifest - 用来连接模块化应用程序的所有代码  
import 和 required 语句会被转换为\_webpack_required 方法，此方法指向模块标识符  
当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"  
`manifest 数据的用途`: ?

runtime - 在模块交互时,连接模块所需的加载和解析逻辑
通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。

### 处理 js,jsx,ts, tsx

处理 ts 有 ts-loader, 我们不建议用， 建议用 babel-loader  
原因: ts-loader 官方也要换成 babel-loader 了， 效率有问题， 快接近生命周期的尾声

1. `yarn add babel-loader --dev` 安装 babel-loader
2. `yarn add @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react --dev` 安装一些需要的预制套件

遇到的问题: 一直装不上这几个插件  
解决方法: 重启了 mac 电脑 ,network 才可以安装

3. webpack.config.js 中配置

```js
module: {
		rules: [
			// 处理js,jsx,ts, tsx
			{
				test: /\.js?$|\.jsx?$|\.ts?$|\.tsx?$/, // 这个loader处理的文件类型
				exclude: /node_modules/, // 匹配的时候不包括node_modules
				loader: "babel-loader",
				options: {
					// 配置预制套件
					presets: [
						"@babel/preset-env",////转化es6的规则
						"@babel/preset-typescript",// 转化ts的规则
						"@babel/preset-react",////转化jsx的规则
					],
				},
        cacheDirectory: true, // 缓存编译后的代码
			},
		],
	},
```

package.json 中配置

```js
"browserslist": {
    "production": [
      ">5%"
    ],
    "modern": [
      "last  1 chrome version",
      "lat 1 firefox version"
    ]
  },
```

4. index.js 直接命名为 index.ts， entry 改为`entry: "./src/index.tsx",`
5. `yarn dev`

### 处理 react

1. index.ts 改为 index.tsx,

```js
import { React } from 'react';
import { render } from 'react-dom';
const App = () => {
  return <div>1111111111</div>;
};
render(App, document.getElementById('root'));
```

入口 html 中加入 id 是"root"的 div

```js
<div id="root"></div>
```

2. `yarn add @types/react @types/react-dom --dev` 安装 types, 解决导入 react, react-dom 报错问题
3. `yarn add react react-dom` 安装 react, react-dom
4. `yarn dev`

### 处理样式文件

css loader 只解决了 css 语法解析的问题，style-loader 解决了样式加载的问题，为我们的样式生成一个 style 标签并插入到页面中 loader 的配置顺序和加载顺序是相反
`1. 处理 style .css 文件`

1. 新建一个 src/index.css

```js
body {
	background-color: red;
}
```

index.tsx 中导入 index.css 并加入内部样式

```js
import './index.css';
return <span style={{ fontSize: '50px' }}>use css file </span>;
```

2. `yarn add style-loader css-loader --dev` 安装 style-loader 和 css-loader,
3. webpack.config.js rules 中配置

```js
//处理css
{
   test: /\.css?$/,
   use: ["style-loader", "css-loader"],
},
```

4. `yarn dev`  
   遇到的问题: 报错：configuration.module.rules[1].loader should be a non-empty string.  
   解决方法: loader 改为 use,

`2.处理.less文件(如果less文件中没有less语法， 只用style和css loader就可以解析了)`

1. 新建一个 src/index.less

```js
body {
	p {
		background-color: blue;
	}
}
.title {
	background: yellow;
}
```

index.tsx 中导入 index.less 并加入内部样式

```js
import './index.less';
return (
  <>
    <span style={{ fontSize: '50px' }}>use css file </span>
    <p>use less file</p>
  </>
);
```

2. `yarn add less-loader less --dev` 安装 less-loader

3. webpack.config.js rules 中配置

```js
// 处理less文件
{
   test: /\.less?$/,
   use: ["style-loader", "css-loader", "less-loader"],
}
```

4. `yarn dev`

为了在 index.tsx 中使用 less module 语法

```js
import style from './index.less';
return (
  <>
    <span style={{ fontSize: '50px' }}>use css file </span>
    <p>use less file</p>
    <div className={style.title}>use class in less file</div>
  </>
);
```

步骤 3 中的配置使用如下配置即可

```js
{
   test: /\.less?$/,
   use: [
      "style-loader",
      {
         loader: "css-loader",
         options: {
            importLoaders: 1,
            modules: {
               localIdentName: "[local]--[hash:base64:5]",
            },
         },
      },
      "less-loader",
   ],
}
```

5. `yarn dev`

### 处理图片

1. 新建一个 src/assets 文件夹添加一个 logo.png 图片  
   index.tsx 中

```js
import logo from './assets/WeChatLogo.jpeg';
return (
  <>
    <span style={{ fontSize: '50px' }}>use css file </span>
    <p>use less file</p>
    <div className={style.title}>use class in less file</div>
    <img src={logo} />
  </>
);
```

2.`yarn add file-loader --dev` 安装 file-loader

3. webpack.config.js rules 中配置

```js
//处理图片
{
   test: /\.(png|jpg|gif|jpeg|woff|woff2|svg)$/,
   loader: "file-loader",
},
```

4. `yarn dev`

### 自动刷新

 webpack-dev-server 可以帮我们启一个本地服务，监听工程目录文件的改动，修改源文件再次保存时,动态实时的重新打包并自动刷新浏览器

1. `yarn add webpack-dev-server --dev` 安装 webpack-dev-server
2. webpack.config.js 中配置

```js
target: "web", // 保存后刷新
//dev-server
devServer: {
   contentBase: resolve(__dirname, "dist"), //本地服务器所加载的页面路径
   port: 9000, // 默认是8080
   open: true, // 浏览器中打开
   publicPath: './dist' // 打包之后的资源路径
},
```

3. `yarn dev`

### 相对引用的路径@和导入的时候去掉文件后缀名

1. webpack.config.js 中配置

```js
resolve: {
		//导入的时候允许不加文件后缀名
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		//使用相对引用路径@
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
```

2. 新建 src/components/add.tsx

```js
import React from 'react';
export default () => <div>add 组件</div>;
```

index.tsx 中

```js
import logo from '@/assets/WeChatLogo.jpeg';
import Add from '@/components/add';
return (
  <>
    <span style={{ fontSize: '50px' }}>use css file </span>
    <p>use less file</p>
    <div className={style.title}>use class in less file</div>
    <img src={logo} />
    <Add />
  </>
);
```

3.`yarn dev`

### 添加 typings.d.ts 和 tsconfig.json 文件 是两个固定配置的文件

解决`import style from "./index.less"; import logo from "@/assets/WeChatLogo.jpeg"` 有错误提示的问题
1.typings.d.ts

```js
declare module "slash2";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "mockjs";
declare module "*.svg" {
	export function ReactComponent(
		props: React.SVGProps<SVGSVGElement>
	): React.ReactElement;
	const url: string;
	export default url;
}
declare module "omit.js";
declare module "uuid";

// google analytics interface
interface GAFieldsObject {
	eventCategory: string;
	eventAction: string;
	eventLabel?: string;
	eventValue?: number;
	nonInteraction?: boolean;
}
interface Window {
	ga: (
		command: "send",
		hitType: "event" | "pageview",
		fieldsObject: GAFieldsObject | string
	) => void;
	reloadAuthorized: () => void;
	loadBerlinPageCallback: () => void;
}

declare let ga: Function;

declare const REACT_APP_ENV: "dev" | "dev2" | "dev3" | false;

```

2.tsconfig.json

```js
{
    "compilerOptions": {
        "outDir": "build/dist",
        "module": "esnext",
        "target": "esnext",
        "lib": [
            "esnext",
            "dom"
        ],
        "sourceMap": true,
        "baseUrl": ".",
        "jsx": "react",
        "allowSyntheticDefaultImports": true,
        "moduleResolution": "node",
        "forceConsistentCasingInFileNames": true,
        "noImplicitReturns": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true,
        "allowJs": true,
        "skipLibCheck": true,
        "experimentalDecorators": true,
        "strict": true,
        "paths": {
            "@/*": [
                "./src/*"
            ],
            "@@/*": [
                "./src/.umi/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "build",
        "dist",
        "scripts",
        "src/.umi/*",
        "webpack",
        "jest"
    ]
}
```
