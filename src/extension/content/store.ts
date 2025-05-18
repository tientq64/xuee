import { Site } from '@common/constants/sites'
import { getSiteByUrl } from '@common/helpers/getSiteByUrl'
import { proxy } from 'valtio'

export interface Content {
    site: Site
}

export const content = proxy<Content>({
    site: getSiteByUrl(location.href)
})
