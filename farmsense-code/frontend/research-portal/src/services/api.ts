
const API_BASE_URL = 'http://localhost:8000/api/v1';

export const getApiKey = () => localStorage.getItem('farmsense_research_key');
export const setApiKey = (key: string) => localStorage.setItem('farmsense_research_key', key);
export const removeApiKey = () => localStorage.removeItem('farmsense_research_key');

async function request<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const apiKey = getApiKey();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey || '',
        ...(options.headers as Record<string, string> ?? {}),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
        if (response.status === 403) {
            removeApiKey();
            window.location.reload();
        }
        const error = await response.json();
        throw new Error(error.detail || 'API request failed');
    }

    return response.json() as Promise<T>;
}

// ─── Request helpers ───────────────────────────────────────────────
function qs(params: Record<string, string | number | boolean | undefined>) {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined) p.set(k, String(v));
    }
    const s = p.toString();
    return s ? `?${s}` : '';
}

// ─── V1 core ─────────────────────────────────────────────────────────
export const api = {
    getDatasets: () => request<Dataset[]>('/research/datasets'),
    getFieldAnalytics: (fieldId: string) => request<FieldAnalytics>(`/fields/${fieldId}/analytics`),
    get1mGrid: (fieldId: string) => request<GridData>(`/fields/${fieldId}/grid/1m`),

    // ─── Historical soil / environmental time-series ─────────────────
    // Returns full available history (up to 40+ years) for a field.
    // start / end are ISO date strings for optional windowing.
    getSoilTimeSeries: (fieldId: string, variable: string, start?: string, end?: string) =>
        request<TimeSeriesPoint[]>(`/research/fields/${fieldId}/history/soil${qs({ variable, start, end })}`),

    getAtmosphericTimeSeries: (fieldId: string, variable: string, start?: string, end?: string) =>
        request<TimeSeriesPoint[]>(`/research/fields/${fieldId}/history/atmospheric${qs({ variable, start, end })}`),

    getExtractionTimeSeries: (basinId: string, start?: string, end?: string) =>
        request<ExtractionPoint[]>(`/research/basins/${basinId}/extraction${qs({ start, end })}`),

    getETvsPrecipHistory: (basinId: string, start?: string, end?: string) =>
        request<ETPrecipPoint[]>(`/research/basins/${basinId}/et-precip${qs({ start, end })}`),

    getCropNDVIHistory: (basinId: string, cropType?: string, start?: string, end?: string) =>
        request<CropNDVIPoint[]>(`/research/basins/${basinId}/ndvi${qs({ cropType, start, end })}`),

    // ─── Satellite / remote sensing ──────────────────────────────────
    getSatelliteOverpass: (fieldId: string, layerId: string, date: string) =>
        request<SatellitePixelData>(`/research/fields/${fieldId}/satellite${qs({ layer: layerId, date })}`),

    getPixelTimeSeries: (lat: number, lon: number, layerId: string, start?: string, end?: string) =>
        request<TimeSeriesPoint[]>(`/research/satellite/pixel${qs({ lat, lon, layer: layerId, start, end })}`),

    getCloudMask: (fieldId: string, date: string) =>
        request<CloudMaskData>(`/research/fields/${fieldId}/cloud-mask${qs({ date })}`),

    getCorrelationMatrix: (fieldId: string, layers: string[], start?: string, end?: string) =>
        request<CorrelationMatrix>(`/research/fields/${fieldId}/correlation${qs({ layers: layers.join(','), start, end })}`),

    // ─── Kriging / compute transparency ──────────────────────────────
    getKrigingWorksheet: (fieldId: string, timestamp: string) =>
        request<KrigingWorksheet>(`/research/fields/${fieldId}/kriging${qs({ timestamp })}`),

    getVariogramHistory: (fieldId: string, start?: string, end?: string) =>
        request<VariogramPoint[]>(`/research/fields/${fieldId}/variogram-history${qs({ start, end })}`),

    get1mGridHistory: (fieldId: string, timestamp: string) =>
        request<GridData>(`/fields/${fieldId}/grid/1m${qs({ timestamp })}`),

    // ─── Federated experiment management ─────────────────────────────
    submitExperiment: (payload: ExperimentPayload) =>
        request<ExperimentJob>('/research/experiments', { method: 'POST', body: JSON.stringify(payload) }),

    getExperimentStatus: (jobId: string) =>
        request<ExperimentJob>(`/research/experiments/${jobId}`),

    getExperimentRegistry: () =>
        request<ExperimentResult[]>('/research/experiments/registry'),

    // ─── Open data repository ─────────────────────────────────────────
    getResearchDatasets: (filters?: { cropType?: string; sensorTypes?: string[] }) =>
        request<ResearchDataset[]>(`/research/open-data${qs({ cropType: filters?.cropType, sensors: filters?.sensorTypes?.join(',') })}`),

    getDatasetPreview: (datasetId: string) =>
        request<DatasetPreview>(`/research/open-data/${datasetId}/preview`),

    // ─── Field trial management ───────────────────────────────────────
    createTrial: (payload: TrialPayload) =>
        request<Trial>('/research/trials', { method: 'POST', body: JSON.stringify(payload) }),

    getTrialStatus: (trialId: string) =>
        request<Trial>(`/research/trials/${trialId}`),

    getTrialTimeSeries: (trialId: string) =>
        request<TrialDataPoint[]>(`/research/trials/${trialId}/timeseries`),

    // ─── Lab integrations ─────────────────────────────────────────────
    getIntegrations: () =>
        request<LabIntegration[]>('/research/integrations'),

    createIntegration: (payload: IntegrationPayload) =>
        request<LabIntegration>('/research/integrations', { method: 'POST', body: JSON.stringify(payload) }),

    getCalibrationProposals: (integrationId: string) =>
        request<CalibrationProposal[]>(`/research/integrations/${integrationId}/calibration`),

    acceptCalibrationProposal: (integrationId: string, proposalId: string) =>
        request<CalibrationProposal>(`/research/integrations/${integrationId}/calibration/${proposalId}/accept`, { method: 'POST' }),

    // ─── SPAC model ───────────────────────────────────────────────────
    computeSPAC: (payload: SPACPayload) =>
        request<SPACResult>('/research/spac/compute', { method: 'POST', body: JSON.stringify(payload) }),

    getSPACHistory: (fieldId: string, start?: string, end?: string) =>
        request<SPACRecord[]>(`/research/fields/${fieldId}/spac-history${qs({ start, end })}`),
};

