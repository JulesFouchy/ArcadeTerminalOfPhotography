
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
            state.onParamChangeList.forEach( f => f(newParams))
            state.onEditImgChangeList.forEach( f => f(state.editingImgP5))
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
        //state.onEditImgChangeList.forEach( f => f(p5instance))
        return {
            ...state,
            editingImgP5: p5instance
        }
    },
}
