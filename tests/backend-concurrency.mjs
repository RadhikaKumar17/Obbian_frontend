// Exercises the actual store's compare-and-swap retry path with a shared MongoDB test double.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const backend = new URL('../../OBBIAN_BACKEND/', import.meta.url);
const { createService } = await import(new URL('src/service.js', backend));
const seed = JSON.parse(await readFile(new URL('data/seed.json', backend), 'utf8'));
let document = { _id: 'state', data: seed };
let conflicts = 0;
const collection = {
  async findOne() { return structuredClone(document); },
  async updateOne(filter, update) {
    if ((filter.revision ?? null) !== (document.revision ?? null)) { conflicts++; return { matchedCount: 0 }; }
    document = { ...document, data: structuredClone(update.$set.data), revision: (document.revision ?? 0) + 1 };
    return { matchedCount: 1 };
  },
};
globalThis.__testMongoClient = class {
  async connect() {}
  db() { return { collection: () => collection }; }
  async close() {}
};
const source = (await readFile(new URL('src/store.js', backend), 'utf8')).replace("import { MongoClient } from 'mongodb';", 'const MongoClient = globalThis.__testMongoClient;');
const { createStore } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const first = await createStore('test', new URL('data/seed.json', backend));
const second = await createStore('test', new URL('data/seed.json', backend));
const a = createService(first), b = createService(second);
const car = seed.vehicles.find(v => v.available);
const input = { vehicleId: car.id, date: a.config().defaultDate, termsAccepted: true, paymentMethod: seed.config.paymentMethods[0].value, name: 'Test User', mobile: '9876543210', licence: 'DL-TEST1234' };
const results = await Promise.allSettled([a.createBooking('owner-a', input, 'request-first'), b.createBooking('owner-b', input, 'request-second')]);
assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
assert.equal(results.find(r => r.status === 'rejected').reason.status, 409);
assert(conflicts > 0, 'Expected a revision conflict and retry');
assert.equal(document.data.bookings.filter(v => v.vehicleId === car.id && v.date === input.date).length, 1);
delete globalThis.__testMongoClient;
console.log('PASS: independent stores retry revision conflicts and prevent duplicate reservations (MongoDB test double)');
