'use strict';

export interface IEvent {
  [name: string]: Function[];
}

export default class PubSub {
  private _events: IEvent = {};

  on(name: string, handler: Function): this {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    const index = this._events[name].indexOf(handler);

    if (!~index) {
      this._events[name].push(handler);
    }

    return this;
  }

  off(name: string, handler: Function): this {
    if (!this._events[name]) {
      return this;
    }


    const index = this._events[name].indexOf(handler);

    if (~index) {
      this._events[name].splice(index, 1);
    }

    return this;
  }

  emit(name: string, ...args: any[]): this {
    if (!this._events[name]) {
      return this;
    }

    this._events[name].forEach((handler) => handler(...args));

    return this;
  }
}
