import { h } from 'hyperapp'
import Box from './NeonBox'

export default (props) =>
    h('div', {}, [
        Box({children: [
            h('h3', {class: 'pageTitle'}, props.title),
        ]}),
        ...props.children
    ])