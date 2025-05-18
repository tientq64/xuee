import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { InlineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import vitePaths from 'vite-tsconfig-paths'

export const viteConfig: InlineConfig = {
    server: {
        host: '0.0.0.0',
        port: 5500,
        strictPort: true
    },
    plugins: [viteReact(), vitePaths(), tailwindcss(), mkcert()]
}
