import { mouse, Point, screen } from '@nut-tree-fork/nut-js'

export type MousePositionInfo = [mousePosition: Point, screenWidth: number, screenHeight: number]

export async function getMousePositionInfo(): Promise<MousePositionInfo> {
    return Promise.all([mouse.getPosition(), screen.width(), screen.height()])
}
