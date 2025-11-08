import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}

export interface WaitlistSignup {
  email: string;
}

export const api = {
  // Services
  getServices: async (): Promise<Service[]> => {
    const response = await apiClient.get('/api/services');
    return response.data;
  },

  getService: async (id: number): Promise<Service> => {
    const response = await apiClient.get(`/api/services/${id}`);
    return response.data;
  },

  // Team
  getTeam: async (): Promise<TeamMember[]> => {
    const response = await apiClient.get('/api/team');
    return response.data;
  },

  getTeamMember: async (id: number): Promise<TeamMember> => {
    const response = await apiClient.get(`/api/team/${id}`);
    return response.data;
  },

  // Contact
  submitContact: async (message: ContactMessage) => {
    const response = await apiClient.post('/api/contact', message);
    return response.data;
  },

  // Waitlist
  joinWaitlist: async (signup: WaitlistSignup) => {
    const response = await apiClient.post('/api/waitlist', signup);
    return response.data;
  },
};

export default api;
