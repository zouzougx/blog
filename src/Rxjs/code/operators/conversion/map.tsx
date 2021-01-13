import React, { useEffect } from 'react';
import { of, fromEvent, from, interval, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 例1: 每个数字加10
    const source = from([1, 2, 3, 4]).pipe(map(val => val + 10));
    source.subscribe(val => setHtml('mapOutput', val));
    // 例2: 映射成单一属性
    const source2 = from([
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 20 },
      { name: 'Ryan', age: 50 },
    ]).pipe(map(({ name }) => name));
    source2.subscribe(val => setHtml('mapOutput', val));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="mapOutput" />
    </>
  );
};
export default Index;
