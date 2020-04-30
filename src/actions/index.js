
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
            //state.onParamChangeList.forEach( f => f(newParams))
            //state.onEditImgChangeList.forEach( f => f(state.p5editingImg))
            return {
                ...state,
                editParameters: newParams
            }
        }
    },
    addCallbackForParamChange: (f) => state => ({
        ...state,
        onParamChangeList: [...state.onParamChangeList, f]
    }),
    addCallbackForEditedImgChange: (f) => state => ({
        ...state,
        onEditImgChangeList: [...state.onEditImgChangeList, f]
    }),
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
}
