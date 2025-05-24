import { render } from 'preact'
import { ContentApp } from './ContentApp'

const dom = document.createElement('div')
dom.className =
    'xuee:fixed xuee:inset-0 xuee:z-[99999] xuee:overflow-hidden xuee:pointer-events-none'

document.body.appendChild(dom)
render(<ContentApp />, dom)
