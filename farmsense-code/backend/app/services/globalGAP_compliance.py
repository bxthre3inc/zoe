"""
FarmSense GLOBALG.A.P. Compliance Report Generator
===================================================

Generates machine-readable and human-readable compliance reports aligned with:
  - GLOBALG.A.P. IFA v6 Standard (Integrated Farm Assurance)
  - AF  — All Farm Base (mandatory)
  - CB  — Crops Base (mandatory for produce)
  - FV  — Fruits & Vegetables module (mandatory for SLV produce)
  - Annex-AG5.2: Irrigation Water Management (critical for water-stressed regions)

FarmSense sensor data maps directly to GLOBALG.A.P. control points:
  ┌──────────────────────────────────────┬──────────────────────────────┐
  │ Control Point                        │ FarmSense Data Source        │
  ├──────────────────────────────────────┼──────────────────────────────┤
  │ AF 1.2 — Site History & Management   │ field_id + historical scans  │
  │ CB 5.2 — Irrigation Water Source     │ Basin extraction logs        │
  │ CB 5.3 — Water Application Method    │ Valve event records          │
  │ CB 5.5 — Water Quality Records       │ EC/pH sensor stream          │
  │ FV 5.1 — Water Efficiency Targets    │ Deficit-reduction metrics    │
  │ AG5.2  — Water Metering & Reports    │ DHU volumetric logs          │
  └──────────────────────────────────────┴──────────────────────────────┘

Output format:
  - JSON report object (machine-readable, API response)
  - Markdown narrative (human-readable, for submission PDFs)
  - Compliance score per control-point (0.0 – 1.0)
  - Certification status: PASS / MINOR_NC / MAJOR_NC / CRITICAL_NC
"""

from __future__ import annotations

import hashlib
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timeZone
from enum import Enum
from typing import Optional


# ──────────────────────────────────────────────
# Control Point Registry (IFA v6)
# ──────────────────────────────────────────────

class NCLevel(str, Enum):
    PASS        = "pass"
    MINOR_NC    = "minor_nc"      # Minor non-conformance: corrective action required
    MAJOR_NC    = "major_nc"      # Major: suspension risk
    CRITICAL_NC = "critical_nc"   # Critical: immediate suspension


class ControlPointID(str, Enum):
    AF_1_2 = "AF_1.2"   # Site history & risk assessment
    CB_5_2 = "CB_5.2"   # Irrigation water source documentation
    CB_5_3 = "CB_5.3"   # Application method (drip, flood, etc.)
    CB_5_5 = "CB_5.5"   # Water quality monitoring (EC, pH, microbio)
    FV_5_1 = "FV_5.1"   # Water efficiency targets and achievement
    AG5_2  = "AG_5.2"   # Water metering, volumetric reporting


CONTROL_POINT_DESCRIPTIONS = {
    ControlPointID.AF_1_2: "Site History & Risk Assessment",
    ControlPointID.CB_5_2: "Irrigation Water Source Documentation",
    ControlPointID.CB_5_3: "Irrigation Application Method",
    ControlPointID.CB_5_5: "Irrigation Water Quality Monitoring",
    ControlPointID.FV_5_1: "Water Efficiency Targets & Achievement",
    ControlPointID.AG5_2:  "Water Metering & Volumetric Reporting",
}

# Weights for overall certification score (must sum to 1.0)
CONTROL_POINT_WEIGHTS = {
    ControlPointID.AF_1_2: 0.10,
    ControlPointID.CB_5_2: 0.15,
    ControlPointID.CB_5_3: 0.15,
    ControlPointID.CB_5_5: 0.25,
    ControlPointID.FV_5_1: 0.20,
    ControlPointID.AG5_2:  0.15,
}


# ──────────────────────────────────────────────
# Data Structures
# ──────────────────────────────────────────────

@dataclass
class ControlPointResult:
    control_point_id: str
    description: str
    score: float                      # 0.0 – 1.0
    level: NCLevel
    evidence: list[str]               # Evidence strings from FarmSense data
    findings: list[str]               # GLOBALG.A.P. auditor-style findings
    corrective_actions: list[str]     # Required before next audit


