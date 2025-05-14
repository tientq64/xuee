import clsx from 'clsx'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { safeCall } from '../../../../common/utils/safeCall'
import { Icon } from '../../../components/Icon'
import { vibrate } from '../funcs/vibrate'
import { Tile, TileColor, Tileset } from '../types/types'

interface TileTagProps {
    tileset: Tileset
    index: number
}

export function TileTag({ tileset, index }: TileTagProps): ReactElement {
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

    const handleTouchStart = (): void => {
        setPressed(true)
        if (subTile) {
            holdingTimeoutId.current = setTimeout(setHolded, 300, true)
        }
    }

    const handleTouchMove = (): void => {
        clearTimeout(holdingTimeoutId.current)
        setMoved(true)
    }

    const handleTouchEnd = (): void => {
        clearTimeout(holdingTimeoutId.current)
        if (!moved && tile !== undefined) {
            safeCall(tile.press)
        }
        setPressed(false)
        setHolded(false)
        setMoved(false)
    }

    useEffect(() => {
        if (!pressed) return
        vibrate()
    }, [pressed])

    useEffect(() => {
        if (!holded) return
        vibrate()
    }, [holded])

    useEffect(() => {
        return () => {
            clearTimeout(holdingTimeoutId.current)
        }
    }, [])

    return (
        <div
            className={clsx(
                'relative rounded-md px-2',
                cornerTileClasses[index],
                pressed && pressColor,
                pressed ? 'scale-105' : 'bg-zinc-900 transition duration-700 ease-out',
                holded && 'z-1 outline-[3px] outline-orange-300'
            )}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {tile !== undefined && (
                <>
                    {tile.content ?? (
                        <div
                            className={clsx(
                                `pointer-events-none flex h-full flex-col items-center
                                justify-center gap-2`,
                                tile.color,
                                tile.disabled && 'text-zinc-500'
                            )}
                        >
                            {tile.icon !== undefined && (
                                <Icon
                                    className={clsx(tile.spin && 'animate-spin')}
                                    source={tile.icon}
                                />
                            )}
                            <div className="h-8 text-center leading-4">{tile.text}</div>
                        </div>
                    )}
                </>
            )}

            {subTile !== undefined && (
                <div
                    className={clsx(
                        'pointer-events-none absolute top-0.5 right-1',
                        subTile.color,
                        subTile.disabled ? 'text-zinc-800' : 'text-zinc-500'
                    )}
                >
                    {subTile.icon !== undefined && <Icon source={subTile.icon} size={24} />}
                </div>
            )}
        </div>
    )
}

const cornerTileClasses: Record<number, string> = {
    0: 'rounded-tl-[36px]',
    2: 'rounded-tr-[36px]',
    24: 'rounded-bl-[36px]',
    26: 'rounded-br-[36px]'
}

const pressColorsMap: Record<TileColor, string> = {
    [TileColor.Red]: 'bg-rose-500/50',
    [TileColor.Yellow]: 'bg-orange-500/50',
    [TileColor.Green]: 'bg-emerald-500/50',
    [TileColor.Blue]: 'bg-blue-500/50',
    [TileColor.Gray]: 'bg-slate-500/50'
}
