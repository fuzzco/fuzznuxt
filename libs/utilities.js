import { easing } from 'popmotion'
const { cubicBezier } = easing

export const lerp = (a, b, alpha) => {
    return (1 - alpha) * a + alpha * b
}

export const wait = (time = 1000) => new Promise(res => setTimeout(res, time))

export const bezier = (p0, p1, p2, p3) => cubicBezier(p0, p1, p2, p3)
