import { getSiteNameByUrl } from '../../../../common/helpers/getSiteNameByUrl'
import { remote } from '../store'

export function receiveSiteUrl(url: string): void {
    remote.siteName = getSiteNameByUrl(url)
}
