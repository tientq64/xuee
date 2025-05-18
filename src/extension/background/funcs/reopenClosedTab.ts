import { Session } from '@background/types/types'
import chromep from 'chrome-promise'

export async function reopenClosedTab(): Promise<void> {
    const sessions: Session[] = await chromep.sessions.getRecentlyClosed()

    const restoredSession: Session | undefined = sessions.find((session) => {
        if (session.tab === undefined) return
        if (session.tab.url === undefined) return
        if (session.tab.sessionId === undefined) return
        return true
    })
    if (restoredSession?.tab?.sessionId === undefined) return

    await chromep.sessions.restore(restoredSession.tab.sessionId)
}
