# Master Specification: Hydraulic Dithering Scheduler V1.0

**Role**: ISN/SSN Fleet Anti-Hammer Orchestration | **Hosted On**: PMT Field Aggregator

The Hydraulic Dithering Scheduler (HDS) is a PMT-resident firmware module that staggers solenoid actuation commands across the ISN and SSN fleet to prevent simultaneous open/close events — the root cause of **water hammer** in a center-pivot mainline.

## 1. The Problem: Simultaneous Actuation

On a Tier 3 (nVRI) field with 125 ISNs, a naïve prescription update (e.g., transitioning from "low-water zone" to "high-water zone") would command all 125 ISNs to open simultaneously. The instantaneous pressure wave from this event can:

- Burst flexible span couplings (rated for sustained pressure, not transient spikes)
- Surge the pump motor beyond its rated amperage
- Cause resonant oscillation down the mainline ("pipe organ" effect)

## 2. Dithering Algorithm

The HDS operates on a **Zone-Stagger** + **Duty-Dither** dual-layer approach.

### 2.1 Zone-Stagger (Coarse Layer)

The 125 ISNs are divided into 25 multicast zones. On a prescription transition, zones are activated sequentially with a configurable inter-zone delay.

```
DEFAULT INTER-ZONE DELAY: 80ms
TOTAL STAGGER WINDOW: 25 zones × 80ms = 2.0 seconds
```

This converts a 0ms simultaneous spike into a controlled 2-second ramp, reducing peak pressure transient by >90%.

### 2.2 Duty-Dither (Fine Layer)

Within each zone, individual ISN PWM duty cycles are offset by a small phase angle so their ON pulses never coincide.

```
DUTY CYCLE: 0-100% in 5ms slots
DITHER OFFSET: Node_Index × (slot_period / zone_size)
```

Example for Zone 3, 5 ISNs at 60% duty:

```
ISN #1: ON from t=0ms   to t=30ms
ISN #2: ON from t=1ms   to t=31ms
ISN #3: ON from t=2ms   to t=32ms
ISN #4: ON from t=3ms   to t=33ms
ISN #5: ON from t=4ms   to t=34ms
```

Peak simultaneous flow: **1 ISN** at any given millisecond. Not 5.

## 3. SSN Coordination

Smart Section Nodes (SSNs) are the "bulk actuators" — they affect the entire span's flow volume. SSN transitions are always scheduled **before** ISN commands in the same zone to pre-condition pressure.

```
SEQUENCE: SSN → wait 200ms → ISN Zone 1 → wait 80ms → ISN Zone 2 ...
```

## 4. Emergency Shutdown (ESD) Protocol

If the PFA pressure anchor reports a pressure spike exceeding **+15% of baseline** mid-schedule:

1. The PMT broadcasts a **HALT** command to all active zones.
2. The HDS enters **"Safe Drain Mode"** — all ISNs step to 10% duty (not closed) to allow controlled pressure bleed.
3. After 3s bleed, ISNs close in reverse-zone-stagger order.
4. PMT logs the event and flags the affected prescription segment for operator review.

## 5. Configuration Parameters

| Parameter | Default | Range | Description |
| :--- | :--- | :--- | :--- |
| `zone_stagger_ms` | 80ms | 20–500ms | Delay between zone activations |
| `dither_slot_ms` | 1ms | 0.5–5ms | Per-ISN phase offset within zone |
| `ssn_pre_delay_ms` | 200ms | 50–500ms | Wait after SSN before ISN zone 1 |
| `esd_threshold_pct` | 15% | 5–25% | PFA pressure spike ESD trigger |
| `drain_duty_pct` | 10% | 5–20% | ISN duty cycle during Safe Drain Mode |

---
*Spec Classification: Fleet Safety Orchestration | Version: V1.0 | Protocol: LoRa Mesh 2.1*
