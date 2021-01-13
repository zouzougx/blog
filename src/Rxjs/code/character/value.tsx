import React, { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { scan, throttleTime, map } from 'rxjs/operators';
import { Button } from 'antd';
import { setHtml } from '../utils/htmlTool';

const Index: React.FC = () => {
  useEffect(() => {
    let count = 0;
    const button = document.getElementById('myButton');
    button?.addEventListener('click', event => {
      count += event.clientX;
      setHtml('index', count);
    });
    // 使用Rxjs
    // const button = document.getElementById('myButton');
    // fromEvent(button, 'click')
    //   .pipe(
    //     map((event: any) => event.clientX),
    //     scan((count, clientX) => count + clientX, 0),
    //   )
    //   .subscribe((value: number) => setHtml('index', value));
  }, []);
  return (
    <>
      <Button type="primary" id="myButton">
        来自事件
      </Button>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
