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
import { race } from 'rxjs/observable/race';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1：使用两个Observable 进行race
    const first = of(1, 2, 3);
    const second = from([4, 5, 6]);
    const example = race(first.pipe(delay(1000)), second).subscribe(val =>
      setHtml('raceOutput', val),
    );
    // 例2:  使用error进行race
    // const first2 = of('first').pipe(
    //   delay(100),
    //   map(() => {
    //     throw 'error';
    //   }),
    // );
    // const second2 = of('second').pipe(delay(200));
    // const third2 = of('third').pipe(delay(300));
    // // nothing logged
    // race(first2, second2, third2).subscribe((val) =>setHtml('index', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="raceOutput" />
    </>
  );
};
export default Index;
