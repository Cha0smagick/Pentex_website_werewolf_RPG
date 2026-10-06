/* Authoring aid. Emits the static public HTML pages with the shared masthead
   and footer baked in, so the eight pages cannot drift apart.
   Run once:  node tools/build_pages.mjs
   Output is plain HTML committed to the repo. GitHub Pages serves it as-is;
   there is no build step at deploy time. */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const NAV = [
  ['index.html', 'Group'],
  ['about.html', 'About'],
  ['leadership.html', 'Leadership'],
  ['facilities.html', 'Facilities'],
  ['sustainability.html', 'Sustainability'],
  ['careers.html', 'Careers'],
  ['newsroom.html', 'Newsroom'],
  ['contact.html', 'Contact']
];

function page({ file, title, description, active, body, breach, noData }) {
  const nav = NAV.map(
    ([href, label]) =>
      `      <a href="${href}"${href === active ? ' aria-current="page"' : ''}>${label}</a>`
  ).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="icon" href="assets/img/LogoPentex.webp" type="image/webp">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/${breach ? 'breach' : 'corporate'}.css">
</head>
<body class="${breach ? 'breach' : 'corp'}" data-page="${active ? active.replace('.html', '') : 'index'}">
<a class="skip" href="#main">Skip to content</a>
${breach ? '' : `<header class="masthead">
  <div class="shell masthead__in">
    <a class="brand" href="index.html">
      <img class="brand__mark" src="assets/img/LogoPentex.webp" width="150" height="30" alt="Pentex">
      <span class="brand__word">Industries Worldwide</span>
    </a>
    <button class="masthead__burger" type="button" aria-expanded="false" aria-controls="mastnav">
      <span class="u-hidden">Menu</span>
    </button>
    <nav class="masthead__nav" id="mastnav" aria-label="Primary">
${nav}
      <a class="masthead__cta" href="portal.html">Restricted</a>
    </nav>
  </div>
</header>`}
<main id="main">
${body}
</main>
${breach ? '' : `<footer class="foot">
  <div class="shell">
    <div class="foot__grid">
      <div>
        <h4>Pentex Industries Worldwide, Inc.</h4>
        <p>One Pentex Plaza, Manhattan, New York, United States.</p>
        <p>Registered in Delaware. Listed NYSE: PTX.</p>
      </div>
      <div>
        <h4>Group</h4>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="leadership.html">Leadership</a></li>
          <li><a href="facilities.html">Facilities</a></li>
        </ul>
      </div>
      <div>
        <h4>Public record</h4>
        <ul>
          <li><a href="sustainability.html">Sustainability</a></li>
          <li><a href="newsroom.html">Newsroom</a></li>
          <li><a href="careers.html">Careers</a></li>
        </ul>
      </div>
      <div>
        <h4>Restricted</h4>
        <ul>
          <li><a href="portal.html">Employee portal</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <p class="foot__base">© <span data-year>2026</span> Pentex Industries Worldwide, Inc. All rights reserved. <span class="u-mono">PTX-IR-0001</span></p>
    <p class="foot__legal">This is a work of fiction. Pentex, the Aurelian Combine and every person, place and programme named on this site are inventions for the White Wolf role-playing game <cite>Werewolf: The Apocalypse</cite>. Any resemblance to an actual company, spill, animal, or crime is a failure of the author's imagination rather than a libellous one.</p>
  </div>
</footer>`}
${noData ? '' : `<script src="assets/js/data.js"></script>
<script src="assets/js/site.js"></script>`}
</body>
</html>
`;
}

const FIG = (src, alt, caption) => `      <figure class="fig">
        <img src="assets/img/${src}.webp" width="1280" height="720" loading="lazy" alt="${alt}">
        <figcaption>${caption}</figcaption>
      </figure>`;

const PAGES = [
  {
    file: 'about.html',
    active: 'about.html',
    title: 'About Pentex — mission, values and the long horizon',
    description:
      'The Pentex group mission, vision, published values and four-part strategy. Founded 1898, reorganised under the Pentex Charter in 1934, 148,000 employees in 61 countries.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">About the group</p>
      <h1>One hundred and twenty-eight years, stated plainly.</h1>
      <p>Pentex has been an industrial company since 1898. It has changed its products four times and its values none.</p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Mission</p>
        <h2>The statement, in five lines.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--2">
        <div>
          <p class="lede">Adopted 2011. Unamended since. Reproduced here in full because the Board believes the statement is meaningless without its exact wording.</p>
          <dl class="deflist">
            <dt>Incorporation</dt><dd id="incorporation"></dd>
            <dt>Founding combine</dt><dd id="founded-by"></dd>
          </dl>
        </div>
        <ol class="prose" id="mission"></ol>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Vision</p>
        <h2>Where the group is going.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--2">
        <p class="lede">The vision statement is not aspirational language. It is a description of the terminal condition the group intends to occupy.</p>
${FIG('lab-sterile', 'A clean-room laboratory at Pentex BioSynth, lit from above, with stainless benches and glassware.', 'BioSynth pilot plant, Manaus. The group’s oldest active clean room, in service since 1974.')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Values</p>
        <h2>Five, in order of authority.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--3" id="values"></div>
      <div class="strip u-mt">
        <b>Group Credential Standard CS-2004-11.</b>
        <span id="credential-standard"></span>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Strategy</p>
        <h2>Four moves, in sequence.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--4" id="strategy"></div>
    </div>
  </section>`
  },

  {
    file: 'leadership.html',
    active: 'leadership.html',
    title: 'Leadership — Board and executive committee',
    description:
      'The Pentex board of directors and group executive committee, with role, tenure, site and accountability room for each director.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Leadership</p>
      <h1>The people accountable for it.</h1>
      <p>Names, roles and accountability rooms for directors and officers. Accountability rooms are published so that correspondence reaches the correct desk the first time.</p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
${FIG('boardroom', 'An empty boardroom with a long dark table, each place set with a folder and a glass of water.', 'The Pentex boardroom, sub-level 4, One Pentex Plaza. The sub-level is not included in the public floor plan.')}
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Board of directors</p>
        <h2>Six seats, four of them long-tenured.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--3" id="board"></div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Group executive committee</p>
        <h2>Officers of the group.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--3" id="execs"></div>
      <p class="u-mt">Directors and officers not listed here are not published. The group publishes the accountability chain, not the whole chain.</p>
    </div>
  </section>`
  },

  {
    file: 'facilities.html',
    active: 'facilities.html',
    title: 'Facilities — nine principal sites',
    description:
      'Principal Pentex facilities worldwide: New York, Manaus, Bogotá, Nairobi, Novosibirsk, Houston, Jurong Island, Calgary and Anchorage, with opening date, headcount and footprint.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Facilities</p>
      <h1>Nine principal sites.</h1>
      <p>The group operates forty-one principal facilities. These nine carry the majority of headcount, capital value and regulatory attention.</p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Site register</p>
        <h2>Opening date, headcount, footprint.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--3" id="sites"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="grid grid--3">
${FIG('datacentre', 'Rows of dark server racks in a cold aisle, lit by a single line of ceiling light.', 'Group operations centre, Houston.')}
${FIG('refinery-night', 'A petrochemical plant at night, stacks lit from below against a dark sky.', 'PetroChem, Houston. Continuous operation since 1951.')}
${FIG('amazon-canopy', 'Dense closed-canopy rainforest seen from above at low altitude, with a river visible through the trees.', 'Concession perimeter, Manaus. Area shown is approximately one twentieth of the group’s total Amazonian holding.')}
      </div>
    </div>
  </section>`
  },

  {
    file: 'sustainability.html',
    active: 'sustainability.html',
    title: 'Sustainability — registered programmes and retired volume',
    description:
      'Pentex registered environmental programmes, the group strategy for carbon retirement, and the public record of announced retirement volumes.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Sustainability</p>
      <h1>Measured, instrumented, retired.</h1>
      <p id="sustainability-lede"></p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Registered programmes</p>
        <h2>Six programmes, six reporting sites.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--3" id="programmes"></div>
      <p class="u-mt">Programme dossiers are maintained under controlled access and released to accredited assessors on written request. Assessors should allow eight weeks.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="grid grid--2">
        <div>
          <div class="section__head">
            <p class="eyebrow">Method</p>
            <h2>How the retirement is measured.</h2>
            <p class="rule-heavy"></p>
          </div>
          <div class="grid grid--1" id="strategy"></div>
        </div>
${FIG('amazon-river', 'A wide brown river winding through continuous rainforest, seen from a high bank at dawn.', 'The Rio Vermelho, Manaus. Sampling is performed at four points between the plant outfall and the Ibara municipal intake.')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Public record</p>
        <h2>Announced retirement volumes.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--2" id="releases"></div>
    </div>
  </section>`
  },

  {
    file: 'careers.html',
    active: 'careers.html',
    title: 'Careers — certification and accountability directory',
    description:
      'Open roles at Pentex Industries Worldwide and the published certification and accountability directory of desks, room numbers and badge identifiers.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Careers</p>
      <h1>Join the largest chemistry group on earth.</h1>
      <p>148,000 people, 61 countries, forty-one facilities. We hire slowly, we publish our accountability chain, and we do not answer questions about the chain.</p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Certification directory</p>
        <h2>Desks, rooms, badge identifiers.</h2>
        <p class="rule-heavy"></p>
      </div>
      <p class="lede" id="directory-hint"></p>
      <table class="dtable">
        <caption>Accountable officers and directors, by desk. Published under the group’s assessor-access policy.</caption>
        <thead>
          <tr><th scope="col">Desk</th><th scope="col">Role</th><th scope="col">Department</th><th scope="col">Site</th><th scope="col">Badge</th><th scope="col">Mailbox</th></tr>
        </thead>
        <tbody id="directory"></tbody>
      </table>
      <div class="strip u-mt">
        <b>Badge policy.</b> <span id="badge-policy"></span>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="grid grid--2">
        <div>
          <div class="section__head">
            <p class="eyebrow">How we hire</p>
            <h2>Four stages, no take-home project.</h2>
            <p class="rule-heavy"></p>
          </div>
          <div class="prose">
            <p><b>1. Application.</b> Read. Every application is read by a person in the hiring department, not by a filter. The filter exists; the person reads what survives it.</p>
            <p><b>2. Desk interview.</b> With the officer accountable for the desk you would occupy. Ask for their accountability room number. If they decline, that is a normal answer and not a red flag.</p>
            <p><b>3. Technical.</b> Paid. We pay for every take-home exercise at the going local rate, whether or not you pass, and we do not reuse your work.</p>
            <p><b>4. Offer.</b> Issued in writing, with the desk number, the badge identifier and the reporting line printed on it.</p>
          </div>
        </div>
${FIG('press-conference', 'A corporate press event seen from the back of the room, with a lit lectern and a bank of microphones.', 'Group communications, One Pentex Plaza.')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="strip">
        <b>Everything else.</b> Badge identifiers, desk numbers and site addresses for roles the group does not advertise are available from <span class="u-mono">corporate.secretariat@pentex.example</span> on written request.
      </div>
    </div>
  </section>`
  },

  {
    file: 'newsroom.html',
    active: 'newsroom.html',
    title: 'Newsroom — public record',
    description:
      'Pentex Industries Worldwide announcements and public record: press releases, award citations and the media contact route.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Newsroom</p>
      <h1>Public record.</h1>
      <p>Announcements issued by the group and by its divisions. Full texts of every item below are held under controlled access; this page carries the headline and the opening paragraph only.</p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Announcements</p>
        <h2>Most recent first.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--2" id="releases"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="grid grid--2">
        <div>
          <div class="section__head">
            <p class="eyebrow">Index</p>
            <h2>Everything on this page.</h2>
            <p class="rule-heavy"></p>
          </div>
          <ol class="prose" id="release-index"></ol>
        </div>
${FIG('press-conference', 'A corporate press event seen from the back of the room, with a lit lectern and a bank of microphones.', 'Group communications, One Pentex Plaza.')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="strip">
        <b>Media.</b> <span id="press-contact"></span> The group does not answer technical questions from journalists. Technical questions are answered by the division that owns the molecule, in writing, on the record.
      </div>
    </div>
  </section>`
  },

  {
    file: 'contact.html',
    active: 'contact.html',
    title: 'Contact — divisions, head offices and site addresses',
    description:
      'Contact routes for Pentex Industries Worldwide: division head offices, division mailbox, group headquarters and the full site address register.',
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Contact</p>
      <h1>Where to write.</h1>
      <p id="hq-line"></p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Divisions</p>
        <h2>Six head offices.</h2>
        <p class="rule-heavy"></p>
      </div>
      <div class="grid grid--3" id="div-contacts"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="shell">
      <div class="section__head">
        <p class="eyebrow">Site register</p>
        <h2>Addresses for all nine principal sites.</h2>
        <p class="rule-heavy"></p>
      </div>
      <table class="dtable">
        <caption>Principal site addresses. Courier deliveries are accepted at the site gatehouse only.</caption>
        <thead>
          <tr><th scope="col">Site</th><th scope="col">City</th><th scope="col">Division</th><th scope="col">Opened</th><th scope="col">Staff</th></tr>
        </thead>
        <tbody id="site-addresses"></tbody>
      </table>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="grid grid--2">
${FIG('hq-tower', 'Pentex House at dusk, seen across the plaza from the river.', 'One Pentex Plaza, Manhattan. Sub-levels 1 through 4 are not in the public address format.')}
        <div>
          <div class="section__head">
            <p class="eyebrow">Assessor access</p>
            <h2>For accredited assessors.</h2>
            <p class="rule-heavy"></p>
          </div>
          <div class="prose">
            <p>Accredited environmental and safety assessors may request programme dossiers, site reports and personnel records by writing to the group secretariat with their accreditation number and scope.</p>
            <p>Requests are logged. Assessors are asked to allow eight weeks. Requests for material older than ten years are referred to counsel.</p>
            <p>Assessors who reach sub-level 4 unescorted should contact the security desk and provide their accreditation number, so that the visit is recorded correctly.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`
  },

  {
    file: '404.html',
    active: '404.html',
    title: 'Not found — Pentex Industries Worldwide',
    description: 'That page is not in the group address register.',
    noData: true,
    body: `  <section class="pagehead">
    <div class="shell">
      <p class="eyebrow">Error 404</p>
      <h1>Not in the address register.</h1>
      <p>The page you asked for is not published. Pentex publishes a deliberately incomplete web presence; a 404 here is frequently deliberate.</p>
    </div>
  </section>

  <section class="section">
    <div class="shell">
      <div class="grid grid--3">
        <article class="card">
          <p class="card__k">01</p>
          <h3>Try the group index</h3>
          <p>Every published page is reachable from the masthead. Nothing is hidden behind an unlinked path.</p>
          <p><a class="btn btn--quiet" href="index.html">Group</a></p>
        </article>
        <article class="card">
          <p class="card__k">02</p>
          <h3>Try the site register</h3>
          <p>If you were looking for a facility, the register carries all nine principal addresses.</p>
          <p><a class="btn btn--quiet" href="facilities.html">Facilities</a></p>
        </article>
        <article class="card">
          <p class="card__k">03</p>
          <h3>Try the portal</h3>
          <p>If you were sent a link by a colleague, the restricted portal is the only part of the group site that is not indexed.</p>
          <p><a class="btn btn--quiet" href="portal.html">Restricted</a></p>
        </article>
      </div>
    </div>
  </section>`
  }
];

for (const spec of PAGES) {
  writeFileSync(join(ROOT, spec.file), page(spec), 'utf8');
}

process.stdout.write('wrote ' + PAGES.length + ' pages\n');