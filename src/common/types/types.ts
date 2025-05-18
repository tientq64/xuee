export type AnyFunction = (...args: any[]) => any

export type DataPacket = [funcName: string, args: unknown[]]

export type TabInfo = [tabId: number | undefined, tabUrl: string | null, tabIndex: number]
