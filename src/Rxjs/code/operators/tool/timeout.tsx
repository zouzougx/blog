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

const Index: React.FC = () => {
  useEffect(() => {
    // 模拟请求
    const makeRequest = (timeToDelay: number) => {
      return of('Request Complete!').pipe(delay(timeToDelay));
    };
    of(4000, 3000, 2000)
      .pipe(
        concatMap(duration =>
          makeRequest(duration).pipe(
            timeout(2500),
            catchError(error => of(`Request timed out after: ${duration}`)),
          ),
        ),
      )
      .subscribe(val => setHtml('timeoutOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="timeoutOutput" />
    </>
  );
};
export default Index;
