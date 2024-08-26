import { render, screen, fireEvent } from '@testing-library/react';
import AsteroidForm from './AsteroidForm';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders form with input and buttons', () => {
  render(
    <Router>
      <AsteroidForm />
    </Router>
  );

  expect(screen.getByLabelText(/Asteroid ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Get Details/i)).toBeInTheDocument();
  expect(screen.getByText(/Random Asteroid/i)).toBeInTheDocument();
});

test('handles form submission', () => {
  render(
    <Router>
      <AsteroidForm />
    </Router>
  );

  const input = screen.getByLabelText(/Asteroid ID/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value: '12345' } });
  fireEvent.click(screen.getByText(/Get Details/i));

  // Assuming you'll test redirection, which is complex to test directly without a full routing setup
});

test('fetches random asteroid', async () => {
  render(
    <Router>
      <AsteroidForm />
    </Router>
  );

  fireEvent.click(screen.getByText(/Random Asteroid/i));
  
  // You can mock axios requests to test this functionality
});
