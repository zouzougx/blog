import React, { useEffect } from 'react';
import { Observable, Observer, of } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    //  const observable =   Observable.create(function subscribe (observer: Observer<Number>){
    //     observer.next(1);
    //     observer.next(2);
    //     observer.next(3);
    //     setTimeout(() => {
    //       observer.next(4);
    //       observer.complete();
    //     }, 1000);
    //  })
    const observable = of(1, 2, 3);
    //  observable = from([1, 2, 3])
    // const observable2 = from([1, 2, 3])
    console.log('just before subscribe');
    observable.subscribe((value: number) => console.log(value));
    console.log('just after subscribe');
  }, []);

  return (
    <div>立即(同步地)推送值1、2、3，然后1秒后会推送值4，再然后是完成流 </div>
  );
};
export default Index;
