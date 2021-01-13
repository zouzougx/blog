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
    // 1. 使用静态方法使用
    const first = range(4, 5);
    const second = of(3, 4);
    const example = staticContact(first, second);
    example.subscribe(val => setHtml('contactOutput', val));

    // const first = interval(1000);
    // const first = range(4, 5);
    // const second = interval(2500);
    // // 从一个 observable 中发出输出值
    // const example = staticContact(
    //   first.pipe(mapTo('FIRST!')),
    //   second.pipe(mapTo('SECOND!')),

    // );
    // const subscription = example.subscribe((val) => setHtml('contactOutput', val));
    // setTimeout(() => {
    //   subscription.unsubscribe();
    // }, 3000);

    // 例2: 使用实例方法
    // const first2 = from([1, 2, 3]);
    // const second2 = timer(1000, 3000);
    // const example2 = first2.pipe(concat(second2));
    // example2.subscribe((val) => setHtml('contactOutput', val));

    // 例3: 使用延迟的source Observable 进行concat
    // const first3 = from([1, 2, 3]);
    // const second3 = of(3, 4);
    // const example3 = first3.pipe(delay(3000), concat(second3));
    // example3.subscribe((val) =>setHtml('index', val));

    // 例4: 使用完不成的Observable
    // const first4 = timer(3000, 1000);
    // const second4 = of('this never run');
    // const example4 = first4.pipe(concat(second4));
    // example4.subscribe((val) => setHtml('contactOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="contactOutput" />
    </>
  );
};
export default Index;
