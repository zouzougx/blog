# Promise ES6 Version

```Javascript
export class Promise {
  constructor(executor) {
    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';
    const self = this;
    self.status = PENDING;
    self.data = undefined;
    self.callbacks = [];
    function resolve(value) {
      if (self.status !== PENDING) {
        return;
      }
      self.status = RESOLVED;
      self.data = value;
      if (self.callbacks.length > 0) {
        setTimeout(function() {
          self.callbacks.forEach(callbackObj => {
            callbackObj.onResolved(value);
          });
        });
      }
    }

    function reject(reason) {
      if (self.status !== PENDING) {
        return;
      }
      self.status = REJECTED;
      self.data = reason;
      if (self.callbacks.length > 0) {
        setTimeout(function() {
          self.callbacks.forEach(callbackObj => {
            callbackObj.onRejected(reason);
          });
        });
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason;
          };
    const self = this;

    return new Promise((resolve, reject) => {
      function handle(callback) {
        try {
          const result = callback(self.data);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          rejected(error);
        }
      }
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved);
          },
          onRejected(reason) {
            handle(onRejected);
          }
        });
      } else if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  };

  catch = function(onRejected) {
    return this.then(undefined, onRejected);
  };

  static resolve = function(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  static reject = function(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  static all = function(promises) {
    if (Object.prototype.toString.call(promises) !== '[object Array]') {
      return;
    }
    const values = new Array(promise.length);
    const count = 0;
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            arr[index] = value;
            count++;
            if (count === values.length) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  };

  static race = function(promises) {
    if (Object.prototype.toString.call(promises) !== '[object Array]') {
      return;
    }
    return new Promise((resolve, reject) => {
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  };
}

```
