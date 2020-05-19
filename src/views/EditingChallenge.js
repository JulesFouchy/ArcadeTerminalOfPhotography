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
                    zoom: {
                        x: state.zoomOnImgX,
                        y: state.zoomOnImgY,
                        sizeProp: state.zoomOnImgHeightProportion,
                    },
                    withP5Instance: (p5instance) => actions.setEditingImgP5(p5instance),
                    setZoomOnImgPosition: (clic) => actions.setZoomOnImgPosition(clic)
                }),
                ZoomOnCanvas({
                    p5zoomOnImg: state.p5zoomOnImg,
                    p5editingImg: state.p5editingImg,
                    zoomPosX: state.zoomOnImgX,
                    zoomPosY: state.zoomOnImgY,
                    zoomOnImgHeightProportion: state.zoomOnImgHeightProportion,
                    pixX: state.zoomOnPixX,
                    pixY: state.zoomOnPixY,
                    withP5Instance: (p5instance) => actions.setZoomOnImgP5(p5instance),
                    setPixel: (coords) => actions.setPixel(coords)
                }),
                ZoomOnPixel({
                    p5zoomOnPixel: state.p5zoomOnPixel,
                    p5zoomOnImg: state.p5zoomOnImg,
                    pixX: state.zoomOnPixX,
                    pixY: state.zoomOnPixY,
                    withP5Instance: (p5instance) => actions.setZoomOnPixelP5(p5instance),
                }),
                EditSettings(state, actions)
            ]
        })
    )
}
