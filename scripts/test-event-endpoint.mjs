import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const writes = [];
const env = {
  CTA_EVENTS: {
    writeDataPoint(point) {
      writes.push(point);
    }
  }
};

const makeRequest = ({
  method = 'POST',
  origin = 'https://portfolio.jcpelotea.workers.dev',
  body = { event: 'booking_click', path: '/' },
  url = 'https://portfolio.jcpelotea.workers.dev/api/events'
} = {}) => new Request(url, {
  method,
  headers: method === 'POST' ? {
    origin,
    'content-type': 'application/json'
  } : { origin },
  body: method === 'POST' ? JSON.stringify(body) : undefined
});

const success = await worker.fetch(makeRequest(), env);
assert.equal(success.status, 204);
assert.equal(writes.length, 1);
assert.deepEqual(writes[0], {
  indexes: ['portfolio.jcpelotea.workers.dev'],
  blobs: ['booking_click', '/'],
  doubles: [1]
});

const invalidEvent = await worker.fetch(makeRequest({ body: { event: 'unknown_event', path: '/' } }), env);
assert.equal(invalidEvent.status, 400);
assert.equal(writes.length, 1);

const crossOrigin = await worker.fetch(makeRequest({ origin: 'https://example.com' }), env);
assert.equal(crossOrigin.status, 403);
assert.equal(writes.length, 1);

const invalidPath = await worker.fetch(makeRequest({ body: { event: 'email_click', path: 'not-a-path' } }), env);
assert.equal(invalidPath.status, 400);
assert.equal(writes.length, 1);

const wrongMethod = await worker.fetch(makeRequest({ method: 'GET' }), env);
assert.equal(wrongMethod.status, 405);
assert.equal(wrongMethod.headers.get('allow'), 'POST');
assert.equal(writes.length, 1);

const unknownRoute = await worker.fetch(makeRequest({ url: 'https://portfolio.jcpelotea.workers.dev/api/other' }), env);
assert.equal(unknownRoute.status, 404);
assert.equal(writes.length, 1);

console.log('First-party CTA event endpoint tests passed.');
