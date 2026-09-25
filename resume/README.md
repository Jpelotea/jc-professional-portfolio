# Public résumé maintenance

Both résumé destinations in `src/site.config.ts` are currently null. Home and About use the optional operations destination; `/frontend/` uses the optional frontend destination. Contact alternatives remain available while documents are absent.

The former employer-specific `jc-pelotea-resume.pdf` is no longer intentionally published. Do not restore it as a general résumé. Removing the current file does not erase previously public Git history or downloaded copies; do not rewrite history.

Future approved public PDFs belong in `public/resume/`, for example `jc-pelotea-operations-resume.pdf` and `jc-pelotea-frontend-resume.pdf`. Do not add placeholders. Everything in `public/` is publishable even when its config destination is null; application-specific documents must stay outside public assets and this public repository.

Activate an approved document, its correct configuration destination, link/file checks, and necessary download analytics compatibility in the same release. The current analytics matcher recognizes only the retired path and must be updated when new downloads are enabled.

`build-cloudflare.sh` clears stale generated résumé output before building, does not copy this legacy directory, and checks prepared output with `node scripts/check-resume-publication.mjs`. Never edit `dist` as the source of a fix.
