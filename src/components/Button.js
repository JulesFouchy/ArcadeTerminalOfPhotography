import { h } from 'hyperapp'

export default (props) =>
    h('div', {class: 'myButton ' + props.color || '', onclick: props.onclick}, props.children)