/* Pentex Industries Worldwide — /finance hand-written records.
   Ledgers are declared as row arrays and serialised here, so a column can
   never be added to one row and forgotten on the next. */
(function (global) {
  'use strict';
  var P = global.PENTEX;
  if (!P) return;

  function reg(dir, arr) {
    var fs = P.FS[dir] || (P.FS[dir] = []);
    var seen = {};
    fs.forEach(function (e) { seen[e.name] = 1; });
    var kept = arr.filter(function (d) { return !seen[d.name]; });
    if (kept.length) P.REGISTER(dir, kept);
    return kept.length;
  }

  function cell(v) {
    var s = v === null || v === undefined ? '' : String(v);
    if (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  function sheet(head, rows) {
    var lines = [head.map(cell).join(',')];
    rows.forEach(function (r) {
      if (r.length !== head.length) {
        throw new Error('row width ' + r.length + ' != head ' + head.length + ' in ledger ' + head[0]);
      }
      lines.push(r.map(cell).join(','));
    });
    return lines.join('\n');
  }

  function doc(id, name, title, date, src, tags, body, fmt) {
    var p = '/finance/' + name;
    var f = {
      path: p, name: p, id: id, title: title, date: date, src: src,
      tags: tags || ['finance'],
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
    if (fmt) f.fmt = fmt;
    return f;
  }

  var D = [];

  /* ------------------------------------------------------------------ */

  D.push(doc('fn-h01', 'settlement_tranches.csv', 'Settlement tranches — actual source of funds', '2012-01-31', 'Group finance · reconciliation', ['finance', 'spill', 'amazon', 'foundation'],
    sheet(
      ['settlement', 'tranche', 'scheduled_date', 'scheduled_amount', 'actual_paid_date', 'actual_amount', 'source_account', 'approved_by'],
      [
        ['Rio Vermelho 1998', 1, '1999-01-04', 15000000, '1999-01-04', 15000000, 'Pentex Foundation Geneva F-1', 'G. Malesic'],
        ['Rio Vermelho 1998', 2, '2000-02-04', 15000000, '2000-02-04', 15000000, 'Pentex Foundation Manila F-2', 'G. Malesic'],
        ['Rio Vermelho 1998', 3, '2001-03-04', 15000000, '2001-03-04', 15000000, 'Pentex Foundation Manila F-2', 'G. Malesic'],
        ['Ibara Trust dissolution', 1, '2006-08-02', 1104000, '2006-08-02', 1104000, 'Ibara Basin Trust account 8855-0114', 'S. Okonjo'],
        ['Ibara conveyance', 1, '1998-11-04', 0, '1998-11-04', 0, 'land conveyance', 'Clause 6, gift, nil consideration'],
        ['Cause of action reserve', 1, '1994-08-01', 45000000, '1998-11-04', 0, 'Audit Committee reserve', 'frozen November 1994'],
        ['Late interest', 1, '2001-03-04', 1140000, 'never', 0, 'n/a', 'not claimed'],
        ['!! The reserve was frozen on disclosure and the settlement was paid from the Foundation. The defendant paid nothing.', '', '', '', '', '', '', ''],
        ['!! The Foundation has no remediation purpose in its charter. See legal/settlement_funding.txt.', '', '', '', '', '', '', ''],
        ['!! Tranche 3 was 14 months late and BRL 1,140,000 of contractual late interest was never claimed. The Group held the money.', '', '', '', '', '', '', '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h02', 'the_penny_series.csv', '8855-0114 — periodic payments, 2007–2024', '2024-12-31', 'Group treasury · machine record', ['finance', 'counterparty', 'magi'],
    sheet(
      ['year', 'payments', 'total_brl', 'weekday', 'payee_ref', 'resolve_1', 'resolve_2', 'resolve_3', 'final_entity', 'jurisdiction'],
      (function () {
        var rows = [];
        for (var y = 2007; y <= 2024; y++) {
          var known = y >= 2009;
          rows.push([
            y, 26, 0.26, 'Friday', 'PTX-8855-0114',
            'Pentex Petroleo Ltda',
            'Manduca Holdings',
            known ? 'Brazil SEZ Property' : 'no record',
            known ? 'Shenzhen Cultural Heritage Vehicle' : 'no record',
            known ? 'Shenzhen' : 'Brazil'
          ]);
        }
        rows.push(['!! resolve_2 says "no record" for 2007 and 2008 and then resolves from 2009. The entity was incorporated in March 2009 and the payments changed owner in the same month.', '', '', '', '', '', '', '', '', '']);
        rows.push(['!! 468 payments totalling BRL 4.68 over eighteen years. No exchange-control reporting in the destination jurisdiction.', '', '', '', '', '', '', '', '', '']);
        rows.push(['!! The amount is not the point. The schedule is the point: machine-generated, periodic, non-round, to a non-operating entity.', '', '', '', '', '', '', '', '', '']);
        rows.push(['TOTAL', 468, 4.68, '', '', '', '', '', '', '']);
        return rows;
      })()
    ),
    'csv'));

  D.push(doc('fn-h03', 'foundation_ledger.csv', 'Foundation grant ledger — BRL 8.6m, four households', '2020-12-31', 'Pentex Foundation · ledger', ['finance', 'foundation', 'water'],
    sheet(
      ['grant_id', 'recipient', 'declared_purpose', 'declared_amount', 'actual_disbursed', 'evidence_of_delivery', 'date', 'approved_by'],
      [
        ['F-2019-01', 'Rio Vermelho Fishing Cooperative', 'housing for affected households', 4200000, 4200000, '4 households, addresses recorded, no structure on any site', '2019-06-30', 'S. Okonjo'],
        ['F-2019-02', 'Rio Vermelho individual claimants (41)', 'water point maintenance', 1100000, 1100000, 'no maintenance record; the point did not exist before or after', '2019-07-15', 'S. Okonjo'],
        ['F-2020-01', 'Kilifi County veterinary fund', 'vector control equipment', 900000, 900000, 'receipt signed; no equipment sighted at site', '2020-02-11', 'S. Okonjo'],
        ['F-2020-02', 'Shenzhen SEZ property vehicle', 'cultural heritage, local custom', 500000, 500000, '!! no heritage site; the vehicle holds no property', '2020-03-02', 'S. Okonjo'],
        ['F-2021-01', 'Novosibirsk edge community', 'veterinary post operating costs', 410000, 410000, 'post built; visited 11 days a year', '2021-04-08', 'S. Okonjo'],
        ['F-2022-01', 'Foundation staff', 'administration', 480000, 480000, 'payroll', '2022-01-15', 'S. Okonjo'],
        ['F-2022-02', 'Foundation staff', 'administration', 480000, 480000, 'payroll', '2022-07-15', 'S. Okonjo'],
        ['!! 8,600,000 declared against declared purpose. 40,000 PF-40 units distributed and 4 households served. See products/pr-h06.txt.', '', '', '', '', '', '', ''],
        ['!! No grant in this ledger has a delivery document that is not a receipt.', '', '', '', '', '', '', ''],
        ['!! 960,000 of the 8,600,000 is the Foundation paying its own staff.', '', '', '', '', '', '', ''],
        ['!! The 2019 housing grant is the only payment that follows the settlement of 1998 by 21 years and is 9.3 per cent of it.', '', '', '', '', '', '', ''],
        ['TOTAL', '', '', 8600000, 8600000, '', '', '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h04', 'cause_of_action_reserve.csv', 'Reserve account — frozen, spent, reopened', '2021-09-30', 'Group finance · audit committee', ['finance', 'spill', 'amazon', 'water'],
    sheet(
      ['date', 'action', 'reserve_balance', 'authorised_by', 'note'],
      [
        ['1994-08-19', 'disclosure of spill to Audit Committee', 45000000, 'R. Aurelian-Hale', '!! reserve opened at full value on the day of disclosure'],
        ['1994-11-02', 'all discretionary payments frozen', 45000000, 'M. Mbeki-Ng', '!! the freeze is why the defendant could not pay; the settlement was paid by the Foundation'],
        ['1998-11-04', 'settlement executed', 45000000, 'G. Malesic', '!! reserve untouched; settlement funded from Foundation accounts F-1 and F-2'],
        ['1999-01-04', 'legal assessment requested', 45000000, 'G. Malesic', '!! assessment recommends no remediation; see the spill report'],
        ['2004-09-30', 'reserve reviewed', 45000000, 'Mbeki-Ng', '!! reviewed and not released'],
        ['2011-04-18', 'reserve reviewed', 45000000, 'Mbeki-Ng', '!! reviewed and not released'],
        ['2019-03-02', 'GreenRiver opinion not filed', 45000000, 'G. Malesic', '!! assessment recommends remediation; the recommendation was not actioned'],
        ['2021-09-30', 'reserve reviewed', 45000000, 'Mbeki-Ng', '!! reviewed and not released'],
        ['!! BRL 45,000,000 has sat in a frozen reserve for twenty-seven years, funded by shareholders, against a spill the Group caused. The only thing it has been used for is being reviewed.', '', '', '', ''],
        ['!! A frozen reserve is the cheapest available form of plausible deniability: the money is real, the liability is acknowledged, and nothing is ever paid.', '', '', '', ''],
        ['!! The shareholders paid 45 million for this. They are not told. They are told it is a pending contingency.', '', '', '', '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h05', 'discharge_reconciliation.csv', 'Discharge against permit — nine sites, eight years', '2021-12-31', 'Group compliance · reconciliation', ['finance', 'water', 'spill', 'regulatory'],
    sheet(
      ['site', 'analyte', 'permit_ug_l', 'permitted_discharge_m3', 'actual_discharge_m3', 'exceedance_days', 'reported_days', 'exceedance_factor'],
      [
        ['Manaus', 'X-77 derivative', 0.2, 1180000, 1640000, 2411, 0, 8.0],
        ['Manaus', 'X-77 derivative at the Ibara intake', 0.2, 0, 0, 0, 0, '!! intake is excluded from the permit because the intake is not a discharge point; the water is abstracted, not discharged'],
        ['Houston', 'X-77 derivative', 2.0, 1900000, 2180000, 88, 0, 7.7],
        ['Houston', 'X-77 derivative, unpermitted area A-5', 0.0, 0, 280000, 88, 0, '!! 280,000 m3 discharged to a permitted area of zero'],
        ['Newcastle', 'X-77 derivative', 2.0, 3900000, 3900000, 0, 0, 1.0],
        ['Jurong', 'X-77 derivative', 2.0, 2100000, 4410000, 0, 0, 9.0],
        ['Jurong', 'X-77 derivative to drain', 0.0, 0, 2200000, 0, 0, '!! no river within 11 km; the drains terminate in the sea'],
        ['Calgary', 'X-77 derivative', 0.05, 880000, 880000, 0, 0, 1.0],
        ['Kilifi', 'X-77 derivative', 0.05, 0, 41000, 34, 0, '!! there is no discharge permit at Kilifi at all'],
        ['Novosibirsk', 'X-77 derivative', 0.2, 0, 96000, 210, 0, '!! the cemetery'],
        ['!! reported_days is zero at every site in every year. Eleven reportable exceedances at Manaus were identified by GreenRiver, not by the Group.', '', '', '', '', '', '', ''],
        ['!! The Group reports exceedances only where the permit contains a daily average. It does not report where the permit is an annual average.', '', '', '', '', '', '', ''],
        ['!! This is not concealment. It is a permit written by the Group.', '', '', '', '', '', '', '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h06', 'site_costs.csv', 'Site operating cost — the two columns', '2021-12-31', 'Group finance · extract', ['finance', 'spill', 'animal', 'garou'],
    sheet(
      ['site', 'headcount', 'labour_usd', 'compliance_usd', 'security_usd', 'remediation_usd', 'remediation_pct', 'public_position'],
      [
        ['Manaus', 1240, 41000000, 2200000, 11400000, 0, 0.0, 'zero-deforestation commitment'],
        ['Houston', 2180, 88000000, 4100000, 6100000, 0, 0.0, 'exemplary site 2021'],
        ['Newcastle', 3100, 74000000, 3100000, 4400000, 0, 0.0, 'exemplary site 2019'],
        ['Jurong', 2960, 61000000, 2900000, 8800000, 0, 0.0, 'exemplary site 2022'],
        ['Calgary', 1140, 29000000, 1900000, 2100000, 4350000, 44.7, 'soil recovery programme'],
        ['Kilifi', 620, 18000000, 900000, 3900000, 0, 0.0, 'veterinary and community programme'],
        ['Novosibirsk', 1490, 34000000, 1400000, 5100000, 880000, 2.4, 'animal welfare exemplar'],
        ['Cota', 180, 7000000, 400000, 2900000, 0, 0.0, 'field station'],
        ['!! The four sites with remediation spending are the four sites with published remediation programmes.', '', '', '', '', '', '', ''],
        ['!! The four sites with no remediation spending are Manaus, Houston, Newcastle and Jurong: the four sites publicly named as exemplars.', '', '', '', '', '', '', ''],
        ['!! Calgary at 44.7 per cent of site cost is spent on a plume that has grown through three remediation attempts, and this is published as a success.', '', '', '', '', '', '', ''],
        ['!! Security spend exceeds compliance spend at six of nine sites.', '', '', '', '', '', '', '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h07', 'the_one_that_pays.csv', 'Which programmes are revenue-generating', '2022-06-30', 'Arcane R&D · internal', ['finance', 'animal', 'clinical', 'garou'],
    sheet(
      ['programme', 'annual_revenue_usd', 'annual_cost_usd', 'margin', 'disclosed_as_product', 'disclosed_as_programme', 'note'],
      [
        ['CHOIR', 0, 41000000, -41000000, 'no', 'yes, as vector research', 'n/a'],
        ['PALIMPSEST', 0, 27000000, -27000000, 'no', 'yes, as cognition research', 'n/a'],
        ['MAYFLY', 0, 19000000, -19000000, 'no', 'yes, as longevity research', 'n/a'],
        ['CAULDRON', 0, 23000000, -23000000, 'yes', 'yes, as a food additive', 'see /products'],
        ['CARRION', 0, 16000000, -16000000, 'no', 'no', '!! not disclosed as a programme'],
        ['REDLINE', 0, 0, 0, 'no', 'yes, as a forestry protocol', '!! costs nothing because it is a memorandum'],
        ['!! Total cost of the six programmes: 126 million dollars a year. Revenue: none.', '', '', '', '', '', ''],
        ['!! The Group funds 126 million dollars a year of programmes that produce no revenue and does not report them as a cost centre. They are reported as research and development.', '', '', '', '', '', ''],
        ['!! Which is why the 2021 research and development line is 9.4 per cent of revenue and no one in the accounts can explain where it goes.', '', '', '', '', '', ''],
        ['!! CAULDRON is the exception and it is instructive: CAULDRON produces revenue, is disclosed as a product, and is also a programme.', '', '', '', '', '', ''],
        ['!! Which means the isomer in CAULDRON is sold in 4,000 units across 61 countries and 94 named people are not to be given it.', '', '', '', '', '', ''],
        ['!! The revenue figure for CAULDRON is in /products and the list of 94 is in black_programs/bp-h06.txt and neither file refers to the other.', '', '', '', '', '', ''],
        ['TOTAL', 0, 126000000, -126000000, '', '', '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h08', 'insurance_years.csv', 'Section 7 premium history', '2021-01-31', 'Group risk · broker record', ['finance', 'magi', 'legal'],
    sheet(
      ['year', 'gaunts_declared', 'premium_usd', 'claims_made', 'claims_reserved', 'note'],
      [
        [1981, 0, 410000, 0, 0, '!! first year; no Gaunts declared because none was known to the broker'],
        [1987, 6, 1180000, 0, 0, '!! six disclosed after Newark'],
        [1994, 7, 1940000, 0, 0, '!! the year of the Ibara release; no claim made, because Section 7 does not cover spills'],
        [2000, 8, 2410000, 0, 0, ''],
        [2004, 9, 2870000, 0, 0, ''],
        [2009, 9, 3140000, 0, 0, ''],
        [2014, 11, 4610000, 0, 0, '!! eleven declared'],
        [2019, 11, 4740000, 0, 0, '!! the year the Register cover sheet says eleven'],
        [2021, 11, 4880000, 0, 0, '!! forty years, zero claims'],
        ['!! The premium rises 1,400 per cent and no claim has ever been made under the section.', '', '', '', '', ''],
        ['!! The reason no claim is made under Section 7 is that filing requires writing the word Gaunt on a form and the Group has never filed.', '', '', '', '', ''],
        ['!! A policy that has never been claimed is not evidence of safety. It is evidence of a decision.', '', '', '', '', ''],
        ['!! The Group has paid 41 million dollars in premiums on a section that covers the only risk nobody has ever been willing to write down.', '', '', '', '', ''],
        ['TOTAL', 41, 24000000, 0, 0, '']
      ]
    ),
    'csv'));

  D.push(doc('fn-h09', 'contractors_paid.csv', 'Contractor spend — the rotation economy', '2021-12-31', 'Procurement · extract', ['finance', 'field_ops', 'contractor'],
    sheet(
      ['category', 'annual_usd', 'contractors', 'avg_engagement_weeks', 'avg_payout_usd', 'recurrence', 'note'],
      [
        ['Manaus cutting', 8100000, 2600, 5.5, 3115, 'rotating', '!! four weeks by contract, six by practice'],
        ['All-site records destruction', 1900000, 0, 0, 0, 'n/a', '!! no contractor count: destroyed records are not counted as a service'],
        ['All-site archive transport', 1100000, 0, 0, 0, 'n/a', ''],
        ['Newark night supervision', 4100000, 4, 0, 1025000, 'permanent', '!! four men, no names, payroll numbers only'],
        ['Kilifi walk supervision', 900000, 2, 0, 450000, 'permanent', '!! twice monthly for four years'],
        ['Yukon corridor aviation', 2600000, 0, 0, 0, 'n/a', '!! 212 hours a year, overnight, non-employee recipients'],
        ['Novosibirsk waste transport', 600000, 0, 0, 0, 'n/a', ''],
        ['Jurong waste transport', 540000, 0, 0, 0, 'n/a', ''],
        ['Calgary waste transport', 410000, 0, 0, 0, 'n/a', ''],
        ['!! 12.8 million dollars a year to Hallow & Fitch: a firm founded by the Group Counsel\'s son, holding security, destruction, waste and aviation.', '', '', '', '', '', ''],
        ['!! The four Newark night supervisors are the highest-paid non-officials on the Group payroll and their names are in nothing.', '', '', '', '', '', ''],
        ['!! Records destruction is the only line in this table with no output measure at all.', '', '', '', '', '', ''],
        ['TOTAL', 21000000, 2606, '', '', '', '']
      ]
    ),
    'csv'));

  reg('/finance', D);
})(typeof window !== 'undefined' ? window : globalThis);
