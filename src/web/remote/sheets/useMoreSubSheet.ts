import { Sheet } from '@remote/types/types'
import { useInstallPWATile } from '@tiles/useInstallPWATile'
import { useMoreTile } from '@tiles/useMoreTile'
import { usePrintScreenTile } from '@tiles/usePrintScreenTile'
import { useRecordScreenTile } from '@tiles/useRecordScreenTile'

export function useMoreSubSheet(): Sheet {
    return {
        '01': [useInstallPWATile()],
        '51': [usePrintScreenTile()],
        '52': [useRecordScreenTile()],
        '81': [useMoreTile()]
    }
}
