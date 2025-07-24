import { Site } from '@common/constants/sites'
import { getSiteByUrl } from '@common/helpers/getSiteByUrl'
import { proxy, Snapshot, useSnapshot } from 'valtio'
import { Media } from './types/types'

export interface Content {
    site: Site
    isFullmedia: boolean
    media: Media | null
    rotate: number
    scale: number
    flipX: number
    flipY: number
    translateX: number
    translateY: number
    portrait: boolean
    transform: string
}

export const content = proxy<Content>({
    site: getSiteByUrl(location.href),
    isFullmedia: false,
    media: null,
    rotate: 0,
    scale: 1,
    flipX: 1,
    flipY: 1,
    translateX: 0,
    translateY: 0,
    portrait: false,
    transform: ''
})

export function useContent(): Snapshot<Content> {
    return useSnapshot(content)
}
