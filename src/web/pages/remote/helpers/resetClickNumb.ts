import { remote } from '@remote/store'

export function resetClickNumb(): void {
    clearTimeout(remote.clickNumbTimeoutId)
    remote.clickNumbInput = ''
    remote.clickNumbTimeoutId = 0
}
