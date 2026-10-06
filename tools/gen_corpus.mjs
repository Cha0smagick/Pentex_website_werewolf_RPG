// Pentex — corpus generator.
//
// Produces the procedural half of the archive: the bulk paperwork that a
// corporation of this size genuinely generates, and where repetition is the
// point rather than a defect. Manuals, permits, access logs, bench notebooks,
// shipping papers, prosecution history, ledgers.
//
// Everything is seeded, so running it twice produces byte-identical output and
// a diff means a fact actually changed.
//
//   node tools/gen_corpus.mjs           report counts
//   node tools/gen_corpus.mjs --write   write assets/js/archive/<dir>.js
//
// Hand-written documents live in assets/js/archive/<dir>-hand.js and are never
// touched here. This file only fills the directories that need volume.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'assets', 'js', 'archive');
const WRITE = process.argv.includes('--write');

/* ---------- deterministic randomness ------------------------------------ */

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let rnd = mulberry32(0x9e3779b9);
const rint = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const chance = (p) => rnd() < p;
const pad = (n, w) => String(n).padStart(w, '0');

function rdate(loYear, hiYear) {
  const y = rint(loYear, hiYear);
  const m = rint(1, 12);
  const d = rint(1, 28);
  return `${y}-${pad(m, 2)}-${pad(d, 2)}`;
}

function stamp() {
  return `${pad(rint(0, 23), 2)}:${pad(rint(0, 59), 2)}:${pad(rint(0, 59), 2)}`;
}

/* ---------- fact banks --------------------------------------------------- */

const SITES = [
  ['nyc', 'One Pentex Plaza, Manhattan', 'New York'],
  ['hou', '4400 Bayhead Drive', 'Houston'],
  ['mau', 'Rio Vermelho industrial district', 'Manaus'],
  ['anc', 'Sundowner Airfield, Ward Island', 'Anchorage'],
  ['nov', 'Ob River works, Zone 3', 'Novosibirsk'],
  ['nai', 'Kilifi Road, Tiwi', 'Nairobi'],
  ['bog', 'Cota station,Plot 6', 'Bogotá'],
  ['cal', 'Bow Valley research plot', 'Calgary'],
  ['sin', 'Jurong Logistics Bay 4', 'Singapore'],
];

const DIVS = [
  ['PC', 'PetroChem'],
  ['BS', 'BioSynth'],
  ['MU', 'Munitions'],
  ['AD', 'AeroDyn'],
  ['AR', 'Arcane R&D'],
  ['AG', 'AgriGen'],
  ['PF', 'Pentex Foundation'],
  ['LG', 'Group Legal'],
  ['CS', 'Corporate Security'],
];

const NAMES = [
  'Corvin Aurelian-Hale','Roderick Mbeki-Ng','Lubomir Yezhov','Beatriz Antunes-Vale',
  'Hollis Grange','Dagmar Vance','Aurélie Novak','Rowan Kestrel','Joss Venner',
  'Miriam Achterberg','Tomás Iriarte','Ilse Brandt','Fiona Loch','Abebe Tesfaye',
  'Grigor Malesic','Petra Ilves','Dmitri Olevsky','Yusuf Bayram','Anneke Okonjo',
  'Konstantin Vhalen','Ingrid Halloran','Marcus Oyelowo','Sara Beaulieu',
  'Piotr Zalewski','Nadia Farouk','Owen Blackhall','Tamsin Roache','Hector Villegas',
  'Wei Lin','Anneke Brandt','Duncan Meikle','Ruth Okpara','Emil Sørensen',
  'Claude Thibault','Aisha Mbeki','Lars Holm','Rosalind Ojo','Nikolai Verin',
];

const ROLES = [
  'process engineer','quality lead','site electrician','shift supervisor','lab technician',
  'procurement officer','regional controller','compliance analyst','logistics planner',
  'instrument technician','safety officer','foreman','warehouse supervisor','buyer',
  'document controller','QA inspector','night shift operator','contracts clerk',
  'hydrologist','geologist','field technician','data clerk','payroll officer',
];

const COUNTRIES = [
  ['BR','Brazil'],['US','United States'],['CA','Canada'],['RU','Russia'],['KE','Kenya'],
  ['CO','Colombia'],['SG','Singapore'],['NO','Norway'],['DE','Germany'],['JP','Japan'],
  ['IN','India'],['ZA','South Africa'],['ID','Indonesia'],['MX','Mexico'],['FR','France'],
];

const CARGO = [
  'ore concentrate','catalyst feedstock','process solvent','polymer resin',
  'bio-carrier concentrate','livestock Prophylactic','wildlife deterrent','seed stock',
  'agricultural sample','hazardous sample','laboratory consumable','assay return',
  'industrial lubricant','fire retardant','growth regulator','seed coating',
];

const CLASS_TERMS = [
  'unlimited','restricted — sub-level 4','restricted — programme','internal only',
  'confidential','by appointment','need to know',
];

const SUBJECTS = [
  'subject 04','subject 11','subject 19','subject 22','subject 27','subject 31',
  'subject 38','subject 44','subject 52','subject 58','subject 63','subject 70',
  'subject 76','subject 84','subject 91','subject 97',
];

const VITALS = [
  'weight −2.1 kg','weight −4.8 kg','refusal of solids','mild tremor','fixed dilation',
  'no response to stimulus','diuresis +180%','body temperature 41.2','body temperature 38.4',
  'wound dehiscence','jaundice','apnoea episodes 6/h','seizure 41 s',
];

const BANKS = [
  'Banco Safra','Itaú','Nubank','Deutsche Bank','Barclays','Crédit Agricole','UBS',
  'HSBC','Banque Pictet','Banco do Brasil','JPMorgan','Standard Chartered',
];

const SHIPS = [
  'MV Cormorant','MV Kestrel','MV Aurora Belt','MV Palliser','MV Sable Reach',
  'MV Ironquiet','MV Nine March','MV Harrow Green','MV Ferrous Star','MV Black Alder',
];

const PORT_NOTES = [
  'pallets 19–22 not listed on the return manifest',
  'declared weight differs from the packing list by 8%',
  'shipping marks inconsistent between bill and manifest',
  'bonded until 06:00, released without customs attendance',
  'consignee changed twice in transit',
  'two containers sealed with non-Pentex seals',
  'transshipped twice, three sets of bills',
  'no temperature log for a reefer that was not a reefer',
  'declared as agricultural samples, weighed as machinery',
  'tally sheet signed in a language not used by the carrier',
];

const INFRACTIONS = [
  'smoking within a Class 2 area','unattended hot work','permit expired 41 days',
  'entry without an escort','photographing inside the fence','failure to wear a respirator',
  'spill kit restock overdue','tank level mismatch 6%','unrecorded removal of 12 crates',
  'gate left open 4 minutes','tailgate unlogged','radio traffic on a barred channel',
];

const SUBJECTS_CLIN = [
  'Repeat-dose tolerance','Single-dose range-finding','Reversibility','Tissue distribution',
  'Chronic hepatic','Neurobehavioural battery','Haematology panel','Pathology, gross',
  'Pathology, histological','Carcinogenicity, 18 month','Reproductive screen','Local tolerance',
];

const BENCH_NOTES = [
  'Run abandoned. Column did not resolve; solvent front crept. Pump log attached, no interpretation.',
  'Third replicate matches the second to within 3%. The first does not exist and the notebook says so.',
  'Sample label torn. Re-entered as "unknown, pale" and shelved. Nobody claims it.',
  'Balance calibrated. The operator did not initial the calibration. Calibration accepted.',
  'Incubator logged 39.1 °C overnight against a setpoint of 37.0. Nothing was disposed of.',
  'Analyst noted the end-point is earlier than the protocol predicts and did not escalate.',
  'Second plate is a control and the control grew. Repeat is on hold pending a clean bench.',
  'Run performed after hours without a second signature, which the SOP requires.',
  'Retention time drifted 0.4 min across the series. Report written anyway.',
  'Extract reconstituted in a beaker that had been used for the previous assay.',
  'Cross-contamination suspected. The bench was not cleaned until the following morning.',
  'All values within range, which is itself suspicious given the lot.',
];

const PERMIT_TOPICS = [
  'air emission','water discharge','hazardous storage','land use','well construction',
  'waste transport','biological containment','import of biological material',
  'explosives storage','radiological','noise','wetland','aquifer drawdown','burn permit',
  'clearing limit','pest control','workplace exposure','fire safety','lift operations',
];

