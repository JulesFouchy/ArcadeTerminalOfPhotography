import { h } from 'hyperapp'
import VertexSource from '../myShader.vert'
import FragmentSource from '../pixelate.frag'

const tryUpdate = (p5editingImg, p5zoomOnImg, zoomPosX, zoomPosY) => {
    if (p5editingImg._setupDone && p5zoomOnImg._setupDone) {
        p5zoomOnImg.onEditedImageChanged(p5editingImg, zoomPosX, zoomPosY)
    }
    else {
        setTimeout(() => tryUpdate(p5editingImg, p5zoomOnImg, zoomPosX, zoomPosY), 1000)
    }
}

export default (props) =>
    h('div', {
        oncreate: () => {
            // Create a P5 canvas
            const myP5 = new p5( p => {
                let img
                const shader = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                p.setImg = (p5Instance, zoomPosX, zoomPosY) => {
                    const size = props.zoomOnImgHeightProportion * p5Instance.height
                    img = p5Instance.getPG().get(zoomPosX * p5Instance.width - size/2, zoomPosY * p5Instance.height - size/2, size, size)
                }
                p.setup = () => {
                    p.createCanvas(200, 200, p.WEBGL)
                    p.noLoop()
                }
                p.mousePressed = () => {
                    const o = {
                        x: p.mouseX/p.width,
                        y: p.mouseY/p.height
                    }
                    if (o.x > 0 && o.x < 1 && o.y > 0 && o.y < 1) {
                        
                    }
                }
                p.onEditedImageChanged = (p5Instance, zoomPosX, zoomPosY) => {
                    p.bDrawingStarted = true
                    p.setImg(p5Instance, zoomPosX, zoomPosY)
                    p.shader(shader)
                    shader.setUniform('tex0', img)
                    p.rect(0, 0, 0, 0)
                }
            })
            props.withP5Instance(myP5)
            //
        },
        onupdate: () => {
            tryUpdate(props.p5editingImg, props.p5zoomOnImg, props.zoomPosX, props.zoomPosY)
        }
    })