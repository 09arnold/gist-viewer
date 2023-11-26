import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

test('Render Pagination', () => {
  render(<Pagination currentPage={1}/>);
  const pagination = screen.getByText(/Previous/i);
  expect(pagination).toBeInTheDocument();
});

test('Previous button to be disabled', () => {
  render(<Pagination currentPage={1}/>);
  const pagination = screen.getByText(/Previous/i);
  expect(pagination).toBeDisabled();
});

test('Previous next to be disabled', () => {
  render(<Pagination currentPage={1} disableNext={true}/>);
  const pagination = screen.getByText(/Next/i);
  expect(pagination).toBeDisabled();
});