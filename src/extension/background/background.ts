import { initState } from './helpers/initState'
import { keepAwake } from './helpers/keepAwake'
import { startEvents } from './helpers/startEvents'
import { startHostPeer } from './helpers/startHostPeer'
import { startMessenger } from './helpers/startMessenger'

!(async () => {
    await initState()
    keepAwake()
    startEvents()
    startMessenger()
    startHostPeer()
})()
