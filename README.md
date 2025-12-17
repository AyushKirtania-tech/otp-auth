# Full-Stack OTP Authentication System

A scalable, full-stack authentication system designed to handle OTP (One-Time Password) verification using a microservices-inspired architecture. This project separates the core backend logic, frontend user interface, and asynchronous background workers for high performance and reliability.

## 🚀 Features

* **Secure Authentication**: OTP-based login and registration flows.
* **Asynchronous Processing**: Uses **Redis** and **BullMQ** to offload SMS sending tasks to background workers, ensuring the API remains fast and responsive.
* **Scalable Architecture**: Decoupled Backend, Frontend, and Worker services.
* **Database ORM**: Utilizes **Prisma** for type-safe database interactions (PostgreSQL).
* **Modern Frontend**: Built with **Next.js 15+** and **Tailwind CSS** for a responsive user experience.
* **Validation**: Robust input validation using **Zod**.
* **SMS Integration**: Integrated with **Fast2SMS** for delivering OTPs.

## 🛠 Tech Stack

### Frontend (`customer-fe`)
* **Framework**: Next.js (App Router)
* **Styling**: Tailwind CSS
* **State/Network**: Axios, React Hooks
* **Notifications**: React Hot Toast

### Backend (`backend`)
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: PostgreSQL (via Prisma ORM)
* **Caching/Queues**: Redis, BullMQ
* **Validation**: Zod
* **Security**: JWT (JSON Web Tokens), Cookie Parser
* **Storage**: AWS S3 (configured for storage needs)

### Workers (`workers`)
* **Queue Consumer**: BullMQ
* **SMS Provider**: Fast2SMS API

## 📂 Project Structure

```bash
├── backend/          # Express.js API server
├── customer-fe/      # Next.js frontend application
└── workers/          # Background workers for processing SMS queues

```

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+)
* Redis Server (Running locally or cloud)
* PostgreSQL Database

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install

```

Create a `.env` file in `backend/` and configure the following:

```env
PORT=8000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
JWT_SECRET="your_jwt_secret"
REDIS_HOST="localhost"
REDIS_PORT=6379
# AWS Config (if using S3 features)
AWS_REGION="ap-south-1"
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
BUCKET_NAME="your_bucket_name"

```

Run migrations and start the server:

```bash
npx prisma migrate dev
npm run dev

```

### 2. Workers Setup

The worker service listens for jobs added by the backend to send SMS messages.

```bash
cd workers
npm install

```

Create a `.env` file in `workers/` with:

```env
REDIS_HOST="localhost"
REDIS_PORT=6379
FAST2SMS_API_KEY="your_fast2sms_api_key"

```

Start the worker:

```bash
npm start

```

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd customer-fe
npm install

```

Create a `.env.local` file (if needed for API base URL):

```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"

```

Run the development server:

```bash
npm run dev

```

The app should now be running at `http://localhost:3000`.

## 🔄 Workflow

1. **User Request**: User enters their phone number on the Next.js frontend.
2. **API Call**: Frontend calls `POST /api/v1/customer/send-otp`.
3. **Queue Job**: Backend validates the request and adds a job to the `otp-queue` in Redis.
4. **Processing**: The `workers` service picks up the job from Redis.
5. **SMS Delivery**: Worker calls the Fast2SMS API to send the OTP to the user's phone.
6. **Verification**: User enters the OTP, which is verified against the database/cache by the Backend.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
