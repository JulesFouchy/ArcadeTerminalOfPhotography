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
                    p5editingImg: state.p5editingImg,
                    editParameters: state.editParameters,
                    withP5Instance: (p5instance) => actions.setEditingImgP5(p5instance),
                }),
                ZoomOnCanvas({
                    p5zoomOnImg: state.p5zoomOnImg,
                    p5editingImg: state.p5editingImg,
                    withP5Instance: (p5instance) => actions.setZoomOnImgP5(p5instance),
                }),
                EditSettings(state, actions)
            ]
        })
    )
}
