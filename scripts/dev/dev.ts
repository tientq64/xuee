import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, writeFileSync } from 'fs'
import { createServer } from 'vite'
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
    outfile: 'dist-extension/content.js',
    bundle: true,
    minify: true
})
watchBuild({
    entryPoints: ['src/extension/content/content.css'],
    outfile: 'dist-extension/content.css',
    bundle: true,
    minify: true
})
watchBuild({
    entryPoints: ['src/extension/content/loader.ts'],
    outfile: 'dist-extension/loader.js',
    bundle: true,
    minify: true
})
watchBuild({
    entryPoints: ['src/extension/background/background.ts'],
    outfile: 'dist-extension/background.js',
    bundle: true,
    minify: true
})

generateFuncsFiles()

copyFileSync('public/assets/images/icons/icon-128.png', 'dist-extension/icon-128.png')

const server = await createServer({
    server: {
        host: 'localhost',
        port: 5500,
        strictPort: true
    },
    plugins: [react(), tailwindcss()]
})
await server.listen()
server.printUrls()
server.bindCLIShortcuts({ print: true })
