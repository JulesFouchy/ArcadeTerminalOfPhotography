import { h } from 'hyperapp'
import SliderBox from '../components/SliderBox'

const createSliderBox = (target, state, actions) => 
    SliderBox({
        name: target.toUpperCase(),
        value: state.editParameters[target],
        onDragStart: () => actions.startDragging(target)
    })


export default (state, actions) =>
    h('div', {id: 'editSettings'}, [
        createSliderBox('luminosity', state, actions),
        createSliderBox('contrast', state, actions),
        createSliderBox('saturation', state, actions),
        createSliderBox('whiteBalance', state, actions),
        createSliderBox('tint', state, actions),
        createSliderBox('rgbShift', state, actions),
    ])
