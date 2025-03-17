# Project Brief: Pickleball Game Tracker

## Overview
Create a web application that allows users to:
1. View available pickleball courts at a specific location
2. Commit to playing at specific times
3. See who else is committed to play

## Core Features
- User authentication via Auth0
- Court management (multiple courts at one location)
- Game commitment system with time and player count
- Display of usernames for logged-in users
- Responsive web interface

## Technical Stack
- Frontend: Fresh (Deno) framework
- Backend: Deno KV for data storage
- Authentication: Auth0 OAuth integration
- Styling: Tailwind CSS

## Project Structure
- `routes/`: Application routes
- `components/`: Shared UI components
- `islands/`: Interactive components
- `utils/`: Shared utility functions
- `plugins/`: Authentication and other plugins
