import { useFullmediaTile } from '../tiles/useFullmediaTile'
import { Sheet } from '../types/types'

export function useYouTubeSheet(): Sheet {
    return {
        '50': useFullmediaTile()
    }
}
