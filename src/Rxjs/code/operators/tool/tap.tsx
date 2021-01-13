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
    const source = of(1, 2, 3, 4).pipe(
      tap(val => setHtml('index', `before map: ${val}`)),
      map(val => val + 10),
      tap(val => setHtml('index', `after map: ${val}`)),
    );
    source.subscribe(val => setHtml('index', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