const NONCOMPLIANCES = [
  'Monitoring frequency below the permit schedule','Sampling point relocated without notification',
  'Report submitted after the deadline','Chain of custody broken at the receiving lab',
  'Notification threshold miscalculated','Corrective action not verified by the due date',
  'Baseline survey not repeated after the expansion','Public register entry not updated',
  'Independent witness absent for the inspection','Photographs supplied were dated before the inspection',
];

const TITLES_FUNC = [
  { stem: 'Form', kind: 'form', body: (h) => form(h) },
  { stem: 'Standard operating instruction', kind: 'sop', body: (h) => sop(h) },
  { stem: 'Work instruction', kind: 'wi', body: (h) => wi(h) },
  { stem: 'Job safety analysis', kind: 'jsa', body: (h) => jsa(h) },
  { stem: 'Risk assessment', kind: 'ra', body: (h) => ra(h) },
  { stem: 'Calibration record', kind: 'cal', body: (h) => calibration(h) },
  { stem: 'Toolbox talk record', kind: 'tbt', body: (h) => toolbox(h) },
  { stem: 'Shift handover', kind: 'shift', body: (h) => handover(h) },
  { stem: 'Plant notification', kind: 'plant', body: (h) => plant(h) },
  { stem: 'Management of change', kind: 'moc', body: (h) => moc(h) },
];

const TITLES_RD = [
  'Bench notebook', 'Assay worksheet', 'Sample register', 'Reagent preparation log',
  'Chromatogram printout', 'Titration worksheet', 'Culture record', 'Necropsy worksheet',
  'Dosing worksheet', 'Stability study', 'Method development log', 'Raw data annex',
];

const TITLES_SEC = [
  'Access log extract', 'Incident report', 'Standing order', 'Badge audit',
  'Perimeter sweep record', 'Visitor log', 'Key register extract', 'Camera request',
  'Escort request', 'Contract rotation amendment',
];

const TITLES_CLIN = [
  'Subject record', 'Informed consent form', 'Adverse event report', 'Dosing schedule',
  'Laboratory reference range', 'Withdrawal record', 'Autopsy summary',
  'Protocol deviation log', 'Monitoring visit report', 'Necropsy photograph index',
];

const TITLES_RE = [
  'Land acquisition file', 'Title search summary', 'Easement instrument',
  'Option agreement', 'Concession boundary note', 'Valuation instruction',
  'Eviction file', 'Tenancy deposit schedule', 'Right of way plan', 'Encumbrance search',
];

const TITLES_SUBCOM = [
  'Agenda paper', 'Standing Committee minute', 'Decision record',
  'Risk acceptance memo', 'Threshold proposal', 'Continuation note',
  'Observation summary', 'Withdrawal note', 'Review file',
];

const TITLES_MAGI = [
  'Engagement letter', 'Retainer invoice', 'Non-disclosure undertaking',
  'Conflict declaration', 'Invoice', 'Consultancy summary',
];

const TITLES_GAROU = [
  'Watch report', 'Observation log', 'Contact record', 'Threat assessment',
  'Proximity note', 'Encounter summary', 'Disposition note',
];

const TITLES_PARTY = [
  'Know-your-customer file', 'Sanctions screening result', 'Payment profile',
  'Ownership chart extract', 'Contract summary', 'Termination notice',
];

const TITLES_PAT = [
  'Office action', 'Response brief', 'Continuation application', 'Examiner interview note',
  'Foreign filing record', 'Certificate of correction', 'Prior-art submission',
  'Maintenance fee record', 'Terminal disclaimer', 'Assignment record',
];

const TITLES_PROD = [
  'Safety data sheet', 'Product specification', 'Certificate of analysis',
  'Batch record summary', 'Customer specification sheet', 'Handling data sheet',
  'Transport classification', 'Stability statement',
];

/* ---------- document builders ------------------------------------------- */

let seq = 0;
function id(prefix) {
  seq += 1;
  return `${prefix}-${seq.toString(36).padStart(3, '0')}`;
}

function doc(prefix, dir, name, title, date, src, tags, body, extra) {
  return Object.assign(
    {
      id: id(prefix),
      path: `${dir}/${name}`,
      name,
      title,
      date,
      src,
      tags,
      body,
      size: 1400 + body.length,
    },
    extra || {},
  );
}

function hdr(o) {
  return [
    `PENTEX INDUSTRIES WORLDWIDE, INC.`,
    `${o.kind}`,
    `Reference: ${o.ref}`,
    `Site: ${o.site}`,
    `Originator: ${o.by}`,
    `Date: ${o.date}`,
    `Classification: ${o.cls}`,
    '',
  ].join('\n');
}

function foot(o) {
  return [
    '',
    '',
    `Retention: ${o.ret || 'statutory period'}. Destroy under Standing Order 4.`,
    'This document is a Pentex Group internal record.',
  ].join('\n');
}

/* -- functional paperwork ----------------------------------------------- */

function form(h) {
  const site = pick(SITES);
  const [div, divName] = pick(DIVS);
  return hdr(h) +
    [
      `Form no. ${pick(['PTX-01', 'PTX-04', 'PTX-11', 'PTX-19', 'PTX-23', 'PTX-31', 'PTX-44'])}-${pad(rint(1, 9), 1)}`,
      `Revision: ${rint(1, 12)}`,
      '',
      'SECTION A — TASK',
      `Division: ${div} ${divName}`,
      `Location: ${site[1]}, ${site[2]}`,
      `Task: ${pick(['line break', 'valve replacement', 'sampling run', 'tank gouging', 'cone changeover', 'depot clean-down', 'bore survey', 'flare tip change', 'slurry drawdown', 'grid injection'])}`,
      '',
      'SECTION B — PERMIT',
      `Permit no: ${pick(['HS', 'CS', 'EX', 'PT', 'WM', 'EL'])}-${rint(10000, 99999)}`,
      `Issued: ${rdate(2012, 2025)}`,
      `Valid to: ${rdate(2025, 2027)}`,
      `Isolation confirmed: ${chance(0.8) ? 'Y' : 'N — see note 3'}`,
      `Gas test: ${rint(0, 4)} readings, max ${pick(['0.4', '1.2', '2.8', '6.1', '11.4', '18.0'])} %LEL`,
      '',
      'SECTION C — SIGNATURES',
      `Supervisor: ${pick(NAMES)}   ${stamp()}`,
      `Performing authority: ${pick(NAMES)}   ${stamp()}`,
      `Verifier: ${chance(0.7) ? pick(NAMES) : '—'}   ${chance(0.7) ? stamp() : '—'}`,
      '',
      'SECTION D — CLOSE-OUT',
      `Toolbox talk delivered: ${chance(0.9) ? 'Y' : 'N'}`,
      `Waste manifest raised: ${chance(0.5) ? 'Y' : 'N — see note 1'}`,
      `Photographs taken: ${rint(0, 14)}`,
      '',
      'NOTES',
      ...notesBlock(rint(1, 4)),
    ].join('\n') + foot(h);
}

function sop(h) {
  return hdr(h) +
    [
      'PURPOSE',
      `To define the controlled method for ${pick([
        'line breaking on a live hydrocarbon service',
        'opening a process vessel for entry',
        'transferring a listed quantity between tanks',
        'sampling a suspected contaminated groundwater body',
        'conducting a controlled burn on plantation',
        'receiving and quarantining an unregistered consignment',
        'disposal of a listed waste by incineration',
        'decommissioning a vessel in a decommissioning cell',
      ])}.`,
      '',
      'SCOPE',
      `${pick(SITES)[1]} and all associated contractors. This instruction supersedes all previous revisions.`,
      '',
      'RESPONSIBILITIES',
      `Site manager holds the permit. The ${pick(ROLES)} holds the gas test.`,
      'Nobody else holds anything. In particular the verifier does not hold the permit,',
      'which is deliberate and has been raised twice.',
      '',
      'METHOD — SUMMARY',
      '1. Confirm isolation and lock. 2. Confirm gas test within limits.',
      '3. Break the service. 4. Record. 5. Report.',
      '',
      'METHOD — DETAIL',
      ...Array.from({ length: rint(3, 6) }, (_, i) =>
        `${i + 3}. ${pick([
          'Record the actual instrument reading, not the setpoint.',
          'Do not rely on the previous shift record for continuity.',
          'Where a permit boundary and a drain boundary disagree, the drain boundary governs.',
          'Photograph before disturbing. The photograph is the only contemporaneous record.',
          'If the reading is outside limits, stop and do not resume without a new test.',
          'Escalate to the duty manager. Do not self-authorise.',
          'Record the mass. A volume record will be reconciled later and will not match.',
        ])}`,
      ).join('\n'),
      '',
      'EXCEPTIONS',
      'Any deviation is a nonconformity and is raised within one shift.',
      ...(chance(0.35) ? ['', 'Known deviation: see the deviation log for this procedure. There are ' + rint(3, 19) + ' open.'] : []),
    ].join('\n') + foot(h);
}

