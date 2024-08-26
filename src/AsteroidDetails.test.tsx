import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsteroidDetails from './AsteroidDetails';

// Setup mock for axios
const mock = new MockAdapter(axios);

// Sample asteroid data for testing
const asteroidData = {
  id: '3542519',
  name: 'Asteroid XYZ',
  nasa_jpl_url: 'https://example.com',
  estimated_diameter: {
    meters: {
      estimated_diameter_min: 500,
      estimated_diameter_max: 600,
    },
  },
  close_approach_data: [
    {
      miss_distance: {
        kilometers: '500000',
      },
    },
  ],
};

// Mock the API response
mock.onGet('https://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=DEMO_KEY').reply(200, asteroidData);

test('fetches and displays asteroid details', async () => {
  // Render the component with the Router and Route
  render(
    <Router>
      <Routes>
        <Route path="/details/:id" element={<AsteroidDetails />} />
      </Routes>
    </Router>
  );

  // Simulate navigation to the details page
  const { container } = render(
    <Router>
      <Routes>
        <Route path="/details/3542519" element={<AsteroidDetails />} />
      </Routes>
    </Router>
  );

  // Wait for the component to fetch and display data
  await waitFor(() => {
    expect(screen.getByText(/Asteroid XYZ/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated Diameter: 500 - 600 meters/i)).toBeInTheDocument();
    expect(screen.getByText(/Closest Approach Distance: 500000 kilometers/i)).toBeInTheDocument();
  });
});
