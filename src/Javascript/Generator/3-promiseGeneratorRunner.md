### 支持 promise 的 Generator Runner

```js
function add(x, y) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(x + y);
    }, 1000);
  });
}
function sub(x, y) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(x - y);
    }, 2000);
  });
}
function mul(x, y) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(x * y);
    }, 2000);
  });
}
function run(gen) {
  //arguments是类数组 如果要使用数组的方法 则需使用下面的语法
  var args = [].slice.call(arguments, 1),
    it;
  //初始化生成器
  it = gen.apply(this.args);
  //这里为什么要用Promise呢  用于生成器完成
  return Promise.resolve().then(function handleNext(value) {
    var next = it.next(value);
    return (function handlerResult(next) {
      console.log(next);
      //生成器运行完毕了吗
      if (next.done) {
        return next.value;
      }
      //否则继续运行
      else {
        return Promise.resolve(next.value).then(
          //异步成功则递归调用
          // function handleFullFilled(value){
          //     handleNext(value)
          // },
          handleNext,
          //如果是被拒绝的promise
          //把错误传回生成器 进行错误处理
          function handleErr(err) {
            return Promise.resolve(it.throw(err)).then(handlerResult);
          },
        );
      }
    })(next);
  });
}
function* main() {
  try {
    var r1 = yield add(20, 10);
    console.log('r1:' + r1);
    var r2 = yield sub(20, 10);
    console.log('r2:' + r2);
    var r3 = yield mul(20, 10);
    console.log('r3:' + r3);
  } catch (err) {
    console.log(err);
  }
}
run(main);
```
