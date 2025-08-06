import { holdTime, moveThreshold } from '@remote/constants/constants'
import { vibrate } from '@remote/funcs/vibrate'
import { getTouchDistance } from '@remote/helpers/getTouchDistance'
import { useRemote } from '@remote/store'
import { Tileset, TouchDivEvent } from '@remote/types/types'
import clsx from 'clsx'
import { createContext, VNode } from 'preact'
import { useRef, useState } from 'preact/hooks'

export const TilesetIndexContext = createContext<number>(0)
export const IndexContext = createContext<number>(0)
export const VisibleIndexContext = createContext<number>(0)
export const TappingContext = createContext<boolean>(false)
export const TappedSignalContext = createContext<number>(0)
export const HoveringContext = createContext<boolean>(false)
export const MovementContext = createContext<[number, number]>([0, 0])

interface TilesetProps {
    tileset: Tileset
    index: number
}

export function TilesetTag({ tileset, index }: TilesetProps): VNode {
    const { tapByHover, hoveringTilesetIndex } = useRemote()

    const [tapping, setTapping] = useState<boolean>(false)
    const [holding, setHolding] = useState<boolean>(false)
    const [moving, setMoving] = useState<boolean>(false)
    const [tappedSignal, setTappedSignal] = useState<number>(0)
    const [startTouch, setStartTouch] = useState<Touch | undefined>(undefined)
    const [prevTouch, setPrevTouch] = useState<Touch | undefined>(undefined)
    const [movementX, setMovementX] = useState<number>(0)
    const [movementY, setMovementY] = useState<number>(0)
    const holdTimeoutId = useRef<number>(0)

    const [, holdTile, moveTile] = tileset

    const tileIndex: number = moving && moveTile !== undefined ? 2 : holding ? 1 : 0
    const hovering: boolean = tapByHover && hoveringTilesetIndex === index

    const isEmpty: boolean = tileset.length === 0

    const handleTouchStart = (event: TouchDivEvent): void => {
        event.preventDefault()
        clearTimeout(holdTimeoutId.current)
        setTapping(true)
        const [touch]: TouchList = event.touches
        setStartTouch(touch)
        vibrate()
        if (holdTile) {
            holdTimeoutId.current = window.setTimeout(handleHold, holdTime)
        }
    }

    const handleHold = (): void => {
        setHolding(true)
        vibrate()
    }

    const handleTouchMove = (event: TouchDivEvent): void => {
        const [touch]: TouchList = event.touches
        if (!moving && startTouch !== undefined) {
            const distance: number = getTouchDistance(touch, startTouch)
            if (distance >= moveThreshold) {
                clearTimeout(holdTimeoutId.current)
                setMoving(true)
            }
        }
        if (moving) {
            if (prevTouch !== undefined) {
                setMovementX(touch.clientX - prevTouch.clientX)
                setMovementY(touch.clientY - prevTouch.clientY)
            }
            setPrevTouch(touch)
        }
    }

    const handleTouchEnd = (): void => {
        if (tapping && !moving) {
            if (holding) {
                setTappedSignal(tappedSignal === 2 ? 4 : 2)
            } else {
                setTappedSignal(tappedSignal === 1 ? 3 : 1)
            }
        }
        clearTimeout(holdTimeoutId.current)
        setTapping(false)
        setHolding(false)
        setMoving(false)
        setStartTouch(undefined)
        setPrevTouch(undefined)
        setMovementX(0)
        setMovementY(0)
    }

    return (
        <div
            className={clsx(
                'relative touch-none rounded-md bg-zinc-900',
                isEmpty && 'pointer-events-none',
                tapping && !tapByHover && 'z-20 scale-105',
                hovering && 'z-20 scale-105'
            )}
            inert={isEmpty}
            data-tileset-index={index}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <TilesetIndexContext.Provider value={index}>
                <VisibleIndexContext.Provider value={tileIndex}>
                    <TappingContext.Provider value={tapping}>
                        <TappedSignalContext.Provider value={tappedSignal}>
                            <HoveringContext.Provider value={hovering}>
                                <MovementContext.Provider value={[movementX, movementY]}>
                                    {tileset.map((tile, tileIndex) => (
                                        <IndexContext.Provider value={tileIndex}>
                                            {tile}
                                        </IndexContext.Provider>
                                    ))}
                                </MovementContext.Provider>
                            </HoveringContext.Provider>
                        </TappedSignalContext.Provider>
                    </TappingContext.Provider>
                </VisibleIndexContext.Provider>
            </TilesetIndexContext.Provider>
        </div>
    )
}
