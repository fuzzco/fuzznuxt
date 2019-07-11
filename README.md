# Fuzznuxt

> Fuzzco Nuxt boilerplate.

1. [Installation](#installation)
1. [Flow](#flow)
1. [Included](#included)
    1. [Libs](#libs)
    1. [Mixins](#mixins)
1. [SEO](#seo-setup)
1. [Deployment](#deployment)

## Installation

1. Download/clone this repo or [degit](https://github.com/Rich-Harris/degit): `degit fuzzco/fuzznuxt your-project-name`.
1. `npm install`
1. Copy `.env.example` as `.env` and add the appropriate Prismic URL.
1. `npm run dev`

## Flow

The first thing to run in the template is `plugins/bootstrap.js` - this will be run server-side, so anything you need guaranteed on load should be retrieved here.

`plugins/browser.js` runs next. Usually, outside components and browser-dependent events (window resizing, font loading, etc) are registered here, but it's possible to set up anything you want guaranteed to run client-side in this script.

From there, Nuxt's normal [layout](https://nuxtjs.org/api/pages-layout/) and [page](https://nuxtjs.org/guide/views#pages) rules apply.

**The one notable exception** is the `components` directory. Thanks to `plugins/global-components.js`, every Vue file in the `components` directory will automatically register globally. Kebab-case rules will apply to directory and PascalCase names - for example, this structure:

```
| ContactForm.vue
| site/
| --- Header.vue
| --- footer.vue
```

will register the following components:

-   `contact-form`
-   `site-header`
-   `site-footer`

**Additionally,** the contents of `assets/scss/_vars.scss` will automatically be `@include`d in every Vue component on the site.

## Included

This boilerplate comes with several built-in libraries, filters, utilities, and plugins.

### Libs

(TODO)

### Mixins

(TODO)

## SEO Setup

This template uses the following structure in Prismic on the global site settings and each custom page type:

```
"SEO" : {
    "seo_title" : {
      "type" : "Text",
      "config" : {
        "label" : "Title",
        "placeholder" : "Page title"
      }
    },
    "seo_description" : {
      "type" : "Text",
      "config" : {
        "label" : "Description",
        "placeholder" : "Page description"
      }
    },
    "seo_image" : {
      "type" : "Image",
      "config" : {
        "constraint" : { },
        "thumbnails" : [ {
          "name" : "Small",
          "width" : 450,
          "height" : null
        } ],
        "label" : "Image"
      }
    }
```

On each page-level component, use the `seo` lib:

```html
<script>
    import seo from '~/libs/seo'

    export default {
        async asyncData(context){
            const found = // populate this var with your page's data
            const fallback = // populate this var with the site's fallback data
            return seo(found, fallback)
            // == { seoTitle, seoDescription, seoImage }
        }
    }
</script>
```

This will combine with the globally-included `head` mixin (`~/mixins/head`) to populate SEO fields for each page.

## Deployment

To set up Heroku, you can follow the [Heroku instructions](https://devcenter.heroku.com/articles/git) or:

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
1. `heroku create`

Once Heroku is set up and you want to deploy:

1. `npm run deploy`
