import { DivHTMLAttributes } from '@common/types/types'
import clsx from 'clsx'
import { VNode } from 'preact'

export interface BoxProps extends DivHTMLAttributes {
    gap?: number | boolean
    row?: boolean
    grow?: boolean
    wide?: boolean
    high?: boolean
}

export function Box({ gap, row, grow, wide, high, className, style, ...props }: BoxProps): VNode {
    if (gap === true) gap = 2
    else if (gap === false) gap = 0

    return (
        <div
            {...props}
            className={clsx(
                className,
                'flex items-center justify-center',
                !row && 'flex-col',
                grow && 'flex-1',
                wide && 'w-full',
                high && 'h-full'
            )}
            style={{
                gap: gap && gap * 4,
                ...Object(style)
            }}
        />
    )
}
