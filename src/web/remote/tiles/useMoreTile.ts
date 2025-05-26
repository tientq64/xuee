import { useRemote } from '@remote/store'
import { SubSheetName, Tile } from '@remote/types/types'
import { useMemo } from 'preact/hooks'

export function useMoreTile(): Tile {
    const { subSheetName } = useRemote()

    return useMemo(() => {
        const isOpen: boolean = subSheetName === SubSheetName.More

        return {
            text: 'Thêm...',
            icon: 'arrow_forward_ios',
            className: isOpen ? 'rotate-90' : '-rotate-90',
            subSheetName: SubSheetName.More
        }
    }, [subSheetName])
}
