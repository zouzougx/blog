import React, { useEffect, useState } from 'react';
import { Subject, interval, of, timer, ReplaySubject, from } from 'rxjs';
import {
  tap,
  take,
  pluck,
  mapTo,
  publish,
  multicast,
  share,
  shareReplay,
} from 'rxjs/operators';
import 'rxjs/add/operator/observeOn';
import { setHtml } from '../../utils/htmlTool';

const Index: React.FC = () => {
  useEffect(() => {
    const source = timer(1000);
    const example = source.pipe(
      tap(() => setHtml('shareOutput', '***SIDE EFFECT***')),
      mapTo('***RESULT***'),
    );
    // const subscribeOne = example.subscribe((val) => console.log(val));
    // const subscribeTwo = example.subscribe((val) => console.log(val));

    const sharedExample = example.pipe(share());
    const subscribeThree = sharedExample.subscribe(val =>
      setHtml('shareOutput', val),
    );
    const subscribeFour = sharedExample.subscribe(val =>
      setHtml('shareOutput', val),
    );
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="shareOutput" />
    </>
  );
};
export default Index;
