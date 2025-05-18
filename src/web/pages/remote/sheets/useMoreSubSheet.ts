import { Sheet } from '@remote/types/types'
import { useMoreTile } from '@tiles/useMoreTile'

export function useMoreSubSheet(): Sheet {
    return {
        '81': useMoreTile()
    }
}
