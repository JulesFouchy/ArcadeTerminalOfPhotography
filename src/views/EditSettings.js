import { h } from 'hyperapp'
import SliderBox from '../components/SliderBox'

const nameOfParam = (param) => {
    const name = param.toUpperCase()
    if (name === 'RGBSHIFT')
        return 'RGB SHIFT'
    if (name === 'WHITEBALANCE')
        return 'TEMPERATURE'
    return name
}

const createSliderBox = (target, state, actions) => 
    SliderBox({
        name: nameOfParam(target),
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
