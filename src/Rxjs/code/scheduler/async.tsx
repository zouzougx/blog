import React, { useEffect } from 'react';
import {
  Observable,
  Observer,
  async,
  of,
  asap,
  range,
  combineLatest,
} from 'rxjs';
import { setHtml } from '../utils/htmlTool';
import { combineLatest as exampleCombineLatest } from 'rxjs/operators';

const Index: React.FC = () => {
  useEffect(() => {
    const a$ = of(1, 2);
    // const a$ = of(1, 2, asap);
    const b$ = of(10);
    //const b$ = of(10, asap);
    const c$ = combineLatest(a$, b$, (a, b) => a + b);
    c$.subscribe(value => setHtml('index', value));

    // 实例操作符用法
    // const a$ = of(1, 2);
    // const b$ = of(10).pipe(exampleCombineLatest(a$, (a, b) => a + b));
    // b$.subscribe(value => setHtml('index', value));

    // async 调度器
    // const observable = Observable.create(function subscribe(
    //   observer: Observer<number>,
    // ) {
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   observer.complete();
    // }).observeOn(async);
    // setHtml('index', 'before');
    // observable.subscribe(
    //   (value: number) => setHtml('index', value),
    //   (err: Error) => setHtml('index', err),
    //   () => setHtml('index', 'complete'),
    // );
    // setHtml('index', 'after');

    //静态创建操作符通常可以接受调度器作为参数;
    // const observable = range(1, 10, async);
    // setHtml('index', 'before');
    // observable.subscribe(value => setHtml('index', value));
    // setHtml('index', 'after');
    // const observable = timer(2000, 10000);
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
