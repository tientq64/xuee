import { AnyFunction } from '@common/types/types'

export function safeCall<T extends AnyFunction>(
    func: T | Function | VoidFunction | null | undefined | void,
    ...args: Parameters<T>
): ReturnType<T> | void {
    if (typeof func !== 'function') return
    try {
        return func(...args)
    } catch (error) {
        console.error(error)
        return
    }
}
