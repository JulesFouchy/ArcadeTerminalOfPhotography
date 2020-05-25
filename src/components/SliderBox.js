import { h } from 'hyperapp'
import NeonBox from './NeonBox'
import Highlight from './Highlight'

export default (props) =>
    NeonBox({children: [
        h('div', {class: 'infoDot'}, [
            'i',
            h('span', {class: 'tooltiptext'}, 'The Saturation is the "intensity" of the color.\nFor example, a saturation of -1 means no color at all, thus making the image Black&White.')
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