function wi(h) {
  return hdr(h) +
    [
      `This work instruction applies to: ${pick(ROLES)}`,
      `Competency required: ${pick(['Grade 2', 'Grade 3', 'Grade 4', 'Authorised person', 'Competent person'])}`,
      `Frequency: ${pick(['per task', 'per shift', 'weekly', 'per campaign', 'on change'])}`,
      '',
      'STEPS',
      ...Array.from({ length: rint(4, 9) }, (_, i) =>
        `${i + 1}. ${pick([
          'Bring the permit to the job. If you cannot find it, stop.',
          'Confirm the isolation valve is physically locked and the lock is yours.',
          'Take the reading twice. If the two readings differ by more than 5%, take a third.',
          'Vent to the header, not to atmosphere.',
          'Record the sample point number, not the sample point description.',
          'Seal the sample and write the time on the seal, not only on the sheet.',
          'Move the drum to the laydown area and update the register the same shift.',
          'Washdown to the bund. Do not wash down to the grass.',
        ])}`,
      ).join('\n'),
      '',
      'TOOLS',
      ...Array.from({ length: rint(2, 5) }, () =>
        `- ${pick(['calibrated gas detector', ' intrinsically safe lamp', ' torque wrench', 'H2S scrubber pack', 'lock and tag set', 'portable pump', 'field notebook', 'survey grade camera'])}`,
      ),
      '',
      'STOP WORK CONDITIONS',
      'Stop and escalate if: the isolation cannot be confirmed, the gas test fails, the',
      'permit does not match the work, or you are asked to sign for someone not present.',
    ].join('\n') + foot(h);
}

function jsa(h) {
  return hdr(h) +
    [
      `JSA no. ${pad(rint(1000, 9999), 4)}`,
      `Task: ${pick(['tank entry', 'hot tapping', 'confined space entry', 'working at height', 'live electrical', 'excavation', 'blasting', 'manual handling over 25 kg'])}`,
      '',
      'HAZARDS AND CONTROLS',
      ...Array.from({ length: rint(4, 7) }, () =>
        `• ${pick([
          'Hazardous substance — ',
          'Energised isolation — ',
          'Restricted space — ',
          'Working at height — ',
          'Vehicle movement — ',
          'Residual pressure — ',
          'Biological exposure — ',
          'Noise — ',
          'Manual handling — ',
        ])}${pick(['eliminate', 'substitute', 'isolate', 'ventilate', 'PPE', 'administrative control', 'permit'])}`,
      ),
      '',
      'RESIDUAL RISK',
      `${pick(['Low', 'Medium', 'High', 'High'])} — accepted by ${pick(NAMES)}, ${rdate(2021, 2025)}`,
      '',
      'STOP WORK AUTHORITY',
      'Every person on this job holds stop work authority and none of them may be',
      'penalised for using it. There have been ' + rint(0, 4) + ' instances in the last year.',
    ].join('\n') + foot(h);
}

function ra(h) {
  return hdr(h) +
    [
      `Risk assessment for: ${pick(['delivery of listed quantity', 'manual excavation', 'temporary works', 'fumigation', 'asbestos removal', 'work in the flare radiation zone', 'night shift lone working'])}`,
      '',
      'HAZARD',
      ...Array.from({ length: rint(3, 6) }, () => `- ${pick(['inhalation', 'skin contact', 'eye contact', 'fire', 'explosion', 'noise-induced hearing', 'heat stress', 'psychological'])}`),
      '',
      'EXPOSURE',
      `${rint(1, 8)} workers, ${pick(['indoors', 'outdoors', 'confined', 'elevated', 'underground'])}. Duration ${rint(15, 480)} minutes.`,
      '',
      'CONTROL HIERARCHY',
      'Elimination is not available. Substitution is not available.',
      ...(chance(0.4) ? ['Administrative control is the primary control and it is the weakest of the five.'] : []),
      'PPE: ' + Array.from({ length: rint(2, 5) }, () => pick(['gloves', 'eye protection', 'respiratory protection', 'hearing protection', 'fall arrest', 'flame-resistant coverall'])).join(', '),
      '',
      'REVIEW TRIGGER',
      'On incident, on change of process, on change of personnel, or at twelve months.',
      ...(chance(0.5) ? ['Last review was overdue by ' + rint(20, 400) + ' days. Recorded, not resolved.'] : []),
    ].join('\n') + foot(h);
}

function calibration(h) {
  return hdr(h) +
    [
      `Instrument: ${pick(['gas detector', 'mass flow controller', 'pH meter', 'conductivity probe', 'pressure transmitter', 'flow meter', 'balance', 'spectrophotometer', 'flame photometer'])}`,
      `Asset tag: ${pick(['INS', 'CAL', 'MET'])}-${pad(rint(10000, 99999), 5)}`,
      `Calibrated against: ${pick(['traceable reference standard', 'working standard', 'manufacturer standard'])}`,
      '',
      'AS FOUND',
      ...Array.from({ length: 4 }, (_, i) =>
        `Channel ${i + 1}   as found ${(rnd() * 6 - 3).toFixed(2)}   as left ${(rnd() * 6 - 3).toFixed(2)}   within tolerance: ${chance(0.85) ? 'Y' : 'N'}`,
      ),
      '',
      'DECISION',
      ...(chance(0.3)
        ? ['Instrument returned to service with one channel out of tolerance. The channel', 'was not in use during the period of the out-of-tolerance excursion. This was not', 'verified independently.']
        : ['Instrument fit for use. All channels within tolerance.']),
      '',
      'CALIBRATOR',
      `${pick(NAMES)}   ${stamp()}`,
      'Witness: ' + (chance(0.8) ? pick(NAMES) : 'not present'),
    ].join('\n') + foot(h);
}

function toolbox(h) {
  return hdr(h) +
    [
      `Topic: ${pick([
        'why the last two near-misses were not reported',
        'the new lock-out points',
        'heat stress in the flare radiation zone',
        'what to do when you find an unregistered consignment',
        'why the photographic record matters',
        'the change to the notification threshold',
        'chemical handling after the reclassification',
        'why the drain is not a permitted discharge point',
      ])}`,
      `Delivered by: ${pick(NAMES)} to ${rint(3, 24)} persons`,
      `Language(s) understood by all present: ${chance(0.85) ? 'confirmed' : 'NOT confirmed — interpreter requested'}`,
      '',
      'ATTENDANCE',
      ...Array.from({ length: rint(4, 14) }, () =>
        `- ${pick(NAMES)}, ${pick(ROLES)}`,
      ),
      '',
      'QUESTIONS ASKED',
      ...(chance(0.7)
        ? [
            `- "${pick([
              'who signs for the night shift?',
              'what happens to the drum afterwards?',
              'why is the reading different from the one on the board?',
              'is the drain still the same?',
              'are we still photographing?',
              'what does sub-level 4 actually approve?',
              'who do I tell if I think something is wrong?',
            ])}"`,
            '  Answer given: see attached note. Answer recorded: partially.',
          ]
        : ['None recorded.']),
    ].join('\n') + foot(h);
}

