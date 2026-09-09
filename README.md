<p align="center">
  <img src="https://img.shields.io/badge/HoneyChain-From%20Hive%20to%20Home-F59E0B?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTUtMTAtNXoiLz48cGF0aCBkPSJNMiAxN2wxMCA1IDEwLTUiLz48cGF0aCBkPSJNMiAxMmwxMCA1IDEwLTUiLz48L3N2Zz4=" alt="HoneyChain Logo"/>
</p>

<h1 align="center">🍯 HoneyChain</h1>

<p align="center">
  <strong>Blockchain-Powered Honey Traceability & Smart Beekeeping Platform</strong>
</p>

<p align="center">
  <em>From Hive to Home — Every batch verified, every journey transparent.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.3-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [User Roles & Portals](#-user-roles--portals)
- [Pages & Routes](#-pages--routes)
- [Services Layer](#-services-layer)
- [Data Models](#-data-models)
- [Demo Mode](#-demo-mode)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**HoneyChain** is a full-stack web application that leverages **blockchain technology** to bring **complete traceability and transparency** to the honey supply chain. It connects every stakeholder — from beekeepers to consumers — in a single, tamper-proof ecosystem where every batch of honey can be tracked, verified, and trusted.

The platform provides **role-based dashboards** for five distinct user types, real-time **hive monitoring**, **quality testing workflows**, **QR code-based verification**, and a **blockchain explorer** — all wrapped in a modern, responsive UI with smooth animations.

---

## 🎯 Problem Statement

The global honey industry faces severe challenges:

| Problem | Impact |
|---------|--------|
| **Adulteration & Fraud** | Up to 76% of commercial honey is suspected to be adulterated with sugar syrups |
| **Lack of Traceability** | Consumers cannot verify the origin or journey of their honey |
| **Opaque Supply Chains** | Multiple intermediaries make it impossible to track quality degradation |
| **No Accountability** | Without transparent records, bad actors go undetected |
| **Manual Record Keeping** | Paper-based systems are error-prone and easily falsified |

**HoneyChain solves these problems** by creating an immutable, blockchain-backed digital ledger that records every event from harvest to delivery — making fraud detectable and authenticity verifiable by anyone.

---

## ✨ Key Features

### 🐝 For Beekeepers
- **Hive Management** — Register and manage multiple hives with location tracking
- **Real-Time Monitoring** — Live temperature, humidity, weight, and bee activity metrics
- **Harvest Recording** — Log harvests with automated batch ID generation
- **Batch Tracking** — Track honey batches through the entire supply chain
- **Alert System** — Receive critical alerts for hive health anomalies
- **Analytics Dashboard** — Visualize production trends and hive performance

### 🏭 For Processors
- **Incoming Batch Management** — Receive and inspect incoming honey batches
- **Processing Workflow** — Track filtration, pasteurization, and packaging steps
- **Quality Testing** — Record moisture content, HMF levels, purity, and pollen analysis
- **Certification** — Generate NABL-certified quality reports

### 🚚 For Distributors
- **Shipment Management** — Create and track shipments with cold-chain monitoring
- **Real-Time Tracking** — GPS-based tracking of honey in transit
- **Distribution Centers** — Manage multiple distribution hubs
- **Delivery History** — Complete records of all deliveries

### 👤 For Consumers
- **QR Code Scanning** — Scan any HoneyChain QR code to verify authenticity
- **Full Traceability** — View the complete journey of your honey from hive to shelf
- **Blockchain Verification** — Independently verify records on the blockchain
- **Scan History** — Keep track of all products you've verified

### 🔐 For Administrators
- **User Management** — Approve, suspend, or manage all platform users
- **Beekeeper Verification** — Verify beekeeper registrations and certifications
- **Platform Analytics** — Monitor system-wide metrics and trends
- **Blockchain Explorer** — Browse all blockchain transactions
- **Audit Trail** — Complete, immutable audit log of all platform actions
- **System Settings** — Configure platform-wide settings and policies

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19 | Component-based UI with Hooks |
| **Language** | TypeScript 6 | Type-safe development |
| **Build Tool** | Vite 8 | Lightning-fast HMR & builds |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **Routing** | React Router DOM 6 | Client-side SPA routing |
| **Animations** | Framer Motion 13 | Smooth page transitions & micro-interactions |
| **Charts** | Recharts 3 | Data visualization for analytics |
| **Icons** | Lucide React | Consistent, beautiful icon set |
| **QR Codes** | qrcode.react + html5-qrcode | QR generation & camera scanning |
| **Fonts** | Inter + Plus Jakarta Sans | Modern, premium typography |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                         │
├──────────────┬──────────────┬───────────────┬───────────────┤
│   Public     │  Dashboard   │   Contexts    │   Services    │
│   Pages      │  Pages       │               │               │
│              │              │  AuthContext   │  authService  │
│  Landing     │  Beekeeper   │  Notification  │  batchService │
│  Trace       │  Processor   │  Context      │  blockchain   │
│  Verify      │  Distributor │               │  hiveService  │
│  Blockchain  │  Consumer    │               │  analytics    │
│  Login/      │  Admin       │               │  shipment     │
│  Signup      │              │               │  notification │
├──────────────┴──────────────┴───────────────┴───────────────┤
│                     Component Library                        │
│         (Button, Card, Badge, Sidebar, Navbar, etc.)         │
├─────────────────────────────────────────────────────────────┤
│               Simulated Blockchain Layer                     │
│        (Hash generation, Block explorer, Verification)       │
└─────────────────────────────────────────────────────────────┘
```

The app follows a **layered architecture**:

1. **Pages** — Route-level components organized by user role
2. **Components** — Reusable UI components (common, layout, ui)
3. **Contexts** — Global state management via React Context (Auth, Notifications)
4. **Services** — Business logic & data access layer (simulated for demo)
5. **Types** — Centralized TypeScript type definitions
6. **Data** — Mock data for demonstration purposes

---

## 📁 Project Structure

```
HoneyChain/
├── public/
│   ├── favicon.svg                 # App favicon
│   └── icons.svg                   # SVG icon sprite
├── src/
│   ├── assets/                     # Static assets
│   ├── components/
│   │   ├── common/
│   │   │   └── DemoRoleBar.tsx     # Floating demo role switcher
│   │   ├── layout/
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── Navbar.tsx          # Public navigation bar
│   │   │   └── Sidebar.tsx         # Dashboard sidebar
│   │   └── ui/
│   │       ├── Badge.tsx           # Status badge component
│   │       ├── Button.tsx          # Reusable button component
│   │       ├── Card.tsx            # Card container component
│   │       └── index.tsx           # UI barrel exports + shared widgets
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Authentication state & role management
│   │   └── NotificationContext.tsx  # Real-time notification system
│   ├── data/
│   │   └── mockData.ts             # Comprehensive mock dataset (~26KB)
│   ├── layouts/
│   │   └── index.tsx               # PublicLayout & DashboardLayout wrappers
│   ├── pages/
│   │   ├── public/                 # 🌐 Public-facing pages
│   │   │   ├── Landing.tsx         #    Hero, features, how-it-works
│   │   │   ├── Trace.tsx           #    Full batch traceability timeline
│   │   │   ├── Verify.tsx          #    QR code verification
│   │   │   ├── Blockchain.tsx      #    Blockchain explorer
│   │   │   ├── About.tsx           #    About HoneyChain
│   │   │   ├── Login.tsx           #    User login
│   │   │   ├── Signup.tsx          #    User registration
│   │   │   ├── Profile.tsx         #    User profile
│   │   │   └── NotFound.tsx        #    404 page
│   │   ├── beekeeper/             # 🐝 Beekeeper portal
│   │   │   ├── Overview.tsx        #    Dashboard overview
│   │   │   ├── Hives.tsx           #    Hive list & management
│   │   │   ├── HiveDetail.tsx      #    Individual hive detail
│   │   │   ├── Monitoring.tsx      #    Real-time hive monitoring
│   │   │   ├── Harvesting.tsx      #    Harvest recording
│   │   │   ├── Batches.tsx         #    Batch management
│   │   │   ├── Alerts.tsx          #    Hive health alerts
│   │   │   └── Analytics.tsx       #    Production analytics
│   │   ├── processor/             # 🏭 Processor portal
│   │   │   ├── Overview.tsx        #    Processing dashboard
│   │   │   ├── Incoming.tsx        #    Incoming batch inspection
│   │   │   ├── Processing.tsx      #    Active processing
│   │   │   ├── Quality.tsx         #    Quality testing lab
│   │   │   └── Completed.tsx       #    Completed batches
│   │   ├── distributor/           # 🚚 Distributor portal
│   │   │   ├── Overview.tsx        #    Distribution dashboard
│   │   │   ├── Shipments.tsx       #    Shipment management
│   │   │   ├── Tracking.tsx        #    Real-time tracking
│   │   │   ├── Distribution.tsx    #    Distribution center management
│   │   │   └── History.tsx         #    Delivery history
│   │   ├── consumer/              # 👤 Consumer portal
│   │   │   ├── Overview.tsx        #    Consumer dashboard
│   │   │   ├── Scans.tsx           #    QR code scanner
│   │   │   └── History.tsx         #    Scan history
│   │   └── admin/                 # 🔐 Admin portal
│   │       ├── Overview.tsx        #    Platform overview
│   │       ├── Users.tsx           #    User management
│   │       ├── Beekeepers.tsx      #    Beekeeper verification
│   │       ├── Batches.tsx         #    All batches
│   │       ├── Blockchain.tsx      #    Blockchain explorer
│   │       ├── Verifications.tsx   #    Verification requests
│   │       ├── Analytics.tsx       #    Platform analytics
│   │       ├── Alerts.tsx          #    System alerts
│   │       ├── Audit.tsx           #    Audit trail
│   │       └── Settings.tsx        #    Platform settings
│   ├── services/
│   │   ├── analyticsService.ts     # Analytics data aggregation
│   │   ├── authService.ts          # Authentication & demo login
│   │   ├── batchService.ts         # Honey batch CRUD operations
│   │   ├── blockchainService.ts    # Simulated blockchain interactions
│   │   ├── hiveService.ts          # Hive data & readings
│   │   ├── notificationService.ts  # Notification management
│   │   ├── shipmentService.ts      # Shipment tracking
│   │   └── userService.ts          # User data management
│   ├── types/
│   │   └── index.ts                # All TypeScript interfaces & types
│   ├── App.tsx                     # Root app component with all routes
│   ├── main.tsx                    # React entry point with providers
│   ├── index.css                   # Global styles & Tailwind imports
│   └── style.css                   # Additional custom styles
├── index.html                      # HTML entry point
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
└── .gitignore                      # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or **yarn** / **pnpm**)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/krishnachand-glitch/HoneyChain.git

# 2. Navigate to the project directory
cd HoneyChain

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`** (default Vite port).

### Build for Production

```bash
# Type-check and build
npm run build

# Preview the production build
npm run preview
```

---

## 👥 User Roles & Portals

HoneyChain implements a **multi-role architecture** with 5 distinct user portals:

| Role | Portal Path | Description |
|------|-------------|-------------|
| 🐝 **Beekeeper** | `/dashboard/beekeeper` | Manage hives, record harvests, track batches, monitor health |
| 🏭 **Processor** | `/dashboard/processor` | Receive batches, process honey, run quality tests |
| 🚚 **Distributor** | `/dashboard/distributor` | Manage shipments, track deliveries, cold-chain monitoring |
| 👤 **Consumer** | `/dashboard/consumer` | Scan QR codes, verify authenticity, view journey |
| 🔐 **Admin** | `/dashboard/admin` | Full platform management, audit trails, analytics |

Each role has a **dedicated sidebar** with role-specific navigation, and the **DemoRoleBar** allows instant switching between roles for evaluation purposes.

---

## 🗺 Pages & Routes

### Public Routes (with Navbar + Footer)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero section, features, how-it-works, CTA |
| `/trace` | Trace | Search & view full batch traceability |
| `/trace/:batchId` | Trace Detail | Pre-loaded traceability for a specific batch |
| `/verify` | Verify | QR code scanning & blockchain verification |
| `/verify/:batchId` | Verify Detail | Direct verification for a specific batch |
| `/blockchain` | Blockchain | Public blockchain explorer |
| `/about` | About | About HoneyChain, mission, team |
| `/login` | Login | User authentication |
| `/signup` | Signup | New user registration |
| `/profile` | Profile | User profile management |

### Dashboard Routes (with Sidebar)

> All dashboard routes are prefixed with `/dashboard/`

**Beekeeper:** `beekeeper`, `hives`, `hives/:hiveId`, `monitoring`, `harvesting`, `batches`, `alerts`, `analytics`

**Processor:** `processor`, `processor/incoming`, `processor/processing`, `processor/quality`, `processor/completed`

**Distributor:** `distributor`, `distributor/shipments`, `distributor/tracking`, `distributor/distribution`, `distributor/history`

**Consumer:** `consumer`, `consumer/scans`, `consumer/history`

**Admin:** `admin`, `admin/users`, `admin/beekeepers`, `admin/batches`, `admin/blockchain`, `admin/verifications`, `admin/analytics`, `admin/alerts`, `admin/audit`, `admin/settings`

---

## ⚙️ Services Layer

The services layer abstracts all data operations and business logic:

| Service | File | Responsibilities |
|---------|------|-----------------|
| **Auth** | `authService.ts` | Login, signup, demo role login, session management |
| **Batch** | `batchService.ts` | Honey batch CRUD, stage transitions, search & filter |
| **Blockchain** | `blockchainService.ts` | Block creation, hash generation, record verification, block explorer |
| **Hive** | `hiveService.ts` | Hive data, sensor readings, health status |
| **Analytics** | `analyticsService.ts` | Metrics aggregation, chart data, trend analysis |
| **Shipment** | `shipmentService.ts` | Shipment tracking, delivery status |
| **Notification** | `notificationService.ts` | Alert generation, notification management |
| **User** | `userService.ts` | User profiles, role management |

> **Note:** The current implementation uses a **simulated blockchain** with realistic hash generation and block structures. The service layer is designed for easy replacement with real blockchain integration (e.g., Ethereum, Hyperledger).

---

## 📊 Data Models

HoneyChain defines **14 TypeScript interfaces** for type-safe data handling:

| Model | Purpose |
|-------|---------|
| `User` | Platform user with role & verification status |
| `Beekeeper` | Beekeeper profile with farm details |
| `Hive` | Individual hive with sensor data |
| `HiveReading` | Time-series sensor readings |
| `HoneyBatch` | Core batch entity with full lifecycle data |
| `TraceabilityEvent` | Individual supply chain event with blockchain proof |
| `QualityTest` | Lab test results (moisture, HMF, purity, pollen) |
| `Alert` | Hive health alerts with severity levels |
| `Shipment` | Delivery shipment with GPS tracking |
| `AuditLogEntry` | Immutable audit trail entries |
| `Notification` | In-app notification with type categorization |
| `BlockchainRecord` | On-chain block with hash chain |
| `AnalyticsMetric` | Dashboard KPI metrics |
| `ChartDataPoint` | Chart visualization data |

---

## 🎮 Demo Mode

HoneyChain includes a **built-in demo mode** for seamless evaluation:

1. **Floating Role Switcher** — A `DemoRoleBar` component appears at the bottom of the screen, allowing instant switching between all 5 user roles without logging out/in.

2. **Demo Accounts** — Each role has a pre-configured demo account with realistic data.

3. **Mock Data** — A comprehensive mock dataset (~26KB) with realistic Indian honey industry data including:
   - Beekeepers from Himachal Pradesh, Uttarakhand, Karnataka, etc.
   - Honey types: Multifloral Himalayan, Litchi, Ajwain, Eucalyptus
   - Realistic batch IDs: `HC-2026-IND-XXXXXX`
   - Lab results with NABL certification references
   - Complete traceability timelines

### Quick Demo

```bash
# Start the dev server
npm run dev

# Open http://localhost:5173
# Use the floating role bar at the bottom to switch between roles
```

---

## 🖼 Screenshots

> Run the application locally to see the full UI experience with:
> - 🌙 Dark-themed, premium glassmorphism design
> - ✨ Smooth Framer Motion page transitions
> - 📊 Interactive Recharts data visualizations
> - 📱 Fully responsive layout (mobile → desktop)
> - 🔄 Real-time hive monitoring dashboards

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript strict mode conventions
- Use functional components with React Hooks
- Keep components focused and reusable
- Add proper type annotations for all props and state
- Use Tailwind CSS utility classes for styling
- Test across different viewport sizes

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** — For the incredible UI framework
- **Vite Team** — For the blazing fast build tool
- **Tailwind CSS** — For the utility-first CSS framework
- **Framer Motion** — For beautiful animation primitives
- **Lucide Icons** — For the clean icon library
- **Recharts** — For composable chart components

---

<p align="center">
  <strong>🍯 HoneyChain — From Hive to Home 🏠</strong>
  <br />
  <em>Building trust in every drop of honey through blockchain transparency.</em>
</p>
