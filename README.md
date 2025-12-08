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

<<<<<<< HEAD
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
=======
# Features
Role-based access control with three roles: Admin, Professor, and Student.   
Admin interface to create, update, and delete departments and users.  
Students can upload assignment files to a specific professor.  
Professors can view submissions, approve or reject them, and download files for review.  
Assignment files are uploaded and stored securely on Cloudinary instead of the local filesystem.  

# Tech Stack
Runtime: Node.js    
Framework: Express  
View Engine: EJS (server-side rendered views)    
Database: MongoDB with Mongoose ODM​  
Authentication & Security:JSON Web Tokens (JWT)  
bcrypt for password hashing   
cookie-parser for cookie handling   
File Upload & Storage:Multer for handling multipart/form-data   
multer-storage-cloudinary and Cloudinary SDK for cloud uploads  
Mailing: Nodemailer (for email-related features if configured)   
Testing: Jest and Supertest  

# Project Structure  
config/         # Configuration (database, Cloudinary, etc.)   
controllers/    # Route handlers and business logic  
middleware/     # Authentication, role checks, and other middleware  
models/         # Mongoose schemas and models   
routes/         # Express route definitions  
tests/          # Jest / Supertest test suites  
uploads/        # Optional temporary upload directory   
views/          # EJS templates for server-side rendered pages   
.env            # Local environment variables (ignored by git)   
.env.example    # Example env file for reference   
index.js        # Application entry point   
package.json    # NPM scripts and dependencies   
README.md       # Project documentation   
​
# Environment Variables
Create a .env file in the project root   
The application uses the following keys:  
PORT=   
MONGOOSE_URI=   
SECRET_KEY=  
CLOUDNAIRY_API_KEY=   
CLOUDNAIRY_SECRET=  
CLOUDNAIRY_NAME=  
EMAIL=  
APP_PASSWORD=  
KEY=  
PORT – Port on which the server runs (e.g., 5000).  
MONGOOSE_URI – MongoDB connection string (Atlas or local).  
SECRET_KEY / KEY – Secrets for signing JWTs or other security operations.  
CLOUDNAIRY_* – Cloudinary credentials for uploading and accessing assignment files.​  
EMAIL, APP_PASSWORD – Credentials for the email account used via Nodemailer.  

# Getting Started
Prerequisites  
Node.js (recommended: version 18 or later).  
MongoDB instance (local or MongoDB Atlas).  
Cloudinary account for file storage.​ 

# Installation
Clone the repository  
bash 
git clone https://github.com/hitencodesdev/AssignmentManagement.git 
cd AssignmentManagement  
Install dependencies  
 
bash  
npm install 
Configure environment variables  

Create a .env file using the keys listed above.   
Optionally maintain a .env.example file (without real secrets) for reference.  
Start the development server  

bash 
npm start 
The app runs using nodemon index.js and listens on the port defined in PORT .  

Run tests  
bash  
npm test  
This runs the Jest test suite and any HTTP tests defined with Supertest.  

# User Roles  
# Admin  
Create, update, and delete departments.   
Create, update, and delete users (HOD , professors, students).   
Maintain system-level data and mappings between departments, professors, and students.  

# Student
Log in to access the assignment submission interface.
Select a professor (typically based on department or course) and upload an assignment file.
View the current status of each submission (such as pending, approved, or rejected).

# Professor
View all assignments submitted to them.   
Download assignment files from Cloudinary for offline review.    
Change the status of assignments to approved or rejected, optionally with feedback depending on the implementation.    

# Assignment & File Workflow   
Students upload assignment files through EJS-based forms.    
Multer processes the uploads and passes them through multer-storage-cloudinary to Cloudinary.        
Cloudinary returns secure URLs and metadata, which are stored in MongoDB for each assignment record.​    
Professors use these stored URLs to access and download assignment files when reviewing work.                              
Status updates (pending → approved / rejected) capture the assignment lifecycle and can be shown in the student interface.     

# Scripts
From package.json:
json
"scripts": {
  "test": "jest",
  "start": "nodemon index.js"
}
npm start – Runs the server in development mode with automatic restarts via nodemon.


npm test – Executes Jest tests (and Supertest-based API tests where defined).


