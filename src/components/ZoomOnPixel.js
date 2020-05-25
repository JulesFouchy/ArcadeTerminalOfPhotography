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
                p.col = {r: 0, g: 0, b: 0}
                p.setCol = (p5Instance, pixX, pixY) => {
                    const nbPixels = 15
                    const colP5 = p5Instance.get(p5Instance.width * (pixX + 0.5) / nbPixels, p5Instance.height * (1 - (pixY + 0.5) / nbPixels))
                    p.col.r = p.red(colP5)
                    p.col.g = p.green(colP5)
                    p.col.b = p.blue(colP5)
                    props.onZoomedPixelChange(p.col)
                }
                p.setup = () => {
                    p.createCanvas(146, 146)
                    p.noLoop()
                }
                p.onEditedImageChanged = (p5Instance, pixX, pixY) => {
                    p.setCol(p5Instance, pixX, pixY)
                    const w = p.width / 3
                    p.fill(p.col.r, 0, 0)
                    p.rect(0,   0, w, p.height)
                    p.fill(0, p.col.g, 0)
                    p.rect(w,   0, w, p.height)
                    p.fill(0, 0, p.col.b)
                    p.rect(2*w, 0, w, p.height)
                }
            }, props.canvasContainerId)
            props.withP5Instance(myP5)
            //
        },
        onupdate: () => {
            tryUpdate(props.p5zoomOnImg, props.p5zoomOnPixel, props.pixX, props.pixY)
        }
    })