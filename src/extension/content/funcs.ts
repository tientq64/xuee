import { clickNumb } from './funcs/clickNumb'
import { markClick } from './funcs/markClick'
import { navigate } from './funcs/navigate'
import { scroll } from './funcs/scroll'
export const contentFuncs = { clickNumb, markClick, navigate, scroll }
export const contentFuncNames = ['clickNumb', 'markClick', 'navigate', 'scroll']
export type ContentFuncs = typeof contentFuncs
