/* Board of Directors — hand-authored. Board papers that were never minuted. */
(function (global) {
  'use strict';
  var P = global.PENTEX;
  var D = '/board';

  function doc(id, name, title, date, src, tags, body) {
    return {
      id: id,
      path: D + '/' + name,
      name: D + '/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var G = [];

  G.push(doc('bd-h01', 'charter_minute_1934.txt', 'Minute of the Incorporating Meeting', '1934-04-11', 'Board minute 001', ['board', 'charter', 'incorporation'], `
MINUTE OF A MEETING OF THE PROPOSED BOARD OF DIRECTORS OF
PENTEX CHEMICAL WORKS, INCORPORATED

Held 11 April 1934, 10 North Street, Newark, New Jersey.
Present: five. Absent: none. No minutes of any prior meeting exist.

1. THE PURPOSE OF THE COMPANY IS ADOPTED AS FOLLOWS.

   "To manufacture, sell and deal in chemical products, and to do all
   things incident to that trade."

2. IT IS NOTED that no purpose beyond the above was proposed, and that
   the founders declined to state one. The founder, upon being asked to
   expand the clause, replied that a stated purpose is discoverable, and
   that the object of the founding family was not to be discoverable.

3. IT IS NOTED that the sum of one hundred and twenty thousand dollars
   has been subscribed, of which ninety thousand is in cash and thirty
   thousand is "in services rendered to the incorporation prior to its
   existence", contributed by A. HALE, and valued by him.

4. RESOLVED, that the said contribution be carried as a preferred claim
   against the assets of the Company, and that no dividend be declared
   upon it until the Board shall have declared otherwise by unanimous
   written consent.

5. RESOLVED, that the officers be instructed to purchase no plant, take
   no lease, and enter into no contract involving the expenditure of
   more than two thousand dollars, without the prior written consent of
   the founder for so long as he shall live.

   A director asked whether this clause survived his death.
   The minute records the answer as: "It survives until it is
   inconvenient."

6. ADJOURNED at 11.40.

[Attested: E. HALE, Secretary. The founder's signature appears beside
item 4 in a different ink from the remainder of the page, and was
described by the Archivist, in 1997, as "consistent with a signature
applied later".]
`));

  G.push(doc('bd-h02', 'capital_allocation_1961.txt', 'Capital Allocation and the Central Reserve', '1961-09-26', 'Board minute 214', ['board', 'reserve', 'capital'], `
ALLOCATION OF CAPITAL - GROUP AND DIVISIONAL - 1961

Presented by the Treasurer. Adopted without amendment.

DIVISIONAL ALLOCATION                      1961        % OF TOTAL
PetroChemical                              $84.1m       41.0
BioSynth                                   $61.4m       29.9
Munitions                                  $52.9m       25.8
AeroDynamics                               $ 9.2m        4.5
Pentex Foundation                          $ 6.7m        3.3
                                       ---------   -------
Central Reserve                            $91.4m      (44.6)
                                       ==========

NOTE BY THE SECRETARY.  The percentages in the fourth column sum to
104.5. The Reserve is presented as a deduction rather than an
allocation, on the advice of counsel, so that it is not "allocated" and
therefore is not subject to the reporting requirements applicable to
allocations. Counsel's note of 4 March 1961 is reproduced at Appendix C.

COUNSEL'S NOTE OF 4 MARCH 1961 (in full):

    "The Reserve is not a fund. The Reserve is the amount that has not
    been told where to go. It exists in order that decisions may be
    taken between meetings of this Board, which is the only interval in
    which anything is decided at this Company."

DISTRIBUTION OF THE RESERVE - 1961 TO 1993
From the Treasurer's annual statements, the Reserve is drawn down in
eleven of thirty-two years and replenished in twenty-one. Cumulative
drawdowns, nominal: $1.94bn.

The Treasurer's statements give the purpose of each drawdown. No
drawdown is attributed to a divisional programme, a site, a product, or
a person. Every drawdown is described as "Group purposes".

The Board did not ask. The minutes record that the Board did not ask.
`));

  G.push(doc('bd-h03', 'cota_plot_6_investment.txt', 'Investment Decision: Cota Plot 6', '1996-11-04', 'Board minute 388', ['board', 'cota', 'soil', 'investment'], `
REQUEST FOR APPROVAL - SOIL CONDITIONING WORKS, COTA STATION, PLOT 6
Amount sought: BRL 41,000,000. Presented by BioSynth. Site: Cota
Station, Cota Valley.

THE CASE, as presented:
  "Plot 6 will not germinate. The land has been in the Group's
  possession since 1971 and has not produced since 1971. Treatment is
  proposed at BRL 41,000,000 over four seasons."

THE ASSESSMENT, as presented:
  "Soil analysis returned a persistent inhibitory fraction that the
  Group's own laboratories cannot identify. The assay is consistent
  with a compound the Group has produced since 1938. The Group has
  been treating this land since 1971. The inhibitory fraction is the
  most likely explanation for the failure."

RESOLVED, that the request be approved in full.

NOTE ADDED BY A DIRECTOR BEFORE VOTE, and read into the record at the
request of the Secretary:

    "I am voting for this. I want it noted that I am voting for it
    because the alternative is to explain to the shareholders why we
    own land we have poisoned and are asking them for money to make it
    grow. There is no version of this in which the good news is good."

The motion carried 5 to 0.
`));

  G.push(doc('bd-h04', 'committee_of_the_unlisted.txt', 'Constitution of the Committee of the Unlisted', '1974-02-19', 'Board minute 297', ['board', 'governance', 'committee'], `
THE COMMITTEE OF THE UNLISTED

Adopted 19 February 1974. Not listed in the Group's governance chart.
Not listed in the standing orders. Not listed in the annual report.

ARTICLE 1. The Committee consists of such persons as the Board shall
from time to time name, and of no others.

ARTICLE 2. The Committee's function is to receive, and to hold, matters
which the Board determines are not to be minuted.

ARTICLE 3. The Committee does not report. It has no reporting line. Its
proceedings are not minutes but are recorded as minutes, and filed
under the classification applied to the matter.

ARTICLE 4. Members are named on an index. The index is held by the
Secretary. The index is not the list of members.

ARTICLE 5. A matter before the Committee ceases to be a matter of the
Board upon the Committee's vote. No further authority is required.

ARTICLE 6. Where a person is a member of the Committee by virtue of an
office, and ceases to hold that office, their membership ceases. Where a
person is a member by virtue of a nomination, their membership does not
cease, and may be terminated only by the Board.

ARTICLE 7 (added 1988). Where a person is a member by virtue of a
nomination, the Secretary shall record whether the member has attended.
Attendance is not a condition of membership.

NOTE OF THE SECRETARY, 1988, on Article 7:

    "The Board asked me to record attendance. I record attendance for
    all of them. No member has ever been removed under Article 6.
    The Board will not say why, and I have not asked, which is the
    arrangement we have."

MEMBERSHIP AT TIME OF ABOLITION (2024-06-30): see the Committee's
abolition minute of that date, filed under the Committee itself.
`));

  G.push(doc('bd-h05', 'charter_amendment_1979.txt', 'Amendment to the Corporate Purpose - Materials Compatibility', '1979-06-07', 'Board minute 331', ['board', 'charter', 'arcane', 'amendment'], `
AMENDMENT TO ARTICLE 1 OF THE CHARTER

Proposed by A. HALE, Chairman. Adopted 7 June 1979. Vote 4 to 1,
the Chairman's vote being given last and without comment.

On the motion of the Chairman, and in accordance with standing practice,
the notice of the meeting was not issued to the full Board; the
Chairman convened the meeting himself and four members attended.

THE AMENDMENT: that Article 1 be amended to add, after the existing
purpose, the following:

    "and to conduct such testing of materials, and of the compatibility
    between materials and living organisms, as the Board shall from
    time to time authorise, whether or not such testing produces any
    article of commerce."

THE REASON GIVEN, in the Chairman's memorandum of 2 June 1979:

    "We are the only company of our size that has never been asked to
    explain a result. That is an asset of considerable value and it is
    not visible on any statement we publish. I would like it to be a
    power of the Company and not an accident of our history."

THE DIRECTOR WHO VOTED AGAINST asked, in the meeting, whether the
testing was to be disclosed in the product literature.

THE CHAIRMAN: "No."

THE DIRECTOR: "Then the power exists for a purpose."

THE CHAIRMAN: "Yes."

THE DIRECTOR: "Will you state the purpose?"

THE CHAIRMAN: "No, and that is the correct answer, because if I state
it, then it is the Group's purpose, and if it is the Group's purpose
then it must appear in the accounts. You have just conducted an audit
and found the right question. The answer to that question is that the
Company's purpose is not required to be honest about what it is for."

The minute records the amendment as carried.
`));

  G.push(doc('bd-h06', 'patent_estate_review.txt', 'Review of Three Unfiled Applications', '1998-05-14', 'Board minute 402', ['board', 'patents', 'estate', 'review'], `
REVIEW OF THE PATENT ESTATE - APPLICATIONS WITHHELD FROM FILING

Presented by the Group Patent Committee. Recommendation: leave three
applications unfiled for a further period, "consistent with the
Company's long-term interest in the subject matter."

APPLICATION 1 - Method of maintaining a pressure vessel against
  internal loss of matter.
APPLICATION 2 - A biological response modifier with species-selective
  uptake.
APPLICATION 3 - Delivery of a compound to a target organism by the
  vector of a second organism.

REASON GIVEN FOR WITHHOLDING APPLICATION 3 (extract):

    "A filed claim is a public description of a thing that can be done.
    The Company's position in matter 4811204 is that the claim describes
    a discovery. A filed application on matter 3 would describe a
    method. The Group does not wish to describe a method."

LENGTH OF WITHHOLDING TO DATE
  Application 1: withheld since 1994.       32 years.
  Application 2: withheld since 1996.       29 years.
  Application 3: withheld since 1997.       28 years.

NOTE BY THE PATENT COMMITTEE, undated, found with the papers:

    "A patent is a bargain with the public: you teach, and they permit
    you to exclude. The Group has decided it has no interest in the
    bargain and no intention of teaching. That is not a defect in our
    process. It is the process."

COST OF MAINTAINING THE THREE APPLICATIONS WITHOUT FILING, 2023:
  $1.4m. The Board approved this as a continuing item without discussion,
  under the heading "continuing items", which was not defined.
`));

  G.push(doc('bd-h07', 'kilifi_choir_approval.txt', 'Approval of Programme CHOIR', '2009-03-30', 'Board minute 447', ['board', 'choir', 'kilifi', 'approval'], `
PROGRAMME CHOIR - REQUEST FOR APPROVAL
Site: Kilifi. Division: BioSynth. Lead: A. TESFAYE.
Amount sought: $8.2m over three years. Presented to the Board as a
vector-control programme with a projected population effect.

The minute records that the Board was advised by BioSynth that four
subjects had died.

The minute further records, at the request of the Secretary, the
following exchange.

DR. NOVAK: "Four subjects died."

THE CHAIRMAN: "Four out of what?"

DR. NOVAK: "Eleven. Four of eleven."

THE CHAIRMAN: "Then the selectivity index is four of seven and not
four of eleven, because four of the eleven are not in the index. You
have excluded the four."

DR. NOVAK: "They cannot be included. They are dead. You cannot compute a
selectivity index on a subject you have killed."

THE CHAIRMAN: "You cannot compute a selectivity index on a live subject
who is not affected. The four you killed were, as you say, not
affected. Therefore they count."

DR. NOVAK: "That is not a finding, that is a category error."

THE CHAIRMAN: "It is an index. It is the index the programme is run on.
If you wish to change the index you may bring me a programme that runs
on a different index, and I will consider it in the usual way."

The programme was approved. The minute records the approving vote as
unanimous.
`));

  G.push(doc('bd-h08', 'ibara_waiver_1988.txt', 'Waiver of the Right of the Board to be Informed', '1988-02-22', 'Board minute 340', ['board', 'ibara', 'waiver', 'disclosure'], `
IBARA - WAIVER OF THE RIGHT OF THE BOARD TO BE INFORMED

Resolution passed 5 to 0. Recorded here in the Board's own hand.

WHEREAS the Company has, in the ordinary course of operations in the
Ibara concession, suffered an environmental event which will require a
period of management which the Board, if fully informed of it, would be
in a position to direct;

and WHEREAS the management of that event would be impeded, and in the
Company's opinion damaged, by the convening of the Board during it;

BE IT RESOLVED, that until such time as the Chairman states that the
event has concluded, the Board waives its right to be informed of it,
and no paper concerning it shall be tabled, no officer shall report
upon it, and no minute of the Board shall refer to it;

PROVIDED that the waiver shall extend to any matter arising from or
relating to the event, whether or not arising during its continuation;

PROVIDED that no provision of this waiver shall be disclosed to any
person outside the Board, on the ground that a waiver exists precisely
to remove the question;

PROVIDED FURTHER that the waiver shall not be revoked retrospectively.

NOTES OF THE SECRETARY:

  - The event has never been described to the Board as concluded. The
    Chairman has not stated that it has concluded. The waiver remains,
    on its own terms, in force.
  - The Company files an annual return in which it declares the number
    of reportable environmental events. The return for 1988 records one,
    which was a spill of 40 litres at Jurong, and does not reference
    Ibara.
  - A director asked in 1994 whether the waiver was still operative. He
    was answered, accurately, that it was.
`));

  G.push(doc('bd-h09', 'standing_order_4_destruction.txt', 'Standing Order 4 - Destruction of Papers', '1979-06-07', 'Standing order', ['board', 'destruction', 'records'], `
STANDING ORDER 4 (as adopted, 7 June 1979, and as amended 1991, 2004,
2016, and 2021)

DESTRUCTION OF PAPERS

1. No paper of the Company shall be destroyed otherwise than under this
   Order.

2. Papers may be destroyed on the certificate of two officers.

3. A register of destruction shall be kept. The register shall record the
   date, the class of paper, the quantity, and the name of the officer
   certifying. It shall not record the content, the subject, the
   author, or the recipient.

4. Class 3 (routine) may be destroyed at the site of origin. Class 2
   requires the register. Class 1 requires the register and the
   signature of the Secretary.

5. The Secretary shall report to the Board annually the total quantity
   of each class destroyed. The Secretary shall not report the class
   names.

ANNOTATION IN PENCIL, in the Secretary's hand, found inside the front
cover of the Company's destruction register volume for 2016:

    "Petra said the register is the whole of it. Twenty-two volumes of
    register and nobody has ever asked to see a volume. I asked her
    what the register is for and she said it is for the auditors and the
    auditors do not read it.

    I have been here thirty-one years. I want to record that I have
    read them. Every volume. Every line. I read them because it is the
    only part of the job that consists of reading.

    A pencil book on a shelf is the only kind of record this company
    has never successfully destroyed."

NOTE ADDED 2021: The annotated volumes were not reclassified and the
annotation was not removed. The Secretary who wrote it was not
reassigned. See the note filed at /sublevel4 on continuity of the post.
`));

  G.push(doc('bd-h10', 'address_2021_withheld.txt', 'Address to Investors, 2021 - Withheld Draft', '2021-04-15', 'Board minute 511', ['board', 'investors', 'address', 'withheld'], `
ADDRESS TO SHAREHOLDERS - DRAFT 12 APRIL 2021 - NOT DELIVERED

The Chairman's office prepared this draft. The Board approved the
delivery of an earlier draft. This draft was not delivered.

EXTRACT OF THE REJECTED PASSAGE:

    "There is one question in the correspondence, and it is the same
    question four times. I will answer it as directly as I am able.

    The company has, in the last five years, caused the loss of
    11,400 hectares of standing forest in the Ibara concession, of which
    9,880 lay outside any permit held by the company, and has paid, in
    settlement of claims arising from it, an amount which our advisers
    have assessed as the cheapest available.

    The company has also, in the last five years, discharged 118,000
    tonnes of process water containing pentachlorophenol derivatives to
    the Rio Vermelho above the Ibara municipal intake, and has settled
    with the families of four of the deceased.

    We did not choose to do these things. What we chose was an
    arrangement in which each of them was cheaper than the alternative
    of not doing it, and in which the doing of it could be described, in
    a return, as an operational matter.

    That is the whole of what happened here. Nobody sat in a room and
    decided to burn a forest. A line was drawn on a map, and the line
    was moved, and the moving of it was signed by a surveyor who was
    never asked what the line was for."

REASON RECORDED FOR NOT DELIVERING IT, in the margin of the draft in
the Chairman's hand:

    "Arithmetically this is the answer to the only question anyone has
    asked for nine years. If it is given, the answer is that the
    cheapest thing to retire is whatever is on the balance sheet, and
    that the balance sheet in question is four thousand hectares and a
    river and a settlement schedule, and that a further four thousand
    hectares remain.

    Do not give the arithmetic. Give the stewardship."

DELIVERED INSTEAD: a four-page document on operational resilience and a
forward-looking statement on forest-positive sourcing.
`));

  var fs = P.FS[D] || (P.FS[D] = []);
  var seen = {};
  fs.forEach(function (e) { seen[e.name] = 1; });
  var kept = G.filter(function (d) { return !seen[d.name]; });
  if (kept.length) P.REGISTER(D, kept);
})(typeof window !== 'undefined' ? window : this);
