# IRRIG8 CapEx/OpEx Validation Research Plan
**ZERO BUDGET | 3-DAY SPRINT**

## Executive Summary
Rapid validation of $8.3M CapEx and $162.1M 10-year OpEx using only free/public data sources. Target: ±25% accuracy (acceptable for preliminary validation).

---

## DAY 1: CAPEX VALIDATION (Public Data Only)

### Morning: Equipment Pricing (Web Research)

**Injection Molding Machines:**
- Haitian: Check haitian.com/international for pricing pages, press releases with investment figures
- Engel: engelglobal.com for machine catalogs with price ranges
- Arburg: arburg.com for used/new pricing
- **Hack:** Search "[company] invests $X million injection molding" for real facility costs

**SMT/PCBA Equipment:**
- Yamaha: yamaha-motor-im.com for product specs (contact for pricing → get ranges from press releases)
- Juki: juki.co.jp for investor reports with CapEx figures
- Panasonic: Look for investor presentations on SMT market

**Free Data Sources:**
- SEC 10-Ks: Search "injection molding facility" "CapEx" for public manufacturing companies
- Investor presentations: Desktop Metal, Markforged, Stratasys (benchmark factory costs)
- Equipment auction sites: machinio.com, equipnet.com for used pricing
- Industry forums: r/manufacturing, r/plastics, r/electronics for anecdotal pricing

### Afternoon: Real Estate & Facility (Free Sources)

**Free Sources:**
- LoopNet public listings (free tier) for industrial space in Colorado/Texas/Ohio
- Census Bureau: Manufacturing costs by state
- BLS: Construction cost indexes
- CBRE free reports: Industrial market reports (quarterly, free download)
- JLL: Free industrial real estate reports

**Key Searches:**
- "industrial manufacturing facility cost per square foot 2024"
- "Colorado industrial lease rates 2024"
- "cleanroom construction cost ISO 7"

### Evening: Comparable Facilities (Public Financials)

**Target Companies for Benchmarking:**
| Company | Why | Data Source |
|---------|-----|-------------|
| Semtech | LoRa sensor manufacturing | 10-K, investor deck |
| Sensirion | Environmental sensors | Annual report (Swiss, free) |
| Sensus/Xylem | Water meters | 10-K, acquisition disclosures |
| Badger Meter | Flow sensors | 10-K, manufacturing cost breakdown |
| Itron | Smart meters | 10-K, facility disclosures |
| Telit/Thales | IoT modules | Acquisition docs, investor decks |

**What to Extract:**
- Manufacturing facility CapEx from 10-K property/equipment schedules
- Revenue per square foot ratios
- Headcount per revenue metrics
- Gross margin (indicates BOM vs. overhead split)

---

## DAY 2: OPEX VALIDATION (Free Data Only)

### Morning: BOM Component Pricing

**Strategy: Build pricing from public sources**

| Component | Free Sources |
|-----------|--------------|
| LoRa module | Semtech product briefs, distributor pricing (DigiKey, Mouser public), FCC docs |
| Soil moisture sensor | DigiKey, Mouser (public pricing), Alibaba (negotiated pricing visible) |
| PCB (4-layer) | PCBShopper.com (instant quotes, no signup), JLCPCB public pricing |
| Enclosure | Protolabs design analysis (free), Xometry instant quotes |
| Battery | Battery University data, distributor pricing |
| Solar panel | EnergySage, NREL cost data |
| MCU/Processor | DigiKey, Mouser, STMicro/Nordic public pricing pages |

**Volume Pricing Hack:**
- Search "[component] 100k pricing" "[component] volume discount"
- Academic papers on IoT sensor BOM costs (often have detailed breakdowns)
- Crowdfunding campaigns (Kickstarter/Indiegogo) with BOM disclosures in updates

### Afternoon: Labor & Operating Costs

**Free Sources:**
- BLS Occupational Employment Statistics (OES): Manufacturing wages by state
- Glassdoor (free tier): Salaries for manufacturing roles
- PayScale (free tier): Compensation data
- MIT Living Wage Calculator: Baseline labor costs
- Census Bureau: Manufacturing employment costs

**Facility Operating Costs:**
- EIA.gov: Industrial electricity rates by state
- NREL: Manufacturing energy intensity data
- EPA: Water/sewer rate surveys (public data)
- Insurance: Free quotes from multiple brokers (no commitment)

### Evening: Failure Rate & Lifespan Research

**Academic Sources:**
- Google Scholar: "IoT sensor reliability" "agricultural sensor failure rate"
- IEEE Xplore (free abstracts): Sensor network reliability studies
- ResearchGate: Papers on LoRa sensor deployment longevity

**Industry Sources:**
- AgTech company whitepapers (free downloads)
- USDA NASS: Equipment lifespan data
- Semtech case studies: Actual deployment data

