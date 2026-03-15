import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  HashRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: () => null,
  Link: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

test('renders main navigation and title', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /Форма обратной связи/i })
  ).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /История/i })).toBeInTheDocument();
});
