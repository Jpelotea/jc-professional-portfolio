# v1.0.1 observability setup

The repository prepares the portfolio for privacy-conscious page analytics and Search Console verification, but account-side activation is intentionally separate from source control.

Production hostname: `https://portfolio.jcpelotea.workers.dev`

## 1. Cloudflare Web Analytics

Cloudflare Web Analytics is used for page-level observability: visits, page views, paths, referrers, performance data, and Core Web Vitals.

### Account-side setup

1. Create or select the Web Analytics site for `portfolio.jcpelotea.workers.dev` in the Cloudflare dashboard.
2. Copy the Web Analytics site token from Cloudflare.
3. Add the following build environment variable to the production Worker build configuration:

   `CF_WEB_ANALYTICS_TOKEN=<site-token>`

4. Deploy the maintenance branch/production build.
5. Confirm page source contains the Cloudflare beacon and that the browser console shows no CSP violation.
6. Confirm a request is sent to Cloudflare RUM (`/cdn-cgi/rum` on a Cloudflare-proxied site or the documented Cloudflare Insights endpoint where applicable).
7. Confirm page data appears in the Cloudflare Web Analytics dashboard before marking the deployment gate complete.

The build injects the beacon only when `CF_WEB_ANALYTICS_TOKEN` is present. A missing variable leaves the site functional and uninstrumented.

The CSP allows the documented Web Analytics script and beacon endpoints:

- `script-src`: `https://static.cloudflareinsights.com`
- `connect-src`: `https://cloudflareinsights.com`

Reference:
- https://developers.cloudflare.com/web-analytics/
- https://developers.cloudflare.com/web-analytics/faq/

## 2. CTA event tracking

CTA events are **not** emitted in v1.0.1 until an actual reporting destination is selected and configured. Calling `zaraz.track()` without a configured destination/action is intentionally avoided.

Approved event taxonomy for the eventual destination:

- `contact_view`
- `booking_click`
- `email_click`
- `linkedin_click`
- `freelancer_click`
- `resume_download` (activate only after the résumé ships)

Before adding client-side event calls:

1. Select a privacy-compatible event destination or first-party endpoint.
2. Configure the destination/action in Cloudflare Zaraz or the chosen analytics system.
3. Send one test event from the branch preview.
4. Confirm the event is received in the destination dashboard.
5. Only then wire the approved production event taxonomy into the site.

Reference:
- https://developers.cloudflare.com/zaraz/web-api/track/

## 3. Google Search Console

Use a URL-prefix property for:

`https://portfolio.jcpelotea.workers.dev/`

### Verification

1. Create the URL-prefix property in Google Search Console.
2. Choose HTML-tag verification and copy only the verification token from the `content` attribute.
3. Add the following production build environment variable:

   `GOOGLE_SITE_VERIFICATION=<verification-token>`

4. Deploy the site.
5. Confirm the homepage source contains the `google-site-verification` meta tag.
6. Complete verification in Search Console.

The tag is injected only on the generated homepage and only when the environment variable is configured.

### Sitemap

After verification, submit:

`https://portfolio.jcpelotea.workers.dev/sitemap-index.xml`

Inspect at minimum:

- `/`
- `/about/`
- `/work/`
- `/work/avodah/`
- `/work/openready/`
- `/work/ice-zeta/`
- `/work/konnevia/`

Sitemap submission is a discovery hint and does not guarantee indexing.

Reference:
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

## 4. v1.0.1 release gates

Do not tag `v1.0.1` until all of the following are complete:

- Repository quality workflow is green.
- Cloudflare beacon loads without CSP violations.
- Page-level analytics appears in the Cloudflare dashboard.
- One CTA test event is received by the selected event destination (after that destination is configured).
- Search Console URL-prefix property is verified.
- `sitemap-index.xml` is accepted by Search Console.
- Weekly external-link monitoring is available on `main` and has been manually validated once.
- Production smoke test passes after merge.

`v1.0.0` remains immutable at commit `188284077ec29bc31e5c8b1b8030375551f9a783`.
