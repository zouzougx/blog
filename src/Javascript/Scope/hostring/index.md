## 作用域提升

1. 函数的声明，var 声明的变量会被提升

```js
console.log(a); // undefined
var a = 2;
```

2. 函数优先原则

```js
var foo;

foo(); // 1

function foo() {
  console.log(1);
}
```
