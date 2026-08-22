# v1.0.1 observability setup

The repository prepares the portfolio for privacy-conscious page analytics, first-party CTA measurement, and Search Console verification. Cloudflare Web Analytics and Search Console still require account-side confirmation before `v1.0.1` is released.

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

The build injects the beacon only when `CF_WEB_ANALYTICS_TOKEN` is present. A missing variable leaves the page-level Web Analytics integration disabled without affecting the site or first-party CTA endpoint.

The CSP allows the documented Web Analytics script and beacon endpoints:

- `script-src`: `https://static.cloudflareinsights.com`
- `connect-src`: `https://cloudflareinsights.com`

References:
- https://developers.cloudflare.com/web-analytics/
- https://developers.cloudflare.com/web-analytics/faq/

## 2. First-party CTA event tracking

CTA measurement uses **Cloudflare Workers Analytics Engine** rather than a third-party analytics destination or unconfigured `zaraz.track()` calls.

The Worker configuration defines the dataset binding:

- Binding: `CTA_EVENTS`
- Dataset: `jc_portfolio_cta_events`
- Endpoint: `POST /api/events`

Cloudflare creates the Analytics Engine dataset automatically on the first successful write.

The browser sends only:

- approved event name
- current page path

The Analytics Engine data point stores:

- `index1`: request hostname (sampling key)
- `blob1`: event name
- `blob2`: page path
- `double1`: `1`

The implementation does **not** write visitor IP, country, user agent, referrer, cookie, session ID, account ID, email address, or other personal identifier to the dataset. Browser event delivery also uses `credentials: omit` and `no-referrer`, and is disabled when Global Privacy Control or Do Not Track is enabled.

### Current event taxonomy

- `contact_view`
- `booking_click`
- `email_click`
- `linkedin_click`
- `freelancer_click`

`resume_download` remains intentionally absent until the résumé is added in v1.1.0.

### Endpoint safeguards

The endpoint:

- accepts `POST` only;
- requires a same-origin `Origin` header;
- requires JSON content;
- rejects oversized or malformed payloads;
- allowlists event names;
- validates page paths;
- returns `204` after a valid non-blocking Analytics Engine write.

Static pages continue to use direct Workers Static Assets handling. `run_worker_first` is scoped only to `/api/events`.

### Verify a test event

After the branch/production deployment containing the Analytics Engine binding is live:

1. Open the deployed site in a browser without GPC/DNT enabled for the test.
2. Trigger one known event, such as **Book a discovery call**.
3. Create a Cloudflare API token with `Account | Account Analytics | Read` permission.
4. Query the Workers Analytics Engine SQL API for the dataset.

Example query:

```sql
SELECT
  blob1 AS event,
  blob2 AS page_path,
  SUM(_sample_interval) AS event_count
FROM jc_portfolio_cta_events
WHERE timestamp > NOW() - INTERVAL '1' HOUR
GROUP BY event, page_path
ORDER BY event_count DESC
```

Cloudflare SQL API endpoint:

`https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql`

Do not commit the Cloudflare API token or account credentials to the repository.

References:
- https://developers.cloudflare.com/analytics/analytics-engine/get-started/
- https://developers.cloudflare.com/workers/examples/analytics-engine/
- https://developers.cloudflare.com/analytics/analytics-engine/sql-api/
- https://developers.cloudflare.com/workers/static-assets/binding/

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
- Cloudflare branch deployment with the first-party event endpoint succeeds.
- One CTA test event is confirmed in `jc_portfolio_cta_events` through the Analytics Engine SQL API.
- Cloudflare Web Analytics beacon loads without CSP violations.
- Page-level analytics appears in the Cloudflare Web Analytics dashboard.
- Search Console URL-prefix property is verified.
- `sitemap-index.xml` is accepted by Search Console.
- Weekly external-link monitoring is available on `main` and has been manually validated once.
- Production smoke test passes after merge.

`v1.0.0` remains immutable at commit `188284077ec29bc31e5c8b1b8030375551f9a783`.
