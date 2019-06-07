export default img => {
    if (!img || !img.dimensions) return false
    return {
        sizes: {
            fullscreen: {
                url: img.url,
                height: img.dimensions.height,
                width: img.dimensions.width
            }
        },
        content: img.alt,
        alt: img.alt
    }
}
