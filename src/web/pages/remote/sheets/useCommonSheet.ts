import { useReloadTile } from '../tiles/useReloadTile'
import { Sheet } from '../types/types'

export function useCommonSheet(): Sheet {
    return {
        '20': useReloadTile()
    }
}
