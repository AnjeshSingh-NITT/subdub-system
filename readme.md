# Subscription Tracker
## Description
 This is a subscription management system backend built with Node.js, Express, and MongoDB. It provides functionalities for user authentication, subscription creation, management, and retrieval.

## Features
- User registration and authentication (JWT-based)
- Subscription creation, updating, and deletion
- Fetching user-specific subscriptions
- Upcoming renewal notifications
- Middleware for error handling and request validation
- Rate Limiting, bot detection and added security using Arcjet middleware

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt.js (for password hashing)
- Arcjet (for security, rate limiting and bot detection)

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/signup`  
  Register a new user

- **POST** `/api/v1/auth/login`  
  Log in an existing user

- **POST** `/api/v1/auth/logout`  
  Log out the current user

---

### User Management

- **GET** `/api/v1/users/me`  
  Get the current user's details

- **PUT** `/api/v1/users/me`  
  Update the current user's details

- **DELETE** `/api/v1/users/me`  
  Delete the current user

---

### Subscription Management

- **GET** `/api/v1/subscriptions`  
  Get all subscriptions

- **POST** `/api/v1/subscriptions`  
  Create a new subscription

- **GET** `/api/v1/subscriptions/user/me`  
  Get subscriptions for the current user

- **GET** `/api/v1/subscriptions/upcoming-renewals`  
  Get upcoming renewals for the current user

- **GET** `/api/v1/subscriptions/:id`  
  Get a subscription by ID

- **PUT** `/api/v1/subscriptions/:id`  
  Update a subscription by ID

- **DELETE** `/api/v1/subscriptions/:id`  
  Delete a subscription by ID

- **PUT** `/api/v1/subscriptions/:id/cancel`  
  Cancel a subscription

