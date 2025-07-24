import { Sheet } from '@remote/types/types'
import { InstallPWATile } from '@tiles/InstallPWATile'
import { PeerTile } from '@tiles/PeerTile'
import { ScanExtensionQRCodeTile } from '@tiles/ScanExtensionQRCodeTile'
import { StatusTile } from '@tiles/StatusTile'

export const commonSheet: Sheet = {
    '00': [<PeerTile />, <ScanExtensionQRCodeTile />],
    '01': [<InstallPWATile />],
    '02': [<StatusTile />]
}
