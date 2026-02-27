import random
import statistics

# FarmSense XR Protocol (FXRP) Latency Model
# Goal: Verify sub-30ms Motion-to-Photon latency for spatial pinning

def simulate_fxrp_latency(packets=1000):
    results = []
    
    # Constants (ms)
    PMT_SERIALIZATION = 0.5    # Protobuf serialization on ATSAMD51 (120MHz)
    DHU_PROCESSING = 1.5       # Jetson Nano frame intercept & re-route
    XR_DECODING = 2.0          # Decoding/rendering on XR device (e.g. Magic Leap)
    
    # Mesh Hops (ms) - Using conservative estimates for 5GHz UISP Sector radios
    # PMT -> DHU (5GHz Sector, high elevation)
    MESH_HOP_PMT_DHU = (2.0, 8.0)  # (min, max) jitter range
    
    # DHU -> XR Technician (5GHz/Wi-Fi 6 localized)
    # Technician is in a UTV near the field
    MESH_HOP_DHU_XR = (3.0, 15.0)  # Potential interference from tractor steel/canopy
    
    for _ in range(packets):
        # 1. PMT Origin
        total_lat = PMT_SERIALIZATION
        
        # 2. Hop: PMT -> DHU
        hop1 = random.uniform(*MESH_HOP_PMT_DHU)
        total_lat += hop1
        
        # 3. DHU Intercept
        total_lat += DHU_PROCESSING
        
        # 4. Hop: DHU -> XR Device
        hop2 = random.uniform(*MESH_HOP_DHU_XR)
        total_lat += hop2
        
        # 5. Device Pipeline
        total_lat += XR_DECODING
        
        results.append(total_lat)
        
    avg = sum(results) / len(results)
    p95 = sorted(results)[int(0.95 * len(results))]
    p99 = sorted(results)[int(0.99 * len(results))]
    
    print(f"FXRP Latency Simulation ({packets} packets):")
    print(f"  Average: {avg:.2f} ms")
    print(f"  P95:     {p95:.2f} ms")
    print(f"  P99:     {p99:.2f} ms")
    print(f"  Success Rate (<30ms): {sum(1 for r in results if r < 30) / packets * 100:.1f}%")

if __name__ == "__main__":
    simulate_fxrp_latency()
