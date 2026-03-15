import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeedbackForm } from './FeedbackForm';

const mockCreateFeedback = jest.fn().mockResolvedValue(null);

jest.mock('../../store/feedbackStore', () => ({
  useFeedbackStore: (selector: (state: any) => any) =>
    selector({
      items: [],
      selected: null,
      isLoading: false,
      error: null,
      fetchList: jest.fn(),
      fetchById: jest.fn(),
      createFeedback: mockCreateFeedback,
      clearError: jest.fn(),
    }),
}));

jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: jest.fn(),
  }),
}));

describe('FeedbackForm', () => {
  it('disables submit button when form is invalid', () => {
    render(<FeedbackForm />);

    const submitButton = screen.getByRole('button', { name: /Отправить/i });
    expect(submitButton).toBeDisabled();
  });

  it('calls createFeedback on valid submit', async () => {
    render(<FeedbackForm />);

    await userEvent.type(screen.getByLabelText(/Имя/i), 'Тестовое имя');
    await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');

    const topicSelect = screen.getByLabelText(/Тема сообщения/i);
    await userEvent.click(topicSelect);
    await userEvent.click(screen.getByRole('option', { name: /Общий вопрос/i }));

    await userEvent.type(screen.getByLabelText(/Сообщение/i), 'Достаточно длинное сообщение');
    await userEvent.click(
      screen.getByRole('checkbox', { name: /Я согласен на обработку персональных данных/i })
    );

    const submitButton = screen.getByRole('button', { name: /Отправить/i });
    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    expect(mockCreateFeedback).toHaveBeenCalled();
  });
});

