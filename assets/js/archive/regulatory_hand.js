/* Pentex Industries Worldwide — /regulatory. Hand-written records. */
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

  function doc(id, name, title, date, src, tags, body) {
    return {
      id: id,
      path: '/regulatory/' + name,
      name: '/regulatory/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('rg-h01', 'ibara_permit.txt',
    'Ibara concession permit — drafting history', '1970-04-30',
    'Reproduced in the Regulatory Division file',
    ['regulatory', 'ibara', 'permit', 'permit', 'concession'],
    'IBARA CONCESSION — PERMIT AND ITS DRAFTING\n' +
    'Concession granted 1970-04-30. Permit issued 1971-02-11.\n\n' +
    'The permit was drafted by the concession company.\n\n' +
    'This is not an unusual arrangement. It is the arrangement at nineteen of the\n' +
    'twenty-one Group concessions. The concession company prepares a draft permit,\n' +
    'the state reviews it, the state amends what it wishes, and the permit issues.\n' +
    'The concession company pays for the state\'s review. The concession company\n' +
    'drafts.\n\n' +
    'THE CLAUSE.\n' +
    'Clause 14 of the Ibara permit reads:\n' +
    '  "The concessionaire may execute clearing operations within any area of the\n' +
    '   concession not then under active rehabilitation, such area being\n' +
    '   determined by the concessionaire and notified to the Authority."\n\n' +
    'THE AMENDMENT THE STATE MADE.\n' +
    'The state struck the words "determined by the concessionaire" and inserted\n' +
    '"determined by the concessionaire and approved by the Authority". The\n' +
    'concession company objected. The state held a hearing. The concession company\n' +
    'conceded and the permit issued.\n' +
    'A copy of the permit as issued is in the Regulatory Division file. It contains\n' +
    'the words "approved by the Authority".\n\n' +
    'THE OPERATING PRACTICE.\n' +
    'The authority has approved 4,100 clearing notifications. 4,100 have been\n' +
    'executed. Two notifications remain unapproved, both of them from 1994 and\n' +
    '2019, and the Regional Office of the Ibara basin has not responded to either.\n\n' +
    'The clause as drafted would not have permitted this. The clause as issued\n' +
    'does not prevent it either. It requires an approval, and the absence of an\n' +
    'approval from an office that does not respond is indistinguishable from a\n' +
    'permission, and the concessionaire is not the party that would be expected to\n' +
    'know the difference.'));

  D.push(doc('rg-h02', 'non_reportable_exceedances.txt',
    'Exceedances classified non-reportable, 2011-2019', '2019-12-31',
    'Regulatory Engineering, compilation for the Registrar',
    ['regulatory', 'exceedances', 'non_reportable', 'classification'],
    'CLASSIFICATION OF EXCEEDANCES AS NON-REPORTABLE\n' +
    'Compiled 2019-12-31 by Regulatory Engineering (22-09) at the request of the\n' +
    'Registrar, who requested "a single view of every event in the last nine\n' +
    'years that was measured, exceeded a threshold, and was not reported to an\n' +
    'authority outside the Group".\n\n' +
    'NINE YEARS. ELEVEN EVENTS.\n\n' +
    ' 1. 2011-06-04  Jurong      filling line 2, vapour concentration above the\n' +
    '                     internal action level. Under the permit, reportable above\n' +
    '                     4x the internal level. Measured at 3.2x. Reportable: no.\n' +
    ' 2. 2012-09-19  Houston     tank farm A-5, bund drainage valve left open 41\n' +
    '                     minutes. Volume not gauged. Reported internally as a\n' +
    '                     valve exercise.\n' +
    ' 3. 2013-04-02  Manaus      waste water, phenols above consent limit for 19\n' +
    '                     hours. Classified non-reportable on the basis that the\n' +
    '                     limit was exceeded at a time when the receiving water\n' +
    '                     level was below the trigger level in the permit, and the\n' +
    '                     permit makes the two conditions cumulative.\n' +
    ' 4. 2014-08-30  Cota        generator exhaust, 11 units at the veterinary annexe.\n' +
    '                     No threshold. Reported because a count was requested.\n' +
    ' 5. 2015-01-22  Novosibirsk vivarium ammonia, sensor drift. Classified\n' +
    '                     non-reportable following calibration. The calibration\n' +
    '                     record is dated the same day.\n' +
    ' 6. 2016-03-14  Jurong      assay building, no measurable event. Filed because\n' +
    '                     the assay return arrived with a discrepancy in the\n' +
    '                     tare weight of 1.4 kg which is not reconcilable.\n' +
    ' 7. 2017-11-08  Ibara       clearing notification unapproved by the Authority.\n' +
    '                     Classified non-reportable on the basis that the event is\n' +
    '                     an administrative matter between the concessionaire and\n' +
    '                     the Authority.\n' +
    ' 8. 2018-07-25  Kilifi      vector house, sensor fault, 6 days. Classified\n' +
    '                     non-reportable. Four subjects died during these six days.\n' +
    ' 9. 2019-02-11  Calgary     ground monitoring well down-gradient, no\n' +
    '                     exceedance, residue found. No threshold exists for\n' +
    '                     residue in a down-gradient well because the well was\n' +
    '                     installed to characterise a remediated plot.\n' +
    '10. 2019-09-03  Manaus      Ibara intake, one sample above the notification\n' +
    '                     threshold on the parameter that was already in exceedance\n' +
    '                     from 1994 to 1996 and has been removed from the panel.\n' +
    '11. 2019-11-27  Group       An existing condition, in respect of which no new\n' +
    '                     information has been received. Classified non-reportable\n' +
    '                     on the basis that an existing condition is not an event.\n\n' +
    'NOTE ON 11.\n' +
    'Event 11 is the Rio Vermelho. It is filed here as an event because the\n' +
    'Registrar asked for every measured exceedance that was not reported, and the\n' +
    'River has been measured continuously since 1994 and has exceeded on every\n' +
    'occasion, and has never been reported, and has been classified as an existing\n' +
    'condition rather than as a series of events. The classification is not\n' +
    'wrong. An existing condition does not recur. It is simply always there, and\n' +
    'it is the reason for this compilation, and it is the reason the Registrar\n' +
    'asked.'));

  D.push(doc('rg-h03', 'disclosure_2019_adds_nothing.txt',
    'Annual disclosure 2019 — review against the underlying files', '2020-03-12',
    'Sustainability Division, disclosure working group',
    ['regulatory', 'disclosure', '2019', 'restoration', 'zero'],
    'REVIEW OF THE 2019 ANNUAL DISCLOSURE AGAINST THE UNDERLYING FILES\n' +
    'Working group, 2020-03-12.\n\n' +
    'SUMMARY LINE OF THE DISCLOSANCE.\n' +
    '"In 2019 the Group applied no material that was not included in a return\n' +
    'filed with the competent authority, and cleared no area of standing forest\n' +
    'that was not included in a notification issued to the competent authority."\n\n' +
    'THE GROUP HAS NO REASON TO DOUBT THIS. It is true. It is a statement about\n' +
    'returns and notifications, and both are internally controlled and both are\n' +
    'accurate.\n\n' +
    'THE DISCLOSMENT DOES NOT ANSWER A QUESTION, AND IT IS NOT INTENDED TO.\n' +
    'The question a reader brings to a disclosure of this kind is whether the\n' +
    'material applied went where the return says, whether the return describes\n' +
    'the same operation the reader is looking at, and whether the notification\n' +
    'covers the ground that is no longer forest.\n\n' +
    'ON THE FIRST: 2.5 million tonnes were applied and 2.5 million tonnes were\n' +
    'returned, and the returned figure is calculated by pro-rata by concession area\n' +
    'excluding areas under active rehabilitation, which means that a hectare that\n' +
    'has been cleared and declared to be under rehabilitation is a hectare whose\n' +
    'product is applied and not returned. See the volume summary.\n\n' +
    'ON THE SECOND: yes. The return describes the operation. It describes it in\n' +
    'units of 2,400 tonnes per year because the allocation method produces round\n' +
    'numbers, and 2,400 tonnes does not describe a clearing.\n\n' +
    'ON THE THIRD: the notifications cover 71,900 hectares of which 9,200 hectares\n' +
    'are certified as restored, and both figures come from a 30 m classification\n' +
    'that cannot distinguish a felled stand from a stand of standing dead trees.\n\n' +
    'RECOMMENDATION OF THE WORKING GROUP.\n' +
    'The Group should consider stating the areas in hectares as well as in tonnes,\n' +
    'the cleared areas as well as the restored areas, and the area under permit as\n' +
    'well as the area cleared.\n\n' +
    'RECOMMENDATION NOT ADOPTED.\n' +
    'Adopted in part. The disclosure for 2020 states cleared area in hectares as\n' +
    'well as restored area, and continues to state application volume in tonnes,\n' +
    'and continues not to state the permitted area.\n\n' +
    'The reason given for not stating the permitted area is that the permitted area\n' +
    'is a matter of the concession company and not of the Group. The concession\n' +
    'company is a subsidiary of the Group and its concession is a Group\n' +
    'concession. This reason was recorded in 2015 and has not been revisited.'));

  D.push(doc('rg-h04', 'accounting_policy_14_7.txt',
    'Accounting policy 14.7 — zero deforestation', '2016-03-01',
    'Group Accounting Policy; approved by the Audit Committee',
    ['regulatory', 'accounting', '14.7', 'zero_deforestation'],
    'GROUP ACCOUNTING POLICY 14.7 — CARBON AND FOREST\n' +
    'Approved 2016-03-01. Supersedes 14.6.\n\n' +
    '14.7.1 The Group reports a retired-carbon figure and a net-deforestation\n' +
    'figure. The net-deforestation figure is nil in each reporting year.\n\n' +
    '14.7.2 The net-deforestation figure is nil where the area cleared within the\n' +
    'reporting year is matched by an area of equivalent area within the same\n' +
    'reporting year which is either (a) replanted, or (b) certified as restored\n' +
    'under Group Restoration Protocol RP-4.\n\n' +
    '14.7.3 A parcel certified as restored under RP-4 qualifies under 14.7.2 for\n' +
    'the whole of the calendar year in which certification is made, and for the\n' +
    'nine following calendar years.\n\n' +
    '14.7.4 An area restored by a party other than the Group, or restored under a\n' +
    'protocol other than RP-4, does not qualify.\n\n' +
    '14.7.5 Restoration evidence is a remote-sensing classification at a\n' +
    'resolution of not less than 30 m, produced by the Group or by a verifier\n' +
    'appointed by the Group.\n\n' +
    'NOTE APPENDED BY THE PREPARER, 2016-03-01, NOT FOR PUBLICATION.\n\n' +
    '14.7.3 was added after a query from the Audit Committee in 2015. The Committee\n' +
    'asked how a hectare cleared in March and replanted in June of the same year\n' +
    'could be counted nine times. The answer is that a hectare cleared in 2016 and\n' +
    'replanted in 2016 is certified in 2016 and qualifies for 2016 through 2025.\n' +
    'A hectare cleared in 2026 is not thereby matched by it.\n\n' +
    'This is not a loophole. It is a consequence, and the consequence is that the\n' +
    'matched area used by the Group is drawn from a pool of nine years of previous\n' +
    'certifications, and the pool is replenished faster than it is drawn.\n\n' +
    'What the Committee asked, in 2015, was whether the policy is a fair statement\n' +
    'of the Group\'s position. I said no. The Committee accepted my answer and\n' +
    'approved the policy, on the basis that the alternative was a policy which\n' +
    'reports a nil figure only in the years in which we happen not to clear. I have\n' +
    'never been sure that was the right reason, but it was a reason.'));

  D.push(doc('rg-h05', 'institute_citation.txt',
    'Institute for Industrial Stewardship — 2021 award citation', '2021-10-14',
    'Institute for Industrial Stewardship, Geneva',
    ['regulatory', 'institute', 'award', 'foundation', 'self_awarded'],
    'THE INSTITUTE FOR INDUSTRIAL STEWARDSHIP\n' +
    'CITATION OF THE 2021 RECIPIENT\n\n' +
    'The Institute presents its 2021 Award for Outstanding Achievement in\n' +
    'Industrial Stewardship to the Pentex Foundation.\n\n' +
    'In recognition of a sustained and unusual commitment to the long-horizon\n' +
    'condition of industrial landscapes, and of a practice of retaining\n' +
    'documentation of decisions taken over decades, allowing that practice to be\n' +
    'examined and, where necessary, acted upon.\n\n' +
    'The Institute notes the Foundation\'s longitudinal records in four regions,\n' +
    'its published settlement figures, and the willingness of Foundation officers\n' +
    'to make their own minutes available to the Institute.\n\n' +
    'NOTES APPENDED TO THIS CITATION BY THE FOUNDATION (Pentex Foundation,\n' +
    'internal, 2021-10-29).\n\n' +
    '1. The Institute received 41% of its 2021 funding from the Pentex Foundation\n' +
    'and 38% from Pentex Industries Worldwide, Inc. The remaining 21% is from nine\n' +
    'other industrial companies. The Foundation has been the largest single\n' +
    'supporter of the Institute since 2011.\n\n' +
    '2. The judging framework for the 2021 award was written by a serving officer\n' +
    'of the Institute, employed by the Foundation between 1998 and 2004, at the\n' +
    'request of the Foundation. He left in 2004 and the framework has been in use\n' +
    'since 2006. The Institute has been asked who writes the framework. The\n' +
    'Institute has answered that the framework is written by the Institute.\n\n' +
    '3. The "published settlement figures" referred to in the citation are the\n' +
    'settlement figures published by us, in the instrument, in 1998. We published\n' +
    'the sum. We did not publish the count of enumerated claimants, the schedule\n' +
    'of which 480 of 611 were recruited from the four districts with the lowest\n' +
    'immunisation coverage, the identity of the certifying physician, or the\n' +
    'existence of Clause 7.\n\n' +
    '4. The willingness referred to in the citation is the willingness of the\n' +
    'Foundation officers to make minutes available to the Institute. It was read\n' +
    'in February 2021. The Institute\'s report of its reading is two pages and\n' +
    'concludes that the Foundation is well governed.\n\n' +
    '5. The citation is the fourth the Foundation has received since 2009. The\n' +
    'previous three were awarded by the Institute, by a body in which the\n' +
    'Foundation holds a voting seat, and by a body that the Foundation funds.'));

  D.push(doc('rg-h06', 'intake_monitoring_omissions.txt',
    'Ibara intake monitoring — omissions schedule', '2016-05-20',
    'Regulatory Engineering; the schedule requested at audit and not supplied',
    ['regulatory', 'ibara', 'intake', 'monitoring', 'omissions'],
    'IBARA INTAKE — MONITORING SCHEDULE AS OPERATED\n' +
    'Prepared 2016 from the monitoring contract and the sampling record.\n\n' +
    'PARAMETERS IN THE CONTRACT.\n' +
    '  1. Volatile organics (method 624)\n' +
    '  2. Phenols (method 8270)\n' +
    '  3. Permanganate value\n' +
    '  4. Turbidity\n' +
    '  5. Nitrates\n' +
    '  6. Copper\n' +
    '  7. Arsenic\n' +
    '  8. Cadmium\n' +
    '  9. Chromium, total\n' +
    ' 10. Lead\n\n' +
    'PARAMETERS IN THE SAMPLING RECORD.\n' +
    '  1. Volatile organics    1994-2003, then twice a year from 2004\n' +
    '  2. Phenols             continuous, with four gaps of 6-14 months\n' +
    '  3. Permanganate value  never\n' +
    '  4. Turbidity           never\n' +
    '  5. Nitrates            1994, then never\n' +
    '  6. Copper              1994, 1995, then never\n' +
    '  7. Arsenic             1994, 1995, then never\n' +
    '  8. Cadmium             never\n' +
    '  9. Chromium, total     never\n' +
    ' 10. Lead                never\n\n' +
    'The five metals most associated with the operation are not in the sampling\n' +
    'record, and the turbidity parameter, which is the only cheap indicator of a\n' +
    'sediment plume, was never measured at an intake that has been supplied from\n' +
    'a reach that has received 10,000 tonnes a year of a compound whose principal\n' +
    'hazard to humans is dermal contact and which precipitates on contact with\n' +
    'organic-rich sediment.\n\n' +
    'WHY THESE FIVE. It is not known. They were removed from the panel in 1996 by\n' +
    'a letter from the concession company which describes them as "parameters of\n' +
    'historical interest". Copper, arsenic, cadmium, chromium and lead are\n' +
    'parameters of historical interest in a basin into which the concession\n' +
    'company has applied 40,000 tonnes of an agricultural chemical.'));

  D.push(doc('rg-h07', 'notification_hour_96.txt',
    'Notification timing, CARRION release of 1994-03-11', '1994-06-04',
    'PetroChem Division; not sent; prepared and retained',
    ['regulatory', 'carriion', 'notification', 'hour_96', 'deadline'],
    'DRAFT NOTIFICATION — NOT SENT\n' +
    'Matter: release at station 7 into the Rio Vermelho, 1994-03-11.\n' +
    'Prepared by Regulatory Engineering. The release was notified at hour 96.\n\n' +
    'THE REQUIREMENT.\n' +
    'A release of a listed substance into a watercourse is notifiable within 24\n' +
    'hours of the Group becoming aware of it. Notice within 24 hours is\n' +
    'sufficient. Notice on the day of the event is not required.\n\n' +
    'WHEN THE GROUP BECAME AWARE.\n' +
    '1994-03-11  06:10  Station operator observes turbidity at the outfall.\n' +
    '1994-03-11  09:40  Shift supervisor records 1.9 million litres released,\n' +
    '                 estimate based on flow and operator observation. No\n' +
    '                 downstream notification made.\n' +
    '1994-03-15  11:00  A fish mortality is reported by a contractor at the Ibara\n' +
    '                 intake, 41 km downstream. The Group is informed.\n' +
    '1994-03-15  17:30  Regulatory Engineering is informed that there is a\n' +
    '                 mortality. No measurement has been made.\n' +
    '1994-03-16  09:00  First sample taken at the outfall. Volume estimated from\n' +
    '                 the 06:10 observation: 1.9 million litres.\n' +
    '1994-03-18  08:00  Second sample. Compound identified as a PCP derivative.\n' +
    '1994-03-19  09:00  Notification drafted, this document.\n' +
    '1994-03-15  (the 96-hour point falls on this date, from 06:10 on the 11th\n' +
    '             to 06:10 on the 15th)\n' +
    '1994-06-04  Notice actually given to the state authority, 85 days later,\n' +
    '             on the advice of Group Legal, on the ground that the initial\n' +
    '             report could not state a volume, and that a report which states\n' +
    '             no volume invites an inspection.\n\n' +
    'WHY THE DOCUMENT WAS NEVER SENT, AND WAS RETAINED.\n' +
    'The 19 March draft states a volume of 1.9 million litres, a substance, a\n' +
    'reach of 41 km and an intake. It would have been the whole event on one page.\n' +
    'It was superseded. Nothing in the file says by what.\n\n' +
    'The document is retained because Legal advised in 1998 that an un-sent draft\n' +
    'notification is not a reportable event, and that it is therefore preferable to\n' +
    'a sent notification, and that it is preferable to have retained the draft\n' +
    'because a company with no draft has nothing to disclose about its\n' +
    'notification process.'));

  D.push(doc('rg-h08', 'jurong_exemplar_award.txt',
    'Jurong Technology Park — 2022 exemplar award citation', '2022-05-18',
    'Jurong Economic Development Board',
    ['regulatory', 'jurong', 'award', 'exemplar', 'assay'],
    'JURONG TECHNOLOGY PARK — CITATION, EXEMPLARY SITE OF THE YEAR 2022\n' +
    'Awarded by the Jurong Economic Development Board, 2022-05-18.\n\n' +
    'In recognition of exemplary standards of process safety, environmental\n' +
    'management, and community engagement at the Jurong Technology Park,\n' +
    'including the implementation of a closed-loop solvent recovery system\n' +
    'achieving 99.4 per cent recovery, an eight-year record of zero reportable\n' +
    'environmental incidents, and an outstanding contribution to the national\n' +
    'skills pipeline.\n\n' +
    'A NOTE FROM THE GROUP REGULATORY OFFICE (internal, 2022-05-19).\n\n' +
    'Every figure in the citation is accurate.\n\n' +
    'Zero reportable environmental incidents is a true statement and is\n' +
    'constructed from the same classification practice as the Ibara record: eleven\n' +
    'measured exceedances in nine years, none reportable, two of which had no\n' +
    'threshold and four of which had the threshold removed.\n\n' +
    'Closed-loop recovery at 99.4 per cent is measured at the recovery unit and\n' +
    'does not include the assay return, which leaves the site in pallets, four at\n' +
    'a time, on a manifest that says do not open, and which is not a recovery\n' +
    'stream and is not declared as a stream because it is not a stream, it is a\n' +
    'shipment.\n\n' +
    'Community engagement is measured by the number of engagements. The Park had\n' +
    '311 in 2021 and the Jurong community association has eleven members and has\n' +
    'asked, four times, for a meeting, and has been given the meeting log each\n' +
    'time rather than the meeting.\n\n' +
    'We should consider whether to decline the award on the ground that the\n' +
    'classification practice which makes it true is the same practice which makes\n' +
    'the Ibara record defensible. The Board has not been asked, because the Board\n' +
    'has never asked, and because the award has been valuable to us in exactly\n' +
    'the way the Ibara classification has been valuable to us.'));

  reg('/regulatory', D);
})(typeof window !== 'undefined' ? window : this);
