import { h } from 'hyperapp'
import Page from '../components/Page'
import EditableImage from '../components/EditableImage'
import TestImg from '../testImg.png'
import TestImg2 from '../testImg2.png'

export default (state, actions) => {
    return (
        Page({
            title: 'Editing Challenge',
            children: [
                EditableImage({
                    height: 400,
                    src: TestImg
                }),
                EditableImage({
                    height: 400,
                    src: TestImg2
                }),
            ]
        })
    )
}
