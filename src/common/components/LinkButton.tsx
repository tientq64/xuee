import clsx from 'clsx'
import { VNode } from 'preact'
import { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, MouseEvent } from 'preact/compat'

interface LinkButtonProps extends ButtonHTMLAttributes {
    href?: string
    target?: HTMLAttributeAnchorTarget
}

export function LinkButton({
    className,
    disabled,
    href,
    target = '_blank',
    onClick,
    children,
    ...props
}: LinkButtonProps): VNode {
    const handleHrefClick = (event: MouseEvent<HTMLButtonElement>): void => {
        onClick?.(event)
        if (event.defaultPrevented) return
        if (!href) return
        window.open(href, target)
    }

    return (
        <button
            {...props}
            className={clsx(
                className,
                'cursor-pointer text-blue-400 hover:underline',
                disabled && 'pointer-events-none cursor-not-allowed! text-zinc-400!'
            )}
            disabled={disabled}
            onClick={!!href ? handleHrefClick : onClick}
        >
            {children}
        </button>
    )
}
