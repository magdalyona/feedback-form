import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

//базовый HTTP‑клиент
//базовый экземпляр axios, чтобы в одном месте настроить baseURL и заголовки
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});


