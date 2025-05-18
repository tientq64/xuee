const style = document.createElement('link')
style.rel = 'stylesheet'
style.href = chrome.runtime.getURL('content.css')
document.head.appendChild(style)

fetch(chrome.runtime.getURL('content.js'))
    .then((res) => res.text())
    .then(window.eval)
