import { app } from 'hyperapp'
import { withLogger } from '@hyperapp/logger'

import state from './state/index'
import view from './views/MainView.js'
import actions from './actions'

import './main.scss'

withLogger(app)(
    state,
    actions,
    view,
    document.body
)
