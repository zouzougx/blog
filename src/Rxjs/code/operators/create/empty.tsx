import React, { useEffect, useState } from 'react';
import {
  Observable,
  of,
  from,
  fromEvent,
  empty,
  interval,
  range,
  timer,
} from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Button } from 'antd';
// import async from 'rxjs/scheduler/async';
import { startWith } from 'rxjs/operators/startWith';
import { setHtml } from '../../utils/htmlTool';
import 'rxjs/add/operator/observeOn';
import 'antd/dist/antd.css';

const Index: React.FC = () => {
  useEffect(() => {
    empty().subscribe({
      next: () => setHtml('emptyOutput', 'Next!'),
      complete: () => setHtml('emptyOutput', 'Complete'),
    });
    empty()
      .pipe(startWith(7))
      .subscribe({
        next: value => setHtml('emptyOutput', value),
        complete: () => setHtml('emptyOutput', 'Complete from  second empty'),
      });
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="emptyOutput" />
    </>
  );
};
export default Index;
