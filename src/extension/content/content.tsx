import { render } from 'preact'
import { ContentApp } from './ContentApp'

const dom = document.createElement('div')
dom.className = 'fixed inset-0 z-[99999] overflow-hidden pointer-events-none'

document.body.appendChild(dom)
render(<ContentApp />, dom)
