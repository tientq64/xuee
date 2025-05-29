import { isObject } from '@common/utils/isObject'
import { subscribeKey } from 'valtio/utils'

export function persist<T extends object, K extends keyof T, D = Pick<T, K>>(
    proxyObject: T,
    storageKey: string,
    keys: K[],
    handleStorage?: (json: string, data: D) => void
): void {
    let data: object
    try {
        const json: string | null = localStorage.getItem(storageKey)
        if (json === null) throw 0
        data = JSON.parse(json)
        if (!isObject(data)) throw 0
    } catch {
        data = {}
    }
    for (const key of keys) {
        if (!(key in data)) continue
        proxyObject[key] = data[key as keyof object]
    }
    for (const key of keys) {
        subscribeKey(proxyObject, key, (value) => {
            ;(data as T)[key] = value
            const json: string = JSON.stringify(data)
            localStorage.setItem(storageKey, json)
            handleStorage?.(json, data as D)
        })
    }
}
