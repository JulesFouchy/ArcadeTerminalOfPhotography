import { h } from 'hyperapp'
import EditingChallenge from './EditingChallenge'

export default (state, actions) =>
    h('div',
        {
            id: 'mainView',
            oncreate: () => {}
        },
        // ------------- SECTIONS --------------
        [
            EditingChallenge(state, actions)
        ]
    )
