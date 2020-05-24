
export default {
    startDragging: (dragTarget) => state => {
        document.getElementsByTagName("BODY")[0].classList.add('dragging')
        return {
            ...state,
            bDraggingValue: true,
            dragTarget: dragTarget
        }
    },
    stopDraggingValue: () => state => {
        document.getElementsByTagName("BODY")[0].classList.remove('dragging')
        return {
            ...state,
            bDraggingValue: false
        }
    },
    checkDragging: (delta) => state => {
        if (!state.bDraggingValue)
            return state
        else {
            const newParams = state.editParameters
            newParams[state.dragTarget] += delta * 0.003
            return {
                ...state,
                editParameters: newParams
            }
        }
    },
    setEditingImgP5: (p5instance) => state => {
        return {
            ...state,
            p5editingImg: p5instance
        }
    },
    setZoomOnImgP5: (p5instance) => state => {
        return {
            ...state,
            p5zoomOnImg: p5instance
        }
    },
    setZoomOnPixelP5: (p5instance) => state => {
        return {
            ...state,
            p5zoomOnPixel: p5instance
        }
    },
    setZoomOnImgPosition: (clic) => state => {
        const ratio = state.p5editingImg.width / state.p5editingImg.height
        const m = state.zoomOnImgHeightProportion / 2
        return {
            ...state,
            zoomOnImgX: Math.max(Math.min(clic.x, 1-m/ratio), m/ratio),
            zoomOnImgY: Math.max(Math.min(clic.y, 1-m), m),
        }
    },
    setPixel: (coords) => state => ({
        ...state,
        zoomOnPixX: coords.x,
        zoomOnPixY: coords.y,
    }),
    setDownloadFunction: (f) => state => ({
        ...state,
        downloadFunction: f,
    }),
    setPixelCol: (newCol) => state => ({
        ...state,
        pixelCol: newCol
    })
}
