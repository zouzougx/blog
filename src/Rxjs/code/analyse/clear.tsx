import React, { useEffect } from 'react';
import { Observable, interval } from 'rxjs';

import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    // 基础实例
    const source = interval(1000);
    const subscription = source.subscribe(value => console.log(value));
    // 3秒后取消订阅
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);

    // 使用create方法创建 Observable 时
    // const source = Observable.create(function subscribe(observer) {
    //   // 追踪 interval 资源
    //   const intervalID = setInterval(() => {
    //     observer.next('hi');
    //     console.log('test')
    //   }, 1000);
    //   // 提供取消和清理 interval 资源的方法
    //   return function unsubscribe() {
    //     clearInterval(intervalID);
    //   };
    // });
    // const subscription = source.subscribe((value:string)=> console.log(value));
    // setTimeout(() => { subscription.unsubscribe() }, 3000)

    // 同时取消多个订阅
    // const observable1 = interval(1000);
    // const observable2 = interval(2000);
    // const subscription = observable1.subscribe(x => console.log('first: ' + x));
    // const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
    // subscription.add(childSubscription);
    // setTimeout(() => {
    //   // subscription 和 childSubscription 都会取消订阅
    //   subscription.unsubscribe();
    // }, 3000);
  }, []);

  return (
    <div>
      <Button id="myButton">每秒发送一个递增的数字， 3秒后取消执行 </Button>
    </div>
  );
};
export default Index;
