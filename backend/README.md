# Student Course Management API

A simple REST API for managing students, courses, and enrollments, built with Express, MongoDB (Mongoose), and JWT auth.

## Requirements

- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally (or a connection string to a remote database, e.g. MongoDB Atlas)

## Setup

1. **Clone the repo and go into the backend folder**
   ```
   git clone https://github.com/Abdulrahman-Ehab-75/Student-Course-Management.git
   cd Student-Course-Management/backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Create your local config file**

   Copy `config.env.example` to a new file named `config.env`:
   ```
   cp config.env.example config.env
   ```
   Then open `config.env` and fill in your own values:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/student_course_management
   JWT_SECRET=any_random_string_here
   ADMIN_NAME=Admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=change_me
   ```
   `config.env` is git-ignored — never commit it, since it can hold real secrets.

4. **Start MongoDB** (if running locally, make sure the `mongod` service/app is running).

5. **Run the server**
   ```
   npm run dev
   ```
   You should see:
   ```
   app listen on port 3000
   Connected to MongoDB
   ```
   The API is now available at `http://localhost:3000`.

## Creating an admin user

New registrations are always created as `student`. To get an admin account, set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `config.env`, then run:
```
npm run seed:admin
```
This creates that user as an admin (or promotes them if they already exist).

## Authentication

Register or log in to get a token, then send it on every other request as the `authorization` header (no `Bearer ` prefix):
```
authorization: <token>
```

- `POST /auth/register` — body `{ name, email, password }`
- `POST /auth/login` — body `{ email, password }`

## Endpoints

| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/users/profile` | logged in | view own profile |
| PATCH | `/users/profile` | logged in | update own profile |
| GET | `/users` | admin | list all users |
| PATCH | `/users/:id/role` | admin | change a user's role |
| GET | `/courses` | logged in | list courses (supports `?title=` and `?category=`) |
| GET | `/courses/:id` | logged in | get one course |
| POST | `/courses` | admin | create a course |
| PUT | `/courses/:id` | admin | replace a course |
| PATCH | `/courses/:id` | admin | update part of a course |
| DELETE | `/courses/:id` | admin | delete a course |
| GET | `/enrollments/my` | logged in | list my enrollments |
| POST | `/enrollments` | logged in | enroll in a course, body `{ courseId }` |
| DELETE | `/enrollments/:id` | logged in | cancel an enrollment (own, or any if admin) |

## Project structure

```
controllers/   request handlers
routes/        Express routers
models/        Mongoose schemas
middlewares/   auth, admin check, error handler
utils/         helpers (JWT signing)
scripts/       one-off scripts (e.g. seeding an admin)
index.js       app entry point
```
