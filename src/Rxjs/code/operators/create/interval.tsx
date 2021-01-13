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
    const subscription = interval(3000).subscribe(value =>
      setHtml('intervalOutput', value),
    );
    setTimeout(() => {
      subscription.unsubscribe();
    }, 6000);
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="intervalOutput" />
    </>
  );
};
export default Index;
