import { h } from 'hyperapp'

const tryUpdate = (p5zoomOnImg, p5zoomOnPixel) => {
    if (p5zoomOnImg.bDrawingStarted) {
        p5zoomOnPixel.onEditedImageChanged(p5zoomOnImg)
    }
    else {
        setTimeout(() => tryUpdate(p5zoomOnImg, p5zoomOnPixel), 1000)
    }
}

export default (props) =>
    h('div', {
        oncreate: () => {
            const myP5 = new p5( p => {
                let col
                p.setCol = (p5Instance) => {
                    col = p5Instance.get(p5Instance.width/2, p5Instance.height/2)
                }
                p.setup = () => {
                    p.createCanvas(100, 100)
                    p.noLoop()
                }
                p.onEditedImageChanged = (p5Instance) => {
                    p.setCol(p5Instance)
                    const w = p.width / 3
                    p.fill(p.red(col), 0, 0)
                    p.rect(0,   0, w, p.height)
                    p.fill(0, p.green(col), 0)
                    p.rect(w,   0, w, p.height)
                    p.fill(0, 0, p.blue(col))
                    p.rect(2*w, 0, w, p.height)
                }
            })
            props.withP5Instance(myP5)
            //
        },
        onupdate: () => {
            tryUpdate(props.p5zoomOnImg, props.p5zoomOnPixel)
        }
    })