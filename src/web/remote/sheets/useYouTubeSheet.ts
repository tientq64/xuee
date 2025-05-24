import { Sheet } from '@remote/types/types'
import { useFullmediaTile } from '@tiles/useFullmediaTile'

export function useYouTubeSheet(): Sheet {
    return {
        '50': useFullmediaTile()
    }
}
