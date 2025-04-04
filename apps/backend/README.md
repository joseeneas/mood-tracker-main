# Mood Tracker Backend

## Overview

The Mood Tracker Backend is a Node.js application that provides a RESTful API for managing mood data. It connects to a PostgreSQL database to store and retrieve mood entries.

## Instructions for Running the Application

### Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation) (Optional, but recommended)

### Running with Docker

1. Copy the example environment file and adjust the values as needed:

   ```sh
   cp apps/backend/.env.example apps/backend/.env
   ```

2. Start the application using Docker Compose:

   ```sh
   docker-compose up --build
   ```

### Running Locally

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Copy the example environment file and adjust the values as needed:

   ```sh
   cp apps/backend/.env.example apps/backend/.env
   ```

3. Start the application:

   ```sh
   pnpm dev
   ```

### Accessing the application

The backend will be accessible at [http://localhost:1847](http://localhost:1847).

## Design Decisions and Assumptions

- **Environment Variables**: Sensitive information such as API keys and database URLs are managed using environment variables.
- **Docker**: The application is containerized using Docker to ensure consistency across different environments.

## API Documentation

### Authentication

All API requests must include the `STATIC_API_KEY` as a bearer token in the `Authorization` header:

```http
Authorization: Bearer <STATIC_API_KEY>
```

### Endpoints

#### Get Moods

- **URL**: `/api/moods`
- **Method**: `GET`
- **Description**: Retrieves a list of mood entries.
- **Response**:

  ```json
  [
    {
      "id": 1,
      "mood": "happy",
      "timestamp": "2023-10-01T12:00:00Z"
    },
    ...
  ]
  ```

#### Add Mood

- **URL**: `/api/moods`
- **Method**: `POST`
- **Description**: Adds a new mood entry.
- **Request Body**:

  ```json
  {
  	"mood": "happy"
  }
  ```

- **Response**:

  ```json
  {
  	"id": 1,
  	"mood": "happy",
  	"timestamp": "2023-10-01T12:00:00Z"
  }
  ```

## Third-Party Libraries

- **express**: Web framework for building the API.
- **pg**: PostgreSQL client for Node.js to interact with the database.
- **dotenv**: Loads environment variables from a `.env` file.
- **body-parser**: Middleware to parse incoming request bodies.

These libraries were chosen for their reliability, community support, and ease of integration with Node.js applications.
