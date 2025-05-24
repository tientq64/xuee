import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { InlineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import vitePaths from 'vite-tsconfig-paths'

export const viteConfig: InlineConfig = {
    server: {
        host: '0.0.0.0',
        port: 5500,
        strictPort: true
    },
    plugins: [preact(), vitePaths(), tailwindcss(), mkcert()]
}
