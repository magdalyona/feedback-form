// константы для приложение

//темы сообщени
export const FEEDBACK_TOPICS = [
    'Общий вопрос',
    'Техническая проблема',
    'Предложение',
    'Другое',
] as const

export type FeedbackTopic = (typeof FEEDBACK_TOPICS)[number];

//лимиты для вложения файла
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.png', '.pdf', '.doc', '.docx'];

//базовый URL для mock-сервера
// json-server по умолчанию поднимает REST‑эндпоинты напрямую от корня,
// поэтому коллекция "feedback" будет доступна по адресу /feedback
export const API_BASE_URL = 'http://localhost:3001';

//endpoint для отзывов (коллекция "feedback" в db.json)
export const FEEDBACK_ENDPOINT = '/feedback';