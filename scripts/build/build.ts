import archiver from 'archiver'
import { log } from 'console'
import { createWriteStream, readFileSync } from 'fs'
import { build, InlineConfig, mergeConfig } from 'vite'
import { ExtensionV2Manifest } from '../../src/common/types/types'
import { viteConfig } from '../constants/viteConfig'
import { vitePluginMinify } from '../plugins/vitePluginMinify'

const buildConfig: InlineConfig = {
    plugins: [vitePluginMinify()]
}
await build(mergeConfig(viteConfig, buildConfig))

log('\nĐang tạo file xuee.zip...')
const zipStream = createWriteStream('./xuee.zip')
const archive = archiver('zip', {
    zlib: { level: 9 }
})
archive.pipe(zipStream)

const extArchive = archiver('zip', {
    zlib: { level: 9 }
})
extArchive.glob('**/*', {
    ignore: ['loader.js', 'manifest.json'],
    cwd: 'dist-extension'
})

const devManifestJson: string = readFileSync('dist-extension/manifest.json', 'utf8')
const manifest: ExtensionV2Manifest = JSON.parse(devManifestJson)

if (manifest.content_scripts !== undefined) {
    for (const script of manifest.content_scripts) {
        if (script.js === undefined) continue
        const index: number = script.js.indexOf('loader.js')
        if (index === -1) continue
        script.js[index] = 'content.js'
        script.css = ['content.css']
        break
    }
}

if (manifest.web_accessible_resources !== undefined) {
    manifest.web_accessible_resources = manifest.web_accessible_resources.filter((path) => {
        return !/^content\.(js|css)$/.test(path)
    })
    if (manifest.web_accessible_resources.length === 0) {
        delete manifest.web_accessible_resources
    }
}

const prodManifestJson: string = JSON.stringify(manifest)
extArchive.append(prodManifestJson, { name: 'manifest.json' })

await extArchive.finalize()

archive.append(extArchive, { name: 'extension.zip' })
archive.glob('**/*', { cwd: 'dist-command' })

await archive.finalize()
log('File xuee.zip đã được tạo!')

log('\nBuild hoàn tất!')
