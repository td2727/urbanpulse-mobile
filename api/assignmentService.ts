import api from './api';
import { Incident } from './types';
import { ENDPOINTS } from '../constants/api';

export const assignmentService = {
  getMyAssignments: async (): Promise<Incident[]> => {
    // Usamos el endpoint de incidencias filtrado por el usuario actual o un endpoint específico de tareas
    const response = await api.get<Incident[]>(ENDPOINTS.ASSIGNMENTS);
    return response.data;
  },
};
