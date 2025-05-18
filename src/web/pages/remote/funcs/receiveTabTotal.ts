import { remote } from '@remote/store'

export function receiveTabTotal(tabTotal: number): void {
    remote.tabTotal = tabTotal
}
