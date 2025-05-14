import { useBattery } from '@raddix/use-battery'
import { useInterval } from 'ahooks'
import dayjs, { Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'
import { Icon } from '../../../components/Icon'
import { Tile } from '../types/types'

export function useStatusTile(): Tile {
    const { level } = useBattery()
    const [time, setTime] = useState<Dayjs>(dayjs())

    const batteryLevel = useMemo<number | string>(() => {
        if (level === null) return '--'
        return Math.round(level * 100)
    }, [level])

    useInterval(() => {
        setTime(dayjs())
    }, 1000 * 60)

    return {
        content: (
            <div className="py-2">
                <div className="flex items-center justify-center gap-1">
                    <div>{time.format('hh:mm')}</div>

                    <div className="flex items-center">
                        <Icon name="battery_android_3" size={20} />
                        {batteryLevel}
                    </div>
                </div>
            </div>
        )
    }
}
