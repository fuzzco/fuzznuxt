# Fuzznuxt

> Fuzzco Nuxt boilerplate.

## Installation

1. Download/clone this repo or [degit](https://github.com/Rich-Harris/degit): `degit fuzzco/fuzznuxt your-project-name`.
1. `npm install`
1. Copy `.env.example` as `.env` and add the appropriate Prismic URL.
1. `npm run dev`

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Deployment

To set up Heroku, you can follow the [Heroku instructions](https://devcenter.heroku.com/articles/git) or:

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
1. `heroku create`

Once Heroku is set up and you want to deploy:

1. `npm run deploy`
