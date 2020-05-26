# Fuzznuxt

Fuzzco Nuxt boilerplate. Designed for use with [Prismic](https://prismic.io/) sites.

1. [Installation](#installation)
    1. [Fonts](#fonts)
    1. [`prismic-content-full`](#prismic-content-full)
1. [Flow](#flow)
1. [Included](#included)
    1. [Libs](#libs)
    1. [Mixins](#mixins)
        1. [Head](#head)
        1. [Hovering](#hovering)
        1. [Observe](#observe)
        1. [prisImg](#prisimg)
        1. [Rect](#rect)
        1. [Slideshow](#slideshow)
    1. [Components](#components)
        1. [Prismic Image](#prismic-image)
1. [SEO](#seo-setup)
1. [Deployment](#deployment)
    1. [Netlify](#netlify)
    1. [Heroku](#heroku)

## Installation

1. Make sure you have [degit](https://github.com/Rich-Harris/degit#installation) and [prettier](https://prettier.io/docs/en/install.html) installed. Also make sure you have the Atom command installed (see "Another way to open a file..." [here](https://flight-manual.atom.io/getting-started/sections/atom-basics/#opening-a-file)).
1. `npx fuzznuxt your-project-name` - this will create a new directory called `your-project-name` in your current location and set up the boilerplate there.
1. Copy `.env.example` as `.env` and add the appropriate Prismic API URL.
1. `npm run dev`
1. Set up Prismic:
    1. **Pages**: Create a custom type called `page` with the a UID field called `slug`. Create a Page with the slug `front-page`. This is the content that will appear on `pages/index.vue`
    1. **Settings**: Create a custom type called `settings`. This is the content that will be used for global site settings.
    1. **Previews**: Make a new preview with the name `production`, add your Netlify domain, and set the link resolver to `/preview`. Ensure `libs/prismic/linkResolver.js` makes sense with your site structure.

### Fonts

Fuzznuxt comes with a script to make font preparation easier.

1. Select all formats, then drag and drop all fonts you want on your site to the uploader on [onlinefontconverter](https://onlinefontconverter.com).
1. Select "Download all attachments".
1. Drag the downloaded `arcive.zip` to the root directory of your Fuzznuxt project.
1. Run `npm run fonts`. This will execute `bash/fonts.sh`, which will unzip and organize the fonts from the `arcive.zip` file into the `static/fonts` folder and remove the `arcive.zip` file.

### `prismic-content-full`

By default, this repo uses the `prismic-content` component to handle rendering content from the Prismic WYSIWYG editor. Sometimes, though, you'll need to render content that links internally, which will initiate a full page load rather than a smooth transition. Use the `prismic-content-full` component rather than `prismic-content` to render content in this case:

1. Remove the `require(...Content.vue)` line from `plugins/browser.js`.
1. Uncomment the `require(...ContentFull.vue)` line from that same file.
1. Uncomment the `universal.build.extend` function in `nuxt.config.js`.

This will replace links that start with a slash with `nuxt-link` components (so in Prismic, creating a web link to `/news` would result in a seamless transition when clicked).

## Flow

The first thing to run in the template is `plugins/bootstrap.js` - this will be run server-side, so anything you need guaranteed on load should be retrieved here.

`plugins/browser.js` runs next. Usually, outside components and browser-dependent events (window resizing, font loading, etc) are registered here, but it's possible to set up anything you want guaranteed to run client-side in this script.

From there, Nuxt's normal [layout](https://nuxtjs.org/api/pages-layout/) and [page](https://nuxtjs.org/guide/views#pages) rules apply. There are **two notable exceptions:**

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

| Name       | Parameters                                   | Notes                                                                                                                 |
| ---------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `bezier`   | `(p0, p1, p2, p3)`                           | Construct a bezier curve from four points. See [here](https://cubic-bezier.com) for a visualizer.                     |
| `lerp`     | `(from, to, alpha)`                          | Lerp between `from` and `to`. `alpha` should be between 0 and 1.                                                      |
| `scrollTo` | `(el, duration = 1000, offset = 0)`          | Scroll to `el` (plus `offset`) over `duration` ms. Awaitable. Fails silently if no `el`.                              |
| `scrollUp` | `(duration = 1000)`                          | Scroll to the top of the page over `duration` ms.                                                                     |
| `wait`     | `(time = 1000)`                              | Wait `time` ms. Awaitable.                                                                                            |
| `waitFor`  | `(selector, {timeout: 2000, interval: 100})` | Wait `timeout` ms for an element matching `selector` to appear. `const element = await waitFor('.uncertain-element')` |

### Mixins

#### Head

Automatically included on every component. Will set SEO values and page title appropriately - see [SEO](#seo) below.

#### Hovering

Contains hover/focus enter and exit event listeners and adds the `hovering` property to the component's data.

#### Observe

Shortcuts for setting up and tearing down [intersection observers](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

```js
mounted(){
    const elementToObserve = this.$el // or desired element
    this.observe(elementToObserve, this.updateObserve)
},
methods: {
    updateObserve([observerData]){
        console.log(observerData)
    }
}
```

#### prisImg

Filter function for Prismic images. Use, for example, with [super-image](https://github.com/fuzzco/super-image):

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

### Components

Import and use any of the following components included with the boilerplate.

#### `prismic-image`

Wrapper for a Prismic image. Features:

-   Image padding to prevent jumping on load
-   Automatically includes a 1x1 version of the image stretched to full size as a preview.
-   Automatically fades in the main image when loaded.
-   Includes `srcset` and several sizes out of the box, with support for defining custom sizes. (See "Props > `sizes`" below.)

```html
<prismic-image v-bind="myImage" />

<script>
    export default {
        computed: {
            myImage() {
                // return an image from a Prismic content type or slice here
            }
        }
    }
</script>
```

##### Props

| Name          | Type           | Default                        | Notes                                                                                                                                                                                                                 |
| ------------- | -------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| alt           | String         | `''`                           | Image alt text. Usually handled by Prismic and `v-bind`.                                                                                                                                                              |
| aspect        | String, Number | `-1`                           | Aspect ratio. Calculated automatically if -1. Can be string or number between 0-1 or 0-100 (56.25% could be passed as either `aspect="56.25" or ":aspect="0.5625"`).                                                  |
| defer         | Boolean        | `false`                        | Whether to wait to load this image until the wrapper is in view. Useful for images that will be offscreen on load.                                                                                                    |
| dimensions    | Object         | `{ width: -1, height: -1 }`    | Original image dimensions. Usually handled by Prismic and `v-bind`.                                                                                                                                                   |
| fill-space    | Boolean        | `false`                        | Whether or not this image should take up all available space.                                                                                                                                                         |
| fit           | String         | `cover`                        | Value for `object-fit`. Usually either `cover` or `contain`.                                                                                                                                                          |
| hide-preview  | Boolean        | `false`                        | `prismic-image` loads a 1x1 version of the image and stretches it to full size as a preview. Set this to `true` to hide that preview.                                                                                 |
| ignore-srcset | Boolean        | `false`                        | Set to `true` to prevent using any `srcset` values and instead just use `src`. Automatically `true` on gifs to ensure they don't break.                                                                               |
| inner-wrapper | String         | `div`                          | The sizer for the image. The item that is `width: 100%` and `padding-bottom: [aspect ratio]`.                                                                                                                         |
| no-compress   | Boolean        | `false`                        | Set to `true` to prevent compression and alternate sizes (ie, remove the query string from the URL). Automatically `true` on gifs to ensure they don't break.                                                         |
| respect-max   | Boolean        | `false`                        | Set to `true` to prevent image from being any larger than its source's size. See also `scaleMax`.                                                                                                                     |
| scale-max     | Number         | `1`                            | If `respectMax` is `true`, use the original image's size times this value as the max size. (Example: to force an image's max size to be 50% of its source's size, use: `<prismic-image respect-max :scale-max="0.5"`) |
| sizes         | Array          | `[null, 1920, 1100, 800, 500]` | Sizes for the `srcset` image. Null for full size, otherwise width in px.                                                                                                                                              |
| src           | String         | `''`                           | Fallback URL for the image. `url` is preferred over this to align with Prismic's data format.                                                                                                                         |
| transition    | String         | `fade`                         | The transition to use for the main image when it has loaded.                                                                                                                                                          |
| url           | String         | `''`                           | URL for the image. Usually handled by Prismic and `v-bind`.                                                                                                                                                           |
| wrapper       | String         | `div`                          | The outermost element wrapping the `prismic-image`.                                                                                                                                                                   |

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
}
```

On each page-level component, use the `seo` lib:

```html
<script>
    import seo from '~/libs/seo'

    export default {
        async asyncData(context){
            const found = // page data that includes data from the above template
            const fallback = // the site's fallback data includes data from the above template
            return seo(found, fallback, store)
            // == { seoTitle, seoDescription, seoImage }
        }
    }
</script>
```

This will combine with the `head` mixin (`~/mixins/head`) to populate SEO fields for each page.

## Deployment

### Netlify

To set up a static site with Netlify, [connect your repo to Netlify](https://docs.netlify.com/configure-builds/repo-permissions-linking/) and set the deploy settings to:

```
Build command           npm run generate
Publish directory       dist
```

and the environment variables to:

```
PRISMIC_URL             (your Prismic API URL)
```

### Heroku

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
