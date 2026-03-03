import logging
import uuid
from datetime import datetime, timeZone
from typing import Dict, Any, List
import xml.etree.ElementTree as ET

logger = logging.getLogger(__name__)

class JADC2Adapter:
    """
    Translates FarmSense agricultural sensor data into JADC2-compatible
    Cursor on Target (CoT) XML messages.
    """

    @staticmethod
    def to_cot_xml(grid_point: Dict[str, Any]) -> str:
        """
        Translates a VirtualSensorGrid1m point into a CoT <event> element.
        CoT Type: a-f-G-E-O (Atom-Friendly-Ground-Equipment-Other/Environmental)
        """
        try:
            now = datetime.now(timeZone.utc)
            stale = datetime.fromtimestamp(now.timestamp() + 3600, timeZone.utc) # 1 hour validity

            event_id = f"FS-{grid_point.get('field_id', 'unknown')}-{grid_point.get('grid_id', 'unknown')}"
            
            # Root element
            event = ET.Element("event")
            event.set("version", "2.0")
            event.set("uid", event_id)
            event.set("type", "a-f-G-E-O")
            event.set("how", "m-g") # Machine generated
            event.set("time", now.isoformat())
            event.set("start", now.isoformat())
            event.set("stale", stale.isoformat())

            # Point sub-element (Location)
            point = ET.SubElement(event, "point")
            point.set("lat", str(grid_point.get("latitude", 0.0)))
            point.set("lon", str(grid_point.get("longitude", 0.0)))
            point.set("hae", "0.0") # Height Above Ellipsoid (Ground level)
            point.set("ce", "1.0")  # Circular Error
            point.set("le", "1.0")  # Linear Error

            # Detail sub-element (Sensor Data)
            detail = ET.SubElement(event, "detail")
            
            # Agricultural / Environmental details
            env = ET.SubElement(detail, "environmental")
            env.set("moisture", str(grid_point.get("moisture_surface", 0.0)))
            env.set("confidence", str(grid_point.get("confidence_score", 1.0)))
            
            # JADC2 / Tactical markers
            tactical = ET.SubElement(detail, "tactical")
            tactical.set("source", "FarmSense-UGS-Matrix")
            tactical.set("dual_use", "true")

            # LPI/LPD Metadata stub
            lpi = ET.SubElement(detail, "lpi_lpd")
            lpi.set("fhss_hopping", "active")
            lpi.set("sequence_id", str(uuid.uuid4())[:8])

            return ET.tostring(event, encoding="unicode")
        except Exception as e:
            logger.error(f"CoT Translation failed: {e}")
            return ""

    @staticmethod
    def batch_to_cot(grid_points: List[Dict[str, Any]]) -> str:
        """
        Wraps multiple CoT events into a single tactical feed string.
        """
        results = [JADC2Adapter.to_cot_xml(p) for p in grid_points]
        return "\n".join(filter(None, results))
