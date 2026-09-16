import { defineConfig, devices } from '@playwright/test';
export default defineConfig({testDir:'./tests',fullyParallel:false,use:{baseURL:'http://localhost:3100',trace:'retain-on-failure'},webServer:[
  {command:'node src/server.js',cwd:'./OBBIAN_BACKEND',url:'http://127.0.0.1:4000/api/health',reuseExistingServer:false,timeout:60000,env:{FRONTEND_ORIGINS:'http://localhost:3100',MONGODB_URI:process.env.MONGODB_URI ?? ''}},
  {command:'yarn start --port 3100',url:'http://localhost:3100',reuseExistingServer:false,timeout:120000},
],projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}]});
