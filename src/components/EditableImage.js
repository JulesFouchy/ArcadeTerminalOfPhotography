import { h } from 'hyperapp'
import VertexSource from '../myShader.vert'
import FragmentSource from '../myShader.frag'

export default (props) =>
    h('div', {
        oncreate: () => {
            // Create a P5 canvas
            new p5( p => {
                let img
                const shader = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                p.preload = () => {
                    img = p.loadImage(props.src)
                }
                p.setup = () => {
                    const ratio = img.width / img.height
                    p.createCanvas(props.height * ratio, props.height, p.WEBGL)
                    p.onParametersChanged(props.editParameters)
                    p.noLoop()
                }
                p.onParametersChanged = (editParameters) => {
                    p.shader(shader)
                    shader.setUniform('tex0', img)
                    shader.setUniform('u_saturation', editParameters.saturation)
                    shader.setUniform('u_contrast',   editParameters.contrast)
                    shader.setUniform('u_luminosity', editParameters.luminosity)
                    p.rect(0, 0, 0, 0)
                }
                props.setCallbackForParamChange(
                    (params) => p.onParametersChanged(params)
                )
            })
            //
        }
    })