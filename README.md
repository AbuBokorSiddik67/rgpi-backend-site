# 🏛️ Enterprise Academic Department Management & Automation System

A scalable, enterprise-grade backend platform for managing academic departments, students, faculty members, attendance, promotions, notices, and career opportunities. The system is designed with a **Modular Monolithic** architecture combined with a **Three-Tier Architecture** to ensure scalability, maintainability, and clear separation of concerns and emphasizing data integrity, security, and long-term maintainability.

Built with **TypeScript**, **Node.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**.

---

## ✨ Overview

This project centralizes academic administration by providing a secure REST API that automates common institutional workflows while preserving historical data consistency.

Key objectives include:

- Centralized academic management
- Automated attendance tracking
- Secure semester promotion workflow
- Notice and announcement management
- Career opportunities (Job & Internship Board)
- Role-based access control
- Production-ready backend architecture

---

### 🚀 Features

## Academic Management

- Department management
- Student management
- Faculty management
- Semester management
- Academic session management

---

## Attendance Automation

- Automatic daily class session generation
- Student attendance recording
- Historical attendance preservation
- Point-in-time data consistency
- Attendance analytics support

---

## Notice & Communication

- Bulletin board
- Department notices
- Academic announcements
- Event notifications

---

## Career Portal

- Job postings
- Internship opportunities
- Department-specific career notices

---

## Security

- JWT Authentication
- HttpOnly Cookie Authentication
- Role-Based Access Control (RBAC)
- Protected Routes
- Secure HTTP Headers
- Request Validation
- Centralized Error Handling

---

## 🛠 Tech Stack

|  Category | Technology |
|-----------|------------|
| Language | TypeScript (Strict Mode) |
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma ORM |
| Validation | Zod |
| Authentication | JWT |
| Cookie Handling | Cookie Parser |
| Security | Helmet |
| CORS | Express CORS |
| Environment | dotenv |

---

## 🏗 Project Structure

```text
src/
├── config/              # Configuration files
├── constants/           # Enums and constants
├── lib/                 # Call Library
├── middlewares/         # Authentication & middleware
├── modules/             # Feature modules
│   ├── moduleName/
│       ├── moduleName.controller.ts
│       ├── moduleName.service.ts
│       ├── moduleName.route.ts
│       ├── moduleName.validation.ts
│       └── moduleName.interface.ts
|
├── routes/              # API routes
├── types/                        
├── utils/               # Helper utilities
├── app.ts               # Express application
└── server.ts            # Server entry point
```

The project follows a modular architecture that separates routing, business logic, middleware, and data access, making it easier to maintain and scale.

---

## 📊 System Documentation

Additional architecture and database documentation:

- 📈 **Entity Relationship Diagram (ERD)**
- 🔄 **System Architecture Diagram**
- 📑 **API Documentation**

> Replace the links below with your actual documentation.

| Documentation         | Link |
|-----------------------|------|
| Database ERD          | https://surl.li/mesyyn |
| System Architecture   | https://surl.li/qvzbum |
| Api Documentation     |                        |

You can also inspect the database visually using:

```-
bash
npx prisma studio
-
```

---

### 🔒 Data Integrity

## Point-in-Time Attendance

Attendance records remain immutable even after students are promoted to another semester.

Instead of referencing mutable student-semester relationships directly, the system creates independent `ClassSession` snapshots that preserve historical records.

This ensures:

- Accurate historical reporting
- Reliable analytics
- Consistent audit history

---

## Secure Middleware Pipeline

The application includes multiple security layers:

### Helmet

Protects against common web vulnerabilities by setting secure HTTP headers.

### Cookie Parser

Stores JWT tokens inside secure HttpOnly cookies to reduce XSS attack risks.

### Zod Validation

Validates all incoming request payloads before business logic execution.

### RBAC

Restricts resource access according to user roles.

---

## ⚙️ Local Development

## Prerequisites

- Node.js (via NVM recommended)
- PostgreSQL
- npm

Select the correct Node version:

```bash
nvm use
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Rajshahi-Polytechnic-Institute/rgpi-backend-site

cd rgpi-backend-site
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
# Server Port and Environment.
PORT=5000
NODE_ENV=development

# Database Configuration.
DATABASE_URL="postgresql://dbusername:password@localhost:5432/db_name?schema=public"

# Token Secret.
JWT_SECRET="jwt secret_key"
JWT_EXPIRES_IN="7d"

# Desktop application secret.
DESKTOP_APP_SECRET="desktop_app_secret_key"
INTERNAL_API_HASH="secure_internal_api_hash"

# Private route key for secure access.
PRIVATE_ROUTE_KEY="secure_private_route_key"
```

---

## Database Setup

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

---

## Start Development Server

```bash
npm run dev
```

---

## 📈 Future Roadmap

- Email Notification System
- SMS Notification Integration
- Attendance Analytics Dashboard
- Report Generation (PDF/Excel)
- Class Routine Management
- Examination Module
- Result Management
- Multi-Institution Support
- Audit Logging
- Docker Deployment
- CI/CD Pipeline
- Redis Caching
- Background Job Processing (BullMQ)

---

## 🤝 Contributing

Contributions are welcome.

If you would like to improve the project:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

***RGPI (Team Space_Z 7/2_2022-23 Session)***

Backend & Full-Stack Software Engineers

- GitHub: https://github.com/Rajshahi-Polytechnic-Institute/rgpi-backend-site
- Team Members: https://group-members-profile.com

---

<p align="center">
Built with ❤️ using TypeScript, Express.js, Prisma ORM & PostgreSQL
</p>