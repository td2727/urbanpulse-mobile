import api from './api';
import { EvidenceRequest } from './types';
import { ENDPOINTS } from '../constants/api';

export const evidenceService = {
  create: async (evidence: EvidenceRequest): Promise<any> => {
    const response = await api.post(ENDPOINTS.EVIDENCES, evidence);
    return response.data;
  },
};
