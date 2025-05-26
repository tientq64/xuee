import { safeCall } from '@common/utils/safeCall'
import { holdTime } from '@remote/constants/constants'
import { vibrate } from '@remote/funcs/vibrate'
import { remote, useRemote } from '@remote/store'
import { SubSheetName, Tile, TileColor, Tileset } from '@remote/types/types'
import clsx from 'clsx'
import { VNode } from 'preact'
import { memo, TouchEvent } from 'preact/compat'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { TileIconTag } from './TileIconTag'

interface TileTagProps {
    tileset: Tileset
    index: number
}

export const TileTag = memo(({ tileset, index }: TileTagProps): VNode => {
    const { subSheetName, sheetId } = useRemote()

    const [pressed, setPressed] = useState<boolean>(false)
    const [holded, setHolded] = useState<boolean>(false)
    const [moved, setMoved] = useState<boolean>(false)
    const holdingTimeoutId = useRef<number>(0)

    const tile = useMemo<Tile | undefined>(() => {
        if (holded) return tileset[1]
        return tileset[0]
    }, [tileset, holded])

    const subTile = useMemo<Tile | undefined>(() => {
        if (holded) return undefined
        return tileset[1]
    }, [tileset, holded])

    const pressColor = useMemo<string>(() => {
        if (tile?.color !== undefined) {
            return pressColorsMap[tile.color]
        }
        return 'bg-zinc-600'
    }, [tile])

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>): void => {
        event.preventDefault()
        setPressed(true)
        if (subTile !== undefined) {
            clearTimeout(holdingTimeoutId.current)
            holdingTimeoutId.current = window.setTimeout(handleHold, holdTime)
        }
    }

    const handleTouchMove = (): void => {
        clearTimeout(holdingTimeoutId.current)
        setMoved(true)
    }

    const handleTouchEnd = (): void => {
        clearTimeout(holdingTimeoutId.current)
        if (!moved && tile !== undefined) {
            handlePress()
        }
        setPressed(false)
        setHolded(false)
        setMoved(false)
    }

    const handlePress = (): void => {
        if (tile === undefined) return
        safeCall(tile.press)
        if (tile.subSheetName !== undefined) {
            const newSubSheetName: SubSheetName | undefined =
                tile.subSheetName === subSheetName ? undefined : tile.subSheetName
            remote.subSheetName = newSubSheetName
        }
    }

    const handleHold = (): void => {
        setHolded(true)
    }

    useEffect(() => {
        if (!pressed || tile === undefined) return
        vibrate()
    }, [pressed, tile])

    useEffect(() => {
        if (!holded) return
        vibrate()
    }, [holded])

    useEffect(() => {
        return () => {
            setPressed(false)
            setHolded(false)
            setMoved(false)
            clearTimeout(holdingTimeoutId.current)
        }
    }, [sheetId])

    return (
        <div
            className={clsx(
                'relative touch-none rounded-md',
                cornerTileClasses[index],
                tile !== undefined && 'z-10',
                pressed && (tile !== undefined || subTile !== undefined)
                    ? ['scale-105', pressColor]
                    : 'bg-zinc-900',
                holded && 'z-20 outline-[3px] outline-orange-300'
            )}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {tile !== undefined && (
                <div
                    className={clsx(
                        `pointer-events-none flex size-full flex-col items-center justify-center
                        gap-2 p-2`,
                        tile.color,
                        tile.disabled && 'text-zinc-500!'
                    )}
                >
                    {tile.content ?? (
                        <>
                            <TileIconTag tile={tile} />
                            <div className="min-h-8 text-center leading-4 empty:min-h-4">
                                {tile.text}
                            </div>
                        </>
                    )}
                </div>
            )}

            {subTile !== undefined && (
                <div
                    className={clsx(
                        'pointer-events-none absolute top-0.5 right-1',
                        subTile.color,
                        subTile.disabled ? 'text-zinc-800!' : 'text-zinc-500'
                    )}
                >
                    <TileIconTag tile={subTile} isSubTile />
                </div>
            )}
        </div>
    )
})

const cornerTileClasses: Record<number, string> = {
    0: 'rounded-tl-[36px]',
    2: 'rounded-tr-[36px]',
    24: 'rounded-bl-[36px]',
    26: 'rounded-br-[36px]'
}

const pressColorsMap: Record<TileColor, string> = {
    [TileColor.Red]: 'bg-rose-500/50',
    [TileColor.Yellow]: 'bg-orange-400/50',
    [TileColor.Green]: 'bg-emerald-500/50',
    [TileColor.Blue]: 'bg-blue-500/50',
    [TileColor.Gray]: 'bg-slate-500/50'
}
