# BistroBliss MERN-Stack Project

## Overview
BistroBliss is a web-based application for a restaurant booking and menu management system. It allows users to register, browse the menu, and book tables, while admins can manage menu items and approve or reject table bookings.

### Technologies Used
-
### Frontend:
- Next.js
- React.js
- Tailwind CSS

### Backend:
- Express.js
- MongoDB
- Mongoose

## Features
### Authentication
- User registration and login system.
- Two types of users: normal users and admins.

### Our Menu
- Admins can add, update, and delete menu items from the admin panel.
- Users can view the available menu items.

### Table Booking System
- Only logged-in users can book a table.
- The admin receives booking requests and can approve or reject them via the admin panel.
- Users receive email notifications when their booking is confirmed or rejected.
- "My Bookings" page displays current and previous bookings along with their status (accepted or rejected).

### Profile Management
- Logged-in users can view and update their profile information.

### Admin Panel
- View all registered users.
- Manage table bookings (approve or reject bookings).
- Manage menu items (add, update, delete items).

## Installation and Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/BistroBliss-MERN-Stack-Project
   cd BistroBliss-MERN-Stack-Project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add the necessary configuration values (e.g., database URI, authentication secrets).
4. Start the development servers:
   - Backend:
     ```sh
     cd server
     npm start
     ```
   - Frontend:
     ```sh
     cd client
     npm run dev
     ```
