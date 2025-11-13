#!/bin/bash
echo "Starting React deployment..."
cd /root/website-tify-cloud

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build React app
npm run build

# Copy built files to nginx serve directory
cp -r dist/* ./

# Restart container
docker compose restart website-tify-cloud

echo "React deployment completed!"
