#webpack

<!-- <code src="../webpack/code/index.tsx"></code> -->

### 介绍

webpack 是 js 应用程序打包工具， 如果要处理其他文件必须使用 loader 或 plugin, 两者的区别简单来说 loader 的功能比较少，plugin 能做的东西更多

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
const { resolve } = require('path');
module.exports = {
  //1. 入口文件
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

8. `npm run dev` 可以看到 dist 文件夹下生成 bundle.js, bundle.js 是没有被压缩过的文件，是个开发的文件

### 处理 html 文件

1. 输入!， tab 键生成 src/index.html
2. `yarn add html-webpack-plugin --dev` 安装 html-webpack-plugin
3. webpack.config.js 中配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
		//处理html文件
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html",
		}),
	],
```

4. `yarn dev` 生成 dist/index.html,并且文件中自动引入 bundle.js, 直接在浏览器中打开 index.html, 控制台将看到输出 'start learn webpack'  
   还没有 devsevice, --open 不能用 `"dev": "webpack --open",`

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
						"@babel/preset-env",
						"@babel/preset-typescript",
						"@babel/preset-react",
					],
				},
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

1. `yarn add webpack-dev-server --dev` 安装 webpack-dev-server
2. webpack.config.js 中配置

```js
target: "web", // 保存后刷新
//dev-server
devServer: {
   contentBase: resolve(__dirname, "dist"), //本地服务器所加载的页面路径
   port: 9000, // 默认是8080
   open: true, // 浏览器中打开
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
