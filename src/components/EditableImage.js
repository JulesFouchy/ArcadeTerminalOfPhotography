import { h } from 'hyperapp'

export default (props) =>
    h('div', {
        oncreate: () => {
            // Create a P5 canvas
            new p5( p => {
                let img
                p.preload = () => {
                    img = p.loadImage(props.src)
                }
                p.setup = () => {
                    const ratio = img.width / img.height
                    p.createCanvas(props.height * ratio, props.height);
                }
                p.draw = () => {
                    p.image(img, 0, 0, p.width, p.height)
                }
            })
            //
        }
    })