Event Management Backend
A robust TypeScript backend for event management with Stripe payment integration, TypeORM database management, and comprehensive validation using DTOs and mappers.
Table of Contents

Overview
Architecture
Features
Technologies Used
Installation
Project Structure
API Documentation
Configuration
Database Schema
Validation & DTOs
Stripe Integration
Testing
Deployment
Contributing
License

Overview
This is a comprehensive backend service for event management built with TypeScript, Express.js, and TypeORM. The system features secure authentication, payment processing via Stripe, email notifications, and follows clean architecture principles with dependency injection.
Author: Anandakrishnan PM
Repository Architecture: Machine Task Event Management Backend
Architecture
The application follows a clean architecture pattern with:

Controllers: Handle HTTP requests and responses
Services: Business logic implementation
Repositories: Data access layer with TypeORM
DTOs: Data Transfer Objects for validation
Mappers: Transform between entities and DTOs
Middleware: Authentication, validation, and error handling
Dependency Injection: Using TSyringe for IoC

Features
Core Features

User Authentication & Authorization: JWT-based auth with bcrypt password hashing
Event Management: Full CRUD operations for events
Payment Processing: Stripe integration for event payments
Email Notifications: Nodemailer for automated email sending
Data Validation: Class-validator with DTOs
Database Management: TypeORM with MongoDB
CORS Support: Cross-origin resource sharing
Cookie Management: Secure cookie handling

Technical Features

TypeScript: Full type safety and modern ES features
Dependency Injection: Modular and testable code structure
Repository Pattern: Clean data access abstraction
DTO/Mapper Pattern: Request/response transformation
Middleware Chain: Extensible request processing
Environment Configuration: Flexible deployment settings

Technologies Used
Core Technologies

Runtime: Node.js with TypeScript
Framework: Express.js 4.21.2
Database: MongoDB with TypeORM 0.3.26
Authentication: JWT (jsonwebtoken 9.0.2) + bcrypt 5.1.1
Payment: Stripe 14.25.0
Email: Nodemailer 6.10.1
Validation: class-validator 0.14.2
DI Container: TSyringe 4.10.0

Development Tools

Build: TypeScript 5.9.2
Development: ts-node-dev 2.0.0
Type Definitions: @types/* packages for all dependencies

Installation
Prerequisites

Node.js (v18+ recommended)
npm or yarn
MongoDB database
Stripe account for payment processing

Setup Instructions

Clone the Repository
bashgit clone <repository-url>
cd event_management

Install Dependencies
bashnpm install


# Database Configuration
DB_URL=mongodb://localhost:27017/event_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Nodemailer)
EMAIL_PASS = your_password
EMAIL_USER = your_username

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Cookie Configuration
COOKIE_SECRET=your_cookie_secret
COOKIE_SECURE=false
COOKIE_HTTP_ONLY=true
COOKIE_SAME_SITE=lax


Deployment
Production Build

# Build TypeScript
npm run build

# Start production server
npm start