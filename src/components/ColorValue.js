import { h } from 'hyperapp'

export default (channel, value) => h('div', {class: channel + ' colorValue'}, [
    h('p', {}, channel),
    h('p', {}, value),
])