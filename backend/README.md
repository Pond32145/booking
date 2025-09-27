# Booking System Backend

This is the backend service for the Booking System application. It provides RESTful APIs for managing venues, services, bookings, and categories.

## Technologies Used

- Node.js with TypeScript
- Express.js
- SQLite (development) / PostgreSQL (production)
- Sequelize ORM

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with initial data:
   ```bash
   npm run seed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on port 3001.

## API Endpoints

- `GET /api/venues` - Get all venues
- `GET /api/venues/:id` - Get a specific venue
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get a specific service
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings/:id/cancel` - Cancel a booking
- `GET /api/categories` - Get all categories

## Database

The application uses SQLite for development and PostgreSQL for production. The database is automatically created and seeded when you run `npm run seed`.

## Environment Variables

Create a `.env` file in the backend root directory to configure environment variables:

```
PORT=3001
DB_PATH=./database.sqlite
```