import React, { useEffect } from 'react';
import { Observable, Observer } from 'rxjs';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    const observable = Observable.create(function subscribe(
      observer: Observer<string>,
    ) {
      // 以下是Observable执行
      observer.next('1');
      observer.next('2');
      observer.next('3');
      observer.complete();
      observer.next('4'); // 因为违反规约，所以不会发送
    });
    // const observable = Observable.create(function subscribe(observer:Observer<string>) {
    //   try {
    //     observer.next('1')
    //     observer.complete()
    //     throw '500'
    //   } catch (err) {
    //     observer.error(err); // 如果捕获到异常会发送一个错误
    //   }
    // });
    observable.subscribe(
      (value: string) => console.log(value),
      (err: Error) => console.log(err),
      () => console.log('complete'),
    );
  }, []);

  return (
    <div>
      <div>违反规约</div>
      <div>try catch</div>
    </div>
  );
};
export default Index;
