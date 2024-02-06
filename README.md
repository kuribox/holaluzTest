# HOLALUZ test

## Author
Martin Baratto

## Introduction
This document provides an overview of the technical test for Holaluz.
The project is structured into two main sections: Backend and Frontend, each with specific setup instructions and requirements.

### Backend
The backend code is located in the `/Backend` directory. To initialize the backend service, you have two options:
- Using Docker: Run `docker-compose up` to set up and start the service automatically.
- Using Yarn: First, run `yarn install` to install all dependencies, and then `yarn start` to start the service.

**Requirements:**
- Node.js version 18 or higher is required to run the backend.

**Testing:**
- To run the tests for the backend, execute `yarn test`.

### Frontend
The frontend code can be found in the `/Frontend` directory. To get the frontend running, follow these steps:
- Install dependencies by running `yarn install`.
- Start the development server by executing `yarn serve`.

**Requirements:**
- Similar to the backend, Node.js version 18 or higher is needed for the frontend.

**Testing:**
- The tests for the frontend can be launched with `yarn test`.