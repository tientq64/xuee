import { render } from 'preact'
import { WebApp } from './WebApp'

if (location.pathname === '/') {
    location.replace('/remote')
} else {
    const dom = document.getElementById('root')!
    render(<WebApp />, dom)
}
