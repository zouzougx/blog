### 生成器 + Promise

```js
//支持Promise的foo
function foo(url) {
  return request(url);
}
function* main() {
  try {
    var data = yield foo('url');
  } catch (err) {
    console.error(err);
  }
}
var it = main();
var p = it.next().value;
//等待promise决议
p.then(
  function fullField(text) {
    it.next(text);
  },
  function reject(err) {
    it.throw(err);
  },
);
```

`生成器中的并发`

```js
function* main() {
  var r1 = yield request('url1');
  var r2 = yield request('url2');
  var r3 = yield request('url3' + r1 + r2);
  console.log(r3);
}
run(main);

//出于性能考虑 让两个请求并发执行
function* main() {
  //让两个请求并行
  var p1 = request('url1');
  var p2 = request('url2');
  //等待两个Promise都决议
  var r1 = yield p1;
  var r2 = yield p2;
  var r3 = yield request('url3' + r1 + r2);
  console.log(r3);
}
run(main);
```
