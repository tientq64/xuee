import { useRemote } from '@remote/store'
import { SubSheetName } from '@remote/types/types'
import { DependencyList, EffectCallback, useEffect } from 'react'

export function useSubSheetEffect(
    effect: EffectCallback,
    targetSubSheetName: SubSheetName,
    deps: DependencyList = []
): void {
    const { subSheetName } = useRemote()

    const isOpen: boolean = subSheetName === targetSubSheetName

    useEffect(() => {
        if (!isOpen) return
        return effect()
    }, [isOpen, ...deps])
}
