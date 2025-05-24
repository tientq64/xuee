// @ts-ignore
import { esbuildPluginPreact } from '@davezuko/esbuild-plugin-preact'
import { tailwindPlugin } from 'esbuild-plugin-tailwindcss'
import { readFileSync } from 'fs'
import { createServer } from 'vite'
import { dependencies, devDependencies } from '../../package.json'
import { viteConfig } from '../constants/viteConfig'
import { minifyHtml } from '../helpers/minifyHtml'
import { watchBuild } from '../helpers/watchBuild'
import { watchGlob } from '../helpers/watchGlob'
import { copyFileSync } from '../utils/copyFileSync'
import { outputFileSync } from '../utils/outputFileSync'
import { watchFuncsFiles } from './watchFuncsFiles'

const appDataPath: string | undefined = process.env.APPDATA
if (appDataPath === undefined) {
    throw Error('Không có thư mục %APPDATA%.')
}

watchGlob(['src/extension/manifest.ts', 'package.json'], null, async () => {
    const now: number = Date.now()
    const manifestPath: string = `@extension/manifest?${now}`
    const { manifest } = await import(manifestPath)
    const json: string = JSON.stringify(manifest)
    outputFileSync('dist-extension/manifest.json', json)
})

watchBuild({
    entryPoints: [
        'src/extension/background/background.tsx',
        'src/extension/background/background.css'
    ],
    outdir: 'dist-extension',
    plugins: [esbuildPluginPreact(), tailwindPlugin()]
})
const html: string = readFileSync('src/extension/background/background.html', 'utf8')
const minHtml: string = minifyHtml(html)
outputFileSync('dist-extension/background.html', minHtml)

watchBuild({
    entryPoints: ['src/extension/content/loader.ts'],
    outfile: 'dist-extension/loader.js'
})
const contentBuilder = await watchBuild({
    entryPoints: ['src/extension/content/content.tsx', 'src/extension/content/content.css'],
    outdir: 'dist-extension',
    plugins: [esbuildPluginPreact(), tailwindPlugin()]
})
watchGlob('src/extension/content/styles/*.css', null, () => {
    contentBuilder.rebuild()
})

copyFileSync('public/assets/images/icons/icon-128.png', 'dist-extension/icon-128.png')

watchFuncsFiles()

watchGlob('src/system/command/run.vbs', 'change', (path) => {
    copyFileSync(path, 'run.vbs')
})
watchBuild({
    entryPoints: ['src/system/command/setup.ts', 'src/system/command/run.ts'],
    outdir: '.',
    platform: 'node',
    bundle: true,
    format: 'esm',
    external: [...Object.keys(dependencies), ...Object.keys(devDependencies)]
})

const server = await createServer(viteConfig)
await server.listen()
server.printUrls()
server.bindCLIShortcuts({ print: true })
