import { sequelize } from '../config/database';
import Venue from '../models/Venue';
import Service from '../models/Service';
import Booking from '../models/Booking';
import Category from '../models/Category';
import venuesData from '../data/venues.json';
import servicesData from '../data/services.json';
import upcomingBookingsData from '../data/upcoming-bookings.json';
import pastBookingsData from '../data/past-bookings.json';
import categoriesData from '../data/categories.json';

// Function to clean and normalize text data
const cleanText = (text: string): string => {
  if (typeof text !== 'string') return text;
  // Remove extra spaces and normalize whitespace
  return text.replace(/\s+/g, ' ').trim();
};

// Function to clean venue data
const cleanVenueData = (venue: any) => {
  return {
    ...venue,
    name: cleanText(venue.name),
    location: cleanText(venue.location),
    date: cleanText(venue.date),
    time: cleanText(venue.time),
    openingHours: cleanText(venue.openingHours),
    description: cleanText(venue.description),
    facilities: venue.facilities.map((facility: string) => cleanText(facility)),
    services: venue.services.map((service: any) => ({
      ...service,
      name: cleanText(service.name),
      description: cleanText(service.description),
      bookingType: service.bookingType as 'time_slot' | 'table_booking' | 'queue_only'
    }))
  };
};

const seedData = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Seed venues
    for (const venue of venuesData) {
      // Clean and normalize venue data
      const cleanedVenue = cleanVenueData(venue);
      await Venue.create(cleanedVenue);
    }
    console.log('Venues seeded');

    // Seed services
    for (const service of servicesData) {
      // Fix typing issues for bookingType
      const serviceToCreate = {
        ...service,
        name: cleanText(service.name),
        description: cleanText(service.description),
        bookingType: service.bookingType as 'time_slot' | 'table_booking' | 'queue_only'
      };
      await Service.create(serviceToCreate);
    }
    console.log('Services seeded');

    // Seed upcoming bookings
    for (const booking of upcomingBookingsData) {
      // Fix typing issues for status
      const bookingToCreate = {
        ...booking,
        serviceName: cleanText(booking.serviceName),
        providerName: cleanText(booking.providerName),
        date: cleanText(booking.date),
        time: cleanText(booking.time),
        location: cleanText(booking.location),
        status: booking.status as 'confirmed' | 'pending' | 'canceled'
      };
      await Booking.create(bookingToCreate);
    }
    
    // Seed past bookings
    for (const booking of pastBookingsData) {
      // Fix typing issues for status
      const bookingToCreate = {
        ...booking,
        serviceName: cleanText(booking.serviceName),
        providerName: cleanText(booking.providerName),
        date: cleanText(booking.date),
        time: cleanText(booking.time),
        location: cleanText(booking.location),
        status: booking.status as 'confirmed' | 'pending' | 'canceled'
      };
      await Booking.create(bookingToCreate);
    }
    console.log('Bookings seeded');

    // Seed categories
    for (const category of categoriesData) {
      const categoryToCreate = {
        ...category,
        name: cleanText(category.name)
      };
      await Category.create(categoryToCreate);
    }
    console.log('Categories seeded');

    console.log('All data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Run seed function
seedData().then(() => {
  console.log('Seeding completed');
  process.exit(0);
}).catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});