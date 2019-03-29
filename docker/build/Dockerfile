FROM amio/node-chrome AS builder

# --------------------------------------
# Prepare the app
# --------------------------------------
WORKDIR /app

## Copy the file with authentication and npm registry info, package and package-lock to avoid dependency trouble
COPY .npmrc package.json package-lock.json ./

## Install node modules
RUN npm install

## Copy all the files into the app folder
COPY . /app

# --------------------------------------
# Run linting
# --------------------------------------
RUN npm run lint

# --------------------------------------
# Run i18n-extract
# --------------------------------------
#RUN npm run i18n-extract

# --------------------------------------
# Run unit tests
# --------------------------------------
#RUN npm run test

# --------------------------------------
# Run e2e tests
# --------------------------------------
#RUN npm run e2e

# --------------------------------------
# Build the app
# --------------------------------------
## Replace environment variables
ARG MSA_BUILD
RUN sed -i -e "s/\${VERSION}/$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g')/" -e "s/\${BUILD}/${MSA_BUILD}/" src/environments/environment.prod.ts

RUN npm run build-release


# --------------------------------------
# Create final image
# --------------------------------------
FROM nginx:alpine

## Install bash
RUN apk update && apk add bash

## Copy our default nginx config
COPY docker/build/nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

## Copy sentry files
#COPY docker/sentry /usr/share/nginx/html

## Replace env variables
COPY docker/build/replace-env-variables-and-start-nginx.sh /.
RUN chmod +x /replace-env-variables-and-start-nginx.sh
ENTRYPOINT ["/replace-env-variables-and-start-nginx.sh", "/usr/share/nginx/html"]
