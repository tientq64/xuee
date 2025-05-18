import { author, description, name, version } from '@/package.json'
import { JSONSchemaForGoogleChromeExtensionManifestFiles } from '@schemastore/chrome-manifest'

export const manifest: JSONSchemaForGoogleChromeExtensionManifestFiles = {
    manifest_version: 2,
    name,
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
                'http://localhost:5500/',
                'http://192.168.1.4:5500/',
                'https://xuee.vercel.app/'
            ],
            js: ['loader.js'],
            run_at: 'document_idle',
            all_frames: false
        }
    ],
    background: {
        scripts: ['background.js'],
        persistent: true
    },
    web_accessible_resources: ['content.js', 'content.css'],
    content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
    permissions: ['bookmarks', 'power', 'sessions', 'storage', 'tabs', 'history', '<all_urls>']
}
