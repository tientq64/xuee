import { ReactElement } from 'react'
import { NotFound } from './pages/not-found/NotFound'
import { RemotePage } from './pages/remote/RemotePage'

const router: Record<string, ReactElement> = {
    '/': <RemotePage />,
    '/not-found': <NotFound />
}

export function App(): ReactElement {
    const pathname: string = location.pathname

    return (
        <div className="h-full bg-zinc-900 text-white">
            {router[pathname] ?? router['/not-found']}
        </div>
    )
}
