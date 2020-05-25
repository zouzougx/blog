### this 标识符

this 并不指向这个函数本身 通常根据这个函数被如何调用来决定 this 指向哪个对象

```js
var foo(){
    console.log(this.bar)
}
var bar = 'global'
var obj1 = {
    bar: 'obj1'
    foo: foo
}
var obj2 = {
    bar: 'obj2'
}

foo() //global
obj1.foo() // obj1
foo.call(obj2) //obj2
new foo() //undefined 将this设置为-个全新的空对象

```