function handover(h) {
  const out = hdr(h) +
    [
      `Shift: ${pick(['A', 'B', 'C', 'day', 'night'])}   ${rdate(2023, 2025)}`,
      `Outgoing: ${pick(NAMES)}   Incoming: ${pick(NAMES)}`,
      '',
      'PLANT STATE',
      `Throughput ${rint(60, 98)}%   Open permits ${rint(0, 9)}   LOTO count ${rint(1, 22)}`,
      `Open alarms: ${rint(0, 5)}   Repeat alarms: ${rint(0, 3)}`,
      '',
      'CARRIED OVER',
      ...Array.from({ length: rint(2, 6) }, () =>
        `- ${pick([
          'tank level mismatch 6% at bay 3, instrument being proved',
          'guarding removed at conveyor 2, awaiting sign-off',
          'gas detector out of calibration, one spare remaining',
          'sewage lift alarm intermittent',
          'delivery of listed quantity deferred, carrier did not arrive',
          'contractor induction incomplete for two welders',
          'sample fridge logged 8.4 °C overnight',
          'vent stack flame arrestor inspection overdue',
        ])}`,
      ),
      '',
      'COMMUNICATED TO SUPERVISION',
      ...(chance(0.3)
        ? ['Not communicated. Incoming shift accepted the handover verbally and the', 'verbal acceptance is not recorded. Nobody can say who was told.']
        : [`Escalated at ${stamp()} to ${pick(NAMES)}.`]),
    ].join('\n');
  return out + foot(h);
}

function plant(h) {
  return hdr(h) +
    [
      `Notification type: ${pick(['process upset', 'loss of containment', 'odour report', 'exceedance', 'unplanned shutdown', 'near miss'])}`,
      `Reported to: ${pick(['Regulator', 'Local authority', 'Emergency service', 'Corporate HSE', 'Landowner', 'Neighbouring community'])}`,
      '',
      'WHAT HAPPENED',
      pick([
        'A separation stage tripped on high level and dumped to the flare. The release to',
        'atmosphere followed within eleven minutes and was visible from the public road.',
        'A transfer was stopped by the operator twenty minutes before the interlock would',
        'have stopped it. The interlock was found to be defeated the following day.',
        'A relief valve lifted at set pressure. The flare knock-out drum was not in service',
        'and had been out of service since the previous quarter.',
        'Power was lost for forty minutes. Emergency lighting failed. The site evacuation',
        'was called by a contractor rather than by the control room.',
      ]),
      '',
      'NOTIFICATION TIMING',
      `Event: ${stamp()}`,
      `Internal: ${stamp()}`,
      `External: ${stamp()}`,
      `Permit condition requires notification within 24 hours.`,
      ...(chance(0.4) ? ['External notification was made late. The register records the reason as', '"clarification of preliminary results", which took nine days.'] : []),
      '',
      'IMMEDIATE ACTIONS',
      ...Array.from({ length: rint(2, 5) }, () => `- ${pick([
        'source isolated', 'area barricaded', 'sampling commenced',
        'potable water intake notified', 'downstream users notified by telephone',
        'independent monitor engaged', 'community liaison officer stood down',
      ])}`),
    ].join('\n') + foot(h);
}

function moc(h) {
  return hdr(h) +
    [
      `Change: ${pick([
        'increase feed rate by 10% at the primary reactor',
        'replace a fixed roof with a floating roof on tank 4',
        'introduce a second contractor on the same permit',
        'move the discharge point 400 m downstream',
        'replace manual sampling with an automatic sampler',
        'substitute a solvent in the extraction stage',
        'extend operating hours through the night shift',
        'install a temporary bund at the loading bay',
      ])}`,
      '',
      'HAZARD REVIEW',
      `Existing controls still adequate: ${chance(0.6) ? 'Y' : 'N'}`,
      `New hazards introduced: ${pick(['none identified', 'increased inventory', 'new night work', 'new contractor interface', 'reduced barrier', 'increased consequence'])}`,
      '',
      'APPROVALS',
      ...Array.from({ length: rint(2, 4) }, () => `- ${pick(NAMES)}, ${pick(['process', 'HSE', 'operations', 'engineering', 'regulatory'])} — ${chance(0.85) ? 'approved' : 'approved with condition'}`),
      '',
      'POST-IMPLEMENTATION REVIEW',
      ...(chance(0.45)
        ? ['Not scheduled. The MOC record was closed on implementation and a PIR was', 'never raised. Three MOCs on this site have no PIR and all three are closed.']
        : ['Scheduled and closed. Findings recorded. No finding required action.']),
    ].join('\n') + foot(h);
}

function notesBlock(n) {
  const pool = [
    'Note 1 — waste was left in the laydown area overnight. Collected next shift.',
    'Note 2 — the permit was raised for the previous job and amended by hand.',
    'Note 3 — isolation could not be positively confirmed. Second lock applied.',
    'Note 4 — the instrument was reading 4% low against the reference standard.',
    'Note 5 — the operator had not completed the competency record for this task.',
    'Note 6 — the drain was in spate at the time of the work. Washed down anyway.',
    'Note 7 — photograph 3 of 9 was taken after the work, not before. Filed regardless.',
  ];
  return Array.from({ length: n }, () => pick(pool));
}

/* -- research ------------------------------------------------------------ */

function bench(h) {
  return hdr(h) +
    [
      `Notebook: ${pick(['NB-', 'BN-'])}${pad(rint(100, 999), 3)}   Page ${pad(rint(1, 400), 3)}`,
      `Study: ${pick(['synthetic route, series B', 'impurity profiling, lot 7', 'stability, 40 °C arm', 'scale-up, 200 L', 'downstream processing', 'in-process control method', 'residual solvent method', 'stability, 25 °C arm'])}`,
      `Operator: ${pick(NAMES)}`,
      '',
      'OBSERVATIONS',
      ...Array.from({ length: rint(3, 6) }, () => pick(BENCH_NOTES)),
      '',
      'MEASUREMENTS',
      ...Array.from({ length: rint(4, 9) }, (_, i) =>
        `run ${pad(i + 1, 2)}   onset ${rint(180, 340)} s   peak ${(rnd() * 100).toFixed(1)}   recovery ${pick(['complete', 'partial', 'none'])}`,
      ),
      '',
      'CONCLUSION',
      pick([
        'Inconclusive. Repeat required.',
        'As expected. No further action.',
        'Not as expected. Escalated verbally. No escalation record raised.',
        'Data not retained; instrument log is attached and the log is the record.',
        'Result stands. The deviation is recorded elsewhere.',
      ]),
      '',
      'SIGNED',
      `Bench: ${pick(NAMES)}   ${stamp()}`,
      `Review: ${chance(0.6) ? pick(NAMES) : '— unsigned —'}   ${chance(0.6) ? stamp() : ''}`,
    ].join('\n') + foot(h);
}

/* -- security ------------------------------------------------------------ */

function access(h) {
  const site = pick(SITES);
  return hdr(h) +
    [
      `Site: ${site[1]}, ${site[2]}`,
      `Period: ${rdate(2024, 2025)} to ${rdate(2025, 2025)}`,
      '',
      'EVENTS',
      ...Array.from({ length: rint(8, 22) }, (_, i) =>
        `${rdate(2024, 2025)} ${stamp()}   ${pick(['in', 'out'])}   ${pick(NAMES)}   badge ${pad(rint(1000, 9999), 4)}   ${pick(['door 1', 'door 2', 'gate 3', 'gate 5', 'roof access', 'level -1', 'sub-level 4'])}${chance(0.12) ? '   !!TAMPER' : ''}`,
      ),
      '',
      'DISCREPANCIES',
      ...(chance(0.6)
        ? [`Badge ${pad(rint(1000, 9999), 4)} was read ${rint(1, 6)} times with no corresponding exit.`,
            'The badge holder was not on site that day according to the payroll extract.']
        : ['None.']),
      '',
      'NOTE',
      'Badge numbers are not names. This log cannot identify anybody without the',
      'directory, and the directory is on a different system.',
    ].join('\n') + foot(h);
}

