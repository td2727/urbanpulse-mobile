import apiClient from './client';
import {
  LoginResponse,
  IncidentRequest,
  Incident,
  EvidenceRequest,
  ApiError
} from './types';
import axios from 'axios';

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { message: 'Error de conexión' } as ApiError;
    }
  },
};

export const incidentService = {
  create: async (incident: IncidentRequest): Promise<Incident> => {
    try {
      const response = await apiClient.post<Incident>('/api/incidents', incident);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { message: 'Error al crear la incidencia' } as ApiError;
    }
  },

  getAll: async (): Promise<Incident[]> => {
    try {
      const response = await apiClient.get<Incident[]>('/api/incidents');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { message: 'Error al obtener las incidencias' } as ApiError;
    }
  },

  getById: async (id: string | number): Promise<Incident> => {
    try {
      const response = await apiClient.get<Incident>(`/api/incidents/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { message: 'Error al obtener el detalle' } as ApiError;
    }
  },
};

export const evidenceService = {
  create: async (evidence: EvidenceRequest): Promise<any> => {
    try {
      const response = await apiClient.post('/api/evidences', evidence);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as ApiError;
      }
      throw { message: 'Error al subir la evidencia' } as ApiError;
    }
  },
};
