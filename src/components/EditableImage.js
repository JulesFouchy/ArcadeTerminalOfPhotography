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
                    p.createCanvas(props.height * ratio, props.height, p.WEBGL);
                    p.shader(shader)
                    shader.setUniform('tex0', img)
                    shader.setUniform('u_saturation', props.editParameters.saturation)
                    shader.setUniform('u_contrast',   props.editParameters.contrast)
                    shader.setUniform('u_luminosity', props.editParameters.luminosity)
                    p.rect(0, 0, 0, 0)
                    p.noLoop()
                }
            })
            //
        }
    })