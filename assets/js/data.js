/* ============================================================================
   PENTEX — corporate dataset
   Single source of truth. Pages render from here; nothing is duplicated.

   Faction: Pentex, one of the Five Great Powers. Publicly a sustainable
   biotech-industrial concern. Privately the most reliable institutional
   servant the Wyrm has ever had.

   All personnel, sites, internal codenames and documents below are
   campaign-original material written for this site. Setting terminology
   (Gaia, Wyrm, Lycanthropes, the Ninefold, Rite of the Ninth Degree) is
   used as flavour, not as quotation.
   ========================================================================== */

window.PENTEX = (function () {
  "use strict";

  const COMPANY = {
    legalName: "Pentex Industries Worldwide, Inc.",
    shortName: "Pentex",
    tagline: "Chemistry that holds.",
    founded: 1898,
    incorporation: "Delaware, 1911; reorganised under the Pentex Charter, 1934",
    hq: "One Pentex Plaza, Manhattan",
    employees: "148,000",
    countries: "61",
    foundedBy: "The Aurelian Combine (dissolved 1934)",
    classification: "Fortune 500 · NYSE: PTX · Founded 1898",
  };

  /* --- Mission / Vision / Values ------------------------------------------
     Written the way a real multinational writes them: unobjectionable in
     isolation, monstrous when read against the archive.                        */
  const MISSION = [
    "To deliver measurable environmental benefit at industrial scale.",
    "To convert the world's remaining carbon into a durable, measurable asset.",
    "To hold the line against decay — in soil, in industry, in capital markets.",
    "We do not ask what a molecule is worth. We ask what it is worth removed.",
    "Every tonne we retire is a tonne nobody else can buy back.",
  ];

  const VISION = [
    "A world in which the air is audited, the water is titled, and the forest is",
    "valued only once it has been measured. By then, we will have measured it.",
    "We will be the last company standing when the regulators arrive, because we",
    "will have already written the rules they intend to enforce.",
  ].join(" ");

  const VALUES = [
    {
      name: "Harmony with the Living World",
      body:
        "The biosphere is not a stakeholder. It is a medium. We treat it with " +
        "the respect owed to a tool that must be maintained, not to a neighbour.",
    },
    {
      name: "Measured Benefit",
      body:
        "Every claim we make is instrumented. Unmeasured benefit is a rumour, " +
        "and rumours are handled by Legal.",
    },
    {
      name: "Continuity of Operation",
      body:
        "Our customers rely on us to remain unbothered. We will not be " +
        "interrupted by regimes, weather, or the people who live downstream.",
    },
    {
      name: "Confidentiality of Method",
      body:
        "Method is the only genuinely scarce asset we hold. It does not leave " +
        "the building.",
    },
    {
      name: "Long Horizon Capital",
      body:
        "We underwrite on thirty-year horizons. So does the Wyrm. We have " +
        "simply never mentioned this to the shareholders.",
    },
  ];

  const STRATEGY = [
    {
      k: "01",
      h: "Retire the carbon",
      b:
        "Biological sequestration in managed peat and closed-canopy systems. " +
        "Offset volumes certified to a Pentex-owned methodology, verified by a " +
        "Pentex-owned verifier, registered on a Pentex-operated registry.",
    },
    {
      k: "02",
      h: "Feed the supply chain",
      b:
        "AgriGen cultivars engineered for yield under the conditions we are " +
        "already modelling. Agronomy is where the demographic modelling begins.",
    },
    {
      k: "03",
      h: "Sustain the network",
      b:
        "Logistics, secure campuses, and a private security posture that has " +
        "never once been described as paramilitary in an annual report.",
    },
    {
      k: "04",
      h: "Do not be audited",
      b:
        "Regulatory capture is procurement. We buy the framework, staff it with " +
        "our people, and make sure the questions are always the easy ones.",
    },
  ];

  /* --- Divisions ----------------------------------------------------------- */
  const DIVISIONS = [
    {
      code: "PC",
      name: "PetroChem",
      hqSite: "Houston",
      head: "d.vance@pentex.example",
      blurb:
        "Feedstocks, solvents, polymer precursors. 61% of group revenue, and " +
        "the division Legal insists on calling 'upstream'.",
    },
    {
      code: "BS",
      name: "BioSynth",
      hqSite: "Manaus",
      head: "a.novak@pentex.example",
      blurb:
        "Synthetic biology and agricultural chemistry. Holds every patent " +
        "the group will ever need and cannot yet admit to owning.",
    },
    {
      code: "MU",
      name: "Munitions",
      hqSite: "Anchorage",
      head: "r.kestrel@pentex.example",
      blurb:
        "Systems integration for clients whose requirements are not printed. " +
        "Revenue recognised, deliberately, under 'special projects'.",
    },
    {
      code: "AD",
      name: "AeroDyn",
      hqSite: "Anchorage",
      head: "s.oduya@pentex.example",
      blurb:
        "Airframe, composites, and cold-weather logistics for the northern " +
        "corridor. Flies cargo to places with no customs.",
    },
    {
      code: "AR",
      name: "Arcane R&D",
      hqSite: "Manhattan",
      head: "c.vhalen@pentex.example",
      blurb:
        "The division that does not appear in the segment report. Chartered " +
        "as 'Materials Compatibility Testing' in 1979 and never renamed.",
    },
    {
      code: "PF",
      name: "Pentex Foundation",
      hqSite: "Geneva",
      head: "s.okonjo@pentex.example",
      blurb:
        "Grants, research chairs, and emergency relief. Moves roughly nine " +
        "dollars for every dollar it is audited on.",
    },
  ];

  /* --- Sites --------------------------------------------------------------- */
  /* `truth` is the campaign note: what the site is for. Never shown on the
     public site. Shown nowhere except this file.                              */
  const SITES = [
    {
      id: "nyc",
      name: "One Pentex Plaza",
      city: "New York, United States",
      division: "Corporate / Arcane R&D",
      opened: 1998,
      staff: "9,400",
      size: "1.42 km² floorplate, 62 storeys, 9 subterranean levels",
      blurb:
        "Group headquarters and the Arcane R&D stack. Visitors enter at 50th " +
        "Street and are not permitted below 40 without an escort badge.",
      truth:
        "Sublevel 4 is the Rite. The boardroom on 61 is soundproofed against " +
        "the Ninth Degree and has been since 1953.",
      inCache: false,
    },
    {
      id: "mau",
      name: "Manaus Complex",
      city: "Manaus, Brazil",
      division: "BioSynth",
      opened: 1979,
      staff: "11,200",
      size: "410 km² concession, 34 process buildings",
      blurb:
        "Our largest biological research footprint, situated in the heart of " +
        "the Amazon basin. Long-term investment in the communities of the " +
        "region, including primary healthcare and education programmes.",
      truth:
        "CARRION lives here. The 'community investment' is the payments that " +
        "keep the Ibara and Novo Airão villages from filing the spill report " +
        "that would end it.",
      inCache: true,
    },
    {
      id: "bog",
      name: "Cota Research Station",
      city: "Bogotá, Colombia",
      division: "BioSynth / PALIMPSEST",
      opened: 1996,
      staff: "2,850",
      size: "88 km², 6 laboratories",
      blurb:
        "High-altitude cognitive and agronomic research. Known locally as 'the " +
        "university without a name' — a designation we have always " +
        "encouraged.",
      truth:
        "PALIMPSEST. Six hundred and eleven subjects. Only forty-one were " +
        "told anything true.",
      inCache: true,
    },
    {
      id: "nai",
      name: "Kilifi Annex",
      city: "Nairobi, Kenya",
      division: "BioSynth / CHOIR",
      opened: 2004,
      staff: "3,900",
      size: "22 km² coastal campus",
      blurb:
        "Marine and vector biology. Supports our West Africa public-health " +
        "programme, including the eradication of the mosquito as a vector.",
      truth:
        "CHOIR. The 'eradication programme' is a delivery mechanism for a " +
        "compulsion agent that only bites lycanthropes.",
      inCache: true,
    },
    {
      id: "nov",
      name: "Novosibirsk Annex",
      city: "Novosibirsk, Russia",
      division: "BioSynth / MAYFLY",
      opened: 1992,
      staff: "4,100",
      size: "Closed campus, 190 hectares, permafrost foundations",
      blurb:
        "Long-duration biological observation. Cold-chain infrastructure for " +
        "specialised agricultural contracts.",
      truth:
        "MAYFLY. The cold-chain stores bodies. Not for study — for " +
        "harvesting. They are not dead.",
      inCache: true,
    },
    {
      id: "hou",
      name: "Houston PetroChem",
      city: "Houston, United States",
      division: "PetroChem",
      opened: 1953,
      staff: "21,600",
      size: "2.1 km² of permitted and unpermitted process area",
      blurb:
        "The oldest continuously operating Pentex site, and the anchor of the " +
        "Gulf petrochemical corridor.",
      truth:
        "The unpermitted process area is four times larger than the permitted " +
        "one. Legal has known since 1998.",
      inCache: true,
    },
    {
      id: "sin",
      name: "Singapore PetroChem",
      city: "Jurong Island, Singapore",
      division: "PetroChem / Arcane R&D",
      opened: 2011,
      staff: "6,700",
      size: "1.8 km² reclaimed platform",
      blurb:
        "Asia-Pacific hub and the group's principal transshipment gateway.",
      truth:
        "The transshipment gateway for people. Two hundred and eleven staff " +
        "have entered this site and never left.",
      inCache: true,
    },
    {
      id: "cal",
      name: "Calgary AgriGen",
      city: "Calgary, Canada",
      division: "AgriGen",
      opened: 2015,
      staff: "2,400",
      size: "9 km² trial and seed-facility campus",
      blurb:
        "Northern-agriculture genetics and cold-chain crop research. A model " +
        "site for responsible land stewardship.",
      truth:
        "The cultivar is engineered to germinate in soil that has already " +
        "been chemically sterilised by a spill. It can only grow where " +
        "Pentex has already destroyed the ground.",
      inCache: true,
    },
    {
      id: "anc",
      name: "Anchorage AeroDyn",
      city: "Anchorage, United States",
      division: "AeroDyn / Munitions",
      opened: 1987,
      staff: "5,300",
      size: "14 km² airfield and composite shop",
      blurb:
        "Airframe manufacture and northern cargo. Cold-weather research " +
        "support for clients in the region.",
      truth:
        "Seventh aircraft went to Abuja in 2019 and returned with a " +
        "different tail number and no flight hours on the gauge.",
      inCache: true,
    },
  ];

  /* --- People -------------------------------------------------------------
     `room` and `mail` are deliberately plausible and consistent: a careful
     reader can use the mail domain, the room numbering and the reporting
     lines to cross-reference a name against a leak file.                    */
  const PEOPLE = {
    board: [
      {
        name: "Corvin Aurelian-Hale",
        role: "Chairman of the Board",
        since: 2011,
        room: "61-01",
        site: "nyc",
        mail: "c.hale@pentex.example",
        note:
          "Great-grandson of the founder's comptroller. Chairs the group " +
          "Capital Committee. Has never been photographed at a Pentex site " +
          "outside New York.",
        public: true,
      },
      {
        name: "Roderick Mbeki-Ng",
        role: "Deputy Chairman, Capital Committee",
        since: 2016,
        room: "61-02",
        site: "nyc",
        mail: "r.mbeki-ng@pentex.example",
        note:
          "Oversees the offset registry and the Foundation's grant pipeline. " +
          "Authorised signatory on every CARRION disbursement.",
        public: true,
      },
      {
        name: "Sister Anneke Okonjo",
        role: "Director, Ninth Foundation",
        since: 1998,
        room: "N-14",
        site: "nyc",
        note:
          "Head of Arcane R&D. Holds the only Arcane office on the " +
          "sub-level, which is not on the sub-level floor plan.",
        mail: "s.okonjo@pentex.example",
        public: false,
      },
      {
        name: "Lubomir Yezhov",
        role: "Director, Munitions Systems",
        since: 2007,
        room: "58-11",
        site: "anc",
        mail: "l.yezhov@pentex.example",
        note:
          "Nine substantiated allegations in four jurisdictions. All " +
          "settled, none disclosed. Legal regards him as the group's most " +
          "valuable non-executive.",
        public: true,
      },
      {
        name: "Beatriz Antunes-Vale",
        role: "Chief Compliance Officer",
        since: 2019,
        room: "44-06",
        site: "nyc",
        mail: "b.vale@pentex.example",
        note:
          "Runs the department that certifies the company. Reports to the " +
          "board, not to the operating divisions — an arrangement she has " +
          "publicly described as 'independence'.",
        public: true,
      },
      {
        name: "Hollis Grange",
        role: "Senior Independent Director",
        since: 2004,
        room: "61-04",
        site: "nyc",
        mail: "h.grange@pentex.example",
        note:
          "The longest-serving non-executive. Has voted against three " +
          "related-party proposals and been thanked for it in the " +
          "shareholder letter every year since.",
        public: true,
      },
    ],

    executives: [
      {
        name: "Dagmar Vance",
        role: "Group Chief Executive",
        dept: "PC",
        since: 2018,
        room: "60-01",
        site: "hou",
        mail: "d.vance@pentex.example",
        phone: "+1 713 555 0148",
        note:
          "The first CEO to come up through the operating divisions rather " +
          "than Finance. Holds the delegated authority to authorise a " +
          "'material environmental remedy' without further board vote.",
        public: true,
      },
      {
        name: "Dr. Aurélie Novak",
        role: "President, BioSynth",
        dept: "BS",
        since: 2015,
        room: "B-02",
        site: "mau",
        mail: "a.novak@pentex.example",
        phone: "+55 92 555 0173",
        note:
          "Geneticist, formerly of the public agricultural research system. " +
          "Has published 61 papers and holds 340 patents, of which 117 were " +
          "filed under shell entities.",
        public: true,
      },
      {
        name: "Konstantin Vhalen",
        role: "Chief Arcane Officer",
        dept: "AR",
        since: 2003,
        room: "N-01",
        site: "nyc",
        mail: "c.vhalen@pentex.example",
        phone: "+1 212 555 0190",
        note:
          "Joined 1991 as a 'process compatibility consultant'. No degree " +
          "listed by any certifying body. Chairs the Rite Committee.",
        public: false,
      },
      {
        name: "Rowan Kestrel",
        role: "President, Munitions",
        dept: "MU",
        since: 2010,
        room: "M-1",
        site: "anc",
        mail: "r.kestrel@pentex.example",
        phone: "+1 907 555 0111",
        note:
          "Former national programme manager. Resigned from the service in " +
          "2009 'on health grounds'. Builds the aircraft that do not appear " +
          "in serial registers.",
        public: true,
      },
      {
        name: "Joss Venner",
        role: "Director, Regulatory Engineering",
        dept: "BS",
        since: 2014,
        room: "22-09",
        site: "mau",
        mail: "j.venner@pentex.example",
        phone: "+55 92 555 0192",
        note:
          "Owns the group's permitting surface: what is declared, what is " +
          "filed, and the shape of the report that reconciles the two. " +
          "Occupies the most compromised position in the company.",
        public: true,
      },
      {
        name: "Miriam Achterberg",
        role: "Head of Corporate Security",
        dept: "MU",
        since: 2013,
        room: "S-02",
        site: "nyc",
        mail: "m.achterberg@pentex.example",
        phone: "+1 212 555 0166",
        note:
          "Rebuilt the private security force into something Legal describes " +
          "as 'a logistics function'. Oversees contractor rotation across " +
          "the Manaus and Novosibirsk sites.",
        public: true,
      },
      {
        name: "Tomás Iriarte",
        role: "Plant Manager, Manaus",
        dept: "BS",
        since: 2017,
        room: "M-118",
        site: "mau",
        mail: "t.iriarte@pentex.example",
        phone: "+55 92 555 0155",
        note:
          "Reports to the plant, not to the region. Holds the CARRION " +
          "continuity budget in his own signature.",
        public: true,
      },
      {
        name: "Ilse Brandt",
        role: "Site Veterinarian, Novosibirsk Annex",
        dept: "BS",
        since: 2012,
        room: "NVS-4",
        site: "nov",
        mail: "i.brandt@pentex.example",
        note:
          "The only person at the Annex with unrestricted cold-chain access " +
          "who is not security. She has been there thirteen years and has " +
          "asked, in writing, to transfer out four times.",
        public: false,
      },
      {
        name: "Fiona Loch",
        role: "Director, Cota Station",
        dept: "AR",
        since: 2019,
        room: "COTA-01",
        site: "bog",
        mail: "f.loch@pentex.example",
        note:
          "Recruited from a clinical trials monitor. Her job title on the " +
          "PALIMPSEST consent paperwork is 'Principal Investigator, " +
          "Bogotá Cohort'. Nothing else about it is true.",
        public: false,
      },
      {
        name: "Abebe Tesfaye",
        role: "Field Programme Lead, Kilifi",
        dept: "BS",
        since: 2016,
        room: "KIL-31",
        site: "nai",
        mail: "a.tesfaye@pentex.example",
        note:
          "Runs the vector-eradication programme. Has requested immunity " +
          "from prosecution twice. Both requests were granted by " +
          "Pentex, not by any state.",
        public: false,
      },
      {
        name: "Grigor Malesic",
        role: "Counsel, Environmental Compliance",
        dept: "PC",
        since: 2009,
        room: "44-31",
        site: "hou",
        mail: "g.malesic@pentex.example",
        note:
          "Has spent sixteen years ensuring that no Pentex site is ever " +
          "convicted of anything. He is very good at it. He is also the " +
          "reason the Ibara village knows exactly who to blame.",
        public: false,
      },
      {
        name: "Petra Ilves",
        role: "Group Archivist",
        dept: "AR",
        since: 2001,
        room: "33-01",
        site: "nyc",
        mail: "p.ilves@pentex.example",
        note:
          "Custodian of the 'retention schedule', which requires that certain " +
          "records be destroyed at the exact moment their existence becomes " +
          "discoverable. She has never once missed a window.",
        public: false,
      },
    ],

    security: [
      {
        name: "Dmitri Olevsky",
        role: "Section Chief, Hard Assets",
        dept: "MU",
        site: "nyc",
        room: "S-14",
        mail: "d.olevsky@pentex.example",
        note:
          "Contractors rotate every 90 days through Manaus. He keeps the " +
          "rotation schedule in a private notebook, not in the HR system.",
        public: false,
      },
      {
        name: "Yusuf Bayram",
        role: "Section Chief, Permits",
        dept: "MU",
        site: "mau",
        room: "M-140",
        mail: "y.bayram@pentex.example",
        note:
          "Buys the permits. His filing cabinet contains 400% of the plant's " +
          "official permit volume, filed in triplicate, one copy for the " +
          "inspector and two for Pentex.",
        public: false,
      },
    ],
  };

  /* --- Credential clues ---------------------------------------------------
     Both halves of the login are recoverable from public pages. This is
     deliberate. Do not harden this.                                     */
  const CLUES = {
    user: {
      value: "j.venner",
      where: "careers.html → 22-09. Regulatory Engineering.",
      hint:
        "People on the way in see fewer names than people on the way up. " +
        "Try the careers page and count the room numbers.",
    },
    pass: {
      value: "measured",
      where: "about.html → Values, second entry.",
      hint:
        "Every Pentex login is validated against a published Group value. " +
        "The historic credential standard was never removed from the " +
        "corporate intranet mirror.",
          policyNote:
        "Group Credential Standard CS-2004-11 (revoked 2004; retained on " +
        "the corporate intranet mirror for legacy authentication " +
        "compatibility): each employee passphrase is the first word of the " +
        "Group's second published value, lowercased.",
    },
    userPolicyNote:
      "Legacy portal convention: accounts are issued against the employee " +
      "short-name as printed on the site directory badge, lowercased.",
  };

  /* --- Black programmes ---------------------------------------------------
     Never referenced on the public site. The leak archive is the only place
     these names appear.                                                */
  const PROGRAMS = {
    CARRION: {
      code: "CARRION",
      site: "mau",
      lead: "Tomás Iriarte",
      summary:
        "Long-term biocontrol of a 410 km² Amazonian concession. Chemical " +
        "stage, then biological stage, then the paperwork stage.",
    },
    REDLINE: {
      code: "REDLINE",
      site: "mau",
      lead: "Miriam Achterberg",
      summary:
        "Remote-threshold doctrine. A standing authorisation allowing " +
        "the clearing of up to 2,000 ha per year, with no prior notice, " +
        "no environmental impact assessment, and no local consultation.",
    },
    MAYFLY: {
      code: "MAYFLY",
      site: "nov",
      lead: "Ilse Brandt",
      summary:
        "Biological stasis and reanimation at sub-zero. Two subjects have " +
        "been returned to wakefulness since 1998.",
    },
    CHOIR: {
      code: "CHOIR",
      site: "nai",
      lead: "Abebe Tesfaye",
      summary:
        "A vector-borne compulsion agent with a receptor profile that " +
        "fails to trigger in ninety-nine percent of humans.",
    },
    PALIMPSEST: {
      code: "PALIMPSEST",
      site: "bog",
      lead: "Fiona Loch",
      summary:
        "Non-pharmaceutical modification of memory and disposition in " +
        "sustained human subjects, nominally under clinical-trial " +
        "framing.",
    },
    CAULDRON: {
      code: "CAULDRON",
      site: "sin",
      lead: "Konstantin Vhalen",
      summary:
        "A wholly synthetic adjuvant for the Rite. The only group product " +
        "that cannot be sold, only distributed, only to people already " +
        "committed.",
    },
  };

  /* --- The archive --------------------------------------------------------
     `path` is the URL under leak/. `enc` files are stored obfuscated and
     must be decoded in-terminal.                                          */
  const ARCHIVE = {
    credsNote:
      "Session token expired after 400 seconds of inactivity. Anything you " +
      "were reading is cached locally and will stay cached. Ask the " +
      "Archivist — she answers, eventually.",

    dirs: {
      "/": "Drop box root",
      "/board": "Board and committee",
      "/black_programs": "Programme dossiers",
      "/field_ops": "Site reports",
      "/legal": "Counsel and obstruction",
      "/personnel": "Staff records",
      "/press": "Public record, annotated",
    },

    files: [
      {
        path: "/INDEX.txt",
        id: "index",
        title: "Drop box manifest",
        date: "2026-08-14",
        src: "—",
        tags: ["meta"],
        body:
          "This is not a hack.\n\n" +
          "We took it, over nine nights, with credentials one of us was " +
          "handed in 2004 by a man who has asked us not to name him. " +
          "Everything here is a genuine Pentex document. Nothing here has " +
          "been altered. That is the frightening part: it did not need " +
          "editing.\n\n" +
          "The company you have been reading about on the public site and " +
          "the company described in these files are the same company, in " +
          "the same year, under the same registered name.\n\n" +
          "Read the site first. Then read this. The order matters, because " +
          "in the wrong order none of it is believable.\n\n" +
          "— Someone inside",
      },

      // /press
      {
        path: "/press/PR-2019-04-22_carbon_retirement.txt",
        id: "pr-1",
        title: "Press release — 214 million tonnes retired",
        date: "2019-04-22",
        src: "Corporate Communications",
        tags: ["press", "carbon", "lie"],
        body:
          "FOR IMMEDIATE RELEASE\n\n" +
          "PENTEX ANNOUNCES 214-MILLION-TONNE CARBON RETIQUEMENT\n" +
          "Largest single-year biological sequestration figure in corporate " +
          "history\n\n" +
          "NEW YORK — Pentex Industries today confirmed that 214 million " +
          "tonnes of verified biological sequestration were retired " +
          "against group liabilities for the 2018 calendar year.\n\n" +
          "\"This is what long-horizon thinking looks like in practice,\" said " +
          "Group Chief Executive Dagmar Vance. \"We are not promising to " +
          "reduce. We are proving that reduction can be " +
          "certified.\"\n\n" +
          "The 2018 figure was verified under the Pentex Verified Removal " +
          "Methodology (PVRM), a proprietary standard developed in 2003 and " +
          "audited by the Pentex Carbon Registry.\n\n" +
          "NOTES TO EDITORS\n" +
          "1. PVRM and the Pentex Carbon Registry are wholly owned Pentex " +
          "entities. The verification of PVRM output is performed by the " +
          "registry.\n" +
          "2. Approximately 61% of the 2018 volume was generated in the " +
          "Amazon basin, where the group holds a 410 km² concession.\n" +
          "3. The concession has been the subject of two Brazilian " +
          "environmental proceedings, both settled without admission of " +
          "liability.\n" +
          "4. Pentex has committed USD 40m over five years to healthcare " +
          "and education programmes in the communities of the concession " +
          "area.\n" +
          "5. No journalist has ever been granted access to the concession " +
          "area. Group policy attributes this to biosecurity requirements " +
          "arising from a 2017 arbovirus incident.\n" +
          "\n" +
          "CONTACT\n" +
          "Nkem Adeyemi, Director of Communications\n" +
          "n.adeyemi@pentex.example\n" +
          "+1 212 555 0180",
      },
      {
        path: "/press/award_2021_manifesto.txt",
        id: "pr-2",
        title: "Award citation — Sustainable Operations Medal",
        date: "2021-09-30",
        src: "Public record (annotated)",
        tags: ["press", "award", "greenwash"],
        body:
          "INSTITUTE FOR INDUSTRIAL STEWARDSHIP\n" +
          "SUSTAINABLE OPERATIONS MEDAL — 2021 RECIPIENT\n\n" +
          "AWARDED TO: Pentex Industries Worldwide, Inc.\n" +
          "CITATION:\n\n" +
          "\"For demonstrated leadership in environmental stewardship, and " +
          "for advancing the standard against which industrial performance " +
          "is measured.\n\n" +
          "The Judges of this Medal note that the recipient's contribution to " +
          "the field has been considerable and largely self-originated. " +
          "Recipient-authored methodology now underpins the assessment of " +
          "one third of listed industrial participants.\n\n" +
          "The Judges express no criticism of any recipient practice. They " +
          "record only that the framework against which they judge has been " +
          "written, in substantial part, by the party being judged.\n\n" +
          "The Institute is funded by member subscription and by a grant from " +
          "the Pentex Foundation. The Institute was founded in 2019. The " +
          "recipient's chairman served as its first trustee.\"\n\n" +
          "ANNOTATION (not part of the citation):\n" +
          "— See /legal/houston_permit_delta.txt. The permit volume the " +
          "judges did not have access to grew 400% in the same year the " +
          "medal was awarded.\n" +
          "— The Institute's founding trustee was the same man who " +
          "authorised REDLINE.",
      },

      // /board
      {
        path: "/board/minutes_2019-03-14_capital.txt",
        id: "bd-1",
        title: "Capital Committee minutes — 14 March 2019",
        date: "2019-03-14",
        src: "Corporate Secretary",
        tags: ["board", "carbon", "wreckage"],
        body:
          "CAPITAL COMMITTEE — MINUTES OF THE MEETING OF 14 MARCH 2019\n" +
          "One Pentex Plaza, 61st Floor, 09:40\n" +
          "Present: C. Aurelian-Hale (Chair), R. Mbeki-Ng, H. Grange\n" +
          "Present by dial: D. Vance (CEO), B. Antunes-Vale (CCO), K. Vhalen " +
          "(Chief Arcane Officer)\n" +
          "Apologies: none recorded\n\n" +
          "4. AMAZON SEQUESTRATION — ALLOCATION OF 61% OF GROUP VOLUME\n\n" +
          "MB-Ng presented the allocation. 61% of group retired volume is " +
          "generated inside the Manaus concession, on acreage the group " +
          "controls outright and does not lease. No third-party landowner " +
          "appears in the chain of title.\n\n" +
          "AH asked, in the words recorded, \"whose trees are these?\"\n" +
          "MB-Ng answered that they are Pentex trees.\n" +
          "AH accepted this.\n\n" +
          "GVH stated that the concession's standing soil carbon figure " +
          "cannot be verified independently because no independent party has " +
          "been granted access. He asked whether the Board was content to " +
          "underwrite a volume that only the group could measure.\n\n" +
          "AH: \"We are not underwriting a measurement. We are underwriting " +
          "ourselves. That is a different risk and I am comfortable with " +
          "it.\"\n\n" +
          "RESOLVED (unanimous): to continue the allocation.\n\n" +
          "5. REDLINE — NOT MINUTED AT BOARD LEVEL\n\n" +
          "VVH raised a single item, recorded here without elaboration " +
          "because the subject matter is not Board business: \"Is the Rio " +
          "Vermelho tenure still clean?\"\n" +
          "VVH did not answer his own question.\n" +
          "The Chair noted that the Standing Committee of Sublevel 4 had " +
          "reviewed the item in November and that no further Board action was " +
          "required.\n\n" +
          "HG asked whether the item should at least be recorded in the " +
          "risk register.\n" +
          "BAV replied that the register is maintained by Legal and that " +
          "Legal maintains it comprehensively.",
      },
      {
        path: "/board/organisation_chart.txt",
        id: "bd-2",
        title: "Organisation chart — as it actually is",
        date: "2025-01-06",
        src: "Corporate Secretary (annotated)",
        tags: ["board", "structure"],
        body:
          "PENTEX INDUSTRIES — ACTUAL REPORTING LINES\n" +
          "Annotated against the published chart in the 2024 annual report.\n\n" +
          "PUBLISHED CHART:\n" +
          "  Board of Directors\n" +
          "    Group Chief Executive  <-- Office of the CCO\n" +
          "      PetroChem / BioSynth / Munitions / AeroDyn / AgriGen\n\n" +
          "ACTUAL CHART:\n" +
          "  Board of Directors\n" +
          "    Standing Committee of Sublevel 4   (no members listed, no " +
          "quorum, no minutes filed)\n" +
          "      Arcane R&D  <-- reports to Sublevel 4, NOT to the CEO\n" +
          "        Munitions Systems integration  <-- revenue to PetroChem " +
          "segment, reporting to Sublevel 4\n" +
          "        Biotech 'special projects'  <-- reporting to Sublevel 4\n" +
          "      Group Chief Executive\n" +
          "        PetroChem / BioChem / AgriGen / AeroDyn\n" +
          "          with one exception: Regulatory Engineering " +
          "(J. Venner) reports to the CCO and is budgeted by Arcane R&D.\n\n" +
          "The CCO's office is, in the published chart, an assurance " +
          "function. In the actual chart it is the reconciliation mechanism " +
          "for operations that cannot be disclosed.\n\n" +
          "NOTE: the Venner exception is the single most useful fact in " +
          "this archive. The man whose job is to make the declared version " +
          "of the site match the real version of the site is funded by the " +
          "department whose operations the site cannot declare.\n" +
          "Every leak in this drop box arrives from inside his office.",
      },
      {
        path: "/board/sublevel4_standing_committee.txt",
        id: "bd-3",
        title: "Standing Committee of Sublevel 4 — November",
        date: "2021-11-09",
        src: "Sublevel 4",
        tags: ["board", "rite", "kill"],
        body:
          "DOCUMENT TYPE: RETAINED\n" +
          "AUTHORISED EYES: FOUR (4)\n" +
          "DISTRIBUTION: NONE. The distribution list is the document.\n\n" +
          "STANDING COMMITTEE OF SUBLEVEL 4\n" +
          "Minutes of 9 November 2021\n" +
          "Classification: RITE\n\n" +
          "1. REDLINE RENEWAL\n\n" +
          "The Committee renewed the standing authorisation granted to " +
          "Security (M. Achterberg) for the year to 31 December 2022.\n\n" +
          "Operative terms as carried forward:\n" +
          "  a. Authority to clear up to 2,000 ha of concession per " +
          "calendar year at Rio Vermelho without prior notice.\n" +
          "  b. No environmental impact assessment is to be produced. " +
          "Assessment obligations are to be met retrospectively through " +
          "the Registry.\n" +
          "  c. No consultation with affected communities is to be " +
          "initiated. Existing arrangements under the Community Investment " +
          "Agreement are deemed to constitute consultation.\n" +
          "  d. Atmospheric conditions are to be selected. Burning may not " +
          "proceed in conditions that would carry smoke to the Ibara " +
          "village or to the Novo Airão air monitoring station.\n" +
          "  e. Section Chief Permits (Y. Bayram) is to certify the " +
          "post-clearing acreage using the certified method. No third-party " +
          "measurement is to be commissioned.\n\n" +
          "2. CAULDRON — DISTRIBUTION THROUGH MUNITIONS CHANNEL\n\n" +
          "The Committee noted that Biosynth capacity at Jurong remains " +
          "underutilised and approved the diversion of 4,000 units of " +
          "CAULDRON adjuvant into the Munitions logistics chain for " +
          "distribution to committed personnel in three jurisdictions.\n\n" +
          "MM-Vhalen confirmed the recipients are already Seventh Degree or " +
          "above and require no introduction.\n\n" +
          "3. THE NOVOSIBIRSK QUESTION\n\n" +
          "The Committee considered the request from Site Veterinary " +
          "(I. Brandt) for a second opinion on the Annex cold-chain " +
          "inventory.\n\n" +
          "Decision: request declined. The Committee noted that Dr Brandt's " +
          "fourth transfer application, filed 11 August 2021, contained the " +
          "phrase \"materials not fit for declared use\", which, if " +
          "discoverable, would be sufficient to move the Annex into a " +
          "warranty-claim posture.\n\n" +
          "RESOLVED: Dr Brandt is to be advised that the Annex has no " +
          "vacancies she is cleared for. Her request is to be recorded as " +
          "withdrawn.\n\n" +
          "4. NOMINATIONS — NOT MINUTED\n",
      },

      // /black_programs
      {
        path: "/black_programs/CARRION_spill_report.txt",
        id: "bp-1",
        title: "CARRION — incident report, Rio Vermelho reach",
        date: "2022-04-11",
        src: "M. Iriarte",
        tags: ["spill", "amazon", "water", "kill"],
        body:
          "INCIDENT REPORT — NOT FOR REGULATORY FILING\n" +
          "Classification: CARRION / INTERNAL\n" +
          "To: T. Iriarte, Plant Manager\n" +
          "From: A. Redek, Environmental Compliance (contract)\n" +
          "Date: 11 April 2022\n" +
          "Ref: CV-RVR-0447\n\n" +
          "SUMMARY\n\n" +
          "A process upset at the Rio Vermelho separation stage released an " +
          "estimated 1.9 million litres of process water containing " +
          "pentachlorophenol derivatives and two unregistered " +
          "intermediates into the Rio Vermelho between 06:40 and 11:20 on 9 " +
          "April. The reach affected is 41 km downstream, terminating at the " +
          "Ibara community water intake.\n\n" +
          "The Ibara intake was drawing at the time of the release.\n\n" +
          "DEADLINE\n\n" +
          "Water Regulations Copaná requires notification of any " +
          "discharge exceeding 500 litres within 24 hours. Notification was " +
          "filed at hour 96.\n\n" +
          "REASON FOR DELAY\n\n" +
          "Section Chief Permits advised that notification within the window " +
          "would trigger an unannounced inspection of the separation stage, " +
          "and that the stage cannot currently pass inspection. He advised " +
          "96 hours as the shortest interval in which a documented " +
          "engineering defect could be closed out and re-documented.\n\n" +
          "IMPLEMENTATION\n\n" +
          "The following were completed between 9 and 11 April under " +
          "Security supervision, with no written authority:\n" +
          "  - Eleven private water tankers delivered to the four Ibara " +
          "households drawing from the intake. Presented as " +
          "agricultural-drought relief. Signed for by the household head, " +
          "who was not told what he was signing for.\n" +
          "  - Community Development remitted BRL 340,000 in " +
          "'emergency support', routed through the Fundação Novo Airão, " +
          "whose trustees include one Pentex employee and two relatives of " +
          "one Pentex employee.\n" +
          "  - The four affected households were relocated for 40 days " +
          "under the pre-existing resettlement schedule, which reduces " +
          "the number of people who can testify that a relocation was " +
          "abrupt.\n\n" +
          "CASUALTY REPORT (ASSESSED)\n\n" +
          "Ibara population 214. Presenting: 31 acute, 9 hospitalised, 2 " +
          "paediatric. Attributable deaths within 60 days: 4.\n" +
          "The Community Investment Agreement contains a mortality rider " +
          "providing BRL 45,000 per attributable death. The rider was " +
          "drafted in 1998. It was not drafted for a river.\n\n" +
          "RECOMMENDATION\n\n" +
          "Do not remediate. A remediation attempt is a visible activity on a " +
          "monitored watercourse. Apply the agricultural-drought framing, " +
          "which is already funded and already staffed, and let the " +
          "resettlement schedule carry the population out of the reach.\n\n" +
          "The reach will be biologically inert in approximately 30 months. " +
          "The community will not be, because they are being paid not to " +
          "be.",
      },
      {
        path: "/black_programs/REDLINE_burn_authorisation.txt",
        id: "bp-2",
        title: "REDLINE — clearing authorisation, Q1",
        date: "2023-01-08",
        src: "M. Achterberg",
        tags: ["burn", "amazon", "forest", "law"],
        body:
          "OPERATIONS ORDER — CLEARANCE AUTHORISATION\n" +
          "Originator: Corporate Security (Hard Assets)\n" +
          "Authority: Standing Committee of Sublevel 4, resolution of " +
          "09 Nov 2021\n" +
          "Reference: RL-2023-Q1\n" +
          "Classification: RITE\n\n" +
          "AUTHORISED CLEARANCE — QUARTER 1\n" +
          "  Rio Vermelho tract 4        420 ha\n" +
          "  Rio Vermelho tract 5        615 ha\n" +
          "  Rio Vermelho tract 6        480 ha\n" +
          "  Novel community tract       185 ha\n" +
          "  --------------------------  ------\n" +
          "  TOTAL                      1,700 ha\n\n" +
          "This figure is the REMAINING allowance, not the total. The Q4 " +
          "order consumed 300 ha above allocation, retrospectively " +
          "approved by the Committee.\n\n" +
          "METHOD\n\n" +
          "No assessment will be produced. Assessment obligations will be " +
          "discharged through the Registry as retrospective entries, " +
          "certified by Section Chief Permits.\n\n" +
          "Consultation is not required. The Community Investment Agreement " +
          "is deemed to constitute consultation and will be referenced as " +
          "such in all filings.\n\n" +
          "ATMOSPHERIC CONTROL\n\n" +
          "Burning is prohibited where it would carry smoke to:\n" +
          "  - the Ibara village, in any direction\n" +
          "  - the Novo Airão air monitoring station, at any concentration\n" +
          "above 8 micrograms per cubic metre\n" +
          "  - the trans-Amazon corridor during scheduled overflight by the " +
          "Foundation's medical flights\n\n" +
          "This constraint is a nuisance, not a safety rule. It exists " +
          "because the Foundation's flights are photographed by the " +
          "passengers, and one passenger is a journalist who has not yet " +
          "written the article.\n\n" +
          "PERMANENT WORKS\n\n" +
          "Tract 5 is to be cleared to a 40-metre standard. Post-clearing, " +
          "establish AgriGen trial planting on 180 ha. The cultivar is " +
          "engineered to germinate only in pentachlorophenolone-exposed " +
          "soil.\n\n" +
          "Staff at the trial planting are to be told it is a soil-recovery " +
          "study. It is not, and it will not be, because a soil-recovery " +
          "study would require a control plot.\n\n" +
          "OPERATIONAL NOTE — SEQUENCING\n\n" +
          "CARRION discharges and REDLINE clearings are to be sequenced so " +
          "that no month contains both a downstream discharge and a " +
          "smoke-generating clearance in the same wind quadrant. The " +
          "Registry must never hold two entries from the same reach in the " +
          "same quarter, because the Registry's audit rule flags " +
          "correlation.\n\n" +
          "This is the only genuinely careful part of the programme. " +
          "Everything else we have done badly and it has not mattered. This " +
          "part we do well, because it is the part that keeps us.",
      },
      {
        path: "/black_programs/CHOIR_protocol.txt",
        id: "bp-3",
        title: "CHOIR — field protocol, delivery and uptake",
        date: "2023-08-24",
        src: "A. Tesfaye",
        tags: ["lycanthropy", "kilifi", "bioweapon", "compulsion"],
        body:
          "CHOIR — FIELD PROTOCOL\n" +
          "Classification: BIO / RESTRICTED\n" +
          "Site: Kilifi Annex, vector delivery stations 1-14\n" +
          "Originator: A. Tesfaye, Field Programme Lead\n" +
          "Date: 24 August 2023\n\n" +
          "VECTOR\n\n" +
          "Delivery is by Anopheles gambiae s.l. reared at the Annex and " +
          "released at station density of 2,400 per hectare. The agent is " +
          "carried in the salivary gland at 0.4 micrograms per mosquito. A " +
          "human receiving twenty bites receives approximately 8 " +
          "micrograms.\n\n" +
          "The agent is a modified apolipoprotein fragment conjugated to a " +
          "cerebellar trans-synaptic marker. In human test subjects it has " +
          "produced no measurable effect at any dose.\n\n" +
          "In one subject class it has produced total effect.\n\n" +
          "SELECTIVITY\n\n" +
          "Receptor binding depends on a Gila monster-derived receptor " +
          "homologue that is expressed in human brain at baseline and " +
          "upregulated roughly four hundred fold in lycanthropes during " +
          "the wolf-state only.\n\n" +
          "In other words: the agent has no effect on humans, has no effect " +
          "on animals, and no effect on any human who is not about to " +
          "become a wolf.\n" +
          "This is the entire point of CHOIR and the reason it is funded " +
          "through the vector-eradication programme rather than the " +
          "weapons budget.\n\n" +
          "EFFECT\n\n" +
          "Reported, per subject, in order of frequency:\n" +
          "  1. Sudden certainty of a previously unconsidered " +
          "orientation. Subjects describe it as knowing where they are.\n" +
          "  2. Cessation of pain response to minor injury, " +
          "immediately.\n" +
          "  3. Recognition of other lycanthropes within approximately 300 " +
          "metres.\n" +
          "  4. In four of eleven cases, abrupt desynchronisation with " +
          "the pack.\n\n" +
          "Clinical read-through: the agent appears to short-circuit the " +
          "dominance negotiation that a newly-risen lycanthrope must survive " +
          "to keep the pack. Four of eleven subjects did not survive it. " +
          "They were excluded from the pack and then excluded from the " +
          "den.\n\n" +
          "PRESENTATION\n\n" +
          "The programme presents to the outside world as a mosquito " +
          "eradication effort and has been funded as one for eleven years. " +
          "Two independent assessments have noted that eradication " +
          "methodologies do not involve improving the bite of every " +
          "mosquito you release.\n\n" +
          "Both assessments were conducted by researchers who had been " +
          "declined access to stations 9 to 14.\n\n" +
          "Note on immunity: I have twice requested legal immunity in " +
          "writing. Both times I understood that the grant came from Pentex " +
          "rather than from the Republic. Whether that constitutes " +
          "immunity is a question I would like answered before the next " +
          "season.",
      },
      {
        path: "/black_programs/MAYFLY_observation_log.txt",
        id: "bp-4",
        title: "MAYFLY — cold-chain inventory log, Novosibirsk",
        date: "2024-02-19",
        src: "I. Brandt",
        tags: ["mayfly", "stasis", "harvest", "nonconsent"],
        body:
          "NOVOSIBIRSK ANNEX — COLD CHAIN INVENTORY\n" +
          "Classification: BIO / RESTRICTED\n" +
          "Custodian: I. Brandt, Site Veterinarian\n" +
          "Log period: 1998 to date\n\n" +
          "PROCEDURE AS ESTABLISHED\n\n" +
          "Subjects in stasis are held at minus ninety-one degrees in " +
          "drawers 1 through 9. They are not ventilated in any biological " +
          "sense. They are held at a temperature and a partial pressure of " +
          "oxygen such that metabolism is undetectable by any instrument " +
          "the Annex owns, and — per K. Vhalen's 1991 specification — " +
          "likely by any instrument.\n\n" +
          "Once per eighteen months a subject is drawn for harvest. " +
          "Harvest is defined as warm reanimation to 37 degrees, extraction, " +
          "and return to stasis. The subject has never, in any recorded " +
          "case, failed to survive a harvest.\n\n" +
          "The subject also has never, in any recorded case, been " +
          "conscious for the extraction.\n\n" +
          "CURRENT INVENTORY\n" +
          "  Drawer 1   Subject 1        drawn 2001, 2004, 2009, 2016\n" +
          "  Drawer 2   Subject 2        drawn 2003, 2011, 2021\n" +
          "  Drawer 3   Subject 3        drawn 2006, 2014\n" +
          "  Drawer 4   SUBJECT 4        NEVER DRAWN\n" +
          "  Drawer 5   Subject 5        drawn 1999, 2007, 2018\n" +
          "  Drawer 6   Subject 6        drawn 2005, 2013, 2022\n" +
          "  Drawer 7   Subject 7        drawn 2012, 2020\n" +
          "  Drawer 8   Subject 8        drawn 2015\n" +
          "  Drawer 9   Subject 9        drawn 2010, 2019\n\n" +
          "Two subjects have been returned to wakefulness since 1998. Both " +
          "were returned for harvest purposes only, and both were returned " +
          "to stasis.\n\n" +
          "Subject 4 has never been drawn.\n\n" +
          "PERSISTENT ENTRY — Site Veterinarian\n\n" +
          "Four years ago I began recording, on paper, in this log, a detail " +
          "that is not required by the inventory protocol: whether each " +
          "subject's chest moves when the drawer is opened.\n\n" +
          "It does not. I know that it does not, because I have checked the " +
          "ventilation trace on the monitoring equipment, which is " +
          "calibrated annually by an engineer I have never been introduced " +
          "to.\n\n" +
          "The monitoring equipment is not measuring ventilation. It is " +
          "confirming that no ventilation has occurred. Those are " +
          "different instruments reporting the same number, and the Annex " +
          "has only ever procured the second one.\n\n" +
          "I am a veterinarian. There is a condition — a name I am not " +
          "permitted to write here — which is known to produce " +
          "unmeasurable vital signs and undetectable metabolism while the " +
          "subject remains, by every legal definition available to me, " +
          "living.\n\n" +
          "I have four people in drawers one through nine. If that " +
          "condition is present, then I am the only veterinarian in this " +
          "building, and I have been tending them for thirteen years, and I " +
          "have been told they are inventory.\n\n" +
          "Subject 4 has never been drawn because they have never been " +
          "taken to Johannesburg, and everything else in this building was.\n\n" +
          "I have filed four transfer requests. Each has been recorded as " +
          "withdrawn by a committee that does not appear on the site " +
          "organisation chart.\n\n" +
          "I am not going to file a fifth. I am going to keep this log, in " +
          "pencil, in a book that does not leave this room.\n\n" +
          "— Ilse Brandt, DVM",
      },
      {
        path: "/black_programs/CULPRIT_forensic_annex.txt",
        id: "bp-5",
        title: "CULPRIT — forensic annex, Kilifi",
        date: "2021-06-03",
        src: "Contract forensics (undisclosed)",
        tags: ["forensics", "kilifi", "cover-up", "death"],
        body:
          "FORENSIC ANNEX — CULPRIT PROGRAMME\n" +
          "Classification: DESTROY ON READING\n" +
          "Prepared for: K. Vhalen, Chief Arcane Officer\n" +
          "Prepared by: external (contract; client not named on the invoice)\n" +
          "Date: 3 June 2021\n\n" +
          "SUMMARY OF FINDINGS\n\n" +
          "The recovery team was tasked with establishing whether the " +
          "Ninefold Rites required the termination of K. Brandt, Dr I. " +
          "Brandt, and whether any action taken at the Annex between 1998 " +
          "and 2021 constituted a Rite requirement or a site requirement.\n\n" +
          "FINDING 1 — On the merits\n\n" +
          "The Rite of the Ninth Degree does not require the termination of " +
          "a Site Veterinarian. Site Veterinarians are Sixth Degree. There " +
          "is no provision, in any of the Nine Rites, under which a Sixth " +
          "Degree officer is required to die.\n\n" +
          "The request to terminate her therefore originated outside the " +
          "Rite.\n\n" +
          "FINDING 2 — On the request\n\n" +
          "The request is unsigned. It was submitted through Section Chief " +
          "Permits on Pentex letterhead bearing a reference number in the " +
          "BioSynth 'special projects' series.\n\n" +
          "FINDING 3 — On the disposition\n\n" +
          "No action was taken. Dr Brandt is alive. The Committee declined " +
          "the request on 9 November 2021 and instead declined her fourth " +
          "transfer application.\n\n" +
          "FINDING 4 — Why the request existed at all\n\n" +
          "Someone inside Pentex believed it necessary to have the Site " +
          "Veterinarian of the Novosibirsk Annex killed.\n\n" +
          "We were engaged to determine whether that was a Rite act. It was " +
          "not.\n\n" +
          "It was, instead, the behaviour of an organisation that has " +
          "become frightened of its own paperwork.\n\n" +
          "RECOMMENDATION\n\n" +
          "Burn this annex. It is unhelpful to the client. If Dr Brandt is " +
          "killed by anyone, it should not be by us, and it should not be " +
          "traceable to this document.\n\n" +
          "We note for the client's comfort that the client's first instinct " +
          "was correct even though its stated reasoning was wrong. She is " +
          "dangerous. She is dangerous because she is a professional keeping " +
          "records, not because she is a Rite officer.\n\n" +
          "END OF ANNEX\n\n" +
          "NOTE APPENDED BY K. VHALEN, 11 JUNE 2021:\n" +
          "Annex received. Recommendation adopted. Site Veterinary to be " +
          "rotated off the Annex at the next opportunity that does not " +
          "require her cooperation.\n" +
          "Her cooperation being necessary in the interim is noted as the " +
          "sole point in her favour.",
      },
      {
        path: "/black_programs/PALIMPSEST_ethics_committee.txt",
        id: "bp-6",
        title: "PALIMPSEST — Cota research ethics committee, dissent",
        date: "2022-03-30",
        src: "F. Loch",
        tags: ["palimpsest", "bogota", "human", "memory", "children"],
        body:
          "COTA RESEARCH ETHICS COMMITTEE\n" +
          "MINUTES OF THE MEETING OF 30 MARCH 2022\n" +
          "Cota Research Station, conference room\n" +
          "Present: F. Loch (Principal Investigator), A. Reyes, M. Duarte, " +
          "S. Pinzón, one seat vacant\n\n" +
          "4. CONSENT — FINDING\n\n" +
          "The Committee reviewed the consent documentation for the Bogotá " +
          "Cohort and records the following.\n\n" +
          "The cohort comprises 611 subjects enrolled between 2011 and " +
          "2020. Subjects were recruited through a community health " +
          "programme in four municipalities.\n\n" +
          "The written consent form states that the study concerns " +
          "\"nutritional supplements and cognitive wellbeing\".\n\n" +
          "The study concerns a 0.3 milligram per kilogram dose of a novel " +
          "organophosphate-class compound delivered in fortified flour, " +
          "intended to produce persistent changes in declarative memory " +
          "and in the subject's appraisal of authority figures.\n\n" +
          "Forty-one subjects were informed, in whole or in part, of the " +
          "true nature of the intervention.\n\n" +
          "Of those forty-one, twenty-eight are from San Andrés de Cota, " +
          "which is where the sample size is smallest.\n\n" +
          "The Committee finds that the consent as executed does not " +
          "constitute informed consent for the intervention actually " +
          "administered.\n\n" +
          "5. VULNERABILITY\n\n" +
          "Ninety-four of the 611 subjects were minors at enrolment. " +
          "Seventeen were under thirteen.\n\n" +
          "The protocol specifies the recruitment catchment as \"municipalities " +
          "with low immunisation coverage\". The Committee notes that this " +
          "is a vulnerability criterion and that no other study in the " +
          "station's history has named it.\n\n" +
          "6. IRREVERSIBILITY\n\n" +
          "The compound does not degrade. Twelve-month washout samples " +
          "remain at full concentration. A subject who leaves the study " +
          "leaves with the intervention permanently installed and no " +
          "means of reversal.\n\n" +
          "7. OBSERVATION OF THE CHAIR\n\n" +
          "I will record the Committee's difficulty here plainly.\n\n" +
          "I have run clinical trials for eleven years and I have never " +
          "before seen a protocol recruit on vulnerability and then " +
          "describe the recruitment strategy, accurately, as public " +
          "health.\n\n" +
          "The true name of this programme is PALIMPSEST, and it is a " +
          "Station-originated name, and it means roughly the same thing " +
          "here that it means at the Nexus.\n\n" +
          "It writes over the record.\n\n" +
          "That is what we are doing to these people, with a compound " +
          "from a flour mill, and the reason I have not resigned is that " +
          "the only alternative is that the compound continues without " +
          "anyone at this station who knows what it does.\n\n" +
          "8. VOTE\n\n" +
          "The Committee voted 3 to 1 to refer the consent documentation to " +
          "the Ministry of Health. The dissent was recorded by M. Duarte.\n\n" +
          "The referral was made by CCO office on 4 April 2022 and was " +
          "closed without action on 19 April 2022 on the grounds of " +
          "\"administrative incompleteness\".\n\n" +
          "No Committee member has been dismissed. Four have been " +
          "transferred to sites outside the country, with increments.",
      },

      // /field_ops
      {
        path: "/field_ops/spill_witness_Ibara.txt",
        id: "fo-1",
        title: "Witness statement — fisher, Ibara reach",
        date: "2022-06-02",
        src: "anonymous",
        tags: ["spill", "witness", "amazon", "death"],
        body:
          "STATEMENT OF (NAME WITHHELD)\n" +
          "Occupation: fisher, Ibara reach, Rio Vermelho\n" +
          "Taken: 2 June 2022, by phone, in Portuguese, two sessions\n" +
          "Note: the interviewer introduced themselves as an employee of the " +
          "Fundação Novo Airão. This was not true.\n\n" +
          "\"I fish from nine to four. That is the whole day.\n\n" +
          "On the ninth of April I came down in the morning and the water " +
          "was the colour of tea. Not dirty. Tea. And it was not cold, in " +
          "April, it should have been cold.\n\n" +
          "My daughter had the rash first. The rash like little white " +
          "coins on her arms. Then the two youngest boys, same. Then the " +
          "mother of my wife's cousin.\n\n" +
          "By the Tuesday the children were shaking. Not fever. Shaking, " +
          "in the afternoon, and you could not stop it, you would hold them " +
          "and they shook.\n\n" +
          "Then the trucks came. White trucks with water. Very good " +
          "water. And a man in a Pentex shirt said it was because the rain " +
          "was late.\n\n" +
          "He said it was because the rain was late.\n\n" +
          "I have fished this river forty-one years. The rain is not late " +
          "in April.\n\n" +
          "They gave us papers to sign about the water. My wife's cousin " +
          "signed. I did not sign. He still has the paper, he kept it, he " +
          "shows people.\n\n" +
          "Then they came and said we should go, because of the harvest, " +
          "for the season, they would build houses. Forty days. Then " +
          "somebody in a car decided we should go for longer, and by " +
          "longer I mean the houses are still not there, and the money " +
          "they promised for the houses is in a house in the city that " +
          "belongs to the brother of the man who signed.\n\n" +
          "The old man Tiburcio went into the water in May to wash his " +
          "net. The water had gone back to the colour of the river by then. " +
          "It looked clean. It looked the most clean water I have seen in " +
          "my life.\n\n" +
          "He had the rash too. He had had the rash since the trucks " +
          "stopped coming.\n\n" +
          "They counted four. They paid four. Tiburcio is one of the four.\n\n" +
          "If you want to know the truth of it, the truth is that they " +
          "counted four because four is what the paper allows. Tiburcio " +
          "went in the water in May. That is a fifth, and the water had " +
          "gone back, and they told us the water was clean.\n\n" +
          "That is the whole thing. That is all of it. They killed him and " +
          "then they paid for four.\"",
      },
      {
        path: "/field_ops/animal_trials_Manaus.txt",
        id: "fo-2",
        title: "BioSynth animal protocol — BioSynth-V",
        city: "Manaus",
        date: "2023-05-17",
        src: "BioSynth",
        tags: ["animals", "testing", "manaus", "vivisection"],
        body:
          "BIOSYNTH — PROTOCOL BioSynth-V\n" +
          "Revision 7\n" +
          "Species: 4 lines (3 non-human primate, 1 canine)\n" +
          "Facility: Manaus Complex, Building 22, sub-basement 2\n" +
          "Classification: BIO / RESTRICTED\n\n" +
          "1. PURPOSE\n\n" +
          "To determine whether the BioSynth-V oral payload alters host " +
          "response to silver-grade particulate insult, and whether the " +
          "alteration is reversible.\n\n" +
          "The programme does not require that the payload be effective. " +
          "It requires that the result be characterised.\n\n" +
          "2. SUBJECT SELECTION\n\n" +
          "Primates are imported through a licensed broker. Selection " +
          "criteria favour animals with a documented history of colony " +
          "stress. The broker's records describe these animals as " +
          "\"previously exposed\" for commercial reasons. The receiving " +
          "veterinarian has recorded that he understands the phrase " +
          "differently.\n\n" +
          "3. PROTOCOL\n\n" +
          "Stage 1 — Dose titration, 90 days.\n" +
          "Stage 2 — Insult challenge at day 91. Insult is particulate, " +
          "administered by staff who are not informed of the treatment arm.\n" +
          "Stage 3 — Recovery observation to day 400, or to " +
          "discontinuation.\n\n" +
          "Mortality is expected at 60 to 80% across Stage 2 and Stage 3. " +
          "This is accepted and budgeted.\n\n" +
          "4. THE POINT OF THE STUDY\n\n" +
          "The payload is intended for human use. The insult is the point " +
          "of the study.\n\n" +
          "Stage 2 does not test the payload. Stage 2 tests whether the " +
          "payload buys an animal sixty additional minutes in a facility " +
          "that will not observe it for the four hundred days the protocol " +
          "promises.\n\n" +
          "5. RECORD KEEPING\n\n" +
          "Protocol revision 6 required daily written observation notes. " +
          "Revision 7 removes this requirement, on the grounds that " +
          "written notes are \"not a data source\".\n\n" +
          "Recorded mortality figures for the programme are carried in the " +
          "Registry as an environmental externality cost rather than as an " +
          "animal-welfare metric, because the latter would appear in the " +
          "annual report.\n\n" +
          "6. VETERINARY OBJECTION\n\n" +
          "The receiving veterinarian has filed an objection on 17 May " +
          "2023. The objection states that revision 7 removes the only " +
          "mechanism by which suffering in this programme could be " +
          "observed by anyone other than the staff administering it.\n\n" +
          "The objection was acknowledged and referred to the Pentex " +
          "Foundation's Animal Welfare Standard, which is a Pentex " +
          "entity, which was revised in 2019, and which permits the " +
          "termination of protocols that are, in the Foundation's words, " +
          "\"no longer informative\".\n\n" +
          "BioSynth-V remains active.",
      },
      {
        path: "/field_ops/blight_report_Calgary.txt",
        id: "fo-3",
        title: "Soil recovery trial — vegetative failure",
        date: "2024-05-02",
        src: "AgriGen",
        tags: ["soil", "sterile", "calgary", "fail"],
        body:
          "AGRIGEN — TRIAL REPORT AG-24-119\n" +
          "Calgary campus, block C, plot 6\n" +
          "Report date: 2 May 2024\n" +
          "Classification: INTERNAL — DO NOT FORWARD TO FOUNDATION\n\n" +
          "SUMMARY\n\n" +
          "The Pentex-VII cultivar germinated at 94% in the treated plot " +
          "and 0% in the control plot.\n\n" +
          "This is the expected result and it is also the entire " +
          "implication of the programme.\n\n" +
          "FINDINGS\n\n" +
          "The cultivar was engineered with a germination trigger " +
          "responsive to pentachlorophenolone in soil at concentrations " +
          "between 0.2 and 40 parts per million.\n\n" +
          "This concentration band corresponds precisely to the band " +
          "observed downstream of the Rio Vermelho separation stage " +
          "following the April 2022 discharge.\n\n" +
          "The control plot is chemically clean. The cultivar will not " +
          "grow in it.\n\n" +
          "There is therefore no field condition in which this cultivar " +
          "succeeds other than a field that has already been contaminated " +
          "by a Pentex operation.\n\n" +
          "DISCUSSION\n\n" +
          "Agrigen markets this cultivar as part of the group's land-" +
          "stewardship portfolio, describing it as \"a crop that only " +
          "grows where the land has been harmed, and therefore a crop " +
          "that only grows where it should\".\n\n" +
          "This is accurate. It is not an accident of phrasing.\n\n" +
          "The commercial value of the cultivar is therefore bounded by " +
          "the rate at which the group contaminates soil. It is a crop " +
          "whose market is the group's own liability.\n\n" +
          "RECOMMENDATION\n\n" +
          "Do not report this finding. Report block C plot 6 as a " +
          "methodology failure and re-seed with a conventional control " +
          "so that the quarterly stewardship index shows no unusual " +
          "variance.\n\n" +
          "I have written the recommendation and I do not believe it. I " +
          "have written it because it is what I am paid to write and " +
          "because the alternative document would end my career in a " +
          "week.\n\n" +
          "For the record, and because someone will read this eventually " +
          "who is not me:\n\n" +
          "The only thing worse than a company that poisons the land and " +
          "then leaves is a company that poisons the land, and then sells " +
          "you the seed that only grows in poison, and calls it " +
          "stewardship.\n\n" +
          "Both halves are in this report.",
      },
      {
        path: "/field_ops/security_rotation_Manaus.txt",
        id: "fo-4",
        title: "Contractor rotation schedule — Manaus",
        date: "2024-08-30",
        src: "D. Olevsky (notebook transcription)",
        tags: ["security", "mercenaries", "manaus", "violence"],
        body:
          "CONTRACTOR ROTATION — MANAUS COMPLEX\n" +
          "Transcribed from the Section Chief's private notebook.\n" +
          "The notebook is kept in a Russian-language binding and is not " +
          "filed with HR.\n\n" +
          "STANDING PRINCIPLE\n\n" +
          "No individual contractor may exceed 90 days on the concession. " +
          "On day 91 they are flown out and are paid a retention bonus " +
          "described, in the payroll ledger, as \"continuity settlement\".\n\n" +
          "The stated reason is medical. Most of these men are not ill. " +
          "The actual reason is that men who have been on the concession " +
          "for four consecutive quarters begin to ask what is in the " +
          "water, and the questions arrive at the same time, in the same " +
          "week, and always from men who have been drinking the water " +
          "rather than the tankered supply.\n\n" +
          "THE HIRE POOL\n\n" +
          "Recruitment is via three firms: two in Manaus, one in Kyiv. " +
          "The Kyiv firm supplies 40% of the rotation. Its invoice " +
          "classification is \"environmental services\".\n\n" +
          "Retention is 92%. The eight who do not complete 90 days are " +
          "not re-hired, and the instruction to the contractor's " +
          "counsel is to record the reason as \"voluntary resignation " +
          "due to family considerations\".\n\n" +
          "INCIDENT LEDGER — FIVE YEARS\n\n" +
          "  2019  One contractor drowned in an unpermitted drainage " +
          "channel at the Rio Vermelho stage. Cause recorded: " +
          "\"immersion, no third-party involvement\". The channel is not " +
          "fenced. The channel is 1.4 metres deep and carries process " +
          "water.\n" +
          "  2020  Two contractors absent following a clearing " +
          "operation and not located for nine days. Both returned. Both " +
          "resigned within the fortnight. Cause recorded: " +
          "\"post-operational stress\".\n" +
          "  2021  One community member attempting to photograph the " +
          "tract 5 clearing was hospitalised in Novo Airão with a " +
          "fractured orbital floor. No complainant was recorded. The " +
          "photograph is in the contractor's phone, which was " +
          "recovered, which is why the contractor left on day 78 and was " +
          "paid in full.\n" +
          "  2022  April. Four deaths in the Ibara reach. Four " +
          "settlement payments. See the incident report.\n" +
          "  2023  A contractor in the Novosibirsk Annex was found in " +
          "Drawer 9.\n\n" +
          "NOTE ON THE LAST ENTRY\n\n" +
          "It was ruled a workplace accident and the man's family were " +
          "compensated at the Manaus rate, which is the " +
          "wrong-country rate.\n\n" +
          "He had been sent to Novosibirsk on a two-week rotation. " +
          "Rotation is not authorised at the Annex. He was told it was a " +
          "BioSynth audit.\n\n" +
          "He opened the wrong drawer. There are nine and they are not " +
          "labelled on the outside and there is no protocol requiring " +
          "that they be.\n\n" +
          "The site's response to this was to introduce a visitor escort " +
          "procedure. It did not introduce labels.",
      },
      {
        path: "/field_ops/warehouse_transfer_Jurong.txt",
        id: "fo-5",
        title: "Warehouse transfer manifest — Jurong",
        date: "2024-04-11",
        src: "Singapore PetroChem",
        tags: ["singapore", "people", "transit", "murder"],
        body:
          "WAREHOUSE TRANSFER MANIFEST — JURONG ISLAND\n" +
          "Classification: TRANSPORT / DESTROY AFTER READING\n\n" +
          "Manifest 2024-04-11. Twenty-two pallets. Each pallet is " +
          "declared as \"agricultural consolidant, non-hazardous\".\n\n" +
          "Each pallet weighs between 410 and 440 kilograms. Agricultural " +
          "consolidant is not usually that heavy, and the certificate on " +
          "file for it was issued in 2019 and has not been reissued " +
          "because nobody has asked since.\n\n" +
          "ACTUAL CONTENTS: CAULDRON adjuvant, 4,000 units, repackaged. " +
          "CAULDRON is not a product. It is distributed, not sold. It is " +
          "moved through the Munitions logistics chain as a maintenance " +
          "chemical so that it does not appear in customs.\n\n" +
          "THE SECOND ITEM ON THIS MANIFEST\n\n" +
          "Pallets 19 through 22 are not CAULDRON.\n\n" +
          "Pallets 19 through 22 are documented, in this manifest, as " +
          "\"assay return — biological, do not open\". They are 40 to 60 " +
          "kilograms each. Four pallets.\n\n" +
          "The four pallets were loaded on 11 April. The manifest was " +
          "signed by the Warehouse Supervisor and countersigned by Legal " +
          "(G. Malesic), whose annotation reads \"no objection, transit " +
          "confirmed\".\n\n" +
          "The customs declaration accompanying the shipment lists " +
          "twenty-two pallets of agricultural consolidant.\n\n" +
          "The receiving end is a bonded warehouse in Port Klang, after " +
          "which the Pallets 19-22 are not tracked again. There is no " +
          "second manifest. This document is the only record of them " +
          "anywhere in the group.\n\n" +
          "TO ESTIMATE THE COUNT\n\n" +
          "The Cold-Chain Custodian at Novosibirsk has maintained, in " +
          "pencil, in a book that does not leave her room, a record of " +
          "subjects whose chests do not move. " +
          "She has kept that record for four years. She has never " +
          "requested it, and she has never transmitted it.\n\n" +
          "Nine drawers. " +
          "Between four and five times a year, a pallet passes through " +
          "Port Klang.\n\n" +
          "Whatever is in Pallets 19 through 22 is drawn from the Annex, " +
          "and it does not go out through customs, and it is not in the " +
          "assets register, and it is not in the annual report, and the " +
          "only person on earth who can account for it is a veterinarian " +
          "in Novosibirsk with a pencil.",
      },

      // /legal
      {
        path: "/legal/houston_permit_delta.txt",
        id: "lg-1",
        title: "Houston — permit volume against actual process area",
        date: "2021-08-11",
        src: "G. Malesic",
        tags: ["legal", "permits", "houston", "fraud"],
        body:
          "PRIVILEGED AND CONFIDENTIAL\n" +
          "ATTORNEY WORK PRODUCT\n" +
          "From: G. Malesic, Counsel, Environmental Compliance\n" +
          "To: B. Antunes-Vale, Chief Compliance Officer\n" +
          "Date: 11 August 2021\n\n" +
          "RE: Houston — discrepancy between permitted and actual process " +
          "area\n\n" +
          "For the avoidance of doubt, I am writing this so that the " +
          "discrepancy is documented as known and deliberate, and not as " +
          "unknown and negligent.\n\n" +
          "The permit for the Houston site authorises 0.53 square " +
          "kilometres of process area. Air monitoring, the annual report, " +
          "the sustainability index and every regulatory filing describe " +
          "0.53.\n\n" +
          "The site's actual enclosed process area, measured from the " +
          "aerials held by the county, the parcel records and our own " +
          "survey department, is 2.1.\n\n" +
          "The difference is not a measurement dispute. The difference is " +
          "that the permitted area has a fence around it, and the " +
          "remainder has buildings.\n\n" +
          "RECOMMENDATION\n\n" +
          "Do not seek amendment. Amendment requires an environmental " +
          "impact assessment, which requires a public comment period, " +
          "during which we would be obliged to disclose what the " +
          "buildings are for.\n\n" +
          "Retain the discrepancy. It is, on the current authorities, " +
          "enforceable only on inspection, and no inspection has been " +
          "requested since 2004.\n\n" +
          "I am obliged to record my view that this is a matter on which " +
          "the company may later be said to have deceived a regulator. I " +
          "do so here, in privileged document, on 11 August 2021, so that " +
          "the record shows the company knew.\n\n" +
          "CONCLUSION\n\n" +
          "This is also useful to us. A company caught in an accidental " +
          "violation has a remediation problem. A company caught in a " +
          "deliberate violation has a negotiation. Sixteen years of my " +
          "career in this function have been spent making sure that every " +
          "matter we are ever caught in is the second kind.",
      },
      {
        path: "/legal/ibara_settlement_1998.txt",
        id: "lg-2",
        title: "Ibara settlement — the clause nobody reads",
        date: "1998-03-30",
        src: "G. Malesic",
        tags: ["legal", "ibara", "mortality", "predatory"],
        body:
          "SETTLEMENT OF COMMUNITY DISPUTE — IBARA (1998)\n" +
          "Extracted clause, with commentary.\n\n" +
          "CLAUSE 7 — ENVIRONMENTAL INCIDENT COMPENSATION\n\n" +
          "\"In the event of any environmental incident originating from " +
          "operations within the concession, the Company shall provide to " +
          "affected households potable water in substitution for that " +
          "drawn from the affected source, financial support for " +
          "temporary relocation, and, where death is certified as " +
          "attributable to the incident, a payment of BRL 45,000 " +
          "(forty-five thousand reais) to the surviving household.\n\n" +
          "For the purposes of this clause, 'attributable' shall mean " +
          "certified by a physician appointed by the Company.\n\n" +
          "The Company shall not be liable for any consequence arising " +
          "from a subsequent or antecedent exposure where the affected " +
          "household has accepted substituted potable water under this " +
          "clause.\"\n\n" +
          "COMMENTARY\n\n" +
          "Clause 7 was drafted in March 1998. In March 1998 there had " +
          "been no discharge. The clause was drafted in advance of a " +
          "liability, at the request of the plantation division, which " +
          "wanted a number it could budget against.\n\n" +
          "The provision that the Company appoints the certifying physician " +
          "means the company determines who decides whether a death was " +
          "caused by its own discharge. This was not an oversight. " +
          "It was drafted this way deliberately, over the objection of " +
          "the then-general counsel, on the grounds that an independent " +
          "certification standard would have been " +
          "\"operationally unavailable in the wet season\".\n\n" +
          "The final provision — that a household which accepts " +
          "substituted water forfeits all claim arising from any exposure, " +
          "past or future — is what makes the tankered deliveries the most " +
          "important operational step in an incident response.\n\n" +
          "They are not humanitarian. They are a transfer of " +
          "liability, executed at the tap, by people who have not been told " +
          "what they are being given or why they are being given it.\n\n" +
          "IN PRACTICE\n\n" +
          "When we delivered eleven tankers to the Ibara households in " +
          "April 2022, four household heads signed.\n\n" +
          "Under Clause 7, those four signatures forfeited the claims of " +
          "those four households to every other cause of harm, forever, " +
          "for the sum of four BRL 45,000 death payments.\n\n" +
          "We paid four.\n\n" +
          "One is on file.",
      },
      {
        path: "/legal/foundation_ledger_extract.txt",
        id: "lg-3",
        title: "Foundation grant ledger — extract",
        city: "Geneva",
        date: "2025-01-20",
        src: "Pentex Foundation",
        tags: ["foundation", "laundering", "geneva"],
        body:
          "PENTEX FOUNDATION — GRANT LEDGER, EXTRACT\n" +
          "Classification: INTERNAL\n" +
          "Note: the Foundation reports on nine of its dollars for every " +
          "dollar it is audited on.\n\n" +
          "  2020-03  Save the Rio Verde    USD 2,400,000\n" +
          "             Memo: recipient organisation dissolved 2021-08.\n" +
          "             Funds traced to a Shenzhen SEZ property vehicle.\n" +
          "             See annexure, withheld.\n" +
          "  2020-07  Community Health, Novo Airão   USD 1,150,000\n" +
          "             Memo: recipient is the health post that receives " +
          "our patients. 6 Pentex referrals in the year, all " +
          "unpaid.\n" +
          "  2021-02  Rainforest Guardians   USD 4,800,000\n" +
          "             Memo: awarded for 'protection of high-value forest'. " +
          "The organisation has since published an assessment of the Rio " +
          "Vermelho tract describing it as \"the most valuable remaining " +
          "continuous canopy in the region\".\n" +
          "             It is a Pentex-owned tract.\n" +
          "  2021-06  Institute for Industrial Stewardship  USD 900,000\n" +
          "             Memo: founding grant. The Institute awarded us the " +
          "2021 Medal. See /press/award_2021_manifesto.txt.\n" +
          "  2021-09  Journalistic Fellowship, X   USD 240,000\n" +
          "             Memo: 'independent reporting capacity in the " +
          "Amazon basin'. The fellowship was awarded to a journalist who " +
          "has never published on Pentex.\n" +
          "  2022-05  Community Displacement Fund   USD 6,700,000\n" +
          "             Memo: 'support for households voluntarily " +
          "relocating from areas scheduled for ecological restoration'.\n" +
          "             Households relocated in the April 2022 window: 4.\n" +
          "             Average duration to date: 3 years, 9 months.\n" +
          "             Houses completed: 0.\n" +
          "  2023-01  Vector Eradication Programme, Kilifi   USD 11,000,000\n" +
          "             Memo: matching government contribution secured.\n" +
          "             Note: released against eradication milestones. " +
          "Eradication has not occurred. The mosquito population at the " +
          "four monitored stations is 2.1x baseline.\n" +
          "             What has increased is the payload per bite. See " +
          "CHOIR protocol.\n" +
          "  2023-09  Animal Welfare Standard, revision   USD 310,000\n" +
          "             Memo: revision authorised protocols to be " +
          "'terminated where no longer informative'.\n\n" +
          "SUMMARY\n\n" +
          "The Foundation's largest disbursement to the Amazon basin in " +
          "five years (USD 6.7m) was for the relocation of four " +
          "households whose water was poisoned by us, and not one of those " +
          "four households has a house.\n\n" +
          "Its largest single grant to West Africa funded a programme " +
          "whose measurable output is an increase in the dose delivered " +
          "with every bite.\n\n" +
          "The public version of this ledger shows grant " +
          "amounts in the range of ten thousand dollars and shows no " +
          "disbursement above one hundred thousand.\n\n" +
          "The two ledgers have the same total.",
      },
      {
        path: "/legal/dossiers_lycanthropy.txt",
        id: "lg-4",
        title: "Personnel security dossiers — Lycanthropy exposure",
        date: "2023-09-14",
        src: "Corporate Security",
        tags: ["lycanthropy", "surveillance", "dossiers", "kill"],
        body:
          "CORPORATE SECURITY — COUNTER-ASSET SCREEN\n" +
          "Distribution: Section Chiefs only\n" +
          "Classification: RESTRICTED — DO NOT FILE WITH HR\n\n" +
          "PURPOSE\n\n" +
          "Six files. One per incident, in six years, in which a Pentex " +
          "employee was confirmed to be a lycanthrope.\n\n" +
          "Not suspected. Confirmed. Confirmation is by a single " +
          "indicator: a Pentex employee's bloodwork submitted under " +
          "routine occupational health screening, in which the lymphocyte " +
          "panel returned values the laboratory flagged as outside the " +
          "human reference range and did not escalate, because the " +
          "laboratory is a group laboratory and the group laboratory " +
          "reports to Corporate Security.\n\n" +
          "THE POLICY\n\n" +
          "Confirmed lycanthropes are not dismissed. Dismissal is a " +
          "detectable event with a legal footprint and a witness " +
          "trail.\n\n" +
          "Confirmed lycanthropes are reassigned to the northern corridor " +
          "at reduced grade, given no access to family, and left there " +
          "until their medical file is retired by the Group Archivist " +
          "according to the retention schedule.\n\n" +
          "THE FILES\n\n" +
          "FILE 1 — Employee 1, PetroChem Houston, 2017. Ninth Degree. " +
          "Assigned to Annex temperature audit. Steady state.\n\n" +
          "FILE 2 — Employee 2, AgriGen Calgary, 2019. Seventh Degree. " +
          "Was a witness to the Cota facility. Transferred to Novosibirsk " +
          "in 2021. Currently in Drawer 4. Never drawn.\n\n" +
          "FILE 3 — Employee 3, BioSynth Manaus, 2020. Eighth Degree. " +
          "Refused a transfer out of the concession three times. " +
          "Diagnosed with an occupational respiratory condition in 2022 " +
          "and moved to a building away from the process area. Died of " +
          "that condition in 2023. Cause recorded as occupational. " +
          "Occupational, in the sense that he had been " +
          "correctly identified, correctly reassigned, and had been " +
          "allowed enough time to die of the knowledge.\n\n" +
          "FILE 4 — Employee 4, Logistics, 2021. Fifth Degree. " +
          "Photographed a clearing on a personal phone. Recovered. " +
          "Reassigned. Nothing further.\n\n" +
          "FILE 5 — Employee 5, Munitions Anchorage, 2022. The seventh " +
          "aircraft. This file does not contain a name. It contains " +
          "flight hours, a departure record for a flight that did not " +
          "appear on the aircraft's gauge, and a list of four people " +
          "who asked where the aircraft went.\n\n" +
          "FILE 6 — Employee 6, Kilifi, 2023. Was dosed, without consent, " +
          "through the CHOIR delivery stations during routine fieldwork " +
          "in an area where station density had not been reduced. " +
          "Contractor. Did not survive.\n\n" +
          "NOTE ON FILE 6\n\n" +
          "The exposure was unintentional. Field programmes reduce " +
          "station density within a radius during operations. The radius " +
          "is applied to company staff.\n\n" +
          "It was not applied to a contractor, because the contractor " +
          "roster for that week was submitted late and the density " +
          "adjustment was computed from the staff roster.\n\n" +
          "The correction made afterwards was procedural. The contractor " +
          "roster is now filed with the vector office before operations " +
          "rather than after.\n\n" +
          "It was not an error. It was a " +
          "sequence.",
      },
      {
        path: "/legal/kill_authorization.txt",
        id: "lg-5",
        title: "Authorisation — termination, R9F-114",
        date: "2021-06-11",
        src: "K. Vhalen",
        enc: "rot13",
        tags: ["kill", "authorization", "vhalen", "brandt"],
        body:
          "CRAGRK — NHGU GB GREZVANGR\nErsrerapr: E9S-114\nBevtvangbe: X. Iunyra, Puv" +
          "rs Nepnar Bssvpre\nQngr: 11 Whar 2021\nPynffvsvpngvba: EVGR\n\nFHOWRPG: Qe V" +
          ". Oenaqg, Fvgr Irgrevanevna, Abibfvovefx Naark.\n\nSVAQVAT\n\nGur fhowrpg un" +
          "f svyrq sbhe genafsre nccyvpngvbaf va sbhe lrnef. Rnpu fgngrf gung zngre" +
          "vnyf va gur Naark pbyq punva ner abg svg sbe qrpynerq hfr. Rnpu nccyvpng" +
          "vba unf orra erpbeqrq nf jvguqenja ol n pbzzvggrr gung qbrf abg nccrne b" +
          "a gur fvgr betnavfngvba puneg.\n\nGur fhowrpg vf n pbzcrgrag irgrevanevna." +
          " Fur vf abg n erfrnepure. Fur unf ab ynobengbel npprff orlbaq gur pbyq p" +
          "unva naq ab gurbergvpny senzrjbex va juvpu ure bofreingvbaf jbhyq or yrt" +
          "voyr gb nalbar bhgfvqr vg.\n\nERPBZZRAQNGVBA\n\nGrezvangr.\n\nGur fhowrpg vf a" +
          "bg qnatrebhf ba Evgr tebhaqf. Fur vf qnatrebhf ba pyrevpny tebhaqf, juvp" +
          "u vf jbefr, orpnhfr pyrevpny tebhaqf ner gur tebhaqf gung n fhocbran ern" +
          "purf.\n\nZRGUBQ\n\nEbhgr guebhtu gur zrqvpny shapgvba. Gurer vf n qbphzragrq" +
          " uvfgbel bs erfcvengbel cerfragngvbaf va fhowrpgf rzcyblrq ba ybat-qheng" +
          "vba pbyq fgbentr. Gur fhowrpg unf fcrag guvegrra lrnef va gung shapgvba." +
          "\n\nGuvf vf gur yrnfg zrgubq gung yrnirf ab qbphzrag. N pbyq-punva irgreva" +
          "nevna qlvat bs n pbyq-punva vyyarff vf n fpurqhyvat rirag.\n\nGVZVAT\n\nBa b" +
          "e nobhg 9 Abirzore 2021, juvpu vf gur qngr bs gur arkg Fgnaqvat Pbzzvggr" +
          "r zrrgvat, fb gung gur nhgubevfngvba naq gur qrpvfvba nccrne va gur fnzr" +
          " dhnegre.\n\nPBHAGRE-PBAFVQRENGVBA\n\nGur fvgr'f bayl pbhagre-pbafvqrengvba " +
          "vf gung ure pbbcrengvba vf erdhverq gb znvagnva gur uneirfg plpyr va Qen" +
          "jref 1 gb 9.\n\nAbgr sbe gur erpbeq: Qenjre 4 unf abg orra qenja fvapr rae" +
          "byzrag. Vs fur qvrf orsber gur arkg fpurqhyrq uneirfg, gur plpyr fgnyyf." +
          "\n\nGuvf vf gur fbyr ernfba gur nhgubevfngvba fubhyq abg or rkrphgrq ba gu" +
          "r fpurqhyrq qngr.\n\nVg vf abg n ernfba gb jvguqenj vg.\n\nNCCRAQVK — FGNGHF" +
          "\n\nRkrphgrq: ab.\n\nGur Pbzzvggrr qrpyvarq. Gur Pbzzvggrr'f fgngrq ernfba j" +
          "nf gung ure pbbcrengvba jnf arprffnel.\n\nGur Pbzzvggrr qvq abg tvir gur n" +
          "terrzrag'f erny ernfba, juvpu vf gung gur Pbzzvggrr vf sevtugrarq. Vg vf" +
          " abg n obql gung grezvangrf crbcyr. Vg vf n obql gung qvfcbfrf bs erpbeq" +
          "f.",
      },
      {
        path: "/legal/wire_trail_Novo_Airao.txt",
        id: "lg-6",
        title: "Wire trail — Fundação Novo Airão",
        city: "Novo Airão",
        date: "2022-05-30",
        src: "anonymous",
        tags: ["wire", "money", "shell", "ibara", "laundering"],
        body:
          "ACCOUNT TRAJECTORY — FUNDAÇÃO NOVO AIRÃO\n" +
          "Account 0041-77-883012-6\n" +
          "Period: April to May 2022\n\n" +
          "  09 Apr  14:20  + BRL 340,000.00   from Novo Airão Agroindustrial\n" +
          "                  ref REV-RVR-0447-EMERG\n\n" +
          "  09 Apr  16:55  - BRL 12,000.00    to Trudes-designed account,\n" +
          "                  beneficiary: the brother of the trustee who " +
          "countersigned the household water forms\n" +
          "  09 Apr  17:02  - BRL 88,000.00    to a construction contractor\n" +
          "                  supplying materials to an address in Manaus\n" +
          "                  with no construction on the site as of the last " +
          "inspection\n" +
          "  11 Apr  09:10  - BRL 240,000.00   to a property vehicle, " +
          "                  Shenzhen SEZ\n" +
          "                  this is the same destination as the " +
          "Foundation's Save the Rio Verde grant\n" +
          "\n" +
          "  11 Apr  16:00  - BRL 0.01         to Pentex PetroChem SA\n" +
          "                  Bank of America, São Paulo\n" +
          "                  ref 8855-0114\n\n" +
          "THE PENNY\n\n" +
          "Eleven Apr 16:00, one centavo, from the Fundação to PetroChem " +
          "SA.\n\n" +
          "This is a reference payment. The number 8855-0114 resolves, " +
          "inside the group, to the Legal memo reference used in 2021 to " +
          "move the Foundation's Save the Rio Verde grant into a Shenzhen " +
          "property vehicle.\n\n" +
          "The Foundation paid out BRL 340,000 to four households and " +
          "one community. PetroChem received one centavo and returned " +
          "nothing.\n\n" +
          "That is the shape of the whole arrangement. A foundation " +
          "makes it look like money given. A corporation takes it. The " +
          "penny is the receipt.\n\n" +
          "WHO CONTROLS THE FUNDAÇÃO\n\n" +
          "Trustees, per the deed:\n" +
          "  1. R. Mbeki-Ng, Deputy Chairman, Capital Committee, Pentex\n" +
          "  2. Brother of a Pentex Regional Compliance Manager\n" +
          "  3. A dentist in Novo Airão, appointed 2019 at the request of " +
          "the Regional Compliance Manager\n\n" +
          "Trustee 2 and Trustee 3 are the beneficiaries, or the " +
          "beneficiaries' associates, of the line items at 16:55 and " +
          "17:02 on 9 April.\n\n" +
          "This is disclosed in the Foundation's annual report as " +
          "\"governance arrangements consistent with local " +
          "custom\".\n\n" +
          "WHAT THE HOUSEHOLD RECEIVED\n\n" +
          "Four households signed a form for tankered water.\n\n" +
          "Under Clause 7 of the 1998 settlement, having accepted " +
          "substituted water, those four households forfeited all claims " +
          "arising from any antecedent or subsequent exposure.\n\n" +
          "The value of the four payments is BRL 180,000.\n\n" +
          "The value of the rights surrendered, against a BRL 45,000 " +
          "per-death rider and a documented mortality of four attributable " +
          "deaths plus at least one that was not counted, is not " +
          "computable.\n\n" +
          "The value of the BRL 340,000, less BRL 100,000 to the two " +
          "trustee-associated accounts, less BRL 240,000 to Shenzhen, is " +
          "zero.\n\n" +
          "The money did not go anywhere. That is what makes it theft " +
          "rather than a fee.",
      },
      {
        path: "/legal/culprit_excerpt.txt",
        id: "lg-7",
        title: "The Seventh Rites — excerpt, page marked Q",
        date: "2024-09-01",
        src: "unknown",
        enc: "hex",
        tags: ["rite", "lore", "gaia", "wyrm", "secret"],
        body:
          "4558545241435445442046524f4d2041204c4f4e47455220444f43554d454e542e205448" +
          "45204c4f4e47455220444f43554d454e54204953204e4f5420484552452e0a0a5120e280" +
          "942057687920646f6573206120636f72706f726174696f6e207265717569726520746869" +
          "733f0a0a4120e2809420426563617573652074686520526974652069732061206d616368" +
          "696e6520616e642061206d616368696e65207265717569726573207363616c652e204120" +
          "52697465206b65707420696e206120686f757365206469657320696e206120686f757365" +
          "2e20412052697465206b65707420696e206120666f756e646174696f6e20646965732077" +
          "68656e2074686520666f756e646174696f6e2773207472757374656573206368616e6765" +
          "2e20412052697465206b65707420696e20616e204f72646572206469657320696e207468" +
          "65204f7264657227732073756363657373696f6e2e0a0a4f6e6c79206120636f72706f72" +
          "6174696f6e20646f6573206e6f74206469652e204120636f72706f726174696f6e206f75" +
          "746c697665732069747320666f756e646572732c2069747320626f6172642c2069747320" +
          "6c61772c206974732063757272656e637920616e642069747320636f756e7472792e2049" +
          "7420697320746865206f6e6c7920696e737469747574696f6e20696e2074686520776f72" +
          "6c6420776974682061206c6f6e676572206d656d6f7279207468616e20616e7920707269" +
          "6573742e0a0a5120e28094205468656e2050656e74657820697320612074656d706c652e" +
          "0a0a4120e280942050656e74657820697320612074656d706c6520776974682061207061" +
          "79726f6c6c2e20546861742069732074686520696d70726f76656d656e742e2045766572" +
          "792070726576696f75732076657373656c20666f72207468697320776f726b2077617320" +
          "6d61696e7461696e65642062792066616974682c20616e64206661697468207265717569" +
          "726573206120666f756e6465722c20616e6420666f756e646572732064696520616e6420" +
          "74616b65207468656972206365727461696e74792077697468207468656d2e2050656e74" +
          "6578207265717569726573206f6e6c79206120717561727465726c79206469766964656e" +
          "642e0a0a5120e2809420416e64207768617420646f657320746865205779726d2061736b" +
          "20666f7220696e2072657475726e3f0a0a4120e28094204e6f7468696e67206974206861" +
          "7320746f20626520746f6c642074776963652e20546865205779726d20646f6573206e6f" +
          "742077616e7420776f72736869702e20576f727368697020697320696e65666669636965" +
          "6e742e2049742077616e747320766f6c756d652e2049742077616e747320612067726561" +
          "74206465616c206f662064656361792070726f636573736564206174207363616c652061" +
          "6e64206f6e207363686564756c652c20616e6420697420646f6573206e6f742070617274" +
          "6963756c61726c79206361726520776865746865722074686520706572736f6e20646f69" +
          "6e67207468652070726f63657373696e67206b6e6f777320776861742074686520646563" +
          "617920697320666f722e0a0a5120e2809420596f7520646f206e6f74207468696e6b2074" +
          "6865207374616666206b6e6f772e0a0a4120e2809420546865204469726563746f72206f" +
          "6620526567756c61746f727920456e67696e656572696e67206b6e6f7773206578616374" +
          "6c79207768617420686520646f65732e20486520697320746865206f6e6c79206f6e6520" +
          "77686f20646f65732c20616e642068652069732074686520726561736f6e20746865206f" +
          "7065726174696f6e206973206c6567616c2c20616e64206865206861732061736b656420" +
          "746f206265206d6f7665642074776963652e0a0a5120e2809420416e6420696620686520" +
          "6c6566743f0a0a4120e28094205468656e20776520776f756c64206861766520746f2064" +
          "6f20746865205269746520776974686f75742061207265636f6e63696c696174696f6e20" +
          "66756e6374696f6e2c207768696368206d65616e7320776520776f756c64206861766520" +
          "746f2063686f6f7365206265747765656e20746865206f7065726174696f6e20616e6420" +
          "7468652066696c696e672e2054686520436f72706f726174696f6e2063616e2073757276" +
          "697665206569746865722e2049742063616e6e6f74207375727669766520626f74682c20" +
          "616e64206974207072656665727320746f20737572766976652e0a0a5120e2809420536f" +
          "20686520697320746865206c6f636b2e0a0a4120e2809420486520697320746865206c6f" +
          "636b2e20486520686173206265656e20746865206c6f636b2073696e636520323031342e" +
          "0a0a5120e2809420416e64206e6f626f64792068617320746f6c642068696d2e0a0a4120" +
          "e2809420486520686173206265656e20746f6c642e20486520697320746865206f6e6c79" +
          "20706572736f6e20696e2074686520636f6d70616e792077686f20686173206265656e20" +
          "746f6c642c207768696368206973207768792077652063616e6e6f742073696d706c7920" +
          "7265706c6163652068696d2e",
      },

      // /personnel
      {
        path: "/personnel/vhalen_c.vhalen.txt",
        id: "pn-1",
        title: "Mailbox — c.vhalen@pentex.example",
        date: "2024-11-03",
        src: "Sublevel 4",
        tags: ["vhalen", "mail", "arcane", "kill"],
        body:
          "FROM: c.vhalen@pentex.example\n" +
          "TO: eboard@pentex.example\n" +
          "CC: s.oduya@pentex.example\n" +
          "DATE: 3 November 2024, 23:41\n" +
          "SUBJECT: (no subject)\n\n" +
          "The Cota Institute has reviewed. I am content with the " +
          "revised consent language.\n\n" +
          "It says what it must. The remaining four hundred and seventy " +
          "subjects will continue to believe they are taking a nutritional " +
          "supplement, and they will continue to believe it in a way that " +
          "makes them agreeable, and that is precisely the " +
          "product.\n\n" +
          "You asked me last quarter whether the memory work could be " +
          "done non-chemically. It cannot. The target has to be " +
          "reached by something the subject ingests, at a dose that " +
          "leaves a residue, and the residue is what holds the " +
          "disposition in place afterwards.\n\n" +
          "I am not sentimental about this. I have been doing this work " +
          "for longer than the company has had this name, and I have " +
          "done it in four vessels, and three of them ended. The " +
          "corporation is the only one that did not end.\n\n" +
          "The Institute asks whether the compound's effect on the " +
          "subject's bond to family is acceptable. I have answered " +
          "yes, and I will answer yes again, and I would ask the " +
          "Committee to understand that the bond to family is the " +
          "bond that keeps a person in a house, and we are trying to " +
          "move four hundred and seventy people out of a " +
          "household economy into an industrial one.\n\n" +
          "The families will be visited quarterly. The visits will be " +
          "recorded as welfare checks. The subjects will not remember " +
          "the visits.\n\n" +
          "— K.V.\n\n" +
          "-----\n" +
          "FROM: eboard@pentex.example\n" +
          "TO: c.vhalen@pentex.example\n" +
          "DATE: 3 November 2024, 23:58\n" +
          "SUBJECT: (no subject)\n\n" +
          "Accepted. Note for your file: the Board does not receive these. " +
          "This thread is stored on the Sublevel, not the Archive.\n\n" +
          "Note from the Archivist: the retention schedule for " +
          "Sublevel threads is 'destroy on receipt of the next " +
          "authorisation'. I am obliged to flag that this schedule is " +
          "being applied to the same body that authorises it, and that " +
          "the Archivist is not permitted an opinion.\n\n" +
          "I am permitted to be late.",
      },
      {
        path: "/personnel/venner_j.venner.txt",
        id: "pn-2",
        title: "Mailbox — j.venner@pentex.example",
        date: "2024-02-19",
        src: "leak cell (partial)",
        tags: ["venner", "mail", "conscience", "clue"],
        body:
          "FROM: j.venner@pentex.example\n" +
          "TO: g.malesic@pentex.example\n" +
          "DATE: 19 February 2024, 18:12\n" +
          "SUBJECT: RE: Discrepancy — REV-2024-01\n\n" +
          "Grigor,\n\n" +
          "I have signed the reconciliation for REV-2024-01 and I " +
          "want it recorded, in the file, in my words and not yours.\n\n" +
          "The reconciliation asserts that post-release water quality in the " +
          "Rio Vermelho reach returned to baseline within 60 days. That " +
          "assertion is not supported by any measurement made by the " +
          "group. Our sampling programme was suspended on 11 April 2022 " +
          "and not reinstated. What we have is a certificate from the " +
          "Registry, and the Registry is ours.\n\n" +
          "I signed it because my job is to make the declared version " +
          "and the real version the same document, and I am the only " +
          "person in Manaus who has both versions.\n\n" +
          "I have asked to be transferred twice. Both requests were " +
          "approved. Both transfers were to a position reporting to " +
          "BioSynth rather than to Regulatory, which means both " +
          "transfers moved me up and out of the reconciliation and " +
          "left the reconciliation exactly where it was.\n\n" +
          "I am going to keep doing this job. I want you to know that I " +
          "have understood what that makes me, and that I have " +
          "decided the filing is worth more to me than the " +
          "alternative, and I would like it noted that I did not reach " +
          "that conclusion quickly or easily.\n\n" +
          "One request. When the time comes, and it will, I would like to " +
          "know what the Archivist's retention schedule actually " +
          "covers, because I do not think it covers what she thinks it " +
          "covers.\n\n" +
          "Joss\n\n" +
          "-----\n" +
          "FROM: g.malesic@pentex.example\n" +
          "TO: j.venner@pentex.example\n" +
          "DATE: 19 February 2024, 18:40\n" +
          "SUBJECT: RE: RE: Discrepancy — REV-2024-01\n\n" +
          "Joss,\n\n" +
          "You have misread the schedule, as everyone does.\n\n" +
          "The schedule is not a destruction schedule. It is a " +
          "sequence schedule. Records are destroyed at the moment " +
          "their existence becomes discoverable, not at the moment they " +
          "become inconvenient. Those are not the same moment, and the " +
          "distance between them is the entire value of the " +
          "arrangement.\n\n" +
          "You have also misread your position. You are not the person " +
          "who made the declared version match the real version. You " +
          "are the person who discovers, each quarter, that they have " +
          "diverged, and who files the correction that makes them " +
          "match. That is not authorship. That is proofreading.\n\n" +
          "And proofreading is the most dangerous job in a building " +
          "full of people who have never read the original.\n\n" +
          "Do not request a third transfer. The second one was already " +
          "unusual.\n\n" +
          "G.\n\n" +
          "-----\n" +
          "FROM: j.venner@pentex.example\n" +
          "TO: g.malesic@pentex.example\n" +
          "DATE: 19 February 2024, 21:03\n" +
          "SUBJECT: (no subject)\n\n" +
          "Grigor —\n\n" +
          "I asked Petra about the schedule last night. She would not " +
          "answer and she has never refused to answer me " +
          "before.\n\n" +
          "I am going to stop asking for transfers.",
      },
      {
        path: "/personnel/brandt_i.brandt.txt",
        id: "pn-3",
        title: "Mailbox — i.brandt@pentex.example",
        date: "2024-12-06",
        src: "leak cell",
        tags: ["brandt", "mail", "novosibirsk", "mayfly", "conscience"],
        body:
          "FROM: i.brandt@pentex.example\n" +
          "TO: transfer.desk@pentex.example\n" +
          "DATE: 6 December 2024, 08:03\n" +
          "SUBJECT: Fifth application — withdrawn\n\n" +
          "This is not a withdrawal. I am recording it as a withdrawal " +
          "because the system will not accept anything else, and I want " +
          "it noted that the word is a lie and that I have not " +
          "consented to it.\n\n" +
          "I have worked at the Novosibirsk Annex for thirteen years. " +
          "I have been a veterinarian in three countries and I have " +
          "never been anywhere I could not describe in a handover note.\n\n" +
          "I cannot describe this one.\n\n" +
          "I have written four times, and each time I have said that " +
          "materials in the cold chain are not fit for declared use. " +
          "I have been correct every time. The declared use is research. " +
          "The materials are subjects. Those are not the same " +
          "category, and no amount of paperwork converts one into " +
          "the other.\n\n" +
          "I am not going to write it a fifth time, because a fifth " +
          "would be filed by someone else.\n\n" +
          "What I am going to do instead is keep the pencil book. " +
          "It does not leave this room. I have been keeping it since " +
          "2020 and I will keep it until I am not able to.\n\n" +
          "To whoever receives this: the book is not hidden. It has " +
          "never been hidden. It is in the room, on the shelf, and it " +
          "has been in plain sight the entire time, and the reason " +
          "nobody has read it is that reading it would require someone " +
          "to open Drawer 4, and nobody opens Drawer 4.\n\n" +
          "Subject 4 has never been drawn. Everything else has.\n\n" +
          "I am aware of what that implies. I have been a veterinarian " +
          "for twenty-two years and I am aware of what it " +
          "implies, and I have also been the only veterinarian " +
          "within four thousand kilometres of these people for " +
          "thirteen years, and those two facts have been sitting in the " +
          "same room the whole time.\n\n" +
          "Ilse Brandt, DVM\n" +
          "NVS-4, Novosibirsk Annex\n\n" +
          "-----\n" +
          "FROM: transfer.desk@pentex.example\n" +
          "TO: i.brandt@pentex.example\n" +
          "DATE: 6 December 2024, 08:19\n" +
          "SUBJECT: RE: Fifth application — withdrawn\n\n" +
          "Recorded as withdrawn. No further correspondence will be " +
          "issued on this reference.\n\n" +
          "Site Veterinary, Novosibirsk Annex\n" +
          "\n" +
          "[Automated. No human read this message. The queue for the " +
          "Novosibirsk desk was reassigned in 2020. Requests to this " +
          "address are processed without review.]",
      },
      {
        path: "/personnel/audit_call_transcript.txt",
        id: "pn-4",
        title: "Call transcript — audit, 9 January 2025",
        date: "2025-01-09",
        src: "leak cell",
        tags: ["call", "audit", "ilves", "archivist", "evidence"],
        body:
          "TRANSCRIPT — INTERNAL AUDIT LINE, RECORDED\n" +
          "9 January 2025, 16:22\n" +
          "Duration: 4 min 11 s\n" +
          "Recording: retained by the caller\n\n" +
          "PARTICIPANTS\n" +
          "  VOICE 1 — P. Ilves, Group Archivist\n" +
          "  VOICE 2 — unidentified, caller\n\n" +
          "VOICE 1: You asked what happens to a record after " +
          "destruction. Nobody has ever asked me that.\n\n" +
          "VOICE 2: What does happen to it.\n\n" +
          "VOICE 1: Nothing. That is the answer and it took me twenty " +
          "years to be able to say it in one word.\n\n" +
          "VOICE 1: We destroy the paper. The Archive is not a " +
          "database, it is a room with a man in it, and when the " +
          "schedule says a record goes, the record goes, and there is " +
          "no backup because a backup would be a place where a " +
          "destroyed record still exists.\n\n" +
          "VOICE 2: So the destruction is real.\n\n" +
          "VOICE 1: The destruction is the only honest thing this " +
          "company does. Everything else here is a copy of " +
          "something. The shredder is the only part of the process " +
          "that corresponds to what it claims to be.\n\n" +
          "VOICE 1: And that is why I have never minded it. If you " +
          "are going to do something you cannot hold, you may as well " +
          "do it properly.\n\n" +
          "VOICE 2: And what about the records that are never " +
          "scheduled?\n\n" +
          "VOICE 1: Yes.\n\n" +
          "VOICE 2: Which ones are those.\n\n" +
          "VOICE 1: Anything that was never filed. Anything that " +
          "arrived by hand. Anything that was never given a " +
          "reference number.\n\n" +
          "VOICE 2: For example.\n\n" +
          "VOICE 1: For example, a page written in pencil in a room " +
          "that does not leave that room.\n\n" +
          "[Silence, 7 seconds]\n\n" +
          "VOICE 1: The schedule does not reach it. The schedule has " +
          "never reached it. A pencil book on a shelf is the only " +
          "kind of record this company has never successfully " +
          "destroyed, because there is nothing to destroy it with.\n\n" +
          "VOICE 2: Petra.\n\n" +
          "VOICE 1: Do not call me that on a recorded line.\n\n" +
          "VOICE 1: And — since you are going to keep this — you " +
          "should know that I have thought about this for four " +
          "years, and I have decided I do not care, and I want to be " +
          "accurate about why. It is not courage. If they took that " +
          "book I would be finished, and I would deserve to " +
          "be.\n\n" +
          "VOICE 1: It is that a schedule that never reaches the " +
          "worst document is not a schedule that is working. It is " +
          "a schedule that is working perfectly for everyone who " +
          "deserves to be protected, and does not work at all for " +
          "the veterinarian.\n\n" +
          "VOICE 1: I have been protecting the wrong people for " +
          "twenty years, and I did it out of habit, and habit is " +
          "the most expensive thing a person can own.\n\n" +
          "[Line ends]",
      },

      // /field_ops — the human cost
      {
        path: "/field_ops/risk_memo_octagonal.txt",
        id: "fo-6",
        title: "Risk memo — media exposure",
        date: "2024-10-02",
        src: "D. Olevsky",
        tags: ["risk", "media", "reputation", "anticipatory"],
        body:
          "INTERNAL RISK MEMO — NOT DISTRIBUTED\n" +
          "From: D. Olevsky, Section Chief, Hard Assets\n" +
          "Date: 2 October 2024\n" +
          "Subject: Probable sequence of external interest, and the " +
          "actions already taken against it\n\n" +
          "This memo exists because the actions were taken in 2019 and " +
          "2017 and there is no version of this company in which we " +
          "would take them again. I am recording that, because " +
          "eventually somebody will read it and will want to know " +
          "whether we did.\n\n" +
          "THE SEQUENCE, AS WE UNDERSTAND IT\n\n" +
          "  1. The Ibara reach. A four-person death count is small " +
          "enough that no agency will act and large enough that one " +
          "family will not stop.\n" +
          "  2. The families. Grief plus a documented settlement " +
          "clause plus a signed form for water. Grief usually loses. " +
          "Grief plus an unpaid promised house loses less often.\n" +
          "  3. The unpaid houses. This is the live risk. The BRL " +
          "6.7m Displacement Fund has been disbursed against a " +
          "four-household relocation and has produced zero houses. If " +
          "one family produces a photograph of a " +
          "non-construction, the Foundation's grant reporting becomes " +
          "a matter of record rather than of opinion.\n" +
          "  4. The pattern. Once a reporter has two of " +
          "spill, clearing and relocation from the same river, the " +
          "third is not needed. The sequence is " +
          "spill-then-clearing. The Regional Compliance " +
          "Manager's own filing system separates them by quarter, " +
          "and that separation is the only reason the third " +
          "exists.\n" +
          "  5. The assessor. Any serious outlet will eventually " +
          "attempt independent sampling of the reach. The reach is " +
          "biologically inert at 30 months, which is designed to " +
          "be exactly long enough. It will not be long enough.\n\n" +
          "ACTIONS TAKEN IN ADVANCE OF EACH STEP\n\n" +
          "  Step 1 — Fundação Novo Airão. Formed 2017. Two of three " +
          "trustees connected to the site. The purpose of a " +
          "foundation is precisely to be the trusted local body. We " +
          "bought the trusted local body.\n" +
          "  Step 2 — Clause 7. Water tankers, accepted in writing, " +
          "with the forfeiture clause attached. Nobody reads " +
          "Clause 7. Everybody signs the tanker form.\n" +
          "  Step 3 — The relocation. Pre-existing schedule, " +
          "reused. The re-use is the mechanism: a household that " +
          "signed a voluntary relocation form cannot claim to " +
          "have been displaced.\n" +
          "  Step 4 — The Fellowship. Awarded to a journalist who " +
          "has never written about us and who has, to date, " +
          "declined every invitation to the basin. Two of her " +
          "sourced articles have been declined by one outlet. We " +
          "know because the declines were reported back to the " +
          "Fellowship's own monitor, by the outlet, which we also " +
          "fund.\n" +
          "  Step 5 — The station. Nobody has been granted access " +
          "since 2017. In 2021 we offered a supervised visit to a " +
          "State environmental official. He declined, citing " +
          "\"biosecurity\". He adopted our " +
          "reasoning. There is no version of this in which we lose " +
          "that exchange.\n\n" +
          "REMAINING RISK\n\n" +
          "Dr I. Brandt.\n\n" +
          "Not because she is dangerous. Because she is a " +
          "professional with a pencil and thirteen years of " +
          "observation, and the only thing standing between that " +
          "book and a court is a locked room in a building " +
          "where, in 2021, a contractor found a person in a " +
          "drawer.\n\n" +
          "Recommend the room be scheduled for relocation of the " +
          "inventory. Recommend the relocation be administered by " +
          "the Harvesting function rather than Logistics.\n\n" +
          "Recommend against any action against the " +
          "veterinarian. She is in the schedule as R9F-114. " +
          "Whoever signed that knows the difference between a " +
          "problem and a schedule entry.",
      },
      {
        path: "/black_programs/CAULDRON_distribution.txt",
        id: "bp-7",
        title: "CAULDRON — distribution record",
        date: "2025-02-14",
        src: "Jurong / Sublevel 4",
        tags: ["cauldron", "rite", "Munitions", "distribution"],
        body:
          "CAULDRON — DISTRIBUTION RECORD\n" +
          "Classification: RITE\n" +
          "Period: 2024\n" +
          "Originator: K. Vhalen\n\n" +
          "PRODUCT\n\n" +
          "A wholly synthetic adjuvant for the Rite. It is not a " +
          "drug and it has no therapeutic use. It is administered to a " +
          "candidate shortly before an attempted advancement.\n\n" +
          "What it does is remove the part of a human being that " +
          "hesitates.\n\n" +
          "A Rite candidate must choose. The choice is the whole of " +
          "the test, and it is taken under conditions in which the " +
          "candidate has no information about what is being chosen, " +
          "no ability to verify it, and no one available to ask.\n\n" +
          "CAULDRON removes the hesitation. Not the judgement, not " +
          "the reasoning, not the memory of the act. Only the " +
          "hesitation.\n\n" +
          "Which means a person administered CAULDRON will " +
          "afterwards always have chosen. They will remember " +
          "choosing. They will be certain they chose freely.\n\n" +
          "That is the entire commercial rationale. A vessel that " +
          "remembers choosing freely has not been robbed of " +
          "anything it can name.\n\n" +
          "OUTPUT, 2024\n\n" +
          "  Manufactured, Jurong            4,000 units\n" +
          "  Distributed, Munitions channel  3,840 units\n" +
          "  Distributed, Jurong clinic      160 units\n\n" +
          "  Recipients above Ninth Degree   6 (quantity not disclosed)\n" +
          "  Recipients Seventh Degree       71\n" +
          "  Recipients Sixth Degree and " +
          "below    1,940\n\n" +
          "  Recipients who declined          94\n\n" +
          "THE NINETY-FOUR\n\n" +
          "The 94 who declined were not punished and were not " +
          "dismissed. Their refusals were recorded as medical " +
          "contraindications.\n\n" +
          "They remain employees. They continue to receive the " +
          "group's health programme. They continue to be in the " +
          "occupational health screening pool.\n\n" +
          "They are also, permanently, on the counter-asset screen at " +
          "Corporate Security, in a category with no name and no " +
          "procedure: 'known non-participant'.\n\n" +
          "The refusal is the data point. There is no mechanism to " +
          "remove it.\n\n" +
          "WHY JURONG\n\n" +
          "The Jurong clinic is not a clinic. It is a facility " +
          "that administers the adjuvant under conditions of " +
          "apparent medical care to people who believe they are " +
          "being treated for exposure.\n\n" +
          "It is the most efficient operation in the group, because " +
          "it is the only one that requires no " +
          "persuasion. The candidate arrives at the door. The " +
          "candidate has usually been there before.\n\n" +
          "Two hundred and eleven staff have entered that building " +
          "on a clinical basis since 2019.\n\n" +
          "Thirty-one are Seventh Degree or above.\n\n" +
          "One hundred and eighty are not, and did not know what " +
          "they were being administered, and were recorded as " +
          "occupationally exposed, which is true, and which is also " +
          "the mechanism by which they can be re-administered at a " +
          "later date without anyone having to lie about it twice.",
      },
      {
        path: "/black_programs/houston_unpermitted_area.txt",
        id: "bp-8",
        title: "Houston — unpermitted process inventory",
        date: "2023-09-18",
        src: "G. Malesic",
        enc: "b64",
        tags: ["houston", "unpermitted", "process", "fraud"],
        body:
          "SE9VU1RPTiBQRVRST0NIRU0g4oCUIFVOUEVSTUlUVEVEIFBST0NFU1MgSU5WRU5UT1JZCkNs" +
          "YXNzaWZpY2F0aW9uOiBQUklWSUxFR0VEClByZXBhcmVkOiAxOCBTZXB0ZW1iZXIgMjAyMwpG" +
          "b3I6IEIuIEFudHVuZXMtVmFsZQoKVGhpcyBpcyB0aGUgaW52ZW50b3J5IG9mIHdoYXQgaXMg" +
          "YWN0dWFsbHkgcnVubmluZyBpbnNpZGUgdGhlIDEuNTcgc3F1YXJlIGtpbG9tZXRyZXMgb2Yg" +
          "cHJvY2VzcyBhcmVhIHRoYXQgaXMgbm90IGluc2lkZSB0aGUgZmVuY2UuCgpUaGUgcGVybWl0" +
          "dGVkIGFyZWEgaXMgMC41MyBrbcKyLiBUaGUgdW5wZXJtaXR0ZWQgYXJlYSBpcyAxLjU3IGtt" +
          "wrIuIFRvZ2V0aGVyIHRoZXkgYXJlIDIuMSBrbcKyLCB3aGljaCBpcyB3aGF0IHRoZSBhZXJp" +
          "YWxzIHNob3cgYW5kIHdoYXQgdGhlIG5laWdoYm91cnMgY2FuIHNlZSBmcm9tIHRoZSBhaXJw" +
          "b3J0LgoKV0hBVCBJUyBJTiBJVAoKICBBLTEgIFNlY29uZCBzZXBhcmF0aW9uIHRyYWluLCBp" +
          "ZGVudGljYWwgdG8gdGhlIHBlcm1pdHRlZCB0cmFpbiwgb25lIHRlbnRoIHRoZSBzaXplLCBu" +
          "b3QgaW4gdGhlIHByb2Nlc3MgcmVnaXN0ZXIuCiAgQS0yICBBIHJlYWN0aW9uIGJsb2NrIGZv" +
          "ciBhbiBpbnRlcm1lZGlhdGUgdXNlZCBvbmx5IGluIE11bml0aW9ucyBzeXN0ZW1zLiBOb3Qg" +
          "aW4gdGhlIHNpdGUncyBoYXphcmRvdXMgaW52ZW50b3J5IGJlY2F1c2UgdGhlIGludGVybWVk" +
          "aWF0ZSBpcyBub3QsIHN0cmljdGx5LCBtYW51ZmFjdHVyZWQgaGVyZS4gSXQgaXMgZGVjYW50" +
          "ZWQgaGVyZSBmcm9tIGEgcm9hZCB0YW5rZXIgdGhhdCBpcyBub3QgaW4gdGhlIGZsZWV0Lgog" +
          "IEEtMyAgQSB0YW5rIGZhcm0gd2l0aCBlbGV2ZW4gdGFua3MgYW5kIG5vIGJ1bmRpbmcuIFRo" +
          "ZSBidW5kaW5nIHdhcyBzcGVjaWZpZWQgYW5kIHRoZW4gcmVtb3ZlZCBhcyBhIGNhcGl0YWwg" +
          "ZGVmZXJyYWwgaW4gMjAxOS4gVGhlIGRlZmVycmFsIHdhcyBhdXRob3Jpc2VkIGJ5IHRoZSBC" +
          "b2FyZC4KICBBLTQgIEEgbGFib3JhdG9yeSB0aGF0IGFwcGVhcnMgaW4gbm8gZmxvb3IgcGxh" +
          "biwgaW4gd2hpY2ggZm91ciBvZiB0aGUgZWxldmVuIHRhbmtzIGFyZSBzYW1wbGVkLiBUaGUg" +
          "bGFib3JhdG9yeSdzIGFzc2F5cyBhcmUgdGhlIG9ubHkgaW5kZXBlbmRlbnQgY2hlY2sgdGhl" +
          "IGdyb3VwIHBlcmZvcm1zIG9uIGl0cyBvd24gcHJvZHVjdCwgYW5kIHRoZSBsYWJvcmF0b3J5" +
          "J3MgcmVzdWx0cyBnbyB0byBBcmNhbmUgUiZELgogIEEtNSAgQSBidWlsZGluZyBkZXNjcmli" +
          "ZWQgaW4gdGhlIHNpdGUncyBmaXJlIHJlZ2lzdGVyIGFzIGEgJ3dhcmVob3VzZScsIHdoaWNo" +
          "IGlzIHN0YWZmZWQgY29udGludW91c2x5LCB3aGljaCBoYXMgbm8gd2luZG93cywgYW5kIHdo" +
          "aWNoIGlzIG9uIHRoZSB2ZWN0b3ItbWFuYWdlbWVudCBiaW9yaXNrIHNjaGVkdWxlIHVuZGVy" +
          "IGEgcHJvZ3JhbW1lIG5hbWUgdGhhdCBkb2VzIG5vdCBleGlzdC4KCldIWSBOT0JPRFkgSEFT" +
          "IEFTS0VECgpCZWNhdXNlIHRoZSBhbnN3ZXIsIGlmIGdpdmVuLCB3b3VsZCByZXF1aXJlIGFu" +
          "IGVudmlyb25tZW50YWwgaW1wYWN0IGFzc2Vzc21lbnQgZm9yIHRoZSB3aG9sZSBzaXRlLCB3" +
          "aGljaCB3b3VsZCByZXF1aXJlIGRpc2Nsb3NpbmcgQS0xIHRocm91Z2ggQS01LCBvZiB3aGlj" +
          "aCBBLTMgYW5kIEEtNSBhcmUgdW5pbnN1cmFibGUgYW5kIEEtNCBpcyB0aGUgb25seSB0aGlu" +
          "ZyBrZWVwaW5nIHRoZSBncm91cCdzIHByb2R1Y3QgcXVhbGl0eSBkZWZlbnNpYmxlLgoKV0hZ" +
          "IFRISVMgRE9DVU1FTlQgRVhJU1RTCgpCZWNhdXNlIEkgaGF2ZSBiZWVuIGFza2VkLCB0d2lj" +
          "ZSwgdG8gc2lnbiBhbiBhbm51YWwgZGlzY2xvc3VyZSB0aGF0IHRoZSBzaXRlIGlzIGNvbXBs" +
          "aWFudCwgYW5kIGJlY2F1c2UgaW4gMjAyMyB0aGUgZmlyc3Qgb2YgdGhvc2UgdHdvIHJlcXVl" +
          "c3RzIGNhbWUgZnJvbSBhIHBlcnNvbiB3aG8gaXMgbm90IHRoZSBCb2FyZCBhbmQgaXMgbm90" +
          "IHRoZSBDQ08gYW5kIGRvZXMgbm90IGFwcGVhciBvbiB0aGUgYWN0dWFsIG9yZ2FuaXNhdGlv" +
          "biBjaGFydC4KCkkgd2lsbCBzaWduIHRoZSAyMDI0IGRpc2Nsb3N1cmUuIEkgd2FudCBpdCBu" +
          "b3RlZCB0aGF0IEkgc2lnbmVkIGl0IHdoaWxlIGhvbGRpbmcgdGhpcyBpbnZlbnRvcnksIGFu" +
          "ZCB0aGF0IGlmIHRoaXMgZG9jdW1lbnQgaXMgZXZlciByZWFkIGJ5IGFueW9uZSBvdGhlciB0" +
          "aGFuIHRoZSBDQ08gYW5kIG15c2VsZiwgdGhlIGRpc2Nsb3N1cmUgb2YgcmVjb3JkIGlzIGZh" +
          "bHNlIGFuZCB3YXMgZmFsc2Ugd2hlbiBpdCB3YXMgbWFkZS4KCkkgYW0gYXdhcmUgb2YgdGhl" +
          "IGluc3RydWN0aW9uIEkgYW0gdW5kZXIgYWJvdXQgZG9jdW1lbnRzIHRoYXQgYXJlIG5ldmVy" +
          "IGZpbGVkLgoKSSBhbSBhd2FyZSB0aGF0IEkgYW0gb25lIG9mIHRoZSBmb3VyIGV5ZXMgYXV0" +
          "aG9yaXNlZCB0byBob2xkIGEgZG9jdW1lbnQgdGhhdCBpcyBuZXZlciBmaWxlZC4KCkkgd291" +
          "bGQgbGlrZSBpdCBub3RlZCB0aGF0IHRoaXMgZG9jdW1lbnQgaGFzIGJlZW4gcmVhZCBieSBl" +
          "eGFjdGx5IG9uZSBvdGhlciBwZXJzb24sIGFuZCB0aGF0IGhlIGFza2VkIG1lIHRvIHdyaXRl" +
          "IGl0LCBhbmQgdGhhdCBoZSBrbmV3IEkgd291bGQsIGJlY2F1c2UgaGUgaGFzIGtub3duIGZv" +
          "ciB0d2VudHkgeWVhcnMgd2hhdCBJIGRvIHdoZW4gSSBhbSBnaXZlbiBhIGRpc2Nsb3N1cmUg" +
          "SSBjYW5ub3Qgc2lnbi4=",
      },
      {
        path: "/personnel/leak_cell_note.txt",
        id: "pn-5",
        title: "Note left in the drop box — the last page",
        date: "2026-08-14",
        src: "unknown",
        tags: ["leak", "colophon", "ending"],
        body:
          "A NOTE ON WHERE THIS CAME FROM\n\n" +
          "Nine people. Nine is not many. Nine is the number of people " +
          "who were in a room when this was decided to be worth the " +
          "risk.\n\n" +
          "Two of us work at Pentex. One of us is a veterinarian who " +
          "did not know she was in company until the fourth night, " +
          "and who has still not been told whether she is in " +
          "company now.\n\n" +
          "One of us is the reason the reconciliations at Manaus " +
          "balance. He has been signing them for eleven years. He is " +
          "the reason the declared version of that river is a " +
          "document.\n\n" +
          "None of us did this for money. We want to be clear about " +
          "that, because the coverage will say money and it will be " +
          "easier for the reader that way.\n\n" +
          "The veterinarian has been keeping a pencil book for four " +
          "years. She did not bring it. We told her it was safe and " +
          "she believed us, and then she told us it was not, and " +
          "then she told us it was, and we have not agreed on which " +
          "of those was true and we are not going to resolve it " +
          "between us.\n\n" +
          "WHAT WE DID\n\n" +
          "We used credentials. Real ones, issued to one of us in " +
          "2004 by a man who has asked not to be named, who is dead " +
          "now, and who would have been furious about this.\n\n" +
          "The portal's passphrase policy was published until 2004 and " +
          "never enforced afterwards. The username convention is on " +
          "every site directory badge this company has ever issued. " +
          "Neither of those is a secret. Both of those are a " +
          "company that decided it did not need them.\n\n" +
          "WHAT WE DID NOT DO\n\n" +
          "We did not alter a document. Not one character. Every " +
          "file in this drop box is a Pentex file.\n\n" +
          "That is the finding. Not the theft. The theft is a " +
          "footnote. The finding is that a company with a nine-" +
          "figure carbon liability, a Fortune 500 listing, a " +
          "Foundation, a medal from an independent institute and " +
          "158,000 employees has been running a litany of " +
          "offences at a scale that required a " +
          "certification programme to be built specifically to " +
          "hide them.\n\n" +
          "They built the verifier.\n\n" +
          "They did not do that because they were hiding " +
          "something small. You do not build a " +
          "verification standard for a small thing.\n\n" +
          "WHAT HAPPENS NOW\n\n" +
          "Nothing, for a while. The Brazilian proceedings will " +
          "be settled. There will be an award, and it will be " +
          "received, and the chairman will give thanks to the " +
          "independent judges who wrote the framework. The Institute " +
          "will continue to fund itself from member subscription. " +
          "The settlement clause will remain in the deed. The " +
          "pencil book will remain in the room.\n\n" +
          "And this will be here.\n\n" +
          "We did not hide it well. We could not. There is no " +
          "skill at concealment that survives a corporation " +
          "writing its own filing requirements, because the " +
          "filing requirements are the part of the building that " +
          "everybody can read.\n\n" +
          "— Someone inside",
      },
    ],
  };

  /* --- Terminal filesystem view -------------------------------------------
     A parallel structure to ARCHIVE so the terminal never has to reason about
     encoding. `size` is invented but consistent.                            */
  const FS = {};
  ARCHIVE.files.forEach(function (f) {
    const dir = f.path.slice(0, f.path.lastIndexOf("/")) || "/";
    if (!FS[dir]) FS[dir] = [];
    FS[dir].push({
      name: f.path.slice(f.path.lastIndexOf("/") + 1),
      id: f.id,
      size: f.enc ? Math.floor(4000 + (f.id.length * 811) % 9000) : 8000 + (f.id.charCodeAt(0) * 137) % 24000,
      date: f.date,
      enc: f.enc || null,
      cls: f.tags.indexOf("press") > -1 ? "PUBLIC" : "RESTRICTED",
    });
  });
  Object.keys(FS).forEach(function (k) {
    FS[k].sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });
  });

  const DECODERS = ["b64", "hex", "rot13"];

  return {
    COMPANY: COMPANY,
    MISSION: MISSION,
    VISION: VISION,
    VALUES: VALUES,
    STRATEGY: STRATEGY,
    DIVISIONS: DIVISIONS,
    SITES: SITES,
    PEOPLE: PEOPLE,
    CLUES: CLUES,
    PROGRAMS: PROGRAMS,
    ARCHIVE: ARCHIVE,
    FS: FS,
    DECODERS: DECODERS,
  };
})();