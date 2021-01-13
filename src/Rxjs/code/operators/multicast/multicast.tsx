import React, { useEffect, useState } from 'react';
import { Subject, interval, of, timer, ReplaySubject, from } from 'rxjs';
import {
  tap,
  take,
  pluck,
  mapTo,
  publish,
  multicast,
  share,
  shareReplay,
} from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = () => {
  useEffect(() => {
    // 多播的Observable
    const observable = from([1, 2, 3]);
    const subject = new Subject();
    const afterMulticast = observable.pipe(multicast(() => subject));
    // 在底层使用了 `subject.subscribe({...})`:
    afterMulticast.subscribe(val =>
      setHtml('multicastOutput', `observerA ${val}`),
    );
    afterMulticast.subscribe(val =>
      setHtml('multicastOutput', `observerB ${val}`),
    );
    // 在底层使用了 `source.subscribe(subject)`:
    afterMulticast.connect();

    // 例1： 使用标准的 Subject 进行 multicast
    // const observable2 = interval(1000).pipe(
    //   tap(() => setHtml('multicastOutput', 'Side Effect #1')),
    //   // mapTo('Result!'),
    //   take(4),
    // );
    // const multi = observable2.pipe(multicast(() => new Subject()));
    // multi.subscribe(val => setHtml('multicastOutput', `observerA ${val}`));
    // multi.subscribe(val => setHtml('multicastOutput', `observerB ${val}`));
    // multi.connect();

    // 例2： 使用 ReplaySubject 进行多播
    // const example2 = interval(1000).pipe(
    //   tap(() => setHtml('multicastOutput', 'Side Effect #1')),
    //   take(8),
    // );
    // const multi1 = example2.pipe(multicast(() => new ReplaySubject(5)));
    // multi1.connect();
    // setTimeout(() => {
    //   const subscriber = multi.subscribe(val => console.log(val));
    // }, 5000);
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="multicastOutput" />
    </>
  );
};
export default Index;
