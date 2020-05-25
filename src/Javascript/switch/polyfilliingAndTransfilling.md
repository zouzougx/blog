### polyfilling 和 transpiling

`使用polyfilling和transpiling两种技术向旧版浏览器引入新版的JavaScript特性`

polyfilling 根据新特性的定义 创建一段与之等价但能够在旧的 JavaScript 环境中运行的代码

```js
if (!Number.isNaN) {
  Number.isNaN = function(v) {
    return x != x; //利用了NaN是整个语言中唯一一个和自身不相等的值
  };
}
```

transpiling 语言中的语法是无法进行 polyfilling 更好的方法是通过工具将新代码转化等价的旧代码

```js
function foo(a=2){
  console.log(a)
}
//等价的旧代码
function foo(){
  var a = arguments[0] !== void(0) ？arguments[0] ：2
  console.log(a)
}
```
