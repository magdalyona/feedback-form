// описываем типы данных: то, что хранится на сервисе
export interface Feedback {
    id: string; //айжи номер
    name: string; //имя
    email: string; // почта
    topic: string; //тема отзыва
    message: string; //сообщение самого отзыва
    fileName?: string; // необязательное поле, имя файла прикрепленного
    fileUrl?: string; // адрес файла доступный по ссылке
    agreement: boolean; // соглашение да/нет
    createdAt: string; // дата и время регистрации отзыва
}

export interface FeedbackFormValues {
    name: string; 
    email: string; 
    topic: string;

    //поле если выбрал пользователь - другое
    customTopic?: string;
    message: string; 
    file?: File | null ;
    agreement: boolean;
}