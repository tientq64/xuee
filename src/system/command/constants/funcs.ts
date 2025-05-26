import { mouseMove } from '../funcs/mouseMove'
import { moveCursorToCorner } from '../funcs/moveCursorToCorner'
import { pressKey } from '../funcs/pressKey'
import { printScreen } from '../funcs/printScreen'
import { recordScreen } from '../funcs/recordScreen'
import { typeText } from '../funcs/typeText'

export const commandFuncs = {
    mouseMove,
    moveCursorToCorner,
    pressKey,
    printScreen,
    recordScreen,
    typeText
}
export type CommandFuncs = typeof commandFuncs
