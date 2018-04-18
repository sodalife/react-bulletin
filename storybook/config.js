import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'

setOptions({
  name: 'Bulletin',
  downPanelInRight: true,
})

function loadStories() {
  require('./stories/index.js')
}

configure(loadStories, module)
