import linkResolver from '~/libs/prismic/linkResolver'
import prismicDOM from 'prismic-dom'

const Elements = prismicDOM.RichText.Elements

export default function(type, element, content, children) {
    // Generate links to Prismic Documents as <nuxt-link> components
    // Present by default, it is recommended to keep this
    if (type === Elements.hyperlink) {
        let result = ''
        let url = prismicDOM.Link.url(element.data, linkResolver)

        if (element.data.link_type === 'Document') {
            result = `<a href="${url}" data-nuxt-link>${content}</a>`
        } else {
            // prep attributes
            const attributes = []

            // set target
            const target = element.data.target
                ? `target="'${element.data.target}'" rel="noopener"`
                : ''

            // if a relative, hash, or query string (/, #, ?),
            // remove initial https
            if (url.match(/^https?:\/\/[\/#?]/)) {
                url = element.data.url.replace(/^https?:\/\//, '')
                attributes.push('data-nuxt-link')
            }

            // set output html
            result = `<a href="${url}" ${target} ${attributes.join(
                ' '
            )}>${content}</a>`
        }
        return result
    }

    // If the image is also a link to a Prismic Document, it will return a <router-link> component
    // Present by default, it is recommended to keep this
    if (type === Elements.image) {
        let result = `<img src="${element.url}" alt="${element.alt ||
            ''}" copyright="${element.copyright || ''}">`

        if (element.linkTo) {
            const url = prismicDOM.Link.url(element.linkTo, linkResolver)

            if (element.linkTo.link_type === 'Document') {
                result = `<nuxt-link to="${url}">${result}</nuxt-link>`
            } else {
                const target = element.linkTo.target
                    ? `target="${element.linkTo.target}" rel="noopener"`
                    : ''
                result = `<a href="${url}" ${target}>${result}</a>`
            }
        }
        const wrapperClassList = [element.label || '', 'block-img']
        result = `<p class="${wrapperClassList.join(' ')}">${result}</p>`
        return result
    }

    // Return null to stick with the default behavior for everything else
    return null
}
