import { Sheet } from '@remote/types/types'
import { useGoToTile } from '@tiles/useGoToTile'

export function useGoToSubSheet(): Sheet {
    return {
        '82': [useGoToTile()]
    }
}
