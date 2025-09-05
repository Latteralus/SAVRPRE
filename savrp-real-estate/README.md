# SAVRP Real Estate

A modern React application for managing and browsing real estate property listings. Built with React 18 and Tailwind CSS.

## Features

- Browse property listings with filtering and sorting
- Admin panel for managing properties (add, edit, delete)
- Image upload functionality
- Local storage for data persistence
- Responsive design with Tailwind CSS
- Property types: Houses and Businesses
- Rental and sale properties support
- Mortgage tracking
- TBX (Tax Benefit Exchange) cost tracking

## Demo Credentials

- **Username**: admin
- **Password**: admin123

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy automatically

Alternatively, you can deploy using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Other Deployment Options

You can also deploy to other platforms:

- **Netlify**: Drag and drop the `build` folder
- **GitHub Pages**: Use `npm run build` and deploy the `build` folder
- **Any static hosting**: The built files are in the `build` directory

## Project Structure

```
src/
  components/
    Badge.js          # Reusable badge component
    Field.js          # Form field component
    PropertyCard.js   # Property listing card
    AdminDialog.js    # Admin authentication and management
    EditorDialog.js   # Property editor form
  utils.js            # Utility functions and seed data
  App.js              # Main application component
  index.js            # React entry point
  index.css           # Global styles
```

## Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Data Storage

The application uses browser localStorage to persist data. All property data is stored locally in the user's browser.

## Customization

- Modify the seed data in `src/utils.js` to add your own properties
- Update the admin credentials in `src/components/AdminDialog.js`
- Customize the styling by modifying Tailwind classes throughout the components

## License

This project is licensed under the MIT License.
