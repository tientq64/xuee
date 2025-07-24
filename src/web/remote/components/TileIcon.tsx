import { Icon } from '@common/components/Icon'
import clsx from 'clsx'
import { VNode } from 'preact'
import { TileProps } from './Tile'

type TileIconProps = Pick<TileProps, 'icon' | 'iconText' | 'iconClassName' | 'spinning'> & {
    isSubTile?: boolean
}

export function TileIcon({
    icon,
    iconText,
    iconClassName,
    spinning,
    isSubTile = false
}: TileIconProps): VNode | null {
    const isEmpty: boolean = icon === undefined && iconText === undefined
    const size: number = isSubTile ? 24 : 32

    if (isEmpty) return null

    return (
        <div className="flex min-h-9 items-center justify-center">
            {icon !== undefined && (
                <Icon
                    className={clsx(iconClassName, spinning && 'animate-spin')}
                    source={icon}
                    size={size}
                />
            )}
            {iconText !== undefined && <div className="text-3xl">{iconText}</div>}
        </div>
    )
}
