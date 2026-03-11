import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useState } from 'react';
import { useFeedbackStore } from '../../store/feedbackStore';


//список и модалка деталей
//реализация вкладки «История» и просмотра деталей
export const FeedbackHistory = () => {
  const { items } = useFeedbackStore();
  const [openId, setOpenId] = useState<string | null>(null);

  const selected = items.find((item) => item.id === openId) ?? null;

  const handleOpen = (id: string) => setOpenId(id);
  const handleClose = () => setOpenId(null);

  if (!items.length) {
    return <Typography>Пока нет отправленных форм.</Typography>;
  }


  return (
    <>

      <List>
        {items.map((item) => (
          <ListItemButton key={item.id} onClick={() => handleOpen(item.id)}>
            <ListItemText
              primary={`${item.name} — ${item.topic}`}
              secondary={`${new Date(item.createdAt).toLocaleString()} • ${
                item.message.length > 100
                  ? `${item.message.slice(0, 100)}…`
                  : item.message
              }`}
            />
          </ListItemButton>
        ))}
      </List>

      <Dialog open={!!selected} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Детали заявки</DialogTitle>
        {selected && (
          <DialogContent dividers>
            <DialogContentText>
              <strong>Имя:</strong> {selected.name}
            </DialogContentText>
            <DialogContentText>
              <strong>Email:</strong> {selected.email}
            </DialogContentText>
            <DialogContentText>
              <strong>Тема:</strong> {selected.topic}
            </DialogContentText>
            <DialogContentText>
              <strong>Сообщение:</strong> {selected.message}
            </DialogContentText>
            {selected.fileName && (
              <DialogContentText>
                <strong>Файл:</strong> {selected.fileName}
              </DialogContentText>
            )}
            <DialogContentText>
              <strong>Согласие на обработку данных:</strong>{' '}
              {selected.agreement ? 'Да' : 'Нет'}
            </DialogContentText>
            <DialogContentText>
              <strong>Дата и время:</strong>{' '}
              {new Date(selected.createdAt).toLocaleString()}
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

