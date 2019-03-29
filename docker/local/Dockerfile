FROM amio/node-chrome AS builder

# --------------------------------------
# Prepare the app
# --------------------------------------
WORKDIR /app

## Copy the file with authentication and npm registry info, package and package-lock to avoid dependency trouble
COPY .npmrc package.json package-lock.json ./

## Install node modules
RUN npm install
