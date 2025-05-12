import { ReactNode } from 'react'

export function NotFound(): ReactNode {
    return (
        <div className="h-full p-3">
            <div className="text-center text-zinc-300">
                Không tìm thấy trang <span className="text-orange-300">{location.pathname}</span>
            </div>
        </div>
    )
}
