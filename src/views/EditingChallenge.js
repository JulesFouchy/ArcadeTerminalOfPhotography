import { h } from 'hyperapp'
import Page from '../components/Page'
import EditableImage from '../components/EditableImage'
import ZoomOnCanvas from '../components/ZoomOnCanvas'
import ZoomOnPixel from '../components/ZoomOnPixel'
import TestImg from '../testImg.jpg'
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
                    setZoomOnImgPosition: (clic) => actions.setZoomOnImgPosition(clic)
                }),
                ZoomOnCanvas({
                    p5zoomOnImg: state.p5zoomOnImg,
                    p5editingImg: state.p5editingImg,
                    zoomPosX: state.zoomOnImgX,
                    zoomPosY: state.zoomOnImgY,
                    withP5Instance: (p5instance) => actions.setZoomOnImgP5(p5instance),
                }),
                ZoomOnPixel({
                    p5zoomOnPixel: state.p5zoomOnPixel,
                    p5zoomOnImg: state.p5zoomOnImg,
                    withP5Instance: (p5instance) => actions.setZoomOnPixelP5(p5instance),
                }),
                EditSettings(state, actions)
            ]
        })
    )
}
