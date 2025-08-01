#!/bin/bash

# Start backend
echo "Starting backend..."
cd server
npm install
node server.js &

# Go back to root and start frontend
cd ../client
echo "Starting frontend..."
npm install
npm run dev -- --host
