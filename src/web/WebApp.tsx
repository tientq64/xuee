import { NotFoundPage } from '@pages/not-found/components/NotFoundPage'
import { RemotePage } from '@remote/components/RemotePage'
import { VNode } from 'preact'

const router: Record<string, VNode> = {
    '/remote': <RemotePage />,
    '/not-found': <NotFoundPage />
}

export function WebApp(): VNode {
    const pathname: string = location.pathname

    return <div className="h-full">{router[pathname] ?? router['/not-found']}</div>
}
