import React, { useEffect } from 'react';
import { of, timer, from, interval, throwError } from 'rxjs';
import {
  mergeMap,
  map,
  delayWhen,
  tap,
  catchError,
  retry,
  retryWhen,
} from 'rxjs/operators';
import { Button } from 'antd';
import 'rxjs/add/operator/observeOn';
import styles from '../styles.less';
import { isEqual } from 'lodash';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1: 捕获observable中的错误
    const source = throwError('This is an error!');
    const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
    example.subscribe(val => setHtml('catchErrorOutput', val));
    // 例2: 捕获拒绝的promise
    // const myBadPromise = () =>
    //   new Promise((resolve, reject) => reject('Rejected!'));
    // const source = timer(1000);
    // const example = source.pipe(
    //   // 捕获拒绝的 promise，并返回包含错误信息的 observable
    //   mergeMap(() =>
    //     from(myBadPromise()).pipe(
    //       catchError(error => of(`Bad Promise: ${error}`)),
    //     ),
    //   ),
    // );
    // example.subscribe(val => setHtml('catchErrorOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="catchErrorOutput" />
    </>
  );
};
export default Index;
