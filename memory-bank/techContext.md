# Technical Context: Pickleball Game Tracker

## Development Environment
- Runtime: Deno 1.40+
- Package Manager: Deno modules
- Editor: Visual Studio Code
- Version Control: Git

## Key Technologies
1. Frontend:
   - Fresh framework
   - Preact for components
   - Tailwind CSS for styling
   - TypeScript for type safety

2. Backend:
   - Deno KV for data storage
   - Fresh server-side rendering
   - REST API endpoints

3. Authentication:
   - Auth0 OAuth integration
   - Deno KV OAuth plugin
   - Session management

4. Testing:
   - Deno test runner
   - Mocking for API tests
   - Integration tests

## Development Setup
1. Install Deno: https://deno.land/manual/getting_started/installation
2. Clone repository
3. Install dependencies: `deno cache`
4. Start development server: `deno task start`
5. Run tests: `deno test`

## Deployment
1. Deno Deploy for production
2. Continuous Integration:
   - Automated tests
   - Linting and formatting
   - Build verification

## Coding Standards
1. TypeScript strict mode
2. Prettier for formatting
3. ESLint for linting
4. Consistent file structure
5. Documentation comments
