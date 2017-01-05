'use strict';

const EventEmitter = require('events');

const CONSTANTS = require('./constants');

// This establishes a private namespace.
const batchGateNamespace = new WeakMap();
function p(object) {
  if (!batchGateNamespace.has(object)) batchGateNamespace.set(object, {});
  return batchGateNamespace.get(object);
}



/**
 *
 */
class BatchGate {
  /**
   *
   */
  constructor(config) {
    p(this).emitter = new EventEmitter();
    p(this).batchSize = config.batchSize || CONSTANTS.DEFAULT.batchSize;

    p(this).queue = [];
    p(this).count = 0;
  }


  /**
   *
   */
  onBatch(callback) {
    p(this).emitter.on('batch', callback);
  }


  /**
   *
   */
  add(item) {
    p(this).queue.push(item);
    p(this).count++;
    if ((p(this).count % p(this).batchSize) === 0) {
      const queue = p(this).queue;
      p(this).queue = [];
      p(this).emitter.emit('batch', queue);
    };
  }
}

module.exports = BatchGate;
