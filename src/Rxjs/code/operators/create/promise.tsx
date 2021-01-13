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
    const myPromise = () => {
      return new Promise(resolve => {
        resolve('Resolved!');
      });
    };
    const source = fromPromise(myPromise());
    source.subscribe((value: any) => setHtml('promiseOutput', value));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="promiseOutput" />
    </>
  );
};
export default Index;
