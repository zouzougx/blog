import React, { useEffect } from 'react';
import { ReplaySubject } from 'rxjs';
import { setHtml } from '../utils/htmlTool';

const Index: React.FC = () => {
  useEffect(() => {
    const subject = new ReplaySubject(3);
    subject.subscribe({
      next: value => setHtml('ReplaySubjectOutput', `observerA ${value}`),
    });
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.subscribe({
      next: value => setHtml('ReplaySubjectOutput', `observerB ${value}`),
    });
    subject.next(4);
    // 指定window time来确定多久之前的值可以缓存
    // const subject = new ReplaySubject(10, 4000)
    // subject.subscribe({ next: (value) =>setHtml('index', `observerA ${value}`) })
    // let i = 0
    // setInterval(() => {subject.next(i +=1)}, 1000)
    // setTimeout(() => {
    //   subject.subscribe({
    //     next: (value) => setHtml('ReplaySubjectOutput', `observerB ${value}`)
    //   });
    //  },5000)
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="ReplaySubjectOutput" />
    </>
  );
};
export default Index;
