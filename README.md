# Assignment Management System

A role-based Node.js web application for managing academic assignments between admins, professors, and students. The system supports secure file uploads using Cloudinary.

Table of Contents

Overview

Features

Tech Stack

Project Structure

Environment Variables

Getting Started

Installation

User Roles

Admin

Student

Professor

Assignment & File Workflow

Scripts

License

Overview

This project provides a centralized platform for departments, professors, and students to digitally manage assignments. It prioritizes strong role separation, straightforward workflows for uploading and reviewing assignments, and reliable cloud storage for files.

Features

Role-based Access Control: Admin, Professor, Student

Admin Capabilities:

Manage departments

Create, update, delete users

Student Capabilities:

Upload assignment files

View submission status

Professor Capabilities:

Review submissions

Approve or reject assignments

Download files

Cloudinary Integration for secure, scalable file storage

JWT-based Authentication

Secure Password Hashing (bcrypt)

Tech Stack

Runtime: Node.js

Framework: Express

View Engine: EJS

Database: MongoDB (Mongoose ODM)

Authentication & Security:

JSON Web Tokens (JWT)

bcrypt

cookie-parser

File Upload:

Multer

multer-storage-cloudinary

Cloudinary SDK

Mailing (optional): Nodemailer

Testing: Jest, Supertest

config/         # Database, Cloudinary configuration
controllers/    # Route handlers and business logic
middleware/     # Authentication, authorization, other middleware
models/         # Mongoose schemas and models
routes/         # Express routes
tests/          # Jest / Supertest tests
uploads/        # Temporary upload folder (optional)
views/          # EJS templates
.env            # Environment variables (ignored by Git)
.env.example    # Example environment variable file
index.js        # Server entry point
package.json    # Scripts and dependencies
README.md       # Project documentation

## Environment Variables

Create a .env file in the project root. Never commit sensitive values.

Required keys:

PORT=
MONGOOSE_URI=
SECRET_KEY=
CLOUDNAIRY_API_KEY=
CLOUDNAIRY_SECRET=
CLOUDNAIRY_NAME=
EMAIL=
APP_PASSWORD=
KEY=

| Variable                | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `PORT`                  | Port for server (e.g., 5000)             |
| `MONGOOSE_URI`          | MongoDB connection string                |
| `SECRET_KEY` / `KEY`    | JWT or other security secrets            |
| `CLOUDNAIRY_*`          | Cloudinary API credentials               |
| `EMAIL`, `APP_PASSWORD` | Credentials for Nodemailer email account |

## Getting Started

### Prerequisites

Node.js (v18+ recommended)
MongoDB (local or Atlas)
Cloudinary account

### Installation

1. Clone the repository

git clone https://github.com/hitencodesdev/AssignmentManagement.git
cd AssignmentManagement
npm start
