# Tour Monitoring Frontend

Make sure to run `npm install` first !

## Developing with a Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

0. At the moment there are no e2e tests implemented.
1. Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Docker builds / Agent builds

Since builds on agents are very slow when they are not really caching layers we have our own base image with `node:8.11.1`, `npm@6.2.0` and `Google Chrome`. It is publically available on Docker Hub and it's name is `amio/node-chrome`. The copy is also available under `mrmyiagi/node-chrome`.
Building and pushing it is done manually and it is located at `docker/base/Dockerfile-build`.

## Updating the BFF models from the swagger definition

1. Make sure the BFF is running on address configured in docker-compose-swagger.yml file
2. Run `docker-compose -f docker-compose-swagger.yml up` which should regenerate the proxy


## Sentry

Each time a new release is created we also could create a release for using sentry that contains both source source and source maps in order to make captured exceptions more readable and understandable.
This happens in Docker via `docker/sentry/Dockerfile`.

It has a custom base image which can be found at `docker/base/Dockerfile-sentry`. It's build and push is done manually.