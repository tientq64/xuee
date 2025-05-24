import { mouseMove } from '../funcs/mouseMove'
import { pressKey } from '../funcs/pressKey'
import { typeText } from '../funcs/typeText'

export const commandFuncs = {
    mouseMove,
    pressKey,
    typeText
}
export type CommandFuncs = typeof commandFuncs
