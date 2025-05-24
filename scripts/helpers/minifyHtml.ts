import minifyHtmlNode from '@minify-html/node'

export function minifyHtml(html: string): string {
    const htmlBuf: Buffer = Buffer.from(html)
    const minHtmlBuf: Buffer = minifyHtmlNode.minify(htmlBuf, {})

    return minHtmlBuf.toString()
}
