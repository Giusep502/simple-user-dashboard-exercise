# Simple User Dashboard

A modern React-based user dashboard application built with TypeScript, Vite, and styled-components. This project provides a clean interface for managing and viewing user data with filtering capabilities and responsive design.

Preview here: https://simple-user-dashboard-exercise.vercel.app/

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Development Server

To run the development server:

```bash
npm install
npm start
```

The application will be available at `http://localhost:5173` (Vite's default port).

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Testing

This project includes both unit tests and end-to-end tests.

### Unit Tests

Run unit tests using Vitest:

```bash
npm run unit:test
```

Unit tests are located in `src/**/__tests__/*.spec.{js,ts,jsx,tsx}` and use:

- Vitest as the test runner
- React Testing Library for component testing
- jsdom environment for DOM simulation

### End-to-End Tests

Run E2E tests using Playwright:

```bash
npm run e2e:test
```

View E2E test reports:

```bash
npm run e2e:report
```

E2E tests are located in the `e2e/` directory.

## 🛠️ Development Tools

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Code Formatting

The project uses Prettier for code formatting and Husky for pre-commit hooks. Code is automatically formatted on commit.

## 📁 Project Structure

```
src/
├── __tests__/          # Global tests and utils
├── components/         # Reusable components
│   ├── __tests__/      # Component tests
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── providers/          # Providers
│   ├── __tests__/      # Providers tests
├── types/              # TypeScript type definitions
├── ui/                 # Base UI components
└── utils/              # Utility functions
```

## 🎨 Tech Stack

- **React 19** - I chose React as it is a standard and what I am more confident about at the moment
- **TypeScript** - Ensuring type safety is a must in modern application
- **Vite** - I chose vite because it seems to be a consolidated and efficient tool, and seems to be better performance-wise to create react app.
- **Styled Components** - I chose styled components because that's the technology I am more confortable about at the moment. I found it a good compromise when doing css-in-js, and pairs very well with the React component logic, although it has some bundle size issues if not managed properly.
- **React Router** - I didn't set up proper routing in this project to not do over engineering over a small project, but I used React Router to make sure Browser navigation is handled correctly when opening the user modal, using search params
- **Radix UI** - I only used Radix to handle the Dialog
- **Lucide React** - Easy to implement Icon Library
- **Vitest** - I used Vitest because I was confident with jest and this is very similar, and integrated better with vite.
- **Playwright** - I used cypress in the past, but now Playwright seems better for e2e testing, as it helps reducing the flakiness and has other good features to help writing and running in test (parallelization is handled better for example). Also it is consolidated enough to be used.
- **ESLint** - Standard Code linting, default configuration
- **Prettier** - Standard Code formatting

## 📋 Project Decisions & Next Steps

### Architecture Decisions

- **State Management**: Currently using React Context API for state management as it's a very easy application. If it will become more complicated in the future I would suggest a proper state management with tools like zustand or redux-toolkit, to not overuse providers.

- **Styling Approach**: As I Said I used styled components, but actually if I had more time I would have used it better, creating more ui reusable component, and minimizing the use of custom styled components (For example doing a generic Text component that could be reused everywhere, or some "Box" components that avoid creating "Containers"). Also I didn't create generic input\checkboxes to not do over engineering, but I would have done it in a real project.

- **Testing Strategy**: Implemented both unit tests (Vitest) and E2E tests (Playwright). I didn't fully test the application, as unit tests should cover all the behaviors of the single component. For e2e tests, instead, I covered the core features of the application. Other than setting up the coverage for the unit tests, a next step would be creating a mocked environment or strategy to setup proper integration tests between components, and it could be done either with Vitest, or with Playwright, depending on the chosen strategy (no hard preference here).

- **UI Kit**: I chose to not use a UI Kit to do most of the UI components, but that was only because the requirements put very much emphasis on the accessibility, and I felt like "cheating" if I used a kit that handled most of the things for myself. In retrospective, maybe this was too much to care about, as tools like Radix gives you a lot of flexibility and room from error.

### Next Steps

- Check comments in the code: they are things I would like to refactor if this was a real project.
- Improve the UI, that is very basic, especially color wise.
- Set up code coverage for unit tests
- Refactor usage of Styled components

### Commit Naming

I used standard conventional commit, _sorry for not following that very much_
