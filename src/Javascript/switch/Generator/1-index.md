### generator 和异步请求结合

`看代码`

```js
function foo(x, y) {
  ajax(url, function(err, data) {
    if (err) {
      //项main抛出错误
      it.throw(err);
    } else {
      it.next(data);
    }
  });
}
function* main() {
  try {
    let data = yield foo(x, y);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
var it = main();
var result = it.next().value;
```

`同步错误处理`

```js
function* main() {
  var x = yield 'hello';
  yield x.toLowerCase(); //实际是运行到这引发的异常
  //永远不会运行到这里
  console.log(x);
}
var it = main();
it.next().value; //'hello'
try {
  it.next(42); // x=42 引发一个异常
} catch (err) {
  console.error(err); //Uncaught SyntaxError
}

function* main2() {
  var x = yield 'word';
  //永远不会运行到这里
  console.log('x');
}

var it = main2();
it.next();
try {
  it.throw('Opos'); //向生成器抛入一个错误
} catch (err) {
  //生成器中没有try...catch 所以会到这里
  console.error(err); // Opos
}
```
