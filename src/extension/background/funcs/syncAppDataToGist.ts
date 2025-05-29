import { getOctokit } from '@background/helpers/getOctokit'
import { background, Background } from '@background/store'
import { GistStatus } from '@background/types/types'
import { inRange } from '@common/utils/inRange'
import { Octokit } from '@octokit/rest'

export async function syncAppDataToGist(): Promise<void> {
    const { gistId, gistFilename, gistStatus } = background
    if (gistId === undefined || gistFilename === undefined) return
    if (!inRange(gistStatus, 200, 299)) return

    const octokit: Octokit | undefined = getOctokit()
    if (octokit === undefined) return

    const appData: Partial<Background> = {}

    try {
        background.syncToGistError = undefined
        background.gistStatus = GistStatus.SyncingToGist

        const json: string = JSON.stringify(appData)
        await octokit.gists.update({
            gist_id: gistId,
            files: {
                [gistFilename]: { content: json }
            }
        })
        background.gistStatus = GistStatus.SyncToGistSuccess
    } catch (error) {
        background.syncToGistError = error
        background.gistStatus = GistStatus.SyncToGistFailed
        throw error
    }
}
