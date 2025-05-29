import { Sheet } from '@remote/types/types'
import { usePeerTile } from '@tiles/usePeerTile'
import { useScanQRCodeTile } from '@tiles/useScanQRCodeTile'
import { useStatusTile } from '@tiles/useStatusTile'

export function useCommonSheet(): Sheet {
    return {
        '00': [usePeerTile()],
        '01': [useScanQRCodeTile()],
        '02': [useStatusTile()]
    }
}
