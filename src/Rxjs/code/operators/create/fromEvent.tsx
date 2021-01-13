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
    fromEvent(document.getElementById('fromEvent'), 'click')
      .pipe()
      .subscribe(event => {
        setHtml('index', event);
        console.log(event);
        setHtml('index', 'click event');
      });
  }, []);

  return (
    <>
      <Button type="primary" id="fromEvent">
        来自事件
      </Button>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
