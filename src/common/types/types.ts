import { JSONSchemaForGoogleChromeExtensionManifestFiles } from '@schemastore/chrome-manifest'
import { HTMLAttributes } from 'preact/compat'

export type AnyFunction = (...args: any[]) => any

export type DataPacket = [funcName: string, args: unknown[]]

export type TabInfo = [tabId: number | undefined, tabUrl: string | null, tabIndex: number]

export interface ExtensionV2Manifest extends JSONSchemaForGoogleChromeExtensionManifestFiles {
    author?: string
    background?: {
        page?: string
        scripts?: string[]
        persistent?: boolean
    }
    web_accessible_resources?: string[]
    content_security_policy?: string
}

export type DivHTMLAttributes = HTMLAttributes<HTMLDivElement>