@dataclass
class GAP_FieldInputs:
    """All FarmSense-derived metrics needed for a GLOBALG.A.P. evaluation."""
    field_id: str
    field_name: str
    farm_name: str
    grower_id: str
    report_period_start: str
    report_period_end: str

    # CB 5.2 — Water source
    water_source_type: str                  # "groundwater", "surface", "municipal", "recycled"
    water_source_documented: bool           # Permit/documentation on file

    # CB 5.3 — Application method
    application_method: str                 # "drip", "sprinkler", "flood", "subsurface"
    application_method_documented: bool

    # CB 5.5 — Water quality
    avg_ec_us_cm: float                     # Electrical conductivity microsiemens/cm
    min_ph: float
    max_ph: float
    microbiological_test_conducted: bool    # At least once per season
    ec_within_threshold: bool               # EC < 2500 µS/cm for GLOBALG.A.P.
    ph_within_threshold: bool               # pH 5.5 – 8.5

    # FV 5.1 — Efficiency
    season_water_applied_m3: float
    prev_season_water_applied_m3: float     # For year-over-year comparison
    documented_efficiency_target: bool       # Written target exists
    efficiency_target_pct: float            # Target reduction vs prev year (%)
    actual_efficiency_gain_pct: float       # What was achieved

    # AG5.2 — Metering
    calibrated_meter_installed: bool
    meter_last_calibration_date: Optional[str]  # ISO date
    monthly_meter_logs: bool               # At least 12 logs in period
    total_metered_volume_m3: float

    # AF1.2 — Site history
    site_risk_assessment_date: Optional[str]   # ISO date
    previous_land_use_documented: bool
    restricted_substances_audit: bool


@dataclass
class GAP_Report:
    report_id: str
    field_id: str
    field_name: str
    farm_name: str
    grower_id: str
    period_start: str
    period_end: str
    generated_at: str
    globalGAP_standard: str = "IFA v6.0 — FV Module"

    control_points: list[ControlPointResult] = field(default_factory=list)
    overall_score: float = 0.0
    certification_status: NCLevel = NCLevel.PASS
    summary_narrative: str = ""
    markdown_report: str = ""
    verifiable_hash: str = ""   # SHA-256 of report data for audit chain


# ──────────────────────────────────────────────
# Core Engine
# ──────────────────────────────────────────────

