import { h } from 'hyperapp'
import VertexSource from '../myShader.vert'
import FragmentSource from '../pixelate.frag'

export default (props) =>
    h('div', {
        oncreate: () => {
            // Create a P5 canvas
            new p5( p => {
                let img
                const shader = new p5.Shader(p._renderer, VertexSource, FragmentSource)
                p.setImg = (p5Instance) => {
                    const size = 0.05 * p5Instance.height
                    img = p5Instance.get(p5Instance.width/2, p5Instance.height/2, size, size)
                }
                p.setup = () => {
                    p.createCanvas(200, 200, p.WEBGL)
                    p.noLoop()
                }
                p.onEditedImageChanged = (p5Instance) => {
                    p.setImg(p5Instance)
                    p.shader(shader)
                    shader.setUniform('tex0', img)
                    p.rect(0, 0, 0, 0)
                }
                props.setCallbackForEditedImageChanged(
                    (p5Instance) => p.onEditedImageChanged(p5Instance)
                )
            })
            //
        }
    })