// assumes we're on a path element and sets its total length as a CSS var
// example:
// <path v-path-length d="<M0,0 H10"/>
// /* will have: */ --path-length: 10px
export default {
    inserted(el) {
        el.style.setProperty('--path-length', `${el.getTotalLength()}px`)
        console.log(el.getTotalLength())
    }
}