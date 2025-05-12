export function isValidDataPacket(data: unknown): data is [string, unknown[]] {
    return Array.isArray(data) && typeof data[0] === 'string' && Array.isArray(data[1])
}
