// Test the frontend API service
import { api } from './src/shared/data/api';

// Test venue API
api.venues.getVenueById('1')
  .then(response => {
    console.log('Venue API Response:', response);
    if (response.status === 200) {
      console.log('Success: Venue data loaded');
    } else {
      console.error('Error: Failed to load venue data');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });