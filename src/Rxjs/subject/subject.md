### 多播 subject 及三种变体

``

<code src="../code/subject/subject.tsx"></code>

### behaviorSubject

`它有一个“当前值”的概念。它保存了发送给消费者的最新值。并且当有新的观察者订阅时，会立即从 BehaviorSubject 那接收到“当前值”`

<code src="../code/subject/BehaviorSubject.tsx"></code>

### replaySubject

`可以发送旧值给新的观察者， 还可以记录observable执行中的一步分`

<code src="../code/subject/ReplaySubject.tsx"></code>

### asyncSubject

`只有当observable 执行完成时，才会将最后一个值发送给观察者`

<code src="../code/subject/AsyncSubject.tsx"></code>
