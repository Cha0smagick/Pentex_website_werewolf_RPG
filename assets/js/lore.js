// Pentex — second lore layer.
//
// data.js holds the public company and the 32 documents that carry the story.
// This file holds the reference material those documents keep referring to:
// the product catalogue, the patent estate, and the people Pentex does not put
// on its website — practitioners, Garou, vampires, and the people who fix things
// for money. Everything here is cross-referenced by id from the archive.
//
// It also carries REGISTER, the seam that lets the archive grow to thousands of
// documents without shipping one enormous file: a chunk script declares a
// directory and its documents, and FS is rebuilt for that directory alone.
//
// All of it is invented. Pentex does not exist.

window.PENTEX = window.PENTEX || {};

(function (P) {
  "use strict";

  /* ----------------------------------------------------------------------
   * Product lines.
   *
   * `use` is what the brochure says. `note` is what the internal sheet says,
   * and it is the reason the archive exists.
   * -------------------------------------------------------------------- */
  const PRODUCTS = [
    // PetroChem — Houston
    { code: "PC-100", name: "Vermelo Series 100 process solvent", div: "PC", site: "hou", use: "Industrial solvent, degreasing, feedstock.", note: "Chosen for a vapour pressure window that lets it reach the water table before it degrades. Nobody at the plant asked why the retention ponds are shallow." },
    { code: "PC-140", name: "Ravine 140 heavy condensate", div: "PC", site: "hou", use: "Refinery intermediate, sold as fuel oil blend stock.", note: "The assay is reported one decimal place high on purpose. Two auditors have noticed. Both were transferred to the Foundation." },
    { code: "PC-220", name: "Coldline 220 process inhibitor", div: "PC", site: "hou", use: "Corrosion control in crude units.", note: "Contains a chelating agent that also binds calcium in bone. The safety sheet lists only the industrial hazard." },
    { code: "PC-310", name: "Ardent 310 flare promoter", div: "PC", site: "hou", use: "Improves combustion completeness in flares.", note: "Dyes the flame a colour that reads as clean on camera. Compliance photography is part of the product specification." },
    { code: "PC-455", name: "Pentex Mercapto catalyst", div: "PC", site: "hou", use: "Polymer and rubber production.", note: "Traceable to the Ibara release. The chain of custody has one link and it is a purchase order." },
    // BioSynth — Manaus
    { code: "BS-050", name: "Vetrafend livestock prophylactant", div: "BS", site: "mau", use: "Metabolic prophylaxis in herd health programmes.", note: "Suppresses fever, so it suppresses the only clinical sign of the infection the herd already has." },
    { code: "BS-070", name: "Canopy fungicide concentrate", div: "BS", site: "mau", use: "Crop protection in managed plantation.", note: "Applied on a schedule that tracks satellite fire alerts instead of a threshold." },
    { code: "BS-090", name: "Soil recalcitrant blend", div: "BS", site: "mau", use: "Remediation of hydrocarbon-affected soil.", note: "Sells as remediation. It is a very expensive way of moving the problem one depth down." },
    { code: "BS-110", name: "Rootstock inhibitor BS-110", div: "BS", site: "mau", use: "Dwarfing and vigour control in rubber and citrus.", note: "Kills the deep root. The tree stops dying from above and starts dying from below, which takes longer to photograph." },
    { code: "BS-130", name: "Immune modulator BS-130", div: "BS", site: "mau", use: "Veterinary immune support.", note: "The Kilifi vector protocol doses subjects with this before exposure. Every survivor of that trial was also dosed with this." },
    { code: "BS-160", name: "Pentex BioCarrier", div: "BS", site: "mau", use: "Microbial carrier for soil inoculation.", note: "The organism is engineered to prefer tissue already damaged. It is a delivery system with a grudge." },
    // Munitions — Anchorage
    { code: "MU-10", name: "AeroDyn 10 kinetic penetrator", div: "MU", site: "anc", use: "Bird control at airfield perimeters.", note: "Conducted with the ammunition removed. Two bird-control contracts have a second, unrecorded delivery schedule." },
    { code: "MU-22", name: "Hollow 22 shaped charge", div: "MU", site: "anc", use: "Industrial demolition of refractory material.", note: "Rim-fire, caseless, and sold to a civil contractor who has never had a demolition of that class of structure." },
    { code: "MU-35", name: "Ardent 35 incendiary unit", div: "MU", site: "anc", use: "Wildfire suppression by controlled ignition.", note: "The delivery is not tested at the ranges. The test cards exist; the results are filed under a different contract number." },
    { code: "MU-48", name: "Triage 48 trauma plate", div: "MU", site: "anc", use: "Ballistic plate for security personnel.", note: "Rated to a threat class the testing laboratory was not told was the actual one." },
    { code: "MU-60", name: "Redline 60 line charge", div: "MU", site: "anc", use: "Rapid fuel-break construction for wildfire.", note: "Ignition timing is computed to reach a target perimeter within a stated window. That perimeter has a survey number." },
    // AeroDyn — Anchorage
    { code: "AD-14", name: "Wing de-ice fluid AD-14", div: "AD", site: "anc", use: "Aircraft de-icing, type I fluid.", note: "Not approved for the wing positions it is applied to. Not approved for the routes it is approved for." },
    { code: "AD-27", name: "AD-27 composite spar", div: "AD", site: "anc", use: "Primary load-bearing spar, production.", note: "Fatigue life was credited from coupon tests at a temperature the wing never sees in service." },
    { code: "AD-33", name: "Anvil experimental airframe", div: "AD", site: "anc", use: "Unregistered research airframe, demonstrator.", note: "It is not a demonstrator. It is a platform, and the civil registry entry describes it as a demonstrator." },
    // AgriGen — Bogotá
    { code: "AG-07", name: "Vigor 07 growth regulator", div: "AG", site: "bog", use: "Yield uplift in managed palm.", note: "Shortens the pre-flowering interval. The genotype is the vendor's; the pre-flowering interval is ours." },
    { code: "AG-19", name: "Guard 19 continuous release", div: "AG", site: "bog", use: "Nursery-stage protection, slow release.", note: "The release curve is tuned to a rotation the agronomy team abandoned in 2019 and never told procurement about." },
    { code: "AG-24", name: "Triac 24 defoliator", div: "AG", site: "bog", use: "Pre-harvest defoliation.", note: "Legal at the registered rate. Applied to the plantation at four times the registered rate, with the harvest advanced eleven days." },
    { code: "AG-31", name: "AgriGen seed treatment AG-31", div: "AG", site: "bog", use: "Seed coating against seedling pests.", note: "Seedlings that survive the treatment germinate in soil with a documented contamination history." },
    // Arcane R&D — Manhattan
    { code: "AR-03", name: "Materials Compatibility Testing service", div: "AR", site: "nyc", use: "Third-party compatibility assessment for clients who need a certificate.", note: "Forty-one of the certificates issued since 1979 were issued to Pentex entities. There is no third party." },
    { code: "AR-09", name: "Isomer 9 resolvability assay", div: "AR", site: "nyc", use: "Determines whether a compound remains legible to biological systems.", note: "It measures whether the compound remembers being manufactured. The technical name is respectable. The finding is not." },
    { code: "AR-12", name: "Threshold 12 tracer", div: "AR", site: "nyc", use: "Inert tracer for pipeline integrity.", note: "It is inert toward steel. It is not inert toward people, and the field trials were not run on people." },
    { code: "AR-18", name: "Provenance 18 chain-of-title service", div: "AR", site: "nyc", use: "Establishes clean title to biological and mineral assets.", note: "Establishes clean title by writing the competing claim off. Two title disputes are resolved in the register this way." },
    { code: "AR-21", name: "Hearth 21 catalyst precursor", div: "AR", site: "nyc", use: "Precursor for industrial catalysis.", note: "Hearth is the trade name. The patent family calls it a vitrification aid and the inventors are not Pentex employees." },
    { code: "AR-25", name: "Corvid 25 lure base", div: "AR", site: "nyc", use: "Wildlife deterrent, non-lethal.", note: "It is not a deterrent. It is a Garou attractant, and the patent application was refused, so the compound is manufactured and never patented." },
    // Pentex Foundation — Geneva
    { code: "PF-01", name: "Community Water Assurance Grant", div: "PF", site: "hou", use: "Grant funding for community water infrastructure.", note: "Paid to the supplier of the tankered water. Four households, zero houses, and a monitoring report written by the grant recipient." },
    { code: "PF-04", name: "Stewardship Fellowship", div: "PF", site: "nyc", use: "Graduate placement with partner institutions.", note: "Twenty-two fellows placed with six institutions, four of which are Pentex. The fellowship has an internal reference and no public one." },
    { code: "PF-07", name: "Independent Assessment Fund", div: "PF", site: "cal", use: "Funds third-party assessment of industrial practice.", note: "The assessment framework was drafted by the assessor's employer. This is disclosed in appendix four of the award citation and nowhere else." },
  ];

  /* ----------------------------------------------------------------------
   * Patent estate.
   *
   * Granted patents are real filings in a real world. The `status` column is
   * where they stop being real.
   * -------------------------------------------------------------------- */
  const PATENTS = [
    { no: "US 4,318,882", title: "Process for the continuous thermal cracking of heavy bottoms", div: "PC", filed: "1981", status: "expired 1999", note: "The only genuinely useful thing Pentex ever invented. It made the company and it made no one else rich, which is why nobody remembers it." },
    { no: "US 5,110,442", title: "Delayed-release soil binding composition", div: "BS", filed: "1992", status: "granted", note: "Binds hydrocarbons to a carrier that carries them downward. The carrier was chosen because it is not retrieved by the monitoring regime." },
    { no: "US 5,447,019", title: "Vapour-suppressing flare composition", div: "PC", filed: "1995", status: "granted", note: "Suppresses visible plume. The visible plume is the only part of the release an inspector can see from the road." },
    { no: "US 6,014,733", title: "Method of inducing targeted dormancy in broadleaf stock", div: "AG", filed: "1999", status: "granted", note: "The tree does not die. It simply stops for two years and then dies of the drought that follows." },
    { no: "US 6,338,104", title: "Shape-stable hollow charge with caseless rimfire priming", div: "MU", filed: "2001", status: "granted", note: "Shaped for concrete. Concrete does not care about shape; the liner does. The liner is tuned for a different medium entirely." },
    { no: "US 6,912,880", title: "Composite spar with credited fatigue life", div: "AD", filed: "2004", status: "granted", note: "The patent claims the calculation method. The calculation is the defect." },
    { no: "US 7,204,116", title: "Isomer resolvability assay for synthetic compounds", div: "AR", filed: "2007", status: "granted", note: "Filed under the materials-compatibility umbrella. It is not a materials assay and the classification was chosen on purpose." },
    { no: "US 7,559,290", title: "Biological carrier with lesion preference", div: "BS", filed: "2009", status: "granted", note: "The preference is stated plainly in the specification. The specification was never public because the application was withdrawn." },
    { no: "US 8,004,655", title: "Firebreak charge with computed ignition front", div: "MU", filed: "2010", status: "granted", note: "A perimeter, a rate, and a window. The perimeter is drawn around a plantation and the window is when nobody is measuring." },
    { no: "US 8,318,470", title: "Coordinated release of two agents for selectivity by tissue state", div: "AR", filed: "2011", status: "granted", note: "Two agents, one of which only activates inside a body that has already been opened to a specific receptor. This is a delivery patent that reads as a weapon patent." },
    { no: "US 8,647,702", title: "Continuous-release agricultural composition with non-standard curve", div: "AG", filed: "2013", status: "granted", note: "Protects a release curve that exceeds label rate in the field and under-reports in the lab." },
    { no: "US 9,045,388", title: "De-ice fluid for unapproved wing positions", div: "AD", filed: "2015", status: "granted", note: "The claims describe an application the type certificate does not permit. This is not an accident of drafting." },
    { no: "US 9,402,115", title: "Chain-of-title resolution by competing-claim extinguishment", div: "AR", filed: "2016", status: "granted", note: "A method of establishing title. Also a method of establishing that anyone who disagreed no longer has standing to disagree." },
    { no: "US 9,777,204", title: "Traceless pressure-difference biomarker panel", div: "BS", filed: "2017", status: "granted", note: "Detects nothing. It is specified so that the absence of a reading can be reported as a negative result." },
    { no: "US 10,023,881", title: "Distributed heat-destabilisation of a standing crop", div: "MU", filed: "2018", status: "granted", note: "Applies to standing crop. The specification uses the word vegetation throughout and never the word crop." },
    { no: "US 10,314,552", title: "Vitrification aid for silicate lattices", div: "AR", filed: "2019", status: "granted", note: "The inventors are named in a footnote and are not employees. The work was done in a building they were not permitted to enter." },
    { no: "US 10,652,014", title: "Mammalian response to non-denatured allergen analogue", div: "BS", filed: "2020", status: "granted", note: "Non-denatured. The subject's own immune history is the denaturing agent." },
    { no: "US 11,011,447", title: "Perimeter integrity scoring for buried utilities", div: "PC", filed: "2020", status: "granted", note: "Scores the wall, not the contents. The method is sound. The sampling is not." },
    { no: "EP 3 884 210", title: "Anthropogenic fertility of degraded substrate", div: "AG", filed: "2021", status: "granted", note: "Calgary plot 6 in the priority examples. The cultivar germinates in Pentex-poisoned substrate and in nothing else, which the examples quietly prove." },
    { no: "EP 4 011 863", title: "Selective lethality against a defined physiological state", div: "AR", filed: "2022", status: "granted", note: "The state is Sixth Degree. The claim does not name the state. The examiner accepted it and should not have." },
    { no: "US 11,404,318", title: "Distributed fire initiation across a surveyed perimeter", div: "MU", filed: "2023", status: "pending", note: "Pending, which means the specification is publicly readable. This is the reason the perimeter coordinates were moved." },
    { no: "US 11,588,004", title: "Corvid-selective attractant base", div: "AR", filed: "2023", status: "refused", note: "Refused on obviousness over a cited Garou publication. The compound is manufactured regardless, and the refusal is filed here because it is the only public trace." },
    { no: "US 11,702,775", title: "Assay for the persistence of a compound in manufactured goods", div: "AR", filed: "2023", status: "pending", note: "Nobody has measured whether it persists. This assay is the reason that remains true." },
    { no: "WO 2024/011882", title: "Cascade scrub of a terrestrial grid to mineral substrate", div: "BS", filed: "2024", status: "published", note: "Published because the international search examiner required an enabling description. The enabling description is the crime." },
    { no: "WO 2024/044190", title: "Population-scale passive conditioning protocol", div: "AR", filed: "2024", status: "published", note: "Passive conditioning of a population. Eleven subjects are named in the safety appendix. Four died." },
  ];

  /* ----------------------------------------------------------------------
   * Practitioners. Not staff — Pentex contracts them.
   * -------------------------------------------------------------------- */
  const MAGI = [
    { name: "Miriam Achterberg", discipline: "Bound", city: "nyc", note: "Pentex Head of Corporate Security. Bound since 1988 and has never said so. She is the most dangerous person in this file and she does not know she is in it." },
    { name: "Konstantin Vhalen", discipline: "Euthanatos", city: "nyc", note: "Chief Arcane Officer. Convinced the Rite is a logistics problem. Has never been to Manhattan at night." },
    { name: "Emrys Vaughan-Doherty", discipline: "Fortean", city: "lhr", note: "Consulted four times, invoiced six times. Two invoices are for work he says he did not do." },
    { name: "Ilse Brandt", discipline: "Auspex-adjacent", city: "nov", note: "Pentex veterinarian, Sixth Degree, and the only person in the Kilifi file who is not a killer by training." },
    { name: "Sister Anneke Okonjo", discipline: "Charm", city: "gen", note: "Runs the Foundation. Has charmed three sovereigns and one of them was a Pentex board member." },
    { name: "Yusuf Bayram", discipline: "Molecular", city: "hou", note: "Site security lead, no practitioner training, enormous competence. He is the one who photographs what he is told not to photograph." },
    { name: "Petra Ilves", discipline: "None", city: "nyc", note: "Group Archivist. Not a practitioner. Her whole function is that she is not one, and it is not working." },
    { name: "Dagobert Frei", discipline: "Euthanatos", city: "zur", note: "Retained through a Liechtenstein shelf company. Nineteen contracts. All of them are deaths and all of them are described as maintenance." },
    { name: "Rosalind Achebe", discipline: "Mind", city: "lag", note: "Consulted on PALIMPSEST. Told the committee the protocol was a violation, was thanked, and was paid anyway." },
    { name: "Ilya Baranov", discipline: "Entropy", city: "nov", note: "Refused two contracts and accepted a third for a different division without telling either." },
    { name: "Cormac Duny", discipline: "Auspex", city: "cal", note: "Reads the site, does not like it, files a quarterly report that says nothing, and is the only external assessor still employed." },
    { name: "Beatriz Antunes-Vale", discipline: "Unknown", city: "hou", note: "Chief Compliance Officer. Her discipline is not listed because she has never declared one, and the file contains a note that says never ask twice." },
    { name: "Hjalmar Sandvik", discipline: "None", city: "anc", note: "Svalbard warehouse. Sees a great deal and reports a little and has never been asked about the discrepancy." },
    { name: "Ottoline Roux", discipline: "Charm", city: "sin", note: "CAULDRON distribution went through her hands. She believes the units are agricultural concentrate." },
    { name: "Georgi Petran", discipline: "Molecular", city: "mau", note: "Ran the CARRION sampling. Concluded the water was the problem. The water was the messenger." },
    { name: "Wren Ashgrove", discipline: "None", city: "nyc", note: "Pentex does not employ Wren Ashgrove. Wren Ashgrove has been in four Pentex buildings. The badge log says so." },
  ];

  /* ----------------------------------------------------------------------
   * Garou. Breed, city, and stance. `stance` is Pentex's own working
   * classification and it is wrong about at least two of them.
   * -------------------------------------------------------------------- */
  const GAROU = [
    { name: "Ironhide Volkov", breed: "Ulvfenr", city: "nov", stance: "enemy", note: "Has killed four Pentex biologists. Three of them were mid-shift, and the internal reports describe all four as accidents." },
    { name: "Asha Brightmane", breed: "Ailaigh", city: "nai", stance: "ally", note: "Signed the Kilifi access agreement believing CHOIR was a vector programme. She has not been told what CHOIR is, and she is owed an answer." },
    { name: "Corvid Marrow", breed: "Fianna", city: "cal", note: "Fought at Calgary over the land. Pentex has never declared him a person of interest. Two other directors have." },
    { name: "Teodor Ruskin", breed: "Rurithr", city: "anc", stance: "neutral", note: "Watches the Svalbard flow. He has been fed twice and both meals were real, which is unusual and has not changed his position." },
    { name: "Sable Nine", breed: "Vargr", city: "bog", stance: "enemy", note: "Followed a Triac 24 application crew. Three crew are missing. The crew list has been amended to two and the amendment is signed by nobody." },
    { name: "Halvard Ostrem", breed: "Galliard", city: "nai", stance: "ally", note: "Supplies Garou DNA to the Kilifi programme and believes it is a fertility study. It is not and he has asked twice." },
    { name: "Ravenna Kestrel", breed: "Fianna", city: "hou", stance: "enemy", note: "Shares a surname with Pentex's Rowan Kestrel and is not related. He has made sure everyone at Pentex knows that." },
    { name: "Oskar Lindqvist", breed: "Ulvfenr", city: "st", stance: "neutral", note: "Winter protocols. Pentex has never approached him. He has approached the Foundation, twice, by letter." },
    { name: "Delphine Aumont", breed: "Ailaigh", city: "lyo", stance: "unknown", note: "There is a file on her and the file is one line. The line is her name and a question mark." },
    { name: "Mikkel Sorn", breed: "Rurithr", city: "sin", stance: "enemy", note: "Traced CAULDRON distribution through Jurong to a shophouse in Geylang. Shophouse is empty. Sorn is not." },
    { name: "Yara Oyelaran", breed: "Fianna", city: "nyc", stance: "neutral", note: "Works two blocks from the tower and has walked into the lobby on four occasions, uninvited, and left without incident each time." },
    { name: "Emrys Cadogan", breed: "Vargr", city: "ken", stance: "enemy", note: "The Cota station. Drove the CORVETTE. Pentex has four independent photographs of the vehicle and no photograph of the driver." },
    { name: "Suvi Lindholm", breed: "Galliard", city: "hki", stance: "ally", note: "Filed the Blue Zone entry that stopped the Shenzhen shipment. Pentex settled. The settlement is in clause 7 and clause 7 is the problem." },
    { name: "Bartholomew Nzu", breed: "Ulvfenr", city: "nbo", stance: "neutral", note: "Was on the Ibara intake the night of the release. He has given one statement. It is in the archive as field_ops and it is the only one that is signed." },
    { name: "Constance Merrow", breed: "Ailaigh", city: "rio", stance: "unknown", note: "Appears in the Foundation's grant ledger as a beneficiary organisation. She is a person. The ledger says organisation." },
    { name: "Aurel Vasilyev", breed: "Rurithr", city: "sin", stance: "ally", note: "Signed a cease-fire, broke it, signed it again. The second signature is on a document dated before the first breach." },
    { name: "Wren-blackthorn", breed: "Vargr", city: "anc", stance: "enemy", note: "Name appears in the Anchorage night-raid dossier with no surname. The dossier notes that this is how he prefers it." },
    { name: "Perpetua Chime", breed: "Fianna", city: "mau", stance: "ally", note: "Shut down the Manaus clearing for one season. One season. The permit came through in eleven weeks." },
    { name: "Nikodem Sadowski", breed: "Ulvfenr", city: "cal", stance: "neutral", note: "Informed on plot 6. Sat through a two-hour briefing on the substrate assay and asked one question, which was about the fourth quadrant." },
    { name: "Halcyon Bright", breed: "Galliard", city: "nyc", stance: "ally", note: "Pentex's longest-standing external relationship. He has never asked what sub-level 4 is. Everyone who has asked has been described, in writing, as unsuitable." },
  ];

  /* ----------------------------------------------------------------------
   * Counterparties. The people and things that move money, product, or bodies.
   * -------------------------------------------------------------------- */
  const COUNTERPARTIES = [
    { name: "Vashti Freight & Charter", kind: "shipping", city: "sin", note: "Moves palletised product with a bill of lading that describes the pallets as agricultural samples. Fourteen shipments. The pallets do not exist in any inventory." },
    { name: "Aurora Stewardship Nominees", kind: "nominee", city: "kj", note: "Holds shares. Its directors are four names, one company, and a filing address that is a Pentex mail box." },
    { name: "The Rain Foundation", kind: "charity", city: "hk", note: "Registered as a disaster-relief charity. Audited by an institute whose judging framework the recipient helped write." },
    { name: "Castellane Metals", kind: "supplier", city: "ldn", note: "Supplies the ore that becomes Armageddon grade. Knows exactly what it becomes. The invoice says catalyst feedstock." },
    { name: "Ember & Sons", kind: "contractor", city: "hou", note: "Holds the Houston Air Permit. Held it since 1988. The Air Permit is forty-one pages and none of the forty-one pages describe a tank farm." },
    { name: "Kestrel Brothers", kind: "contractor", city: "nov", note: "Construction, Northern Corridor. Four crew on the Vector roster and one of them is not on the current roster and cannot be." },
    { name: "The Ruin Line", kind: "distribution", city: "sin", note: "Street-level distribution for CAULDRON. Nineteen names on the roster, ninety-four known non-participants, no removal mechanism." },
    { name: "Ninth Column", kind: "security", city: "nyc", note: "Corporate security supplement. Eleven contractors on standing orders to Disembark, who have never been told what Disembark means." },
    { name: "Marrow & Daughters", kind: "logistics", city: "kal", note: "River freight for the Manaus complex. Holds the landing permit for a concession the company has not been granted." },
    { name: "Silva Community Health Trust", kind: "nominee", city: "mau", note: "Partner of the Ibara settlement. Holds the tankered-water account. Its bank is in Shenzhen." },
    { name: "Institut für Industrielle Fürsorge", kind: "thinktank", city: "muc", note: "Issues the stewardship award. Funded by the recipient. Cited in award citations as an independent body." },
    { name: "Pacific Rim Biolabs", kind: "supplier", city: "hkg", note: "Sells reagents to Kilifi under a supply agreement. Does not know what the reagents are diluted into." },
    { name: "Hollowpoint Assurance", kind: "insurance", city: "ldn", note: "Underwrites the Hull programme. The mortality rider was drafted in 1998 for a plantation division and has never been re-underwritten." },
    { name: "Groundswell Survey", kind: "contractor", city: "bog", note: "Certifies clearing limits. Has certified limits exceeding the permit in four of the last five quarters." },
    { name: "Ferrovia", kind: "shipping", city: "vao", note: "Bulk carrier. Carries Armageddon grade. Its master signed a cargo declaration reading ore concentrate and did not query the tonnage." },
    { name: "Ashgrove Disposal", kind: "contractor", city: "cal", note: "Hazardous waste. The manifests describe quantities as being returned. The receiving site is the same site." },
    { name: "Chancellery", kind: "adversary", city: "usa", note: "Won the Cota injunction. Has the Blue Zone entry on file and knows the route. Has never used the information." },
    { name: "Saint-Ferrand", kind: "adversary", city: "gen", note: "Investigates Pentex. Has been given four documents by a person inside Pentex and does not know who." },
    { name: "Ostrich Grove", kind: "nominee", city: "vg", note: "Holds the BVI shelf company behind Dagobert Frei. The director is a director of Pentex Foundation." },
    { name: "Kaldbakur Shipping", kind: "shipping", city: "rey", note: "Reflagged mid-contract. The new flag state has never been asked about the cargo description." },
    { name: "Vance & Mbeki-Ng Holdings", kind: "nominee", city: "ldn", note: "Holds the family-trust share. Three of four trustees are directors. The fourth is a lawyer who has never attended a meeting." },
    { name: "Rhine Technical Services", kind: "contractor", city: "bas", note: "Certifies pressure integrity. Discontinued the certification because it could not be reproduced. Pentex continued the practice." },
    { name: "Corvid Field Supply", kind: "supplier", city: "anc", note: "Supplies the wildlife deterrent. The deterrent attracts Garou. The supplier is run by a Garou who has never been told." },
    { name: "Perihelion Clean Energy", kind: "adversary", city: "ldn", note: "Holds the Orbital lease and the ruined laboratory. It has not noticed the laboratory is ruined." },
    { name: "Zambezi Bend Trust", kind: "nominee", city: "lun", note: "Nominee for the Ibara compensation fund. Holds the fund. The fund pays the supplier." },
    { name: "Nodal Freight", kind: "shipping", city: "kj", note: "Transships between three sets of bills. Each set describes a different content for the same pallets." },
    { name: "Halcyon Bright Ltd", kind: "partner", city: "nyc", note: "Not a company. A Garou, incorporated, because the relationship needed an invoice and an address." },
    { name: "Deepwater Assay Services", kind: "contractor", city: "mau", note: "Certifies the CARRION water. The certificate reports values below the reporting limit. The reporting limit is set by the certificate." },
    { name: "Aurel Vasilyev Estate", kind: "nominee", city: "sin", note: "Formerly a Garou holding. Now a holding company. The transition is recorded in neither direction." },
    { name: "Sable Nine Trust", kind: "adversary", city: "bog", note: "Files at the Triac 24 rate. The rate is four times the label rate and the label is in the archive." },
  ];

  /* ----------------------------------------------------------------------
   * Directories the archive can grow into.
   * `desc` is what `ls` prints; `chunk` is the file the terminal lazy-loads.
   * -------------------------------------------------------------------- */
  /* A directory may have more than one chunk: the generated bulk and the
     hand-written material are separate files so the bulk can be regenerated
     without touching anything authored. CHUNKS lists them in load order. */
  const DIR_META = {
    "/patents": ["Patent estate and continuations", "patents"],
    "/products": ["Product catalogue and specifications", "products"],
    "/magi": ["External practitioners, retained", "magi"],
    "/garou": ["Garou watch — allies, enemies, unresolved", "garou"],
    "/counterparties": ["Shippers, nominees, contractors, adversaries", "counterparties"],
    "/finance": ["Ledgers, wires, and accounts", "finance"],
    "/clinical": ["Human and animal study files", "clinical"],
    "/r_and_d": ["Bench notebooks and research logs", "r_and_d"],
    "/security": ["Access logs, incidents, and standing orders", "security"],
    "/supply": ["Manifests, bills of lading, and custody", "supply"],
    "/real_estate": ["Land acquisition and title work", "real_estate"],
    "/regulatory": ["Filings, permits, and the evasion of both", "regulatory"],
    "/sublevel4": ["Standing Committee of Sublevel 4", "sublevel4"],
  };

  /* Hand-written chunks, keyed by directory. These are the documents that carry
     the story: they are authored rather than generated, so the generator never
     touches them and a regeneration cannot lose them. */
  const HAND_CHUNKS = {
    "/board": "board_hand",
    "/legal": "legal_hand",
    "/field_ops": "field_ops_hand",
    "/personnel": "personnel_hand",
    "/black_programs": "black_programs_hand",
    "/sublevel4": "sublevel4_hand",
    "/magi": "magi_hand",
    "/garou": "garou_hand",
    "/counterparties": "counterparties_hand",
    "/clinical": "clinical_hand",
    "/patents": "patents_hand",
    "/products": "products_hand",
    "/regulatory": "regulatory_hand",
    "/finance": "finance_hand",
    "/security": "security_hand",
    "/r_and_d": "r_and_d_hand",
    "/supply": "supply_hand",
    "/real_estate": "real_estate_hand",
    "/press": "press_hand",
  };

  /* ----------------------------------------------------------------------
   * FS growth. A chunk script calls this once its documents are loaded.
   * -------------------------------------------------------------------- */
  function fsEntry(f) {
    const dir = f.path.slice(0, f.path.lastIndexOf("/")) || "/";
    return {
      name: f.path.slice(f.path.lastIndexOf("/") + 1),
      id: f.id,
      size: f.size || (f.enc ? 4100 + (f.id.length * 811) % 9000 : 8000 + (f.id.charCodeAt(0) * 137) % 24000),
      date: f.date,
      enc: f.enc || null,
      cls: f.tags && f.tags.indexOf("press") > -1 ? "PUBLIC" : "RESTRICTED",
      fmt: f.fmt || (/\.csv$/.test(f.path) ? "csv" : "txt"),
    };
  }

  function byName(a, b) {
    return a.name < b.name ? -1 : 1;
  }

  P.REGISTER = function (dir, files) {
    const meta = DIR_META[dir];
    // /board, /personnel and /black_programs already exist from data.js and so
    // have no entry in DIR_META. They are still valid targets: a chunk may add
    // documents to a directory that ships with the spine.
    const known = meta || P.ARCHIVE.dirs[dir] || P.FS[dir];
    if (!known) return false;
    if (!P.ARCHIVE.dirs[dir]) P.ARCHIVE.dirs[dir] = meta[0];
    if (!P.FS[dir]) P.FS[dir] = [];
    files.forEach(function (f) {
      P.byId[f.id] = f;
      P.byName[f.path.slice(f.path.lastIndexOf("/") + 1)] = f;
      P.ARCHIVE.files.push(f);
      P.FS[dir].push(fsEntry(f));
    });
    P.FS[dir].sort(byName);
    if (meta) P.dirsKnown[dir] = meta[1];
    P.TOTAL += files.length;
    return true;
  };

  P.PRODUCTS = PRODUCTS;
  P.PATENTS = PATENTS;
  P.MAGI = MAGI;
  P.GAROU = GAROU;
  P.COUNTERPARTIES = COUNTERPARTIES;
  P.DIR_META = DIR_META;
  P.handChunks = HAND_CHUNKS;
  P.fsEntry = fsEntry;

  /* dirsKnown is the store index: every directory that exists, whether or not its
   documents have been loaded yet. The terminal reads this to decide what to offer
   in `ls`, and to know whether a directory needs a chunk fetched. */
const BASE_DIRS = {
  "/": "",
  "/board": "board",
  "/black_programs": "black_programs",
  "/field_ops": "",
  "/legal": "",
  "/personnel": "personnel",
  "/press": "",
};

P.augment = function () {
    P.byId = P.byId || {};
    P.byName = P.byName || {};
    if (!P.dirsKnown) {
      P.dirsKnown = {};
      Object.keys(BASE_DIRS).forEach((d) => {
        P.dirsKnown[d] = BASE_DIRS[d];
      });
      Object.keys(DIR_META).forEach((d) => {
        P.dirsKnown[d] = DIR_META[d][1];
        if (!P.ARCHIVE.dirs[d]) P.ARCHIVE.dirs[d] = DIR_META[d][0];
      });
    }
    P.TOTAL = P.ARCHIVE.files.length;
    P.ARCHIVE.files.forEach(function (f) {
      P.byId[f.id] = f;
      P.byName[f.path.slice(f.path.lastIndexOf("/") + 1)] = f;
    });
  };
  P.augment();
})(window.PENTEX);