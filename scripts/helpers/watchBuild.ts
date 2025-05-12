import { BuildContext, BuildOptions, context } from 'esbuild'

export async function watchBuild(options: BuildOptions): Promise<BuildContext> {
    const builder: BuildContext = await context({
        bundle: true,
        minify: true,
        ...options
    })
    builder.watch()

    return builder
}
