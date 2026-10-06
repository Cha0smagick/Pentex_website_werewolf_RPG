/* Pentex Industries Worldwide — /supply. Hand-written records. */
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
      path: '/supply/' + name,
      name: '/supply/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('su-h01', 'concession_inputs.txt',
    'Concession inputs, Ibara basin', '2018-03-15',
    'PetroChem supply, Ibara annual reconciliation',
    ['supply', 'ibara', 'inputs', 'ammonia', 'reconciliation'],
    'CONCESSION INPUTS — IBARA BASIN, 2017 TONNES\n\n' +
    'INPUT                          IMPORTED   LOCAL      TOTAL\n' +
    'Anhydrous ammonia                 0    14,400    14,400\n' +
    'Sulphuric acid                    0    11,900    11,900\n' +
    'X-77 concentrate              2,510    10,310    12,820\n' +
    'Ember reagent                    41         0        41\n' +
    'Ioniser concentrate             88       340       428\n' +
    'Solvent (recovery feed)          0     4,100     4,100\n\n' +
    'NOTE ON THE X-77 LINE.\n' +
    'X-77 is imported as a concentrate and finished locally. The concentrate\n' +
    'arrives by river from Jurong. The finished volume applied within the\n' +
    'concession in 2017 was 10,310 tonnes, and the volume returned to the\n' +
    'concession authority for 2017 was 2,400 tonnes.\n\n' +
    'The difference of 7,910 tonnes is not a stock movement. Local product is\n' +
    'finished at the local plant from concentrate at a stated ratio, and the\n' +
    'ratio is documented, and the arithmetic at the bottom of this sheet shows\n' +
    'that the local plant could not have produced 10,310 tonnes from 2,510 tonnes\n' +
    'of concentrate.\n\n' +
    '  concentrate in, 2,510 t\n' +
    '  ratio 1:4.1 by mass, so maximum product out, 10,291 t\n' +
    '  reported product applied, 10,310 t\n' +
    '  discrepancy, 19 t\n\n' +
    '19 tonnes is 0.18 per cent and is within the tolerance of the reconciliation.\n' +
    'The reconciliation records it as within tolerance. This note was written\n' +
    'because the tolerance is 0.2 per cent and the tolerance was set in 2014\n' +
    'after a year in which the discrepancy was 0.31 per cent and was described in\n' +
    'the file as a rounding difference.'));

  D.push(doc('su-h02', 'kaliningrad.txt',
    'Supplier of record: ammonium nitrate entity', '2016-10-02',
    'PetroChem supply, counterparty file',
    ['supply', 'kaliningrad', 'ammonia', 'counterparty', 'entity'],
    'SUPPLIER OF RECORD — AMMONIUM NITRATE (FOR MUNITIONS)\n' +
    'Revised 2016-10-02.\n\n' +
    'The Munitions Division requires 1,100 tonnes a year of technical ammonium\n' +
    'nitrate. It has no supplier of record. It has an intermediary.\n\n' +
    'The intermediary is an entity registered in 1997 in a free economic zone whose\n' +
    'registered address is a fourth-floor apartment in Kaliningrad, of which the\n' +
    'corporate records show no other company and no other officer. The entity has\n' +
    'no employees. It has no website. It files a return in the jurisdiction in\n' +
    'which it is registered and it has been in good standing for twenty-seven\n' +
    'years.\n\n' +
    'The intermediary supplies 1,100 tonnes a year at a price 31 per cent above\n' +
    'the Group\'s PetroChem price for the same product, from the same works, on\n' +
    'the same terms.\n\n' +
    'The entity name appears in the Group\'s supplier register. The entity name does\n' +
    'not appear in the Group\'s beneficial ownership register. Corporate\n' +
    'development has raised this in 2011, 2014, 2016 and 2019. The response in\n' +
    'each year is the same sentence: the entity is a member of the public record in\n' +
    'its jurisdiction and Group policy does not require diligence beyond the\n' +
    'public record.\n\n' +
    'THE QUESTION THAT WAS PUT IN 2019 AND HAS NOT BEEN ANSWERED.\n' +
    'Why is the Munitions Division not buying from PetroChem? PetroChem makes the\n' +
    'product, sells it at the lower price, and is in the same Group.\n\n' +
    'THE ANSWER THAT WAS OFFERED IN 2019.\n' +
    'That the Munitions Division buys from a supplier of record, and that the\n' +
    'division and the Group are separate buyers for the purposes of procurement\n' +
    'policy. It is a true sentence. It is the answer of a company that has decided\n' +
    'not to ask.'));

  D.push(doc('su-h03', 'vegetation_management_scope.txt',
    'Vegetation management scope of services', '2017-01-09',
    'Manaus site, concession contract',
    ['supply', 'redline', 'vegetation', 'scope', 'survey'],
    'VEGETATION MANAGEMENT — SCOPE OF SERVICES\n' +
    'Contract between the concession company and a registered contractor.\n\n' +
    'SCOPE.\n' +
    'The contractor shall maintain the concession to the following condition: all\n' +
    'areas within the concession perimeter being free of standing timber above two\n' +
    'metres, save where a mature canopy is retained for ecological function, and\n' +
    'save where timber is retained for shade or for measurement.\n\n' +
    'THE PERIMETER.\n' +
    'The perimeter is defined in Schedule 2 by reference to eleven (11) survey\n' +
    'markers installed by the concession company between 2009 and 2016, and by the\n' +
    'marker positions as installed. The perimeter is not defined by any date, and\n' +
    'no obligation in this contract arises from the passage of time.\n\n' +
    'SCHEDULE 2, NOTE 3.\n' +
    'Where a marker is destroyed, lost, or inaccessible, the perimeter shall be\n' +
    'determined by the concession company\'s surveyor. Where a marker is relocated,\n' +
    'the perimeter follows the marker.\n\n' +
    'THIS IS THE WHOLE OF THE REDLINE.\n' +
    'The choice of a survey marker over a date is the whole of it.\n\n' +
    'If the perimeter is a date, the contractor has a list of hectares and a\n' +
    'deadline, and it will make a plan, and the plan will be legible. If the\n' +
    'perimeter is eleven markers, the contractor has eleven markers and a\n' +
    'condition, and no list, and no deadline, and no plan.\n\n' +
    'Note 3 was drafted in 2016 by the concession company. It was drafted after an\n' +
    'audit of the 2015 works, which found that the 2015 works had cleared 61\n' +
    'hectares inside the perimeter and 1,240 hectares outside it, and which found\n' +
    'that the outside hectares were not a failure because there was no list.'));

  D.push(doc('su-h04', 'aerial_application_log.txt',
    'Aerial application log — reach 4, 2019', '2019-08-30',
    'Manaus site, logbook transcribed',
    ['supply', 'aerial', 'application', 'log', 'mau'],
    'AERIAL APPLICATION LOG — REACH 4 — SEASON 2019\n' +
    'Transcribed from the logbook by the site records clerk.\n\n' +
    'DATE   BLOCK   RATE (L/ha)  AREA (ha)  PILOT            WEATHER\n' +
    '03-15  1       3.0          118        Guimaraes, R.    dry, calm\n' +
    '03-22  1       3.0          118        Guimaraes, R.    dry\n' +
    '03-29  2       3.0          141        Barros, L.       dry, gusting\n' +
    '04-05  2       3.0          141        Barros, L.       dry\n' +
    '04-12  3       3.0          155        Guimaraes, R.    dry, gusting\n' +
    '04-19  3       3.0          155        Guimaraes, R.    dry\n' +
    '04-26  4       3.0          155        Barros, L.       dry, gusting\n' +
    '05-03  4       3.0          155        Barros, L.       dry\n' +
    '05-10  5       2.4          141        Guimaraes, R.    dry, gusting\n' +
    '05-17  5       2.4          141        Guimaraes, R.    dry\n' +
    '05-24  6       2.4          118        Barros, L.       dry, gusting\n' +
    '06-04  6       2.4          118        Barros, L.       rain, aborted\n' +
    '06-11  7       1.8          118        Guimaraes, R.    dry, gusting\n' +
    '06-18  7       1.8          118        Guimaraes, R.    dry\n' +
    '07-02  8       1.8          155        Barros, L.       dry, gusting\n' +
    '07-09  8       1.8          155        Barros, L.       dry\n' +
    '07-16  9       1.2          141        Guimaraes, R.    dry, gusting\n' +
    '07-23  9       1.2          141        Guimaraes, R.    dry\n' +
    '08-06  10      1.2          118        Barros, L.       dry, gusting\n' +
    '08-13  10      1.2          118        Barros, L.       dry\n\n' +
    'AREA APPLIED, 2019: 2,404 hectares. PERMITTED CLEARING, 2019 Q1: 1,700\n' +
    'hectares.\n\n' +
    'NOTES.\n' +
    '1. The rate falls from 3.0 to 1.2 litres per hectare between May and July.\n' +
    'The reduction is scheduled, not observed. It is in the application plan as\n' +
    'issued in January and it has been the same schedule since 2016.\n\n' +
    '2. Every line records the weather as dry. There are no adverse-weather lines.\n' +
    'Where the weather is recorded as gusting, the operation proceeded. There is no\n' +
    'line recording an operation suspended for drift, and the site holds a drift\n' +
    'requirement of 3 m or less.\n\n' +
    '3. The site holds photographs of the last application of each block. No\n' +
    'photograph of any block has been taken after 08-13 in any year. The reason\n' +
    'given is that the stands are mature after that date and a photograph of a\n' +
    'mature stand does not show whether the stand is the stand we intended. This\n' +
    'is a reasonable reason and it is applied to every block in every year.\n\n' +
    '4. The first pass of every block is not photographed, because the pass is\n' +
    'early and the light is bad. The second pass is photographed. In 2019 the\n' +
    'second pass of Block 4 was photographed on 05-03, thirty-one days before the\n' +
    'canopy opened, and the canopy is now dead.'));

  D.push(doc('su-h05', 'workforce_water.txt',
    'Workforce water supply, Manaus', '2016-04-22',
    'Manasus site, facilities',
    ['supply', 'water', 'workforce', 'mau', 'tankers'],
    'WORKFORCE WATER SUPPLY — MANAUS SYNTHESIS ANNEXE\n' +
    'Reviewed 2016-04-22.\n\n' +
    'The annexe employs 411 people directly and 640 through contractors. Potable\n' +
    'water is supplied by tankered delivery from the group pumping station at the\n' +
    'road, four times a week.\n\n' +
    'The Group does not maintain a water meter at the annexe. The Group has never\n' +
    'maintained a water meter at the annexe. There is no meter because a metered\n' +
    'supply can be compared, and an unmetered supply can only be counted.\n\n' +
    'DELIVERY RECORD 2016.\n' +
    'Tanker deliveries: 214. Scheduled: 208. Six additional deliveries were made\n' +
    'without a schedule entry, each on a Friday.\n\n' +
    'THE SIX.\n' +
    'Four of the six are recorded in the delivery log as "supplementary". Two are\n' +
    'recorded as "repair". The word repair is not a delivery description. There is\n' +
    'no repair on a Friday at a tankered water point. The two entries are in the\n' +
    'hand of the site facilities supervisor and, unlike the four, they have no\n' +
    'corresponding entry in the works order book, which is a separate book kept\n' +
    'in the same office.\n\n' +
    'WHY THE WHOLE ANNEXE IS ON TANKER.\n' +
    'The reason in the file is that the annexe is not a permanent settlement and\n' +
    'the Group does not build permanent water infrastructure for a temporary\n' +
    'workforce. This is true. The concession area has been worked by the Group\n' +
    'for forty-one years and there is no permanent settlement anywhere within it,\n' +
    'which is a decision and not a fact about the place.\n\n' +
    'A NOTE FROM THE SITE VETERINARIAN, appended 2016-04-22, unsigned.\n' +
    'I have asked three times for a water analysis of the tankered supply for the\n' +
    'workforce, on the same basis that I analyse the vivarium supply, and I have\n' +
    'been refused three times, and the reason given has been that the tankered\n' +
    'supply is potable.\n\n' +
    'The reason given has been that the tankered supply is potable. I did not\n' +
    'dispute it. I have stopped asking to be told that it is potable. I am\n' +
    'writing to ask that it be counted.'));

  D.push(doc('su-h06', 'the_last_lorry.txt',
    'Manifest: final lorry, Reach 4, 2021', '2021-10-11',
    'Manasus site, manifest office',
    ['supply', 'manifest', 'lorry', 'reach4', 'last'],
    'MANIFEST — LAST ENTRY, REACH 4, 2021-10-11\n\n' +
    'VEHICLE      TRACTOR-UNIT BRT-4471, PLATE OY-8814\n' +
    'OPERATOR     A. Ferreira (contract, Veritas Forestry)\n' +
    'DESTINATION  Reach 4, Block 4, gate 2\n' +
    'CARGO        felled timber, 44 tonnes\n\n' +
    'NOTE BY THE MANIFEST OFFICE.\n' +
    'This is the last load over the south road. Reach 4 has been closed to\n' +
    'felling with effect from 2021-10-11 and the gate 2 barrier is to be concrete\n' +
    'on 2021-11-08.\n\n' +
    'Reach 4 was closed on the grounds that the block is within the perimeter and\n' +
    'that the remaining standing volume is below the commercial threshold. The\n' +
    'file records 2,100 hectares cleared within the perimeter in Reach 4 between\n' +
    '2016 and 2021 and 611 hectares replanted in 2018 and 2019. The 2019\n' +
    'regeneration survey records, for each of the 611 hectares, a classification of\n' +
    '"recovering canopy", made from a 30 m image.\n\n' +
    'TWO OBSERVATIONS BY THIS OFFICE, WHICH IS NOT A FORESTRY OFFICE.\n\n' +
    '1. The 2018 replanting used a seed lot supplied by the Group\'s own seed\n' +
    'division, which has performed a germination test on every lot and has a\n' +
    'failure rate of under two per cent. The 2019 regeneration survey found\n' +
    'emergence at zero per cent on the 2018 sowing and at sixty per cent on the\n' +
    '2019 sowing, which used the same seed lot and a different contractor.\n\n' +
    '2. The barrier is to be concrete. A barrier is a surface. A surface has no\n' +
    'purpose at a closed gate other than to prevent a vehicle from crossing it.\n' +
    'This office has never been asked why a closed gate needs a concrete barrier\n' +
    'and has never asked, and would like the question to be recorded as having\n' +
    'occurred to it.'));

  D.push(doc('su-h07', 'manaus_routes.txt',
    'Logistics routes from the junction', '2014-07-08',
    'Manasus site, transport',
    ['supply', 'routes', 'mau', 'logistics', 'map'],
    'LOGISTICS ROUTES — MENEIM GRABEN JUNCTION\n' +
    'Internal note, 2014-07-08.\n\n' +
    'From the junction there are two roads.\n\n' +
    'THE NORTH ROAD serves the plant, the blending hall, the administration block,\n' +
    'the accommodation, and the standpipes at the road and at the river landing.\n\n' +
    'THE SOUTH ROAD serves the reach above the intake, the four remaining\n' +
    'standpipes, and nothing else. There is no plant on the south road. There is\n' +
    'no administration on the south road. There is no habitation on the south road\n' +
    'and there is no habitation on the south road because there is no habitation\n' +
    'there, which has been the position since 1971.\n\n' +
    'The south road is 41 km. The tankers run it four times a week. It has a\n' +
    'pumping station at the junction and four standpipes at the far end and no\n' +
    'meter at any point.\n\n' +
    'THE QUESTION THAT WAS PUT IN 2014.\n' +
    'Why is a water tanker a scheduled operation of a manufacturing site, on a\n' +
    'road with no plant on it, when the site employs 1,051 people who are, at\n' +
    'other times, provided with water by a building?\n\n' +
    'THE ANSWER GIVEN.\n' +
    'That the south road is a concession asset and the concession company is\n' +
    'obliged to provide water in the concession area, and that the obligation is\n' +
    'to the concession and not to the plant.\n\n' +
    'THE OBLIGATION IS REAL. It is in the 1971 permit at clause 19. It requires\n' +
    'water to be provided to occupants of the concession area. There were 5,240\n' +
    'occupants in 1971 according to the state census, and 0 according to the\n' +
    'report the purchaser relied on. The permit assumes the obligation is\n' +
    'continuous. The company has provided tankered water continuously since 1971.\n\n' +
    'In 1998 the obligation was discharged by a settlement instrument and the\n' +
    'obligation to continue was renewed for twenty years, and no record has been\n' +
    'made of the occupants served in any year since 1998.'));

  D.push(doc('su-h08', 'seed_and_calgary.txt',
    'Seed division note on failure to germinate', '2019-10-22',
    'Seed Division, agronomy; copied to Calgary remediation',
    ['supply', 'seed', 'calgary', 'germination', 'failure'],
    'SEED DIVISION — RESPONSE TO THE CALGARY FAILURE\n' +
    '2019-10-22. Copy to: Real Estate Division, Calgary.\n\n' +
    'We have tested the PROV-6 lot used on plot 6 at Calgary. Germination 91 per\n' +
    'cent on the lot as supplied. We have tested the same lot on certified clean\n' +
    'backfill from a Group remediation. Germination 89 per cent. On certified\n' +
    'clean soil from a non-Group source, germination 93 per cent.\n\n' +
    'The seed is not the answer. The lot is sound.\n\n' +
    'We note the pH of the plot at 4.4 and note that our own liming recommendation\n' +
    'for PROV-6 is pH 5.6 to 6.4 and has been since 1994, and that the Group\n' +
    'remediation specification has no liming requirement, because the Group\n' +
    'remediation specification addresses concentration and not biology.\n\n' +
    'SO THE ANSWER IS THE SPECIFICATION.\n' +
    'The plot was remediated to a concentration criterion, certified, and replanted\n' +
    'with a seed that will not germinate at the pH the criterion permits. Both\n' +
    'documents were correct. A person could have signed both.\n\n' +
    'WHAT WE ARE NOT GOING TO DO.\n' +
    'We have been asked to recommend a seed that will germinate at pH 4.4. There is\n' +
    'no such seed. There are seeds that germinate at pH 4.4, and they are not\n' +
    'crops, and planting them would produce a photograph that satisfies the\n' +
    'remediation group and nothing else.\n\n' +
    'WHAT WE ARE GOING TO DO.\n' +
    'We are going to recommend lime, at approximately 8 tonnes per hectare, over\n' +
    'plot 6 and over the four failed plots on the Cota Estate, and we are going to\n' +
    'record that the recommendation will not be adopted, because lime is not in the\n' +
    'remediation budget and because the plots are certified and a certified plot is\n' +
    'not re-inspected.'));

  D.push(doc('su-h09', 'custody_transfer.txt',
    'Chain of custody: product from gate to application', '2012-01-24',
    'PetroChem supply, custody procedure',
    ['supply', 'custody', 'chain', 'tanker', 'gap'],
    'CHAIN OF CUSTODY — PRODUCT, GATE TO APPLICATION\n' +
    'Procedure CP-4, revision 2012.\n\n' +
    '1. Product leaves the plant as a bulk consignment with a delivery note.\n' +
    '2. Product is transferred at the gate to the applicator\'s vehicle. The\n' +
    'transfer is witnessed by a driver and an applicator and both sign.\n' +
    '3. The consignment is weighed at the gate and at the block. Both weights are\n' +
    'recorded.\n' +
    '4. Where the difference between the gate weight and the block weight exceeds\n' +
    '1.5 per cent, the consignment is investigated.\n\n' +
    'WHERE CP-4 IS NOT APPLIED.\n' +
    'CP-4 applies to product delivered by road to an application block. It does not\n' +
    'apply to product delivered by air, to product applied by a fixed installation,\n' +
    'nor to product transferred between applicator vehicles in the field.\n\n' +
    'THE GAP.\n' +
    'The gap is between two vehicles. In the Ibara basin in 2011 the site log shows\n' +
    '4,110 tonnes applied and the gate log shows 4,110 tonnes delivered, and\n' +
    'between those two figures there are, on eleven days recorded in the logbook,\n' +
    'two applicator vehicles present at one block at one time, with no transfer\n' +
    'record, because CP-4 does not apply to a transfer between vehicles in the\n' +
    'field.\n\n' +
    'Eleven days. The volumes on those days are between 141 and 155 tonnes at 3.0\n' +
    'litres per hectare, so between 47 and 52 hectares per day, so between 517 and\n' +
    '569 hectares in eleven days, which is the difference between the volume\n' +
    'applied and the volume returned to the concession authority for 2011 as a\n' +
    'whole.\n\n' +
    'THE INTERPRETATION.\n' +
    'The reconciliation file records the 2011 difference as a stock movement and a\n' +
    'tolerance. The tolerance is 1.5 per cent. The difference is 22.6 per cent.\n\n' +
    'What CP-4 is for is not measurement. It is that when a consignment is\n' +
    'disputed, or when a question is asked about a consignment, the paper establishes\n' +
    'where the product went. The gap in CP-4 is the one place where a question\n' +
    'about where the product went has no paper to be answered by.'));

  reg('/supply', D);
})(typeof window !== 'undefined' ? window : this);
