import React, { useEffect } from 'react';
import { of, empty } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1: 没有值的 Observable.of 的默认值
    const exampleOne = of().pipe(defaultIfEmpty<any>('Observable.of() Empty!'));
    exampleOne.subscribe(val => setHtml('defaultIfEmptyOutput', val));

    // 例2: Observable.empty 的默认值
    const example = empty().pipe(defaultIfEmpty('Observable.empty()!'));
    // 输出: 'Observable.empty()!'
    example.subscribe(val => setHtml('defaultIfEmptyOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="defaultIfEmptyOutput" />
    </>
  );
};
export default Index;
