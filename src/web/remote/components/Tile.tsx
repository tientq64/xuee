import { safeCall } from '@common/utils/safeCall'
import { remote, useRemote } from '@remote/store'
import { SubSheetName, TileColor, TileMoveCallback, TileTapCallback } from '@remote/types/types'
import { useUpdateEffect } from 'ahooks'
import clsx from 'clsx'
import { MaterialSymbols } from 'material-design-icons-literal-types'
import { ComponentChild, VNode } from 'preact'
import { useContext, useEffect } from 'preact/hooks'
import { TileIcon } from './TileIcon'
import {
    HoveringContext,
    IndexContext,
    TappedSignalContext,
    TappingContext,
    TilesetIndexContext,
    VisibleIndexContext
} from './TilesetTag'

export interface TileProps {
    icon?: MaterialSymbols
    iconText?: string | number
    iconClassName?: string
    color?: TileColor
    spinning?: boolean
    disabled?: boolean
    subSheetName?: SubSheetName
    movedSubSheetName?: SubSheetName
    isCustom?: boolean
    tap?: TileTapCallback | null
    move?: TileMoveCallback | null
    children?: ComponentChild
}

export function Tile({
    icon,
    iconText,
    iconClassName,
    color,
    spinning,
    disabled,
    subSheetName,
    movedSubSheetName,
    isCustom,
    tap,
    move,
    children
}: TileProps): VNode {
    const { tapByHover, hoverTapped } = useRemote()

    const tilesetIndex: number = useContext(TilesetIndexContext)
    const index: number = useContext(IndexContext)
    const visibleIndex: number = useContext(VisibleIndexContext)
    const tapping: boolean = useContext(TappingContext)
    const tappedSignal: number = useContext(TappedSignalContext)
    const hovering: boolean = useContext(HoveringContext) && index === 0

    const visible: boolean = index === visibleIndex
    const holding: boolean = tapping && visibleIndex === 1
    const moving: boolean = tapping && visibleIndex === 2

    const pressColor: string = color === undefined ? 'bg-zinc-600' : pressColors[color]

    useUpdateEffect(() => {
        if (tappedSignal === 0 || index === 2) return
        if (index === 0 && tappedSignal % 2 === 0) return
        if (index === 1 && tappedSignal % 2 === 1) return
        if (subSheetName !== undefined) {
            remote.subSheetName = subSheetName === remote.subSheetName ? undefined : subSheetName
        }
        safeCall(tap)
    }, [tappedSignal])

    useEffect(() => {
        if (!hoverTapped) return
        if (index > 0) return
        if (remote.hoveringTilesetIndex !== tilesetIndex) return
        remote.hoverTapped = false
        remote.hoveringTilesetIndex = -1
        remote.subSheetName = undefined
        safeCall(tap)
    }, [hoverTapped])

    useUpdateEffect(() => {
        if (moving && movedSubSheetName !== undefined) {
            remote.subSheetName = movedSubSheetName
            remote.tapByHover = true
        }
    }, [moving])

    return (
        <>
            {((index === 0 && !holding) || (index === 1 && holding)) && (
                <div
                    className={clsx(
                        `pointer-events-none flex size-full flex-col items-center justify-center
                        gap-2 rounded-md p-2`,
                        cornerTileClasses[tilesetIndex],
                        color,
                        tapping && !tapByHover && pressColor,
                        hovering && pressColor,
                        disabled && 'text-zinc-500!'
                    )}
                >
                    {visible && (
                        <>
                            {!isCustom && (
                                <>
                                    <TileIcon
                                        icon={icon}
                                        iconText={iconText}
                                        iconClassName={iconClassName}
                                        spinning={spinning}
                                    />
                                    <div className="min-h-8 text-center leading-4 empty:min-h-4">
                                        {children}
                                    </div>
                                </>
                            )}
                            {isCustom && children}
                        </>
                    )}
                </div>
            )}

            {index === 1 && visibleIndex === 0 && (
                <div
                    className={clsx(
                        'pointer-events-none absolute top-0.5 right-1 text-zinc-500',
                        color,
                        disabled && 'text-zinc-800!'
                    )}
                >
                    <TileIcon
                        icon={icon}
                        iconText={iconText}
                        iconClassName={iconClassName}
                        spinning={spinning}
                        isSubTile
                    />
                </div>
            )}
        </>
    )
}

export const cornerTileClasses: Record<number, string> = {
    0: 'rounded-tl-[36px]',
    2: 'rounded-tr-[36px]',
    24: 'rounded-bl-[36px]',
    26: 'rounded-br-[36px]'
}

const pressColors: Record<TileColor, string> = {
    [TileColor.Red]: 'bg-rose-500/50',
    [TileColor.Yellow]: 'bg-orange-400/50',
    [TileColor.Green]: 'bg-emerald-500/50',
    [TileColor.Blue]: 'bg-blue-500/50',
    [TileColor.Gray]: 'bg-slate-500/50'
}
