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
    // 例1： 使用静态方法
    const first = interval(1000);
    const second = interval(2500);
    // 从一个 observable 中发出输出值
    const example = staticMerge(
      first.pipe(mapTo('FIRST!')),
      second.pipe(mapTo('SECOND!')),
    );
    const subscription = example.subscribe(val => setHtml('index', val));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000);

    // 例2： 使用实例方法
    const first2 = interval(1000);
    // const second2 = interval(1000);
    const second2 = of('will be run first');
    const example2 = first2.pipe(
      map(val => `first${val}`),
      merge(second2.pipe(map(val => `second ${val}`))),
    );
    const subscription2 = example2.subscribe(val => setHtml('index', val));
    setTimeout(() => {
      subscription2.unsubscribe();
    }, 3000);
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
