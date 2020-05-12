### compose

```javascript
function compose(middleware) {
  return function() {
    return dispatch(0);
    function dispatch(i) {
      const fn = middleware[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          console.log(fn);
          return dispatch(i + 1);
        })
      );
    }
  };
}

async function fn1(next) {
  console.log('fn1');
  await next();
  console.log('end 1');
}

async function fn2(next) {
  console.log('fn2');
  await next();
  console.log('end 2');
}

async function fn3() {
  console.log('fn3');
}

const middleware = [fn1, fn2, fn3];
const fnFinal = compose(middleware);
fnFinal();

/*
fn1
fn2
fn3
end 2
end 1
*/
```