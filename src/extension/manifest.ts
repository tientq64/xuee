import { author, description, name, version } from '@/package.json'
import { ExtensionV2Manifest } from '@common/types/types'
import { upperFirst } from '@common/utils/upperFirst'

export const manifest: ExtensionV2Manifest = {
    manifest_version: 2,
    name: upperFirst(name),
    version,
    author: author.name,
    description,
    icons: {
        '128': 'icon-128.png'
    },
    content_scripts: [
        {
            matches: ['<all_urls>'],
            exclude_matches: [
                'http://localhost:5500/remote',
                'http://192.168.1.4:5500/remote',
                'https://xuee.vercel.app/remote'
            ],
            js: ['loader.js'],
            run_at: 'document_idle',
            all_frames: false
        }
    ],
    background: {
        page: 'background.html',
        persistent: true
    },
    web_accessible_resources: ['content.js', 'content.css'],
    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
    permissions: ['bookmarks', 'power', 'sessions', 'storage', 'tabs', 'history', '<all_urls>']
}
