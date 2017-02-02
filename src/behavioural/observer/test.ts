'use strict';
/** Imports */
import '../../test/helper';

import * as chai                from 'chai';


import { Subject, Observer }    from '.';


/** Init */
const { expect } = chai;

describe('behavioural', function () {
  describe('observer', function () {
    it('should work', function () {
      let updated = false;

      class MySubject extends Subject { }

      class MyObserver extends Observer {
        update(subject: MySubject, index: number): this {
          updated = true;

          return this;
        }
      }

      const subject = new MySubject();

      const observer = new MyObserver();

      subject
        .attach(observer);

      subject.notify();

      expect(updated).to.be.true;
    });

    it('should support multi observers', function () {
      const messages = [];

      class MySubject extends Subject {
        message: string;

        constructor(message: string) {
          super();

          this.message = message;
        }

        send(): this {
          // send message to server

          this.notify();

          return this;
        }
      }

      class MyObserver extends Observer {
        name: string;

        constructor(name: string) {
          super();

          this.name = name;
        }

        update(subject: MySubject, index: number): this {
          messages.push({
            index,
            name: this.name,
            message: subject.message
          });

          return this;
        }
      }

      const subject = new MySubject('Task done');

      const observerSteven = new MyObserver('Steven');
      const observerGreg   = new MyObserver('Greg');
      const observerRose   = new MyObserver('Rose');

      subject
        .attach(observerSteven)
        .attach(observerGreg)
        .attach(observerRose);

      subject.send();

      expect(messages).to.eql([{
        index: 0,
        message: 'Task done',
        name: 'Steven'
      }, {
        index: 1,
        message: 'Task done',
        name: 'Greg'
      }, {
        index: 2,
        message: 'Task done',
        name: 'Rose'
      }]);
    });

    it('should support notify multi subject', function () {
      const messages = [];

      class MySubject extends Subject {
        message: string;

        constructor(message: string) {
          super();

          this.message = message;
        }

        send(): this {
          // send message to server

          this.notify();

          return this;
        }
      }

      class MyObserver extends Observer {
        update(subject: MySubject, index: number): this {
          messages.push({
            index,
            message: subject.message
          });

          return this;
        }
      }

      const subject0 = new MySubject('Task done');
      const subject1 = new MySubject('Site updated');
      const subject2 = new MySubject('Commit pushed');
      const subject3 = new MySubject('Database dropped');

      const observer = new MyObserver();

      subject0
        .attach(observer);

      subject1
        .attach(observer);

      subject2
        .attach(observer);

      subject3
        .attach(observer);

      subject0.send();
      subject1.send();
      subject2.send();
      subject3.send();

      expect(messages).to.eql([{
        message: 'Task done',
        index: 0
      }, {
        message: 'Site updated',
        index: 0
      }, {
        message: 'Commit pushed',
        index: 0
      }, {
        message: 'Database dropped',
        index: 0 
      }]);
    });

    it('should support detach observers', function () {
      const messages = [];

      class MySubject extends Subject {
        message: string;

        constructor(message: string) {
          super();

          this.message = message;
        }

        send(): this {
          // send message to server

          this.notify();

          return this;
        }
      }

      class MyObserver extends Observer {
        name: string;

        constructor(name: string) {
          super();

          this.name = name;
        }

        update(subject: MySubject, index: number): this {
          messages.push({
            index,
            name: this.name,
            message: subject.message
          });

          return this;
        }
      }

      const subject = new MySubject('Task done');

      const observerSteven = new MyObserver('Steven');
      const observerGreg   = new MyObserver('Greg');
      const observerRose   = new MyObserver('Rose');

      subject
        .attach(observerSteven)
        .attach(observerGreg)
        .attach(observerRose);

      subject
        .detach(observerGreg);

      subject.send();

      expect(messages).to.eql([{
        index: 0,
        message: 'Task done',
        name: 'Steven'
      }, {
        index: 1,
        message: 'Task done',
        name: 'Rose'
      }]);
    });
  });
});
