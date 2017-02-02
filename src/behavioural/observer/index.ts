'use strict';

export abstract class Subject {
  private _observers: Observer[] = [];

  /**
   * Attach new observer
   * @param  {Observer} observer
   * 
   * @return {this}
   */
  attach(observer: Observer): this {
    const index = this._observers.indexOf(observer);

    if (!~index) {
      this._observers.push(observer);
    }

    return this;
  }

  /**
   * Detach observer
   * 
   * @param  {Observer} observer
   * 
   * @return {this}
   */
  detach(observer: Observer): this {
    const index = this._observers.indexOf(observer);

    if (~index) {
      this._observers.splice(index, 1);
    }

    return this;
  }

  /**
   * Notify all observers
   * 
   * @return {this}
   */
  notify(): this {
    this._observers.forEach((observer, index) =>
      observer.update(this, index));

    return this;
  }
}

export abstract class Observer {
  /**
   * Update observer with new subject
   * 
   * @param  {Subject} subject
   * @param  {number}  index   index of observer
   * 
   * @return {this}
   */
  abstract update(subject: Subject, index: number): this;
}
