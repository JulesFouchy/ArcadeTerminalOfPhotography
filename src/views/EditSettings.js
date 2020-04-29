import { h } from 'hyperapp'
import SliderBox from '../components/SliderBox'

const createSliderBox = (target, state, actions) => 
    SliderBox({
        name: target,
        value: state.editParameters[target],
        onDragStart: () => actions.startDragging(target)
    })


export default (state, actions) =>
    h('div', {id: 'editSettings'}, [
            createSliderBox('contrast', state, actions),
            createSliderBox('luminosity', state, actions),
            createSliderBox('saturation', state, actions),
            createSliderBox('whiteBalance', state, actions),
        ]
    )
