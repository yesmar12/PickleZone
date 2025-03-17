# System Patterns: Pickleball Game Tracker

## Architecture Overview
1. Frontend: Fresh framework with Islands architecture
2. Backend: Deno KV for data storage
3. Authentication: Auth0 OAuth integration
4. Styling: Tailwind CSS utility-first approach

## Key Design Patterns
1. Data Storage:
   - Deno KV with prefix-based organization
   - Structured data models for courts and games
   - UUIDs for unique identifiers

2. Authentication:
   - OAuth 2.0 with Auth0 provider
   - Session management via cookies
   - Protected routes middleware

3. API Design:
   - RESTful endpoints for data operations
   - JSON request/response format
   - Standard HTTP status codes

4. Component Architecture:
   - Islands architecture for interactivity
   - Shared components for UI consistency
   - Route-based component organization

5. Error Handling:
   - Centralized error logging
   - User-friendly error messages
   - Consistent error response format

## Data Flow
1. User Interface → API Endpoints → Deno KV
2. Auth0 → Session Management → Protected Routes
3. Static Assets → Fresh Router → Client
