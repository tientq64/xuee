import { keyPressDelay } from '@command/constants/constants'
import { keyboard } from '@nut-tree-fork/nut-js'

export async function typeText(text: string): Promise<void> {
    keyboard.config.autoDelayMs = keyPressDelay
    await keyboard.type(text)
}
