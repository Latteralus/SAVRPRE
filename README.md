# SAVRP Real Estate Dashboard

A React-based property management dashboard for SAVRP Real Estate.

## Features

- Property listing and management
- Search and filtering functionality
- Admin authentication system
- Image upload capabilities
- Local storage persistence
- Responsive design with Tailwind CSS

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to connect your project.

### Option 2: GitHub Integration

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect the configuration and deploy

### Option 3: Drag and Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder
3. Vercel will deploy automatically

## Configuration

The project includes:
- `vercel.json` - Vercel deployment configuration
- `package.json` - Project metadata and scripts
- `home.html` - Main React application

## Local Development

To run locally:
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## Environment

- React 18 via CDN
- Tailwind CSS for styling
- Babel for JSX transformation in browser
- No build process required (static HTML)

## Notes

- All data is stored in browser localStorage
- Admin credentials: admin / admin123 (demo only)
- The app is fully client-side and requires no backend