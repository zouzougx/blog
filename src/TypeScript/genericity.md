### 介绍

解决返回的类型和传入的参数应该是相同的

```js
function identity3<T>(args: T):T{
return args
}
const identity4=<T extends {}>(args:T):T=>{
     return args
}
```

### 使用

```js
// 传入所有的参数包括类型参数
let output = identity4 < string > 'str';
// 类型推断 编译器会根据传入的参数自动的帮助我们确定T的类型 保持代码精简和高可读性
output = identity3('string');
```

### 使用泛型变量

```js
const genericity =<T extends {}>(args: T[]): T[]=>{
  console.log(args.length)
  return args
}
const output2 = genericity<string>(['1','3'])
```

### 泛型类型

```js
const myGenericity: <T>(args: T) => T = identity4;
myGenericity('string');
```

### 泛型接口

```js
const myGenericity2: { T(args: T): T } = identity4;
interface genericityFn {
  <T>(args: T): T;
}
const myGenericity2: genericityFn = indentity4;
```

### 泛型参数当做接口的一个参数

```js
interface genericityFn<T> {
  <T>(args: T): T;
}
const myGenericity3: genericityFn<number> = indentity4;
```

### 泛型类

泛型类指的是实例部分 类的静态属性不能使用这个泛型类型

```js
class GenericNumber<T>{
    zeroValue: T
    add:(X: T, Y:T)=>T
}
const myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue= 0
myGenericNumber.add = (x,y)=>{
    return x + y
}
console.log(myGenericNumber.add(myGenericNumber.zeroValue, 8))
```

### 泛型约束

定义一个接口来描述约束条件

```js
const identity = <T extends {}>(args: T): T => {
  console.log(args.length); // Error: T doesn't have .length
  return args;
};
interface lengthWise {
  length: number
}
const identity = <T extends lengthWise>(args: T): T => {
  console.log(args.length); // Error: T doesn't have .length
  return args;
};
identity(3);  // Error, number doesn't have a .length property
//需要传入符合约束类型的值 必须包含必须的属性
identity({length: 10, value: 3});
```
