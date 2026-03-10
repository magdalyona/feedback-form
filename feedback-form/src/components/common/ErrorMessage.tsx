import { Alert, AlertTitle, Button } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// компонент для отображения ошибок с необязательной кнопкой "Повторить"
export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <Alert
    severity="error"
    action={
      onRetry ? (
        <Button color="inherit" size="small" onClick={onRetry}>
          Повторить
        </Button>
      ) : null
    }
  >
    <AlertTitle>Ошибка</AlertTitle>
    {message}
  </Alert>
);

