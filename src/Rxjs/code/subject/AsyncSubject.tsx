import React, { useEffect } from 'react';
import { AsyncSubject } from 'rxjs';
import { setHtml } from '../utils/htmlTool';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    const subject = new AsyncSubject();
    subject.subscribe(value => setHtml('index', `observerA ${value}`));
    subject.next(1);
    subject.next(2);
    subject.subscribe(value => setHtml('index', `observerB ${value}`));
    subject.next(3);
    subject.complete();
    subject.next(4);
  }, []);
  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
