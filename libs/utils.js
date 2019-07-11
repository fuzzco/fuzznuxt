import { easing, styler, tween } from 'popmotion'
const { cubicBezier } = easing

export const lerp = (a, b, alpha) => {
    return (1 - alpha) * a + alpha * b
}

export const wait = (time = 1000) => new Promise(res => setTimeout(res, time))

export const bezier = (p0, p1, p2, p3) => cubicBezier(p0, p1, p2, p3)

export const scrollUp = (duration = 1000) => {
    const win = styler(window)
    tween({
        from: win.get('scrollTop'),
        to: 0,
        duration
    }).start(win.set('scrollTop'))
}

export const scrollTo = (el, duration = 1000, offset = 0) => {
    if (!el) return

    const win = styler(window)
    return new Promise(res => {
        tween({
            from: win.get('scrollTop'),
            to: el ? el.offsetTop + offset : win.get('scrollTop'), // 82 = header height
            duration
        }).start({ update: win.set('scrollTop'), complete: res })
    })
}
