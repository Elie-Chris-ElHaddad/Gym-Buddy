# My Gym Buddy

## Overview

My Gym Buddy is a client-server application designed to help users track workout schedules, store exercise data, and manage workout details effectively. This project is structured as a React frontend connected to a Node.js/Express backend, with MongoDB as the database. This setup enables users to manage and log workouts with a smooth, efficient experience.

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [Database Design](#2-database-design)
3. [API Endpoints](#3-api-endpoints)
4. [Getting Started](#4-getting-started)
5. [Features](#5-features)
6. [Technologies Used](#6-technologies-used)

## Project Architecture

The application uses a **client-server architecture**:
- **Frontend**: Built with React and Material UI for a responsive, user-friendly interface.
- **Backend**: Powered by Node.js and Express, it provides a REST API to handle workout data.
- **Database**: MongoDB stores workout schedules and exercises.

### Folder Structure

- **`/client`**: Contains the frontend code (React components, styles, etc.).
- **`/server`**: Contains the backend code (Express routes, database models, server configuration).
- **`/models`**: MongoDB schemas for storing workout and exercise data.
- **`/routes`**: Express route handlers for managing workout schedules.

## Database Design

The database uses MongoDB to store **workout schedules** and **exercise data**.

- **Schedule**:
  - `title` (String): The name of the workout session.
  - `date` (String): Date of the workout.
  - `time` (String): Time of the workout.
  - `bodyPart` (String): Body part targeted.
  - `exercises` (Array): List of exercises with `name`, `sets`, and `reps`.

## API Endpoints

The following REST API endpoints are available to manage workout schedules:

### Schedule Routes (`/api/schedules`)

1. **Create a Schedule**
   - **Method**: POST
   - **Endpoint**: `/api/schedules`
   - **Description**: Adds a new workout schedule to the database.
  
2. **Get All Schedules**
   - **Method**: GET
   - **Endpoint**: `/api/schedules`
   - **Description**: Retrieves all saved workout schedules.
  
3. **Get a Schedule by ID**
   - **Method**: GET
   - **Endpoint**: `/api/schedules/:id`
   - **Description**: Retrieves a specific schedule by its ID.
  
4. **Update a Schedule**
   - **Method**: PUT
   - **Endpoint**: `/api/schedules/:id`
   - **Description**: Updates an existing schedule.

5. **Delete a Schedule**
   - **Method**: DELETE
   - **Endpoint**: `/api/schedules/:id`
   - **Description**: Deletes a specific schedule by ID.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/username/my-gym-buddy.git
   ```

2. **Install Dependencies**:
   ```bash
   cd my-gym-buddy
   npm install
   ```

3. **Run MongoDB**:
   Ensure MongoDB is running locally on port `27017`.

4. **Start the Application**:
   - **Frontend**: Runs on `http://localhost:3000`
   - **Backend**: Runs on `http://localhost:5000`
   ```bash
   npm start
   ```

### Scripts

- **`npm start`**: Runs both the frontend and backend concurrently.
- **`npm run client`**: Starts the React client.
- **`npm run server`**: Starts the Express server.

## Features

- **Workout Schedule Management**: Add, view, update, and delete workout schedules.
- **Horizontal Scrolling for Exercises**: Smooth scrolling through exercise cards in the UI.
- **Responsive UI**: Built with Material UI for a clean, user-friendly experience.

## Technologies Used

- **Frontend**:
  - React
  - Material UI
  - React Horizontal Scrolling Menu

- **Backend**:
  - Node.js
  - Express
  - Mongoose (MongoDB ODM)

- **Database**:
  - MongoDB