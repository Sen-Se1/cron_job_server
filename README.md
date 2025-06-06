# Cron Job Server

This repository contains a lightweight Node.js-based cron job server that periodically triggers a Next.js API endpoint to check deadlines. It uses the `cron` package for scheduling and `axios` for HTTP requests.

## Features

* Flexible scheduling using cron expressions
* Secure requests with a shared secret header
* Configurable endpoint URL and server port
* Environment variable support via `.env`
* Development workflow with `nodemon`
* Easy to run locally or in production

## Prerequisites

* Node.js v14 or higher
* npm or yarn
* A running Next.js application with a cron-check endpoint (e.g., `/api/cron/check-deadlines`)

## Environment Variables

The server requires the following environment variables to be set before running.
Create a `.env` file in the root directory with the following keys:

```env
# Shared secret for authenticating cron requests
e.g. a long, random string
CRON_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

# Full URL of your Next.js cron handler endpoint
# Default: http://localhost:3000/api/cron/check-deadlines
NEXT_APP_URL=http://localhost:3000/api/cron/check-deadlines

# Port on which the cron server listens
# Default: 3001
PORT=3001
```

> ⚠️ **Security Note:** Keep `CRON_SECRET` safe and do not commit it to source control. Use a secrets manager or `.env` files excluded via `.gitignore`.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Sen-Se1/cron_job_server
   cd cron-job-server
   ```
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
   
## Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm start`     | Run the server using production settings           |
| `npm run dev`   | Run the server with `nodemon` for live reloading   |
| `npm test`      | Placeholder for future tests                       |

## Usage

Start the server in production mode:

```bash
npm start
````

Or in development mode with auto-reload:

```bash
npm run dev
```

You should see output like:

```
Cron server running on port 3001
Cron job executed successfully: { /* response from Next.js */ }
```

## Cron Schedule

The cron job is currently configured to run every 5 seconds using the expression:

```js
new cron.CronJob('*/5 * * * * *', async () => { /* ... */ });
```

To change the schedule, update the first argument of `CronJob`:

| Expression       | Description           |
| ---------------- | --------------------- |
| `*/5 * * * * *`  | Every 5 seconds       |
| `0 0 0 * * *`    | Every day at midnight |
| `0 */30 * * * *` | Every 30 minutes      |

Refer to the [cron package docs](https://www.npmjs.com/package/cron) for more details.

## Logging

Logs are printed to the console. You can pipe them to a file:

```bash
node start > cron.log 2>&1 &
```

## Docker (Optional)

To run in Docker, create a `Dockerfile`:

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t cron-server .
docker run -d \
  -e CRON_SECRET=$CRON_SECRET \
  -e NEXT_APP_URL=$NEXT_APP_URL \
  -e PORT=$PORT \
  cron-server
```

## License

MIT License © Sen-Se1
