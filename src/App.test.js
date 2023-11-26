import { render, screen } from '@testing-library/react';
import App from './App';

test('renders username input', () => {
  render(<App />);
  const usernameInput = screen.getByTestId("username-input");
  expect(usernameInput).toBeInTheDocument();
});
