'use strict';
/** Imports */
import '../../test/helper';

import * as chai                from 'chai';


import PubSub                   from '.';


/** Init */
const { expect } = chai;

describe('behavioural', function () {
  describe('publish–subscribe', function () {
    it('should work', function () {
      const ee = new PubSub();

      let pinged = false;
      ee.on('ping', () => {
        pinged = true;
      });

      ee.emit('ping');

      expect(pinged).to.be.true;
    });

    it('should support argumends', function () {
      const ee = new PubSub();

      let arg0;
      let arg1;
      let arg2;
      let len;
      ee.on('message', function (a, b, c) {
        arg0 = a;
        arg1 = b;
        arg2 = c;

        len = arguments.length;
      });

      ee.emit('message', 0, 1, 2);

      expect(arg0).to.equal(0);
      expect(arg1).to.equal(1);
      expect(arg2).to.equal(2);
      expect(len).to.equal(3);
    });

    it('should ignore emit nonexistent topic', function () {
      const ee = new PubSub();

      const messages = [];

      ee.on('error', (messages) => messages.push(messages));

      ee.emit('message');

      expect(messages).to.eql([]);
    });

    it('should ignore same handlers on one topic', function () {
      const ee = new PubSub();

      const messages = [];

      const firstHandler = function (message) {
        messages.push({
          message,
          name: 'first'
        });
      };
      const secondHandler = function (message) {
        messages.push({
          message,
          name: 'second'
        });
      };

      ee.on('message', firstHandler);
      ee.on('message', firstHandler);
      ee.on('message', firstHandler);
      ee.on('message', firstHandler);
      ee.on('message', firstHandler);
      ee.on('message', secondHandler);

      ee.emit('message', 'hello world');


      expect(messages).to.eql([{
        message: 'hello world',
        name: 'first'
      }, {
        message: 'hello world',
        name: 'second'
      }]);
    });

    it('should support multi handlers', function () {
      const ee = new PubSub();

      const messages = [];

      ee.on('message', (message) => messages.push({
        message,
        index: 0
      }));

      ee.on('message', (message) => messages.push({
        message,
        index: 1
      }));

      ee.on('message', (message) => messages.push({
        message,
        index: 2
      }));

      ee.emit('message', 'hello');

      expect(messages).to.eql([{
        index: 0,
        message: 'hello'
      }, {
        index: 1,
        message: 'hello'
      }, {
        index: 2,
        message: 'hello'
      }]);
    });

    it('should support multi topics', function () {
      const ee = new PubSub();

      const topicErrors = [];
      const topicMessages = [];
      const topicConnects = [];

      /** On */
      ee.on('topicErrors', (message) => topicErrors.push(message));
      ee.on('topicMessages', (message) => topicMessages.push(message));
      ee.on('topicConnects', (message) => topicConnects.push(message));

      /** Emit */
      ee.emit('topicConnects', 'user#0');

      ee.emit('topicErrors', 'first error');

      ee.emit('topicConnects', 'user#2');
      ee.emit('topicMessages', 'hello there');
      ee.emit('topicMessages', 'hello world');

      ee.emit('topicErrors', 'second error');


      expect(topicErrors).to.eql([
        'first error',
        'second error'
      ]);
      expect(topicMessages).to.eql([
        'hello there',
        'hello world'
      ]);
      expect(topicConnects).to.eql([
        'user#0',
        'user#2'
      ]);
    });

    it('should support `#off()` method', function () {
      const ee = new PubSub();

      const messages = [];

      const firstHandler = function (message) {
        messages.push({
          message,
          name: 'first'
        });
      };
      const secondHandler = function (message) {
        messages.push({
          message,
          name: 'second'
        });
      };
      const thirdHandler = function (message) {
        messages.push({
          message,
          name: 'third'
        });
      };

      ee.on('message', firstHandler);
      ee.on('message', secondHandler);
      ee.on('message', thirdHandler);

      ee.off('message', secondHandler);

      ee.emit('message', 'hello world');


      expect(messages).to.eql([{
        message: 'hello world',
        name: 'first'
      }, {
        message: 'hello world',
        name: 'third'
      }]);
    });

    it('should ignore `#off()` method for nonexistent handlers', function () {
      const ee = new PubSub();

      const messages = [];

      const firstHandler = function (message) {
        messages.push({
          message,
          name: 'first'
        });
      };
      const secondHandler = function (message) {
        messages.push({
          message,
          name: 'second'
        });
      };

      ee.on('message', firstHandler);

      ee.off('message', secondHandler);

      ee.emit('message', 'hello world');


      expect(messages).to.eql([{
        message: 'hello world',
        name: 'first'
      }]);
    });

    it('should `#off()` handler only from one topic', function () {
      const ee = new PubSub();

      const messages = [];

      /** Handlers */
      const firstHandler = function (message) {
        messages.push({
          message,
          name: 'first'
        });
      };
      const secondHandler = function (message) {
        messages.push({
          message,
          name: 'second'
        });
      };

      /** On */
      ee.on('topicErrors', firstHandler);
      ee.on('topicMessages', firstHandler);

      ee.on('topicErrors', secondHandler);
      ee.on('topicMessages', secondHandler);

      /** Off */
      ee.off('topicErrors', secondHandler);

      /** Emit */
      ee.emit('topicErrors', 'first error');
      ee.emit('topicMessages', 'hello world');


      expect(messages).to.eql([{
        message: 'first error',
        name: 'first'
      }, {
        message: 'hello world',
        name: 'first'
      }, {
        message: 'hello world',
        name: 'second'
      }]);
    });
  });
});
