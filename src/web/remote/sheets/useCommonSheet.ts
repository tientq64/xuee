import { Sheet } from '@remote/types/types'
import { usePeerTile } from '@tiles/usePeerTile'
import { useStatusTile } from '@tiles/useStatusTile'

export function useCommonSheet(): Sheet {
    return {
        '00': usePeerTile(),
        '02': useStatusTile()
    }
}
