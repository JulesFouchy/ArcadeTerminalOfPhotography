import { h } from 'hyperapp'
import VertexSource from '../myShader.vert'
import FragmentSource from '../myShader.frag'

export default (props) =>
    h('div', {
        oncreate: () => {
            // Create a P5 canvas
            const myP5 = new p5( p => {
                p.bDragging = false
                let img
                let pg
                const shader = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                p.getPG = () => pg
                p.preload = () => {
                    img = p.loadImage(props.src)
                }
                p.setup = () => {
                    const ratio = img.width / img.height
                    p.createCanvas(props.height * ratio, props.height, p.WEBGL)
                    pg = p.createGraphics(img.width, img.height, p.WEBGL)
                    p.onParametersChanged(props.editParameters, props.zoom)
                    p.noLoop()
                }
                p.mousePressed = () => {
                    const o = {
                        x: p.mouseX/p.width,
                        y: p.mouseY/p.height
                    }
                    if (o.x > 0 && o.x < 1 && o.y > 0 && o.y < 1)
                        props.setZoomOnImgPosition(o)
                }
                p.mouseDragged = () => {
                    const o = {
                        x: p.mouseX/p.width,
                        y: p.mouseY/p.height
                    }
                    if (o.x > 0 && o.x < 1 && o.y > 0 && o.y < 1)
                        props.setZoomOnImgPosition(o)
                }
                p.trySetZoomPos = () => {
                    const o = {
                        x: p.mouseX/p.width,
                        y: p.mouseY/p.height
                    }
                    if (o.x > 0 && o.x < 1 && o.y > 0 && o.y < 1) {
                        props.setZoomOnImgPosition(o)
                        return true
                    }
                    return false
                }
                p.mousePressed = () => {
                    if (p.trySetZoomPos())
                        p.bDragging = true
                }
                p.mouseReleased = () => {
                    p.bDragging = false
                }
                p.mouseDragged = () => {
                    if (p.bDragging)
                        p.trySetZoomPos()
                }
                p.download = () => {
                    pg.save('myImage.jpg')
                }
                p.onParametersChanged = (editParameters, zoom) => {
                    pg.shader(shader)
                    shader.setUniform('tex0', img)
                    shader.setUniform('u_luminosity',   editParameters.luminosity)
                    shader.setUniform('u_contrast',     editParameters.contrast)
                    shader.setUniform('u_saturation',   editParameters.saturation)
                    shader.setUniform('u_whiteBalance', editParameters.whiteBalance)
                    shader.setUniform('u_tint',         editParameters.tint)
                    //shader.setUniform('u_rgbShift', editParameters.rgbShift)
                    pg.rect(0, 0, 0, 0)
                    p.image(pg, -p.width/2, -p.height/2, p.width, p.height)
                    // Frame of zoom
                    p.fill(255, 0, 0)
                    p.noStroke()
                    const weight = 2
                    const w = p.width
                    const h = p.height
                    const s = p.height * zoom.sizeProp
                    const x = (zoom.x-0.5) * p.width
                    const y = (zoom.y-0.5) * p.height
                    p.rect(x-s/2, y-s/2-weight, s, weight)
                    p.rect(x-s/2, y+s/2, s, weight)
                    p.rect(x-s/2-weight, y-s/2-weight, weight, s + 2*weight)
                    p.rect(x+s/2, y-s/2-weight, weight, s + 2*weight)
                }
            })
            props.withP5Instance(myP5)
            //
        },
        onupdate: () => {
            props.p5editingImg.onParametersChanged(props.editParameters, props.zoom)
        }
    })