function incident(h) {
  return hdr(h) +
    [
      `Incident no. ${pad(rint(10000, 99999), 5)}`,
      `Category: ${pick(['unauthorised access', 'property damage', 'record alteration', 'waste manifest irregularity', 'infraction', 'vehicle movement', 'data removal', 'photography'])}`,
      `Reported by: ${pick(NAMES)}`,
      '',
      'WHAT HAPPENED',
      pick([
        'A badge was presented at a door the holder is not authorised for. The badge was',
        'not cloned; the number had simply been issued twice. Two people hold badge',
        'numbers that both read correctly.',
        'A waste manifest was found with the consignee field altered in ink after',
        'signature. The receiving site accepted it without querying.',
        'A contractor photographed a tank farm from the public road. There is no law',
        'against this. He was escorted off site and his badge was suspended.',
        'Records were removed from a controlled area over two nights. Nothing was',
        'reported missing until the quarterly count.',
        'A gate was left open for four minutes. The camera for that gate records to a',
        'drive that is overwritten on a nine-day cycle. The four minutes are not on disk.',
      ]),
      '',
      'ACTION',
      ...Array.from({ length: rint(2, 5) }, () => `- ${pick([
        'badge suspended', 'retraining issued', 'contract terminated', 'camera retention extended',
        'discipline applied', 'matter referred to counsel', 'no action, justified',
        'matter closed without finding',
      ])}`),
      '',
      'SEVERITY',
      `${pick(['low', 'medium', 'high', 'critical'])}   Site manager: ${pick(NAMES)}   Group Security: ${chance(0.5) ? pick(NAMES) : 'not informed'}`,
    ].join('\n') + foot(h);
}

function standing(h) {
  return hdr(h) +
    [
      `Standing Order SO-${pad(rint(10, 99), 2)}`,
      `Issued: ${rdate(2018, 2025)}`,
      `Issued by: ${pick(NAMES)}, Group Corporate Security`,
      '',
      'ORDER',
      pick([
        'Contractors are not to photograph any installation, process, or person while',
        'on site. Breach is grounds for removal and for suspension of the site badge.',
        'No record created at a Pentex site may be destroyed except under Standing Order',
        '4. Standing Order 4 requires a signature from a person who is not the record owner.',
        'All correspondence with external parties relating to a listed matter is routed',
        'through Group Legal. Direct contact is prohibited and is reportable.',
        'Any request for a document relating to sub-level 4 matters is refused. The',
        'refusal is logged with the request and the request is not actioned.',
        'Escort of any visitor beyond the public floor is by a named officer only.',
        'Personal devices are not to be carried below level -1.',
      ]),
      '',
      'EXCEPTIONS',
      'None recorded.',
      '',
      'ACKNOWLEDGEMENT',
      `${rint(120, 3400)} acknowledgements on file. ${rint(0, 40)} outstanding.`,
    ].join('\n') + foot(h);
}

/* -- clinical ------------------------------------------------------------ */

function clinical(h) {
  return hdr(h) +
    [
      `Study: ${pick(TITLES_CLIN).toUpperCase()}`,
      `Subject: ${pick(SUBJECTS)}`,
      `Site: ${pick(SITES)[2]}`,
      `Investigator: ${pick(NAMES)}`,
      `Protocol version: ${rint(2, 9)}`,
      '',
      'BASELINE',
      `Weight ${rint(38, 96)} kg   Temperature ${(36 + rnd() * 2).toFixed(1)} °C   Heart rate ${rint(48, 128)}`,
      `Consented: ${chance(0.9) ? 'yes' : 'NO — see consent file'}`,
      `Consent obtained by: ${chance(0.7) ? 'subject' : 'a parent or guardian who is not listed on the consent form'}`,
      '',
      'DOSING',
      ...Array.from({ length: rint(3, 6) }, (_, i) =>
        `day ${pad(i + 1, 2)}   dose ${(rnd() * 400 + 20).toFixed(0)} mg   ${pick(['PO', 'IV', 'SC', 'inhaled'])}   ${chance(0.15) ? '!! DOSE VARIATION — no record of who authorised' : 'as scheduled'}`,
      ),
      '',
      'OBSERVATIONS',
      ...Array.from({ length: rint(2, 6) }, () => `- ${pick(VITALS)}`),
      '',
      'OUTCOME',
      pick([
        'Withdrew on day 4. Reason: "did not feel right". No further investigation.',
        'Completed. Values returned toward baseline over eleven days.',
        'Died on day 9. Cause recorded as natural causes pending post-mortem.',
        'Died on day 6. Post-mortem performed. Findings excluded from the summary table.',
        'Withdrawn by the sponsor. No reason given in the record.',
      ]),
      '',
      'PERSONNEL',
      `Investigator: ${pick(NAMES)}   ${stamp()}`,
      `Monitor: ${pick(NAMES)}   ${chance(0.5) ? stamp() : '— visit not evidenced —'}`,
    ].join('\n') + foot(h);
}

/* -- real estate --------------------------------------------------------- */

function realestate(h) {
  const site = pick(SITES);
  return hdr(h) +
    [
      `Property: ${pick([
        `${site[2]} — parcel ${rint(10, 99)}${pick('ABCDEF'.split(''))}`,
        `${site[2]} — ${rint(2, 400)} ha concession`,
        `${site[2]} — access corridor, ${(rnd() * 8 + 0.4).toFixed(1)} km`,
        `${site[2]} — former agricultural tenancy`,
      ])}`,
      '',
      'TITLE POSITION',
      `Registered owner: ${pick(['the state', 'a private individual', 'a land bank', 'a municipality', 'an unrecorded customary holder'])}`,
      `Encumbrances found: ${rint(0, 5)}`,
      ...(chance(0.4) ? ['One encumbrance is a customary holding with no registry entry. The', 'registry search cannot return what was never registered. The search is complete.'] : []),
      '',
      'APPROACH',
      `Method: ${pick(['open purchase', 'option with relocation', 'lease with option', 'court filing', 'nominee acquisition', 'compulsory acquisition process'])}`,
      `Consideration: ${rint(40, 900)},000 (local)`,
      `Interim holder: ${pick(['Aurora Stewardship Nominees', 'Ostrich Grove', 'Zambezi Bend Trust', 'Aurel Vasilyev Estate', '— none —'])}`,
      '',
      'RESIDENTS',
      `${rint(0, 340)} households on site. ${rint(0, 12)} hold documented tenure.`,
      ...(chance(0.5)
        ? ['Compensation offered per household. The compensation schedule is the same', 'schedule used for the neighbouring parcel, which was acquired in a different year', 'under different law.']
        : ['Resettlement not required as the concession is described as vacant. Occupancy is described as temporary.']),
      '',
      'OBJECTIONS',
      `${rint(0, 6)} objections on file. ${rint(0, 4)} withdrawn. ${rint(0, 3)} under appeal.`,
    ].join('\n') + foot(h);
}

/* -- sub-level 4 --------------------------------------------------------- */

function subcom(h) {
  return hdr(h) +
    [
      `Paper ${pick(['S4-', 'SC-'])}${pad(rint(1, 900), 3)}   ${pick(TITLES_SUBCOM)}`,
      `Author: ${pick(NAMES)}`,
      `Second author: ${chance(0.7) ? pick(NAMES) : '—'}`,
      '',
      'SUMMARY',
      pick([
        'The programme continues. The threshold for authorisation is unchanged this quarter.',
        'A proposal to lower the authorisation threshold was tabled and withdrawn.',
        'Two continuation requests were approved without reference to the original file,',
        'which could not be located at the time of the request.',
        'The committee noted a divergence between the register and the actual programme.',
        'An observation was made that the register is maintained by the person who benefits',
        'from it. No change was agreed.',
        'A site visit was proposed. The site was described as unsuitable for a visit.',
        'The committee approved the destruction of ' + rint(4, 60) + ' file(s) under Standing Order 4.',
      ]),
      '',
      'RECOMMENDATION',
      pick([
        'Approve as drafted.',
        'Approve with the note that the file is incomplete.',
        'Approve and close the file. The paper is the record.',
        'Defer. The author is no longer employed and cannot be asked.',
        'Approve. Recording a dissent at this level has never changed an outcome.',
      ]),
      '',
      'DISSENT',
      ...(chance(0.6) ? ['None recorded.'] : ['One dissent recorded. The dissenting member has not attended since.']),
    ].join('\n') + foot(h);
}

/* -- practitioners, Garou, counterparties -------------------------------- */

