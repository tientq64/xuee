import { mergeSheet } from '@remote/helpers/mergeSheet'
import { Sheet } from '@remote/types/types'
import { videoSheet } from './videoSheet'

export const tikTokSheet: Sheet = mergeSheet(videoSheet, {})
