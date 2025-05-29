import { build, InlineConfig, mergeConfig } from 'vite'
import { viteConfig } from '../constants/viteConfig'
import { vitePluginMinify } from '../plugins/vitePluginMinify'

export async function buildWebFunc(): Promise<void> {
    const buildConfig: InlineConfig = {
        plugins: [vitePluginMinify()]
    }
    await build(mergeConfig(viteConfig, buildConfig))
}
