/* Pentex Industries Worldwide — /security. Hand-written records. */
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
      path: '/security/' + name,
      name: '/security/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('se-h01', 'policy_11_photographic.txt',
    'Security Policy 11 — photographic material', '2004-11-02',
    'Corporate Security, S-02',
    ['security', 'policy11', 'photographic', 'media', 'ibara'],
    'SECURITY POLICY 11 — PHOTOGRAPHIC MATERIAL\n' +
    'Issued 2004-11-02. Reviewed 2014. Not reviewed since.\n\n' +
    '1. No photograph, video, aerial image, satellite product, thermal image, or\n' +
    'sound recording of any Group site, interior, process, product, person, or\n' +
    'document shall be taken without notice to Corporate Security in advance.\n\n' +
    '2. Notice shall be given in the name of the applicant, shall state the purpose\n' +
    'of the photography, and shall be granted or refused by the Head of Corporate\n' +
    'Security or by a delegate at the site.\n\n' +
    '3. Where notice is given in respect of a site operated by a subsidiary, the\n' +
    'site delegate is the concession company. At the Ibara basin the site delegate\n' +
    'is the concession company.\n\n' +
    '4. A refusal shall be given in writing, shall state the reason, and shall be\n' +
    'retained by Corporate Security for the statutory period.\n\n' +
    '5. Nothing in this Policy restricts the taking of a photograph for the\n' +
    'purpose of Group business, including quality assurance, incident\n' +
    'investigation, legal discovery, and investor reporting.\n\n' +
    '6. Nothing in this Policy restricts the taking of a photograph by an\n' +
    'employee of the Group at any Group site where the employee is engaged on\n' +
    'Group business. Employees do not give notice to themselves.\n\n' +
    'NOTE ON 5 AND 6, appended by Corporate Security 2014-06-11.\n' +
    'The practical effect of paragraphs 5 and 6 is that the Group photographs\n' +
    'itself freely and that no one else photographs it at all. In the ten years\n' +
    'this policy has been in force the Group has taken approximately 410,000\n' +
    'images of Group sites. It has granted eleven notices to external applicants.\n' +
    'It has refused, in writing and with a reason, nine of them.\n\n' +
    'The four granted notices produced eleven images, none of which shows a\n' +
    'process. All eleven are exterior shots taken from the public road.\n\n' +
    'The nine refusals state, in nine different sentences, that photography would\n' +
    'reveal proprietary process information. Four of them are at the Ibara basin,\n' +
    'where the reason given is that photography would reveal proprietary process\n' +
    'information, and where the notice is granted by the concession company, which\n' +
    'is the subject of any question that would motivate the photography.'));

  D.push(doc('se-h02', 'the_photographer_statement.txt',
    'Statement by a former Group photographer', '2011-02-14',
    'Statement taken by Group Legal; unsigned, released 2011',
    ['security', 'photographer', 'statement', 'olewsky', 'ibara'],
    'STATEMENT OF D. OLEWSKY\n' +
    'Photographer, Group Visual Services, 1994 to 2010. Taken 2011-02-14.\n\n' +
    'I made the images. All of them. Four hundred and eleven thousand, I would\n' +
    'guess, nobody ever counted.\n\n' +
    'In 2003 I went to the Ibara basin with a group of six, because we needed\n' +
    'progress photographs of the revegetation programme for the annual report. I\n' +
    'had a badge and I had a camera and I had told nobody where I was going,\n' +
    'because paragraph 6 says I did not have to, and I have read paragraph 6 many\n' +
    'times since.\n\n' +
    'I got as far as the head of the reach above the intake. There is a road. You\n' +
    'can see the ground from the road and it is not forest, it has not been forest\n' +
    'for some years, and the progress photographs we took in 2003 of the\n' +
    'revegetation programme were of ground we could see from the road.\n\n' +
    'I was at the second bend when the security van came. Two men, they were very\n' +
    'polite, they did not put their hands on me. One of them took my camera and\n' +
    'removed the memory card and put it in a bag, and he wrote me a receipt for the\n' +
    'card, which I still have, it is in this file, it is receipt number 4 of 2003.\n' +
    'He said the card would be returned and it was returned, eleven days later,\n' +
    'and it was formatted, and I know it was formatted because my own photograph\n' +
    'of my daughter at a birthday, from the same card, was not on it when it came\n' +
    'back.\n\n' +
    'I did not make a complaint. I want to be clear that I did not make a complaint\n' +
    'because I was not brave enough, and not because anybody told me not to. I\n' +
    'went to Group Legal myself and they took a statement and it was a good\n' +
    'statement, and they said they would look into it, and then my contract ended\n' +
    'in 2010 because Visual Services was restructured, and I did not make a\n' +
    'complaint.\n\n' +
    'The thing I want on the record is not the camera. The camera is not important.\n' +
    'The thing I want on the record is that in 2003 the annual report said that\n' +
    'the Ibara revegetation programme was showing good progress, and I made the\n' +
    'photographs, and I know what was in them, and I knew at the time that what was\n' +
    'in them was not good progress.\n\n' +
    'I have never been asked to say this and I have never said it.'));

  D.push(doc('se-h03', 'manaus_rotation.txt',
    'Contractor rotation, Manaus synthesis annexe', '2007-04-02',
    'Corporate Security, S-02',
    ['security', 'manaus', 'contractors', 'rotation'],
    'CONTRACTOR ROTATION — MANAUS SYNTHESIS ANNEXE\n' +
    'Instruction issued 2007-04-02, in force to 2016.\n\n' +
    'Annexe workforce is engaged through four registered contracting firms on a\n' +
    'six-month rotation. No contractor is engaged for longer than six months.\n\n' +
    '1. No contractor shall be re-engaged at the annexe within four months of\n' +
    'completion of an engagement.\n\n' +
    '2. No contractor shall be engaged at the annexe and at any other Group site\n' +
    'within the same four-month period.\n\n' +
    '3. Rotation shall be administered by the contracting firm and not by the\n' +
    'site, so that the site does not hold a record of the order in which\n' +
    'contractors have worked.\n\n' +
    '4. The contracting firm shall not disclose the reason for a contractor\'s\n' +
    'non-re-engagement.\n\n' +
    '5. A contractor who asks why he is not being re-engaged is to be told that\n' +
    'the rotation is administered by the firm and that the site does not hold the\n' +
    'record. This is true.\n\n' +
    '6. Four contractors have died in the annexe since 1998. None has been\n' +
    'investigated under the Group incident procedure. The reason recorded in each\n' +
    'case is that the contractor was employed by a contracting firm and not by\n' +
    'the Group.\n\n' +
    'WHY 6 EXISTS.\n' +
    'Paragraph 6 was added by Corporate Security in 2007 as an internal reminder.\n' +
    'It was not intended as a legal position and it is not a legal position. The\n' +
    'position is in the contracting agreements, and the contracting agreements\n' +
    'were drafted by Legal on the same principle, and the principle is that the\n' +
    'Group employs nobody at the annexe.\n\n' +
    'A site where the Group employs nobody cannot have a fatality rate. A site\n' +
    'where the Group employs nobody has, since 1998, had four.'));

  D.push(doc('se-h04', 'the_gate_line.txt',
    'Perimeter control: the gate line', '2013-09-18',
    'Corporate Security, S-02',
    ['security', 'perimeter', 'gate', 'jurong', 'odd'],
    'THE GATE LINE — STANDARD CONFIGURATION\n' +
    'Standard for all Group sites operating a radiological or vector programme.\n\n' +
    'A gate line is a distance. Nothing is built at the gate. The gate line is the\n' +
    'distance at which a person standing outside is counted as being inside for\n' +
    'the purposes of a schedule.\n\n' +
    'CONFIGURATION.\n' +
    '  Post 1  vehicle gate, staffed 24h\n' +
    '  Post 2  pedestrian gate, staffed 24h, at the gate line\n' +
    '  Post 3  fixed observation, at the gate line plus 400 m\n' +
    '  Post 4  mobile, gate line plus 2 km, unstaffed, camera-triggered\n' +
    '  Post 5  the perimeter walk, performed on a schedule, recorded as completed\n' +
    '          whether or not performed\n\n' +
    'Post 5 IS THE WHOLE OF THE DIFFICULTY.\n' +
    'A perimeter walk that is recorded as completed whether or not performed is\n' +
    'permissible only if the recording is the point. In our sites the recording is\n' +
    'the point: the Group is required to demonstrate to a regulator that a\n' +
    'perimeter exists, and the demonstration is a record, and the record is\n' +
    'produced on request.\n\n' +
    'AT JURONG the perimeter walk is recorded as completed 366 days a year. In\n' +
    '2021 it was performed on 4 days. In 2016 it was performed on 61 days, in a\n' +
    'different configuration, before the current schedule.\n\n' +
    'The reason the walk is not performed is not security. It is that the perimeter\n' +
    'passes through a standing liquid discharge that makes the ground impassable\n' +
    'for eleven months of the year, and that the discharge is unlined and is not\n' +
    'recorded on any site plan, and that the plan which shows it is the pallet\n' +
    'store plan, which is held locally.'));

  D.push(doc('se-h05', 'the_daily_brief.txt',
    'Site daily brief — a specimen', '2016-05-20',
    'Corporate Security, S-02',
    ['security', 'brief', 'specimen', 'daily'],
    'SITE DAILY BRIEF — SPECIMEN COPY\n' +
    'Issued by Corporate Security as a specimen. No site name, no date.\n\n' +
    '1. Weather and access. The gate line is passable on foot at the north post on\n' +
    'all days except those following rainfall above 40 mm.\n\n' +
    '2. Visitors. 4,111 visitors in the year to date. 4,109 were escorted. 2 were\n' +
    'not, both of whom were escorted after they had completed the visit.\n\n' +
    '3. Photography. No notices received from external applicants in the year to\n' +
    'date. 61 images of the site taken by Group Visual Services and released to\n' +
    'Group reporting. 0 images released to an external applicant.\n\n' +
    '4. Perimeter. Walk recorded as completed on 366 days.\n\n' +
    '5. Community. 41 engagements in the year to date, being 9 visits by the\n' +
    'community association to the visitor centre, 22 meetings with individual\n' +
    'residents, and 10 letters received and answered. The community association has\n' +
    '11 members. It has requested 4 meetings. It has been given the meeting log on\n' +
    'each occasion in place of a meeting.\n\n' +
    '6. Medical. 2 attendances at the site clinic in the year to date, both of\n' +
    'which were for injuries sustained off site and neither of which was reported\n' +
    'to any authority. Attendance at the clinic is not offered in the recruitment\n' +
    'material. The clinic is used by 3 contractors who live in the accommodation\n' +
    'block.\n\n' +
    '7. Substance control. 9 items of non-listed controlled equipment removed from\n' +
    'the site in the year to date: 4 photographic devices, 3 GPS receivers, 2\n' +
    'aerial cameras. All returned on departure.\n\n' +
    'NOTE APPENDED TO THE SPECIMEN.\n' +
    'Paragraph 4 and paragraph 5 are the two paragraphs in this brief that are\n' +
    'recorded rather than performed, and recorded rather than answered. Everything\n' +
    'else in the brief is a measurement.\n\n' +
    'I have circulated this specimen to every site twice, in 2009 and 2016, with\n' +
    'a note asking whether any site could identify a paragraph in it which was\n' +
    'recorded rather than performed. Four sites replied. The replies identified\n' +
    'paragraphs 2, 6 and 7. No site identified paragraph 4 or paragraph 5.'));

  D.push(doc('se-h06', 'four_men_no_names.txt',
    'Contract: services of a specialist nature (four men, no names)', '2008-01-01',
    'Corporate Security; the file holds the contract and no schedule',
    ['security', 'contract', 'individuals', 'names'],
    'AGREEMENT FOR THE PROVISION OF SERVICES OF A SPECIALIST NATURE\n' +
    'Effective 2008-01-01. Renewed annually. Currently in force.\n\n' +
    'PARTIES. The Group and a firm described at clause 1 as "the Provider".\n\n' +
    '1. The Provider shall supply four (4) persons for the purposes of the\n' +
    'Services. The persons shall be of a specialist nature. The Provider shall not\n' +
    'be required to disclose the identity of the persons supplied.\n\n' +
    '2. The Services shall be performed at such times and in such places as the\n' +
    'Group specifies, and shall include the following: attendance at a site of the\n' +
    'Group\'s choosing; observation of an activity at that site; the taking of no\n' +
    'record of any kind; and the performance of no task other than attendance and\n' +
    'observation.\n\n' +
    '3. The Group shall not require the Provider to disclose the identity of the\n' +
    'persons supplied, and the persons supplied shall not be required to disclose\n' +
    'their employment to any person at the site.\n\n' +
    '4. Consideration: payable to the Provider monthly, at a rate which the Group\n' +
    'records as being set by the Provider and not by the Group. The rate for the\n' +
    'current year is BRL 2,340,000 per person per year, which the Group has noted\n' +
    'is approximately eleven times the Group median annual wage at the Manaus site.\n\n' +
    '5. The persons supplied are not employees of the Group and are not engaged\n' +
    'under any Group procedure. They do not appear in any Group register, in any\n' +
    'site personnel record, in any Group insurance schedule, or in any\n' +
    'occupational health record.\n\n' +
    '6. This Agreement may be terminated by the Group on 24 hours notice.\n\n' +
    'WHAT THE FILE CONTAINS.\n' +
    'The agreement, four invoices, and a schedule of attendance by site and month.\n' +
    'The schedule shows attendance at Manaus, Novosibirsk, Jurong, Kilifi, Cota,\n' +
    'Houston, Calgary and Newark, at intervals that do not correspond to any\n' +
    'inspection schedule the Group operates.\n\n' +
    'It is held by Corporate Security and not by Legal, which is the only file in\n' +
    'this Division not held by Legal.'));

  D.push(doc('se-h07', 'holloway_clause14.txt',
    'Holloway & Fitch — clause 14 of the retainer', '2008-01-04',
    'Corporate Security, copy from the Legal file',
    ['security', 'holloway', 'clause14', 'contract', 'witness'],
    'RETAINER — HOLLOWAY & FITCH — CLAUSE 14\n' +
    'The Group and Holloway & Fitch have had a retainer since 1991.\n\n' +
    '14. WITNESS SERVICES.\n' +
    '14.1 The Firm shall, on the instruction of the Group, provide the services of\n' +
    'a person for the purposes of attendance at and observation of any activity at\n' +
    'any site of the Group, for the purposes of establishing that a person was\n' +
    'present at that site at a given time.\n\n' +
    '14.2 A person provided under 14.1 shall not be asked by the Firm, and shall\n' +
    'not be asked by the Group, to give evidence. A person provided under 14.1\n' +
    'shall not be a witness to any proceeding, whether or not a proceeding of the\n' +
    'Group.\n\n' +
    '14.3 The Firm shall maintain no record of the identity of a person provided\n' +
    'under 14.1. The Group shall not require it to.\n\n' +
    '14.4 The Firm shall not provide a person under 14.1 who is a member of its\n' +
    'staff, a partner, or an associate.\n\n' +
    '14.5 The Firm\'s obligations under this clause are discharged on delivery to\n' +
    'the Group of an attendance schedule by site and month.\n\n' +
    'NOTE BY THE GROUP SOLICITOR, undated.\n' +
    'Clause 14 has been in the retainer since 1991 and I have never seen it\n' +
    'invoked. I was shown it in 2016 by Corporate Security, who asked me whether\n' +
    'it was enforceable and I said that I did not know and would prefer not to.\n\n' +
    'The clause is the reason this firm has been the Group\'s retainer for\n' +
    'thirty-five years, and I have always understood the retainer to be about the\n' +
    'grand jury subpoenas of the 1970s, which the firm handled well.\n\n' +
    'A firm that will not name its witnesses is a firm that can be asked to put\n' +
    'four men in a building without a record of who they are, and a schedule of\n' +
    'attendance is exactly the document a person would need in order to know\n' +
    'whether they had been there. I do not know what it has been used for. I would\n' +
    'like to stop holding this file.'));

  D.push(doc('se-h08', 'the_south_road.txt',
    'Statement: the south road, Manaus', '2010-11-09',
    'Statement taken by Group Legal; unsigned',
    ['security', 'manaus', 'southroad', 'statement', 'witness'],
    'STATEMENT — UNSIGNED — SOUTH ROAD, MENEIM GRABEN, MANAUS\n' +
    'Taken 2010-11-09 at the request of Corporate Security, for the purpose of the\n' +
    'record. The person making this statement has not signed it. That is normal.\n' +
    'That is in the instruction.\n\n' +
    'I worked the south road for eleven years. Not in the truck, in the water\n' +
    'tankers. Four times a week, from the pumping station to the standpipes.\n\n' +
    'I want to describe the water. You would not be able to see anything. That is\n' +
    'what I want to say first, because the people in the office think it is a\n' +
    'colour. It is not a colour. It is not hot, you are right about that, and it\n' +
    'does not have a taste you can notice. But you cannot wash your hands in it\n' +
    'and feel afterwards that you have washed them. I did it for eleven years and\n' +
    'I stopped feeling my hands.\n\n' +
    'The standpipes. There are four and there were always four. When I first\n' +
    'started in 1999 they were at the road and at the river landing and two more\n' +
    'in the direction of the reach above the intake. Now there are four and two of\n' +
    'them are on the far side of the reach. Which is further from the people and\n' +
    'further from where the people were.\n\n' +
    'The ones on the far side are newer. I know the pipe because the new ones are\n' +
    'blue and the old ones are grey and the new ones came in about 2004 and nobody\n' +
    'told the drivers, we were told by a paper, there was a paper.\n\n' +
    'The paper said the standpipes were being relocated to serve more people and\n' +
    'that service was not interrupted. It did not say where. If I had known where I\n' +
    'would not have said anything.\n\n' +
    'One more thing and then I will stop. When the tankers cannot go to the far\n' +
    'side, because the far side is across the reach, and there is no bridge, then\n' +
    'the people on this side get water from a tank that has been to the far side.\n' +
    'I have seen the drivers do it. I have seen them do it four times. I am not\n' +
    'going to write down who.\n\n' +
    'I have been told there is a document from 1998 that says there is no meter. I\n' +
    'did not know that when I wrote this. I would like to know what it says about\n' +
    'the four standpipes.'));

  D.push(doc('se-h09', 'sublevel4_visitors.txt',
    'Sub-level 4 visitor register', '2019-12-31',
    'Corporate Security, S-02',
    ['security', 'sublevel4', 'visitors', 'register'],
    'SUB-LEVEL 4 — VISITOR REGISTER, 2019\n' +
    'One Pentex Plaza. Room access is by the four authorised holders. The register\n' +
    'is kept by Corporate Security because Legal holds no copy of it, on the\n' +
    'grounds that Legal does not hold the room.\n\n' +
    '2019 VISITORS TO SUB-LEVEL 4: 44.\n\n' +
    '  Board members                  6\n' +
    '  Group officers (Attendant)     4\n' +
    '  Trustee, Foundation            1\n' +
    '  Counsel                        2\n' +
    '  Archivist                     31\n\n' +
    'The Archivist accounts for 31 of the 44. Of those 31, the majority are the\n' +
    'delivery of paper: 4,111 sheets in folders and 4,111 sheets in envelopes,\n' +
    'delivered by the Archivist to the room, and the room being a room in which\n' +
    'there are nine people of whom four are present.\n\n' +
    'The register records, for each of the 31 deliveries, who accompanied the\n' +
    'Archivist to the lift. The names recorded are nine in number over the year.\n' +
    'They are the four authorised holders, four officer names, and the name of a\n' +
    'person who accompanied the Archivist 14 times and who is not on the roster.\n\n' +
    'NOTE BY CORPORATE SECURITY, 2020-01-06.\n' +
    'The 14 entries are checked against the lift log and are consistent. The person\n' +
    'is a Group employee, grade 3, and has been a Group employee for 22 years, and\n' +
    'the role is in the roster as "office of the Archivist (unassigned)".\n\n' +
    'The roster was corrected in 2019 to move the Archivist out of "attendance at\n' +
    'the Discrepancy" and into "attendance as recorded". Both capacities remain.\n' +
    'Corporate Security has raised the roster correction twice and has been told by\n' +
    'the Attendant that the correction was made because the Attendant was asked to\n' +
    'make it.'));

  reg('/security', D);
})(typeof window !== 'undefined' ? window : this);
