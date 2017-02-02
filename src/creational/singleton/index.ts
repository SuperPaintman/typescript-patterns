'use strict';

/**
 * Cache for singletone classes
 * @type {FunctionConstructor[]}
 */
const singletones: Function[] = [];

/**
 * Singleton decorator factory
 */
export default function singleton() {
  return function <T extends Function> (constructor: T) {
    const wrapper = function (...args) {
      let self = singletones.find((c) => constructor === c.constructor);

      if (self) {
        return self;
      }

      self = new (constructor as any)(...args);

      singletones.push(self);

      return self as T;
    };

    wrapper.prototype = constructor.prototype;

    return wrapper as any;
  };
}
