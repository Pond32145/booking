// Simple test to verify API service is working
fetch('http://localhost:3001/api/venues/1')
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));