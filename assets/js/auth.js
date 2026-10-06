/* Pentex — sub-level 4 gate.
   Checks the badge identifier and the group passphrase against the two clues
   that are published openly on the public site. No lockout: the vault is meant
   to be walked into. What is logged is the attempt, not the failure. */
(function () {
  'use strict';

  var P = window.PENTEX;
  var SESSION = 'pentex.session';
  var ATTEMPTS = 'pentex.attempts';

  /* What the room says when you get it wrong. Ordered, so the third failure
     escalates to the actual hint rather than to another piece of atmosphere. */
  var REFUSALS = [
    'Credential rejected. The badge identifier is case-insensitive and is not the same string as the mailbox.',
    'Credential rejected. Note that the site directory prints rooms, and rooms are not mailbox names.',
    'Credential rejected. Both halves of this credential were published. Neither half is secret; that is the finding.'
  ];

  function byId(id) {
    return document.getElementById(id);
  }

  function readSession() {
    try {
      var raw = window.sessionStorage.getItem(SESSION);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function attemptCount() {
    try {
      return parseInt(window.sessionStorage.getItem(ATTEMPTS) || '0', 10) || 0;
    } catch (err) {
      return 0;
    }
  }

  function bumpAttempts() {
    var n = attemptCount() + 1;
    try {
      window.sessionStorage.setItem(ATTEMPTS, String(n));
    } catch (err) {
      /* private mode: the room still works, it just forgets */
    }
    return n;
  }

  function say(text, kind) {
    var box = byId('gate-msg');
    box.textContent = text;
    box.setAttribute('data-kind', kind || 'bad');
    box.setAttribute('data-on', '1');
  }

  function go() {
    window.location.replace('archive.html');
  }

  function init() {
    var policy = byId('badge-policy');
    if (policy) policy.textContent = P.CLUES.userPolicyNote;

    if (readSession()) {
      var lamp = byId('lamp');
      if (lamp) {
        lamp.className = 'lamp lamp--on';
        lamp.textContent = 'session active';
      }
      go();
      return;
    }

    var form = byId('gate-form');
    var user = byId('f-user');
    var pass = byId('f-pass');

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var u = user.value.trim().toLowerCase();
      var p = pass.value;

      if (u === P.CLUES.user.value && p === P.CLUES.pass.value) {
        try {
          window.sessionStorage.setItem(
            SESSION,
            JSON.stringify({ user: u, at: Date.now() })
          );
          window.sessionStorage.removeItem(ATTEMPTS);
        } catch (err) {
          /* fall through: the room does not require persistence to open */
        }
        say('Verified. Opening the drop box.', 'good');
        window.setTimeout(go, 420);
        return;
      }

      var n = bumpAttempts();
      var line = REFUSALS[Math.min(n, REFUSALS.length) - 1];
      if (n >= REFUSALS.length) line = line + ' ' + P.CLUES.pass.hint;
      say(line, 'bad');

      pass.value = '';
      pass.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();