# Frontend Documentation

## Overview
This is the frontend application for the Bucket URL project, built with React and Vite. It provides a modern and responsive user interface for managing and accessing files stored in the backend.

## Tech Stack
- React 19
- Vite
- TailwindCSS
- React Router DOM
- Axios

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

## Project Structure
```
fe/
├── src/           # Source code
├── public/        # Static assets
├── index.html     # Entry HTML file
├── vite.config.js # Vite configuration
└── package.json   # Project dependencies
```

## Environment Variables
Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:8000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## Dependencies
### Main Dependencies
- react: ^19.0.0
- react-dom: ^19.0.0
- react-router-dom: ^7.2.0
- axios: ^1.8.1
- react-icons: ^5.5.0

### Dev Dependencies
- vite: ^6.2.0
- @vitejs/plugin-react: ^4.3.4
- tailwindcss: ^3.3.5
- postcss: ^8.4.31
- autoprefixer: ^10.4.16
- eslint: ^9.21.0
- @types/react: ^19.0.10
- @types/react-dom: ^19.0.4

## Features
- Modern React with Hooks
- Fast development with Vite
- Type-safe development environment
- Responsive design with TailwindCSS
- Clean and maintainable code structure
- ESLint configuration for code quality

## Development
To start the development server:
```bash
npm run dev
```
The application will be available at http://localhost:5173

## Building for Production
To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Code Style
The project uses ESLint for code quality and consistency. To run the linter:
```bash
npm run lint
```

## Project Configuration
### Vite
The project uses Vite for fast development and optimized builds. Configuration can be found in `vite.config.js`.

### TailwindCSS
TailwindCSS is configured in `tailwind.config.js` and `postcss.config.js`.

### ESLint
ESLint configuration can be found in `eslint.config.js`.

## Browser Support
The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Best Practices
- Use functional components and hooks
- Follow React best practices
- Write clean and maintainable code
- Use proper TypeScript types
- Follow the established project structure
- Document your code when necessary

## Troubleshooting
Common issues and their solutions:
1. If the dev server won't start, check if all dependencies are installed
2. For build issues, ensure all environment variables are set correctly
3. For type errors, ensure all necessary types are properly defined
