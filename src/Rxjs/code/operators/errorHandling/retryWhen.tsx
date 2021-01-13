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
    // 例1: 在指定的时间间隔触发重试
    const source = interval(1000);
    const example = source.pipe(
      map(val => {
        if (val > 3) {
          throw val;
        }
        return val;
      }),
      retryWhen(errors =>
        errors.pipe(
          // 输出错误信息
          tap(val => setHtml('index', `Value ${val} was too high!`)),
          // 4秒后重试
          delayWhen(val => timer(val * 1000)),
        ),
      ),
    );
    example.subscribe(val => setHtml('index', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
