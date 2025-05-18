import { NotFoundPage } from '@pages/not-found/components/NotFoundPage'
import { RemotePage } from '@remote/components/RemotePage'
import { ReactElement } from 'react'

const router: Record<string, ReactElement> = {
    '/': <RemotePage />,
    '/not-found': <NotFoundPage />
}

export function App(): ReactElement {
    const pathname: string = location.pathname

    return <div className="h-full">{router[pathname] ?? router['/not-found']}</div>
}
