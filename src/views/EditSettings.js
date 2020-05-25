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

const tooltipText = (paramName) => {
    switch(paramName) {
        case 'luminosity':
            return 'The Luminosity affects the... luminosity of the image (or darkness when the luminosity is negative).'
        case 'contrast':
            return 'The Contrast describes how dark the dark areas are, and how bright the bright areas are.'
        case 'saturation':
            return `The Saturation is the "intensity" of the color. \n
                    For example, a saturation of -1 means no color at all, thus making the image Black&White.`
        case 'whiteBalance':
            return 'The Color Temperature refers to how yellowish or bluish an image is.'
        case 'tint':
            return 'The Tint is the level of red/violet in an image.'
        case 'rgbShift':
            return 'By creating 3 images (one with the red values of the pixels, one with green and one with blue) and offsetting them, we can achieve some trippy effects.'
    }
}

const createSliderBox = (target, state, actions) => 
    SliderBox({
        name: nameOfParam(target),
        tooltipText: tooltipText(target),
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
