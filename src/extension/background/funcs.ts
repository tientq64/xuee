import { backBrowser } from './funcs/backBrowser'
import { fullscreen } from './funcs/fullscreen'
import { reloadTab } from './funcs/reloadTab'
export const backgroundFuncs = { backBrowser, fullscreen, reloadTab }
export const backgroundFuncNames = ['backBrowser', 'fullscreen', 'reloadTab']
export type BackgroundFuncs = typeof backgroundFuncs
