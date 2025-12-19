# Crime Analytics Dashboard

A comprehensive, production-ready web application for analyzing crime statistics using the FBI Crime Statistics API. This project demonstrates best practices in modern web development, API integration, and data visualization.

## 🚀 Features

- **Interactive Crime Data Visualization**: Beautiful charts and graphs showing crime trends over time
- **Multi-Offense Analysis**: Support for various crime types (violent crime, property crime, homicide, etc.)
- **Statistical Insights**: Automatic calculation of trends, averages, and changes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface built with Tailwind CSS
- **Type-Safe**: Full TypeScript support for better code quality
- **Error Handling**: Comprehensive error handling and user feedback

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** (optional, for version control)

## 🛠️ Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   FBI_API_KEY=DEMO_KEY
   NEXT_PUBLIC_FBI_API_BASE_URL=https://api.usa.gov/crime/fbi/sapi/api
   ```
   
   > **Note**: To get your own API key, visit [api.data.gov/signup/](https://api.data.gov/signup/)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
crime-analytics-dashboard/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── CrimeChart.tsx     # Data visualization component
│   ├── SearchForm.tsx     # Search/filter form
│   └── StatCard.tsx       # Statistics display card
├── lib/                   # Utility libraries
│   └── api/
│       └── crimeApi.ts    # API service layer
├── public/                # Static assets
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies
```

## 🎯 Key Learning Points

### 1. **API Integration Best Practices**
- Centralized API service layer (`lib/api/crimeApi.ts`)
- Proper error handling and type safety
- Reusable API methods

### 2. **Component Architecture**
- Separation of concerns (UI components vs. business logic)
- Reusable, composable components
- TypeScript interfaces for props

### 3. **State Management**
- React hooks for local state management
- Loading and error states
- Form handling

### 4. **Data Visualization**
- Integration with Recharts library
- Responsive charts
- Multiple chart types

### 5. **Modern Styling**
- Tailwind CSS utility-first approach
- Responsive design patterns
- Consistent design system

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 API Usage

### Example API Call

```typescript
import { crimeApi } from '@/lib/api/crimeApi';

// Get violent crime data for an agency
const data = await crimeApi.getCrimeEstimates(
  'NJ1234567',        // Agency code
  'violent-crime',    // Offense type
  2010,               // Start year
  2022                // End year
);
```

### Supported Offense Types

- `violent-crime`
- `property-crime`
- `homicide`
- `rape`
- `robbery`
- `assault`
- `burglary`
- `larceny`
- `motor-vehicle-theft`

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Adding New Components

1. Create component file in `components/` directory
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Import and use in `app/page.tsx`

## 🚀 Deployment

### Quick Deploy (5 Minutes)

**Recommended: Vercel**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

**📖 Full Guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions

**⚡ Quick Start:** See [DEPLOY_QUICK_START.md](./DEPLOY_QUICK_START.md) for 5-minute setup

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FBI Crime Data API](https://api.usa.gov/crime/fbi/sapi)
- [Recharts Documentation](https://recharts.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

This is a practice project. Feel free to:
- Add new features
- Improve existing code
- Fix bugs
- Enhance UI/UX
- Add tests

## 📝 License

This project is open source and available for educational purposes.

## 💡 Practice Ideas

Here are some features you can add to practice:

1. **Multi-Agency Comparison**: Compare crime data across multiple agencies
2. **Export Functionality**: Export data to CSV/PDF
3. **Advanced Filtering**: Filter by multiple criteria
4. **Map Integration**: Show crime data on an interactive map
5. **Predictive Analytics**: Use ML to predict future crime trends
6. **User Authentication**: Add login/signup functionality
7. **Data Caching**: Implement caching for better performance
8. **Unit Tests**: Add Jest/React Testing Library tests
9. **Dark Mode**: Implement dark theme toggle
10. **Mobile App**: Create a React Native version

## 🎓 Real-World Practice Guide

Want to use this project to practice **real-world software development**?

📖 **Read these guides:**
- **[REAL_WORLD_PRACTICE_GUIDE.md](./REAL_WORLD_PRACTICE_GUIDE.md)** - Complete guide to treating this as real work experience
- **[PRACTICE_TASKS.md](./PRACTICE_TASKS.md)** - Ready-to-use tasks with requirements and acceptance criteria
- **[GIT_WORKFLOW_GUIDE.md](./GIT_WORKFLOW_GUIDE.md)** - Professional Git workflow practices

**Quick Start for Practice:**
1. Read the Real-World Practice Guide
2. Pick a task from Practice Tasks
3. Follow Git Workflow Guide
4. Build features like a professional
5. Deploy and showcase your work!

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is set in `.env.local`
- Check that the API key has proper permissions
- Verify the API endpoint is accessible

### Build Errors
- Clear `.next` folder and rebuild
- Check Node.js version (should be 18+)
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Chart Not Displaying
- Check browser console for errors
- Verify data format matches expected structure
- Ensure Recharts is properly installed

## 📞 Support

For questions or issues, please refer to:
- Next.js documentation
- FBI API documentation
- Component library documentation

---

**Happy Coding! 🎉**

