import { h } from 'hyperapp'
import EditingChallenge from './EditingChallenge'

export default (state, actions) =>
    h('div',
        {
            id: 'mainView',
            oncreate: () => {
                window.onmouseup = () => actions.stopDraggingValue()
                window.onmousemove = (e) => actions.checkDragging(e.movementX)
            }
        },
        // ------------- SECTIONS --------------
        [
            EditingChallenge(state, actions)
        ]
    )
