import { extname } from 'path'
import { Plugin } from 'vite'
import { minifyHtml } from '../helpers/minifyHtml'

export function vitePluginMinify(): Plugin {
    return {
        name: 'vite-plugin-minify',
        apply: 'build',

        generateBundle: (options, bundle) => {
            const distDir: string | undefined = options.dir
            if (distDir === undefined) return

            for (const filePath in bundle) {
                const output = bundle[filePath]
                if (output.type !== 'asset') continue

                if (extname(filePath) === '.webmanifest') {
                    const json: string = output.source.toString()
                    const minJson: string = JSON.stringify(JSON.parse(json))
                    output.source = minJson
                }
            }
        },

        transformIndexHtml: (html) => {
            return minifyHtml(html)
        }
    }
}
