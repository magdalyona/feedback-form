import * as yup from 'yup';
import {
  ALLOWED_FILE_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
} from './constants';
import type { FeedbackFormValues } from '../types/feedback';

//вспомогательная фкнкция - получить расширение файла по имени
const getFileExtension = (fileName: string): string => {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1) {
        return '';
    }
    return fileName.slice(dotIndex).toLowerCase();
};

//основаная схема валидации для формы
export const feedbackValidationSchema: yup.ObjectSchema<FeedbackFormValues> = 
    yup.object({
        name: yup
        .string()
        .required('Имя пользователя')
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 50 символов'),
        email: yup
        .string()
        .required('Email обязательно')
        .email('Некорректный формат email'),
        topic: yup 
        .string()
        .required('Тема обязательна'),
        customTopic: yup
        .string()
        //customTopic обязательно если выбрал "другое"
        .when('topic' , {
            is: (topic: string) => topic === 'Другое',
            then: (schema) =>
                schema
                    .required('Укадите свою тему')
                    .min(2, 'Минимум 2 символов')
                    .max(100, 'Максимум 100 символов'),
            otherwise: (schema) => schema.notRequired(),
        }),
        message: yup
        .string()
        .required('Сообщение обязательно')
        .min(10, 'Минимум 10 символов')
        .max(1000, 'Максимум 1000 символов'),
        file: yup
        .mixed<File>()
        .nullable()
        .test(
            'fileSize',
            `Файл не должен привышать ${MAX_FILE_SIZE_MB} МБ`,
            (file: File | null | undefined) => {
                if (!file) {
                    return true; //файл не обязателен
                }
                return file.size <= MAX_FILE_SIZE_BYTES;
            }
        )
        .test(
            'fileExtension',
            `Допустимые форматы: ${ALLOWED_FILE_EXTENSIONS.join(', ')}`,
            (file: File | null | undefined) => {
                if (!file || !file.name) {
                    return true; //файл не обязателен
                }
                const ext = getFileExtension(file.name);
                return ALLOWED_FILE_EXTENSIONS.includes(ext);
            }
        ),
        agreement: yup
        .boolean()
        .oneOf([true], 'Необходимо согласие на обработку данны')
        .required('Необходимо согласие на обработку данных')

    })