function magi(h) {
  const [cc, country] = pick(COUNTRIES);
  return hdr(h) +
    [
      `Engagement: ${pick(['consultancy', 'retained', 'on-call', 'discrete'])}`,
      `Jurisdiction: ${country} (${cc})`,
      `Fee: ${rint(4, 260)},000 ${pick(['USD', 'EUR', 'GBP', 'CHF'])} per engagement`,
      '',
      'SCOPE OF WORK AS INVOICED',
      pick([
        'Review of site arrangements and an opinion on defensibility.',
        'Attendance at two meetings, no minutes taken.',
        'A letter to a third party. Content not retained in this file.',
        'Advice on the handling of a specific individual. No record of the individual.',
        'Presence at a location for two hours. Purpose not recorded.',
        'Introduction to a party. Terms not agreed in writing.',
      ]),
      '',
      'PERFORMANCE',
      `Instructed by: ${pick(NAMES)}`,
      `Instructing division: ${pick(DIVS)[1]}`,
      `Outcome recorded: ${pick(['successful', 'successful', 'partially successful', 'inconclusive', 'the engagement is not described anywhere'])}`,
      '',
      'FEES AGAINST THIS ENGAGEMENT',
      `${rint(1, 6)} invoice(s), total ${rint(4, 900)},000.`,
      ...(chance(0.35) ? ['One invoice is for work the practitioner states he did not perform.', 'It was paid.'] : []),
    ].join('\n') + foot(h);
}

function garou(h) {
  return hdr(h) +
    [
      `Classification: ${pick(['ally', 'enemy', 'neutral', 'unresolved', 'unresolved'])}`,
      `Last contact: ${rdate(2022, 2025)}`,
        `Contact method: ${pick(['letter', 'third party', 'at a site', 'at an industry event', 'unsolicited'])}`,
        '',
        'ASSESSMENT',
        pick([
          'Cooperative. Has supplied material under a supply agreement and does not',
          'appear to know what the material is used for.',
          'Hostile. Has destroyed material at a site. The site report describes the loss',
          'as an equipment failure.',
          'Approached the company. Two letters, both unanswered. The letters are in the',
          'Foundation file, not this one.',
          'Seen at a facility not on any access list. Facial recognition was not run.',
          'Killed a member of staff. The staff member was recorded as a contractor on a',
          'different site, so the death appears on two registers and neither connects them.',
        ]),
        '',
        'ACTION',
        `${pick([
          'No action. Monitoring continues at the current level.',
          'Contract terminated. Reason recorded as commercial.',
          'Approach deferred to the next quarter.',
          'Approach attempted. No response.',
          'Escalated to Group Security. Group Security has not responded.',
        ])}`,
    ].join('\n') + foot(h);
}

function party(h) {
  const [cc, country] = pick(COUNTRIES);
  return hdr(h) +
    [
      `Entity type: ${pick(['limited company', 'trust', 'nominee company', 'sole trader', 'foundation', 'cooperative', 'branch of a foreign company'])}`,
      `Jurisdiction: ${country} (${cc})`,
      `Incorporated: ${rdate(1998, 2024)}`,
      '',
      'OWNERSHIP',
      `${rint(1, 5)} layer(s) of ownership.`,
      ...Array.from({ length: rint(1, 3) }, (_, i) =>
        `layer ${i + 1}: ${pick(NAMES)} via ${pick(['Ostrich Grove', 'Aurora Stewardship', 'Vance & Mbeki-Ng Holdings', 'a trust with an unlisted protector'])}`,
      ),
      '',
      'WHAT IT ACTUALLY DOES',
      pick([
        'Transships. Three sets of bills, three descriptions, one set of pallets.',
        'Holds assets and executes documents. No employees.',
        'Provides personnel for a function it does not perform.',
        'Makes no commercial sense and is not expected to.',
        'Was dissolved in ' + rdate(2015, 2023) + ' and still appears on invoices issued after that date.',
      ]),
      '',
      'SCREENING',
      `Sanctions: ${chance(0.8) ? 'clear' : 'not screened at onboarding — screened retrospectively and cleared'}`,
      `Adverse media: ${rint(0, 9)} hit(s), ${rint(0, 4)} unresolved`,
      `Beneficial ownership verified: ${chance(0.5) ? 'yes' : 'no, requested twice'}`,
    ].join('\n') + foot(h);
}

function patent(h) {
  return hdr(h) +
    [
      `Filing: ${pick(['US', 'EP', 'WO', 'JP', 'CN', 'CA', 'BR'])}${rint(1000000, 9999999)}`,
      `Family member of: ${PATENTS_HOLDER.length ? pick(PATENTS_HOLDER) : 'none on file'}`,
      `Examiner: ${pick(['unattended', 'attended — interview held', 'attended — interview postponed', 'telephone interview'])}`,
      '',
      'OFFICE ACTION',
      pick([
        'Objection under §102 over a single cited reference. The reference is cited for',
        'a different mechanism and the examiner did not ask.',
        'Objection under §103 obviousness. The combination asserted requires a skill the',
        'field does not possess and which the examiner does not name.',
        'Objection under §112 enablement. The response sets out the enabling detail.',
        'Formalities objection. Corrected.',
        'No office action. Allowed at first examination.',
      ]),
      '',
      'RESPONSE',
      `${chance(0.8) ? 'Filed within the period. ' : 'Filed in extension. '}${pick([
        'Arguments traverse nothing new. The examiner has accepted this before.',
        'Amended to narrow to the commercial embodiment.',
        'Amended to add matter that was not disclosed. No priority issue was raised.',
        'No response required.',
      ])}`,
      '',
      'FEES',
      `${rint(1, 8)} official fee(s). Total ${rint(400, 40000)} ${pick(['USD', 'EUR'])}.`,
      'Disbursements are billed at cost plus ' + rint(5, 40) + '%.',
    ].join('\n') + foot(h);
}

/* Patents is the one directory whose documents cross-reference a fact that lives
   outside this file: the patent estate in lore.js. The corpus is built by a
   top-level object literal further down, so every document is generated the moment
   this module is evaluated — the numbers have to be in hand before then, or every
   patent document ships "Family member of: undefined". lore.js reads
   PENTEX.ARCHIVE.dirs out of data.js, so both files load, in that order. */
let PATENTS_HOLDER = loadPatentNumbers();

function loadPatentNumbers() {
  try {
    globalThis.window = {};
    for (const name of ['data.js', 'lore.js']) {
      new Function(readFileSync(join(ROOT, 'assets', 'js', name), 'utf8'))();
    }
    const numbers = (globalThis.window.PENTEX.PATENTS || []).map((p) => p.no);
    if (!numbers.length) {
      console.warn('  patents: no patent numbers found; family-member field degraded');
    }
    return numbers;
  } catch (err) {
    console.warn(`  patents: family-member field degraded (${err.message})`);
    return [];
  }
}

function prodSheet(h) {
  return hdr(h) +
    [
      `Product: ${pick(['PC-100', 'PC-140', 'PC-220', 'PC-310', 'PC-455', 'BS-050', 'BS-070', 'BS-090', 'BS-110', 'BS-130', 'BS-160', 'MU-10', 'MU-22', 'MU-35', 'MU-48', 'MU-60', 'AD-14', 'AD-27', 'AG-07', 'AG-19', 'AG-24', 'AG-31', 'AR-09', 'AR-12', 'AR-18', 'AR-21', 'AR-25'])}`,
      '',
      'SECTION 1 — IDENTIFICATION',
      `Product identifier: as above`,
      `Recommended use: ${pick(['industrial process', 'agricultural application', 'laboratory preparation', 'animal administration', 'material testing', 'site remediation'])}`,
      `Restrictions: ${pick(['none', 'restricted to trained operators', 'not for human administration', 'not for use within 200 m of a watercourse'])}`,
      '',
      'SECTION 2 — COMPOSITION',
      ...Array.from({ length: rint(3, 6) }, () =>
        `    ${pick(['petrochlorophenol derivatives', 'heavy condensate fraction', 'chelating agent', 'catalyst precursor', 'microbial carrier', 'immunoactive fraction', 'growth regulator', 'thixotropic binder'])}   ${(rnd() * 60 + 1).toFixed(1)}%`,
      ),
      '',
      'SECTION 3 — HAZARDS',
      ...Array.from({ length: rint(3, 6) }, () =>
        `- ${pick(['very toxic to aquatic life with long lasting effects', 'harmful if swallowed', 'causes severe skin burns', 'suspected of causing cancer', 'very toxic to fish', 'may cause genetic defects', 'toxic if inhaled'])}`,
      ),
      '',
      'SECTION 4 — HANDLING AND STORAGE',
      ...(chance(0.3)
        ? ['Storage: as the general warehouse standard. This product is held on a', 'dedicated bund in bay 4 which is not covered by the general standard, because the', 'general standard does not provide for this class of material.']
        : ['Storage: general warehouse standard, segregated from oxidisers.']),
      '',
      'SECTION 15 — REGULATORY',
      `Classification: ${pick(['Acute Tox. 2', 'Aquatic Chronic 1', 'Carc. 1B', 'Skin Corr. 1B', 'STOT RE 1'])}`,
      `Reportable quantities: ${pick(['none', 'see section 2', '100 kg', '1 tonne'])}`,
      ...(chance(0.4) ? ['Section 15 has been amended ' + rint(1, 4) + ' times since first issue. Each amendment', 'narrowed the classification. The change history is retained separately and is not', 'attached to this copy.'] : []),
    ].join('\n') + foot(h);
}

