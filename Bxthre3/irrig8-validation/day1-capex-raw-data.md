# Day 1: CapEx Raw Data Collection

## Comparable Company Analysis

### Badger Meter (BMI) - Water Meter Manufacturing
- **Source:** Milwaukee Business Journal, Nov 2023
- **CapEx:** $30 million invested since 2020
- **Context:** $5M specific project at Racine plant for capacity expansion
- **Implication:** Small-to-medium manufacturing expansion costs ~$5-30M range

### Xylem/Sensus
- **Acquisition Price:** $1.7 billion (2016)
- **Context:** Smart meter company with established manufacturing
- **Relevance:** Shows water/meter market valuations, not direct CapEx guidance

---

## Equipment Pricing Data

### Injection Molding Machines

| Specification | Used Market | New (Chinese) | New (Premium) |
|--------------|-------------|---------------|---------------|
| 100-150 ton | $15,000-$25,000 | $150,000-$170,000 | $250,000+ |
| 160-200 ton | $12,000-$25,000 (Alibaba used) | ~$180,000 | $300,000+ |
| 250 ton | $12,000+ (used) | $150,000-$200,000 | $400,000+ |

**Sources:**
- Alibaba listings for Haitian/Haida machines
- MachinePoint used equipment listings
- Facebook marketplace used equipment groups

### SMT/PCBA Equipment (Indicative Pricing)

| Equipment Type | Used Market | New Entry Level | High-End |
|----------------|-------------|-----------------|----------|
| Pick & Place Machine | €20,000-€200,000 (Exapro) | $50,000-$100,000 | $200,000-$500,000 |
| Reflow Oven | $10,000-$30,000 | $30,000-$60,000 | $100,000+ |
| AOI Inspection | $15,000-$40,000 | $40,000-$80,000 | $150,000+ |
| Stencil Printer | $5,000-$15,000 | $15,000-$30,000 | $50,000+ |

**Source:** PCBMaster equipment guide, RayPCB pricing data

---

## Real Estate - Colorado Market

| Market | Lease Rate (2024-2025) | Source |
|--------|------------------------|--------|
| Colorado Springs | $11.51/sq ft | NavPoint Real Estate Q1 2025 |
| National Average | $9.12/sq ft | Cushman & Wakefield Q2 2025 |
| Denver Area | $8-$12/sq ft | CBRE/JLL reports |
| Midwest Secondary | $6-$8/sq ft | Red Stag Fulfillment |

**Note:** Colorado Springs rate is ABOVE national average - tighten OpEx assumptions if using this location.

---

## Factory Size Estimation

### Required Space Calculation (Irrig8 Hypothesis)

| Function | Estimated Sq Ft | Notes |
|----------|-----------------|-------|
| Injection molding (4 lines) | 15,000 | 3,750 per line with material storage |
| SMT/PCBA assembly | 8,000 | Cleanroom environment |
| Final assembly & test | 6,000 | ESD workstations |
| Warehouse/FG storage | 10,000 | 30-60 days inventory |
| Office/engineering | 5,000 | 25 people |
| Utilities/mechanical | 4,000 | HVAC, electrical, compressed air |
| **Total** | **48,000 sq ft** | |

---

## Preliminary CapEx Validation Assessment

### User Assumption: $8.3M CapEx

| Category | Low Estimate | High Estimate | User Target |
|----------|------------|---------------|-------------|
| Building/Fit-out | $1.5M | $3.0M | ~$2.0M |
| Injection Molding (4 lines) | $0.6M | $1.2M | ~$0.8M |
| SMT/PCBA Lines (2) | $0.4M | $1.0M | ~$0.6M |
| Tooling/Molds | $1.0M | $2.5M | ~$1.5M |
| Test Equipment | $0.3M | $0.6M | ~$0.4M |
| IT/Software/ERP | $0.2M | $0.5M | ~$0.3M |
| Working Capital/Buffer | $1.5M | $3.0M | ~$2.5M |
| **TOTAL** | **$5.5M** | **$11.8M** | **$8.3M** |

**Initial Assessment:** $8.3M falls within the feasible range but leans toward the optimistic side if using new equipment and Colorado real estate. Risk: Tooling costs for sensor enclosures could be higher than estimated.

---

## Next: Day 2 Tasks

- [ ] LoRa module BOM pricing at volume
- [ ] Colorado manufacturing wages (BLS data)
- [ ] Sensor component pricing (MCU, sensors, power)
- [ ] Utility cost validation
- [ ] IoT sensor failure rate research
