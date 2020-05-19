import { h } from 'hyperapp'
import VertexSource from '../myShader.vert'
import FragmentSource from '../pixelate.frag'

const tryUpdate = (p5editingImg, p5zoomOnImg, zoomPosX, zoomPosY, pixX, pixY) => {
    if (p5editingImg._setupDone && p5zoomOnImg._setupDone) {
        p5zoomOnImg.onEditedImageChanged(p5editingImg, zoomPosX, zoomPosY, pixX, pixY)
    }
    else {
        setTimeout(() => tryUpdate(p5editingImg, p5zoomOnImg, zoomPosX, zoomPosY, pixX, pixY), 1000)
    }
}

export default (props) =>
    h('div', {
        oncreate: () => {
            // Create a P5 canvas
            const myP5 = new p5( p => {
                p.bDragging = false
                let img
                let pg
                const shader = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                p.setImg = (p5Instance, zoomPosX, zoomPosY) => {
                    const size = props.zoomOnImgHeightProportion * p5Instance.height
                    img = p5Instance.getPG().get(zoomPosX * p5Instance.width - size/2, zoomPosY * p5Instance.height - size/2, size, size)
                }
                p.setup = () => {
                    p.createCanvas(200, 200, p.WEBGL)
                    pg = p.createGraphics(200, 200, p.WEBGL)
                    p.noLoop()
                }
                p.trySetPixel = () => {
                    const o = {
                        x: p.mouseX/p.width,
                        y: p.mouseY/p.height
                    }
                    if (o.x > 0 && o.x < 1 && o.y > 0 && o.y < 1) {
                        props.setPixel({
                            x: Math.floor(o.x * 15),
                            y: Math.floor(o.y * 15),
                        })
                        return true
                    }
                    return false
                }
                p.mousePressed = () => {
                    if (p.trySetPixel())
                        p.bDragging = true
                }
                p.mouseReleased = () => {
                    p.bDragging = false
                }
                p.mouseDragged = () => {
                    if (p.bDragging) {
                        const o = {
                            x: p.mouseX/p.width,
                            y: p.mouseY/p.height
                        }
                        props.setPixel({
                            x: Math.min(Math.max(Math.floor(o.x * 15), 0), 14),
                            y: Math.min(Math.max(Math.floor(o.y * 15), 0), 14),
                        })
                    }
                }
                p.onEditedImageChanged = (p5Instance, zoomPosX, zoomPosY, pixX, pixY) => {
                    p.bDrawingStarted = true
                    p.setImg(p5Instance, zoomPosX, zoomPosY)
                    pg.shader(shader)
                    shader.setUniform('tex0', img)
                    pg.rect(0, 0, 0, 0)
                    p.image(pg, -p.width/2, -p.height/2, p.width, p.height)
                    // Frame of zoom
                    p.fill(255, 0, 0)
                    p.noStroke()
                    const weight = 2
                    const w = p.width
                    const h = p.height
                    const s = p.height / 15
                    const x = ((pixX+0.5) / 15 -0.5) * p.width
                    const y = ((pixY+0.5) / 15 -0.5) * p.height
                    // top
                    p.rect(x-s/2, y-s/2, s, weight)
                    // left
                    p.rect(x-s/2, y-s/2, weight, s)
                    // right
                    p.rect(x+s/2-weight, y-s/2, weight, s)
                    // bot
                    p.rect(x-s/2, y+s/2-weight, s, weight)
                }
            })
            props.withP5Instance(myP5)
            //
        },
        onupdate: () => {
            tryUpdate(props.p5editingImg, props.p5zoomOnImg, props.zoomPosX, props.zoomPosY, props.pixX, props.pixY)
        }
    })