import get from 'lodash/get'

// transform ACF image object into props for super-image
export default {
    methods: {
        prisImg(imgData, size = 'large') {
            // handle video
            if (imgData && imgData.url && imgData.url.includes('.mp4')) {
                return {
                    videoSrc: imgData.url,
                }
            }

            // handle image
            return {
                src: get(imgData, `url`),
                height: get(imgData, `dimensions.height]`),
                width: get(imgData, `dimensions.width]`),
                alt: get(imgData, 'alt'),
            }
        },
    },
}
