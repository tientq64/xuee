import { proxy } from 'valtio'
import { getSiteNameByUrl } from '../../common/helpers/getSiteNameByUrl'

export interface Content {
    siteName: string
}

export const content = proxy<Content>({
    siteName: getSiteNameByUrl(location.href)
})
