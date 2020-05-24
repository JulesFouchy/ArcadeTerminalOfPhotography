import { h } from 'hyperapp'

export default (channel, value) => h('div', {}, [
    h('p', {}, channel),
    h('p', {}, value),
])