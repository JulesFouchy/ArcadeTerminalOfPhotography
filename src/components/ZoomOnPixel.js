import { h } from 'hyperapp'

const tryUpdate = (p5zoomOnImg, p5zoomOnPixel, pixX, pixY) => {
    if (p5zoomOnImg.bDrawingStarted) {
        p5zoomOnPixel.onEditedImageChanged(p5zoomOnImg, pixX, pixY)
    }
    else {
        setTimeout(() => tryUpdate(p5zoomOnImg, p5zoomOnPixel, pixX, pixY), 1000)
    }
}

export default (props) =>
    h('div', {
        oncreate: () => {
            const myP5 = new p5( p => {
                let col
                p.setCol = (p5Instance, pixX, pixY) => {
                    const nbPixels = 15
                    console.log('pixX, pixY')
                    console.log(pixX, pixY)
                    col = p5Instance.get(p5Instance.width * (pixX + 0.5) / nbPixels, p5Instance.height * (pixY + 0.5) / nbPixels)
                }
                p.setup = () => {
                    p.createCanvas(100, 100)
                    p.noLoop()
                }
                p.onEditedImageChanged = (p5Instance, pixX, pixY) => {
                    p.setCol(p5Instance, pixX, pixY)
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
            tryUpdate(props.p5zoomOnImg, props.p5zoomOnPixel, props.pixX, props.pixY)
        }
    })