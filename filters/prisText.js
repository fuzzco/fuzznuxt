import linkResolver from '~/libs/prismic/linkResolver'
import { RichText } from 'prismic-dom'

export default value => {
    if (!value) return ''
    let text = ''
    try {
        text = RichText.asText(value, linkResolver).trim() || ''
    } catch (err) {
        console.log('Error getting title: ')
        console.log(value)
    }
    return text
}
