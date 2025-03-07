# Backend Service Documentation

## Overview
This is the backend service for the Bucket URL project, built with Node.js, Express.js, and Prisma ORM. It provides API endpoints for file management and uses Google Cloud Storage for file storage.

## Tech Stack
- Node.js
- Express.js
- Prisma ORM
- Google Cloud Storage
- PostgreSQL (via Prisma)

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Google Cloud Storage account and credentials
- npm or yarn package manager

## Project Structure
```
be/
├── prisma/         # Prisma schema and migrations
├── src/            # Source code
├── .env            # Environment variables
├── credentials.json # Google Cloud credentials
├── server.js       # Main application entry
└── package.json    # Project dependencies
```

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="your-database-url"
PORT=8000
GOOGLE_CLOUD_PROJECT_ID="your-project-id"
GOOGLE_CLOUD_BUCKET_NAME="your-bucket-name"
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client:
```bash
npm run prisma:generate
```

3. Run database migrations:
```bash
npm run prisma:migrate
```

## Available Scripts
- `npm start`: Start the production server
- `npm run dev`: Start development server with hot-reload
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations

## Dependencies
### Main Dependencies
- @google-cloud/storage: ^7.15.2
- @prisma/client: ^6.4.1
- cors: ^2.8.5
- dotenv: ^16.4.7
- express: ^4.21.2
- multer: ^1.4.5-lts.1
- prisma: ^6.4.1

### Dev Dependencies
- nodemon: ^3.1.9

## API Endpoints
The service provides the following endpoints:
- File Upload
- File Download
- File Management
(Specific endpoint documentation should be added based on your implementation)

## Google Cloud Storage Setup
1. Create a Google Cloud project
2. Enable Google Cloud Storage API
3. Create a service account and download credentials
4. Place the credentials.json file in the root directory
5. Configure the bucket name in your .env file

## Development
To start the development server:
```bash
npm run dev
```
The server will start on http://localhost:8000 (or your specified PORT)

## Production
To start the production server:
```bash
npm start
```

## Error Handling
The application includes error handling for:
- File upload errors
- Database connection issues
- Invalid requests
- Authentication errors

## Security
- Environment variables for sensitive data
- Secure file upload handling
- CORS configuration
- Input validation

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 