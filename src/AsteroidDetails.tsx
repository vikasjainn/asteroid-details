import React, { Component } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Define the types for useParams
type Params = Record<string, string | undefined>;

interface AsteroidData {
  id: string;
  name: string;
  nasa_jpl_url: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: Array<{
    miss_distance: {
      kilometers: string;
    };
  }>;
}

interface State {
  asteroid?: AsteroidData;
  loading: boolean;
}

class AsteroidDetails extends Component<{ id: string }, State> {
  state: State = {
    asteroid: undefined,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props;
    axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=TFkbVHRfhB4JMQufKNiSFuejYCKVPbTbZQuSjDo6`)
      .then(response => {
        this.setState({ asteroid: response.data, loading: false });
      })
      .catch(error => {
        console.error('Error fetching asteroid details:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    if (!this.state.asteroid) {
      return <Typography variant="h6">No details available</Typography>;
    }

    const { asteroid } = this.state;
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">{asteroid.name}</Typography>
          <Typography variant="body1">NASA JPL URL: <a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener noreferrer">{asteroid.nasa_jpl_url}</a></Typography>
          <Typography variant="body1">
            Estimated Diameter: {asteroid.estimated_diameter.meters.estimated_diameter_min} - {asteroid.estimated_diameter.meters.estimated_diameter_max} meters
          </Typography>
          <Typography variant="body1">
            Closest Approach Distance: {asteroid.close_approach_data[0].miss_distance.kilometers} kilometers
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

// Higher-order component to inject route parameters into `AsteroidDetails`
const AsteroidDetailsWrapper: React.FC = () => {
  const params = useParams<Params>();
  return <AsteroidDetails id={params.id as string} />;
};

export default AsteroidDetailsWrapper;
