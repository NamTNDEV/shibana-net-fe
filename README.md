<div align="center">
  <a href="https://github.com/NamTNDEV/shibana-net-fe">
    <img src="public/icon.webp" alt="ShibaNa Net Logo" width="100" height="100">
  </a>

  <h1 align="center">ShibaNa Net (Frontend)</h1>

  <p align="center">
    <b>Connect. Share. Woof. 🐕</b>
  </p>
  
  <p align="center">
    The official frontend client for <b>ShibaNa Net</b>, a modern social network inspired by the friendly Shiba Inu spirit. Built with the latest web technologies to ensure a fast, responsive, and engaging user experience.
  </p>

  <p align="center">
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
  </p>
</div>

<br />

## ✨ Features

- **🔐 Secure Authentication:** Modern split-screen login/register UI with comprehensive form validation.
- **🎨 Brand Identity:** Custom "Charcoal & Shiba Yellow" design system using Tailwind v4 CSS variables.
- **📱 Fully Responsive:** Mobile-first approach, optimized for all screen sizes.
- **⚡ High Performance:** Leveraging Next.js App Router, Server Components, and Turbopack.
- **📂 Modular Architecture:** Clean code structure separating UI, logic, and assets.

## 🛠 Tech Stack

This repository contains the **Frontend** source code.

| Category          | Technology          | Description                             |
| :---------------- | :------------------ | :-------------------------------------- |
| **Framework**     | **Next.js 16**      | App Router, Server Actions.             |
| **Styling**       | **Tailwind CSS v4** | Zero-runtime CSS, Semantic Colors.      |
| **Components**    | **Shadcn UI**       | Accessible and customizable components. |
| **Form Handling** | **RHF + Zod**       | Type-safe form validation.              |
| **Icons**         | **Lucide React**    | Consistent and lightweight icons.       |

## 📂 Project Structure

```bash
shibana-net/
├── 📁 public/              # Static assets (Favicons, Logos)
├── 📁 src/
│   ├── 📁 app/             # Next.js App Router
│   │   ├── 📁 (auth)/      # Authentication Routes (Split Layout)
│   │   ├── 📁 (main)/      # Main App Routes (Sidebar Layout)
│   │   └── layout.tsx      # Root Layout
│   ├── 📁 components/      # React Components
│   │   ├── 📁 auth/        # Auth specific components
│   │   ├── 📁 shared/      # Reusable components (Logo, Sidebar...)
│   │   └── 📁 ui/          # Shadcn UI primitives
│   ├── 📁 lib/             # Utilities (Tailwind merge, etc.)
│   └── 📁 assets/          # SVG Components & Images
├── next.config.mjs         # Configuration
└── tailwind.config.ts      # Tailwind Theme
```

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/shibana-net.git](https://github.com/your-username/shibana-net.git)
cd shibana-net
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment

Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## 🤝 Contributing

Contributions are always welcome!

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'feat: Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

<div align="center"> <i>Part of the ShibaNa Ecosystem 🐕</i> </div>
