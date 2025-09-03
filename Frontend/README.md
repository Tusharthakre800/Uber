


          
# Uber Clone - Full Stack Project Documentation

## 🚀 Project Overview

This is a comprehensive Uber clone application built with React.js frontend and Node.js backend. The project includes real-time ride booking, driver management, Google Maps integration, and Google OAuth authentication.

## 📁 Project Structure

### Frontend (React + Vite)
**Location:** `c:\Users\tusha\Desktop\Uber\Frontend`

#### Key Technologies:
- **React 18** with Vite for fast development
- **Tailwind CSS** for responsive styling
- **React Router** for client-side routing
- **Axios** for API calls
- **Google OAuth** for authentication
- **Socket.io** for real-time updates

#### Pages & Features:
- **User Pages:**
  - `UserLogin.jsx` - User authentication with Google OAuth
  - `UserSignup.jsx` - User registration
  - `UserForgotPassword.jsx` - Password recovery
  - `UserResetPassword.jsx` - Password reset
  - `Home.jsx` - Main booking interface
  - `Riding.jsx` - Active ride tracking
  - `Payment.jsx` - Payment processing

- **Captain (Driver) Pages:**
  - `CaptainLogin.jsx` - Captain authentication with Google OAuth
  - `CaptainSignup.jsx` - Captain registration
  - `CaptainHome.jsx` - Captain dashboard
  - `CaptainRiding.jsx` - Active ride for captain

#### Components:
- `LocationSearchPanel.jsx` - Pickup/drop location search
- `LiveTracking.jsx` - Real-time GPS tracking
- `RidePopUp.jsx` - Ride confirmation modal
- `CaptainDetails.jsx` - Driver information display
- `VehiclePanel.jsx` - Vehicle selection interface

### Backend (Node.js + Express)
**Location:** `c:\Users\tusha\Desktop\Uber\Backend`

#### Key Technologies:
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time communication
- **Google Maps API** integration
- **Google OAuth** authentication

#### API Routes:
- **User Routes:** `/users/*`
  - Registration, login, Google OAuth
  - Profile management
  - Ride booking and history

- **Captain Routes:** `/captains/*`
  - Registration, login, Google OAuth
  - Profile and vehicle management
  - Ride acceptance and completion

- **Ride Routes:** `/rides/*`
  - Create, update, and track rides
  - Real-time location updates

- **Maps Routes:** `/maps/*`
  - Location search
  - Distance and fare calculation
  - Route optimization

## 🔧 Setup Instructions

### Frontend Setup:
```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup:
```bash
cd Backend
npm install
npm run dev
```

### Environment Variables:

#### Frontend (.env):
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_BASE_URL=http://localhost:4000
```

#### Backend (.env):
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🌟 Key Features

### Authentication:
- **Google OAuth Integration** - One-click login for users and captains
- **JWT Token Authentication** - Secure session management
- **Password Reset** - Email-based password recovery

### Real-time Features:
- **Live GPS Tracking** - Real-time location updates during rides
- **Socket.io Integration** - Instant communication between users and captains
- **Ride Status Updates** - Real-time ride status notifications

### Ride Booking:
- **Location Search** - Google Places API integration
- **Vehicle Selection** - Multiple vehicle categories
- **Fare Calculation** - Dynamic pricing based on distance and time
- **Driver Matching** - Intelligent driver assignment

### User Experience:
- **Dark/Light Mode** - Theme toggle functionality
- **Responsive Design** - Mobile-first approach
- **Interactive Maps** - Google Maps integration
- **Payment Integration** - Secure payment processing

## 🛠️ Development Commands

### Frontend:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend:
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Google Cloud Console account (for OAuth and Maps API)
- Google Maps API key
- Modern web browser

## 🔗 API Endpoints Summary

### Authentication:
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `POST /users/google-login` - Google OAuth login
- `POST /captains/register` - Captain registration
- `POST /captains/login` - Captain login
- `POST /captains/google-login` - Captain Google OAuth login

### Ride Management:
- `POST /rides/create` - Create new ride request
- `GET /rides/:id` - Get ride details
- `PUT /rides/:id/status` - Update ride status
- `GET /rides/user/:userId` - Get user ride history

### Maps & Location:
- `GET /maps/search` - Search locations
- `POST /maps/distance` - Calculate distance and fare
- `GET /maps/directions` - Get route directions

This project provides a complete Uber-like experience with modern web technologies and real-time features.
        