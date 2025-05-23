import { clsm } from '@common/utils/clsm'
import { MaterialSymbols } from 'material-design-icons-literal-types'
import { VNode } from 'preact'

type IconProps = {
    className?: string
    name?: MaterialSymbols
    source?: string
    size?: number
}

export function Icon({ className, name, source = name ?? '', size = 32 }: IconProps): VNode {
    const isUrl: boolean = /^https?:\/\//.test(source)

    return (
        <>
            {!isUrl && (
                <span
                    className={clsm('material-symbols-rounded', className)}
                    style={{
                        fontSize: size
                    }}
                >
                    {source}
                </span>
            )}
            {isUrl && (
                <img
                    className={className}
                    src={source}
                    style={{
                        height: size
                    }}
                />
            )}
        </>
    )
}
