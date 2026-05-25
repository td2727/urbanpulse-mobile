import api from './api';
import { Incident, IncidentRequest } from './types';
import { ENDPOINTS } from '../constants/api';

export const incidentService = {
  getAll: async (): Promise<Incident[]> => {
    const response = await api.get<Incident[]>(ENDPOINTS.INCIDENTS);
    return response.data;
  },

  getById: async (id: string | number): Promise<Incident> => {
    const response = await api.get<Incident>(`${ENDPOINTS.INCIDENTS}/${id}`);
    return response.data;
  },

  create: async (incident: IncidentRequest): Promise<Incident> => {
    const response = await api.post<Incident>(ENDPOINTS.INCIDENTS, incident);
    return response.data;
  },
};
