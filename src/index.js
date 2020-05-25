import { app } from 'hyperapp'
import { withLogger } from '@hyperapp/logger'

import state from './state/index'
import view from './views/MainView.js'
import actions from './actions'

import './main.scss'

// withLogger({
//     log(prevState, action, nextState) {
//       if (action.name != 'checkDragging') {
//             console.group("%c action", "color: gray; font-weight: lighter;", action.name)
//             //console.log("%c prev state", "color: #9E9E9E; font-weight: bold;", prevState)
//             console.log("%c data", "color: #03A9F4; font-weight: bold;", action.data)
//             console.log("%c next state", "color: #4CAF50; font-weight: bold;", nextState)
//             console.groupEnd()
//       }
//     }
//   })
(app)(
    state,
    actions,
    view,
    document.body
)
