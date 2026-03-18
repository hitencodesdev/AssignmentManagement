# Assignment Management System

A role-based Node.js web application for managing academic assignments between Admins, Professors, and Students. The system supports secure file uploads via Cloudinary, role-based authentication (JWT), and a clean server-rendered UI using EJS.

---

## ✅ Features

- Role-based access control (Admin / Professor / Student)
- Admin dashboard to manage departments and users
- Students can upload assignments via file upload
- Professors can review submissions, approve/reject, and download files
- Files stored securely in Cloudinary (via multer-storage-cloudinary)
- JWT-based authentication with bcrypt password hashing
- Tests written with Jest + Supertest

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **View Engine:** EJS
- **Database:** MongoDB (Mongoose ODM)
- **Auth & Security:** JWT, bcrypt, cookie-parser
- **File Uploads:** Multer + multer-storage-cloudinary
- **Cloud Storage:** Cloudinary SDK
- **Email (optional):** Nodemailer
- **Testing:** Jest, Supertest

---

## 📁 Project Structure

- `config/` – Configuration files (DB, Cloudinary, etc.)
- `controllers/` – Route handlers and business logic
- `middleware/` – Auth + role checks
- `models/` – Mongoose schemas and models
- `routes/` – Express route definitions
- `tests/` – Jest + Supertest tests
- `uploads/` – Temporary upload folder (optional)
- `views/` – EJS templates
- `index.js` – App entry point
- `.env.example` – Example env vars

---

## 🔧 Environment Variables

Create a `.env` file in the project root. Do **not** commit secrets.

Required variables:

```env
PORT=
MONGOOSE_URI=
SECRET_KEY=
CLOUDNAIRY_API_KEY=
CLOUDNAIRY_SECRET=
CLOUDNAIRY_NAME=
EMAIL=
APP_PASSWORD=
```

| Variable | Purpose |
| -------- | ------- |
| `PORT` | Server port (e.g., `5000`) |
| `MONGOOSE_URI` | MongoDB connection string |
| `SECRET_KEY` | JWT signing secret |
| `CLOUDNAIRY_*` | Cloudinary credentials for file uploads |
| `EMAIL`, `APP_PASSWORD` | Optional SMTP credentials for emails |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

```bash
git clone https://github.com/hitencodesdev/AssignmentManagement.git
cd AssignmentManagement
npm install
cp .env.example .env
# Update .env values
npm start
```

Then open the app at `http://localhost:5000` (or the port configured in `.env`).

---

## 🧑‍🤝‍🧑 User Roles

### Admin
- Manage departments
- Create / update / delete users (Professors, Students)

### Professor
- View submissions for assigned students
- Approve or reject assignments
- Download submitted files

### Student
- Upload assignment files
- Track submission status (pending / approved / rejected)

---

## 🧪 Testing

Run tests:

```bash
npm test
```

---

## 🛠️ Common Scripts

| Script | Description |
| ------ | ----------- |
| `npm start` | Start server with nodemon (development) |
| `npm test` | Run Jest + Supertest tests |

---

## 📌 Notes

- Ensure Cloudinary credentials are correct for file uploads to work.
- For local testing without Cloudinary, you may need to adjust the upload logic or use a local filesystem storage option.

---

## 📄 License

This project is licensed under the MIT License.
