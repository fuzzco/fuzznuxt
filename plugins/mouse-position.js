import { transform } from 'popmotion'
const { interpolate } = transform

export default store => {
    window.addEventListener('mousemove', evt => {
        const pos = {
            x: evt.clientX / window.innerWidth,
            y: evt.clientY / window.innerHeight
        }
        store.commit('browser/SET_RELATIVE_MOUSE_POS', pos)
    })
}
