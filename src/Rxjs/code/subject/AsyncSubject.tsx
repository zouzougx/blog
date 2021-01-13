import React, { useEffect } from 'react';
import { AsyncSubject } from 'rxjs';
import { setHtml } from '../utils/htmlTool';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    const subject = new AsyncSubject();
    subject.subscribe(value =>
      setHtml('AsyncSubjectOutput', `observerA ${value}`),
    );
    subject.next(1);
    subject.next(2);
    subject.subscribe(value =>
      setHtml('AsyncSubjectOutput', `observerB ${value}`),
    );
    subject.next(3);
    subject.complete();
    subject.next(4);
  }, []);
  return (
    <>
      <div>输出:</div>
      <div id="AsyncSubjectOutput" />
    </>
  );
};
export default Index;
