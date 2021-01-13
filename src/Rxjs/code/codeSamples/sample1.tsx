import React, { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { map, bufferCount } from 'rxjs/operators';
import { Button } from 'antd';
import { isEqual } from 'lodash';
import { setHtml } from '../utils/htmlTool';

const Index: React.FC = props => {
  const colorEggs = [67, 79, 76, 79, 82, 32, 69, 71, 71, 83];
  // fromEvent
  useEffect(() => {
    fromEvent(document, 'keyup')
      .pipe(
        map((e: any) => e.keyCode),
        bufferCount(10, 1),
      )
      .subscribe(last12key => {
        if (isEqual(last12key, colorEggs)) {
          setHtml('index', '隐藏的彩蛋 (^o^)/~');
        }
      });
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
