import { h } from 'hyperapp'
import Page from '../components/Page'
import EditableImage from '../components/EditableImage'
import TestImg from '../testImg.png'
import TestImg2 from '../testImg2.png'
import EditSettings from './EditSettings'

export default (state, actions) => {
    return (
        Page({
            title: 'Editing Challenge',
            children: [
                EditableImage({
                    height: 400,
                    src: TestImg,
                    editParameters: state.editParameters,
                    setCallbackForParamChange: (f) => {actions.addCallbackForParamChange(f)}
                }),
                EditableImage({
                    height: 400,
                    src: TestImg2,
                    editParameters: state.editParameters,
                    setCallbackForParamChange: (f) => {actions.addCallbackForParamChange(f)}
                }),
                EditSettings(state, actions)
            ]
        })
    )
}
