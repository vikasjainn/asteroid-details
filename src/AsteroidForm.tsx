import React, { Component } from 'react';
import { TextField, Button, Grid, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

interface State {
  asteroidId: string;
  randomAsteroidId?: string;
  redirectToDetails: boolean;
  redirectToDetailsId?: string;
  error: string | null;
}

class AsteroidForm extends Component<{}, State> {
  state: State = {
    asteroidId: '',
    redirectToDetails: false,
    redirectToDetailsId: undefined,
    error: null,
  };

  validateAsteroidId = (id: string): boolean => {
    const trimmedId = id.trim();
    if (!trimmedId) {
      this.setState({ error: 'Asteroid ID cannot be empty.' });
      return false;
    }
    if (isNaN(Number(trimmedId))) {
      this.setState({ error: 'Asteroid ID must be a number.' });
      return false;
    }
    if (Number(trimmedId) <= 0) {
      this.setState({ error: 'Asteroid ID must be a positive number.' });
      return false;
    }
    if (/\s/.test(trimmedId)) {
      this.setState({ error: 'Asteroid ID cannot contain spaces.' });
      return false;
    }
    return true;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ asteroidId: event.target.value, error: null });
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { asteroidId } = this.state;

    if (this.validateAsteroidId(asteroidId)) {
      this.setState({ redirectToDetails: true, redirectToDetailsId: asteroidId });
    }
  };

  handleRandom = async () => {
    try {
      const response = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY');
      const asteroids = response.data.near_earth_objects;
      const randomAsteroid = asteroids[Math.floor(Math.random() * asteroids.length)];
      this.setState({ redirectToDetails: true, redirectToDetailsId: randomAsteroid.id });
    } catch (error) {
      console.error('Error fetching random asteroid:', error);
    }
  };

  render() {
    if (this.state.redirectToDetails) {
      return <Navigate to={`/details/${this.state.redirectToDetailsId}`} />;
    }

    return (
      <div>
        <Typography variant="h4">Enter Asteroid ID</Typography>
        {this.state.error && (
          <Alert severity="error">{this.state.error}</Alert>
        )}
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Asteroid ID"
                variant="outlined"
                value={this.state.asteroidId}
                onChange={this.handleChange}
                error={!!this.state.error}
                helperText={this.state.error}
              />
            </Grid>
            <Grid item xs={4}>
              <Button type="submit" variant="contained" color="primary">Get Details</Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" onClick={this.handleRandom}>
                Random Asteroid
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default AsteroidForm;
