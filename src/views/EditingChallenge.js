import { h } from 'hyperapp'
import Page from '../components/Page'
import EditableImage from '../components/EditableImage'
import ZoomOnCanvas from '../components/ZoomOnCanvas'
import ZoomOnPixel from '../components/ZoomOnPixel'
import BaseImg from '../baseImg.jpg'
import TargetImg from '../targetImg.jpg'
import EditSettings from './EditSettings'
import ColorValue from '../components/ColorValue'

export default (state, actions) => {
    return (
        Page({
            title: h('span', {}, [
                h('span', {class: 'whiteText'}, 'EDITING'),
                ' CHALLENGE',
            ]),
            children: [
                h('div', {id: 'canvasesContainer'},
                    h('div', {id: 'canvasesRight'}, [
                        h('div', {id: 'canvasesRightTop'},
                            h('div', {id: 'canvasesRightTopRight'},
                                h('div', {id: 'pixelValues'}, [
                                    ColorValue('R', state.pixelCol.r),
                                    ColorValue('G', state.pixelCol.g),
                                    ColorValue('B', state.pixelCol.b),
                                ]),
                            ),
                        ),
                        h('div', {id: 'canvasesRightBot'},
                            h('img', {src: TargetImg, height: state.imgHeight*0.55})
                        )
                    ])
                ),
                EditableImage({
                    scale: state.scale,
                    canvasContainerId: 'canvasesContainer',
                    height: state.imgHeight,
                    src: BaseImg,
                    p5editingImg: state.p5editingImg,
                    editParameters: state.editParameters,
                    zoom: {
                        x: state.zoomOnImgX,
                        y: state.zoomOnImgY,
                        sizeProp: state.zoomOnImgHeightProportion,
                    },
                    withP5Instance: (p5instance) => {
                        actions.setEditingImgP5(p5instance)
                        actions.setDownloadFunction(p5instance.download)
                    },
                    setZoomOnImgPosition: (clic) => actions.setZoomOnImgPosition(clic)
                }),
                ZoomOnCanvas({
                    scale: state.scale,
                    canvasContainerId: 'canvasesRightTop',
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
                    canvasContainerId: 'canvasesRightTopRight',
                    p5zoomOnPixel: state.p5zoomOnPixel,
                    p5zoomOnImg: state.p5zoomOnImg,
                    pixX: state.zoomOnPixX,
                    pixY: state.zoomOnPixY,
                    onZoomedPixelChange: (newCol) => actions.setPixelCol(newCol),
                    withP5Instance: (p5instance) => actions.setZoomOnPixelP5(p5instance),
                }),
                EditSettings(state, actions),
                h('button', {
                    onclick: state.downloadFunction
                }, 'Download')
            ]
        })
    )
}
