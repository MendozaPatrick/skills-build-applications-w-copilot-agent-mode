# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Node.js, Express, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── backend/           # Node.js + Express + TypeScript API
    ├── src/
    ├── dist/
    └── package.json
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Port**: 5173

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Mongoose** - MongoDB data access
- **Port**: 8000

### Database
- **MongoDB** - NoSQL database
- **Port**: 27017

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or accessible at `mongodb://localhost:27017`

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

Backend will be running at `http://localhost:8000`

### API Health Check

```bash
curl http://localhost:8000/api/health
```

## Development

### Build Frontend
```bash
cd frontend
npm run build
```

### Build Backend
```bash
cd backend
npm run build
```

## License

MIT
