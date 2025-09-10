# Mini Task Tracker

A simple application for tracking and managing mini tasks efficiently.

## Overview

The **Mini Task Tracker** is a full-stack application designed to help users organize and track small tasks. It consists of a frontend UI built with Angular and a backend server built with Node.js.

## Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Angular CLI** (for the UI)

## Installation and Setup

### 1. Running the UI
To start the frontend interface, follow these steps:

```bash
cd mini-task-tracker-ui
npm install
ng serve
```

- The UI will be available at `http://localhost:4200` by default.

### 2. Running the Server
To start the backend server, follow these steps:

```bash
cd mini-task-tracker-server
npm install
npm run start:server
```

- The server will typically run on `http://localhost:3000` (confirm the port in your server configuration).

## Project Structure

- **`mini-task-tracker-ui`**: Contains the Angular frontend code for the user interface.
- **`mini-task-tracker-server`**: Contains the Node.js backend code for handling API requests and task management logic.