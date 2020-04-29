import { h } from 'hyperapp'

export default (props) =>
    h('div', {class: 'neonBox'}, props.children)