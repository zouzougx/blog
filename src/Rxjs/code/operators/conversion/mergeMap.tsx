import React, { useEffect } from 'react';
import { fromEvent, of, interval } from 'rxjs';
import { mergeMap, take, map } from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1: 使用observable 进行mergeMap
    const source = of('Hello').pipe(mergeMap(val => of(`${val} World!`)));
    source.subscribe(val => setHtml('mergeMapOutput', val));
    // 例2: 使用Promise 进行mergeMap
    // const myPromise = (val: string) =>
    //   new Promise(resolve => resolve(`${val} World From Promise!`));
    // const source2 = of('Hello').pipe(mergeMap(val => myPromise(val)));
    // source2.subscribe(val => setHtml('mergeMapOutput', val));
    // 例3: 每个字母映射并打平成一个 Observable
    // const source3 = of('a', 'b', 'c').pipe(
    //   mergeMap(val =>
    //     interval(1000).pipe(
    //       map(x => val + x),
    //       take(4),
    //     ),
    //   ),
    //   // take(2),
    // );
    // source3.subscribe(val => setHtml('mergeMapOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="mergeMapOutput" />
    </>
  );
};
export default Index;
