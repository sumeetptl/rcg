# Crypto Editorial Platform

A modern, full-stack platform for cryptocurrency news, editorial blogs, market signals, and analytics. Built with performance and user experience in mind using the latest web technologies.

## 🚀 Features

- **Content Management**: curated news feed and editorial blogs.
- **Market Intelligence**: Crypto signals and market statistics.
- **User Dashboard**: Personalized dashboard for users to track interests (requires authentication).
- **Admin Panel**: Dedicated area for content administration.
- **Authentication**: Secure user authentication powered by Supabase.
- **Responsive Design**: Mobile-first UI with Dark Mode support.
- **Modern UI**: Polished components using Shadcn UI and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **Forms**: React Hook Form + Zod
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine.
- `pnpm` package manager (recommended) or `npm`.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd crypto-editorial-platform
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Environment Setup:**

    Create a `.env.local` file in the root directory and add your Supabase credentials. You can find these in your Supabase project settings.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    # or
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
crypto-editorial-platform/
├── app/                  # Next.js App Router pages and layouts
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # User dashboard routes
│   ├── admin/            # Admin panel routes
│   ├── blogs/            # Blog pages
│   ├── news/             # News pages
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/               # Primitive components (buttons, inputs, etc.)
│   ├── header.tsx        # Application header
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets
└── styles/               # Global styles
```

## 📜 Scripts

- `pnpm dev`: Runs the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint to check for code quality issues.
