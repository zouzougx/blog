---
order: 1
---
## This

当调用括号的左边不是引用类型而是其它类型，这个值自动设置为 null，结果为全局对象。

在一个函数上下文中，this 由调用者提供，由调用函数的方式来决定。如果调用括号 () 的左边是引用类型的值，this 将设为引用类型值的 base 对象（base object），在其他情况下（与引用类型不同的任何其它属性），这个值为 null。不过，实际不存在 this 的值为 null 的情况，因为当 this 的值为 null 的时候，其值会被隐式转换为全局对象。注：第 5 版的 ECMAScript 中，已经不强迫转换成全局变量了，而是赋值为 undefined。

```js
var fullname = 'John William'
var obj = {
    fullname: 'Collin Ihrig',
    prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function () {
            return this.fullname
        }
    }
}
console.log(obj.prop.getFullname())
var test = obj.prop.getFullname
test()
test.bind(obj.prop)()
"AU"
test.call(obj.prop)
"AU"
test.apply(obj.prop)
"AU"

// bind只是绑定this
// call or apply is bind this and then execute the function
```