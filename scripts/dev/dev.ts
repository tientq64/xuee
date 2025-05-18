import { tailwindPlugin } from 'esbuild-plugin-tailwindcss'
import { copyFileSync, writeFileSync } from 'fs'
import { createServer } from 'vite'
import { viteConfig } from '../constants/viteConfig'
import { watchBuild } from '../helpers/watchBuild'
import { watchGlob } from '../helpers/watchGlob'
import { generateFuncsFiles } from './generateFuncsFiles'

watchGlob(['src/extension/manifest.ts', 'package.json'], null, async () => {
    const now: number = Date.now()
    const manifestPath: string = `../../src/extension/manifest?${now}`
    const { manifest } = await import(manifestPath)
    const json: string = JSON.stringify(manifest)
    writeFileSync('dist-extension/manifest.json', json)
})

watchBuild({
    entryPoints: ['src/extension/content/content.ts'],
    outfile: 'dist-extension/content.js'
})
watchBuild({
    entryPoints: ['src/extension/content/content.css'],
    outfile: 'dist-extension/content.css',
    plugins: [tailwindPlugin()]
})
watchBuild({
    entryPoints: ['src/extension/content/loader.ts'],
    outfile: 'dist-extension/loader.js'
})
watchBuild({
    entryPoints: ['src/extension/background/background.ts'],
    outfile: 'dist-extension/background.js'
})

generateFuncsFiles()

copyFileSync('public/assets/images/icons/icon-128.png', 'dist-extension/icon-128.png')

const server = await createServer(viteConfig)
await server.listen()
server.printUrls()
server.bindCLIShortcuts({ print: true })
