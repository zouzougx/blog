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
    const subscription = timer(3000, 1000).subscribe(value =>
      setHtml('timerOutput', value),
    );
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="timerOutput" />
    </>
  );
};
export default Index;
