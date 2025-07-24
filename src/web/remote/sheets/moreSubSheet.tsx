import { Sheet } from '@remote/types/types'
import { MoreTile } from '@tiles/MoreTile'
import { MoveCursorToCornerTile } from '@tiles/MoveCursorToCornerTile'
import { ReloadExtensionTile } from '@tiles/ReloadExtensionTile'
import { ReloadRemoteTile } from '@tiles/ReloadRemoteTile'

export const moreSubSheet: Sheet = {
    '20': [<ReloadRemoteTile />, <ReloadExtensionTile />],
    '81': [<MoreTile />],
    '82': [<MoveCursorToCornerTile />]
}
