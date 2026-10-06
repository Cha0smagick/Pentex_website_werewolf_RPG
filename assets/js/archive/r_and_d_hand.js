/* Pentex Industries Worldwide — /r_and_d. Hand-written records. */
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
      path: '/r_and_d/' + name,
      name: '/r_and_d/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('rd-h01', 'awakeners_register.csv',
    'Arcane R&D — sequence personnel register', '2016-02-29',
    'Arcane R&D Division, Room 2',
    ['r_and_d', 'awakeners', 'register', 'csv', 'faculty'],
    'seq_id,name,site,field,first_sequence,ritual_of_completion,attending,standing\n' +
    'SQ-001,Konstantin Vhalen,Manhattan,Gaunt inverse,1979-08-14,no,no,Faculty\n' +
    'SQ-002,Lubomir Yezhov,Manhattan,Wyrm management,1961-11-02,no,no,Faculty\n' +
    'SQ-003,Sister Anneke Okonjo,Geneva,Ember reagents,1988-03-30,no,no,Faculty\n' +
    'SQ-004,Ilse Brandt,Novosibirsk,veterinary comparative,1984-06-19,yes,yes,Staff\n' +
    'SQ-005,Aurelie Novak,Manaus,lycanthropic vector,1994-10-07,no,no,Staff\n' +
    'SQ-006,Rowan Kestrel,Anchorage,Gaunt exposure,1989-04-21,yes,yes,Staff\n' +
    'SQ-007,Tomás Iriarte,Manaus,concession vegetation,1998-07-15,no,no,Staff\n' +
    'SQ-008,Fiona Loch,Bogotá,estate and soil,1992-01-30,no,no,Staff\n' +
    'SQ-009,Abebe Tesfaye,Kilifi,vector delivery,2001-09-11,no,no,Staff\n' +
    'SQ-010,,,,"2019-03-04,",,,\n' +
    'SQ-011,,,,"2019-03-04,",,,\n' +
    'NOTE,,,,,,"ten attendances recorded; nine standing members; rows 10 and 11 are initialled Vhalen and unexplained and are not counted as attending"'));

  D.push(doc('rd-h02', 'awakenings_by_site.txt',
    'Sequence events by site, 1979-2015', '2015-12-08',
    'Arcane R&D Division, Room 2',
    ['r_and_d', 'awakenings', 'sites', 'history'],
    'SEQUENCE EVENTS BY SITE — COMPILED 2015\n' +
    'Compiled at the request of the Board (reserved estate review). The Board\n' +
    'asked for a table of sites by number of sequence events and received this.\n\n' +
    'SITE          EVENTS   FIRST        LAST         ATTENDING\n' +
    'Newark        3        1890-06-02   1891-11-20   4\n' +
    'One Pentex Plaza 1    1979-08-14   1979-08-14   6\n' +
    'Novosibirsk   2        1984-06-19   1989-04-21   4\n' +
    'Cota          1        1992-01-30   1992-01-30   3\n' +
    'Manaus        3        1994-10-07   1998-07-15   3\n' +
    'Kilifi        1        2001-09-11   2001-09-11   3\n' +
    'Jurong        0        —            —            —\n' +
    'Anchorage     1        2011-02-08   2011-02-08   2\n' +
    'Houston       0        —            —            —\n' +
    'Calgary       0        —            —            —\n\n' +
    'NOTE ON THE THREE EVENTS AT NEWARK.\n' +
    'The Newark events of 1890 and 1891 are not recorded in any Group register and\n' +
    'appear here because the Newark site retained the only paper record in the\n' +
    'estate. They are not attributed to the Group. The Group was incorporated in\n' +
    '1898. Whatever happened at Newark in 1890 happened eight years before this\n' +
    'company existed, and the people who recorded it wrote the word *Wyrm* and a\n' +
    'quantity of tobacco.\n\n' +
    'NOTE ON JURONG.\n' +
    'Jurong has no events. Jurong has produced 4,000 units of CAULDRON and has the\n' +
    'highest throughput of any Group site. A site that manufactures a Rite at\n' +
    'volume and has no sequence events is either the most efficient facility in\n' +
    'the Group or a distribution point for goods made elsewhere. Neither reading\n' +
    'is written down. The Board has asked both questions of Room 2 on three\n' +
    'occasions and has received the answer that Jurong is a plant.'));

  D.push(doc('rd-h03', 'policy_79a_four_questions.txt',
    'Policy 79-A, with the answering notes', '1979-06-11',
    'Arcane R&D Division; adopted 1979, annotated 2004',
    ['r_and_d', 'policy', 'awakeners', 'selection', 'ripoff'],
    'POLICY 79-A — SELECTION OF SEQUENCE SUBJECTS\n' +
    'Adopted 1979-06-11, Room 2. Annotated 2004-11-02.\n\n' +
    'Four questions are put to a candidate. The answer need not be spoken.\n\n' +
    '1. WOULD THEY UNDERSTAND WHAT IS BEING OFFERED?\n' +
    '2. WOULD THEY KEEP IT?\n' +
    '3. WOULD THEY STOP?\n' +
    '4. WOULD THEY FIGHT?\n\n' +
    'A candidate is selected if the answers to 1 and 2 are yes, and if the\n' +
    'answers to 3 and 4 do not correspond.\n\n' +
    'ANSWERING NOTES (2004, Vhalen).\n' +
    'Q3 has been answered no in every recorded case. I have never seen a\n' +
    'candidate answer yes to Q3 and I have stopped expecting it. A person who\n' +
    'would stop is a person who will stop.\n\n' +
    'Q4 has been answered yes in every recorded case, in the recorded case of\n' +
    'someone who could not fight and would not fight and did not want to.\n\n' +
    'This is not a contradiction and it is not a mystical property. A person who\n' +
    'would work and would not fight is a person whose objection is administrative.\n' +
    'An administrative objection can be managed by a supervisor. This is a fact\n' +
    'about how organisations work and it is the only criterion in this policy\n' +
    'that I would defend to a member of staff.\n\n' +
    'The persons selected are the persons who will do the work and who will not\n' +
    'stop the work, whether they understand it or not. That is the policy. It has\n' +
    'selected nine people and it will select more, and it has never selected a\n' +
    'person who wanted to be a hero, which is the outcome for which this Room was\n' +
    'built and the only outcome for which I have ever been content.'));

  D.push(doc('rd-h04', 'room_2.txt',
    'Room 2 — description and inventory', '2004-11-02',
    'Arcane R&D Division; inventory taken on transfer',
    ['r_and_d', 'room2', 'awakeners', 'inventory'],
    'ROOM 2 — ONE PENTEX PLAZA, SUB-LEVEL 4\n' +
    'Inventory taken 2004-11-02 on transfer of the post of Attendant.\n\n' +
    'FURNITURE. One table, four chairs, one steel cabinet.\n\n' +
    'INSTRUMENTS. One copper instrument used for the three undocumented flares.\n' +
    'Two stopwatches. One wooden box containing nine staves, of which four are\n' +
    'cracked and none is engraved. One leather folder holding 219 sheets in nine\n' +
    'hands.\n\n' +
    'THE CABINET. Eleven folders. Ten are labelled with a name. The eleventh is\n' +
    'labelled with a name and the label has been corrected. The original label\n' +
    'was SR-007. The corrected label is SQ-007, and the correction is in the same\n' +
    'hand and the same ink as the original, and both are Vhalen\'s.\n\n' +
    'NOTHING IN THIS ROOM HAS EVER BEEN ENTERED IN THE GROUP ASSET REGISTER.\n' +
    'The reason given when this was raised, in 2004 and again in 2011, is that the\n' +
    'Room is not a room. The reason given is that the Group does not hold a\n' +
    'depreciation on a thing it does not own.\n\n' +
    'PERSONS PRESENT AT INVENTORY. Vhalen (Attendant), Okonjo (Trustee, Foundation\n' +
    'and Grimoire), Yezhov (Faculty, by courtesy of the retirement recorded in\n' +
    'the register), and the incoming Attendant.\n\n' +
    'The incoming Attutant asked how many names the register held. Okonjo answered\n' +
    'eleven. The folder held nine. Nobody in the room explained the discrepancy,\n' +
    'and the incoming Attendant wrote it down, and it is the reason this inventory\n' +
    'exists.'));

  D.push(doc('rd-h05', 'the_faculty.txt',
    'The Faculty — composition and method', '2011-03-15',
    'Grimoire; G. Malesic attended as counsel for the Foundation',
    ['r_and_d', 'faculty', 'grimoire', 'method', 'gaean'],
    'THE FACULTY — COMPOSITION AND METHOD\n' +
    'Recorded 2011-03-15 by counsel to the Foundation at the request of the\n' +
    'Trustee, who wished the Foundation to know the name of the body before which\n' +
    'it held its seat.\n\n' +
    'COMPOSITION. Nine members. All are senior officers, staff, or Trustees of a\n' +
    'Group entity. Eight hold a Group post. One (Yezhov) does not, having resigned\n' +
    'in 2013 a year after this was written — the entry is annotated and the\n' +
    'annotation is by Okonjo, who writes: "he resigned, which is the only recorded\n' +
    'instance of the Faculty losing a member, and he did not leave in anger".\n\n' +
    'SEATS ARE OCCUPIED BY OFFICE. There is no mechanism by which a member of\n' +
    'the Faculty is removed, replaced, or declined to attend. A seat becomes vacant\n' +
    'only on death or on resignation. The Faculty has had nine seats since 1979.\n\n' +
    'METHOD. The Faculty does not vote. It determines. A determination is reached\n' +
    'by the reading of a document to nine people in a room, after which no further\n' +
    'meeting is required, and the document becomes effective. There is no record\n' +
    'of a determination having been rescinded.\n\n' +
    'THE FIRST DETERMINATION (1979-08-16) established the division chartered as\n' +
    'Materials Compatibility Testing and directed that its work be conducted by\n' +
    'persons not otherwise engaged in commercial operations.\n\n' +
    'THE LAST DETERMINATION recorded in this Grimoire (2019-03-04) is initialled\n' +
    'V. and C.A-H. and concerns the two names at rows 10 and 11 of the sequence\n' +
    'personnel register. The text of the determination is not in the Grimoire.\n\n' +
    'COUNSEL\'S NOTE.\n' +
    'A body that determines by reading, that cannot be recalled, and whose seats\n' +
    'are held by office rather than by person, is not a committee. It is closer to\n' +
    'a clause. I have advised on clauses. I recognise the mechanism.'));

  D.push(doc('rd-h06', 'nonhuman_sequences.txt',
    'Non-human sequence inventory', '2008-05-19',
    'Arcane R&D Division, Room 2',
    ['r_and_d', 'gaunt', 'nonhuman', 'inventory', 'wyrm'],
    'NON-HUMAN SEQUENCE INVENTORY — GAUNT OPERATIONS\n' +
    'Inventory of the site fleet. Reissued 2008.\n\n' +
    'NO.   SITE          OPENED      STATUS        YIELD TREND   LOSS\n' +
    'G-01  Newark        1890-09     ceased        n/a           —\n' +
    'G-02  Tennessee     1934-02     in production  declining     —\n' +
    'G-03  Ohio          1961-11     in production  flat          —\n' +
    'G-04  Novosibirsk    1979-03     in production  rising        —\n' +
    'G-05  Novosibirsk    1984-06     in production  rising        —\n' +
    'G-06  Manaus         1989-05     in production  rising        —\n' +
    'G-07  Jurong         2004-09     in production  rising        —\n' +
    'G-08  Calgary        2011-06     sealed         n/a           closed\n\n' +
    'READING THE TABLE.\n' +
    'A Gaunt is not a mine. A Gaunt is a pressure vessel that consumes what is put\n' +
    'into it and returns less than it consumes. The yield trend is the return\n' +
    'fraction, measured quarterly, in the vessel\'s own units.\n\n' +
    'G-02 was opened in 1934 and its yield is declining. G-04 was opened in 1979\n' +
    'and its yield is rising. The difference is not the vintage of the rock. It is\n' +
    'what the vessels have been eating.\n\n' +
    'The question put to Room 2 in 2019 was whether a Gaunt could be fed on\n' +
    'cleared ground. The answer given was that cleared ground is a poor feed and\n' +
    'that a Gaunt prefers standing biomass, and that this was the reason for the\n' +
    'REDLINE perimeter as a survey reference rather than as a date.\n\n' +
    'I have since understood what that answer means, and I am recording it in\n' +
    'this file because I would like it to be found. A Gaunt fed on a forest grows\n' +
    'stronger. The company clears the forest, and the clearing is therefore not a\n' +
    'cost and not a crime. It is feed.'));

  D.push(doc('rd-h07', 'what_the_forest_shows.txt',
    'Field observation record: canopy removal without burning', '2019-07-02',
    'Field Operations, Manaus; filed to R&D',
    ['r_and_d', 'forest', 'canopy', 'redline', 'observation'],
    'FIELD OBSERVATION — REACH 4, BLOCK 4\n' +
    'Filed to Arcane R&D because the pattern did not match any vegetation model\n' +
    'in the Group library.\n\n' +
    'OBSERVATION.\n' +
    'Canopy removed over approximately 220 hectares between March and May 2019.\n' +
    'No burning observed. No flaming observed. No smoke observed on any of four\n' +
    'visits. Standing dead trunks present at approximately 1.4 per hectare,\n' +
    'uniform height, no scorch on the north faces.\n\n' +
    'The vegetation model in the Group library predicts for this biomass either\n' +
    'fire, or felling with residual slash, or slow die-back with root plates.\n' +
    'The model does not contain a mechanism that produces uniform standing death\n' +
    'at 1.4 per hectare over 220 hectares.\n\n' +
    'REPORTED TO THE FIELD SUPERVISOR, WHO RECORDED IT AS NORMAL FOR A SITE\n' +
    'SUBJECT TO CARRION.\n\n' +
    'TO THE DIVISION (my own note, added before filing).\n' +
    'CARRION is a soil penetrant. Its target is the unsaturated zone. I have been\n' +
    'in this company nineteen years and I have read every application record we\n' +
    'hold and I can find no documented route by which a soil penetrant applied at\n' +
    'three litres per hectare kills a canopy tree at fourteen metres, four\n' +
    'months later, without scorch.\n\n' +
    'There is a mechanism. It is in the other file and it is called Ember, and\n' +
    'the three stacks that produce it are not on the site register.\n\n' +
    'I am going to file this because the alternative is to say nothing, and I have\n' +
    'four children and I would like to be able to say that I said something.'));

  D.push(doc('rd-h08', 'why_the_selection_step_was_removed.txt',
    'Standing instruction: the 1988 removal of the selection step', '1988-04-09',
    'Group Archivist, record of an instruction given verbally',
    ['r_and_d', 'retention', 'selection', 'ilves', '1988'],
    'RECORD OF AN INSTRUCTION GIVEN VERBALLY, 1988-04-09\n' +
    'Recorded by the Group Archivist at the time, at her own initiative, in the\n' +
    'language of the person who gave it.\n\n' +
    'Given by: Vhalen. Taken by: Ilves. Present: none other.\n\n' +
    'WHAT WAS SAID.\n' +
    '"From this year the vault keeps everything. There is no selection step. Do\n' +
    'not ask me why. Do not write down why. If you write down why, then in eleven\n' +
    'years somebody will read the why and they will not be able to unsee it, and\n' +
    'they will have to decide what to do about it, and I do not want that on their\n' +
    'desk at three in the morning."\n\n' +
    'WHAT I DID.\n' +
    'I removed the selection step. I wrote the instruction down in my own book\n' +
    'and I did not file it in the vault, because filing it would defeat the\n' +
    'instruction. It is in the book. The book is on the shelf.\n\n' +
    'WHAT I HAVE LEARNED IN THIRTY-ONE YEARS.\n' +
    'He was right, and I did not understand why for about a decade.\n\n' +
    'A vault that keeps everything is a vault that cannot be accused of hiding\n' +
    'anything, because it is not hiding anything, it is simply enormous. Nobody has\n' +
    'ever successfully sued a company for having too much documentation. And a\n' +
    'vault that selects is a vault that can be shown to have removed something,\n' +
    'and that something is always the one they chose.\n\n' +
    'So I have kept everything, and I have written a selection step into my own\n' +
    'book instead of into the policy, and I have told three people in thirty-one\n' +
    'years that I have a book, and none of them has ever asked to read it.\n\n' +
    'The one who would have read it filed with us in March. She filed it as a\n' +
    'letter, not as a demand, which is the only reason this entry can be found.'));

  reg('/r_and_d', D);
})(typeof window !== 'undefined' ? window : this);
