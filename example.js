'use strict';

const BatchGate = require('./index');

const bg = new BatchGate({
  batchSize: 10
});

bg.onBatch((batch) => {
  console.log('Batch achieved:', batch);
});

for (let i = 0; i < 100; i++) {
  bg.add(i);
}
