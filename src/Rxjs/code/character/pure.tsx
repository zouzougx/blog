import React, { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';
import { setHtml } from '../utils/htmlTool';
import 'antd/dist/antd.css';
import { Button } from 'antd';

const Index: React.FC = () => {
  useEffect(() => {
    // let count = 0;
    // const button = document.getElementById('myButton')
    // button?.addEventListener('click', () => { console.log(`clicked ${count += 1} times`) })
    // 使用Rxjs
    const button = document.getElementById('myButton');
    fromEvent(button, 'click')
      .pipe(scan(count => count + 1, 0))
      .subscribe((value: number) => setHtml('index', `clicked ${value} times`));
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