---

## DAY 3: ANALYSIS & VALIDATION

### Morning: Model Building

Build validation model in spreadsheet:
- CapEx: Low/base/high ranges from Day 1 data
- OpEx: Per-unit costs from Day 2 data
- Sensitivity: Monte Carlo with free tools (Python/numpy, or Google Sheets)

**Key Validation Checks:**
1. Does $8.3M fit within comparable facility CapEx ranges?
2. Does $12-15 BOM fit component pricing at 100K-1M volume?
3. Does $0.16/acre/year cover all costs including replacement?
4. Is 5% failure rate supported by research?

### Afternoon: Report Writing

**Deliverables:**
1. Validated CapEx range with source citations
2. Validated OpEx range with source citations
3. Gap analysis (where assumptions diverge from data)
4. Recommendations for PPP pitch

---

## FREE DATA SOURCE INVENTORY

### Financial Data (100% Free)
| Source | URL | What You Get |
|--------|-----|--------------|
| SEC EDGAR | sec.gov/edgar | 10-K, 10-Q, 8-K filings |
| Company IR sites | [company].com/investors | Investor presentations |
| Crunchbase (free tier) | crunchbase.com | Funding rounds, facility investments |
| Pitchbook (free news) | pitchbook.com | M&A with disclosed facility costs |

### Equipment Pricing (Free)
| Source | What You Get |
|--------|--------------|
| machinio.com | Used equipment prices |
| equipnet.com | Auction prices |
| YouTube manufacturing channels | Walkthroughs with cost mentions |
| Industry forums | Anecdotal pricing |

### Real Estate (Free)
| Source | What You Get |
|--------|--------------|
| LoopNet (free) | Listings with $/sqft |
| CBRE research | Free quarterly reports |
| JLL research | Free market reports |
| Census Bureau | Cost data by region |

### Component Pricing (Free)
| Source | What You Get |
|--------|--------------|
| DigiKey.com | Public pricing (no volume, but baseline) |
| Mouser.com | Public pricing |
| JLCPCB.com | Instant PCB quotes |
| PCBShopper.com | PCB price comparison |
| Alibaba.com | Volume pricing (request quotes, no obligation) |
| 1688.com | Chinese domestic pricing (translate) |

### Labor Data (Free)
| Source | What You Get |
|--------|--------------|
| BLS OES | Wages by occupation/region |
| Glassdoor | Company-specific salaries |
| PayScale | Compensation ranges |
| MIT Living Wage | Baseline calculations |

### Research Papers (Free)
| Source | What You Get |
|--------|--------------|
| Google Scholar | Academic papers |
| ResearchGate | Full papers (often) |
| arXiv.org | Preprints |
| Semtech case studies | Deployment data |
| USDA publications | Agricultural equipment data |

---

## 3-DAY EXECUTION CHECKLIST

### Day 1 Tasks
- [ ] Collect 5+ 10-Ks from comparable manufacturers
- [ ] Extract facility CapEx from financials
- [ ] Gather equipment pricing from 3+ free sources
- [ ] Compile real estate cost data for target states
- [ ] Document all sources with URLs

### Day 2 Tasks
- [ ] Build BOM from public distributor pricing
- [ ] Research labor costs from BLS/Glassdoor
- [ ] Gather utility rates from EIA
- [ ] Search for sensor reliability studies
- [ ] Compile failure rate evidence

### Day 3 Tasks
- [ ] Build validation model
- [ ] Run sensitivity analysis
- [ ] Write findings report
- [ ] Prepare recommendations
- [ ] Package all sources/citations

---

## EXPECTED OUTCOMES (3-Day, Zero Budget)

| Metric | Original | Expected Validated Range | Confidence |
|--------|----------|--------------------------|------------|
| CapEx | $8.3M | $6M-$15M | ±40% |
| BOM per sensor | $12-15 | $10-$25 | ±30% |
| Annual OpEx/acre | $0.16 | $0.12-$0.35 | ±35% |
| 10-year TCO | $162.1M | $120M-$250M | ±30% |
| Failure rate | 5% | 2%-8% (wide range) | Low |

**Acceptable for:** Preliminary PPP pitch, investor conversations, grant applications
**Not acceptable for:** Final investment decisions, detailed engineering

---

## RISK: VALIDATION LIMITATIONS

**What we WON'T get with zero budget:**
- Vendor quotes (only list prices or used market)
- Industry reports with detailed benchmarks
- Expert interviews (unless cold LinkedIn outreach works)
- Site-specific data

**Mitigation:**
- Use wide ranges to reflect uncertainty
- Cite sources transparently
- Flag high-uncertainty areas
- Recommend paid validation before final commitments

---

**Start Date:** TBD
**Budget:** $0
**Timeline:** 72 hours
**Target Accuracy:** ±25-40% (directionally correct)
