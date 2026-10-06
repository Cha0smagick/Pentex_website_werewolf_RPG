/* Pentex Industries Worldwide — /field_ops. Hand-written records. */
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
      path: '/field_ops/' + name,
      name: '/field_ops/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('fo-h01', 'reach4_three_closings.txt',
    'Reach 4 — closing record, 1996 to 2021', '2021-10-11',
    'Manaus site, field records; compiled by the site records clerk',
    ['field_ops', 'reach4', 'redline', 'closings', 'mau'],
    'REACH 4 — CLOSING RECORD\n' +
    'Compiled 2021-10-12 by the site records clerk, who has recorded in the file\n' +
    'that she was asked to compile it and that she is producing it because the\n' +
    'gate is to be concrete.\n\n' +
    '1996-08  Reach 4 opened. Standing timber 14 m, mean dbh 41 cm, recorded by\n' +
    '          the concession forestry survey.\n' +
    '1996-2011  Operated under a list of hectares and a deadline. 3,340 ha\n' +
    '          cleared. 1,180 ha replanted in 1998. Regeneration survey 2001:\n' +
    '          emergence 61 per cent, classification "recovering canopy".\n' +
    '2011-2016  Operated under the marker perimeter (Schedule 2). No list. No\n' +
    '          deadline. 1,940 ha cleared. Nothing replanted. No regeneration\n' +
    '          survey, because nothing was planted.\n' +
    '2016-2021  Operated under the marker perimeter. 610 ha cleared. 611 ha\n' +
    '          replanted 2018 and 2019. 2019 regeneration survey: 2018 sowing\n' +
    '          emergence 0 per cent; 2019 sowing emergence 60 per cent.\n' +
    '2021-10-11 Reach 4 closed. Remaining standing volume below commercial\n' +
    '          threshold. Gate 2 to be concreted 2021-11-08.\n\n' +
    'THREE CLOSINGS IN TWENTY-FIVE YEARS.\n' +
    'Reach 4 was closed to felling in 1996 and opened in 1996. That is not a\n' +
    'closing.\n' +
    'The reach was closed to regeneration obligation in 2011, when the list ended\n' +
    'and the replanting obligation ended with it.\n' +
    'The reach is closed now, for the first time, on the grounds that the standing\n' +
    'volume is below commercial threshold.\n\n' +
    'A note from the site records clerk.\n' +
    'Every hectare cleared since 2011 was cleared because the perimeter was a\n' +
    'marker and the markers moved. I have read the marker movement records in the\n' +
    'survey folder, because I file them, and I would like to note that in 2016,\n' +
    '2019 and 2021 a marker in this reach was relocated, and in each case the\n' +
    'relocation was signed by the concession company\'s surveyor and by no other\n' +
    'person, and in each case the relocation moved the perimeter outward, and in\n' +
    'each case the relocation was made in the dry season and in the same month as\n' +
    'the issue of an application plan.\n\n' +
    'I am a records clerk. I do not know whether that is a procedure. I know that\n' +
    'I have filed all three and that all three are in this folder.'));

  D.push(doc('fo-h02', 'burn_gradient_2020.txt',
    'Burn of September 2020 — field measurement', '2020-09-30',
    'Field Operations; measurement taken by R. Ferreira',
    ['field_ops', 'burn', 'gradient', '2020', 'mau'],
    'BURN OF SEPTEMBER 2020 — FIELD MEASUREMENT\n' +
    'Reach 2, September 2020. Measured by R. Ferreira, field technician, on 30\n' +
    'September, nine days after the burn.\n\n' +
    'WHAT WE SAW.\n' +
    'The burn ran for 34 km along the road and the ground on either side of the\n' +
    'road is burnt in a band. It is not a firebreak burn. The band of burn follows\n' +
    'the road for 34 km and then stops.\n\n' +
    'THE GRADIENT.\n' +
    'From the road edge outward: full burn to 40 m, scorched standing timber to\n' +
    '400 m, standing dead with scorched north faces to 2.1 km, standing dead with\n' +
    'scorch at the base only to 6.4 km, unaffected beyond 6.4 km.\n\n' +
    'A fire does not do this. A fire does not have a 34:1 gradient along a road and\n' +
    'stop at a distance.\n\n' +
    'THE STIPULATED CONSTRAINT.\n' +
    'The 2020 works were carried out under a memorandum dated 2020-08-11 which\n' +
    'sets, at paragraph 4, an atmospheric constraint: operations to be conducted\n' +
    'such that no visual evidence of combustion is observable from the transect\n' +
    'road. The memorandum states the reason: "the transect road is used by third\n' +
    'parties for access and observation, and the absence of visible evidence\n' +
    'supports the position of the concession in relation to the fires of the\n' +
    '2020 season".\n\n' +
    'So the memorandum was followed. The fire was set at a time when the wind and\n' +
    'the humidity produced no visible plume from the road, and it burned outward, and\n' +
    'by the time it was 400 m from the road the standing timber was dead and the\n' +
    'fire was no longer producing visible evidence, and by 6.4 km there was\n' +
    'nothing to see at all.\n\n' +
    'The fire did 34 km of road. It did 6.4 km of depth. That ratio is what you get\n' +
    'when you set a fire with no visible plume and let it run until nobody can see\n' +
    'it.\n\n' +
    'My name is R. Ferreira. I have measured 41 gradients in this concession for\n' +
    'the company. This is the only one that has a ratio.'));

  D.push(doc('fo-h03', 'firebreak_widths.txt',
    'Firebreak widths, Block 4', '2019-04-11',
    'Field Operations; request from Internal Audit, answered 2019',
    ['field_ops', 'firebreak', 'block4', 'audit', 'mau'],
    'FIREBREAK WIDTHS — BLOCK 4\n' +
    'Requested by Internal Audit. Answered 2019-04-11.\n\n' +
    'REQUEST. Internal Audit asked for the measured width of the firebreak at four\n' +
    'points on the Block 4 boundary, in accordance with the site fire plan.\n\n' +
    'The site fire plan, revised 2017, requires a firebreak of 20 metres on the\n' +
    'block boundary.\n\n' +
    'MEASURED WIDTHS.\n' +
    '  Chainage 0+000    20 m\n' +
    '  Chainage 1+400    20 m\n' +
    '  Chainage 2+800    20 m\n' +
    '  Chainage 4+100    20 m\n\n' +
    'HOW THEY WERE MEASURED.\n' +
    'At each chainage the width was measured by the field technician from the plan\n' +
    'and confirmed visually from the line. No instrument measurement of a firebreak\n' +
    'at Block 4 has been made, because the line is not walkable in the wet season\n' +
    'and in the dry season the standing timber on the boundary has been dead since\n' +
    '2011 and there is no firebreak, there is a corridor of dead wood.\n\n' +
    'THE ANSWER GIVEN TO AUDIT.\n' +
    'The firebreak at Block 4 conforms to the 20 metre requirement.\n\n' +
    'NOTE APPENDED BY THE FIELD SUPERVISOR, 2019-04-11.\n' +
    'The answer is correct in the sense that a corridor of 20 metres exists at\n' +
    'Block 4, and the corridor is 20 metres wide, and it has been cut. It is not\n' +
    'a firebreak, because a firebreak is cleared to bare ground and maintained, and\n' +
    'this one has been cut once in 2011 and has grown back eight years of dead\n' +
    'timber which burns at a temperature sufficient to carry a crown fire across\n' +
    'it in September.\n\n' +
    'The difference between the corridor and a firebreak is the difference between\n' +
    'a line on a plan and a thing on the ground, and it is the same difference as\n' +
    'the difference between a perimeter defined by a date and a perimeter defined\n' +
    'by a marker, and I have now written that sentence in three files and I would\n' +
    'like somebody in the Group to read one of them.'));

  D.push(doc('fo-h04', 'a_ferreira_statement.txt',
    'Statement of A. Ferreira, forestry contractor', '1998-07-14',
    'Statement taken by Group Legal; unsigned; released in part 2004',
    ['field_ops', 'ferreira', 'statement', 'ibara', 'water'],
    'STATEMENT OF A. FERREIRA\n' +
    'Forestry contractor, Ibara concession, 1988 to 1998. Taken 1998-07-14.\n\n' +
    'I am not a claimant. I want that said first because they keep putting my name\n' +
    'in the same list as the others. I am the estate, my brother was the\n' +
    'claimant, and I sign the papers for the estate, and I have been paid by the\n' +
    'estate and not by them.\n\n' +
    'In March 1994 I was working above the reach and I came down to the river in\n' +
    'the afternoon. The water was the colour of tea. Not brown, tea. And it was\n' +
    'not in the river, it was in the reach, from the outfall down, and you could\n' +
    'see where it started and you could see where it stopped and it stopped at the\n' +
    'intake because the intake is a pipe and the pipe takes it and after the pipe\n' +
    'it was clear.\n\n' +
    'I called the office. I spoke to a man and I told him and he said that was the\n' +
    'weather, that it rains and the colour comes down. I said it does not rain\n' +
    'tea. He said he would send somebody.\n\n' +
    'Nobody came for nine days. I know it was nine days because I came back down\n' +
    'every day for nine days to look at it and it was still there and getting\n' +
    'lighter, and on the ninth day it was gone, and on the tenth day the fish came\n' +
    'up. That was the tenth day, which was a Saturday, and I remember the Saturday\n' +
    'because it is the day my brother went down with the net and did not come\n' +
    'back up.\n\n' +
    'They gave me money for him. I took it. I am not going to pretend I did not\n' +
    'take it, and I am not going to pretend I do not know what it was for. I was\n' +
    'paid because I said what I saw and I was paid for saying it and the money was\n' +
    'for the words and not for the man, and both of those are the same thing and I\n' +
    'have had thirty years to think about which is worse.\n\n' +
    'They killed him and then they paid for four.\n\n' +
    'I have not signed this. I have been told that is normal and that it is\n' +
    'better for me, and it is better for me, and that is the whole of what I have\n' +
    'been given for it.'));

  D.push(doc('fo-h05', 'r_ferreira_sampling_book.txt',
    'Sampling book of R. Ferreira, field technician', '1996-04-30',
    'Held in the field records folder; transcribed 2019',
    ['field_ops', 'ferreira', 'sampling', 'book', 'mau'],
    'SAMPLING BOOK — R. FERREIRA — TRANSCRIBED\n' +
    'The book is a hardback notebook, 180 pages, in the field records folder at\n' +
    'the Manaus site. The transcription was made 2019-04-02 at the request of\n' +
    'Internal Audit. It is a transcript and it is not authorised: the book is not\n' +
    'Group property and the technician has not permitted the pages to be copied.\n\n' +
    'THE BOOK IS A SAMPLING RECORD.\n' +
    'Every second week, since 1996, R. Ferreira has walked a fixed line of 11 km\n' +
    'in the concession and taken a soil sample at 22 points. He has done this for\n' +
    'twenty-three years, 611 times, without a Group procedure, without a budget,\n' +
    'and without pay, and he has paid for the laboratory tests himself out of a\n' +
    'wage that is approximately eleven times an annexe wage.\n\n' +
    'THE FIRST ENTRY, 1996-04-30.\n' +
    '  "Point 4. Wet again. It was dry in March. Nothing at the top, everything at\n' +
    '   40 cm. I am going to keep taking it. R."\n\n' +
    'AN ENTRY FROM 2003-09-16.\n' +
    '  "Point 9. Dead trees since May. The ground is soft where the trees are and\n' +
    '   it is not soft where the trees are not. This is the first year the pattern\n' +
    '   has matched. R."\n\n' +
    'THE LAST ENTRY, 2019-04-16.\n' +
    '  "Point 4. I have been doing this twenty-three years and I know what the\n' +
    '   number is before I send it. I am not going to send it to them any more.\n' +
    '   It is in this book. I am going to give the book to the woman who came in\n' +
    '   April who said she was from internal audit and who wrote down what I told\n' +
    '   her without telling me it could not be used. R."\n\n' +
    'NOTE ON THE TRANSCRIPTION.\n' +
    'The laboratory results for the 611 samples are not in the book. He sent them\n' +
    'to a laboratory in the city for four years and then stopped sending them in\n' +
    '2001, and the results of those four years are not in the Group file either,\n' +
    'because he sent them to himself, and he kept them, and they are with the book.\n\n' +
    'Internal Audit has asked for the book to be retained. The technician has said\n' +
    'the book is his and will go to his daughter and that his daughter is a\n' +
    'soil scientist.'));

  D.push(doc('fo-h06', 'kilifi_walk_0410.txt',
    'The 04:10 walk, Kilifi', '2019-04-10',
    'Field Operations, Kilifi; no author recorded',
    ['field_ops', 'kilifi', 'walk', '0410', 'choir'],
    'THE 04:10 WALK — KILIFI\n' +
    'Walked on 19, 26 March and 2 and 9 April 2019, at 04:10, along the fence of\n' +
    'Tier 3. 4.1 km. Four passes. Same line.\n\n' +
    'WHY 04:10.\n' +
    'The vector house requires a fixed ambient temperature of 28 to 31 degrees and\n' +
    'a fixed photoperiod. The house is 41 metres from the fence. At 04:10 the\n' +
    'house is at 22 degrees and the door must be open for the first transfer, and\n' +
    'the open door is the only time in twenty-four hours that the contents of the\n' +
    'house are in contact with the outside air at a temperature the outside air\n' +
    'can accept.\n\n' +
    'WHAT THE WALK RECORDS.\n' +
    '  19 March   1 release. Vector count 4. Air temperature 22.1. Duration of\n' +
    '             open door 6 minutes.\n' +
    '  26 March   0 releases. House held. Reason: vector count 11, above threshold\n' +
    '             for release to field.\n' +
    '  02 April   2 releases. Vector count 3 and 2. Air temperature 21.8.\n' +
    '  09 April   0 releases. House held. Reason: vector count 9.\n\n' +
    'THE LINE.\n' +
    'At 41 metres from the house, on the 04:10 line, at 22 degrees, at the door:\n' +
    'the recipient of a release is a person standing at the fence.\n\n' +
    'The programme is called CHOIR. The receptor is selective to a Gila-monster\n' +
    'venom homologue. The selectivity index is 0.57, meaning that for every 100\n' +
    'people exposed, 57 receptors are engaged.\n\n' +
    'In 2019 the site enrolled 11 people in the exposure cohort. Four of them died\n' +
    'in the year. All four were over 60 and all four lived within 300 metres of\n' +
    'the fence. All four are excluded from the cohort statistics, because the\n' +
    'protocol excludes a subject who dies of an intercurrent event, and a\n' +
    'response to the vector is an intercurrent event, and so the four deaths are\n' +
    'not in the denominator.\n\n' +
    'The selectivity index of 0.57 was calculated on 7 subjects. Four of those 7\n' +
    'are the four who died. The index describes a population of seven in which four\n' +
    'people are dead and it is reported as a measure of how safe the programme is.\n\n' +
    'THE WALK IS STILL IN THE SCHEDULE FOR 2020. It is at 04:10. It is on the\n' +
    'fence line. Nobody has ever asked why the walk is at 04:10, because the walk\n' +
    'is described in the schedule as "pre-dawn animal movement observation".'));

  D.push(doc('fo-h07', 'nineteen_year_register.txt',
    'Animal register, Novosibirsk vivarium, nineteen years', '2019-12-31',
    'Ilse Brandt, site veterinarian; copied to the file on her retirement',
    ['field_ops', 'novosibirsk', 'animals', 'register', 'mayfly'],
    'ANIMAL REGISTER — NOVOSIBIRSK VIVARIUM — NINETEEN YEARS\n' +
    'Compiled by the site veterinarian on the occasion of her retirement.\n\n' +
    'THE REGISTER IS AN EXTRACT. The vivarium has held 1,411 species by the\n' +
    'Group\'s own count. The register contains 19 lines. The register contains the\n' +
    '19 lines which are the reason a veterinarian kept her own copy.\n\n' +
    'LINE 1. 2001-04-11. 41 mice. 2 died in week 1. Cause: not recorded. Cause\n' +
    'not recorded because the protocol for the study that year did not require\n' +
    'observation notes on a daily basis.\n\n' +
    'LINE 2. 2001-09-02. 41 mice. 4 died in week 2. Cause: not recorded.\n\n' +
    'LINE 3. 2002-03-18. 40 mice. 11 died in week 1. Revision 7 of the protocol\n' +
    'was issued on 2002-04-02, which removed the daily observation note from the\n' +
    'protocol. The eleven deaths are therefore the last eleven deaths in this\n' +
    'facility that anyone was required to observe.\n\n' +
    'LINES 4 TO 17. Fourteen lines, 2002 to 2016, each recording a cohort size and\n' +
    'a mortality figure, and each recording that the mortality figure is an\n' +
    'acceptance rate under the protocol rather than an observation.\n\n' +
    'LINE 18. 2016-09-30. 2 animals, recovered from a holding room after a fire in\n' +
    'the adjoining store. Both survived. The register records the fire as having\n' +
    'occurred in "the stack immediately adjacent to the vivarium holding room" and\n' +
    'records that the stack is not on the site plan.\n\n' +
    'LINE 19. 2019-11-04. 0 animals. The register entry reads, in the\n' +
    'veterinarian\'s hand: "The programme for which the other eighteen lines were\n' +
    'kept has no animals. It is not stopped. There is nothing here to observe. It\n' +
    'is administered to people and the only thing we do here now is hold the\n' +
    'animals we use to make it, and we hold them well, and I have written in this\n' +
    'book every time a cohort was held and every time the protocol stopped asking\n' +
    'us to look, and I have written it out nineteen times because on four occasions\n' +
    'I was asked for a record of mortality and there was no record and this is the\n' +
    'record."\n\n' +
    'NOTE BY THE GROUP ARCHIVIST, on receipt.\n' +
    'I have received this from the site veterinarian personally. She has read\n' +
    'every one of the nineteen lines, she has signed nothing, and she has asked\n' +
    'that it be filed where a person doing the same job in twenty years will find\n' +
    'it. She is not going to be here in twenty years. I have filed it in the vault,\n' +
    'and I have put a copy in the site records folder at Novosibirsk, and I have\n' +
    'written on the copy: "there is a book. Ask."'));

  D.push(doc('fo-h08', 'jurong_pallets_19_22.txt',
    'Manifest extract: Jurong pallets 19 to 22', '2022-03-09',
    'Jurong site, gate 3 records',
    ['field_ops', 'jurong', 'pallets', 'manifest', 'assay'],
    'MANIFEST EXTRACT — JURONG GATE 3 — PALLETS 19 TO 22\n' +
    'Outbound, 2022-03-09, 02:40. Vehicle: covered lorry, plate not recorded.\n\n' +
    'PALLET 19   assay return — do not open\n' +
    'PALLET 20   assay return — do not open\n' +
    'PALLET 21   assay return — do not open\n' +
    'PALLET 22   assay return — do not open\n\n' +
    'TOTAL MASS, FOUR PALLETS: 1,411 kg. CONTENTS NOT ITEMISED.\n\n' +
    'WHAT AN ASSAY RETURN IS.\n' +
    'In every other plant, an assay return is the residue of a quality sample: the\n' +
    'material drawn from a batch for testing and returned afterwards. Assay returns\n' +
    'are collected weekly, they are weighed, and they are destroyed.\n\n' +
    'IN JURONG, ASSAY RETURNS ARE SHIPPED OUT.\n' +
    'Since 2004 the site has shipped assay returns to a registered destructor in a\n' +
    'covered economic zone. The weight is recorded. The destination is recorded. The\n' +
    'manifest does not itemise.\n\n' +
    'THE QUESTION PUT IN 2011 AND 2022.\n' +
    'What proportion of Jurong production is assay return? The site\'s answer, in\n' +
    'both years, is that assay returns are 4.1 per cent of throughput.\n\n' +
    'THE ARITHMETIC.\n' +
    'Jurong produces 41,000 tonnes a year of CAULDRON. 4.1 per cent is 1,681\n' +
    'tonnes a year. The declared assay return shipping rate is 61 tonnes a year.\n\n' +
    'The declared figure is 3.6 per cent of the percentage. Either the throughput\n' +
    'is not 41,000 tonnes, or the assay return is not 4.1 per cent, or the material\n' +
    'that leaves Jurong labelled as assay return is not assay return.\n\n' +
    'The site has answered every question about this with the throughput figure,\n' +
    'which is publicly reported at 41,000 tonnes in the Group\'s annual report, and\n' +
    'which the site does not control.\n\n' +
    'NOTE FROM THE GATE 3 RECORD, in the hand of the gate clerk, appended 2011.\n' +
    'The pallets go out at 02:40 because that is when the truck comes. I have\n' +
    'asked once whether the truck could come in the day. I was told that the\n' +
    'loading bay is used for other things in the day. The loading bay is used for\n' +
    'other things in the day.'));

  D.push(doc('fo-h09', 'newark_nine_hundred_nights.txt',
    'Newark: nine hundred nights', '1974-02-11',
    'Reproduced from the Newark site file',
    ['field_ops', 'newark', 'gaunt', 'nights', 'wyrm'],
    'NEWARK — SITE FILE, 1974-02-11\n' +
    'Transcribed from the site file. The site file is the only paper record in the\n' +
    'estate and predates the incorporation of the Group by twenty-four years.\n\n' +
    'THE RECORD.\n' +
    'A handwritten ledger, one line per night, running from 1890-06-02 to\n' +
    '1891-11-20, 532 nights. The right-hand column of each line is a quantity in\n' +
    'pounds. The left-hand column of each line is one word, and the word is always\n' +
    'the same word.\n\n' +
    'The word is "out".\n\n' +
    'THE LAST NINE HUNDRED NIGHTS.\n' +
    'The ledger for the final 900 nights shows the quantity falling from 41 lbs to\n' +
    '0 lbs, with the last 11 nights at zero and a marginal note in a second hand on\n' +
    'the last line: "it is stopping".\n\n' +
    'THE SECOND HAND IS THE SITE ENGINEER\'S. It is the same hand on a document of\n' +
    '1891 in a file held by a company incorporated in 1898, in a city in which the\n' +
    'Group has no site, no subsidiary, and no record of having had any.\n\n' +
    'WHAT THE NEWARK OPERATION WAS.\n' +
    'From the quantity and the word, and from the archivist\'s note of 2004, the\n' +
    'operation was the extraction of something from beneath the site, and the word\n' +
    'was a direction rather than a measurement: something is out.\n\n' +
    'The archivist\'s note of 2004 records that in 1974 a Group engineer wrote a\n' +
    'memorandum on the Newark ledger which concluded that the ledger described an\n' +
    'operation of the same type as the Group\'s own operations, that the\n' +
    'operation had stopped, that the site had been abandoned by 1892, and that the\n' +
    'engineer recommended no action because "the object of the extraction having\n' +
    'departed, there is nothing at Newark to which the Group would be liable, and\n' +
    'nothing at Newark from which the Group would draw".\n\n' +
    'THE ENGINEER WAS CORRECT ON THE SECOND HALF. A Gaunt is a pressure vessel that\n' +
    'returns less than it consumes. The Group\'s Gaunts get stronger as the vessels\n' +
    'have been open longer, because a vessel opened in 1890 fed on the material of\n' +
    'a city that has since been built on, and a vessel opened in 1979 fed on the\n' +
    'material of a forest that has since been cleared. Newark is the only Gaunt in\n' +
    'the estate that is closed.\n\n' +
    'THE ENGINEER WAS WRONG ON THE FIRST HALF, and the reason is on the second\n' +
    'page of the memorandum, which is in the file and which the archivist read in\n' +
    '2004 and which nobody read before her: "the ledger records the quantity as a\n' +
    'quantity of something out. I have assumed throughout this memorandum that\n' +
    'it is material. It may not be. If it is not material, then the site at Newark\n' +
    'was not an extraction, and there is nothing in the Group\'s business to which\n' +
    'the ledger is comparable, and the memorandum is not evidence of anything."'));

  reg('/field_ops', D);
})(typeof window !== 'undefined' ? window : this);
