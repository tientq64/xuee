import { useBackground } from '@background/store'
import { SyncMode } from '@background/types/types'
import { Box } from '@common/components/Box'
import { Button } from '@common/components/Button'
import { Icon } from '@common/components/Icon'
import { LinkButton } from '@common/components/LinkButton'
import { HTMLDivAttributes } from '@common/types/types'
import { VNode } from 'preact'

interface ChooseSyncFromOrToGistProps extends HTMLDivAttributes {
    onChoose?: (syncMode: SyncMode) => void
}

export function ChooseSyncFromOrToGist({ onChoose, ...props }: ChooseSyncFromOrToGistProps): VNode {
    const { gistId, gistFilename } = useBackground()

    const gistFileUrl: string = `https://gist.github.com/${gistId}`

    return (
        <Box {...props} gap>
            <Box row gap>
                <Button
                    className="flex flex-1 flex-col items-center justify-center"
                    onClick={() => onChoose?.(SyncMode.Pull)}
                >
                    <Icon name="cloud_download" />
                    Đồng bộ từ GitHub Gist
                    <div className="text-xs text-zinc-400">
                        Dữ liệu hiện tại trên máy tính sẽ bị xóa và thay thế bằng dữ liệu trên
                        GitHub Gist.
                    </div>
                </Button>

                <Button
                    className="flex flex-1 flex-col items-center justify-center"
                    onClick={() => onChoose?.(SyncMode.Push)}
                >
                    <Icon name="computer_arrow_up" />
                    Đồng bộ lên GitHub Gist
                    <div className="text-xs text-zinc-400">
                        Dữ liệu hiện tại trên máy tính được giữ nguyên và thay thế dữ liệu trên
                        GitHub Gist.
                    </div>
                </Button>
            </Box>

            <div className="text-sm">
                Xem dữ liệu trên GitHub Gist:{' '}
                <LinkButton href={gistFileUrl}>{gistFilename}</LinkButton>
            </div>
        </Box>
    )
}
