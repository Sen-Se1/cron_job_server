const express = require('express');
const cron = require('cron');
const axios = require('axios');

const app = express();

const CRON_SECRET = process.env.CRON_SECRET;
const NEXT_APP_URL = process.env.NEXT_APP_URL || 'http://localhost:3000/api/cron/check-deadlines';

if (!CRON_SECRET) {
  console.error('CRON_SECRET environment variable is not set');
  process.exit(1);
}

// Define the cron job to run every 5 seconds */5 * * * * * | at midnight every day 0 0 0 * * *
const job = new cron.CronJob('*/5 * * * * *', async () => {
  try {
    const response = await axios.post(NEXT_APP_URL, {}, {
      headers: {
        'x-vercel-cron-secret': CRON_SECRET
      }
    });
    console.log('Cron job executed successfully:', response.data);
  } catch (error) {
    console.error('Error executing cron job:', error.message);
  }
});

job.start();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Cron server running on port ${PORT}`);
});