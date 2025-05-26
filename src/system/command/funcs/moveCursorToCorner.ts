import { getMousePositionInfo, MousePositionInfo } from '@command/helpers/getMousePositionInfo'
import { mouse } from '@nut-tree-fork/nut-js'

export async function moveCursorToCorner(): Promise<void> {
    const [{ y }, width, height]: MousePositionInfo = await getMousePositionInfo()

    const cornerX: number = width - 1
    const cornerY: number = height - 100

    mouse.setPosition({
        x: cornerX,
        y: y === cornerY ? cornerY - 1 : cornerY
    })
}
