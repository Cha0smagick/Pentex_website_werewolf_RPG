/* Pentex Industries Worldwide — /press. Hand-written records. */
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
      path: '/press/' + name,
      name: '/press/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('pw-h01', 'media_access_statement.txt',
    'Statement on media access to Group sites', '2019-02-14',
    'Group Secretariat, on behalf of the Chairman',
    ['press', 'media', 'transparency', 'access', 'lie'],
    'STATEMENT ON MEDIA ACCESS TO GROUP SITES\n' +
    'Issued 2019-02-14 following a question put to the Group by a\n' +
    'correspondent of a national daily.\n\n' +
    'The question was whether the Group would permit an independent journalist to\n' +
    'visit its Manaus facility.\n\n' +
    'The Group has an open and long-standing media access policy. In the twelve\n' +
    'months to 2018-12-31 the Group hosted 341 journalists and academic visitors\n' +
    'across its sites: 118 at One Pentex Plaza, 61 at the Cota Station\n' +
    'campus, 44 at the Jurong technology park, and 118 distributed across the\n' +
    'remaining Group sites.\n\n' +
    'The Group has never permitted a journalist to visit the Cota Station\n' +
    'production floor, the Jurong assay building, the Manaus synthesis annexe, or\n' +
    'the Novosibirsk vivarium.\n\n' +
    'These are the areas in which the work is not finished. It is the ordinary\n' +
    'practice of the Group, and of every manufacturer, to permit visitors to see\n' +
    'finished work and not to see work in progress.\n\n' +
    'The Group notes that a facility that cannot be visited is a facility that\n' +
    'cannot be photographed, and that the Group is content with that position. The\n' +
    'Group notes further that 341 visitors in one year is a substantial number for\n' +
    'a company with 148,000 employees, and that a great deal of this material has\n' +
    'never been the subject of any request.'));

  D.push(doc('pw-h02', 'carbon_retirement_release.txt',
    'Press release: Carbon Retirement Programme, 2019 results', '2019-11-21',
    'Group Secretariat; Sustainability Division',
    ['press', 'carbon', 'lie', 'amazon', 'retirement'],
    'PENTEX REPORTS RECORD CARBON RETIREMENT\n\n' +
    'The Group retired 2.4 million tonnes of carbon-equivalent in 2019, against\n' +
    '1.1 million in 2015, an increase of 118 per cent over four years.\n\n' +
    '"Carbon retirement is the only form of climate accounting that requires\n' +
    'nothing of the company other than honesty," said the Chairman. "We have been\n' +
    'retiring more than we emit for three consecutive years and we intend to keep\n' +
    'doing so."\n\n' +
    'DETAIL.\n' +
    'Retirement volume by source concession, 2019:\n' +
    '  North America                       410,000 t\n' +
    '  South America (Ibara concession)    1,470,000 t\n' +
    '  South America (other concessions)     90,000 t\n' +
    '  Southeast Asia (Cota Estate)          330,000 t\n' +
    '  Group internal                       100,000 t\n\n' +
    'The Group retires carbon in the Ibara concession in quantities that reflect\n' +
    'the volume of standing biomass removed from that concession in the year. The\n' +
    'Group considers that a concession which has been cleared cannot be replanted\n' +
    'into the biomass it previously held, and that the accounting should therefore\n' +
    'be conservative. It is conservative in the sense that a cleared hectare is\n' +
    'counted as though it were still forest.\n\n' +
    'Retired volume is verified by a third party and is irreversible. Certificates\n' +
    'are held to the order of Pentex Industries Worldwide, Inc. and are not\n' +
    'available for sale or offset by any third party.\n\n' +
    'MEDIA NOTE.\n' +
    'No journalist has visited the Ibara concession in the history of this\n' +
    'programme. Verification is conducted by aerial survey and by satellite\n' +
    'imagery. Journalists have been offered the survey reports and the certificate\n' +
    'registry and no journalist has requested either, on the stated ground that\n' +
    'both are prepared by the Group or by a verifier paid by the Group.'));

  D.push(doc('pw-h03', 'ibara_statement_withdrawn.txt',
    'Statement in the matter of the Ibara Basin (withdrawn)', '2004-03-04',
    'Group Secretariat; drafted by Group Legal',
    ['press', 'ibara', 'water', 'withdrawn', 'lie'],
    'DRAFT STATEMENT — NOT ISSUED — WITHDRAWN 2004-03-04\n' +
    'Matter: the Rio Vermelho release of 1994-03-11 and the water supply to the\n' +
    'Ibara intake.\n\n' +
    'DRAFT PARA 4.\n' +
    'The Group is aware of allegations that derivatives of the X-77 family were\n' +
    'present in the Rio Vermelho above the Ibara intake between March and\n' +
    'September 1994. The Group has previously stated that no such substance was\n' +
    'applied in the catchment. The Group now states that no such substance was\n' +
    'applied within four kilometres of the intake.\n\n' +
    'DRAFTING NOTE ON PARA 4 (Legal).\n' +
    'The statement narrows the denial from the catchment to four kilometres. It is\n' +
    'true. It is the narrowest true statement available and it is the first of its\n' +
    'kind: every statement made between 1994 and 2004 denied the catchment.\n' +
    'Paragraph 4 must be removed. A statement that narrows a denial is a\n' +
    'concession that the denial was false, and the Group does not concede, and no\n' +
    'tribunal has found, that any statement has been false.\n\n' +
    'DRAFT PARA 9 (withdrawn).\n' +
    'The Group has provided potable water to households in the enumeration area\n' +
    'since 1998 and has never recorded a meter at any point.\n\n' +
    'DRAFTING NOTE ON PARA 9 (Legal).\n' +
    'This paragraph is true and it does not belong in a statement about a release.\n' +
    'It should be held. It answers a question nobody has asked, and it is the\n' +
    'only paragraph in this statement that is volunteered.\n\n' +
    'DISPOSITION.\n' +
    'The whole statement was withdrawn on the ground that a statement about the\n' +
    'matters of 1994 cannot be issued while the settlement instrument is in force,\n' +
    'because any statement made by the Group on the matters of 1994 is a statement\n' +
    'made by the Group in a matter to which the instrument applies. The Company\n' +
    'would be stating a fact and thereby waiving the benefit of Clause 9.\n\n' +
    'The Group issued no statement. A spokesman told one outlet that "the matter\n' +
    'was settled in 1998 and has not arisen since". The outlet did not print the\n' +
    'quotation. The Company has no record of having been quoted in this matter,\n' +
    'and Clause 7 requires that any record of the release be surrendered.'));

  D.push(doc('pw-h04', 'jurong_tour.txt',
    'Media tour: Jurong Technology Park, summary of the itinerary', '2017-03-30',
    'Group Secretariat; site management, Jurong',
    ['press', 'jurong', 'tour', 'assay'],
    'JURONG TECHNOLOGY PARK — MEDIA TOUR SUMMARY\n' +
    'Date of tour: 2017-03-30. Attendees: 19, of whom 6 asked questions.\n\n' +
    'ITINERARY AS PUBLISHED.\n' +
    '09:30  Arrival, gate 3.\n' +
    '09:45  Blending hall (Build A).\n' +
    '10:30  Filling line 2 (Build A).\n' +
    '11:15  Assay laboratory (Build B, ground floor).\n' +
    '12:00  Lunch.\n' +
    '13:00  Rotor assembly (Build C).\n' +
    '14:00  Close.\n\n' +
    'ITINERARY AS OPERATED.\n' +
    '09:30  Arrival, gate 3.\n' +
    '09:45  Blending hall (Build A).\n' +
    '10:30  Filling line 2 (Build A).\n' +
    '11:15  Assay laboratory (Build B, ground floor).\n' +
    '11:40  Concluded. Press moved to lunch. Rotor assembly did not take place.\n\n' +
    'NOTE, site management.\n' +
    'Build C was not opened. The instruction received was to conclude at 11:40 and\n' +
    'to bring the group to the canteen. The instruction came from the Group\n' +
    'Secretariat by telephone at 09:20 and was given to the tour guide only.\n\n' +
    'The rotor assembly at Jurong takes place in a hall that shares a wall with the\n' +
    'pallet store. Building B and the pallet store are not separately serviced. To\n' +
    'open Build C for a group of nineteen is to open the pallet store for a group\n' +
    'of nineteen. There is no configuration of a tour that visits one without the\n' +
    'other, which is a fact about the plant and not about the tour.\n\n' +
    'Fifteen of the nineteen visitors asked, on the coach, why the day ended early.\n' +
    'Four did not. The tour guide gave the published itinerary, which was still in\n' +
    'her hand, and every one of the four accepted it.\n\n' +
    'There is no way for a visitor to distinguish a cancelled step from a completed\n' +
    'one, except by noticing the time. This is the intended design.'));

  D.push(doc('pw-h05', 'chairmans_address.txt',
    "Address to investors, Chairman's Office", '2019-06-18',
    'Corvin Aurelian-Hale, Chairman',
    ['press', 'chairman', 'investors', 'address', 'standard'],
    'ADDRESS TO INVESTORS — JUNE 2019\n' +
    'Delivered by the Chairman. Text released for publication.\n\n' +
    'You will have read that we retired more carbon than we emitted. You should\n' +
    'understand what that sentence means, because it is the sentence this company\n' +
    'will be judged by, and because I intend it to be read the correct way.\n\n' +
    'We retire carbon where it is cheapest to retire it and where the retiring can\n' +
    'be verified from the air. We do not retire carbon in our own back yards. We\n' +
    'do not retire carbon where a person would have to stand in the forest, or\n' +
    'sign a form, or be photographed. This is not hypocrisy and I will not\n' +
    'apologise for it. It is method.\n\n' +
    'The same method governs every question put to this company, and I say so as a\n' +
    'matter of policy rather than of pride. When a question concerns a place we\n' +
    'can be verified, we will verify it in the open. When a question concerns a\n' +
    'place we cannot, we will say the place does not exist.\n\n' +
    'Some of you will find that sentence unattractive. I have found it\n' +
    'unattractive once, in 1996, and I wrote a memorandum about it which is in the\n' +
    'file and which I have not withdrawn.\n\n' +
    'The company is 148,000 people. It has been founded for one hundred and\n' +
    'twenty-one years. It has never lost a night\'s work and it has never paid a\n' +
    'dividend out of the Amazon. I would ask you to hold those two sentences side\n' +
    'by side and notice what they have in common: each of them is a statement about\n' +
    'continuity, and neither of them is a statement about harm.\n\n' +
    'That is the business we are in.'));

  D.push(doc('pw-h06', 'foundation_appeal.txt',
    'Pentex Foundation — appeal for funds', '2005-11-02',
    'Pentex Foundation, Geneva; s.okonjo@pentex.example',
    ['press', 'foundation', 'appeal', 'shenzhen', 'geneva'],
    'PENTEX FOUNDATION — APPEAL\n' +
    'Issued 2005-11-02. Distributed to Group employees only.\n\n' +
    'The Foundation exists to improve the lives of people in the communities in\n' +
    'which the Group operates. It is funded by Group companies, it is\n' +
    'independent of them, and it is audited.\n\n' +
    'APPLICATIONS RECEIVED 2004-2005.\n' +
    '  2,211 applications received\n' +
    '    34 for housing\n' +
    '    19 for water\n' +
    '    12 for agricultural equipment\n' +
    '  2,146 for nothing that the Foundation is able to fund\n\n' +
    'Of the 34 housing applications, four households received funding in 2004.\n' +
    'Of those four, no house has been built. The grant ledger records the reason as\n' +
    '"governance arrangements consistent with local custom".\n\n' +
    'The Trustee has asked that this sentence be removed from future appeals. The\n' +
    'Trustee has been advised that it cannot be removed, on the ground that an\n' +
    'appeal which describes its own effectiveness inaccurately is a different and\n' +
    'worse thing from an appeal which describes it accurately.\n\n' +
    'NOTE ON INDEPENDENCE.\n' +
    'The Foundation is administered from Geneva. Its grants are made through a\n' +
    'property vehicle in a Shenzhen special economic zone, for reasons of\n' +
    'administrative efficiency, which the Trustee has twice been told are of\n' +
    'considerable importance and which the Trustee has not been able to test.\n\n' +
    'The Foundation has, in nineteen years, issued one award for civic merit. The\n' +
    'recipient was a member of staff of the Institute for Industrial Stewardship,\n' +
    'an independent body which the Foundation funded.'));

  D.push(doc('pw-h07', 'the_four_questions.txt',
    'Correspondence: four questions and the response', '2018-07-30',
    'Group Secretariat; correspondents withheld',
    ['press', 'questions', 'response', 'secrecy', 'letter'],
    'FOUR QUESTIONS PUT TO THE GROUP AND THE GROUP RESPONSE\n\n' +
    'Q1. Will the Group disclose the volume of X-77 applied within the Ibara\n' +
    'concession for each of the years 1994 to 2019?\n' +
    'R1. No. Volume figures are commercially sensitive and are not disclosed.\n\n' +
    'Q2. Will the Group disclose whether any journalist has visited the Ibara\n' +
    'concession?\n' +
    'R2. The Group does not publish its visitor register. Visitors who ask for\n' +
    'information they will not be given should not spend a day travelling.\n\n' +
    'Q3. Will the Group permit an independent sampling of the Rio Vermelho above\n' +
    'the Ibara intake?\n' +
    'R3. The Group has no objection in principle. Any sampling would be arranged\n' +
    'by the Group at the Group\'s cost and would be supervised by Group staff.\n\n' +
    'Q4. Will the Group confirm that the mortality rider in the 1998 Ibara\n' +
    'settlement instrument was drafted for a plantation division?\n' +
    'R4. This question does not appear to be directed at the Group. The Group has\n' +
    'no knowledge of any mortality rider in any instrument.\n\n' +
    'NOTE, Group Secretariat, internal.\n' +
    'Q3 is the only one of the four that was answered in a form we could offer.\n' +
    'The three others were refused at the level of the fact rather than the\n' +
    'timing, and we are instructed by Legal not to refuse on timing in future\n' +
    'because a refusal on timing is an undertaking.\n\n' +
    'The response to Q4 is drafted in a form I do not like and Legal insists on.\n' +
    'It is not an answer. It is an invitation to the correspondent to find out\n' +
    'somewhere else, and it is the reason the correspondent asked. A denial which\n' +
    'asserts an absence of knowledge invites a search for the knowledge. If we had\n' +
    'said no, and given the draft date and the division, we would have had to say\n' +
    'what the rider paid for, and the rider paid for four deaths.\n\n' +
    'I am recording that I wrote the response and that I would have preferred to\n' +
    'write no.'));

  D.push(doc('pw-h08', 'withheld_investor_address.txt',
    'Address to investors, June 2019 (draft, not delivered)', '2019-06-17',
    'draft; General Counsel, 44-31',
    ['press', 'investors', 'withheld', 'draft', 'gaunt'],
    'DRAFT ADDRESS TO INVESTORS — JUNE 2019 — NOT DELIVERED\n' +
    'Drafted by the Chairman\'s Office. Withheld by the General Counsel on\n' +
    '2019-06-17, on the ground that paragraph 4 is a statement to investors of a\n' +
    'fact that the Group has not established.\n\n' +
    'PARA 1-3 as delivered in the June address.\n\n' +
    'PARA 4 (withheld).\n' +
    'We retire carbon where it is cheapest to retire it and where the retiring can\n' +
    'be verified from the air. I want to be exact about this, because the word\n' +
    'cheapest is doing more work than it appears to. A hectare of standing forest\n' +
    'is, to our accounting, an asset with a carbon liability against it. A hectare\n' +
    'of cleared ground is, to our accounting, the same asset with no liability. We\n' +
    'are therefore not paid to clear and paid to replant. We are paid to remove\n' +
    'what is on the balance sheet and to put it somewhere it cannot be measured\n' +
    'from a satellite, which is everywhere, and which is the only achievement of\n' +
    'this decade that I would defend to a member of staff.\n\n' +
    'PARA 5 (withheld).\n' +
    'A member of staff asked me in June whether the Group has ever applied a\n' +
    'substance to ground such that the substance had not been accounted for in a\n' +
    'return. I answered that the question is a version of the accounting question\n' +
    'and that the accounting is right. She wrote back with the arithmetic. The\n' +
    'arithmetic is the same arithmetic that is in the volume summary in Regulatory\n' +
    'Engineering, and it has been the same since 1994, and I have now had to\n' +
    'carry it.\n\n' +
    'NOTE BY GENERAL COUNSEL.\n' +
    'Paragraph 4 is the passage by which every application figure in this company\n' +
    'becomes legible to a reader. Paragraph 5 is the passage by which one member of\n' +
    'staff becomes legible. If both are read together they establish that the\n' +
    'Group knew, and that the Group had somebody in the building who was reading.\n\n' +
    'The Chairman was advised to keep the word method and drop the arithmetic. He\n' +
    'agreed. The delivered address retains the word method and no arithmetic.'));

  reg('/press', D);
})(typeof window !== 'undefined' ? window : this);
