
export default {
    startDragging: (dragTarget) => state => ({
        ...state,
        bDraggingValue: true,
        dragTarget: dragTarget
    }),
    stopDraggingValue: () => state => ({
        ...state,
        bDraggingValue: false
    }),
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
    }
}
