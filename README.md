# 🚀 Node.js TypeScript Boilerplate

A production-ready Node.js boilerplate with Express.js, TypeScript, MongoDB, JWT authentication, and comprehensive email service.

## ✨ Features

### 🔐 Authentication & Security

- **JWT Authentication** with access & refresh tokens
- **Role-based Authorization** (Admin, Customer, Provider)
- **Password Hashing** with bcrypt
- **Rate Limiting** (100 requests per 15 minutes)
- **Security Headers** with Helmet
- **CORS Configuration** with environment-based origins
- **Input Validation** with Zod schemas

### 📧 Email Service

- **Multi-provider Support** (Gmail, Outlook, Yahoo, SendGrid, Mailgun, Custom SMTP)
- **Template System** with Handlebars
- **Pre-built Templates** (Welcome, Password Reset, Email Verification)
- **Portable Configuration** - easy to switch providers

### 🏗️ Architecture

- **Modular Structure** with clean separation of concerns
- **TypeScript** with strict type checking
- **Path Aliases** for clean imports (`@app/*`, `@modules/*`)
- **Error Handling** with custom error classes
- **Consistent Response Format** with `sendResponse` utility
- **Database Integration** with Mongoose

### 🧪 Testing & Quality

- **Jest** testing framework with TypeScript support
- **ESLint** with TypeScript rules
- **Prettier** code formatting
- **Husky** pre-commit hooks
- **Code Coverage** reports

### 🚀 DevOps Ready

- **Health Check** endpoint
- **Environment Configuration** with validation
- **Structured Logging** with Winston
- **Error Tracking** and monitoring
- **Docker Ready** (configuration included)

## 📁 Project Structure

```
src/
├── app/
│   ├── config/           # Configuration files
│   ├── errors/           # Custom error handlers
│   ├── interface/        # TypeScript interfaces
│   ├── middlewares/      # Express middlewares
│   ├── modules/          # Feature modules
│   │   ├── admin/        # Admin functionality
│   │   ├── auth/         # Authentication
│   │   ├── mail/         # Email service
│   │   ├── order/        # Order management
│   │   └── user/         # User management
│   ├── routes/           # Route definitions
│   ├── services/         # Business logic services
│   ├── templates/        # Email templates
│   └── utils/            # Utility functions
├── tests/                # Test files
├── app.ts               # Express app configuration
└── server.ts            # Server entry point
```

## 🛠️ Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nodejs-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   # Server Configuration
   PORT=1337
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000

   # Database
   DB_URL=mongodb://localhost:27017/your-database-name

   # JWT Configuration
   JWT_ACCESS_SECRET=your-super-secret-access-key-here
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
   JWT_REFRESH_EXPIRES_IN=365d

   # Bcrypt
   BCRYPT_SALT_ROUNDS=12

   # Email Configuration
   MAIL_PROVIDER=gmail
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USER=your-email@gmail.com
   MAIL_PASS=your-app-password
   MAIL_FROM_NAME=Your App Name
   MAIL_FROM_EMAIL=noreply@yourapp.com
   ```

4. **Start the development server**
   ```bash
   npm run start:dev
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer",
  "phone": "+1234567890"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Refresh Token

```http
POST /api/auth/refresh-token
```

### User Management

#### Get All Users (Admin)

```http
GET /api/users
Authorization: Bearer <admin-token>
```

#### Get User by ID

```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User

```http
PATCH /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

### Email Service

#### Test Mail Connection (Admin)

```http
GET /api/mail/test-connection
Authorization: Bearer <admin-token>
```

#### Send Test Email (Admin)

```http
POST /api/mail/send-test
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "to": "test@example.com",
  "subject": "Test Email",
  "message": "This is a test email"
}
```

#### Get Supported Providers (Admin)

```http
GET /api/mail/providers
Authorization: Bearer <admin-token>
```

### Health Check

```http
GET /health
```

## 🔧 Configuration

### Email Providers

The email service supports multiple providers. Configure in your `.env`:

#### Gmail

```env
MAIL_PROVIDER=gmail
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

#### SendGrid

```env
MAIL_PROVIDER=sendgrid
MAIL_USER=apikey
MAIL_PASS=your-sendgrid-api-key
```

#### Custom SMTP

```env
MAIL_PROVIDER=custom
MAIL_HOST=your-smtp-host.com
MAIL_PORT=587
MAIL_USER=your-username
MAIL_PASS=your-password
```

### Database

The application uses MongoDB with Mongoose. Configure your connection string:

```env
DB_URL=mongodb://localhost:27017/your-database-name
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Service and utility functions
- **Integration Tests**: API endpoints
- **Health Check Tests**: Basic functionality

## 📝 Scripts

```bash
# Development
npm run start:dev          # Start development server with hot reload
npm run start:prod         # Start production server

# Building
npm run build              # Build TypeScript to JavaScript
npm run check:types        # Type check without building

# Code Quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint errors
npm run prettier           # Format code with Prettier
npm run lint:all           # Run both linting and formatting

# Testing
npm test                   # Run tests
npm run test:watch         # Run tests in watch mode
```

## 🔒 Security Features

### Authentication

- JWT tokens with configurable expiration
- Refresh token rotation
- Password hashing with bcrypt
- Role-based access control

### Security Middleware

- **Helmet**: Security headers
- **Rate Limiting**: Prevent brute force attacks
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Zod schema validation

### Error Handling

- Custom error classes
- Structured error responses
- Development vs production error details
- Global error handler

## 📧 Email Templates

The email service includes pre-built templates:

### Welcome Email

- Sent automatically on user registration
- Customizable with user name and app branding

### Password Reset

- Secure token-based password reset
- Configurable expiration time
- Professional styling

### Email Verification

- Email address verification
- Template-based with consistent branding

### Custom Templates

Add new templates in `src/app/templates/email/`:

1. Create `.hbs` file
2. Use Handlebars syntax
3. Reference in your service

## 🚀 Deployment

### Environment Variables

Ensure all required environment variables are set in production:

```env
NODE_ENV=production
PORT=1337
DB_URL=mongodb://your-production-db
JWT_ACCESS_SECRET=your-production-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
MAIL_PROVIDER=your-mail-provider
MAIL_USER=your-mail-user
MAIL_PASS=your-mail-password
```

### Production Build

```bash
npm run build
npm run start:prod
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 1337
CMD ["npm", "run", "start:prod"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use path aliases for imports
- Write tests for new features
- Follow the existing code style
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error logs and environment details

## 🙏 Acknowledgments

- Express.js for the web framework
- TypeScript for type safety
- MongoDB for the database
- Jest for testing
- All the amazing open-source contributors

---

**Happy Coding! 🎉**
