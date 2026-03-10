import { apiClient } from './api';
import { FEEDBACK_ENDPOINT } from '../utils/constants';
import type { Feedback, FeedbackFormValues } from '../types/feedback';

// Приводим данные формы к формату, который ждёт mock-сервер
const mapFormValuesToPayload = (values: FeedbackFormValues) => {
  const {
    name,
    email,
    topic,
    customTopic,
    message,
    file,
    agreement,
  } = values;

  const finalTopic = topic === 'Другое' && customTopic ? customTopic : topic;

  return {
    name,
    email,
    topic: finalTopic,
    message,
    fileName: file ? file.name : '',
    // fileUrl пока заглушка, т.к. json-server не хранит реально файл
    fileUrl: '',
    agreement,
    createdAt: new Date().toISOString(),
  };
};

export const feedbackService = {
  async getList(): Promise<Feedback[]> {
    const response = await apiClient.get<Feedback[]>(FEEDBACK_ENDPOINT);
    return response.data;
  },

  async getById(id: string): Promise<Feedback> {
    const response = await apiClient.get<Feedback>(`${FEEDBACK_ENDPOINT}/${id}`);
    return response.data;
  },

  async create(values: FeedbackFormValues): Promise<Feedback> {
    const payload = mapFormValuesToPayload(values);
    const response = await apiClient.post<Feedback>(FEEDBACK_ENDPOINT, payload);
    return response.data;
  },
};

