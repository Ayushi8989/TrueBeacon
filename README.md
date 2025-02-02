# TrueBeacon

## Prerequisites

Before running the project, ensure you have the following installed on your local machine:

- Node.js (Recommended version: v16.x or higher)
- npm (Node Package Manager)
- Git (for version control)

## Setting Up the Project
Follow these steps to install dependencies and run the project:

### 1. Clone the Repository
Clone the repository to your local machine using Git:

```bash
git clone https://github.com/Ayushi8989/TrueBeacon.git
```
Navigate to the project directory:
```bash
cd TrueBeacon
```
### 2. Install Dependencies  
#### 2.1 Install backend dependencies
```bash
cd server
npm install
```
#### 2.1 Install frontend dependencies
```bash
cd ../client
npm install
```

### 3. Configure Environment Variables
#### 3.1 Add .env to your server directory
```bash
PORT=5000
JWT_SECRET=your-jwt-secret
```

#### 3.2 Add a env file to your client directory
```bash
API_BASE_URL=http://127.0.0.1:5000
WEB_SOCKET_URL=ws://localhost:5000/ws
```
### 4. Running the project

#### 4.1 Run the Backend Server
```bash
npm start
```
#### 4.2 Run the Frontend Client
```bash
npm run dev
```

Once both servers are running, you can access the application in your browser at:

Backend API: http://127.0.0.1:5000
Frontend: http://localhost:3000
