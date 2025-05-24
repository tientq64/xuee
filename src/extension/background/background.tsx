import { render } from 'preact'
import { BackgroundApp } from './BackgroundApp'
import { sender } from './constants/sender'

const dom = document.getElementById('root')!
render(<BackgroundApp />, dom)

sender.mouseMove(100, 200, false)
