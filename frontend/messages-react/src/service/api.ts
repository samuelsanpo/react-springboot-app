import axios from 'axios';
import type { Message, CreateMessageRequest } from '../types/message';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const messageService = {
    getAll: async () => {
        const { data } = await api.get<Message[]>('/messages');
        return data;
    },
    getById: async (id: number) => {
        const { data } = await api.get<Message>(`/messages/${id}`);
        return data;
    },
    create: async (message: CreateMessageRequest) => {
        const { data } = await api.post<Message>('/messages', message);
        return data;
    },
    delete: async (id: number) => {
        await api.delete(`/messages/${id}`);
    }
};