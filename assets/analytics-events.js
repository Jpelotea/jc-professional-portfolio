(() => {
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === '1') return;

  const endpoint = '/api/events';

  const track = (event) => {
    const body = JSON.stringify({ event, path: window.location.pathname });

    void fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      credentials: 'omit',
      cache: 'no-store',
      keepalive: true,
      referrerPolicy: 'no-referrer'
    }).catch(() => {
      // Measurement must never interfere with navigation or page behavior.
    });
  };

  const eventForLink = (anchor) => {
    const rawHref = anchor.getAttribute('href') || '';
    if (rawHref.startsWith('mailto:')) return 'email_click';

    let url;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return null;
    }

    if (url.origin === window.location.origin && url.pathname === '/resume/jc-pelotea-resume.pdf') {
      return 'resume_download';
    }

    const host = url.hostname.toLowerCase();
    if (host === 'calendar.app.google') return 'booking_click';
    if (host === 'linkedin.com' || host.endsWith('.linkedin.com')) return 'linkedin_click';
    if (host === 'freelancer.com' || host.endsWith('.freelancer.com')) return 'freelancer_click';
    return null;
  };

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const analyticsEvent = eventForLink(anchor);
    if (analyticsEvent) track(analyticsEvent);
  });

  const contact = document.querySelector('#contact');
  if (!(contact instanceof HTMLElement) || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    track('contact_view');
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20% 0px'
  });

  observer.observe(contact);
})();
