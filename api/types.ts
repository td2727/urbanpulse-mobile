export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresAt: string;
  user: User;
}

export type IncidentType = 'FIRE' | 'MEDICAL' | 'POLICE' | 'TRAFFIC' | 'FLOOD' | 'SECURITY' | 'OTHER';

export interface IncidentRequest {
  title: string;
  description: string;
  type: IncidentType;
  severity: number;
  latitude: number;
  longitude: number;
  zone: string;
  addressReference: string;
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  type: IncidentType;
  status: string;
  severity: number;
  latitude: number;
  longitude: number;
  zone: string;
  addressReference: string;
  reportedBy: User;
  priorityScore: number;
  priorityLevel: string;
  slaMinutes: number;
  slaDueAt: string;
  createdAt: string;
}

export type EvidenceType = 'INITIAL' | 'PROGRESS' | 'RESOLUTION' | 'BEFORE' | 'AFTER' | 'OTHER';

export interface EvidenceRequest {
  incidentId: number;
  url: string;
  evidenceType: EvidenceType;
  observation: string;
}

export interface ApiError {
  message: string;
  fieldErrors?: Record<string, string>;
}
