import linkResolver from '~/libs/prismic/linkResolver'
import PrismicDOM from 'prismic-dom'

export default value => {
    if (!value) return ''
    return PrismicDOM.RichText.asHtml(value, linkResolver) || ''
}
