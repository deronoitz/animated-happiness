This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Project Structure
- public/: Contains static files such as images, which are served directly by the server.
- src/: Contains the source code for the project.
  - app/: Contains the main application files.
    - page.tsx: The main page component.
  - components/: Contains reusable React components.
    - common/: Contains common components used across the application.
    - shared/: Contains shared components used across the application.
  - apis/: Contains API schemas and queries.
    - schemas/: Contains GraphQL schemas.
- jest.config.ts: Configuration file for Jest.
- jest.setup.ts: Setup file for Jest.
- next-env.d.ts: TypeScript declaration file for Next.js.
- next.config.ts: Configuration file for Next.js.
- postcss.config.mjs: Configuration file for PostCSS.
- tsconfig.json: TypeScript configuration file.
