# 📞 Auto Call Platform

**Auto Call Platform** is a microservice-based system that allows users to upload phone number lists, attach audio files, and create automated call campaigns.  
The platform enables campaign management, call execution, real-time monitoring, and detailed statistics — all through a unified **API Gateway**.

---

## 🎯 Project Goal

To provide businesses and users with a reliable automated calling system that can:

- Organize and execute automated phone call campaigns
- Manage campaign schedules, retries, and limits
- Monitor live call progress in real time
- Generate statistics and reports
- Provide secure user and role management

---

## 🏗 Architecture

The system is built on **Microservice Architecture**, with each service running independently and communicating via **gRPC**.  
**WebSocket** is used for real-time updates, while the **API Gateway** provides a unified entry point for all clients.

### Services:

1. **Auth Service** — Authentication & Authorization
2. **File Service** — Excel & Audio file management
3. **Campaign Service** — Campaign creation and scheduling
4. **Call Service** — Call execution and status management
5. **Statistics Service** — Reports and analytics
6. **Notification Service** — Alerts and notifications
7. **WebSocket Service** — Real-time monitoring

---

## 📂 Project Structure

auto-call-platform/
│── api-gateway/ # Unified Gateway (REST + gRPC)
│── auth-service/ # Authentication & user management
│── file-service/ # Excel & audio file handling
│── campaign-service/ # Campaign management
│── call-service/ # Call execution & call logs
│── statistics-service/ # Analytics & reports
│── notification-service/ # Alerts & notifications
│── websocket-service/ # Real-time monitoring
│── common/ # Shared proto files & utilities
│── docker-compose.yml
│── README.md

---

## 🧩 Service Details

### 🔑 1. Auth Service

- **Tables**: `users`, `roles`, `user_roles`, `audit_logs`
- **Features**: Registration, login/logout, JWT + refresh token, RBAC (Role-based access control), audit logging

### 📂 2. File Service

- **Tables**: `excel_files`, `audio_files`, `phone_numbers`
- **Features**: Upload Excel files, parse phone numbers, validate contacts, upload and store audio files

### 📞 3. Campaign Service

- **Tables**: `call_campaigns`, `campaign_schedules`, `system_settings`, `providers`
- **Features**: Create new campaigns, select providers, configure schedules, set limits (max_concurrent_calls, retry_limit, priority)

### ☎️ 4. Call Service

- **Tables**: `call_logs`, `call_attempts`
- **Features**: Execute calls within campaigns, manage retries, track call statuses (initiated, answered, failed, busy), integrate with providers (SIP/VoIP API, Asterisk ARI)

### 📊 5. Statistics Service

- **Tables**: `call_statistics`
- **Features**: Calculate daily/campaign statistics, generate reports (total_calls, answered_ratio, avg_duration, total_cost)

### 🔔 6. Notification Service

- **Tables**: `notifications`
- **Features**: Real-time notifications via Email, SMS, WebSocket, alert system for users and admins

### ⚡ 7. WebSocket Service

- **Read-only Tables**: `call_campaigns`, `call_logs`, `call_attempts`, `call_statistics`, `notifications`
- **Features**: Real-time updates, push notifications, live campaign progress tracking, instant statistics refresh

---

## 🔄 Service Communication

- **Auth ↔ Campaign Service** → user can only manage their own campaigns
- **Campaign ↔ Call Service** → calls are triggered from campaign definitions
- **Call ↔ Statistics Service** → statistics are updated after calls finish
- **Notification Service** → listens to events from all services and sends alerts
- **WebSocket Service** → streams real-time updates to clients

---

## 🛠 Technologies

- **Backend**: [NestJS](https://nestjs.com/) (gRPC, WebSocket, Swagger)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Authentication**: JWT + Refresh Tokens
- **File Storage**: Local FS / AWS S3 (for audio & Excel files)
- **Deployment**: Docker & Kubernetes
- **Monitoring**: Prometheus + Grafana

---

## 🚀 Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/Auto-call-project/auto-call-platform.git
```
