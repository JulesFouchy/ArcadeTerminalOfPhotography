import { h } from 'hyperapp'
import NeonBox from './NeonBox'

export default (props) =>
    NeonBox({children: [
        h('div', {
            class: 'sliderBox',
        }, [
            h('p', {}, props.name),
            h('p', {
                class: 'draggableValue',
                onselectstart: e => {
                    e.preventDefault()
                    props.onDragStart()
                },
            }, 
                props.value.toFixed(2)
            ),
        ])
    ]})