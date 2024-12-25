# Task Management Application

## Frontend

This project is a React-based Task Management Application that includes user authentication and task management functionalities. It leverages React Router for navigation, protected routes for secure access, and integrates with a backend API for user and task data.

## Features

### Authentication
- **Sign Up**: Register new users.
- **Login**: Authenticate existing users using email and password.
- **Protected Routes**: Ensure secure access to certain pages using JWT tokens.

### Task Management
- **View Tasks**: Fetch and display tasks from the backend.
- **Add Task**: Create new tasks with fields like name, description, status, priority, and due date.
- **Edit Task**: Modify task details.
- **Delete Task**: Remove tasks from the list.
- **Filter Tasks**: Filter tasks based on their status.

## Technologies Used

- **Frontend**:
  - React
  - React Router DOM
  - React Icons
  - js-cookie
  - ThreeDots (Loader Spinner)

- **Backend**:
  - API endpoints for user authentication and task management (e.g., `/login`, `/register`, `/tasks`).

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

## File Structure

- **App.js**: Main application component with routing logic.
- **components**:
  - **Login.js**: Handles user login.
  - **SignUp.js**: Manages user registration.
  - **Task.js**: Main task management component.
  - **ProtectedRoute.js**: Component for securing routes.
- **index.css**: Application styling.

## API Endpoints

- **POST /login**: User authentication.
- **POST /register**: User registration.
- **GET /tasks**: Fetch all tasks.
- **POST /tasks**: Add a new task.
- **PUT /task/:id**: Update an existing task.
- **DELETE /task/:id**: Delete a task.

## Usage

1. **Authentication**:
   - Sign up as a new user or log in as an existing user.
   - Upon successful login, a JWT token is stored in cookies.

2. **Task Management**:
   - View tasks categorized by status.
   - Add, edit, or delete tasks as needed.
   - Use filters to organize tasks by status.

## Deployment

The application can be deployed using any hosting platform supporting React (e.g., Vercel, Netlify). Ensure the backend API is deployed and accessible.

___

# Task Management API
## Backend

A **Task Management API** built with **Express.js** and **MongoDB**. This API allows users to register, log in, create tasks, update tasks, delete tasks, and fetch user-specific tasks or profile information.

## Features
1. **User Management**
   - Register a new user.
   - User login with JWT authentication.
   - Fetch user profile details.

2. **Task**
   - Create a task with task, description, status, priority and due date.
   - Update task details.
   - Delete a task.
   - Retrieve all tasks for a specific user.

3. **Authentication**
   - Secure endpoints using **JWT (JSON Web Tokens)**.

4. **Database**
   - MongoDB is a tool that can manage document-oriented information, store or retrieve information.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) installed on your system.
- Basic understanding of REST APIs.
- MongoDB database.

### Setup

## 1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
  ```
### 2. Install dependencies:
```bash
npm install
```
### 3. Create a .env file in the root directory with the following content:
```bash
DB_USER=Database_User
DB_PASSWORD=Database_Password
DB_CLUSTER=Database_Cluster
DB_NAME=Database_Name
JWT_SECRET=your_secret_key
```
### 4. Start the server:
```bash
node <file-name>.js
```
Replace <file-name> with the name of your server file.

## API Endpoints
### 1. Register New User
- Endpoint: /register
- Method: POST
- Request Body:
```bash
{
  "username": "Srikanth",
  "email": "srikanth4@gmail.com",
  "password": "srikanth"
}
```
- **Response**:
```bash
{
  "message": "User Registered Successfully"
}
```
### 2. Login
- Endpoint: /login
- Method: POST
- Request Body:
```bash
{
  "email": "srikanth4@gmail.com",
  "password": "srikanth"
}
```
- **Response**:
```bash
{
  "jwtToken": "your_generated_jwt_token"
}
```

## Task APIs
### 3. Create a Task
- URL: /api/tasks
- Method: POST
- Headers: Authorization: Bearer <jwt-token>
- Request Body:
```bash
{
  "title": "Sample Task",
  "description": "This is a sample task description.",
  "status": "Pending",
   "priority": "Low",
   "dueData": "01-01-2025"
}
```
- **Response**:
```bash
{
  "message": "Task added successfully",
  "taskId": 1
}
```

### 4. Delete a Task
- URL: /api/task/:id
- Method: DELETE
- Headers: Authorization: Bearer <jwt-token>
- **Response**:
```bash
{
  "message": "Task deleted successfully"
}
```

### 5. Update a Task
- URL: /api/task/:id
- Method: PUT
- Headers: Authorization: Bearer <jwt-token>
- Request Body:
```bash
{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "Completed",
   "priority": "High",
   "dueData": "01-01-2025"
}
```
- **Response**:
```bash
{
  "message": "Task updated successfully"
}
```

### 6. Get All Tasks
- URL: /api/tasks
- Method: GET
- Headers: Authorization: Bearer <jwt-token>
- **Response**:
```bash
{
  /* Tasks details */
}
```

### 7. Get User Details
- URL: /api/profile
- Method: GET
- Headers: Authorization: Bearer <jwt-token>
- **Response**:
```bash
{
  /* User details */
}
```


## Dependencies
- Node.js: Server-side JavaScript runtime.
- express: Fast, unopinionated web framework
- cors: Enable Cross-Origin Resource Sharing
- MongoDB: MongoDB is a tool that can manage document-oriented information, store or retrieve information
- jsonwebtoken: Authenticate and secure API
- bcrypt: Hash passwords for secure storage
- dotenv: Manage environment variables

## Notes
- Ensure that the .env file is properly configured with the secret key.

