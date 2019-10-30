import linkResolver from '~/libs/prismic/linkResolver'
import { RichText } from 'prismic-dom'

export default value => {
    if (!value) return ''
    return RichText.asHtml(value, linkResolver) || ''
}
