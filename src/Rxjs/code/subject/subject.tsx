import React, { useEffect } from 'react';
import { setHtml } from '../utils/htmlTool';
import { Subject } from 'rxjs';

const Index: React.FC = () => {
  useEffect(() => {
    const subject = new Subject();
    subject.subscribe({
      next: value => setHtml('index', `observerA ${value}`),
    });
    subject.subscribe({
      next: value => setHtml('index', `observerB ${value}`),
    });
    subject.next(1);
    subject.next(2);
    // 作为Observable的subscribe方法的参数
    // const observable = from([1, 2, 3])
    // observable.subscribe(subject)
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
