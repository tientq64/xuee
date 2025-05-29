import { getOctokit } from '@background/helpers/getOctokit'
import { background } from '@background/store'
import { GistStatus } from '@background/types/types'
import { inRange } from '@common/utils/inRange'
import { Octokit } from '@octokit/rest'

export async function syncAppDataFromGist(): Promise<void> {
    const { gistId, gistFilename, gistStatus } = background
    if (gistId === undefined || gistFilename === undefined) return
    if (!inRange(gistStatus, 200, 299)) return

    const octokit: Octokit | undefined = getOctokit()
    if (octokit === undefined) return

    try {
        background.syncFromGistError = undefined
        background.gistStatus = GistStatus.SyncingFromGist

        const result = await octokit.gists.get({
            gist_id: gistId
        })
        const file = result.data.files?.[gistFilename]
        if (file == null) {
            throw Error(`Không tìm thấy tập tin dữ liệu ứng dụng với tên "${gistFilename}".`)
        }
        if (file.content !== undefined) {
            const data = JSON.parse(file.content)
            Object.assign(background, data)
        }
        background.gistStatus = GistStatus.SyncFromGistSuccess
    } catch (error) {
        background.syncFromGistError = error
        background.gistStatus = GistStatus.SyncFromGistFailed
        throw error
    }
}
