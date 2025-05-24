import { clickNumb } from '../funcs/clickNumb'
import { fullmedia } from '../funcs/fullmedia'
import { markClick } from '../funcs/markClick'
import { navigate } from '../funcs/navigate'
import { scroll } from '../funcs/scroll'
import { setRotate } from '../funcs/setRotate'
import { updateMedia } from '../funcs/updateMedia'

export const contentFuncs = {
    clickNumb,
    fullmedia,
    markClick,
    navigate,
    scroll,
    setRotate,
    updateMedia
}
export type ContentFuncs = typeof contentFuncs
