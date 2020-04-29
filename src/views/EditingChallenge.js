import { h } from 'hyperapp'
import Page from '../components/Page'
import EditableImage from '../components/EditableImage'
import ZoomOnCanvas from '../components/ZoomOnCanvas'
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
                    setCallbackForParamChange: (f) => actions.addCallbackForParamChange(f),
                    withP5Instance: (p5instance) => actions.setEditingImgP5(p5instance)
                }),
                ZoomOnCanvas({
                    setCallbackForEditedImageChanged: (f) => actions.addCallbackForEditedImgChange(f)
                }),
                EditSettings(state, actions)
            ]
        })
    )
}
