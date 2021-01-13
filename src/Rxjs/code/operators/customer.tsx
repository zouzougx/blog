import React, { useEffect } from 'react';
import { Observable, Observer, from, observable } from 'rxjs';
import { setHtml } from '../utils/htmlTool';

const Index: React.FC = () => {
  useEffect(() => {
    const multiplyByTen = (inputObservable: Observable<number>) => {
      const outputObservable = Observable.create(
        (observer: Observer<number>) => {
          inputObservable.subscribe({
            next: val => observer.next(10 * val),
            error: err => observer.error(err),
            complete: () => observer.complete(),
          });
        },
      );
      return outputObservable;
    };
    const input = from([1, 2, 3]);
    const output = multiplyByTen(input);
    output.subscribe((x: number) => setHtml('index', x));
  }, []);

  return (
    <>
      <div>输出:</div>
      <div id="index" />
    </>
  );
};
export default Index;
