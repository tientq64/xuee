import { VNode } from 'preact'
import { useFullmediaChange } from './hooks/useFullmediaChange'
import { useMediaChange } from './hooks/useMediaChange'
import { useMediaTransform } from './hooks/useMediaTransform'
import { useSetup } from './hooks/useSetup'
import { useSetupClientMessenger } from './hooks/useSetupClientMessenger'

export function ContentApp(): VNode {
    useSetupClientMessenger()
    useSetup()
    useFullmediaChange()
    useMediaTransform()
    useMediaChange()

    return <div className="h-full"></div>
}