// ─── Type definitions ──────────────────────────────────────────────
export interface TimeSeriesPoint { timestamp: string; value: number; unit: string; }
export interface ExtractionPoint { label: string; extraction: number; permitted: number; }
export interface ETPrecipPoint { label: string; et: number; precip: number; }
export interface CropNDVIPoint { month: string;[crop: string]: number | string; }

export interface SatellitePixelData {
    lat: number; lon: number;
    layers: Array<{ id: string; label: string; value: number; unit: string; color: string }>;
    timestamp: string;
}
export interface CloudMaskData {
    date: string; cloudPct: number; shadowPct: number; clearPct: number;
    alternatePasses: string[];
}
export interface CorrelationMatrix { labels: string[]; matrix: number[][]; }

export interface KrigingWorksheet {
    fieldId: string; timestamp: string;
    inputs: Array<{ name: string; value: number; unit: string; source: string; hash: string; }>;
    trendCoefficients: Array<{ covariate: string; coeff: number; se: number; t: number; p: string; }>;
    trendR2: number; trendAdjR2: number;
    variogram: { nugget: number; sill: number; range: number; model: string; };
    residualGrid: number[][];
    predictionGrid: number[][];
    modelVersion: string; hashProof: string;
}
export interface VariogramPoint { h: number; theoretical: number; empirical: number; }

export interface ExperimentPayload {
    hypothesis: string; features: string[]; cohort: string;
    epochs: number; learningRate: number;
}
export interface ExperimentJob {
    id: string; status: 'queued' | 'running' | 'complete' | 'failed';
    epochsCompleted: number; totalEpochs: number;
    metrics?: { loss: number; accuracy: number; rmse?: number; r2?: number };
    lossHistory?: Array<{ epoch: number; loss: number; accuracy: number }>;
}
export interface ExperimentResult {
    id: string; hypothesis: string; status: string;
    rmse: number; r2: number; institution: string;
}

export interface ResearchDataset {
    id: string; name: string; region: string; dateRange: string;
    sensors: string[]; crop: string; records: number; sizeMb: number;
    doi: string; version: string; quality: number; validated: boolean; license: string;
}
export interface DatasetPreview {
    sampleRows: Record<string, number | string>[];
    variableStats: Array<{ name: string; mean: number; std: number; p5: number; p95: number }>;
    missingPct: number;
}

export interface TrialPayload {
    fieldId: string; treatment: string; control: string;
    ZoneGeojson: unknown;
}
export interface Trial {
    id: string; status: 'design' | 'running' | 'complete';
    startDate?: string; endDate?: string;
}
export interface TrialDataPoint {
    day: number; treatmentNDVI: number; controlNDVI: number;
    treatmentSMP: number; controlSMP: number;
}

export interface LabIntegration {
    id: string; name: string; type: string; status: 'active' | 'flagged' | 'offline';
    lastSync: string; records: number; qualityScore: number; drift: boolean;
}
export interface IntegrationPayload {
    type: string; endpoint: string; format: string;
    fieldId: string; frequencyMin: number;
}
export interface CalibrationProposal {
    id: string; variable: string;
    currentValue: number; correctedValue: number; confidence: string;
}

export interface SPACPayload {
    smp: number; swc: number; ec: number; vpd: number;
    solar: number; ndvi: number; et: number;
}
export interface SPACResult {
    madPct: number; pumpDecision: boolean;
    hoursToCritical: number; waterRateMmDay: number;
}
export interface SPACRecord extends SPACPayload, SPACResult { timestamp: string; }

export interface Dataset { id: string; name: string; type: string; size_mb: number; }
export interface FieldAnalytics { [key: string]: unknown; }
export interface GridData { grid: number[][]; }
