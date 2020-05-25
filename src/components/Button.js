import { h } from 'hyperapp'

export default (props) =>
    h('div', {class: 'myButton', onclick: props.onclick}, props.children)