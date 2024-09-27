# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Development Server](#running-the-development-server)
4. [Building for Production](#building-for-production)
5. [Pre-commit Hooks](#pre-commit-hooks)
6. [Learn More](#learn-more)
7. [Deployment](#deployment)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm, yarn, pnpm, or bun

## Installation

Follow these steps to install the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/index.tsx`. The page auto-updates as you edit the file.

## Building for Production

To create an optimized build for production:

```bash
npm run build
```

This will create a production-ready build in the `.next` directory. You can then start the server with:

```bash
npm start
```

## Pre-commit Hooks

This project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks. The hooks are set up to ensure code quality and consistency before committing changes.

The `pre-commit` hook configured in `.lefthook.yml` runs a build check to make sure that the project builds successfully before allowing a commit:

```yaml
pre-commit:
  parallel: true
  commands:
    build-check:
      run: npm run build
      exit_on_error: true
```

This helps in catching any build errors early in the development process.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.