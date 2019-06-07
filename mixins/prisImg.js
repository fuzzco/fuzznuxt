// transform ACF image object into props for super-image
export default {
    methods: {
        prisImg(imgData, size = 'large') {
            // handle video
            if (imgData && imgData.url && imgData.url.includes('.mp4')) {
                return {
                    videoSrc: imgData.url
                }
            }

            // handle image
            return {
                src: _get(imgData, `url`),
                height: _get(imgData, `dimensions.height]`),
                width: _get(imgData, `dimensions.width]`),
                alt: _get(imgData, 'alt')
            }
        }
    }
}
