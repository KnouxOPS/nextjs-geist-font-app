#!/bin/bash

# Install dependencies
npm install

# Install dev dependencies
npm install --save-dev \
  @types/jest \
  @types/node \
  typescript \
  ts-node \
  ts-jest \
  jest \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint

# Initialize TypeScript configuration
npx tsc --init

# Initialize Jest configuration
npx jest --init

echo "Setup complete! You can now run:"
echo "npm test - to run tests"
echo "npm start - to run the CLI"
echo "npm run dev - to run in development mode"
