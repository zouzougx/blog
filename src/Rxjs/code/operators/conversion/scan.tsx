import React, { useEffect } from 'react';
import { of, fromEvent, from, interval, Subject } from 'rxjs';
import { scan, mapTo } from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1： 随着时间的推移计算总数
    const source = of(1, 2, 3, 4);
    const example = source.pipe(scan((acc, curr) => acc + curr, 0));
    example.subscribe(val => setHtml('scanOutput', val));
    // 例2： 计数点击次数
    // const source2 = fromEvent(document, 'click').pipe(
    //   mapTo(1),
    //   scan((acc, val) => acc + val, 0),
    // );
    // source2.subscribe(val => setHtml('scanOutput', val));
    // 例3： 对对象属性进行累加
    // const subject = new Subject();
    // const example3 = subject.pipe(
    //   scan((acc, curr) => ({ ...acc, ...curr }), {}),
    // );
    // example3.subscribe(val => setHtml('scanOutput', JSON.stringify(val)));
    // subject.next({ name: 'Joe' });
    // subject.next({ age: 30 });
    // subject.next({ favoriteLanguage: 'JavaScript' });
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="scanOutput" />
    </>
  );
};
export default Index;
