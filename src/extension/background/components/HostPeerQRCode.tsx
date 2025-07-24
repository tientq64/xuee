import { VNode } from 'preact'
import { QRCodeSVG } from 'qrcode.react'

export function HostPeerQRCode(): VNode {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <QRCodeSVG
                className="rounded-md"
                marginSize={2}
                fgColor="#18181b"
                value={chrome.runtime.id}
            />
            <div>Quét mã QR từ điện thoại để kết nối với máy tính.</div>
        </div>
    )
}
