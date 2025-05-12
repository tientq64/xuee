const style = document.createElement('link')
style.rel = 'stylesheet'
style.href = chrome.runtime.getURL('content.css')
document.head.appendChild(style)

const script = document.createElement('script')
script.src = chrome.runtime.getURL('content.js')
document.body.appendChild(script)
