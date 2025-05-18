import { initState } from './helpers/initState'
import { keepAwake } from './helpers/keepAwake'
import { startEvents } from './helpers/startEvents'
import { startHostMessenger } from './helpers/startHostMessenger'
import { startHostPeer } from './helpers/startHostPeer'

!(async () => {
    await initState()
    keepAwake()
    startEvents()
    startHostMessenger()
    startHostPeer()
})()
