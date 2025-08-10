# Star Wars Movies Explorer 🌟

A modern, responsive web application built with Next.js, Redux Toolkit, and TypeScript that allows users to explore all Star Wars movies with detailed information. This project demonstrates enterprise-level React development practices with comprehensive testing, documentation, and deployment configurations.

## 🚀 Features

- **Movie Listing**: View all Star Wars movies in a sortable table with multiple attributes
- **Movie Details**: Click on any movie to view comprehensive details including opening crawl, statistics, and metadata
- **Responsive Design**: Fully responsive UI that works seamlessly across desktop and mobile devices
- **Error Handling**: Robust error handling with user-friendly error messages and retry functionality
- **Loading States**: Smooth loading animations and skeleton screens for better UX
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modern UI**: Clean, modern interface using Tailwind CSS with Star Wars-themed styling

## 🛠 Tech Stack

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Redux Toolkit** - Predictable state management
- **Tailwind CSS** - Utility-first CSS framework

### Development Tools
- **Storybook** - Component development and documentation
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality control
- **Commitlint** - Conventional commit messages

### API & Data
- **Star Wars API** - https://swapi.info/api/
- **Axios** - HTTP client with interceptors and error handling
- **Fallback API** - Local Next.js API routes for CORS handling

### Deployment & DevOps
- **Docker** - Containerization with multi-stage builds
- **Docker Compose** - Development and production environments
- **Vercel** - Serverless deployment platform

## 📋 Prerequisites

- Node.js 22+ (LTS recommended)
- npm or yarn or pnpm
- Docker (optional, for containerized development)

## 🏃‍♂️ Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd star-wars
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### With Docker

1. **Development with hot reloading**
   ```bash
   docker-compose --profile dev up
   ```

2. **Production build**
   ```bash
   docker-compose --profile prod up
   ```

3. **Storybook development**
   ```bash
   docker-compose --profile storybook up
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run prettier` - Format code with Prettier
- `npm run storybook` - Start Storybook for component development
- `npm run build-storybook` - Build Storybook for deployment

## 🏗 Project Structure

```
star-wars/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Home page component
│   ├── components/             # Reusable React components
│   │   ├── common/             # Common components
│   │   │   └── ErrorBoundary.tsx
│   │   ├── movies/             # Movie-specific components
│   │   │   ├── MovieList.tsx   # Movie listing with sortable table
│   │   │   ├── MovieDetail.tsx # Movie detail view
│   │   │   └── index.ts        # Component exports
│   │   └── ui/                 # Generic UI components
│   │       ├── Button.tsx      # Reusable button component
│   │       ├── Card.tsx        # Card container component
│   │       ├── Table.tsx       # Sortable table component
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── Badge.tsx
│   │       └── index.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── redux.ts            # Typed Redux hooks
│   ├── providers/              # React context providers
│   │   └── ReduxProvider.tsx   # Redux store provider
│   ├── services/               # API and external services
│   │   └── api.ts              # Star Wars API client
│   ├── store/                  # Redux store configuration
│   │   ├── index.ts            # Store setup
│   │   └── movieSlice.ts       # Movie state management
│   ├── stories/                # Storybook stories
│   │   ├── movies/             # Movie component stories
│   │   └── ui/                 # UI component stories
│   └── types/                  # TypeScript type definitions
│       └── movie.ts            # Movie-related types
├── public/                     # Static assets
├── .storybook/                 # Storybook configuration
├── docker-compose.yml          # Docker services configuration
├── Dockerfile                  # Multi-stage Docker build
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design Decisions

### Architecture
- **Component-Based**: Modular, reusable components following single responsibility principle
- **State Management**: Redux Toolkit for predictable state management with async thunks
- **Type Safety**: Comprehensive TypeScript integration for better developer experience
- **Error Boundaries**: Graceful error handling at component and application level

### UI/UX Design
- **Star Wars Theme**: Yellow and black color scheme inspired by the opening crawls
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.1 AA compliance with proper semantic HTML and ARIA labels
- **Loading States**: Skeleton screens and spinners for better perceived performance

### Performance Optimizations
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Bundle Analysis**: Package optimization and tree shaking
- **Caching**: HTTP client caching and Redux state persistence

### Development Experience
- **Hot Reloading**: Fast development with Next.js dev server
- **Component Documentation**: Comprehensive Storybook stories
- **Code Quality**: ESLint, Prettier, and Husky for consistent code
- **Type Safety**: Strict TypeScript configuration

## 🌐 API Integration

The application integrates with the Star Wars API (https://swapi.info/api/) to fetch movie data:

- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Progress indicators during API calls
- **Retry Logic**: Automatic retry functionality for failed requests
- **Type Safety**: Full TypeScript interfaces for API responses

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices and scaled up
- **Breakpoints**: Responsive design using Tailwind CSS breakpoints
- **Touch Friendly**: Optimized for touch interfaces
- **Cross Browser**: Tested across modern browsers

## 🧪 Testing Strategy

The project is set up for comprehensive testing:

- **Component Testing**: Storybook for component development and testing
- **Type Checking**: TypeScript for compile-time error detection
- **Linting**: ESLint for code quality and consistency
- **Accessibility**: Built-in accessibility testing with Storybook a11y addon

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel automatically detects Next.js and configures build settings

2. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard
   - The app works without additional environment variables

3. **Deploy**
   - Vercel automatically deploys on every push to main branch
   - Preview deployments for pull requests

### Docker Deployment

1. **Build production image**
   ```bash
   docker build -t star-wars-app .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 star-wars-app
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

The application works without additional environment variables but supports:

- `NEXT_TELEMETRY_DISABLED=1` - Disable Next.js telemetry
- `NODE_ENV=production` - Set to production for optimized builds

### Customization

- **API Endpoint**: Update `BASE_URL` in `src/services/api.ts`
- **Styling**: Modify Tailwind configuration in `tailwind.config.js`
- **Metadata**: Update SEO metadata in `src/app/layout.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow the existing code style
- Write meaningful commit messages using conventional commits
- Add Storybook stories for new UI components
- Ensure TypeScript types are properly defined
- Test your changes across different screen sizes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Star Wars API** - For providing the comprehensive Star Wars data
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Redux Toolkit** - For simplified Redux development
- **Storybook** - For component development and documentation

## 📞 Support

If you have any questions or need help with deployment:

1. Check the [Issues](../../issues) page for common problems
2. Create a new issue if you encounter bugs
3. Review the documentation for configuration options

---

**May the Force be with you!** ⚡️