# CloudOpsHub Backend

NestJS backend for CloudOpsHub SaaS DevOps Platform.

## Tech Stack

- NestJS
- PostgreSQL (Supabase) - to be configured
- Redis (Upstash) - to be configured
- JWT Authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - Set `JWT_SECRET` to a strong random string
   - Configure `JWT_EXPIRES_IN` (default: 1d)

4. Run the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Auth

- `POST /auth/register` - Register a new user
  - Body: `{ email: string, password: string, name: string }`
  - Returns: `{ accessToken: string, user: { id, email, name } }`

- `POST /auth/login` - Login user
  - Body: `{ email: string, password: string }`
  - Returns: `{ accessToken: string, user: { id, email, name } }`

## Authentication

Protected routes should use `@UseGuards(JwtAuthGuard)` decorator.

Example:
```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@Request() req) {
  return req.user;
}
```
