import React, { useEffect } from 'react';
import { of, fromEvent, from, interval, Subject } from 'rxjs';
import { mapTo, reduce, takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1：数字流的加和
    const source = of(1, 2, 3, 4).pipe(reduce((acc, val) => acc + val));
    source.subscribe(val => setHtml('reduceOutput', val));
    // 例2：5秒内页面的点击次数
    // const source2 = fromEvent(document, 'click').pipe(
    //   takeUntil(interval(5000)),
    //   mapTo(1),
    //   reduce((acc, val) => acc + val, 0),
    // );
    // source2.subscribe(val => setHtml('reduceOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="reduceOutput" />
    </>
  );
};
export default Index;