class GAPComplianceEngine:
    """Generates GLOBALG.A.P. IFA v6 compliance reports from FarmSense data."""

    def generate(self, inputs: GAP_FieldInputs) -> GAP_Report:
        now = datetime.now(timeZone.utc).isoformat()
        report_id = f"GAP-{inputs.field_id[:8].upper()}-{uuid.uuid4().hex[:6].upper()}"

        results: list[ControlPointResult] = []

        # ── AF 1.2 — Site History ──────────────────────────────────────
        af12 = self._evaluate_af12(inputs)
        results.append(af12)

        # ── CB 5.2 — Water Source ──────────────────────────────────────
        cb52 = self._evaluate_cb52(inputs)
        results.append(cb52)

        # ── CB 5.3 — Application Method ───────────────────────────────
        cb53 = self._evaluate_cb53(inputs)
        results.append(cb53)

        # ── CB 5.5 — Water Quality ────────────────────────────────────
        cb55 = self._evaluate_cb55(inputs)
        results.append(cb55)

        # ── FV 5.1 — Efficiency ───────────────────────────────────────
        fv51 = self._evaluate_fv51(inputs)
        results.append(fv51)

        # ── AG 5.2 — Metering ─────────────────────────────────────────
        ag52 = self._evaluate_ag52(inputs)
        results.append(ag52)

        # ── Overall Score ──────────────────────────────────────────────
        overall_score = sum(
            r.score * CONTROL_POINT_WEIGHTS.get(ControlPointID(r.control_point_id), 0.0)
            for r in results
        )

        # Determine overall certification status
        levels = [r.level for r in results]
        if NCLevel.CRITICAL_NC in levels:
            cert_status = NCLevel.CRITICAL_NC
        elif NCLevel.MAJOR_NC in levels:
            cert_status = NCLevel.MAJOR_NC
        elif NCLevel.MINOR_NC in levels:
            cert_status = NCLevel.MINOR_NC
        else:
            cert_status = NCLevel.PASS

        # ── Narrative + Markdown ───────────────────────────────────────
        narrative = self._build_narrative(inputs, results, overall_score, cert_status)
        markdown  = self._build_markdown(inputs, results, overall_score, cert_status, report_id, now)

        # ── Verifiable Hash ────────────────────────────────────────────
        hash_input = f"{report_id}:{inputs.field_id}:{inputs.report_period_start}:{inputs.report_period_end}:{overall_score:.4f}:{cert_status.value}"
        vhash = hashlib.sha256(hash_input.encode()).hexdigest()

        return GAP_Report(
            report_id=report_id,
            field_id=inputs.field_id,
            field_name=inputs.field_name,
            farm_name=inputs.farm_name,
            grower_id=inputs.grower_id,
            period_start=inputs.report_period_start,
            period_end=inputs.report_period_end,
            generated_at=now,
            control_points=results,
            overall_score=round(overall_score, 4),
            certification_status=cert_status,
            summary_narrative=narrative,
            markdown_report=markdown,
            verifiable_hash=vhash,
        )

    # ── Control Point Evaluators ──────────────────────────────────────────

    def _evaluate_af12(self, i: GAP_FieldInputs) -> ControlPointResult:
        score = 0.0
        evidence, findings, actions = [], [], []

        if i.site_risk_assessment_date:
            score += 0.5
            evidence.append(f"Site risk assessment on file: {i.site_risk_assessment_date}")
        else:
            findings.append("No site risk assessment date recorded.")
            actions.append("Complete a documented site risk assessment before next audit.")

        if i.previous_land_use_documented:
            score += 0.3
            evidence.append("Previous land use history documented.")
        else:
            findings.append("Previous land use history not documented.")
            actions.append("Document farm history for at least 5 years prior to current use.")

        if i.restricted_substances_audit:
            score += 0.2
            evidence.append("Restricted substance audit completed.")
        else:
            findings.append("Restricted substance audit not completed.")
            actions.append("Conduct and document a restricted substance soil/water audit.")

        level = self._score_to_level(score, critical_threshold=0.0, major_threshold=0.5, minor_threshold=0.8)
        return ControlPointResult(ControlPointID.AF_1_2.value, CONTROL_POINT_DESCRIPTIONS[ControlPointID.AF_1_2], round(score, 3), level, evidence, findings, actions)

    def _evaluate_cb52(self, i: GAP_FieldInputs) -> ControlPointResult:
        score = 0.0
        evidence, findings, actions = [], [], []

        if i.water_source_type in ["groundwater", "surface", "municipal", "recycled"]:
            score += 0.5
            evidence.append(f"Water source type identified: {i.water_source_type}")
        else:
            findings.append(f"Water source type '{i.water_source_type}' not recognized.")

        if i.water_source_documented:
            score += 0.5
            evidence.append("Water source permit/documentation on file.")
        else:
            findings.append("Water source not formally documented (permit, well log, or water right).")
            actions.append("Obtain and file water right documentation or well completion report.")

        level = self._score_to_level(score, critical_threshold=0.0, major_threshold=0.5, minor_threshold=0.9)
        return ControlPointResult(ControlPointID.CB_5_2.value, CONTROL_POINT_DESCRIPTIONS[ControlPointID.CB_5_2], round(score, 3), level, evidence, findings, actions)

    def _evaluate_cb53(self, i: GAP_FieldInputs) -> ControlPointResult:
        score = 0.0
        evidence, findings, actions = [], [], []

        RECOGNIZED_METHODS = {"drip", "sprinkler", "flood", "subsurface", "pivot"}
        if i.application_method.lower() in RECOGNIZED_METHODS:
            score += 0.6
            evidence.append(f"Application method specified: {i.application_method}")
        else:
            findings.append(f"Application method '{i.application_method}' not in recognized list.")

        if i.application_method_documented:
            score += 0.4
            evidence.append("Application method formally documented.")
        else:
            findings.append("Application method not documented in farm records.")
            actions.append("Document irrigation application method, frequency, and seasonal schedule.")

        level = self._score_to_level(score, critical_threshold=0.0, major_threshold=0.4, minor_threshold=0.8)
        return ControlPointResult(ControlPointID.CB_5_3.value, CONTROL_POINT_DESCRIPTIONS[ControlPointID.CB_5_3], round(score, 3), level, evidence, findings, actions)

    def _evaluate_cb55(self, i: GAP_FieldInputs) -> ControlPointResult:
        score = 0.0
        evidence, findings, actions = [], [], []

        if i.ec_within_threshold:
            score += 0.3
            evidence.append(f"Mean EC {i.avg_ec_us_cm:.0f} µS/cm — within GLOBALG.A.P. threshold (<2500).")
        else:
            findings.append(f"EC {i.avg_ec_us_cm:.0f} µS/cm exceeds GLOBALG.A.P. threshold of 2500 µS/cm.")
            actions.append("Investigate high EC source; document mitigation (dilution, source change).")

        if i.ph_within_threshold:
            score += 0.3
            evidence.append(f"pH range {i.min_ph:.1f}–{i.max_ph:.1f} — within acceptable range (5.5–8.5).")
        else:
            findings.append(f"pH range {i.min_ph:.1f}–{i.max_ph:.1f} outside acceptable range.")
            actions.append("Adjust irrigation water pH or document treatment protocol.")

        if i.microbiological_test_conducted:
            score += 0.4
            evidence.append("Microbiological water quality test conducted this season.")
        else:
            findings.append("No microbiological test on irrigation water found for this period.")
            actions.append("Conduct and file annual microbiological water quality test (E. coli, generic coliform).")

        level = self._score_to_level(score, critical_threshold=0.2, major_threshold=0.5, minor_threshold=0.8)
        return ControlPointResult(ControlPointID.CB_5_5.value, CONTROL_POINT_DESCRIPTIONS[ControlPointID.CB_5_5], round(score, 3), level, evidence, findings, actions)

    def _evaluate_fv51(self, i: GAP_FieldInputs) -> ControlPointResult:
        score = 0.0
        evidence, findings, actions = [], [], []

        if i.documented_efficiency_target:
            score += 0.3
            evidence.append(f"Written water efficiency target documented: {i.efficiency_target_pct:.1f}% reduction.")
        else:
            findings.append("No documented water efficiency target.")
            actions.append("Establish a written seasonal water efficiency target (e.g., 10% vs. prior season).")

        if i.actual_efficiency_gain_pct >= i.efficiency_target_pct and i.efficiency_target_pct > 0:
            score += 0.5
            evidence.append(f"Efficiency target met: {i.actual_efficiency_gain_pct:.1f}% actual vs {i.efficiency_target_pct:.1f}% target.")
        elif i.actual_efficiency_gain_pct > 0:
            score += 0.25
            findings.append(f"Efficiency target partially met: {i.actual_efficiency_gain_pct:.1f}% actual vs {i.efficiency_target_pct:.1f}% target.")
            actions.append("Review irrigation scheduling; consider variable-rate technology or SPAC-based algorithms.")
        else:
            findings.append("No measurable water efficiency improvement recorded this period.")

        yoy_delta = i.prev_season_water_applied_m3 - i.season_water_applied_m3
        if yoy_delta > 0:
            pct = yoy_delta / i.prev_season_water_applied_m3 * 100 if i.prev_season_water_applied_m3 > 0 else 0.0
            score += 0.2
            evidence.append(f"Year-over-year reduction: {pct:.1f}% ({yoy_delta:.0f} m³ saved).")
        else:
            findings.append("Water use did not decrease vs prior season.")

        level = self._score_to_level(score, critical_threshold=0.0, major_threshold=0.3, minor_threshold=0.7)
        return ControlPointResult(ControlPointID.FV_5_1.value, CONTROL_POINT_DESCRIPTIONS[ControlPointID.FV_5_1], round(score, 3), level, evidence, findings, actions)

    def _evaluate_ag52(self, i: GAP_FieldInputs) -> ControlPointResult:
        score = 0.0
        evidence, findings, actions = [], [], []

        if i.calibrated_meter_installed:
            score += 0.4
            evidence.append("Calibrated volumetric water meter installed.")
            if i.meter_last_calibration_date:
                evidence.append(f"Last calibration: {i.meter_last_calibration_date}")
        else:
            findings.append("No calibrated water meter installed.")
            actions.append("Install and calibrate a volumetric water meter. Annual calibration required.")

        if i.monthly_meter_logs:
            score += 0.4
            evidence.append("Monthly meter readings logged for full reporting period.")
        else:
            findings.append("Monthly meter logs incomplete; fewer than 12 entries in reporting period.")
            actions.append("Implement regular monthly meter reading protocol and record in farm log.")

        if i.total_metered_volume_m3 > 0:
            score += 0.2
            evidence.append(f"Total metered volume: {i.total_metered_volume_m3:,.1f} m³ for reporting period.")

        level = self._score_to_level(score, critical_threshold=0.0, major_threshold=0.4, minor_threshold=0.8)
        return ControlPointResult(ControlPointID.AG5_2.value, CONTROL_POINT_DESCRIPTIONS[ControlPointID.AG5_2], round(score, 3), level, evidence, findings, actions)

    # ── Helpers ──────────────────────────────────────────────────────────

    @staticmethod
    def _score_to_level(
        score: float,
        critical_threshold: float,
        major_threshold: float,
        minor_threshold: float,
    ) -> NCLevel:
        if score <= critical_threshold:
            return NCLevel.CRITICAL_NC
        if score < major_threshold:
            return NCLevel.MAJOR_NC
        if score < minor_threshold:
            return NCLevel.MINOR_NC
        return NCLevel.PASS

    @staticmethod
    def _build_narrative(
        inputs: GAP_FieldInputs,
        results: list[ControlPointResult],
        score: float,
        status: NCLevel,
    ) -> str:
        pass_count  = sum(1 for r in results if r.level == NCLevel.PASS)
        minor_count = sum(1 for r in results if r.level == NCLevel.MINOR_NC)
        major_count = sum(1 for r in results if r.level == NCLevel.MAJOR_NC)
        crit_count  = sum(1 for r in results if r.level == NCLevel.CRITICAL_NC)

        status_label  = {
            NCLevel.PASS:        "PASS — no non-conformances detected",
            NCLevel.MINOR_NC:    "MINOR NON-CONFORMANCE(S) — corrective actions required",
            NCLevel.MAJOR_NC:    "MAJOR NON-CONFORMANCE(S) — suspension risk unless corrected",
            NCLevel.CRITICAL_NC: "CRITICAL NON-CONFORMANCE — certification suspended",
        }[status]

        return (
            f"GLOBALG.A.P. IFA v6 compliance evaluation for {inputs.field_name} "
            f"({inputs.farm_name}) covering {inputs.report_period_start} to {inputs.report_period_end}. "
            f"Overall score: {score * 100:.1f}/100. Status: {status_label}. "
            f"Control point results: {pass_count} PASS, {minor_count} MINOR NC, "
            f"{major_count} MAJOR NC, {crit_count} CRITICAL NC."
        )

    @staticmethod
    def _build_markdown(
        inputs: GAP_FieldInputs,
        results: list[ControlPointResult],
        score: float,
        status: NCLevel,
        report_id: str,
        generated_at: str,
    ) -> str:
        STATUS_EMOJI = {
            NCLevel.PASS:        "✅ PASS",
            NCLevel.MINOR_NC:    "⚠️ MINOR NC",
            NCLevel.MAJOR_NC:    "🚨 MAJOR NC",
            NCLevel.CRITICAL_NC: "🛑 CRITICAL NC",
        }

        lines = [
            f"# GLOBALG.A.P. IFA v6 Compliance Report",
            f"",
            f"**Report ID:** `{report_id}`  ",
            f"**Generated:** {generated_at}  ",
            f"**Standard:** GLOBALG.A.P. IFA v6.0 — Fruits & Vegetables Module  ",
            f"",
            f"---",
            f"",
            f"## Farm & Field Details",
            f"| Field | {inputs.field_name} |",
            f"|---|---|",
            f"| Farm | {inputs.farm_name} |",
            f"| Grower ID | `{inputs.grower_id}` |",
            f"| Reporting Period | {inputs.report_period_start} → {inputs.report_period_end} |",
            f"",
            f"---",
            f"",
            f"## Certification Status",
            f"",
            f"**Overall Score: {score * 100:.1f} / 100**  ",
            f"**Status: {STATUS_EMOJI[status]}**",
            f"",
            f"---",
            f"",
            f"## Control Point Results",
            f"",
            f"| Control Point | Description | Score | Status |",
            f"|---|---|---|---|",
        ]

        for r in results:
            lines.append(f"| `{r.control_point_id}` | {r.description} | {r.score * 100:.0f}% | {STATUS_EMOJI[r.level]} |")

        lines += ["", "---", ""]

        for r in results:
            lines += [
                f"### `{r.control_point_id}` — {r.description}",
                f"",
                f"**Status:** {STATUS_EMOJI[r.level]}  **Score:** {r.score * 100:.0f}%",
                f"",
            ]
            if r.evidence:
                lines.append("**Evidence from FarmSense:**")
                for e in r.evidence:
                    lines.append(f"- {e}")
                lines.append("")
            if r.findings:
                lines.append("**Findings:**")
                for f_ in r.findings:
                    lines.append(f"- {f_}")
                lines.append("")
            if r.corrective_actions:
                lines.append("**Required Corrective Actions:**")
                for a in r.corrective_actions:
                    lines.append(f"1. {a}")
                lines.append("")

        lines += [
            "---",
            "",
            "*This report was generated automatically by FarmSense. Data provenance is "
            "verified via the FarmSense blockchain audit chain. This report does not "
            "constitute a formal GLOBALG.A.P. audit — a licensed certification body must "
            "conduct physical inspection for official certification.*",
        ]

        return "\n".join(lines)


# Module-level singleton
gap_engine = GAPComplianceEngine()
