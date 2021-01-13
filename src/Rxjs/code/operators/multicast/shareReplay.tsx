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
    const routeEnd = new Subject<{ data: any; url: string }>();
    const lastUrl = routeEnd.pipe(
      tap(() => setHtml('shareReplayOutput', 'executed')),
      pluck('url'),
      shareReplay(1),
    );
    lastUrl.subscribe(val => setHtml('shareReplayOutput', `observerA ${val}`));
    lastUrl.subscribe(val => setHtml('shareReplayOutput', `observerB ${val}`));
    routeEnd.next({ data: {}, url: 'my-path' });
    routeEnd.next({ data: {}, url: 'my-path2' });
    lastUrl.subscribe(val => console.log(`ObserverC ${val}`));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="shareReplayOutput" />
    </>
  );
};
export default Index;
