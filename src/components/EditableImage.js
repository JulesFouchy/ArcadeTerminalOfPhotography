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
                let pgExport
                const shader = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                const shader2 = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                p.getPG = () => pg
                p.preload = () => {
                    img = p.loadImage(props.src)
                }
                p.setup = () => {
                    const ratio = img.width / img.height
                    p.createCanvas(props.height * ratio, props.height, p.WEBGL)
                    pg = p.createGraphics(props.height * ratio, props.height, p.WEBGL)
                    pgExport = p.createGraphics(img.width, img.height, p.WEBGL)
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
                    const o = {
                        x: p.mouseX/p.width,
                        y: p.mouseY/p.height
                    }
                    if (o.x > 0 && o.x < 1 && o.y > 0 && o.y < 1) {
                        p.bDragging = true
                        props.setZoomOnImgPosition(o)
                    }
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
                        props.setZoomOnImgPosition(o)
                    }
                }
                p.renderOnPg = (thepg, theshader, editParameters) => {
                    thepg.shader(theshader)
                    theshader.setUniform('tex0', img)
                    theshader.setUniform('u_luminosity',   editParameters.luminosity)
                    theshader.setUniform('u_contrast',     editParameters.contrast)
                    theshader.setUniform('u_saturation',   editParameters.saturation)
                    theshader.setUniform('u_whiteBalance', editParameters.whiteBalance)
                    theshader.setUniform('u_tint',         editParameters.tint)
                    //theshader.setUniform('u_rgbShift', editParameters.rgbShift)
                    thepg.rect(0, 0, 0, 0)
                }
                p.onParametersChanged = (editParameters, zoom) => {
                    p.lastEditParameters = editParameters
                    p.renderOnPg(pg, shader, editParameters)
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
                    // top
                    p.rect(x-s/2, y-s/2, s, weight)
                    // left
                    p.rect(x-s/2, y-s/2, weight, s)
                    // right
                    p.rect(x+s/2-weight, y-s/2, weight, s)
                    // bot
                    p.rect(x-s/2, y+s/2-weight, s, weight)
                }
                p.download = () => {
                    p.renderOnPg(pgExport, shader2, p.lastEditParameters)
                    pgExport.save('myImage.jpg')
                }
            })
            props.withP5Instance(myP5)
            //
        },
        onupdate: () => {
            props.p5editingImg.onParametersChanged(props.editParameters, props.zoom)
        }
    })
