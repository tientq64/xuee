import { closeTab } from '../funcs/closeTab'
import { duplicateTab } from '../funcs/duplicateTab'
import { fullscreen } from '../funcs/fullscreen'
import { minimize } from '../funcs/minimize'
import { moveTab } from '../funcs/moveTab'
import { navigate } from '../funcs/navigate'
import { navigateBrowser } from '../funcs/navigateBrowser'
import { reloadExtension } from '../funcs/reloadExtension'
import { reloadTab } from '../funcs/reloadTab'
import { reopenClosedTab } from '../funcs/reopenClosedTab'
import { switchTab } from '../funcs/switchTab'
import { syncAppDataFromGist } from '../funcs/syncAppDataFromGist'
import { syncAppDataToGist } from '../funcs/syncAppDataToGist'

export const backgroundFuncs = {
    closeTab,
    duplicateTab,
    fullscreen,
    minimize,
    moveTab,
    navigate,
    navigateBrowser,
    reloadExtension,
    reloadTab,
    reopenClosedTab,
    switchTab,
    syncAppDataFromGist,
    syncAppDataToGist
}
export type BackgroundFuncs = typeof backgroundFuncs
