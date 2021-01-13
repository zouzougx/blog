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
    const source = interval(1000);
    const example = source.pipe(
      mergeMap(val => {
        if (val > 2) {
          return throwError('Error!');
        }
        return of(val);
      }),
      retry(2),
    );
    example.subscribe({
      next: val => setHtml('index', val),
      error: val => setHtml('index', `${val}: Retried 2 times then quit!`),
    });
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
