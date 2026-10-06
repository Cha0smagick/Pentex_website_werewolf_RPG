/* Pentex Industries Worldwide — /products. Hand-written records. */
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
      path: '/products/' + name,
      name: '/products/' + name,
      title: title,
      date: date,
      src: src,
      tags: tags,
      body: body.replace(/\n[ \t]+$/gm, '\n').trim()
    };
  }

  var D = [];

  D.push(doc('pr-h01', 'ar21_hearth_datasheet.txt',
    'AR-21 Hearth — product datasheet (external)', '2018-04-01',
    'AeroDyn Division, product management',
    ['product', 'hearth', 'ar21', 'gaia_ichor', 'datasheet'],
    'PENTEX AERODYN — AR-21 HEARTH\n' +
    'Fuel cell domestic heating appliance\n' +
    'Datasheet AR-21-H (supersedes AR-19-H)\n\n' +
    'APPLICATION.\n' +
    'The AR-21 delivers 21 kW thermal from a natural-gas feed. Intended for\n' +
    'single-family and small commercial premises not connected to a district\n' +
    'scheme. The unit requires an annual service visit by an approved installer.\n\n' +
    'PERFORMANCE.\n' +
    'Thermal output                21.0 kW\n' +
    'Efficiency at nameplate       94%\n' +
    'Start-up to full load         4 minutes\n' +
    'Serviced interval             12 months\n' +
    'Expected service life         20 years\n\n' +
    'INSTALLATION REQUIREMENTS.\n' +
    'Commissioning must be carried out by a Pentex-authorised installer. The\n' +
    'applicant must record the serial number of the unit, the gas supply\n' +
    'reference, and the name of the person who commissioned it, on Form\n' +
    'AR-21/2. Form AR-21/2 must be returned to the AeroDyn Division.\n\n' +
    'AERODYN DOES NOT PUBLISH THE INTERNAL FLUID PATH DIAGRAM OF THE AR-21.\n' +
    'The AR-21/2 form requests no reason for this. It is the ordinary form.'));

  D.push(doc('pr-h02', 'ar21_warranty.txt',
    'AR-21 Hearth — warranty terms and exclusions', '2018-04-01',
    'AeroDyn Division, customer assurance',
    ['product', 'hearth', 'ar21', 'warranty', 'exclusion'],
    'AR-21 HEARTH — WARRANTY TERMS (extract)\n\n' +
    '4. COVER. AeroDyn warrants the burner stack and the heat exchanger for ten\n' +
    'years and all other components for two years from the date of commissioning\n' +
    'recorded on Form AR-21/2.\n\n' +
    '5. EXCLUSIONS. The warranty does not apply to:\n' +
    '  (a) damage arising from the composition of the ground on which the\n' +
    '      appliance stands, or from any substance introduced into the ground\n' +
    '      beneath it by the applicant, a neighbour, or a third party;\n' +
    '  (b) damage arising from the composition of the water supply to the\n' +
    '      premises, including any substance introduced into that supply by any\n' +
    '      party;\n' +
    '  (c) damage arising from the composition of the air supply to the premises\n' +
    '      where the premises draw their air from an aperture that has not been\n' +
    '      tested since installation;\n' +
    '  (d) corrosion arising from any of the above, including corrosion which\n' +
    '      would not have occurred but for the presence of the substance, and\n' +
    '      corrosion which occurs after the substance has ceased to be present.\n\n' +
    '6. BURDEN OF PROOF. In respect of any exclusion at 5(a), 5(b), 5(c) or 5(d),\n' +
    'the applicant bears the burden of demonstrating that the substance was not\n' +
    'introduced by or with the goods of AeroDyn. AeroDyn will not accept an\n' +
    'attribution by any third party unless that third party is a Group company.\n\n' +
    '7. NOTE ON 6. The burden at paragraph 6 was added in 2011. The warranty as\n' +
    'drafted in 2004 placed the burden on AeroDyn. The change was made on the\n' +
    'recommendation of counsel in response to a claim in which an applicant had\n' +
    'demonstrated a concentration gradient running from an adjacent municipal\n' +
    'landfill toward the appliance, and had, at AeroDyn request, tested the\n' +
    'landfill, and had shown a concentration at the landfill eleven times the\n' +
    'concentration at the appliance. The claim was not denied on the facts. It was\n' +
    'denied because the applicant had signed warranty registration AR-21/2,\n' +
    'which contains, in the acknowledgement of the installer, the words "applicant\n' +
    'accepts full responsibility for site and supply conditions".'));

  D.push(doc('pr-h03', 'x77_safety_datasheet.txt',
    'X-77 — safety datasheet (external, 2019 revision)', '2019-08-12',
    'PetroChem Division, regulatory affairs',
    ['product', 'x77', 'sds', 'spill', 'carriion'],
    'PENTEX PETROCHEM — SAFETY DATA SHEET\n' +
    'Product: X-77 soil penetrant\n' +
    'Revision: 2019-08-12 (supersedes 2011 revision)\n\n' +
    'SECTION 2 — HAZARD IDENTIFICATION.\n' +
    '2.1 Classification. Skin corrosion 1B. Aquatic acute 1. Aquatic chronic 1.\n' +
    '2.2 Signal word: DANGER.\n' +
    '2.3 Hazards: causes severe skin burns. Very toxic to aquatic life. Causes\n' +
    'long lasting harmful effects to aquatic life. Toxic to humans following a\n' +
    'single prolonged skin contact.\n\n' +
    'SECTION 15 — REGULATORY INFORMATION.\n' +
    '15.1 This product is not listed on any public register of restricted\n' +
    'substances in the Republic of Brazil, the United States, or the European\n' +
    'Union. It has never been listed.\n\n' +
    'SECTION 16 — OTHER INFORMATION.\n' +
    '16.3 Revision history. 2011: threshold values harmonised. 2019: sections 2 and\n' +
    '15 re-reviewed following the Ibara Basin consent decree and no change made.\n' +
    'The reviewer recorded that the product is used in Brazil at concentrations\n' +
    'and volumes not anticipated by the template, that the template has no\n' +
    'provision for a soil penetrant used below ground and therefore invisible, and\n' +
    'that an invisible hazard which has been measured once cannot be reported as\n' +
    'a trend.'));

  D.push(doc('pr-h04', 'x77_volume_summary.txt',
    'X-77 — production and application volume summary', '2020-01-31',
    'PetroChem Division, commercial reporting; extract prepared for Reg. Eng.',
    ['product', 'x77', 'volumes', 'carriion', 'river'],
    'X-77 — VOLUME SUMMARY 1994-2019 (extract)\n' +
    'Compiled by Regulatory Engineering (22-09) from commercial reporting, for\n' +
    'the purpose of comparing volume against the volume reported to the\n' +
    'concession authority.\n\n' +
    'YEAR   PRODUCED (t)   APPLIED (t)   REPORTED TO CONCESSION (t)\n' +
    '1994   4,110          3,980         1,900\n' +
    '1995   5,240          5,101         2,000\n' +
    '1996   6,930          6,880         2,000\n' +
    '1997   6,940          6,902         2,100\n' +
    '1998   7,220          7,190         2,100\n' +
    '2001   9,400          9,388         2,100\n' +
    '2004   9,880          9,861         2,400\n' +
    '2007   9,995          9,972         2,400\n' +
    '2010  10,110          9,998         2,400\n' +
    '2013  10,240         10,196         2,500\n' +
    '2016  10,290         10,244         2,500\n' +
    '2019  10,310         10,281         2,500\n\n' +
    'The applied column is derived from logbook tonnage at seven application\n' +
    'stations and is reconciled to production. The reported column is the figure\n' +
    'submitted to the concession authority, which is calculated by an allocation\n' +
    'method described in the commercial reporting manual as "pro-rata by\n' +
    'concession area, excluding areas under active rehabilitation".\n\n' +
    'The consequence of the allocation method is that a clearing that is recorded\n' +
    'as rehabilitation ceases to be counted as cleared, and the product applied\n' +
    'to it continues to be counted as applied. The reported column is therefore\n' +
    'not a record of what we did. It is a record of what we were willing to be\n' +
    'seen to have done, and it has been stable for twenty-five years while the\n' +
    'applied column has tripled.'));

  D.push(doc('pr-h05', 'bs22_adjuvant.txt',
    'BS-22 immunologic adjuvant — technical bulletin', '2016-10-05',
    'BioSynth Division, technical services',
    ['product', 'bs22', 'adjuvant', 'mayfly', 'immune'],
    'BS-22 — IMMUNOLOGIC ADJUVANT\n' +
    'Technical bulletin TB-22-04\n\n' +
    '1. FUNCTION. BS-22 is a non-specific potentiator of humoral and cellular\n' +
    'immune response. Administered as an adjuvant, it raises the magnitude of the\n' +
    'antibody response to a co-administered antigen by a factor of between nine\n' +
    'and forty, depending on the antigen and the interval.\n\n' +
    '2. INDICATIONS. Difficult-to-conjugate antigens; antigens for which the\n' +
    'immune response declines with age; antigens where a single administration is\n' +
    'operationally preferable to a schedule.\n\n' +
    '3. DIRECTIONS. Admixture in the proportion 1:3. Administer within one hour of\n' +
    'reconstitution. Do not store after admixture.\n\n' +
    '4. NOTE ON 2. The second indication is the reason this product exists in the\n' +
    'form in which it exists. An adjuvant whose function is to raise response\n' +
    'magnitude in the young does not require a single-administration formulation.\n' +
    'A single-administration formulation is required where the recipient cannot be\n' +
    'brought back for a second administration.\n\n' +
    '5. NOTE ON 4. The recipients who cannot be brought back are the people who\n' +
    'have left. In a group setting this is the greater part of the group. A\n' +
    'responder of twenty-two who is not brought back is a responder of eleven.\n\n' +
    '6. This bulletin has been in continuous use since 1996 and has been revised\n' +
    'four times. Sections 4 and 5 have never been revised, although section 4\n' +
    'describes the commercial rationale for the product and section 5 describes\n' +
    'the reason the commercial rationale matters.'));

  D.push(doc('pr-h06', 'pf40_discontinued.txt',
    'PF-40 — discontinued product ledger', '2008-11-19',
    'Pentex Foundation, supply division',
    ['product', 'pf40', 'discontinued', 'foundation', 'ledger'],
    'PRODUCT DISCONTINUATION LEDGER — PF-40\n' +
    'Discontinued 2008-11-19. Final order placed 2009-03-04. Last delivery 2009-06-30.\n\n' +
    'FORMULATION (as at discontinuation).\n' +
    'Copper sulphate 41%. Zinc sulphate 12%. Manganese sulphate 3%. Wetting agent\n' +
    '0.4%. Inert carrier to 100%. Colourant: Pentex Industrial Blue 8B.\n\n' +
    'REASON FOR DISCONTINUATION, as recorded.\n' +
    'Low demand.\n\n' +
    'REASON FOR DISCONTINUATION, as found in the supply file.\n' +
    'The ledger records one shelf-life cycle of PF-40 during which the company\n' +
    'manufactured 611 tonnes and sold 4.1 tonnes. The 4.1 tonnes went to 34\n' +
    'households, in quantities of 120 kg, in the states of Acre and Rondonia, in\n' +
    '2004. The households are the households of the settlement claimants at Cota\n' +
    'and Ibara. The Foundation grant ledger for 2004 records BRL 6,700,000\n' +
    'disbursed against 4 households for the construction of housing. 607 tonnes\n' +
    'of the 611 went to a registered destructor in Jurong, invoiced at a\n' +
    'destruction cost, which is lower than the cost of the raw material.\n\n' +
    'The ledger entry has not been corrected. Correcting it would require\n' +
    'explaining why a microparticulate copper formulation was shipped to a\n' +
    'settlement at a cost per tonne that is below the cost of production, and\n' +
    'there is no answer to that question that survives contact with a reader.\n\n' +
    'The ledger entry is correct as written. It records that we made 611 tonnes\n' +
    'and sold 4.1.'));

  D.push(doc('pr-h07', 'bs3_ethics_application.txt',
    'BS-3 — application for ethics approval, and the answer', '1997-02-19',
    'BioSynth Division; Committee on Bioethics, Cota Station',
    ['product', 'bs3', 'ethics', 'bioethics', 'no_route'],
    'APPLICATION FOR ETHICS APPROVAL — PROTOCOL BS-3\n' +
    'Submitted 1997-02-19. Answer returned 1997-04-11.\n\n' +
    'PROPOSAL. To determine whether a sustained polyclonal immune response can be\n' +
    'induced in adult human subjects by repeated low-dose administration of\n' +
    'unconjugated antigen, and whether the induced response can be maintained for\n' +
    'a period of five years without booster administration.\n\n' +
    'SUBJECT RECRUITMENT. 40 subjects of working age, drawn from the four\n' +
    'lowest districts for childhood immunisation coverage. Recruitment by\n' +
    'district is proposed as an efficiency measure.\n\n' +
    'CONSENT. Written consent will be obtained from all subjects.\n\n' +
    'ANSWER OF THE COMMITTEE, 1997-04-11 (extract).\n' +
    'The Committee does not approve Protocol BS-3.\n\n' +
    'The Committee has no route by which to decline a protocol. Its terms of\n' +
    'reference permit it to approve a protocol, to require amendment of a\n' +
    'protocol, or to adjourn a protocol pending further information. The\n' +
    'Committee has no power to refuse, and where a protocol is refused the\n' +
    'refusal is recorded as a deferral and the protocol returns in ninety days.\n\n' +
    'BS-3 was returned to the Committee four times. It was approved on the fourth\n' +
    'return with the following requirements: that the district-based recruitment\n' +
    'schedule be destroyed; that consent be witnessed by a person not employed by\n' +
    'the sponsor; and that the Committee be informed of the total number of\n' +
    'subjects who had received the antigen at another site in the preceding two\n' +
    'years. That number was 1,470.\n\n' +
    '1,470 of the 40 subjects in Protocol BS-3 had already received the antigen.\n' +
    'The protocol was therefore not a trial of the antigen. It was a trial of\n' +
    'the duration of the response in people who had been dosed without their\n' +
    'consent at another site, which is what the Committee was told, and which the\n' +
    'Committee approved.'));

  D.push(doc('pr-h08', 'us4881204_note.txt',
    'Note on the filed counterpart of reserved application 3', '2011-09-08',
    'Group Patent Office; note prepared for the reserved estate review',
    ['product', 'patent', 'reserved', 'delivery', 'note'],
    'NOTE ON US 4,881,204\n' +
    'Prepared 2011-09-08 for the reserved estate review of the Board.\n\n' +
    'US 4,881,204, filed by a Swiss trading house in 1986 and now in the\n' +
    'portfolio, claims a delivery vehicle for a reactive agent comprising a\n' +
    'pressure vessel, an inlet port, a catalyst bed, and a shearing means\n' +
    'disposed between the inlet and the bed.\n\n' +
    'The shearing means is the subject of Claim 4. Claim 4 is the reason the\n' +
    'patent is in the portfolio and not in the Group portfolio: the Group\n' +
    'portfolio holds the patent as filed, with Claims 1 to 3 and 5 to 9. Claim 4\n' +
    'was disclaimed in 1991 in order to obtain allowance, on the instruction of\n' +
    'the Swiss assignee.\n\n' +
    'Reserved application 3 describes, in different words and with the same\n' +
    'geometry, the same device. It was drafted in 1994. It has never been filed.\n' +
    'It has been cited nowhere, referred nowhere, and published nowhere, and it\n' +
    'has sat in the reserved estate of this Office since it was drafted.\n\n' +
    'The Board was asked in 1994 whether the Group wished to be the first filer\n' +
    'in the world on selective delivery. The Office advised that being first\n' +
    'filer carried a cost in that the claims would be public. The Board advised\n' +
    'that it was preferable that the claims not be public, and that the reserved\n' +
    'estate be reviewed annually. The estate has been reviewed annually since\n' +
    '1994. The minutes of each review record the same item.'));

  D.push(doc('pr-h09', 'catalogue_cover_letter.txt',
    'Product catalogue — covering letter to accredited distributors', '2013-06-01',
    'PetroChem Division, marketing',
    ['product', 'catalogue', 'distribution', 'letter'],
    'PENTEX PETROCHEM — PRODUCT CATALOGUE 2013\n' +
    'Covering letter to accredited distributors.\n\n' +
    'The catalogue is enclosed with the new X-77 datasheet and the AR-21\n' +
    'warranty, both of which have been revised.\n\n' +
    'Three points should be drawn to the attention of accredited distributors.\n\n' +
    '1. The X-77 datasheet continues to state that the product is not listed on\n' +
    'any public register of restricted substances. This remains correct. The\n' +
    '2012 revision of the template requested a field for "products used below\n' +
    'ground in quantities exceeding 100 kg per calendar year" and the field was\n' +
    'left blank.\n\n' +
    '2. The AR-21 warranty exclusions at 5(a), 5(b) and 5(c) are unchanged. We are\n' +
    'aware that they are read by distributors as being directed at end-users\n' +
    'rather than at us. They are not. They are drafted so that a claim cannot\n' +
    'reach us by way of an attribution made by somebody we do not employ, and in\n' +
    'the three years since 2010 the exclusion at 5(d) has been successfully\n' +
    'invoked in nineteen claims, seventeen of which arose within four kilometres\n' +
    'of an operating Group site.\n\n' +
    '3. The number of AR-21 households whose claims were declined under 5(d) in\n' +
    'the last two years is 84. Accredited distributors are not to be given the\n' +
    'names of those households. Accredited distributors are to be given the\n' +
    'sentence in paragraph 2, which is true, and which has the effect of removing\n' +
    'the question before it is asked.\n\n' +
    'No distributor has asked the question.'));

  reg('/products', D);
})(typeof window !== 'undefined' ? window : this);
