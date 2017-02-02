'use strict';
/** Imports */
import '../../test/helper';

import * as chai    from 'chai';


import singleton    from '.';


/** Init */
const { expect } = chai;

describe('singleton', function () {
  it('should work', function () {
    @singleton()
    class MyClass {
      val: number;

      constructor() {
        this.val = 0;
      }
    }

    const instance = new MyClass();

    expect(instance).to.be.an.instanceof(MyClass);
  });

  it('should return the previously created instance', function () {
    /** Not singleton */
    let lastNonSingletonVal = -1;
    class MyNonSingletonClass {
      val: number;

      constructor() {
        this.val = ++lastNonSingletonVal;
      }
    }

    const instanceNonSingleton0 = new MyNonSingletonClass();
    const instanceNonSingleton1 = new MyNonSingletonClass();
    const instanceNonSingleton2 = new MyNonSingletonClass();

    // Not equal instances
    expect(instanceNonSingleton0).to.not.equal(instanceNonSingleton1);
    expect(instanceNonSingleton1).to.not.equal(instanceNonSingleton2);
    expect(instanceNonSingleton2).to.not.equal(instanceNonSingleton0);

    // Not equal val
    expect(instanceNonSingleton0.val).to.not.equal(instanceNonSingleton1.val);
    expect(instanceNonSingleton1.val).to.not.equal(instanceNonSingleton2.val);
    expect(instanceNonSingleton2.val).to.not.equal(instanceNonSingleton0.val);

    // Instance of
    expect(instanceNonSingleton0).to.be.an.instanceof(MyNonSingletonClass);
    expect(instanceNonSingleton1).to.be.an.instanceof(MyNonSingletonClass);
    expect(instanceNonSingleton2).to.be.an.instanceof(MyNonSingletonClass);

    // Val
    expect(instanceNonSingleton0.val).to.equal(0);
    expect(instanceNonSingleton1.val).to.equal(1);
    expect(instanceNonSingleton2.val).to.equal(2);


    /** Singleton */
    let lastSingletonVal = -1;
    @singleton()
    class MySingletonClass {
      val: number;

      constructor() {
        this.val = ++lastSingletonVal;
      }
    }

    const instanceSingleton0 = new MySingletonClass();
    const instanceSingleton1 = new MySingletonClass();
    const instanceSingleton2 = new MySingletonClass();

    // Not equal instances
    expect(instanceSingleton0).to.equal(instanceSingleton1);
    expect(instanceSingleton1).to.equal(instanceSingleton2);
    expect(instanceSingleton2).to.equal(instanceSingleton0);

    // Not equal val
    expect(instanceSingleton0.val).to.equal(instanceSingleton1.val);
    expect(instanceSingleton1.val).to.equal(instanceSingleton2.val);
    expect(instanceSingleton2.val).to.equal(instanceSingleton0.val);

    // Instance of
    expect(instanceSingleton0).to.be.an.instanceof(MySingletonClass);
    expect(instanceSingleton1).to.be.an.instanceof(MySingletonClass);
    expect(instanceSingleton2).to.be.an.instanceof(MySingletonClass);

    // Val
    expect(instanceSingleton0.val).to.equal(0);
    expect(instanceSingleton1.val).to.equal(0);
    expect(instanceSingleton2.val).to.equal(0);
  });

  it('should not mix instances by the different classes', function () {
    /** Singleton first */
    let lastSingletonFirstVal = -1;
    @singleton()
    class MySingletonFirstClass {
      val: number;

      constructor() {
        this.val = ++lastSingletonFirstVal;
      }
    }

    const instanceSingletonFirst0 = new MySingletonFirstClass();
    const instanceSingletonFirst1 = new MySingletonFirstClass();
    const instanceSingletonFirst2 = new MySingletonFirstClass();

    // Not equal instances
    expect(instanceSingletonFirst0).to.equal(instanceSingletonFirst1);
    expect(instanceSingletonFirst1).to.equal(instanceSingletonFirst2);
    expect(instanceSingletonFirst2).to.equal(instanceSingletonFirst0);

    // Not equal val
    expect(instanceSingletonFirst0.val).to.equal(instanceSingletonFirst1.val);
    expect(instanceSingletonFirst1.val).to.equal(instanceSingletonFirst2.val);
    expect(instanceSingletonFirst2.val).to.equal(instanceSingletonFirst0.val);

    // Instance of
    expect(instanceSingletonFirst0).to.be.an.instanceof(MySingletonFirstClass);
    expect(instanceSingletonFirst1).to.be.an.instanceof(MySingletonFirstClass);
    expect(instanceSingletonFirst2).to.be.an.instanceof(MySingletonFirstClass);

    // Val
    expect(instanceSingletonFirst0.val).to.equal(0);
    expect(instanceSingletonFirst1.val).to.equal(0);
    expect(instanceSingletonFirst2.val).to.equal(0);


    /** Singleton second */
    let lastSingletonSecondVal = -1;
    @singleton()
    class MySingletonSecondClass {
      val: number;

      constructor() {
        this.val = ++lastSingletonSecondVal;
      }
    }

    const instanceSingletonSecond0 = new MySingletonSecondClass();
    const instanceSingletonSecond1 = new MySingletonSecondClass();
    const instanceSingletonSecond2 = new MySingletonSecondClass();

    // Not equal instances
    expect(instanceSingletonSecond0).to.equal(instanceSingletonSecond1);
    expect(instanceSingletonSecond1).to.equal(instanceSingletonSecond2);
    expect(instanceSingletonSecond2).to.equal(instanceSingletonSecond0);

    // Not equal val
    expect(instanceSingletonSecond0.val).to.equal(instanceSingletonSecond1.val);
    expect(instanceSingletonSecond1.val).to.equal(instanceSingletonSecond2.val);
    expect(instanceSingletonSecond2.val).to.equal(instanceSingletonSecond0.val);

    // Instance of
    expect(instanceSingletonSecond0).to.be.an.instanceof(MySingletonSecondClass);
    expect(instanceSingletonSecond1).to.be.an.instanceof(MySingletonSecondClass);
    expect(instanceSingletonSecond2).to.be.an.instanceof(MySingletonSecondClass);

    // Val
    expect(instanceSingletonSecond0.val).to.equal(0);
    expect(instanceSingletonSecond1.val).to.equal(0);
    expect(instanceSingletonSecond2.val).to.equal(0);
  });
});
