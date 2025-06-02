import axios from 'axios';
import { ITicket, StatusType, PriorityType } from '../types/ticket';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export interface ApiErrorResponse {
  message: string;
  needsVerification?: boolean;
  email?: string;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  priority: PriorityType;
}

export interface TicketUpdatePayload {
  status?: StatusType;
  priority?: PriorityType;
  assignedTo?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  signUp: async (userData: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
  }) => {
    const response = await api.post('/service/user/signup', userData);
    return response.data;
  },

  signIn: async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await api.post('/service/user/signin', credentials);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post('/service/user/verify-otp', { email, otp });
    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await api.post('/service/user/resend-otp', { email });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('verificationEmail');
  }
};

export const ticketService = {
  getAllTickets: async (): Promise<ITicket[]> => {
    const response = await api.get('/service/tickets');
    return response.data;
  },

  getTicketsByOwnerId: async (ownerId: string): Promise<ITicket[]> => {
    const response = await api.get(`/service/tickets/owner/${ownerId}`);
    return response.data;
  },

  createTicket: async (ownerId: string, ticketData: CreateTicketPayload): Promise<ITicket> => {
    const response = await api.post('/service/tickets', { ...ticketData, ownerId });
    return response.data;
  },

  updateTicket: async (ticketId: string, updates: TicketUpdatePayload): Promise<ITicket> => {
    const response = await api.patch(`/service/tickets/${ticketId}`, updates);
    return response.data;
  },

  updateTicketStatus: async (ticketId: string, status: StatusType): Promise<ITicket> => {
    const response = await api.patch(`/service/tickets/${ticketId}`, { status });
    return response.data;
  },

  updateTicketPriority: async (ticketId: string, priority: PriorityType): Promise<ITicket> => {
    const response = await api.patch(`/service/tickets/${ticketId}`, { priority });
    return response.data;
  },

  deleteTicket: async (ticketId: string): Promise<void> => {
    await api.delete(`/service/tickets/${ticketId}`);
  },

  sendTicketReply: async (ticketId: string, content: string): Promise<void> => {
    await api.post(`/service/tickets/${ticketId}/reply`, { content });
  }
};

export default api;