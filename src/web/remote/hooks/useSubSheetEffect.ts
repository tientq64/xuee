import { useRemote } from '@remote/store'
import { SubSheetName } from '@remote/types/types'
import { EffectCallback, Inputs, useEffect } from 'preact/hooks'

export function useSubSheetEffect(
    effect: EffectCallback,
    targetSubSheetName: SubSheetName,
    deps: Inputs = []
): void {
    const { subSheetName } = useRemote()

    const isOpen: boolean = subSheetName === targetSubSheetName

    useEffect(() => {
        if (!isOpen) return
        return effect()
    }, [isOpen, ...deps])
}
