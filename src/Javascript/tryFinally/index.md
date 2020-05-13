### try..finally

try 中有 return 或 trow 语句的情况会先执行 Finally 后将返回值返回出去

```js
function foo() {
  try {
    return 'Hello';
  } finally {
    console.log('word');
  }
  //以下代码在return和throw的情况下都不会执行
  console.log('never runs');
}
console.log(foo());

// Hello
// 42
```

那如果 try 的代码如下思考输出什么

```js
try {
  throw 42;
}
```

`重中之重：`

如果 finally 中抛出异常（无论是有意还是无意，函数就会在此处终止。即使 try 中已经有 return 设置了返回值，返回值也会被抛弃 只会抛出异常

finally 中的 return 会覆盖 try 和 catch 中的 return 的返回值

```js
function foo() {
  try {
    return 'hello';
  } finally {
    return 'word';
  }
}

function baz() {
  try {
    return 'hello';
  } finally {
    return;
  }
}
foo(); // 'word'
baz(); // undefined
```

`在函数中省略return或return;以及return undefined; 函数返回值都是undefined`
