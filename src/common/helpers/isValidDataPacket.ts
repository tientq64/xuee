import { DataPacket } from '@common/types/types'

export function isValidDataPacket(data: unknown): data is DataPacket {
    return Array.isArray(data) && typeof data[0] === 'string' && Array.isArray(data[1])
}
