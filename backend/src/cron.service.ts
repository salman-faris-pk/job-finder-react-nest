import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import axios from 'axios'

@Injectable()
export class CronService implements OnModuleInit {
  onModuleInit() {
    cron.schedule('12,26,40,54 * * * *', async () => {
      try {
        
        const res = await axios.get('https://job-finder-romk.onrender.com/dummy');
        if (res.status === 200) {
          console.log("GET request sent successfully");
        } else {
          console.log("GET request failed", res.status);
        }
        
      } catch (error) {
        console.error('Error sending request:', error.message);
      }
    });

    console.log('Cron job scheduled to run every 14 minutes');
  }
}
