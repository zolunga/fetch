## Description

Receipt processor, after run the project you can access to this url to check documentation
http://localhost:3000/api

## Running from docker
First build image
```bash
$ docker build -t fetch .
```

After build run the image with the next line
```bash
$ docker run -p 3000:3000 fetch
```


## Installation
Just for running on localy, need to install nodejs 16.X.X first and after you cant execute the nexts commands

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
