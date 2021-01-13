import React, { useEffect } from 'react';
import {
  interval,
  of,
  merge as staticMerge,
  concat as staticContact,
  range,
  timer,
  from,
  combineLatest,
  fromEvent,
  forkJoin as staticForkJoin,
} from 'rxjs';
// import { merge,concat } from 'rxjs';
import {
  mapTo,
  map,
  merge,
  concat,
  delay,
  scan,
  startWith,
  tap,
  take,
  combineLatest as exampleCombineLatest,
} from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1: 对数字序列使用startWith
    const source = of(1, 2, 3);
    source.pipe(startWith(0)).subscribe(val => console.log(val));

    // 例2: 作为scan的初始值
    const source1 = of('is', 'powerful', 'tool');
    source1
      .pipe(
        startWith('Rxjs'),
        scan((acc, curr) => `${acc} ${curr}`),
      )
      .subscribe(val => console.log(val));

    // 例3: 使用做个值进行例1：对数字序列使用startWith
    // const source3 = interval(1000);
    // const example = source3.pipe(startWith(-3, -2, -1));
    // const subscribe = example.subscribe((val) => console.log(val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
