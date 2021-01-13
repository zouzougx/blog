import React, { useEffect, useState } from 'react';
import { of, merge, timer, interval, Notification, from, forkJoin } from 'rxjs';
import {
  mapTo,
  map,
  concatMap,
  catchError,
  tap,
  delay,
  delayWhen,
  dematerialize,
  timeout,
} from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';
import 'rxjs/add/operator/observeOn';

const Index: React.FC = () => {
  useEffect(() => {
    // 例1: 转换成基础的promise
    const sample = val => of(val).pipe(delay(3000));
    sample('first example')
      .toPromise()
      .then(result => {
        setHtml('toPromiseOutput', `From Promise:${result}`);
      });

    // 例2: 转换成基础的promise
    // const example2 = () => {
    //   return Promise.all([
    //     sample('Promise 1').toPromise(),
    //     sample('Promise 2').toPromise(),
    //   ]);
    // };
    // example2().then(val => {
    //   setHtml('toPromiseOutput', `Promise.all Result:${val}`);
    // });
    // // 可以直接使用forkJoin，而不是使用toPromise
    // const example3 = forkJoin(
    //   sample('Observable 1'),
    //   sample('Observable 2'),
    // ).subscribe(val => setHtml('toPromiseOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="toPromiseOutput" />
    </>
  );
};
export default Index;
