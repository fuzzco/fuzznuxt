# Fuzznuxt

Fuzzco Nuxt boilerplate. Designed for use with [Prismic](https://prismic.io/) sites.

- [Fuzznuxt](#fuzznuxt)
  - [Installation](#installation)
    - [Fonts](#fonts)
    - [`prismic-content`](#prismic-content)
  - [Flow](#flow)
  - [Included](#included)
    - [Libs](#libs)
      - [Prismic](#prismic)
      - [SEO](#seo)
      - [Utilities](#utilities)
    - [Mixins](#mixins)
      - [Head](#head)
      - [Hovering](#hovering)
      - [Observe](#observe)
      - [prisImg](#prisimg)
      - [Rect](#rect)
      - [Slideshow](#slideshow)
    - [Components](#components)
      - [`prismic-image`](#prismic-image)
        - [Props](#props)
    - [Directives](#directives)
      - [`v-intersect`](#v-intersect)
      - [`v-reverse-hover`](#v-reverse-hover)
  - [SEO Setup](#seo-setup)
  - [Forms](#forms)
  - [Deployment](#deployment)
    - [Netlify](#netlify)
    - [Heroku](#heroku)

## Installation

1. Set up on your machine:
   1. Make sure you have [Node.js and NPM](https://www.npmjs.com/get-npm) installed.
   2. In your terminal, navigate ([how?](https://arian-celina.com/windows-cmd-macos-terminal-navigation/)) to where you want your source code to exist.
   3. Run `npx fuzznuxt your-project-name` - this will create a new directory called `your-project-name` in your current location and set up the boilerplate there. As of May 2021, you should only need to change these options:
      * **Package Manager:** Select `Npm` instead of `Yarn`
      * **Deployment target:** Select `Static (Static/Jamstack hosting)` instead of `Server (Node.js hosting)`
   4. Run `cd your-project-name`, then `npm run dev`, to navigate to your new project and run the development server.
2. Set up Prismic:
    1. **Pages**: Create a repeatable custom type called `page` with the a UID field called `UID`. 
    2. Create a Page with the UID `front-page`. This is the content that will appear on `pages/index.vue`
    3. **Settings**: Create a single custom type called `settings`. This is the content that will be used for global site settings.
    4. **Previews**: Make a new preview with the name `production`, add your Netlify domain, and set the link resolver to `/preview`. 
       * For more advanced site structures, you may need to ensure `libs/prismic/linkResolver.js` (the [link resolver](https://prismic.io/docs/technologies/link-resolver-javascript)) makes sense with your site structure, but you can disregard that at the start of the project.

### Fonts

Fuzznuxt comes with a script to make font preparation easier.

1. Select all formats, then drag and drop all fonts you want on your site to the uploader on [onlinefontconverter](https://onlinefontconverter.com).
1. Select "Download all attachments".
1. Drag the downloaded `arcive.zip` to the root directory of your Fuzznuxt project.
1. Run `npm run fonts`. This will execute `bash/fonts.sh`, which will unzip and organize the fonts from the `arcive.zip` file into the `static/fonts` folder and remove the `arcive.zip` file.

### `prismic-content`

By default, this repo uses the `prismic-content` component to handle rendering content from the Prismic WYSIWYG editor, which renders internal and external links automatically. You can pass your own custom HTML serializer to the `html-serializer` prop if you want to override this default behavior.

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

| Name       | Parameters                                                    | Notes                                                                                                                            |
| ---------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `bezier`   | `(p0, p1, p2, p3)`                                            | Construct a bezier curve from four points. See [here](https://cubic-bezier.com) for a visualizer.                                |
| `lerp`     | `(from, to, alpha)`                                           | Lerp between `from` and `to`. `alpha` should be between 0 and 1.                                                                 |
| `scrollTo` | `(el, duration = 1000, offset = 0)`                           | Scroll to `el` (plus `offset`) over `duration` ms. Awaitable. Fails silently if no `el`.                                         |
| `scrollUp` | `(duration = 1000)`                                           | Scroll to the top of the page over `duration` ms.                                                                                |
| `wait`     | `(time = 1000)`                                               | Wait `time` ms. Awaitable.                                                                                                       |
| `waitFor`  | `(selector, {timeout: 2000, interval: 100, scope: document})` | Wait `timeout` ms for an element in `scope` matching `selector` to appear. `const element = await waitFor('.uncertain-element')` |

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

### Directives

The following directives are included in the boilerplate.

Basic usage: `<div v-intersect>...</div>`

#### `v-intersect`

Add the `intersected` class on any item in view.

```html
<!-- `intersected` class added when in view, removed when not in view -->
<div v-intersect>...</div>

<!-- `intersected` class added permanently on first time in view -->
<div v-intersect.once>...</div>

<!-- custom event handler - receives args (entries, observer, isIntersecting) -->
<div v-intersect="{ handler: myCustomMethod }">...</div>
```

#### `v-reverse-hover`

Add reverse-hover classes.

```html
<!-- if any <a> tag is hovered/focused, the <ul> will receive the class `rh-active-within` and the target <a> will receive the class `rh-active` -->
<ul v-reverse-hover>
    <li><a href="#one">One</a></li>
    <li><a href="#two">Two</a></li>
</ul>

<!-- same as above, just with <button>s instead of <a>s -->
<ul v-reverse-hover="{ selectors: 'button' }">
    <li><button>One</button></li>
    <li><button>Two</button></li>
</ul>
```

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

## Forms

See our [prismic-form](https://github.com/fuzzco/prismic-form) library for a solution to building forms in Prismic.

## Deployment

### Netlify

To set up a static site with Netlify, [connect your repo to Netlify](https://docs.netlify.com/configure-builds/repo-permissions-linking/) and set the deploy settings to:

```
Build command           npm run generate
Publish directory       dist
```

and the environment variables to:

```
PRISMIC_REPO_NAME       (your Prismic repo name)
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
PRISMIC_REPO_NAME       (your Prismic repo name)
```
