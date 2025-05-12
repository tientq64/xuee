import { browserBack } from './funcs/browserBack'
import { browserFullscreen } from './funcs/browserFullscreen'
export const backgroundFuncs = { browserBack, browserFullscreen }
export const backgroundFuncNames = ['browserBack', 'browserFullscreen']
export type BackgroundFuncs = typeof backgroundFuncs
