import React, { useEffect } from 'react';
import {
  fromEvent,
  of,
  from,
  Observable,
  Observer,
  asyncScheduler,
} from 'rxjs';
import { Button, Input } from 'antd';
import { every } from 'rxjs/operators';
// import async from 'rxjs/scheduler/async';
import 'rxjs/add/operator/observeOn';
import styles from './styles.less';

const Index: React.FC = props => {
  // fromEvent
  useEffect(() => {
    fromEvent(document, 'click').subscribe(() => {
      console.log('click event');
    });
    fromEvent(document, 'click')
      .pipe()
      .subscribe(() => {});
  }, []);
  // every---返回的observable发出是否源Observable的每项都符合条件

  const everyFun = () => {
    //1. 源Observable有些值不符合条件
    of(1, 2, 3, 4, 5, 6)
      .pipe(every(x => x < 5))
      .subscribe(x => console.log(x));
    //2. 源Observable 都符合条件
    const source = of(2, 4, 6, 8, 10);
    const checkEvery = source.pipe(every(x => x % 2 === 0));
    const subscription = checkEvery.subscribe(s => {
      console.log(s);
    });
    subscription.unsubscribe();
  };
  // 清理 Observable 执行,
  const subscriptionFun = () => {
    // 1. Subscription 可清理资源的对象， 通常是Observable的执行， 有一个unsubscribe方法用来释放或取消Observable的执行
    const source = from([1, 2, 3, 4, 5]);
    const subscription = source.subscribe(s => console.log(s));
    // 稍后：
    subscription.unsubscribe();
    // 2.
    // 当我们使用create 创建observable时，Observable 必须定义如何清理执行的资源，
    // 可以在function subscribe()中返回一个自定义的unsubscribe函数
    const source2 = Observable.create(function subscribe(observer: any) {
      const interval = setInterval(() => {
        observer.next('hi');
      }, 1000);
      return function unsubscribe() {
        clearInterval(interval);
      };
    });
    const subscription2 = source2.subscribe({
      next: (x: string) => console.log(x),
    });
    setTimeout(() => {
      subscription2.unsubscribe();
    }, 3000);
  };
  // try catch 捕获错误后发送错误通知
  const catchErrorFun = () => {
    const source = Observable.create((observer: Observer<string | number>) => {
      try {
        observer.next('try');
        // 'ddd'.map((x) => console.log(x));
        observer.complete();
        observer.next(22); // 因为违反规约，所以不会发送
        // throw '抛出异常';
      } catch (err) {
        observer.error(err);
      }
    });
    source.subscribe((s: string) => console.log(s));
  };
  // Scheduler
  const SchedulerFun = () => {
    const schedulerSource = Observable.create((observer: any) => {
      observer.next('1');
      observer.next('2');
      observer.next('3');
      observer.complete();
    }).observeOn(asyncScheduler);
    console.log('before  subscribe');
    schedulerSource.subscribe((val: string) => console.log(val));
    console.log('after  subscribe');
    // observeOn 函数在create和最终的观察着之前引入了一个代理观察者
    const schedulerSource1 = Observable.create(function subscribe(
      proxyObserver: any,
    ) {
      proxyObserver.next('1');
      proxyObserver.next('2');
      proxyObserver.next('3');
    }).observeOn(asyncScheduler);
    const finalObserver = {
      next: (x: any) => console.log(x),
      error: (err: any) => console.error(err),
      complete: () => console.log('done'),
    };
    console.log('just before subscribe');
    schedulerSource1.subscribe(finalObserver);
    console.log('just after subscribe');
    // 代理观察者的代码类似
    const proxyObserver = {
      next: (val: any) => {
        asyncScheduler.schedule(
          x => {
            finalObserver.next(x);
          },
          0 /* 延迟时间 */,
          val /* 会作为上面函数所使用的 x */,
        );
      },
    };
  };
  console.log(props);
  return (
    <div className={styles.contentWrap}>
      <div>
        <Button type="primary" onClick={() => everyFun()}>
          every
        </Button>
        <Button type="primary" onClick={() => subscriptionFun()}>
          subscription
        </Button>
        <Button type="primary" onClick={() => catchErrorFun()}>
          catchError
        </Button>
        <Button type="primary" onClick={() => catchErrorFun()}>
          catchError
        </Button>
        <Button type="primary" onClick={() => SchedulerFun()}>
          Scheduler
        </Button>
      </div>
    </div>
  );
};
export default Index;
