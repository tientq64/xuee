import { closeTab } from '../funcs/closeTab'
import { fullscreen } from '../funcs/fullscreen'
import { moveTab } from '../funcs/moveTab'
import { navigate } from '../funcs/navigate'
import { navigateBrowser } from '../funcs/navigateBrowser'
import { reloadTab } from '../funcs/reloadTab'
import { reopenClosedTab } from '../funcs/reopenClosedTab'
import { switchTab } from '../funcs/switchTab'
import { syncAppDataFromGist } from '../funcs/syncAppDataFromGist'
import { syncAppDataToGist } from '../funcs/syncAppDataToGist'

export const backgroundFuncs = {
    closeTab,
    fullscreen,
    moveTab,
    navigate,
    navigateBrowser,
    reloadTab,
    reopenClosedTab,
    switchTab,
    syncAppDataFromGist,
    syncAppDataToGist
}
export type BackgroundFuncs = typeof backgroundFuncs
