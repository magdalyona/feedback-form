import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

// универсальное модальное окно на базе MUI Dialog
export const Modal = ({ open, title, onClose, children }: ModalProps) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    {title && (
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    )}
    <DialogContent dividers>{children}</DialogContent>
  </Dialog>
);

