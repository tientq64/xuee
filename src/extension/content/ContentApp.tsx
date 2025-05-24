import { VNode } from 'preact'
import { useFullmediaChange } from './hooks/useFullmediaChange'
import { useMediaChange } from './hooks/useMediaChange'
import { useSetup } from './hooks/useSetup'
import { useSetupClientMessenger } from './hooks/useSetupClientMessenger'

export function ContentApp(): VNode {
    useSetupClientMessenger()
    useSetup()
    useFullmediaChange()
    useMediaChange()

    return <div className="xuee:h-full"></div>
}
