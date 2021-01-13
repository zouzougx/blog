import React, { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime, scan } from 'rxjs/operators';
import { setHtml } from '../utils/htmlTool';
import 'antd/dist/antd.css';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    let count = 0;
    const rate = 1000;
    let lastClick = Date.now() - rate;
    const button = document.getElementById('myButton');
    button?.addEventListener('click', () => {
      if (Date.now() - lastClick >= rate) {
        setHtml('index', `Clicked ${(count += 1)} times`);
        lastClick = Date.now();
      }
    });
    // 使用Rxjs
    // const button = document.getElementById('myButton');
    // fromEvent(button, 'click')
    //   .pipe(
    //     throttleTime(1000),
    //     scan(count => count + 1, 0),
    //   )
    //   .subscribe(value => setHtml('index', `clicked ${value} times`));
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
