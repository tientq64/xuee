import clsx from 'clsx'
import { VNode } from 'preact'
import { ButtonHTMLAttributes } from 'preact/compat'

export function Button({ className, disabled, children, ...props }: ButtonHTMLAttributes): VNode {
    return (
        <button
            {...props}
            className={clsx(
                className,
                `cursor-pointer rounded border border-zinc-600 px-4 py-1 select-none
                hover:bg-zinc-800`,
                disabled && 'cursor-not-allowed! bg-zinc-700! text-zinc-400!'
            )}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
