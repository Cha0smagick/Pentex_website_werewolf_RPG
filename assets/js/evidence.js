/* Pentex — evidence board.
   Reads the record the terminal wrote. Locked cards show only the classification
   and the directory; opening one is the terminal's job. */
(function () {
  'use strict';

  var P = window.PENTEX;
  var SESSION = 'pentex.session';
  var EVIDENCE = 'pentex.evidence';
  var TOTAL = P.ARCHIVE.files.length;

  function storeGet(k) {
    try {
      return window.localStorage.getItem(k);
    } catch (err) {
      return null;
    }
  }

  function authenticated() {
    try {
      var raw = window.sessionStorage.getItem(SESSION);
      return !!raw && JSON.parse(raw).user === P.CLUES.user.value;
    } catch (err) {
      return false;
    }
  }

  function evidence() {
    var raw = storeGet(EVIDENCE);
    if (!raw) return {};
    try {
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (err) {
      return {};
    }
  }

  function h(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  function denied() {
    // The board shell — a gauge stuck at 0%, a "0 / 32" counter, an empty grid,
    // and a "Clear this board" button that is wired only after the auth check
    // below — reads as a working instrument that has lost its data. It has not;
    // it never ran. Clear it so the rejection is the whole page. The skip link
    // targets #main, so the element itself has to survive; only its contents go.
    var board = document.getElementById('main');
    if (board) board.innerHTML = '';

    var wrap = h('div', 'note');
    var box = h('div', 'note__in');
    box.appendChild(h('h1', null, 'Credential rejected'));
    box.appendChild(
      h(
        'p',
        null,
        'The evidence board is case material and needs an authenticated sub-level 4 session.'
      )
    );
    var p = h('p');
    var a = h('a', null, 'Return to the portal');
    a.href = 'portal.html';
    p.appendChild(a);
    box.appendChild(p);
    wrap.appendChild(box);
    (board || document.body).appendChild(wrap);
  }

  function init() {
    if (!authenticated()) {
      denied();
      return;
    }

    var got = evidence();
    var n = Object.keys(got).filter(function (k) {
      return got[k];
    }).length;

    var fill = document.getElementById('fill');
    var count = document.getElementById('count');
    var grid = document.getElementById('grid');
    var verdict = document.getElementById('verdict');

    count.textContent = n + ' / ' + TOTAL;
    fill.style.width = Math.round((n / TOTAL) * 100) + '%';

    P.ARCHIVE.files.forEach(function (f) {
      var has = !!got[f.id];
      var card = h('div', 'ev' + (has ? ' ev--got' : ' ev--locked'));

      card.appendChild(h('p', 'ev__k', f.path.replace(/^\//, '').split('/')[0] + '/'));

      if (has) {
        card.appendChild(h('p', 'ev__t', f.title));
        var meta = h('div', 'ev__d');
        meta.appendChild(h('span', 'ev__tag', f.date));
        meta.appendChild(h('span', null, f.enc ? f.enc + ' store' : 'read'));
        card.appendChild(meta);
      } else {
        card.appendChild(h('p', 'ev__t', f.tags.indexOf('press') !== -1 ? 'public record' : 'restricted'));
        card.appendChild(h('p', 'ev__lock', 'not opened'));
      }

      grid.appendChild(card);
    });

    if (n >= TOTAL) {
      verdict.setAttribute('data-on', '1');
    }

    document.getElementById('reset').addEventListener('click', function () {
      try {
        window.localStorage.removeItem(EVIDENCE);
      } catch (err) {
        /* nothing stored, nothing to clear */
      }
      window.location.reload();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();