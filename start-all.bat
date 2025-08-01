@echo off
start cmd /k "cd server && npm install && node server.js"
start cmd /k "cd client && npm install && npm run dev -- --host"