/* -- supply -------------------------------------------------------------- */

function manifest(h) {
  return hdr(h) +
    [
      `Bill of lading: ${pick(['MAEU', 'MSCU', 'HLCU', 'ONEU'])}${rint(1000000, 9999999)}`,
      `Vessel: ${pick(SHIPS)}`,
      `From: ${pick(SITES)[2]}   To: ${pick(SITES)[2]}`,
      `Declared cargo: ${pick(CARGO)}`,
      `Packages: ${rint(4, 900)}   Declared weight: ${rint(2, 480)} MT`,
      '',
      'PACKAGE LIST',
      ...Array.from({ length: rint(3, 8) }, (_, i) =>
        `  pallet ${rint(1, 44)}   ${rint(2, 40)} units   ${(rnd() * 600 + 10).toFixed(0)} kg   ${pick(['palletised', 'boxed', 'drummed', 'bagged', 'uncrated'])}`,
      ),
      '',
      'IRREGULARITIES NOTED AT THE TIME',
      ...(chance(0.7) ? [pick(PORT_NOTES)] : ['None noted at the time.']),
      '',
      'CUSTODY',
      `Released by: ${pick(NAMES)} (${pick(['shipper', 'carrier', 'consignee', 'agent'])})`,
      `Received by: ${chance(0.8) ? pick(NAMES) : '— no signature —'}`,
      ...(chance(0.25) ? ['Bills were set three times. Each set describes different contents.', 'All three were signed by the same person.'] : []),
    ].join('\n') + foot(h);
}

function regFiling(h) {
  return hdr(h) +
    [
      `Permit: ${pick(PERMIT_TOPICS)}`,
      `Authority: ${pick(['state environmental agency', 'regional office', 'municipal authority', 'federal inspectorate', 'county authority'])}`,
      `Reference: ${rint(10000, 99999)}/${rint(2000, 2025)}`,
      '',
      'DECLARED',
      pick([
        'The permit holder confirms compliance with all conditions at the date of issue.',
        'Monitoring is carried out at the frequency stated in schedule 2.',
        'No discharge has occurred outside the permitted point since the last inspection.',
        'The site boundary is as described in schedule 1 and has not changed.',
      ]),
      '',
      'ACTUAL',
      ...Array.from({ length: rint(1, 3) }, () => `- ${pick(NONCOMPLIANCES)}`),
      '',
      'IF AN INSPECTOR READS THIS',
      pick([
        'The declared section and the actual section are filed as one document. This is',
        'not a mistake. It is the point at which someone decided they would be read',
        'together.',
        'The declared section is what the authority holds. This file is what the site holds.',
        'Neither section is signed. The document is filed for completeness and nobody',
        'is accountable for it.',
      ]),
    ].join('\n') + foot(h);
}

/* -- CSV ledgers --------------------------------------------------------- */

function money() {
  const v = rnd() * 4800000 + 400;
  return (Math.round(v * 100) / 100).toFixed(2);
}

function q(v) {
  return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}

function csvLedger(kind) {
  const [cc, country] = pick(COUNTRIES);
  const [siteId, siteLine, siteCity] = pick(SITES);
  const rows = [];
  const push = (cells) => rows.push(cells.map(q).join(','));

  if (kind === 'wire') {
    push(['value_date', 'reference', 'originator', 'beneficiary', 'jurisdiction', 'currency', 'amount', 'purpose_coded', 'approver', 'note']);
    for (let i = 0; i < rint(14, 48); i++) {
      const hot = chance(0.12);
      push([
        rdate(2019, 2025),
        `8855-${pad(rint(1000, 9999), 4)}`,
        pick(NAMES),
        pick(['Vashti Freight & Charter', 'Aurora Stewardship Nominees', 'The Rain Foundation', 'Silva Community Health Trust', 'Zambezi Bend Trust', 'Castellane Metals', 'Ostrich Grove', 'Nodal Freight', 'Deepwater Assay Services', 'Hollowpoint Assurance', 'Kestrel Brothers', 'Groundswell Survey']),
        `${cc} ${country}`,
        pick(['USD', 'USD', 'USD', 'EUR', 'BRL', 'SGD']),
        hot ? (rnd() * 900 + 9000).toFixed(2) : money(),
        pick(['consulting', 'freight', 'grant', 'assay', 'settlement', 'advisory', 'professional fees', 'donation']),
        pick(NAMES),
        hot ? '!!rounding pattern, one cent below invoice' : '',
      ]);
    }
  } else if (kind === 'vendor') {
    push(['period', 'vendor', 'site', 'category', 'invoiced', 'approved', 'paid', 'holdback', 'approver']);
    for (let i = 0; i < rint(18, 60); i++) {
      const inv = rnd() * 900000 + 1000;
      const app = inv * (chance(0.85) ? 1 : 0.8);
      push([
        `${rdate(2021, 2025).slice(0, 7)}`,
        pick(['Ember & Sons', 'Marrow & Daughters', 'Pacific Rim Biolabs', 'Corvid Field Supply', 'Ferrovia', 'Kaldbakur Shipping', 'Ashgrove Disposal', 'Rhine Technical Services', 'Ninth Column', 'Ember & Sons']),
        siteCity,
        pick(['waste', 'freight', 'lab consumables', 'security', 'assay', 'maintenance', 'permits', 'contract labour']),
        inv.toFixed(2),
        app.toFixed(2),
        chance(0.7) ? (app * 0.9).toFixed(2) : '0.00',
        (app * 0.1).toFixed(2),
        pick(NAMES),
      ]);
    }
  } else if (kind === 'foundation') {
    push(['award_ref', 'recipient', 'jurisdiction', 'programme', 'approved', 'disbursed', 'spent_on_houses', 'beneficiaries', 'note']);
    for (let i = 0; i < rint(10, 34); i++) {
      const appr = rnd() * 900000 + 5000;
      const houses = chance(0.12) ? rint(1, 40) : 0;
      push([
        `PF-${rint(1000, 9999)}`,
        pick(['The Rain Foundation', 'Silva Community Health Trust', 'Zambezi Bend Trust', 'Institut für Industrielle Fürsorge', 'Institut für Industrielle Fürsorge', 'Marrow & Daughters']),
        `${cc} ${country}`,
        pick(['water assurance', 'stewardship fellowship', 'assessment fund', 'community health', 'resettlement support', 'independent assessment']),
        appr.toFixed(2),
        (appr * (chance(0.6) ? 1 : 0.85)).toFixed(2),
        houses.toString(),
        rint(0, 900).toString(),
        houses === 0 && appr > 50000 ? '!!full disbursement, zero houses' : '',
      ]);
    }
  } else if (kind === 'ghost') {
    push(['employee', 'badge', 'site', 'payroll', 'net_paid', 'bank', 'status']);
    for (let i = 0; i < rint(20, 70); i++) {
      const dead = chance(0.07);
      push([
        pick(NAMES),
        pad(rint(1000, 9999), 4),
        siteCity,
        rint(12, 260) + ' months',
        (rnd() * 9000 + 900).toFixed(2),
        pick(BANKS),
        dead ? '!!LEFT SERVICE — payroll continues' : 'active',
      ]);
    }
  } else if (kind === 'disarm') {
    push(['date', 'programme', 'unit', 'destination', 'carrier', 'value', 'customs_ref', 'authorised_by', 'note']);
    for (let i = 0; i < rint(12, 40); i++) {
      push([
        rdate(2021, 2025),
        pick(['CAULDRON', 'REDLINE', 'CHOIR', 'MAYFLY', 'CARRION', 'PALIMPSEST']),
        `unit ${pad(rint(1, 4000), 4)}`,
        pick(['Jurong, SG', 'Geylang, SG', 'Vung Tau', 'Lagos Free Zone', 'Constanta', 'Klaipeda', 'Piraeus']),
        pick(['Vashti Freight & Charter', 'Nodal Freight', 'Kaldbakur Shipping', 'Ferrovia']),
        (rnd() * 400000 + 4000).toFixed(2),
        'customs reference does not correspond to any declaration on file',
        pick(NAMES),
        chance(0.3) ? '!!no end-user statement' : '',
      ]);
    }
  }

  return rows.join('\n') + '\n';
}

