import { tileCols } from '@remote/constants/constants'

export function sheetCoordToIndex(coord: string): number {
    return Number(coord[0]) * tileCols + Number(coord[1])
}
