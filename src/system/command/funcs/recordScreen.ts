import { pressKey } from './pressKey'

export async function recordScreen(): Promise<void> {
    await pressKey('win+alt+r')
}
