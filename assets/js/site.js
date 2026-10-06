/* Pentex Industries Worldwide, Inc. — public site renderer.
   Reads window.PENTEX (assets/js/data.js) and fills the placeholders in each
   page. No build step, no framework, no dependencies. */
(function () {
  'use strict';

  var P = window.PENTEX;

  /* ---------- tiny DOM helpers ---------- */

  function $(id) {
    return document.getElementById(id);
  }

  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  function fill(id, nodes) {
    var host = $(id);
    if (!host) return;
    nodes.forEach(function (n) {
      host.appendChild(n);
    });
  }

  function badge(mail) {
    return String(mail || '').split('@')[0];
  }

  function city(siteId) {
    var s = P.SITES.filter(function (x) {
      return x.id === siteId;
    })[0];
    return s ? s.city : siteId;
  }

  function siteName(siteId) {
    var s = P.SITES.filter(function (x) {
      return x.id === siteId;
    })[0];
    return s ? s.name : siteId;
  }

  function publicPeople(list) {
    return list.filter(function (p) {
      return p.public;
    });
  }

  /* ---------- shared partials ---------- */

  function personCard(p) {
    var c = h('article', 'card person');
    c.appendChild(h('p', 'person__id', p.name));
    var r = h('p', 'person__role');
    r.appendChild(h('b', null, p.role));
    if (p.site) r.appendChild(document.createTextNode(' — ' + siteName(p.site)));
    c.appendChild(r);
    var d = h('dl', 'deflist');
    [['Since', p.since], ['Room', p.room], ['Badge', badge(p.mail)], ['Site', p.site ? siteName(p.site) : null]].forEach(function (pair) {
      if (!pair[1]) return;
      d.appendChild(h('dt', null, pair[0]));
      d.appendChild(h('dd', null, pair[1]));
    });
    c.appendChild(d);
    if (p.mail) {
      var m = h('p', 'person__note');
      m.appendChild(h('span', 'u-mono', p.mail));
      c.appendChild(m);
    }
    return c;
  }

  function releaseList(files) {
    return files.map(function (f) {
      var a = h('article', 'release');
      var meta = h('p', 'release__meta');
      meta.appendChild(h('b', null, f.date));
      meta.appendChild(document.createTextNode(' · ' + f.src));
      a.appendChild(meta);
      a.appendChild(h('h3', null, f.title));
      a.appendChild(h('p', null, f.body.split('\n\n')[0]));
      var link = h('a', 'btn btn--quiet', 'Full text under controlled access');
      link.href = 'archive.html';
      a.appendChild(link);
      return a;
    });
  }

  function pressFiles() {
    return P.ARCHIVE.files.filter(function (f) {
      return f.tags.indexOf('press') !== -1;
    });
  }

  function programmeCodes() {
    return Object.keys(P.PROGRAMS).map(function (k) {
      return P.PROGRAMS[k];
    });
  }

  /* ---------- page renderers ---------- */

  var pages = {};

  pages.index = function () {
    var t = [
      ['Founded', P.COMPANY.founded],
      ['Employees', P.COMPANY.employees],
      ['Countries', P.COMPANY.countries],
      ['Listed', 'NYSE: PTX'],
      ['Listing', P.COMPANY.classification.split('·')[0].trim()],
      ['Headquarters', P.COMPANY.hq]
    ];
    fill('ticker', t.map(function (pair) {
      var d = h('div');
      d.appendChild(h('span', 'ticker__k', pair[0]));
      d.appendChild(h('span', 'ticker__v', pair[1]));
      return d;
    }));

    fill('mission-teaser', P.MISSION.map(function (line, i) {
      var li = h('li');
      li.appendChild(h('span', 'u-mono', String(i + 1).padStart(2, '0')));
      li.appendChild(document.createTextNode(' ' + line));
      return li;
    }));

    fill('divisions', P.DIVISIONS.map(function (d) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', d.code));
      c.appendChild(h('h3', null, d.name));
      c.appendChild(h('p', null, d.blurb));
      var m = h('p', 'person__note');
      m.appendChild(document.createTextNode('Division head · '));
      m.appendChild(h('span', 'u-mono', d.head));
      c.appendChild(m);
      return c;
    }));

    fill('sites-preview', P.SITES.slice(0, 6).map(function (s) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', s.division));
      c.appendChild(h('h3', null, s.name));
      c.appendChild(h('p', null, s.city + ' · opened ' + s.opened + ' · ' + s.staff + ' staff · ' + s.size));
      return c;
    }));

    fill('releases', releaseList(pressFiles()));

    fill('people-preview', publicPeople(P.PEOPLE.executives).slice(0, 3).map(personCard));
  };

  pages.about = function () {
    fill('mission', P.MISSION.map(function (line, i) {
      var li = h('li');
      li.appendChild(h('span', 'u-mono', String(i + 1).padStart(2, '0')));
      li.appendChild(document.createTextNode(' ' + line));
      return li;
    }));

    fill('values', P.VALUES.map(function (v, i) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', String(i + 1).padStart(2, '0')));
      c.appendChild(h('h3', null, v.name));
      c.appendChild(h('p', null, v.body));
      return c;
    }));

    fill('strategy', P.STRATEGY.map(function (s) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', 'k:' + s.k));
      c.appendChild(h('h3', null, s.h));
      c.appendChild(h('p', null, s.b));
      return c;
    }));

    var note = $('credential-standard');
    if (note) note.textContent = P.CLUES.pass.policyNote;

    var meta = $('incorporation');
    if (meta) meta.textContent = P.COMPANY.incorporation;

    var found = $('founded-by');
    if (found) found.textContent = P.COMPANY.foundedBy;
  };

  pages.leadership = function () {
    fill('board', publicPeople(P.PEOPLE.board).map(personCard));
    fill('execs', publicPeople(P.PEOPLE.executives).map(personCard));
  };

  pages.facilities = function () {
    fill('sites', P.SITES.map(function (s) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', s.division));
      c.appendChild(h('h3', null, s.name));
      c.appendChild(h('p', null, s.city));
      var d = h('dl', 'deflist');
      [['Opened', s.opened], ['Staff', s.staff], ['Footprint', s.size], ['Accountable division', s.division]].forEach(function (pair) {
        d.appendChild(h('dt', null, pair[0]));
        d.appendChild(h('dd', null, pair[1]));
      });
      c.appendChild(d);
      c.appendChild(h('p', null, s.blurb));
      return c;
    }));
  };

  pages.sustainability = function () {
    fill('programmes', programmeCodes().map(function (p) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', p.code));
      c.appendChild(h('h3', null, city(p.site)));
      c.appendChild(h('p', null, 'Registered programme ' + p.code + '. Full dossier, including site boundaries and reporting lines, is maintained under controlled access and released on request to accredited assessors.'));
      return c;
    }));

    fill('strategy', P.STRATEGY.map(function (s) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', 'k:' + s.k));
      c.appendChild(h('h3', null, s.h));
      c.appendChild(h('p', null, s.b));
      return c;
    }));

    fill('releases', releaseList(pressFiles()));

    var lede = $('sustainability-lede');
    if (lede) lede.textContent = P.VISION;
  };

  pages.careers = function () {
    var rows = publicPeople(P.PEOPLE.executives).concat(publicPeople(P.PEOPLE.board));
    fill('directory', rows.map(function (p) {
      var tr = h('tr');
      [
        p.room || '—',
        p.role,
        p.dept || siteName(p.site),
        siteName(p.site),
        badge(p.mail),
        p.mail
      ].forEach(function (cell, i) {
        var td = h('td', i === 5 ? 'mono' : null, cell);
        tr.appendChild(td);
      });
      return tr;
    }));

    var note = $('badge-policy');
    if (note) note.textContent = P.CLUES.userPolicyNote;

    var hint = $('directory-hint');
    if (hint) hint.textContent = 'Room numbers are published because assessors ask for them. Badge identifiers are published because the badge is the account name.';
  };

  pages.newsroom = function () {
    fill('releases', releaseList(pressFiles()));
    var list = $('release-index');
    if (list) {
      pressFiles().forEach(function (f) {
        var li = h('li');
        li.appendChild(h('span', 'u-mono', f.date));
        li.appendChild(document.createTextNode(' — ' + f.title));
        list.appendChild(li);
      });
    }
    var c = $('press-contact');
    if (c) {
      c.textContent = 'Media enquiries: communications@pentex.example. Technical enquiries: ' + P.DIVISIONS[0].head;
    }
  };

  pages.contact = function () {
    fill('div-contacts', P.DIVISIONS.map(function (d) {
      var c = h('article', 'card');
      c.appendChild(h('p', 'card__k', d.code));
      c.appendChild(h('h3', null, d.name));
      var dl = h('dl', 'deflist');
      dl.appendChild(h('dt', null, 'Head office'));
      dl.appendChild(h('dd', null, d.hqSite));
      dl.appendChild(h('dt', null, 'Division head'));
      dl.appendChild(h('dd', 'mono', d.head));
      c.appendChild(dl);
      c.appendChild(h('p', null, d.blurb));
      return c;
    }));

    fill('site-addresses', P.SITES.map(function (s) {
      var tr = h('tr');
      [s.name, s.city, s.division, s.opened, s.staff].forEach(function (cell) {
        tr.appendChild(h('td', null, cell));
      });
      return tr;
    }));

    var hq = $('hq-line');
    if (hq) hq.textContent = P.COMPANY.hq + ' — ' + P.COMPANY.employees + ' employees, ' + P.COMPANY.countries + ' countries.';
  };

  /* ---------- chrome ---------- */

  function wireBurger() {
    var btn = document.querySelector('.masthead__burger');
    var nav = $('mastnav');
    if (!btn || !nav) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (open) {
        nav.removeAttribute('data-open');
      } else {
        nav.setAttribute('data-open', 'true');
      }
    });
  }

  function wireYear() {
    var y = document.querySelectorAll('[data-year]');
    var now = String(new Date().getFullYear());
    for (var i = 0; i < y.length; i++) y[i].textContent = now;
  }

  function init() {
    wireBurger();
    wireYear();
    var page = document.body.getAttribute('data-page');
    if (page && pages[page]) pages[page]();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();