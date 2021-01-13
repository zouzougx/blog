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
    const a$ = of(1, 2);
    const b$ = of(10);
    const c$ = combineLatest(a$, b$, (a, b) => a + b);
    c$.subscribe(value => setHtml('index', value));

    // 例2：
    // const first = timer(3000, 2000);
    // const second = interval(1000);
    // const example = combineLatest(
    //   first.pipe(map((val) => `first ${val}`)),
    //   second.pipe(map((val) => `second ${val}`)),
    // );
    // const subscription = example.subscribe((latestValues) => {
    //   const [timerValOne, timerValTwo] = latestValues;
    //  setHtml('index', `${timerValOne} ${timerValTwo}`);
    // });
    // setTimeout(() => {
    //   subscription.unsubscribe();
    // }, 10000);

    // 例3:  动态计算体脂
    // const weight = of(70, 72, 76, 79, 75); // (3, 4, 5, 6, 7);
    // const height = of(1.76, 1.77, 1.78);
    // const example2 = combineLatest(weight, height, (w, h) => w + h); // (w, h) => w / (h * h)
    //  example2.subscribe(x => setHtml('index', 'BMI is ' + x));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
