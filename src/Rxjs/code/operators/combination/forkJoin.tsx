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
    // 例1:  Observables 在不同的时间间隔后完成
    const myPromise = (val: any) =>
      new Promise(resolve =>
        setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000),
      );
    const example = staticForkJoin(
      of('Hello'),
      of('World').pipe(delay(1000)),
      interval(1000).pipe(take(1)),
      interval(1000).pipe(take(2)),
      myPromise('RESULT'),
    );
    const subscribe = example.subscribe(val => setHtml('index', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
