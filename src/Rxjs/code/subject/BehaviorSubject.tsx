import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';
import { setHtml } from '../utils/htmlTool';

const Index: React.FC = () => {
  useEffect(() => {
    const subject = new BehaviorSubject(0);
    subject.subscribe({
      next: value => setHtml('index', `observerA ${value}`),
    });
    subject.next(1);
    subject.next(2);
    subject.subscribe({
      next: value => setHtml('index', `observerB ${value}`),
    });
    subject.next(3);
    // 不提供上面 subject.next()会怎么样？
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
