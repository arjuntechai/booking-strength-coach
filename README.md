# Personal Trainer Booking Web App

Welcome to the Personal Trainer Booking Web App repository! This project is a modern, responsive web application designed for personal trainers to manage their sessions, clients, and bookings, and for clients to easily view schedules and book spots.

## 🚀 Tech Stack

This project is built with a modern React and Vite ecosystem, utilizing a robust backend via Supabase.

### Frontend
- **Framework**: React 19 + TypeScript
- **Bundler / Tooling**: Vite (via TanStack Start)
- **Routing**: TanStack Router
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite`)
- **UI Components**: Radix UI Primitives, Lucide Icons, Sonner (Toasts)
- **Forms & Validation**: React Hook Form + Zod

### Backend & Database
- **Backend as a Service (BaaS)**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **Authorization**: Row Level Security (RLS) + Custom role claims
- **Database Access**: `@supabase/supabase-js`

### Monitoring & Analytics
- **Error Tracking**: Sentry (`@sentry/react`)
- **Analytics**: Vercel Analytics

## 📂 Project Structure

```text
├── src/                # Frontend source code (React, Routes, Components)
├── supabase/           # Supabase edge functions, migrations, and seed data
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## 🛠️ Getting Started for Developers

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local database development)

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

2. **Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials and other required keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   # Add other variables as needed (e.g., Sentry DSN)
   ```

3. **Local Supabase Setup:**
   Start the local Supabase stack to run PostgreSQL and Auth locally:
   ```bash
   supabase start
   ```
   *(Ensure you have run any pending migrations with `supabase db push` or applied seed data).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port specified by Vite).

## 📜 Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to find and fix problems in the code.
- `npm run format`: Formats code using Prettier.

## 🔐 Database & Authorization (Supabase)

This project heavily relies on Supabase for data integrity and security.

- **Roles**: User roles (admin, client, user, banned) are managed via custom claims or secure tables.
- **RLS (Row Level Security)**: Data access is restricted at the database level. For example, clients can only see their own bookings, while admins have full access.
- **Transactions**: Booking logic utilizes Supabase RPCs (Remote Procedure Calls) to handle transactions, lock rows (`SELECT ... FOR UPDATE`), and prevent overbooking safely.

---

*For detailed implementation steps and architecture decisions, please refer to the `IMPLEMENTATION_PLAN.md` file.*
