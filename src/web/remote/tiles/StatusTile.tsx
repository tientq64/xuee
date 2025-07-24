import { Icon } from '@common/components/Icon'
import { useBattery } from '@raddix/use-battery'
import { Tile } from '@remote/components/Tile'
import { useRemote } from '@remote/store'
import { TileColor, TileNode } from '@remote/types/types'
import { useInterval } from 'ahooks'
import dayjs, { Dayjs } from 'dayjs'
import { MaterialSymbols } from 'material-design-icons-literal-types'
import { useMemo, useState } from 'preact/hooks'

export function StatusTile(): TileNode {
    const { tabIndex, tabTotal } = useRemote()
    const { level } = useBattery()

    const [time, setTime] = useState<Dayjs>(dayjs())

    const batteryLevel = useMemo<number | undefined>(() => {
        if (level === null) return undefined
        return Math.round(level * 100)
    }, [level])

    const batteryIconName = useMemo<MaterialSymbols>(() => {
        if (batteryLevel === undefined) return 'battery_android_alert'
        if (batteryLevel < 5) return 'battery_android_0'
        if (batteryLevel < 20) return 'battery_android_1'
        if (batteryLevel < 35) return 'battery_android_2'
        if (batteryLevel < 50) return 'battery_android_3'
        if (batteryLevel < 65) return 'battery_android_4'
        if (batteryLevel < 80) return 'battery_android_5'
        if (batteryLevel < 95) return 'battery_android_6'
        if (batteryLevel <= 100) return 'battery_android_full'
        return 'battery_android_alert'
    }, [batteryLevel])

    const batteryColor = useMemo<TileColor | undefined>(() => {
        if (batteryLevel === undefined) return TileColor.Yellow
        if (batteryLevel < 10) return TileColor.Red
        if (batteryLevel < 20) return TileColor.Yellow
    }, [batteryLevel])

    useInterval(() => {
        setTime(dayjs())
    }, 1000 * 60)

    return (
        <Tile>
            <div className="flex h-16 flex-col items-center leading-4">
                <div className="flex items-center justify-center gap-1">
                    <div>{time.format('HH:mm')}</div>

                    <div className="flex items-center">
                        <Icon className={batteryColor} name={batteryIconName} size={20} />
                        {batteryLevel ?? '--'}
                    </div>
                </div>

                <div>
                    {tabIndex + 1} / {tabTotal}
                </div>
            </div>
        </Tile>
    )
}
