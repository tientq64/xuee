import { remote, useRemote } from '@remote/store'
import { useEffect } from 'preact/hooks'

export function useGenerateSheetId(): void {
    const { siteId, subSheetName } = useRemote()

    useEffect(() => {
        remote.sheetId = `${siteId}/${subSheetName}`
    }, [siteId, subSheetName])
}
