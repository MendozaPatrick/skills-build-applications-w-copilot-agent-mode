# OctoFit Tracker Backend API Documentation

## Overview
RESTful API for the OctoFit Tracker application with Express.js, TypeScript, and MongoDB.

## Directory Structure
```
backend/
├── src/
│   ├── models/
│   │   ├── User.ts           # User schema and interface
│   │   └── WorkoutSession.ts # Workout session schema
│   ├── routes/
│   │   ├── users.ts          # User CRUD endpoints
│   │   └── workouts.ts       # Workout CRUD endpoints
│   ├── middleware/
│   │   └── errorHandler.ts   # Error handling middleware
│   └── index.ts              # Main application entry
├── package.json
├── tsconfig.json
└── .env.example
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running

### Users
- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Workouts
- **GET** `/api/workouts` - Get all workout sessions
- **GET** `/api/workouts/user/:userId` - Get workouts for a user
- **POST** `/api/workouts` - Create new workout session
- **PUT** `/api/workouts/:id` - Update workout session
- **DELETE** `/api/workouts/:id` - Delete workout session

## Models

### User
```typescript
{
  name: string (required)
  email: string (required, unique)
  age: number (required)
  weight: number (required)
  height: number (required)
  goal: string (required)
  createdAt: Date
  updatedAt: Date
}
```

### WorkoutSession
```typescript
{
  userId: ObjectId (required, references User)
  exerciseName: string (required)
  duration: number (required, in minutes)
  caloriesBurned: number (required)
  date: Date (default: current date)
  createdAt: Date
  updatedAt: Date
}
```

## Setup & Running

### Prerequisites
- Node.js v18+
- MongoDB running locally

### Installation
```bash
cd octofit-tracker/backend
npm install
```

### Development
```bash
npm run dev
```
Server runs on `http://localhost:8000`

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## Environment Variables
Create a `.env` file (or copy `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
PORT=8000
NODE_ENV=development
```

## Example Requests

### Create User
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "weight": 70,
    "height": 180,
    "goal": "Weight Loss"
  }'
```

### Create Workout
```bash
curl -X POST http://localhost:8000/api/workouts \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "exerciseName": "Running",
    "duration": 30,
    "caloriesBurned": 300
  }'
```

## Error Handling
All errors return appropriate HTTP status codes with error messages.
