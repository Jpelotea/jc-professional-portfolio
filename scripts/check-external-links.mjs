import { appendFile } from 'node:fs/promises';
import process from 'node:process';

const links = [
  { name: 'Discovery call', url: 'https://calendar.app.google/Y2ZHPjRLXgX4YoJu5', policy: 'soft' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jcpelotea', policy: 'soft' },
  { name: 'GitHub profile', url: 'https://github.com/Jpelotea', policy: 'strict' },
  { name: 'Freelancer', url: 'https://www.freelancer.com/u/Jpel23', policy: 'soft' },
  { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?phone=639927190779', policy: 'soft' },
  { name: 'Avodah website', url: 'https://avodahwealthadvisory.netlify.app/', policy: 'strict' },
  { name: 'OpenReady', url: 'https://getopenready.netlify.app', policy: 'strict' },
  { name: 'OpenReady repository', url: 'https://github.com/Jpelotea/openready', policy: 'strict' },
  { name: 'ICE Zeta website', url: 'https://jcpelotea.wixsite.com/zeta', policy: 'strict' },
  { name: 'Konnevia preview', url: 'https://konnevia.pages.dev', policy: 'strict' }
];

const softChallengeStatuses = new Set([401, 403, 405, 408, 409, 425, 429, 999]);
const attempts = 3;

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function request(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    return await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'JC-Pelotea-Portfolio-Link-Monitor/1.0 (+https://portfolio.jcpelotea.workers.dev/)'
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

const results = [];

for (const link of links) {
  let lastStatus = null;
  let lastError = null;
  let passed = false;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await request(link.url);
      lastStatus = response.status;
      if (response.status >= 200 && response.status < 400) {
        passed = true;
        break;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    if (attempt < attempts) await sleep(attempt * 1000);
  }

  if (passed) {
    results.push({ ...link, state: 'pass', detail: `HTTP ${lastStatus}` });
    continue;
  }

  const isExpectedChallenge = link.policy === 'soft' && lastStatus !== null && softChallengeStatuses.has(lastStatus);
  results.push({
    ...link,
    state: link.policy === 'soft' ? 'warning' : 'fail',
    detail: isExpectedChallenge ? `bot-sensitive response HTTP ${lastStatus}` : (lastError || 'request failed')
  });
}

const markdown = [
  '## External link monitor',
  '',
  '| Destination | Policy | Result | Detail |',
  '| --- | --- | --- | --- |',
  ...results.map((result) => {
    const icon = result.state === 'pass' ? '✅' : result.state === 'warning' ? '⚠️' : '❌';
    return `| ${result.name} | ${result.policy} | ${icon} ${result.state} | ${result.detail} |`;
  }),
  '',
  '_Soft destinations are known to use bot challenges or rate limiting. They are surfaced for human review but do not fail the monitor. Strict project destinations must return a successful HTTP response. App-only protocol links such as the personal Viber deep link are validated manually because they are not HTTP endpoints._',
  ''
].join('\n');

console.log(markdown);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, markdown);

const strictFailures = results.filter((result) => result.state === 'fail');
if (strictFailures.length) {
  console.error(`${strictFailures.length} strict external destination${strictFailures.length === 1 ? '' : 's'} failed after ${attempts} attempts.`);
  process.exit(1);
}

const warnings = results.filter((result) => result.state === 'warning');
if (warnings.length) console.warn(`${warnings.length} soft destination${warnings.length === 1 ? '' : 's'} require human review.`);
