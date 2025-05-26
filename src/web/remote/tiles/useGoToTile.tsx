import { SubSheetName, Tile } from '@remote/types/types'

export function useGoToTile(): Tile {
    return goToTile
}

const goToTile: Tile = {
    text: 'Đến trang web...',
    icon: 'captive_portal',
    subSheetName: SubSheetName.GoTo
}
