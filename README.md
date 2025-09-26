# 🚀 Minimal Express.js TypeScript Boilerplate

A lightweight, production-ready Express.js boilerplate with TypeScript, MongoDB, and JWT authentication. **57% fewer dependencies** than typical boilerplates.

## ✨ Features

- **JWT Authentication** with access & refresh tokens
- **Role-based Authorization** (Admin, Customer, Provider)
- **MongoDB Integration** with Mongoose
- **TypeScript** with strict configuration
- **Security Headers** with Helmet & CORS
- **Input Validation** with Zod schemas
- **Error Handling** with custom error classes
- **Modular Architecture** for scalability

## 📦 Dependencies

**Runtime (10):** express, mongoose, bcrypt, jsonwebtoken, helmet, cors, cookie-parser, dotenv, http-status, zod

**Dev (11):** typescript, ts-node-dev, eslint, @typescript-eslint/_, @types/_

## 🚀 Quick Start

1. **Clone & Install**

   ```bash
   git clone <your-repo>
   cd your-project
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Configure your `.env`:

   ```env
   NODE_ENV=development
   PORT=1337
   DB_URL=mongodb://localhost:27017/your-db
   JWT_ACCESS_SECRET=your-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret
   BCRYPT_SALT_ROUNDS=12
   ```

3. **Start Development**
   ```bash
   npm run start:dev
   ```

## 📚 API Endpoints

### Health Check

```
GET /health
```

### Authentication

```
POST /api/auth/register   # Register user
POST /api/auth/login      # Login user
POST /api/auth/forgot-password # Password reset
```

### User Management

```
GET /api/users           # Get all users (Admin)
GET /api/users/:id       # Get user by ID
PATCH /api/users/:id     # Update user
```

### Admin Operations

```
PATCH /api/admin/users/:userId/block # Block user (Admin)
```

## 🛠️ Scripts

```bash
npm run start:dev     # Development server
npm run start:prod    # Production server
npm run build         # Build TypeScript
npm run lint          # ESLint check
npm run lint:fix      # Fix ESLint errors
```

## 📁 Project Structure

```
src/
├── app/
│   ├── config/         # Environment configuration
│   ├── errors/         # Custom error handlers
│   ├── middlewares/    # Express middlewares
│   ├── modules/        # Feature modules
│   │   ├── auth/       # Authentication
│   │   ├── user/       # User management
│   │   ├── admin/      # Admin operations
│   │   └── order/      # Order management
│   ├── routes/         # Route aggregation
│   └── utils/          # Utility functions
├── app.ts              # Express app setup
└── server.ts           # Server entry point
```

## 🔒 Security

- **Password hashing** with bcrypt
- **JWT tokens** with configurable expiration
- **Security headers** via Helmet
- **Input validation** with Zod schemas
- **Role-based access control**
- **CORS** configuration

## 🧰 Bonus

[Express CLI](https://github.com/abir-islam-z/express-cli)
A simple CLI to generate Express.js modules, controllers, services, models, routes, validations, and interfaces.
