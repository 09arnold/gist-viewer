import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

test('Render Badge', () => {
  render(<Badge>Python</Badge>);
  const badge = screen.getByText(/Python/i);
  expect(badge).toBeInTheDocument();
});