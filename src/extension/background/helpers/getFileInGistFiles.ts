import { defaultAppDataFilename } from '@background/constants/constants'
import { GistFile, GistFiles } from '@background/types/types'

export function getFileInGistFiles(files: GistFiles): GistFile {
    return files[defaultAppDataFilename] ?? Object.values(files)[0]
}
