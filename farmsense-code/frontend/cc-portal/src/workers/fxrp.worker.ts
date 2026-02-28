// Web Worker for FXRP (FarmSense XR Protocol) Decoding

self.onmessage = (event: MessageEvent) => {
    const { type, payload } = event.data;

    // Simulate computationally expensive Protobuf / FHE decoding 
    // from binary payloads sent from the internal simulator or websockets
    if (type === 'DECODE_FXRP_BUFFER') {
        try {
            // In a real scenario, this would use protobufjs and FHE decrypt
            const decodedString = new TextDecoder().decode(payload);
            const data = JSON.parse(decodedString);

            // Post the clean object back to the main thread for Zustand
            self.postMessage({ type: 'FXRP_DECODED', data });
        } catch (e) {
            console.error('[FXRP Worker] Decode Error:', e);
        }
    }
};

export { };
