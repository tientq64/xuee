import { useRemote } from '@remote/store'
import { useEffect } from 'react'

export function useGenerateSheetId(): void {
    const { site, subSheetName } = useRemote()

    useEffect(() => {}, [site.name, subSheetName])
}
