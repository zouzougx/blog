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
    const message = interval(1000);
    const delayForFiveSeconds = () => timer(3000);
    const delayWhenExample = message.pipe(delayWhen(delayForFiveSeconds));
    delayWhenExample.subscribe(val => setHtml('delayWhenOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="delayWhenOutput" />
    </>
  );
};
export default Index;
