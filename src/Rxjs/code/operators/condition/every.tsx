import React, { useEffect } from 'react';
import { of, empty } from 'rxjs';
import { every } from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = props => {
  useEffect(() => {
    // 1: 源Observable有些值不符合条件
    of(1, 2, 3, 4, 5, 6)
      .pipe(every(x => x < 5))
      .subscribe(val => setHtml('everyOutput', val));

    // 2: 源Observable 都符合条件
    const source = of(2, 4, 6, 8, 10);
    const checkEvery = source.pipe(every(x => x % 2 === 0));
    const subscription = checkEvery.subscribe(val => {
      setHtml('everyOutput', val);
    });
    subscription.unsubscribe();
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="everyOutput" />
    </>
  );
};
export default Index;
