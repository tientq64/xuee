import { Session } from '@background/types/types'
import { manifest } from '@extension/manifest'
import chromep from 'chrome-promise'

export async function reopenClosedTab(): Promise<void> {
    const sessions: Session[] = await chromep.sessions.getRecentlyClosed()

    const restoredSession: Session | undefined = sessions.find((session) => {
        if (session.tab === undefined) return
        if (session.tab.sessionId === undefined) return
        if (session.tab.url === undefined) return
        if (isExcludeUrl(session.tab.url)) return
        return true
    })
    if (restoredSession?.tab?.sessionId === undefined) return

    await chromep.sessions.restore(restoredSession.tab.sessionId)
}

function isExcludeUrl(url: string): boolean {
    const excludePatterns: string[] | undefined = manifest.content_scripts?.[0].exclude_matches
    if (excludePatterns === undefined) return false

    const result: boolean = !!excludePatterns.some((pattern) => {
        return url.includes(pattern)
    })
    return result
}
