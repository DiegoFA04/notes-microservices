# Notes Microservices Application

A modern microservices architecture for a note-taking application built with NestJS. This project demonstrates a production-ready microservices setup with separate services for authentication and note management.

## Architecture Overview

This project consists of three main components:

- **API Gateway**: Entry point for all client requests, handles routing to appropriate microservices
- **Auth Microservice**: Handles user authentication and authorization using PostgreSQL
- **Notes Microservice**: Manages note creation and retrieval using MongoDB

## Technologies Used

- **Framework**: NestJS
- **Communication**: NATS for microservice communication
- **Databases**:
  - PostgreSQL (Auth service)
  - MongoDB (Notes service)
- **ORM/ODM**: Prisma for database interactions
- **Authentication**: JWT (JSON Web Tokens)
- **Development Tools**: Docker & Docker Compose

## Prerequisites

- Node.js (v18+)
- Docker and Docker Compose
- NATS server running

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-microservices.git
cd notes-microservices
```

### 2. Set up environment variables

Create `.env` files in each microservice directory:

**Auth Microservice (.env)**

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/auth_db
JWT_SECRET=your_secret_key
JWT_EXPIRATION=30d
```

**Notes Microservice (.env)**

```
DATABASE_URL=mongodb://username:password@localhost:27017/notes-db?authSource=admin
```

**Gateway (.env)**

```
PORT=3000
NATS_URL=nats://localhost:4222
```

### 3. Start the services

```bash
# Start all services with Docker Compose
docker-compose up -d

# Or start each service individually
cd gateway && npm run start:dev
cd auth-microservice && npm run start:dev
cd notes-microservice && npm run start:dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user
- `GET /api/auth/verify` - Verify JWT token

### Notes

- `POST /api/notes` - Create a new note
- `GET /api/notes` - Get all notes for the authenticated user

## Project Structure

```
notes-microservices/
├── docker-compose.yml
├── README.md
├── auth-microservice/       # Authentication service
│   ├── src/
│   │   ├── auth/            # Auth module
│   │   └── config/          # Configuration
│   └── prisma/              # Prisma schema & migrations
├── gateway/                 # API Gateway
│   └── src/
│       ├── auth/            # Auth forwarding
│       ├── notes/           # Notes forwarding
│       └── transports/      # NATS transport
└── notes-microservice/      # Notes management service
    ├── src/
    │   ├── notes/           # Notes module
    │   └── config/          # Configuration
    └── prisma/              # Prisma schema
```

## Development

### Adding a New Microservice

1. Create a new directory for your microservice
2. Initialize a new NestJS project
3. Configure NATS client in the new microservice
4. Add routing in the API gateway

### Database Migrations

**Auth Microservice (PostgreSQL)**

```bash
cd auth-microservice
npx prisma migrate dev --name migration_name
```

**Notes Microservice (MongoDB)**

```bash
cd notes-microservice
npx prisma db push
```

## Deployment

The application is containerized and can be deployed with Docker Compose or to a Kubernetes cluster.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
