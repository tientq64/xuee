import { SiteName } from '@common/constants/sites'
import { AnyFunction } from '@common/types/types'
import { VNode } from 'preact'
import { TouchEvent } from 'preact/compat'

export enum TileColor {
    Red = 'text-rose-400',
    Yellow = 'text-orange-300',
    Green = 'text-emerald-400',
    Blue = 'text-blue-400',
    Gray = 'text-slate-400'
}
export type TileTapCallback = AnyFunction
export type TileMoveCallback = AnyFunction
export type TileNode = VNode

export type Tileset = [tapTile?: TileNode, holdTile?: TileNode, moveTile?: TileNode]

export type SheetCoord =
    | '00'
    | '01'
    | '02'
    | '10'
    | '11'
    | '12'
    | '20'
    | '21'
    | '22'
    | '30'
    | '31'
    | '32'
    | '40'
    | '41'
    | '42'
    | '50'
    | '51'
    | '52'
    | '60'
    | '61'
    | '62'
    | '70'
    | '71'
    | '72'
    | '80'
    | '81'
    | '82'

export type Sheet = Partial<Record<SheetCoord, Tileset>>

export enum SubSheetName {
    More = 'more',
    Click = 'click',
    GoTo = 'goTo',
    Seek = 'seek'
}
export enum BaseSheetName {
    Common = 'common',
    Main = 'main',
    Media = 'media',
    Video = 'video'
}
export type SheetName = SubSheetName | BaseSheetName | SiteName

export type TouchDivEvent = TouchEvent<HTMLDivElement>
