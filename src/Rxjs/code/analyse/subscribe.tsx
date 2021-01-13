import React, { useEffect } from 'react';
import { Observable, Observer } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    const observable = Observable.create(function subscribe(
      observer: Observer<string>,
    ) {
      setInterval(() => {
        observer.next('hi');
      }, 1000);
    });
    const observer = {
      next: (value: string) => console.log(value),
      error: (err: Error) => console.error(err),
      complete: () => console.log('complete'),
    };
    observable.subscribe(observer);
    observable.subscribe(value => console.log(`observer ${value}`));
  }, []);

  return (
    <div>
      <Button id="myButton"> 每隔一秒会向观察者发送字符串 'hi' </Button>
    </div>
  );
};
export default Index;
