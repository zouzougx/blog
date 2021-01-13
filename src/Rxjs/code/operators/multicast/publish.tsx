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
    const source = of(1000).pipe(
      tap(() => setHtml('index', '副作用只会执行1次')),
      publish(),
    );
    source.subscribe(val => setHtml('index', `Subscriber One: ${val}`));
    source.subscribe(val => setHtml('index', `Subscriber Two: ${val}`));
    setTimeout(() => {
      source.connect();
    }, 2000);
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
