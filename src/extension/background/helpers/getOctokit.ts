import { background } from '@background/store'
import { Octokit } from '@octokit/rest'

export function getOctokit(): Octokit | undefined {
    const { gistToken } = background
    if (gistToken === undefined) return

    return new Octokit({ auth: gistToken })
}
