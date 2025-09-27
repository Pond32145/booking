import { sequelize } from '../config/database';
import Venue from '../models/Venue';

const testData = async () => {
  try {
    // Sync database
    await sequelize.sync();
    console.log('Database synced');

    // Get a venue and log it
    const venue = await Venue.findByPk('1');
    if (venue) {
      console.log('Venue data:');
      console.log(JSON.stringify(venue, null, 2));
    } else {
      console.log('Venue not found');
    }
  } catch (error) {
    console.error('Error testing data:', error);
  }
};

// Run test function
testData().then(() => {
  console.log('Test completed');
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});