import { h } from 'hyperapp'
import EditingChallenge from './EditingChallenge'

const check = (state, actions, delta) => {
    if (state.bDraggingValue && delta !== 0)
        actions.updateDragging(delta)
}

export default (state, actions) =>
    h('div',
        {
            id: 'mainView',
            oncreate: () => {
                window.onmouseup = () => actions.stopDraggingValue()
            },
            onmousemove: (e) => check(state, actions, e.movementX)
        },
        // ------------- SECTIONS --------------
        [
            EditingChallenge(state, actions)
        ]
    )
