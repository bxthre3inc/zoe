# Day 2: OpEx Raw Data Collection

## LoRa Module Pricing (Volume)

| Source | Module | 1-999 pcs | 1000+ pcs | 10K+ pcs |
|--------|--------|-----------|-----------|----------|
| Fanstel (LR62E) | SX1262 | $8.00 | $7.32 | Contact |
| RAK Wireless | SX1262 | $11.00 | - | - |
| Alibaba (generic) | SX1262 | $4.93-$5.48 | ~$4.00 est | ~$3.00 est |
| EBYTE (CDEbyte) | E22-400T30S | ~$5.00 | ~$4.00 | ~$3.00 |

**Key Finding:** Volume pricing likely $3-$5 at 10K+ units. User assumption of chip-level integration should target $2-$4 range.

---

## Component BOM Estimate (Agricultural IoT Sensor)

### Reference: LoRa Soil Moisture Sensor (Makerfabs, RAK Wireless)

| Component Category | Retail/Module | Target BOM @ 100K+ | Notes |
|-------------------|-------------|-------------------|-------|
| LoRa Radio | $5-$11 | $2-$4 | SX1262 chip or module |
| MCU (STM32, nRF52) | $2-$5 | $1-$3 | Volume pricing |
| Soil Moisture Sensor | $3-$10 | $1-$3 | Capacitive type |
| Temperature/Humidity | $1-$3 | $0.50-$1.50 | AHT10 or similar |
| Battery/Power Circuit | $2-$5 | $1-$3 | Solar + LiPo |
| PCB | $1-$3 | $0.50-$1.50 | 2-layer, 4-layer |
| Enclosure | $2-$5 | $1-$3 | IP67 outdoor rated |
| Antenna/Connectors | $1-$3 | $0.50-$1.00 | |
| Misc (passives, etc.) | $1-$2 | $0.50-$1.00 | |
| **Total BOM** | **$18-$47** | **$8-$20** | |

**User Assumption: $12-$15 BOM** → Appears VALIDATED at volume (100K+ units). Higher volumes (500K+) could push to $8-$12.

---

## Labor Cost Validation (Colorado)

### BLS Data - Manufacturing Occupations (May 2024)

| Role | National Mean Hourly | National Mean Annual | CO Estimate |
|------|---------------------|---------------------|-------------|
| Assemblers & Fabricators | $18.50 | $38,480 | $40,000-$45,000 |
| Production Supervisors | $32.00 | $66,560 | $70,000-$80,000 |
| Inspectors/Testers | $22.00 | $45,760 | $48,000-$55,000 |
| Team Assemblers | $17.50 | $36,400 | $38,000-$42,000 |

**Colorado Premium:** ~5-10% above national average

### User Assumption: 25-person crew

| Role | Count | Salary Range | Annual Cost |
|------|-------|--------------|-------------|
| Production Manager | 1 | $80K-$100K | $90,000 |
| Shift Supervisors | 2 | $65K-$80K | $145,000 |
| Assembly Technicians | 12 | $40K-$50K | $540,000 |
| Test/QA Technicians | 4 | $45K-$55K | $200,000 |
| Material Handlers | 4 | $35K-$45K | $160,000 |
| Maintenance Tech | 2 | $55K-$70K | $125,000 |
| **Total** | **25** | | **$1.26M-$1.6M** |

**User Assumption: ~$1.6M (fully loaded)** → VALIDATED with ~20% buffer

---

## Real Estate OpEx

### User Assumption: ~48,000 sq ft facility

| Metric | Value | Annual Cost |
|--------|-------|-------------|
| Lease Rate (CO Springs) | $11.51/sq ft | $552,480 |
| NNN (taxes/insurance/maint) | $2-$4/sq ft | $96,000-$192,000 |
| **Total Real Estate** | | **$648K-$744K** |

**User's $162M / 10 years = $16.2M/year total OpEx**
Real estate is ~4-5% of total → reasonable

---

## Utilities & Operating Costs

### Electricity
- Colorado industrial: $0.08-$0.12/kWh
- Estimated consumption: 500-800 kW peak
- Annual estimate: $200K-$400K

### Other Utilities
- Water: $15K-$30K/year
- Gas/Heat: $20K-$40K/year
- Internet/Connectivity: $10K-$20K/year
- **Subtotal Utilities:** $245K-$490K/year

---

## Critical Open Question: Sensor Failure Rate

User assumption: 5% annual failure rate
- 10M sensors deployed (at 5,000/day for 5 years)
- 5% = 500K replacements/year
- 500K × $15 BOM + labor = ~$10M+ in replacement costs alone

**This could break the $162M 10-year OpEx model**

Need: Research on actual agricultural IoT sensor MTBF/field failure rates

---

## Next: Day 3 Analysis Tasks

- [ ] Compile failure rate research
- [ ] Build full OpEx model
- [ ] Sensitivity analysis
- [ ] Final validation assessment
- [ ] Risk flags and recommendations
