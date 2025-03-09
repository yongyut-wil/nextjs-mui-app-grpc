# Next.js MUI Application

A modern, production-ready Next.js application built with Material UI and TypeScript.

## Features

- **Next.js 15** - Latest version with App Router
- **TypeScript** - Type safety throughout the codebase
- **Material UI (MUI)** - Complete UI component library
- **Responsive Design** - Mobile-first approach
- **Theme Configuration** - Customizable theming with MUI
- **PNPM** - Fast, disk space efficient package manager

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- PNPM

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-mui-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
nextjs-mui-app/
├── public/                # Static assets
├── src/
│   ├── app/               # App Router pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable components
│   └── theme/             # MUI theme configuration
├── .gitignore
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
├── pnpm-lock.yaml         # PNPM lock file
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Customizing the Theme

The theme is defined in `src/theme/theme.ts`. You can modify colors, typography, component styles, and other theme properties according to your needs.

## Deployment

The application can be deployed to various platforms:

- [Vercel](https://vercel.com/) (recommended for Next.js applications)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## License

This project is licensed under the MIT License.
