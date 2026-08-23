const ALLOWED_EVENTS = new Set([
  'contact_view',
  'booking_click',
  'email_click',
  'linkedin_click',
  'freelancer_click',
  'resume_download'
]);

const jsonResponse = (body, status) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== '/api/events') {
      return new Response('Not found', {
        status: 404,
        headers: { 'cache-control': 'no-store' }
      });
    }

    if (request.method !== 'POST') {
      return new Response(null, {
        status: 405,
        headers: {
          allow: 'POST',
          'cache-control': 'no-store'
        }
      });
    }

    const origin = request.headers.get('origin');
    if (!origin || origin !== url.origin) {
      return jsonResponse({ error: 'origin_not_allowed' }, 403);
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().startsWith('application/json')) {
      return jsonResponse({ error: 'content_type_not_allowed' }, 415);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (Number.isFinite(contentLength) && contentLength > 1024) {
      return jsonResponse({ error: 'payload_too_large' }, 413);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: 'invalid_json' }, 400);
    }

    const event = typeof payload?.event === 'string' ? payload.event : '';
    const pagePath = typeof payload?.path === 'string' ? payload.path : '';

    if (!ALLOWED_EVENTS.has(event)) {
      return jsonResponse({ error: 'invalid_event' }, 400);
    }

    if (!pagePath.startsWith('/') || pagePath.length > 200 || /[\r\n]/.test(pagePath)) {
      return jsonResponse({ error: 'invalid_path' }, 400);
    }

    env.CTA_EVENTS.writeDataPoint({
      indexes: [url.hostname],
      blobs: [event, pagePath],
      doubles: [1]
    });

    return new Response(null, {
      status: 204,
      headers: {
        'cache-control': 'no-store'
      }
    });
  }
};
