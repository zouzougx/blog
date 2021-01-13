# 常用的几个 Hooks Api

`Hook 是什么`

Hook 是一个特殊函数， 让我们在不编写 class 的情况下可以使用 state 及其 react 的其他特性

即可以让我们在函数组件组件中钩入 react 特性

`动机`

1） 在不修改组件结构的情况下，复用状态逻辑

相互关联且需要对照修改的代码被进行了拆分,不相关的代码却放在同一个方法中，多数情况下, 不可能将组件拆分为更小的粒度， 因为状态逻辑无处不在

2 将 react 组件中相互关联的部分拆分为更小的部分

`useSate`

`useEffect`

##### 1） useEffect 做了什么

通过使用这个组件， 告诉 react 组件在渲染后执行某些操作，react 会保存你传递的函数，并在 DOM 更新后调用
useEffect 在每次渲染都会执行， 即在第一次访问和每次更新后都会执行， 保证每次运行 effect 时，DOM 都已经更新完毕

#### 2） 为什么在组件内调用 useEffect

在组件内调用 effect,可以让我们直接访问组件 state 变量或其他 props,

#### 3） 为什么要在 effect 返回一个函数

effect 的可选清除机制

#### 4） React 何时清除 effect

react 会在执行当前的 effect 之前对上一个 effect 进行清除， 会在组件卸载的时候执行清除操作

#### 5） 为什么每次更新的时候都要运行 effect

忘记正取的处理 componentDidMount 是 React 应用中常见的 bug 来源

```js
function FriendStatus(props) {
 // ...
 useEffect(() => {
   // ...
   ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
   return () => {
     ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
   };
 });
```

因为每次更新的时候都会运行 effect 所以不需要特定的代码来处理更新逻辑，在调用下一个 effect 之前对上一个 effect 进行清理，  
此默认行为保证了一致性，避免了像在 class 组件中因为没有处理更新逻辑而导致的常见 bug

`useMemo 和 useCallBack`
都是讲回调函数和依赖项作为参数
useMome: 用于缓存 return 回来计算的值  
函数式组件中任何一个 state 的改变都会导致整个组件的刷新， 一些函数没有必要重新渲染， 例如父组件中需要传给子组件的函数
useCallBack: 用于缓存函数,返回的回调函数是同一个引用地址

`Hook 的规则`

##### 1）只在最顶层使用 effect

不要在条件，循环， 嵌套函数中调用 Hook  
 目的： 确保 Hook 在每次渲染都能按照同样的顺序被调用,

##### 2）只在 React 函数中调用 Hook

1） 在 react 的函数组件中调用  
 2） 在自定义 Hook 中调用其他 Hook
