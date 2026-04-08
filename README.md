# Nexus Inventory Management System

A production-ready Full-Stack Inventory application built with **.NET 9** and **React (Vite)**. This project implements Clean Architecture, Repository Pattern, and JWT Authentication to meet the high standards of a Senior Developer role.

## 🚀 Quick Start (Local Setup)

Follow these steps to run the application locally (Ensure you have .NET 9 SDK and Node.js installed):

1. **Clone the Repository**
```
bash
git clone <URL_REPO_KAMU_DI_SINI>
cd Nexus-Inventory-System
```
2. Run Backend API
```
Bash
cd NexusInventory.Api
dotnet run
```
3. Run Frontend UI
Open a new terminal:
```
Bash
cd nexus-inventory-ui
npm install
npm run dev
```
4. Login Credentials
```
Username: admin
Password: admin123
```

🛠 Tech Stack & Senior Features
Backend (.NET 9)
- Architecture: Clean Architecture with Repository Pattern.
- Authentication: JWT (JSON Web Token) based Security.
- Caching: In-Memory Caching for optimized product retrieval performance.
- Database: SQLite (Auto-migrated/Created on startup - Zero configuration).
- Logging: Structured logging implementation using Serilog.
- Exception Handling: Global Middleware for standardized API error responses.
- Async Programming: Fully asynchronous I/O operations for scalability.

Frontend (React 18 + TypeScript)
- State Management: React Functional Components with Hooks.
- HTTP Client: Axios with Authorization Headers integration.
- Styling: Modern CSS with Dark Mode support and Responsive Design.

🧪 Testing
Critical components are covered with unit tests. To execute tests:
```
Bash
dotnet test
```

📝 Key Assumptions & Highlights
1. Zero-Config Database: Used SQLite so the application is runnable immediately without requiring a local SQL Server instance.
2. Security: JWT Token is used for all Product CRUD operations.
3. Data Integrity: Implemented Caching Invalidation logic; the cache is automatically cleared/updated when a Product is Created, Updated, or Deleted.
4. Code Quality: Strictly followed "No Inline Styles" and accessibility best practices (Aria-labels & Form labels).

Created by Anri Nobel Ibrahim
