import { create } from "zustand";
import type { Feedback, FeedbackFormValues } from "../types/feedback";
import { feedbackService } from "../services/feedbackService";
// import { get } from "http";
// import { set } from "react-hook-form";

//Zustand‑хранилище

interface FeedbackState {
  items: Feedback[];
  selected: Feedback | null;
  isLoading: boolean;
  error: string | null;
  fetchList: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  createFeedback: (values: FeedbackFormValues) => Promise<Feedback | null>;
  clearError: () => void;
}

//централизованно хранить список заявок и состояние загрузки/ошибок, чтобы и форма, и история работали с одними и теми же данными
export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  items: [],
  selected: null,
  isLoading: false,
  error: null,

  //получение полного списка отзывов
  async fetchList() {
    set({ isLoading: true, error: null });
    try {
      const data = await feedbackService.getList();
      set({ items: data });
    } catch (error) {
      set({ error: 'Не удалось загрузить список заявок' });
    } finally {
      set({ isLoading: false });
    }
  },

  //выборка конкретного отзыва по его идентификатору id
  async fetchById(id: string) {
    set({ isLoading: true, error: null });
    try {
      const data = await feedbackService.getById(id);
      set({ selected: data });
    } catch (error) {
      set({ error: 'Не удалось загрузить заявку' });
    } finally {
      set({ isLoading: false });
    }
  },

  //создание нового отзыва и сохранение его в хранилище
  async createFeedback(values: FeedbackFormValues) {
    set({ isLoading: true, error: null });
    try {
      const created = await feedbackService.create(values);
      const { items } = get();
      set({ items: [created, ...items] });
      return created;
    } catch (error) {
      set({ error: 'Не удалось отправить форму' });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // очистка сообщений об ошибках в случае необходимости
  clearError() {
    set({ error: null });
  },

}));