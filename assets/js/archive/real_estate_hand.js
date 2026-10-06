/* Pentex Industries Worldwide — /real_estate. Hand-written records. */
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
      path: '/real_estate/' + name,
      name: '/real_estate/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('re-h01', 'land_register_214000.txt',
    'Group land register — summary', '2021-06-30',
    'Real Estate Division, Group Land Register',
    ['real_estate', 'land', 'register', 'parcels', 'shell'],
    'GROUP LAND REGISTER — SUMMARY AS AT 2021-06-30\n' +
    'Total registered area: 214,000 hectares. Parcels: 41. Holding entities: 32.\n\n' +
    'COUNTRY    PARCELS    HECTARES     HELD BY     ENTITIES\n' +
    'Brazil      9         148,000      7          12\n' +
    'Canada      4           2,900      1           3\n' +
    'Russia      3           6,100      1           2\n' +
    'Kenya       4           9,400      1           2\n' +
    'Colombia    3          31,000      1           2\n' +
    'Singapore   1             410      1           1\n' +
    'United States 6        16,190      3           5\n' +
    'Denmark     4           2,600      2           2\n' +
    'Sweden      2           4,700      1           1\n' +
    'TOTAL      41         214,000     32 companies\n\n' +
    'A NOTE ON THE HELD BY COLUMN.\n' +
    'The 32 holding entities include 14 companies that have been dissolved. A\n' +
    'dissolved company continues to hold title in Denmark, in Singapore, and in\n' +
    'three Brazilian states. The Real Estate Division has been advised twice,\n' +
    'in 2019 and in 2021, that a dissolved company cannot hold title and that the\n' +
    'parcels should be transferred. On each occasion the advice has been accepted\n' +
    'and the transfer has not been made, on the ground that the parcels are\n' +
    'subject to a heritage covenant which attaches to the holding entity and not\n' +
    'to the land.\n\n' +
    'There is no heritage covenant. The phrase was drafted by the Danish firm of\n' +
    'counsel in 1974 to explain why fourteen companies had not been wound up,\n' +
    'and it has outlived every reason for it, and nobody has read the deed since\n' +
    '1974, including the firm that drafted it, which closed in 1988.\n\n' +
    'Nobody in this Division knows why the companies were not wound up. The\n' +
    'Division has been asked to report and has reported that nobody knows, which\n' +
    'is the true answer, and which is itself the answer.'));

  D.push(doc('re-h02', 'the_notary.txt',
    'Declaration of the notary, Ibara conveyance 1971', '1971-08-04',
    'Reproduced in the Real Estate Division file; original at Cota',
    ['real_estate', 'ibara', 'notary', 'conveyance', 'land'],
    'DECLARATION OF THE NOTARY — CONVEYANCE OF 12,000 HECTARES\n' +
    'Ibara Basin, Mato Grosso, 1971-08-04\n' +
    'The undersigned notary, having been asked by the purchaser to state the\n' +
    'condition of the land conveyed, states as follows.\n\n' +
    '1. The land is continuous and unoccupied in the greater part.\n' +
    '2. In the lesser part there are structures of indigenous construction and\n' +
    'gardens worked by people who are not parties to this conveyance and whom the\n' +
    'purchaser has not identified.\n' +
    '3. I have put to the purchaser that at law these are occupants and not\n' +
    'squatters, and that the conveyance of the lesser part may be voidable for\n' +
    'indigency if it is proved that the occupants had possession at the date of\n' +
    'this instrument.\n' +
    '4. The purchaser has been advised that in 1971 the Ibara basin contains\n' +
    'between four and six thousand people. He has asked me to record that this is\n' +
    'not a population but a count of shelters, and that he has relied on a report\n' +
    'of 1970 which gives the figure as 0.\n\n' +
    '5. I have recorded this as he has instructed it. I record further that the\n' +
    'report of 1970 was prepared at the request of the seller and that the\n' +
    'population of the basin is 5,240 according to the 1970 census of the state.\n\n' +
    '6. The purchaser has signed this declaration having read paragraph 5.\n\n' +
    'FILED AS AN ABSTRACT. The original is at Cota. The Real Estate Division\n' +
    'obtained this abstract in 2019 for a plot-6 soil file and has never asked for\n' +
    'the original.'));

  D.push(doc('re-h03', 'cota_plot6_soils.txt',
    'Cota Estate plot 6 — soil assay series', '2019-10-14',
    'BioSynth Division, agronomy',
    ['real_estate', 'cota', 'soils', 'assay', 'plot6'],
    'COTA ESTATE — PLOT 6 SOIL ASSAY SERIES\n' +
    'Ground truthing for a rehabilitation trial, 2019.\n\n' +
    'The trial cultivar, PROV-6, has failed at every plot on the Cota Estate. It\n' +
    'has been reported as a seed issue, a water issue, and a soil-pH issue.\n\n' +
    'The series below is the soil chemistry of plots 1 to 9 at three depths. Plots\n' +
    '1, 2, 3, 5 and 7 were never treated by any Group operation. Plots 4, 6, 8 and\n' +
    '9 were cleared and replanted by the Estate in 2013-2016.\n\n' +
    'PLOT  DEPTH    pH     ORGANIC C%   Cu mg/kg   Zn mg/kg   S mg/kg\n' +
    '1     0-30     5.9    3.1         11        24         8\n' +
    '2     0-30     5.8    3.4          9        22         7\n' +
    '3     0-30     6.1    2.9         13        26         9\n' +
    '4     0-30     4.2    0.7        288        41        19\n' +
    '5     0-30     6.0    3.0         12        25         8\n' +
    '6     0-30     4.4    0.8        301        44        21\n' +
    '7     0-30     5.7    3.2         10        23         7\n' +
    '8     0-30     4.1    0.6        314        46        22\n' +
    '9     0-30     4.3    0.9        277        39        18\n\n' +
    'The four failed plots have four times the copper, half the organic carbon, and\n' +
    'a pH of 4.2 against 6.0. PROV-6 will not germinate at pH 4.4. Nothing will\n' +
    'germinate at pH 4.4.\n\n' +
    'TWO COMMENTS FROM THE AGRONOMIST WHO SENT THIS.\n\n' +
    '1. The Estate cleared these plots, which means the Estate did this, and the\n' +
    'Estate can fix it with lime, and the cost of lime is not trivial and is not\n' +
    'in the rehabilitation budget.\n\n' +
    '2. There is no soil on this Estate that has not been touched by a Group\n' +
    'operation, because there is no soil on this Estate that has not been touched\n' +
    'by a Group operation, which is why I have written the series for all nine\n' +
    'plots and not only for the four that fail.'));

  D.push(doc('re-h04', 'calgary_plot6.txt',
    'Calgary plot 6 — remediation record', '2019-03-02',
    'PetroChem Division, remediation group',
    ['real_estate', 'calgary', 'plot6', 'remediation', 'germination'],
    'CALGARY PLOT 6 — REMEDIATION RECORD\n' +
    'Abandoned solvent handling area. Remediated 2016-2018.\n\n' +
    'REMEDIATION PERFORMED.\n' +
    'Excavation of 4,100 tonnes of soil to a depth of 2.4 m. Off-site treatment at\n' +
    'the Group facility at Nova Scotia by thermal desorption. Backfill with\n' +
    'certified clean soil. Revegetation with a local seed mix.\n\n' +
    'CERTIFICATION. The plot was certified on 2018-11-02 as remediated to the\n' +
    'industrial land-use standard, with a residual concentration of 1.4 mg/kg in\n' +
    'the 0-1.2 m band against a criterion of 2.0 mg/kg.\n\n' +
    'OBSERVATION OF 2019-03-02.\n' +
    'Nine weeks after the last revegetation treatment, a survey of the plot found\n' +
    'no emergence. A control strip 400 m from the plot, sited on soil never\n' +
    'subject to a Group operation, showed emergence at 71 per cent of the\n' +
    'contractual density.\n\n' +
    'This result is anomalous. The plot has been remediated to a standard stricter\n' +
    'than the criterion by 30 per cent, and it has been replanted with certified\n' +
    'clean soil, and it is empty.\n\n' +
    'NOTE, REMEDIATION GROUP, appended 2019-04-11.\n' +
    'The seed lot has been tested and is viable. The soil is within specification.\n' +
    'The failure is a biological response to a soil that meets the criterion.\n\n' +
    'Two things are true of this plot and the Group has only one of them in its\n' +
    'records. The first is that we cleaned this ground to a standard stricter than\n' +
    'the law requires, and we certified it, and we published the certification.\n' +
    'The second is that the ground will not grow anything, and there is nothing in\n' +
    'the certification that would let a reader know that.\n\n' +
    'The criterion is a concentration. The crop needs an organism.'));

  D.push(doc('re-h05', 'sellers_who_were_claimants.txt',
    'Plot 6 conveyance — the sellers', '1971-09-22',
    'Reproduced in the Real Estate Division file',
    ['real_estate', 'cota', 'settlement', 'sellers', 'claimants'],
    'PLOT 6 CONVEYANCE — SCHEDULE OF SELLERS\n' +
    'Cota Estate, 1971-09-22.\n\n' +
    'Nine sellers. Nine schedules of interest executed in favour of the purchaser.\n\n' +
    'Of the nine:\n' +
    '  four had, in 1998, been enumerated as claimants in the Ibara Basin\n' +
    '    settlement instrument, or had been the spouse, child, or estate of a\n' +
    '    person so enumerated;\n' +
    '  two had been enumerated at Cota and had settled separately in 1996;\n' +
    '  three had no connection to any settlement.\n\n' +
    'The five settlement claimants and purchasers of the same ground were parties\n' +
    'to the same transaction on both sides. This was raised in 1998 by the\n' +
    'enumerating physician, in a note of six lines, and was answered by counsel in a\n' +
    'note of three lines: the interests were several, the instruments were\n' +
    'separate, and no claimant has been identified as having been a purchaser.\n\n' +
    'Counsel was right. No claimant has been identified as having been a\n' +
    'purchaser, because the purchaser was a company and the sellers were nine\n' +
    'individuals whose schedules were each executed in favour of that company by\n' +
    'a notary who recorded a consideration of one peso per hectare and did not\n' +
    'record the co-holders of the ground at the date of sale.\n\n' +
    'The Real Estate Division has located seven of the nine schedules. The two it\n' +
    'cannot locate are the two of 1996.'));

  D.push(doc('re-h06', 'foundation_land_six_plots.txt',
    'Foundation land holdings — six plots', '2006-02-08',
    'Pentex Foundation, Geneva',
    ['real_estate', 'foundation', 'geneva', 'land', 'shenzhen'],
    'PENTEX FOUNDATION — LAND HOLDINGS\n' +
    'Six plots held on behalf of the Foundation. Held, in each case, through a\n' +
    'property vehicle in a Shenzhen special economic zone.\n\n' +
    'PLOT  LOCATION            HECTARES   FILED     PRODUCE\n' +
    '1     Acre, Brazil             640   2004      oil palm\n' +
    '2     Acre, Brazil             410   2004      oil palm\n' +
    '3     Rondonia, Brazil          280   2005      soy\n' +
    '4     Rondonia, Brazil          190   2005      soy\n' +
    '5     Mato Grosso, Brazil       900   2006      cattle\n' +
    '6     Kenya (Kilifi district)    330   2006      sisal\n\n' +
    'The Foundation holds 2,750 hectares and has made no distribution of produce.\n' +
    'The produce is sold at local market price by the vehicle and the proceeds are\n' +
    'retained by the vehicle.\n\n' +
    'The Foundation is a charitable institution. Its objects are the relief of\n' +
    'poverty in the communities in which the Group operates. Six plots of oil palm,\n' +
    'soy and cattle are not a use of the Foundation. They are a use of the\n' +
    'Foundation\'s balance sheet.\n\n' +
    'NOTE BY THE TRUSTEE.\n' +
    'I have asked for this to be corrected. I was told that the plots are held\n' +
    '"for the purposes of the Foundation", which is the language of the deed, and\n' +
    'that "for the purposes of the Foundation" has never been defined and cannot\n' +
    'now be defined without a legal opinion that I am instructed not to obtain.\n\n' +
    'I have been the Trustee for six years. In that time 4 households have been\n' +
    'funded for housing and no house has been built. I am going to write plainly.\n' +
    'The Foundation is a place where the Group keeps the consequences of its\n' +
    'operations in a jurisdiction whose courts cannot reach them, under a coat of\n' +
    'arms that says Relief.'));

  D.push(doc('re-h07', 'the_land_under_the_hearth_house.txt',
    'Ground beneath an AR-21 installation', '2016-08-30',
    'AeroDyn Division warranty administration; internal note',
    ['real_estate', 'ar21', 'hearth', 'ground', 'warranty'],
    'INTERNAL NOTE — WARRANTY ADMINISTRATION\n' +
    'Subject: the ground beneath the installation.\n\n' +
    'A claim has been declined under warranty exclusion 5(d) (corrosion arising\n' +
    'from the composition of the ground). The applicant is a housing association\n' +
    'that installed 61 AR-21 units on a single plot in 2012. 17 claims are before\n' +
    'us. All 17 are excluded.\n\n' +
    'The applicant has supplied a soil analysis of the plot showing copper at 88\n' +
    'mg/kg against a background of 9. The plot was greenfield agricultural land\n' +
    'with no Group operation of any kind. The nearest Group operation is four\n' +
    'kilometres away and is a fertiliser blending plant, not a copper operation.\n\n' +
    'We have declined the claims under 6, because the burden of proving that the\n' +
    'substance was not introduced by or with our goods is on the applicant, and\n' +
    'because no Group company introduces copper.\n\n' +
    'MY OWN NOTE, NOT FOR THE FILE.\n' +
    'There are two possible explanations. The first is that 88 mg/kg of copper in\n' +
    'greenfield soil four kilometres from a fertiliser plant is a natural\n' +
    'occurrence, which would be remarkable but possible. The second is that\n' +
    'somebody put it there, and that the somebody is a company in this Group, and\n' +
    'that the company is not the one that makes fertiliser.\n\n' +
    'There is a third explanation, which is the one I have been turning over for a\n' +
    'week. The AR-21 is a fuel cell. It is not a copper device. But its heat\n' +
    'exchanger is brazed with a copper-bearing alloy, and a brazed alloy in\n' +
    'contact with soil at pH 5.9 will give up its copper over twenty years. The\n' +
    'applicants are being corroded by the buildings we sold them, and the ground\n' +
    'under the buildings is being made toxic by the buildings we sold them.\n\n' +
    'If that is what is happening, then exclusion 5(a) is doing something the\n' +
    'wording does not describe: it is excluding the applicant from a claim\n' +
    'arising from our own product, by way of the ground, and the applicant cannot\n' +
    'know that, and we know it, and the burden at 6 makes the knowledge useless to\n' +
    'the applicant.'));

  D.push(doc('re-h08', 'novosibirsk_hectares.txt',
    'Novosibirsk site — land not on the register', '2012-05-11',
    'Real Estate Division, site inspection',
    ['real_estate', 'novosibirsk', 'hectares', 'register', 'site'],
    'NOVOSIBIRSK — AREA NOT ON THE GROUP LAND REGISTER\n' +
    'Recorded by the site inspector, 2012-05-11.\n\n' +
    'The site occupies 440 hectares. The Group Land Register records 423 hectares\n' +
    'for this site across three parcels.\n\n' +
    'The difference of 17 hectares lies west of the vivarium, is fenced, is not\n' +
    'mapped on any Group plan, and contains two of the three undocumented Ember\n' +
    'flares.\n\n' +
    'I have walked it. It has not been cleared, in the sense that no felling has\n' +
    'taken place; the standing timber is intact and there are no slash deposits.\n' +
    'But the understorey is dead to a radius of about 400 m from each flare, and\n' +
    'the ground within that radius will not hold a footprint. In October the wind\n' +
    'comes from the west, which is why the dead sector opens like that.\n\n' +
    'The 17 hectares are not on the register because they were acquired, so far as\n' +
    'I can determine, from the Novosibirsk site entity in 2004 as part of a\n' +
    'boundary revision that was filed with the oblast and never in the Group\n' +
    'register. The site entity\'s own acquisition file contains the boundary plan.\n' +
    'The Group register was updated in 2006 and 2015 and neither update caught it.\n\n' +
    'I have reported this to the Division and to the Group Archivist. I have been\n' +
    'told to raise it with the Committee of the Unlisted, which I am not, and I\n' +
    'have been told that the Committee of the Unlisted is not a body to which a\n' +
    'site inspector reports. I am raising it here.'));

  D.push(doc('re-h09', 'what_the_audit_measured.txt',
    'Concession audit — scope and coverage', '2020-02-19',
    'Group Internal Audit; response not received',
    ['real_estate', 'audit', 'concession', 'scope', 'ilbara'],
    'INTERNAL AUDIT — IBARA CONCESSION, SCOPE AND COVERAGE\n' +
    'Field work 2019-06 to 2019-11. Report 2020-02-19.\n\n' +
    'SCOPE. 214,000 hectares registered; 148,000 hectares in Brazil.\n\n' +
    'WHAT THE AUDIT MEASURED.\n' +
    'Permitted concession area verified against the state concession register: 12,440\n' +
    'hectares.\n\n' +
    'Cleared area verified by canopy classification from satellite, at 30 m\n' +
    'resolution: 71,900 hectares.\n\n' +
    'Restored area verified by the same method, applying the Group\'s own\n' +
    'restoration definition: 9,200 hectares.\n\n' +
    'WHAT THE AUDIT MEASURED AND REPORTED.\n' +
    'Cleared area outside the permitted concession: 59,460 hectares.\n\n' +
    'WHAT THE AUDIT DID NOT MEASURE, AND WHY.\n' +
    '1. Canopy classification cannot distinguish a felled stand from a stand of\n' +
    'standing dead trees. The audit protocol uses Green Index and a moisture\n' +
    'index, and at 30 m resolution a hectare of dead trunks reads as a hectare of\n' +
    'recovering canopy. This was raised by the field team in 2019-07 and the\n' +
    'protocol was not amended.\n' +
    '2. The audit did not sample soil. Soil sampling is a remediation group\n' +
    'procedure and requires an intrusive-permit application for each point.\n' +
    '4,100 intrusive permits were requested. 61 were granted.\n' +
    '3. The audit did not take photographs from the ground. Ground photography\n' +
    'requires notice under Security Policy 11 and, in the Ibara concession, that\n' +
    'notice is issued by the concession company, which is the subject of the audit.\n' +
    '0 of 4,100 points were photographed.\n\n' +
    'CONCLUSION OF THE AUDIT.\n' +
    'The Group has cleared 59,460 hectares outside the area in which it is\n' +
    'permitted to clear. The Group\'s restoration accounting, which is presented to\n' +
    'investors as 9,200 hectares restored, is drawn from the same 30 m\n' +
    'classification and is therefore measuring the same dead ground.\n\n' +
    'The response to this report is recorded in the file as: "Noted. Restoration\n' +
    'protocol to be reviewed in 2021." The protocol was reviewed in 2021. The\n' +
    'resolution was not amended.'));

  reg('/real_estate', D);
})(typeof window !== 'undefined' ? window : this);
