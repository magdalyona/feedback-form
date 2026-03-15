import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import { FEEDBACK_TOPICS } from '../../utils/constants';
import { feedbackValidationSchema } from '../../utils/validationSchemas';
import type { FeedbackFormValues } from '../../types/feedback';
import { useFeedbackStore } from '../../store/feedbackStore';

//форма обратной связи (основной функционал-форма с валидацией и отправкой на mock‑сервер)

export const FeedbackForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const createFeedback = useFeedbackStore((state) => state.createFeedback);
  const isGlobalLoading = useFeedbackStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
    setValue,
  } = useForm<FeedbackFormValues>({
    mode: 'onChange',
    resolver: yupResolver(feedbackValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      topic: '',
      customTopic: '',
      message: '',
      file: null,
      agreement: false,
    },
  });

  const topicValue = watch('topic');
  const isOtherTopic = topicValue === 'Другое';

  const onSubmit = async (values: FeedbackFormValues) => {
    const result = await createFeedback(values);
    if (result) {
      reset();
      setFile(null);
      enqueueSnackbar('Форма успешно отправлена', { variant: 'success' });
    } else {
      enqueueSnackbar('Не удалось отправить форму', { variant: 'error' });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
    setValue('file', selectedFile, { shouldValidate: true });
  };

  const isLoading = isSubmitting || isGlobalLoading;

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Имя"
        fullWidth
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <FormControl fullWidth error={!!errors.topic}>
        <InputLabel id="topic-label">Тема сообщения</InputLabel>
        <Select
          labelId="topic-label"
          label="Тема сообщения"
          defaultValue=""
          {...register('topic')}
        >
          {FEEDBACK_TOPICS.map((topic) => (
            <MenuItem key={topic} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.topic?.message}</FormHelperText>
      </FormControl>

      {isOtherTopic && (
        <TextField
          label="Своя тема"
          fullWidth
          {...register('customTopic')}
          error={!!errors.customTopic}
          helperText={errors.customTopic?.message}
        />
      )}

      <TextField
        label="Сообщение"
        fullWidth
        multiline
        minRows={4}
        {...register('message')}
        error={!!errors.message}
        helperText={errors.message?.message}
      />

      <Box>
        <Button variant="outlined" component="label">
          Прикрепить файл
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <Box mt={1}>
            <FormHelperText>Выбран файл: {file.name}</FormHelperText>
          </Box>
        )}
        {errors.file && (
          <FormHelperText error>{errors.file.message as string}</FormHelperText>
        )}
      </Box>

      <FormControl error={!!errors.agreement}>
        <FormControlLabel
          control={
            <Checkbox
              {...register('agreement')}
              color="primary"
            />
          }
          label={
            <>
              Я согласен на обработку персональных данных{' '}
              <MuiLink
                href="https://example.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Политика конфиденциальности
              </MuiLink>
            </>
          }
        />
        <FormHelperText>{errors.agreement?.message}</FormHelperText>
      </FormControl>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isLoading}
          startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : null}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

