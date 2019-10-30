# Fuzznuxt

Fuzzco Nuxt boilerplate. Designed for use with [Prismic](https://prismic.io/) sites.

1. [Installation](#installation)
    1. [Fonts](#fonts)
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

### Fonts

Fuzznuxt comes with a script to make font preparation easier.

1. Select all formats, then drag and drop all fonts you want on your site to the uploader on [onlinefontconverter](https://onlinefontconverter.com).
1. Select "Download all attachments".
1. Drag the downloaded `arcive.zip` to the root directory of your Fuzznuxt project.
1. Run `npm run fonts`. This will execute `bash/fonts.sh`, which will unzip and organize the fonts from the `arcive.zip` file into the `static/fonts` folder and remove the `arcive.zip` file.

## Flow

The first thing to run in the template is `plugins/bootstrap.js` - this will be run server-side, so anything you need guaranteed on load should be retrieved here.

`plugins/browser.js` runs next. Usually, outside components and browser-dependent events (window resizing, font loading, etc) are registered here, but it's possible to set up anything you want guaranteed to run client-side in this script.

From there, Nuxt's normal [layout](https://nuxtjs.org/api/pages-layout/) and [page](https://nuxtjs.org/guide/views#pages) rules apply. There are **two notable exceptions:**

-   The `components` directory: Thanks to `plugins/global-components.js`, every Vue file in the `components` directory will automatically register globally. Kebab-case rules will apply to directory and PascalCase names - for example, this structure:

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

    To create async components in the `components` folder, end the component's name with `.async.vue` and register manually. For example, in the following contents of `~/components/`:

    ```
    | site/
    | --- NormalComponent.vue
    | --- LargeComponent.async.vue
    ```

    `site-normal-component` will automatically register globally, but `site-large-component` will need to be manually registered, ideally asynchronously:

    ```js
    export default {
        components: {
            'large-component': () =>
                import('~/components/site/LargeComponent.async.vue')
        }
    }
    ```

-   `_vars.scss`: Thanks to the [style-resources-module](https://github.com/nuxt-community/style-resources-module), the contents of `assets/scss/_vars.scss` will automatically be `@include`d in every Vue component on the site.

## Included

This boilerplate comes with several built-in libraries, filters, utilities, and plugins.

### Libs

#### Prismic

Contains several helper functions for serializing data from Prismic. Most of these are handled internally.

#### SEO

See [SEO](#seo) below.

#### Utilities

Contains common helper functions. Usage:

`import { wait } from '~/libs/utils'`

Functions:

| Name       | Parameters                          | Notes                                                                                             |
| ---------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `bezier`   | `(p0, p1, p2, p3)`                  | Construct a bezier curve from four points. See [here](https://cubic-bezier.com) for a visualizer. |
| `lerp`     | `(from, to, alpha)`                 | Lerp between `from` and `to`. `alpha` should be between 0 and 1.                                  |
| `scrollTo` | `(el, duration = 1000, offset = 0)` | Scroll to `el` (plus `offset`) over `duration` ms. Awaitable. Fails silently if no `el`.          |
| `scrollUp` | `(duration = 1000)`                 | Scroll to the top of the page over `duration` ms.                                                 |
| `wait`     | `(time = 1000)`                     | Wait `time` ms. Awaitable.                                                                        |

### Mixins

#### Head

Automatically included on every component. Will set SEO values and page title appropriately - see [SEO](#seo) below.

#### Hovering

Contains hover/focus enter and exit event listeners and adds the `hovering` property to the component's data.

#### prisImg

Globally included in `plugins/bootstrap.js`. Filter function for Prismic images. Use, for example, with [super-image](https://github.com/fuzzco/super-image):

`<super-image v-bind="prisImg(image)"/>`

#### Rect

Keeps track of an element's `boundingClientRect` via the `clientRect` data field. Also makes `rectThrottle` available on data to control how often, in ms, the client rect will update,

#### Slideshow

Adds several slideshow functions and properties. Sets left/right arrow key listeners and a [hammerjs](https://hammerjs.github.io/) swipe listener. Requires `slides` to be set manually - for example:

```html
<script>
    import slideshow from '~/mixins/slideshow'

    export default {
        mixins: [slideshow],
        data() {
            return {
                slides: [
                    /* your slides here */
                ]
            }
        }
    }
</script>
```

| Name                                | Type     | Info                                                                               |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `goToIndex(index, stopAuto = true)` | Function | Go to the given index. Will wrap correctly. Optionally stop autoplay.              |
| `index`                             | Number   | The wrapped index of the current slide. Will be between 0 and `slides.length - 1`. |
| `interval`                          | Number   | The number of ms between each slide on autoplay. Default 5000.                     |
| `next(stopAuto = true)`             | Function | Go to the next slide. Optionally stop autoplay.                                    |
| `prev(stopAuto = true)`             | Function | Go to the previous slide. Optionally stop autoplay.                                |
| `stopAuto()`                        | Function | Stop autoplay.                                                                     |

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
1. `heroku create your-app-name`

Once Heroku is set up and you want to deploy:

1. `npm run deploy`

On Heroku's end, remember to set these environment variables:

```
HOST                    0.0.0.0
NODE_ENV                production
NPM_CONFIG_PRODUCTION   false
PRISMIC_URL             (your Prismic API URL)
```
