import { h } from 'hyperapp'
import NeonBox from './NeonBox'
import Highlight from './Highlight'

export default (props) =>
    NeonBox({children: [
        h('div', {class: 'infoDot'}, [
            'i',
            h('span', {class: 'tooltiptext ' + props.tooltipPos}, props.tooltipText)
        ]),
        h('div', {
            class: 'sliderBox',
        }, [
            Highlight(h('p', {}, props.name)),
            Highlight(h('p', {
                class: 'draggableValue',
                onselectstart: e => {
                    e.preventDefault()
                    props.onDragStart()
                },
            }, 
                props.value.toFixed(2)
            )),
        ])
    ]})