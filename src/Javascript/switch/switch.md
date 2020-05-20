### switch

`switch中的case语句采用的严格相等判断， 需要通过强制类型转换进行宽松相等比较`

```js
switch (true) {
  case a == 42:
    console.log('42');
    break;
  default:
  //永远执行不到这里
}
// 42
```

`如果case表达式的结果不是严格意义上的真值true, 则条件不成立`

```js
var a = 'hello';
var b = 10;
switch(true){
  case (a || b == 10):
    //永远执行不到这里
    break:
        console.log( "Oops" );
}
//Oops
```

a || b == 10 的结果是 hello 不是 true，可以使用强制表达式返回 true 或 false

```js
case !!(a || b == 10):
```