/* ---------- directory builders ------------------------------------------ */

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 42);
}

function buildFunctional(dir, titles, count, prefix, extra) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const t = titles[i % titles.length];
    const site = pick(SITES);
    const [div] = pick(DIVS);
    const name = `${prefix}_${slug(t.stem)}_${pad(i + 1, 4)}.txt`;
    const h = {
      kind: t.stem,
      ref: `${prefix}-${rint(10000, 99999)}`,
      site: `${site[1]}, ${site[2]}`,
      by: pick(NAMES),
      date: rdate(2019, 2025),
      cls: pick(CLASS_TERMS),
    };
    out.push(
      doc(prefix[0] + prefix[1], dir, name, `${t.stem} — ${site[2]}`, h.date, h.by,
        [div.toLowerCase(), t.kind, 'routine'], t.body(h)),
    );
  }
  return out;
}

/* `namePrefix` keeps basenames unique across directories: two directories that
   share a title list would otherwise produce files the terminal cannot tell
   apart by name. */
function buildNamed(dir, titles, count, prefix, bodyFn, tagBase, namePrefix) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const t = titles[i % titles.length];
    const site = pick(SITES);
    const h = {
      kind: t,
      ref: `${prefix}-${rint(10000, 99999)}`,
      site: `${site[1]}, ${site[2]}`,
      by: pick(NAMES),
      date: rdate(2019, 2025),
      cls: pick(CLASS_TERMS),
    };
    const base = namePrefix ? `${namePrefix}_${slug(t)}` : slug(t);
    out.push(
      doc(prefix[0] + prefix[1], dir, `${base}_${pad(i + 1, 4)}.txt`, `${t} — ${site[2]}`,
        h.date, h.by, [tagBase, 'routine'], bodyFn(h)),
    );
  }
  return out;
}

function buildCsv(dir, kind, count, prefix) {
  const out = [];
  const labels = {
    wire: 'Wire transfer ledger',
    vendor: 'Vendor payment ledger',
    foundation: 'Foundation disbursement ledger',
    ghost: 'Payroll exception extract',
    disarm: 'Distribution ledger',
  };
  for (let i = 0; i < count; i++) {
    const body = csvLedger(kind);
    const name = `${kind}_${rdate(2021, 2024).slice(0, 7)}_${pad(i + 1, 3)}.csv`;
    out.push(
      doc(prefix[0] + prefix[1], dir, name, `${labels[kind]} — ${name.match(/\d{4}-\d{2}/)[0]}`,
        rdate(2022, 2025), 'Group Finance', [kind, 'finance', 'money'],
        body, { fmt: 'csv', size: 2400 + body.length, note: kind === 'wire' ? 'Amounts that end in .01 recur across four years and three jurisdictions.' : '' }),
    );
  }
  return out;
}

/* ---------- the corpus --------------------------------------------------- */

const CORPUS = {
  '/real_estate': buildNamed('/real_estate', TITLES_RE, 130, 'RE', realestate, 'land'),
  '/r_and_d': buildNamed('/r_and_d', TITLES_RD, 200, 'RD', bench, 'research'),
  '/security': buildNamed('/security', TITLES_SEC, 160, 'SC', (h) => (chance(0.55) ? access(h) : chance(0.6) ? incident(h) : standing(h)), 'security'),
  '/clinical': buildNamed('/clinical', TITLES_CLIN, 90, 'CL', clinical, 'human'),
  '/sublevel4': buildNamed('/sublevel4', TITLES_SUBCOM, 95, 'S4', subcom, 'committee'),
  '/magi': buildNamed('/magi', TITLES_MAGI, 90, 'MG', magi, 'practitioner'),
  '/garou': buildNamed('/garou', TITLES_GAROU, 120, 'GA', garou, 'garou'),
  '/counterparties': buildNamed('/counterparties', TITLES_PARTY, 110, 'CP', party, 'counterparty'),
  '/patents': buildNamed('/patents', TITLES_PAT, 180, 'PT', (h) => patent(h), 'patent'),
  '/products': buildNamed('/products', TITLES_PROD, 140, 'PD', prodSheet, 'product'),
  '/supply': buildNamed('/supply', ['Bill of lading', 'Packing list', 'Cargo manifest', 'Delivery order', 'Customs declaration copy'], 120, 'SU', manifest, 'supply'),
  '/regulatory': buildNamed('/regulatory', PERMIT_TOPICS.map((t) => t[0].toUpperCase() + t.slice(1) + ' filing'), 180, 'RG', regFiling, 'regulatory'),
  '/personnel_bulk': buildFunctional('/personnel', TITLES_FUNC, 220, 'PN', null),
  '/black_programs_bulk': buildNamed('/black_programs', TITLES_SUBCOM.concat(TITLES_CLIN), 150, 'BPX', subcom, 'programme', 'prog'),
  '/board_bulk': buildNamed('/board', ['Board paper', 'Committee minute', 'Capital allocation paper', 'Due diligence summary', 'Risk paper'], 60, 'BDX', subcom, 'board'),
  '/finance_wire': buildCsv('/finance', 'wire', 42, 'FI'),
  '/finance_vendor': buildCsv('/finance', 'vendor', 36, 'FI'),
  '/finance_foundation': buildCsv('/finance', 'foundation', 24, 'FI'),
  '/finance_ghost': buildCsv('/finance', 'ghost', 18, 'FI'),
  '/finance_disarm': buildCsv('/finance', 'disarm', 20, 'FI'),
};

/* group the bulk builders into the real directories */
const MERGE = {
  '/personnel': ['/personnel_bulk'],
  '/black_programs': ['/black_programs_bulk'],
  '/board': ['/board_bulk'],
  '/finance': ['/finance_wire', '/finance_vendor', '/finance_foundation', '/finance_ghost', '/finance_disarm'],
};

/* CORPUS keys are synthetic ("/personnel_bulk", "/finance_wire") so the builders
   can be separate functions. They collapse onto a real directory here, and the
   chunk filename follows the directory. Several keys can land on one directory;
   their documents are concatenated into that directory's single chunk so the
   terminal never has to know a file has more than one source. */
function realDir(key) {
  return key.replace(/_bulk$/, '').replace(/_(wire|vendor|foundation|ghost|disarm)$/, '');
}

function chunkName(dir) {
  return dir.slice(1);
}

function emit() {
  const byDir = new Map();
  let total = 0;
  for (const key of Object.keys(CORPUS)) {
    const dir = realDir(key);
    if (!byDir.has(dir)) byDir.set(dir, []);
    byDir.get(dir).push(...CORPUS[key]);
    total += CORPUS[key].length;
  }

  for (const [dir, files] of byDir) {
    // FS is derived from the path, so the prefix has to become the real
    // directory rather than the root.
    files.forEach((f) => {
      f.path = f.path.replace(/^\/[^/]+_(bulk|wire|vendor|foundation|ghost|disarm)\//, dir + '/');
    });
    if (!WRITE) {
      console.log(`  ${dir.padEnd(18)} +${String(files.length).padStart(5)}`);
      continue;
    }
    const js =
      `/* Pentex archive — ${dir}. GENERATED by tools/gen_corpus.mjs. Do not hand-edit.\n` +
      `   ${files.length} documents. Regenerate with --write; the output is deterministic. */\n\n` +
      `(function () {\n  window.PENTEX.REGISTER(${JSON.stringify(dir)}, ${JSON.stringify(files, null, 1)});\n})();\n`;
    writeFileSync(join(OUT, `${chunkName(dir)}.js`), js, 'utf8');
    console.log(`  ${(chunkName(dir) + '.js').padEnd(22)} ${String(files.length).padStart(5)} docs`);
  }
  console.log(`\n${total} procedural documents${WRITE ? ' written' : ' would be written'}.`);
}

mkdirSync(OUT, { recursive: true });

emit();