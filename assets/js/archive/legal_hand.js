/* Pentex Industries Worldwide — /legal. Hand-written records. */
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
      path: '/legal/' + name,
      name: '/legal/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('lg-h01', 'ibara_settlement_clauses.txt',
    'Ibara Basin Settlement Instrument, Clauses 1-11 (extract)', '1998-06-30',
    'Group Legal / external counsel: Halloran Vane & Fitch',
    ['legal', 'settlement', 'ibara', 'water', 'clause'],
    'INSTRUMENT OF SETTLEMENT AND RELEASE\n' +
    'Ibara Basin (Mato Grosso) — Claimants: the Estate of A. Ferreira and 118 others\n' +
    'Respondent: Pentex do Brasil Quimica S.A.\n' +
    'Executed 1998-06-30. Countersigned by the Affidavit described at Clause 7.\n\n' +
    'CLAUSE 4 — CONSIDERATION.\n' +
    'The Respondent shall pay the sum of BRL 9,400,000 in eleven quarterly\n' +
    'instalments, together with a mortality rider in the amount of BRL 45,000\n' +
    'per established claimant, drafted 1998-04-11 for a plantation division and\n' +
    'adopted here without amendment.\n\n' +
    'CLAUSE 5 — CERTIFYING PHYSICIAN.\n' +
    'The Claimant class shall be enumerated by a physician appointed by the\n' +
    'Respondent and paid by the Respondent. The Claimant class may not object to\n' +
    'the identity of the certifying physician. Any objection shall be construed as\n' +
    'a waiver of the objection.\n\n' +
    'CLAUSE 6 — WATER.\n' +
    'The Respondent shall supply potable water to the enumerated Claimant\n' +
    'households by tanker for a period of twenty years from the date of this\n' +
    'Instrument, without charge and without recorded meter.\n\n' +
    'CLAUSE 7 — TRANSFER OF EVIDENCE.\n' +
    'The enumerated Claimants shall surrender, and shall not thereafter retain,\n' +
    'any sample, notebook, photograph, recording, or other record of the release\n' +
    'of 1994-03-11. Any record so surrendered becomes Respondent property.\n' +
    'Possession of a surrendered record after execution is a criminal offence\n' +
    'under the Federal Water Charter and is not subject to penalty clause.\n\n' +
    'CLAUSE 9 — NO ADMISSION.\n' +
    'Nothing in this Instrument is an admission of liability, of fault, of\n' +
    'foreseeability, or of any fact stated in any proceeding. The Parties agree\n' +
    'that a statement which is true and which is filed as an admission is an\n' +
    'admission, and that this Clause applies to statements filed in any forum.\n\n' +
    'CLAUSE 11 — EFFECTIVE DATE.\n' +
    'This Instrument is effective on execution and is not published.'));

  D.push(doc('lg-h02', 'clause_seven_note.txt',
    'Practice note: why clause seven has never been tested', '2007-04-11',
    'Grigor Malesic, Associate General Counsel, Group Legal (44-31)',
    ['legal', 'ibara', 'clause', 'note', 'malesic'],
    'PRACTICE NOTE — not for distribution outside Legal.\n\n' +
    'Clause 7 is the only clause in the Ibara Instrument that carries a criminal\n' +
    'consequence, and it is the only clause we have never had to enforce.\n\n' +
    'I am asked, perhaps quarterly, whether anyone has tested it. The answer is\n' +
    'that nobody has, and the reason nobody has is that Clause 7 has been doing\n' +
    'its work continuously since 1998 without a single enforcement event. Every\n' +
    'sample notebook we know of from that reach has been surrendered. I have the\n' +
    'receipts. There are ninety-four of them and they are all signed by the same\n' +
    'man, who was our logistics clerk at Cota until 2003.\n\n' +
    'To test clause seven you would need to establish that a person retained a\n' +
    'record after execution. The only person who can testify to such a fact is\n' +
    'the person who retained it, and that person, if they exist, has had nine\n' +
    'years to consider the sentencing exposure under the Federal Water Charter\n' +
    'before deciding whether to speak.\n\n' +
    'Do not send me a witness statement on this subject without first confirming\n' +
    'in writing that the witness understands clause seven. Every draft I have\n' +
    'seen in my time was given by somebody who had not been told.'));

  D.push(doc('lg-h03', 'credential_review_finding.txt',
    'Group Credential Standard CS-2004-11 — review finding', '2016-03-02',
    'Group Information Security; reviewed by Group Legal',
    ['legal', 'credentials', 'security', 'standard', 'password'],
    'REVIEW FINDING — CS-2004-11 (legacy portal authentication)\n\n' +
    'Scope. This review was requested by the Registrar after an exception raised\n' +
    'in connection with the retirement of the Group intranet mirror. It is\n' +
    'recorded here because the standard is still in force on four sub-level\n' +
    'rooms and nobody has been able to close it.\n\n' +
    'Finding 1. The passphrase component of CS-2004-11 is derived from public\n' +
    'material. Specifically: the first word of the second published value in the\n' +
    'Group Mission and Values statement, lowercased. The Mission and Values\n' +
    'statement is published in full at pentex.example/about and has been since\n' +
    '2011. No secret is involved at any point in the derivation.\n\n' +
    'Finding 2. The badge component is derived from the employee short-name as\n' +
    'printed on the site directory badge, lowercased. The site directory is\n' +
    'published at pentex.example/careers. The room number of every member of the\n' +
    'Board and of Group management is published in the same table.\n\n' +
    'Finding 3. Therefore the full credential of any member of Group management,\n' +
    'any Board member, or any of the nine holders of a sub-level 4 account, can be\n' +
    'reconstructed from the public website by a person with no access to the\n' +
    'Group, no credentials of their own, and approximately four minutes.\n\n' +
    'Finding 4. Recommendation: decommission CS-2004-11. All active accounts to be\n' +
    'migrated to hardware token with independent passphrase.\n\n' +
    'Disposition. Recommendation accepted. Implementation deferred.\n' +
    'Deferred on the grounds recorded at Finding 5.\n\n' +
    'Finding 5. During migration, sixty-one authentication events per working day\n' +
    'would require re-issue of credentials to processes, not persons. Several of\n' +
    'these processes were implemented before the current Group had a records\n' +
    'discipline and no owner can be identified who is willing to be named on the\n' +
    're-issue. It was noted that in the interim, CS-2004-11 is the reason any of\n' +
    'this is documented at all: had the standard been strong, this document would\n' +
    'not exist, and the finding would be a secret instead of a finding.'));

  D.push(doc('lg-h04', 'insurance_master_section7.txt',
    'Master policy schedule, Section 7 — insurable interest', '2019-01-04',
    'Risk Management; broker: Holloway & Fitch',
    ['legal', 'insurance', 'section7', 'wyrm'],
    'MASTER PROGRAMME — EXTRACT SECTION 7\n' +
    'Insured: Pentex Industries Worldwide, Inc. and subsidiaries\n' +
    'Section 7 — INSURABLE INTEREST AND EXCLUSION\n\n' +
    '7.1 The Underwriters agree to indemnify the Insured in respect of all\n' +
    'loss or damage to the property insured, however caused, including loss by\n' +
    'departure of an active principle.\n\n' +
    '7.2 The Underwriters will not be liable for loss arising from the\n' +
    'corruption, ingestion, or transformation of the soil, water, air or biomass of\n' +
    'any tract by any agent, whether the agent be of the Insured, a contractor,\n' +
    'a subsidiary, or an agent of a third party, where such agent has not been\n' +
    'described in writing to the Underwriters before the loss.\n\n' +
    '7.3 Nothing in Section 7 limits any warranty given elsewhere in this\n' +
    'programme. Where the description of the Insured business in the Schedule\n' +
    'states that the Insured manufactures fertilisers, agricultural chemicals and\n' +
    'industrial reagents, that description governs, and it is not to be read as\n' +
    'including the manufacture of anything the Underwriters have not named.\n\n' +
    'Schedule note, appended 2019-06-11 by Risk Management:\n' +
    'Section 7.2 has been in the programme since 1961 and has never been claimed\n' +
    'under. We consider it unlikely to be claimed under. We have never been able\n' +
    'to find out what it excludes, because the paragraph that would define the\n' +
    'excluded agent was removed from the template in 1974 as redundant.'));

  D.push(doc('lg-h05', 'cota_ethics_dissent.txt',
    'Cota Station ethics committee — dissent of the minority report', '2003-04-28',
    'PALIMPSEST file; Committee on Bioethics, Cota Station',
    ['legal', 'ethics', 'cota', 'dissent', 'palimpsest'],
    'PALIMPSEST — DISSENT OF THE MINORITY OF THE COMMITTEE ON BIOETHICS\n' +
    'Cota Station, 2003-04-28\n\n' +
    'The minority does not dispute that the Committee has approved the study. The\n' +
    'minority disputes the word approved.\n\n' +
    '611 subjects were enrolled. 41 returned a signed consent. The Committee was\n' +
    'shown a schedule of recruitment by district and asked to note that the four\n' +
    'lowest districts for childhood immunisation coverage are the four districts\n' +
    'from which 480 of the 611 were drawn. It was put to the Committee that this\n' +
    'is a selection method, that it is efficient, and that it is the reason the\n' +
    'study has a data set at all. It was also put to the Committee that the\n' +
    'efficiency depends entirely on the fact that a population with low\n' +
    'immunisation coverage will not mount the response a cohort needs to mount.\n\n' +
    '94 of the subjects were minors. 17 were under thirteen. Of the 41 consents,\n' +
    '11 were signed by a parent who was shown a consent form describing an\n' +
    'intervention that the minor did not receive, because the consent was taken\n' +
    'before the cohort was allocated.\n\n' +
    'The minority recommends that the Committee record its disapproval of the\n' +
    'word approved and its approval of the word permitted.\n\n' +
    'The minority further recommends that the schedule of recruitment by district\n' +
    'be destroyed.\n\n' +
    'The first recommendation was adopted. The second was referred to Legal and\n' +
    'the schedule is not in the file.'));

  D.push(doc('lg-h06', 'schedule_of_recruitment.txt',
    'PALIMPSEST — schedule of recruitment by district', '2003-05-09',
    'PALIMPSEST file; produced under Clause 7 of the Ibara settlement',
    ['legal', 'ethics', 'cota', 'palimpsest', 'recruitment'],
    'SCHEDULE OF RECRUITMENT BY DISTRICT — COTA STATION, PALIMPSEST\n' +
    'Produced under Clause 7. Received by Group Legal 2003-05-09.\n\n' +
    'DISTRICT           ENROLLED   IMMUNISATION COV   CONSENTS   WITHDRAWN\n' +
    'Quilmes             31        91%                4          2\n' +
    'Alto Vale           38        88%                3          1\n' +
    'Serra do Norte      44        62%                2          3\n' +
    'Baixo Rio           87        41%                3          9\n' +
    'Ponta Seca         168        33%                6          22\n' +
    'Rio Claro          155        38%                8          27\n' +
    'Serra do Leste      88        44%                5          19\n' +
    'TOTAL              611        46%                31         83\n' +
    '                     plus 10 consents received but not located by district\n\n' +
    'Margin note, ink, hand of Counsel:\n' +
    'Forty-six per cent coverage in the enrolled population against 88 per cent\n' +
    'nationally. The two bottom districts are the two largest. This is not a\n' +
    'finding; a finding would require that we intended this and I am not prepared\n' +
    'to write that sentence. This is an observation that the fastest way to\n' +
    'recruit 611 people who will not mount a response is to recruit them where\n' +
    'the response has already been broken, and that our schedule is a record of\n' +
    'having done so.\n\n' +
    'The schedule was produced under Clause 7 and is therefore Group property.\n' +
    'The minority of the Committee on Bioethics asked for its destruction on\n' +
    '2003-04-28. Clause 7 requires that we take it. We took it. We filed it.'));

  D.push(doc('lg-h07', 'what_pentex_is_legally.txt',
    'Memorandum: what Pentex is, legally', '2011-02-17',
    'Group Legal; author not recorded in the copy held',
    ['legal', 'corporate', 'charter', 'structure'],
    'MEMORANDUM — GROUP LEGAL\n' +
    'To: file\n' +
    'Subject: what Pentex is, legally\n' +
    'Date: 2011-02-17\n\n' +
    'The question was asked by a director in the ordinary course of a meeting and\n' +
    'it deserves an ordinary answer.\n\n' +
    'Pentex Industries Worldwide, Inc. is a Delaware corporation, incorporated\n' +
    '1898, listed NYSE under PTX, with its principal office at One Pentex Plaza,\n' +
    'Manhattan. It is, on the public record and for every purpose a counterparty,\n' +
    'a company that manufactures fertilisers, agricultural chemicals, industrial\n' +
    'reagents, munitions components and aerospace materials, and that maintains\n' +
    'research facilities.\n\n' +
    'It is not, in any document filed with any authority, a company whose\n' +
    'activities are governed by a Rite, a covenant, a faculty, or an initiation.\n' +
    'Where such terms appear in Group files they appear as shorthand, and in every\n' +
    'instance in which the shorthand has been examined it has been found to\n' +
    'describe either (a) a committee, (b) a research protocol, (c) a contracting\n' +
    'counterparty, or (d) a person.\n\n' +
    'It is worth recording that no such term appears in the charter, and that the\n' +
    'charter was amended in 1979 to add a division whose charter purpose is\n' +
    'Materials Compatibility Testing, which is a phrase with no commercial\n' +
    'meaning that anyone has been able to supply. The purpose clause was drafted\n' +
    'by a firm of patent attorneys who were told that the phrase was a customs\n' +
    'classification used by a Swiss trading house, which was true, of a Swiss\n' +
    'trading house that no longer exists.\n\n' +
    'A legal person cannot perform a Rite. It can, and does, employ people who\n' +
    'have.\n\n' +
    'This memorandum should be read before any question is asked about a\n' +
    'division, a site, a programme, or a file prefix.'));

  reg('/legal', D);
})(typeof window !== 'undefined' ? window : this);
