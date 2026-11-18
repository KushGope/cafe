[//]: # "☕ FloraCafe – Frontend"

<p align="center">
  <img src="public/icons/Floracafe.png" alt="FloraCafe Logo" width="180" />
</p>
<h3 align="center">A Modern Café Management & Online Ordering Experience</h3>
<p align="center">
  A responsive and user-friendly frontend application for managing café operations, browsing menus, placing orders, and administering café activities.
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React-JavaScript-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Architecture-Component--Based-success" alt="Architecture" />
  <img src="https://img.shields.io/badge/Status-In%20Development-orange" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>


📌 TABLE OF CONTENTS
============================================================

1.  📖 Project Overview
2.  ✨ Key Features
3.  🏗️ Application Architecture
4.  📂 Project Structure
5.  🧰 Technology Stack
6.  💻 Prerequisites
7.  🚀 Getting Started
8.  ⚙️ Environment Configuration
9.  ▶️ Running the Application
10. 🔌 API Integration
11. 🔐 Authentication and Authorization
12. 🌐 Deployment
13. 🧑‍💻 Development Guidelines
14. 🐛 Troubleshooting
15. 🚀 Future Improvements
16. 👨‍💻 Author
17. 📄 License


📖 1. PROJECT OVERVIEW
============================================================

FloraCafe Frontend is the client-side application of the FloraCafe
full-stack café management and online ordering platform.

The application provides an interactive interface through which
customers can explore café products, manage shopping carts,
place orders, and monitor order progress.

It also provides an administrative dashboard that allows authorized
administrators to manage customers, menu items, orders, shop settings,
and sales-related information.

The frontend communicates with a RESTful backend developed using
Java and Spring Boot.


🎯 PROBLEM IT SOLVES

Traditional café management processes often involve manual order
handling, disconnected customer experiences, and inefficient
administrative workflows.

FloraCafe aims to address these challenges through:

- A centralized digital menu and ordering experience.
- Simplified shopping cart and order management.
- Secure customer authentication.
- An administrative interface for café operations.
- Real-time-friendly order status presentation.
- Better separation between customer and administrative functionality.


💡 CORE VALUE PROPOSITION

FloraCafe combines customer convenience and operational management
into a single web application, providing a scalable foundation for
digital café operations.


✨ 2. KEY FEATURES
============================================================

👤 CUSTOMER FEATURES

- User registration and login.
- Protected customer routes.
- Interactive homepage and café information.
- Dynamic menu browsing.
- Product cards and menu item presentation.
- Shopping cart management.
- Order placement and order history.
- Order details and status tracking.
- Contact and about pages.
- Responsive navigation and layouts.


🔐 AUTHENTICATION FEATURES

- Centralized authentication context.
- Authentication provider for application-wide state.
- Protected routes for authenticated users.
- Guest-only routes for login and signup.
- Dedicated authentication layouts.
- Integration with backend authentication services.


🛠️ ADMIN DASHBOARD

- Administrative login.
- Dashboard statistics.
- Customer management.
- Order management.
- Shop management.
- Sales overview.
- Recent orders.
- Quick administrative actions.
- Reusable statistics cards.
- Sidebar navigation and admin header.


🛒 SHOPPING CART

- Centralized cart context.
- Shared cart provider.
- Cart item management.
- Order preparation and submission.
- Integration with backend order services.


🏗️ 3. APPLICATION ARCHITECTURE
============================================================

The frontend follows a modular, feature-oriented React architecture.
The application separates presentation, routing, authentication, API
communication, and business-specific functionality.


📌 HIGH-LEVEL ARCHITECTURE

                  CUSTOMER / ADMIN
                         |
                         v
                REACT FRONTEND
                         |
              +----------+----------+
              |                     |
              v                     v
        Customer UI             Admin UI
              |                     |
              v                     v
        Feature Modules        Admin Modules
              |                     |
              +----------+----------+
                         |
                         v
                  API CLIENT
                         |
                    HTTP/REST
                         |
                         v
                 SPRING BOOT API
                         |
              +----------+----------+
              |          |          |
              v          v          v
           Auth       Menu       Orders
              |          |          |
              +----------+----------+
                         |
                         v
                    DATABASE



📌 FRONTEND RESPONSIBILITIES

| Layer | Responsibility |
| :--- | :--- |
| `App` | Application initialization |
| `Routes` | Navigation and route configuration |
| `Auth` | Authentication state and route protection |
| `API` | HTTP communication with backend |
| `Features` | Customer-facing business modules |
| `Admin` | Administrative dashboard and management |
| `Components` | Reusable UI components |
| `Services` | Feature-specific API operations |
| `Utils` | Shared utility functions |
| `Styles` | Global and application styling |


📌 BACKEND COMMUNICATION

The frontend communicates with the Spring Boot backend through a
centralized API layer:

- api/endpoints.js – API endpoint configuration.
- api/fetchClient.js – Shared HTTP communication.
- Feature service files – Feature-specific API operations.

This structure helps avoid duplicated API logic and makes backend
integration easier to maintain.


📂 4. PROJECT STRUCTURE
============================================================

📌 FOLDER RESPONSIBILITIES

| Directory | Description |
| :--- | :--- |
| `app/` | Application entry and route management |
| `api/` | Centralized API configuration |
| `admin/` | Administrative dashboard |
| `auth/` | Login, signup, and authentication |
| `components/` | Shared application components |
| `features/` | Customer-facing application features |
| `assets/` | Images and icons |
| `styles/` | Global styles and themes |
| `utils/` | Shared helper functions |


🧰 5. TECHNOLOGY STACK

| Technology | Purpose |
| :--- | :--- |
| **React** | Component-based frontend development |
| **JavaScript (ES6+)** | Application logic |
| **HTML5** | Application structure |
| **CSS3** | Styling and responsive layouts |
| **REST API** | Backend communication |
| **Fetch API / client** | HTTP requests |
| **React Context API** | Shared application state |
| **Git & GitHub** | Version control |

> **Note:** The exact React version, router package, build tool, and additional libraries should be confirmed from `package.json` before publishing this documentation.

💻 6. PREREQUISITES

Install the following tools before running the application.

| Software | Recommended Version |
| :--- | :--- |
| **Node.js** | 20 LTS or newer |
| **npm** | Version bundled with Node.js |
| **Git** | Latest stable |
| **Modern browser** | Chrome, Firefox, Edge |
| **Java** | 17 or newer (required by backend) |
| **Spring Boot** | Compatible with backend project |

🔍 VERIFY INSTALLATIONS

```bash
node --version
npm --version
git --version
java --version
```

🚀 7. GETTING STARTED
============================================================

1️⃣ CLONE THE REPOSITORY

```bash
git clone [https://github.com/kushgope/cafe.git] (https://github.com/kushgope/cafe.git)
cd FloraCafe/frontend
```

2️⃣ INSTALL DEPENDENCIES

Navigate to the frontend project directory:

cd frontend

Install the required packages:

npm install


3️⃣ CONFIGURE ENVIRONMENT VARIABLES

Create a .env file in the frontend root directory.

# Backend API base URL
VITE_API_BASE_URL=http://localhost:8080/api

Important: The example assumes Vite is used as the frontend build tool.
If your project uses Create React App or another build tool, adjust
the environment variable prefix and access syntax accordingly.

For Vite, environment variables are accessed through:

const API_URL = import.meta.env.VITE_API_BASE_URL;

Never store passwords, private API keys, or database credentials
in frontend environment variables. Variables exposed to browser code
are publicly accessible.


⚙️ 8. ENVIRONMENT CONFIGURATION
============================================================

📌 ROOT-LEVEL ENVIRONMENT VARIABLES

If the repository contains a root-level .env file for shared tooling,
configure it separately.

Example:

NODE_ENV=development

Do not assume root-level variables are automatically available to the
frontend build tool.


📌 FRONTEND ENVIRONMENT VARIABLES

Variable              Description               Example
------------------------------------------------------------
VITE_API_BASE_URL     Backend API base URL      http://localhost:8080/api


📌 EXAMPLE .env.example

VITE_API_BASE_URL=http://localhost:8080/api

Add .env to .gitignore and commit only .env.example.


▶️ 9. RUNNING THE APPLICATION
============================================================
🚀 START FRONTEND DEVELOPMENT SERVER

npm run dev

The application will generally be available at:

http://localhost:5173

The actual development URL depends on the build tool configuration.


☁️ RUN BACKEND SEPARATELY

Open another terminal:

cd backend

Start the Spring Boot application using the available Maven or
Gradle wrapper.

For Maven:

./mvnw spring-boot:run

For Windows:

mvnw.cmd spring-boot:run

The backend is expected to run at:

http://localhost:8080

📌 RUNNING BOTH APPLICATIONS

| Application | Command | Default URL |
| :--- | :--- | :--- |
| Frontend | `npm run dev` | `localhost:5173` |
| Backend | `./mvnw spring-boot:run` | `localhost:8080` |

Both applications must be running for full-stack functionality.


🔌 10. API INTEGRATION
============================================================

The frontend uses centralized API configuration and feature-specific
service modules.

📌 API CONFIGURATION

src/api/
├── endpoints.js
└── fetchClient.js


📌 FEATURE SERVICE MODULES

| Service | Responsibility |
| :--- | :--- |
| `admin/services/adminService.js` | Administrative operations |
| `features/home/services/shopService.js` | Shop information |
| `features/menu/menuService.js` | Menu operations |
| `features/orders/orderService.js` | Order operations |

📌 API COMMUNICATION FLOW

```text
React Component
      |
      v
Feature Service
      |
      v
fetchClient.js
      |
      v
endpoints.js
      |
      v
Spring Boot REST API
      |
      v
JSON Response
      |
      v
React UI Update
```

🔐 11. AUTHENTICATION AND AUTHORIZATION
============================================================
FloraCafe uses a centralized authentication architecture.

Important files:
```
auth/
├── AuthContext.jsx
├── AuthProvider.jsx
├── AuthLayout.jsx
├── GuestRoute.jsx
├── ProtectedRoute.jsx
└── useAuth.js
```

📌 AUTHENTICATION WORKFLOW

1. A customer submits login credentials.
2. The frontend sends credentials to the backend.
3. The backend validates the credentials.
4. The backend returns the authentication response.
5. The frontend updates its authentication state.
6. Protected routes become accessible according to the user's authorization.


📌 ROUTE PROTECTION

- ProtectedRoute.jsx restricts access to authenticated users.
- GuestRoute.jsx handles routes intended for unauthenticated visitors.
- AuthProvider.jsx provides shared authentication state.

Security recommendation: Enforce authorization on the backend for every
protected operation. Hiding frontend routes is not a substitute for
server-side security.


🌐 12. DEPLOYMENT
============================================================

The frontend can be deployed independently from the backend.


🚀 OPTION 1: VERCEL

1. Push the frontend code to GitHub.
2. Import the repository into Vercel.
3. Set the frontend root directory.
4. Configure the build command:
   npm run build
5. Configure the output directory according to the build tool
   (commonly dist for Vite).
6. Add production environment variables:
   VITE_API_BASE_URL=https://your-backend-domain.com/api
7. Deploy the application.


☁️ OPTION 2: NETLIFY

1. Connect the GitHub repository.
2. Select the frontend directory.
3. Set the build command to npm run build.
4. Set the publish directory to dist if using Vite.
5. Configure environment variables.
6. Deploy.

Configure SPA fallback/rewrite rules so that direct navigation to
nested React routes works correctly.


📋 PRODUCTION CHECKLIST

- [ ] Set the production API URL.
- [ ] Enable HTTPS.
- [ ] Configure backend CORS for the frontend domain.
- [ ] Verify protected routes.
- [ ] Test authentication and order workflows.
- [ ] Verify responsive layouts.
- [ ] Configure SPA routing fallback.
- [ ] Ensure .env is not committed.
- [ ] Run a production build.


🧑‍💻 13. DEVELOPMENT GUIDELINES
============================================================

To maintain a clean and scalable frontend:

1. Use reusable React components.
2. Keep API requests inside service modules.
3. Avoid duplicating authentication logic.
4. Use descriptive component and function names.
5. Keep feature-specific code inside its respective feature directory.
6. Avoid hardcoding backend URLs.
7. Handle API errors and loading states.
8. Validate user input before submission.
9. Maintain consistent styling.
10. Test important user workflows before submitting changes.


🏗️ PRODUCTION BUILD

npm run build


🔍 PREVIEW PRODUCTION BUILD

npm run preview

These commands assume the project uses Vite and defines the
corresponding scripts.


🐛 14. TROUBLESHOOTING
============================================================
```
PROBLEM: API connection failed
SOLUTION: Verify backend availability and API URL

PROBLEM: CORS error
SOLUTION: Configure allowed frontend origin in Spring Security

PROBLEM: Dependencies fail
SOLUTION: Delete node_modules and reinstall

PROBLEM: Environment variables unavailable
SOLUTION: Verify build tool prefix and restart dev server

PROBLEM: Protected route inaccessible
SOLUTION: Verify authentication state and backend response

PROBLEM: Page refresh returns 404
SOLUTION: Configure SPA fallback on hosting platform

PROBLEM: Menu not loading
SOLUTION: Verify menu endpoint and backend database
```

🚀 15. FUTURE IMPROVEMENTS
============================================================

Potential future enhancements include:

- Online payment gateway integration.
- Enhanced order tracking.
- Improved mobile-first UI.
- Product search and filtering.
- Customer profile management.
- Notification integration.
- Automated frontend testing.
- Accessibility improvements.
- Performance optimization.


👨‍💻 16. AUTHOR
============================================================

KUSH GOPE

GitHub: [Kush Gope](https://github.com/KushGope)


<p align="center">
  Made with ❤️ by <strong>Kush Gope</strong>
</p>
