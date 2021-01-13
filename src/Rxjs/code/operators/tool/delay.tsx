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
    const source = of(null);
    const example = merge(
      source.pipe(mapTo('Hello')),
      source.pipe(mapTo('World'), delay(1000)),
      source.pipe(mapTo('GoodBye'), delay(2000)),
      source.pipe(mapTo('World'), delay(3000)),
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
