import React, { useEffect } from 'react';
import { Button } from 'antd';
import { observable } from 'rxjs';
import { setHtml } from '../utils/htmlTool';

/* eslint max-classes-per-file: ["error", 2] */
/* eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_bar"] }] */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

interface ObserverInterface {
  next?: (value: any) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}
type SubscribeType = (observer: ObserverInterface) => () => void;

class SafeObservable {
  destinationObserver: ObserverInterface;

  isUnsubscribed?: boolean;

  destinationUnsubscribe?: () => void;

  constructor(observer: ObserverInterface) {
    this.destinationObserver = observer;
  }
  next(value: any) {
    const { destinationObserver, isUnsubscribed } = this;
    if (destinationObserver.next && !isUnsubscribed) {
      destinationObserver.next(value);
    }
  }
  error(err: Error) {
    const { destinationObserver, isUnsubscribed } = this;
    if (!isUnsubscribed) {
      this.isUnsubscribed = true;
      if (destinationObserver.error) {
        destinationObserver.error(err);
      }
    }
  }

  complete() {
    const { destinationObserver, isUnsubscribed } = this;
    if (!isUnsubscribed) {
      this.isUnsubscribed = true;
      if (destinationObserver.complete) {
        destinationObserver.complete();
      }
    }
  }

  // 终极版
  unsubscribe() {
    this.isUnsubscribed = true;
    if (this.destinationUnsubscribe) {
      this.destinationUnsubscribe();
    }
  }
}

class Observable {
  destinationSubscribe: SubscribeType;

  constructor(subscribe: SubscribeType) {
    this.destinationSubscribe = subscribe;
  }

  // subscribe(observer: ObserverInterface) {
  //   const safeObserver = new SafeObservable(observer)
  //   return {
  //     unsubscribe: this.destinationSubscribe(safeObserver)
  //   }
  // }
  subscribe(observer: ObserverInterface) {
    const safeObserver = new SafeObservable(observer);
    safeObserver.destinationUnsubscribe = this.destinationSubscribe(
      safeObserver,
    );
    return {
      unsubscribe: safeObserver.destinationUnsubscribe,
    };
  }
}

const Index: React.FC = () => {
  useEffect(() => {
    // 极简版
    const simpleObservable = (observer: ObserverInterface) => {
      for (let i = 0; i < 5; i += 1) {
        if (observer.next) {
          observer.next(i);
        }
      }
      if (observer.complete) {
        observer.complete();
      }
    };
    // 极简 + 异步
    const simpleObservable2 = (observer: ObserverInterface) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < 5) {
          if (observer.next) {
            observer.next(i++);
          }
        } else {
          if (observer.complete) {
            observer.complete();
          }
          clearInterval(interval);
        }
      }, 1000);
    };
    // 极简 + 异步 +  取消订阅
    const simpleObservable3 = (observer: ObserverInterface) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < 5) {
          if (observer.next) {
            observer.next(i++);
          }
        } else {
          if (observer.complete) {
            observer.complete();
          }
          clearInterval(interval);
        }
      }, 1000);
      return {
        unsubscribe: () => {
          setHtml('index', 'disposed');
          clearInterval(interval);
        },
      };
    };
    // Observer 类的实现
    const simpleObservable4 = (observer: ObserverInterface) => {
      const safeObserver = new SafeObservable(observer);
      let i = 0;
      const interval = setInterval(() => {
        if (i < 5) {
          safeObserver.next(i++);
        } else {
          safeObserver.complete();
          safeObserver.next('never run');
          clearInterval(interval);
        }
      }, 1000);
      return {
        unsubscribe: () => {
          setHtml('index', 'disposed');
          clearInterval(interval);
        },
      };
    };
    // Observable 类
    const simpleObservable5 = new Observable((observer: ObserverInterface) => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < 5) {
          if (observer.next) {
            observer.next(i++);
          }
        } else {
          if (observer.complete) {
            observer.complete();
          }
          if (observer.next) {
            observer.next('never run');
          }
          clearInterval(interval);
        }
      }, 1000);
      return () => {
        setHtml('index', 'disposed');
        clearInterval(interval);
      };
    });
    //

    // 终结版 同simpleObservable
    // -------------
    const observer = {
      next: (value: any) => setHtml('index', value),
      error: (error: Error) => setHtml('index', error),
      complete: () => setHtml('index', 'complete'),
    };
    setHtml('index', 'before');
    // simpleObservable(observer)
    //simpleObservable2(observer)
    // const subscription = simpleObservable3(observer)
    // setTimeout(() => {
    //   subscription.unsubscribe()
    // }, 3000)
    //const subscription = simpleObservable4(observer)
    const subscription = simpleObservable5.subscribe(observer);
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3000);
    setHtml('index', 'after');
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
